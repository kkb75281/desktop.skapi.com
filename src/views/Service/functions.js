import { skapi } from '@/main.js';

// export let functionNameLong = (a) => {
    // return new Promise((res, rej) => {
    //     setTimeout(() => {
    //         if (a) {
    //             res(a);
    //         }
    //         else {
    //             rej('i have error');
    //         }
    //     }, 1000);
    // });
// }

export let onlyAdminCreateUsers = (serviceId, boolean) => {
    return skapi.setServiceOption({serviceId, option: {'prevent_signup': boolean}}).then(res => console.log(res)).catch(err => console.log(err));
}