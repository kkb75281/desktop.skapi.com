import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from '@/skapi-extensions/js/admin.js'

let skapi = new Admin("us31zettahertzesskpi");
let account = ref('pending');

skapi.getProfile().then(u => {
    account.value = u;
}).catch(err => err);

const app = createApp(App)

app.use(router)

app.mount('#app')

console.log('IM fixing a bug!');
console.log('More fixes');

let bodyClick = {}
document.body.addEventListener('click', ()=>{
    if(Object.keys(bodyClick).length) {
        for(let key in bodyClick) {
            bodyClick[key]();
        }
    }
})

export { skapi, account, bodyClick }
