<template lang="pug">
template(v-if="account !== 'pending'")
    router-view
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { account, skapi } from '@/main.js';
import { watch } from 'vue';
import { services, serviceFetching } from '@/data.js';
const router = useRouter();
let route = useRoute();

watch(account, (a) => {
    // 유저가 주소치고 들어왔는데 account가 로그아웃되있을때 로그인 패이지로 이동
    if (a === null) {
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

        serviceFetching.value = skapi.getServices().then(s => {
            services.value=s.reverse();
        }).finally(() => {
            serviceFetching.value = false;
        });
    }
})
</script>

<style lang="less"></style>
