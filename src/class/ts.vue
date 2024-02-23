<template lang="pug">
pre {{ logs }}
</template>

<script setup>
import { ref, reactive } from 'vue';
import { skapi } from '@/class/admin';
import Service from '@/class/service';

let services = reactive({});

const logs = ref('');
function log(v, name) {
    logs.value = (name ? `\n[${name}]\n` : '') + JSON.stringify(v, null, 2) + '\n------------------------------------------\n' + logs.value;
}

log(skapi, 'skapi');

async function main() {
    // login (if needed)
    // ...

    // get log profile
    let profile = await skapi.getProfile();
    console.log(profile);
    log(profile, 'profile');

    // get user info
    let user = await skapi.getUsers({
        service: skapi.service,
        searchFor: 'user_id',
        value: profile.user_id
    });
    log(user, 'user');

    // initialize service objects
    let serviceList = await Promise.all(user.list[0].services.map(s => Service.load(s)));
    for(let service of serviceList) {
        services[service.id] = service;
    }
    log(services, 'serviceList');

    let firstService = services[Object.keys(services)[0]];
    // get storage information of the first service
    let storageInfo = await firstService.getStorageInfo();
    log(storageInfo, 'getStorageInfo');

    log(firstService.storageInfo, 'storageInfo');
}

main();
</script>