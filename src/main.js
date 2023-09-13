import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from '@/skapi-extensions/js/admin.js'

let skapi = new Admin("eu71zettahertzesskpi");
let account = ref('pending');

skapi.getProfile().then(u => {
    account.value = u;
}).catch(err => err);

const app = createApp(App)

app.use(router)

app.mount('#app')

export { skapi, account }
