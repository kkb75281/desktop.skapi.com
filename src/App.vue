<template lang="pug">
template(v-if="account !== 'pending'")
    router-view
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { account, skapi } from '@/main.js';
import { watch } from 'vue';
import { dataInit, serviceFetching, } from '@/data.js';
import { recordFetchInit } from './views/Service/Records/RecordFetch';
import { subdomainInit } from './views/Service/subdomain/SubdomainFetch';
const router = useRouter();
let route = useRoute();

watch(account, (a, oa) => {
    // 유저가 주소치고 들어왔는데 account가 로그아웃되있을때 로그인 패이지로 이동
    if (a === null) {
        // init
        dataInit();
        recordFetchInit();
        subdomainInit();

        // redirect
        switch (route.path.split('/')[1]) {
            case 'dashboard':
            // dashboard 아래 있는 모든 페이지
            // 더 있다면 추가하시오
            case 'accountSettings':
                router.replace({ path: '/login' });
                break;
        }
    }
    else {
        if (oa?.user_id !== a?.user_id) {
            // init
            dataInit();
            recordFetchInit();
            subdomainInit();
        }

        serviceFetching.value = skapi.getServices(null, true).finally(() => {
            serviceFetching.value = false;
        });
    }
})
</script>

<style lang="less"></style>
