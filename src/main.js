import './assets/main.less'
import './assets/reset.less'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from '@/skapi-extensions/js/admin.js'

console.log(import.meta.env.MODE, import.meta.env.VITE_DATE)
let domain = import.meta.env.VITE_DOMAIN;
let skapi = new Admin(import.meta.env.VITE_ADMIN, JSON.parse(import.meta.env.VITE_ETC), JSON.parse(import.meta.env.VITE_REG));

let account = ref('pending');

let customer = null;

function generateNonce(length = 32) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// !change to below in production!
let redirect_uri = import.meta.env.VITE_URI;
let googleOpenId = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&state=ggl&response_type=token id_token&client_id=412167460837-9mfmmrapd4ndlcv28pr4ivnrif3bfct3.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(redirect_uri)}&&nonce=${generateNonce()}`;

let url = window.location;

if (url.hash) {
    // google login

    // idtoken returned in url
    let query = url.hash.slice(1).split('&');
    let params = {};
    query.forEach(q => {
        let [key, value] = q.split('=');
        params[key] = value;
    });

    function decodeIdToken(idToken) {
        const base64Url = idToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    console.log(decodeIdToken(params.id_token));

    // make jwt login be remembered
    if (params.state.includes('ggl')) {
        skapi.jwtLogin({
            idToken: params.id_token,
            clientId: '412167460837-9mfmmrapd4ndlcv28pr4ivnrif3bfct3.apps.googleusercontent.com',
            keyUrl: 'https://www.googleapis.com/oauth2/v3/certs',
            provider: 'ggl'
        }).then(res => {
            window.localStorage.setItem('remember', 'true');
            // logged in!
            account.value = res;
            router.push({ path: '/myServices' });
        });
    }
}
else {
    skapi.getProfile().then(u => {
        account.value = u;

        let getCustomer = async () => {
            let misc = JSON.parse(account.value?.misc || null);
        
            if (misc?.stripe_customer_id) {
                // stripe_customer_id exists
        
                let customer_id = misc.stripe_customer_id;
        
                // get customer info, and update customer.value
                customer = skapi.clientSecretRequest({
                    clientSecretName: 'stripe_test',
                    url: `https://api.stripe.com/v1/customers/${customer_id}`,
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer $CLIENT_SECRET'
                    }
                });
            }
        
            else {
                // stripe_customer_id does not exist
        
                // create customer, save customer id in user misc
                customer = skapi.clientSecretRequest({
                    clientSecretName: 'stripe_test',
                    url: 'https://api.stripe.com/v1/customers',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: 'Bearer $CLIENT_SECRET'
                    },
                    data: {
                        name: account.value.name || account.value.email,
                        email: account.value.email
                    }
                })
        
                // update customer id in user misc
                account.value = await skapi.updateProfile({
                    misc: JSON.stringify({ stripe_customer_id: (await customer).id })
                });
            }
        };
        getCustomer();
    }).catch(err => err);
}

const app = createApp(App)

app.use(router)
app.mount('#app')

let bodyClick = {}
document.body.addEventListener('click', () => {
    if (Object.keys(bodyClick).length) {
        for (let key in bodyClick) {
            bodyClick[key]();
        }
    }
})

export { skapi, account, bodyClick, googleOpenId, domain, customer }
