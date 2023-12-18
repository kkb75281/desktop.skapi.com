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

skapi.getProfile().then(u => {
    account.value = u;
}).catch(err => err);

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

export { skapi, account, bodyClick }
