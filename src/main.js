import './assets/main.less'
import './assets/reset.less'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from '@/skapi-extensions/js/admin.js'

// let etc = {
//     hostDomain: 'skapi.app',
//     target_cdn: 'd1wrj5ymxrt2ir'
// }

// let regions = {
//     KR: 'ap-northeast-1',
// };

// let skapi = new Admin("eu71zettahertzesskpi", etc, regions); // for testing

let skapi = new Admin("us31zettahertzesskpi");
let account = ref('pending');

function generateNonce(length = 32) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const nonce = generateNonce();

// !change to below in production!
// let redirect_uri = "https://www.skapi.com"
let redirect_uri = "http://localhost:5173";
let googleOpenId = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&state=ggl&response_type=token id_token&client_id=412167460837-9mfmmrapd4ndlcv28pr4ivnrif3bfct3.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(redirect_uri)}&&nonce=${nonce}`;

let url = window.location;
if (url.hash) {
    // idtoken returned in url
    let query = url.hash.slice(1).split('&');
    let params = {};
    query.forEach(q => {
        let [key, value] = q.split('=');
        params[key] = value;
    });

    // make jwt login be remembered
    if (params.state.includes('ggl')) {
        skapi.jwtLogin({
            idToken: params.id_token,
            clientId: '412167460837-9mfmmrapd4ndlcv28pr4ivnrif3bfct3.apps.googleusercontent.com',
            keyUrl: 'https://www.googleapis.com/oauth2/v3/certs',
            provider: 'ggl',
            nonce: nonce
        }).then(res => {
            window.localStorage.setItem('remember', 'true');
            // logged in!
            account.value = res;
            router.push({ path: '/dashboard' });
        });
    }
}
else {
    skapi.getProfile().then(u => {
        account.value = u;
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

export { skapi, account, bodyClick, googleOpenId }
