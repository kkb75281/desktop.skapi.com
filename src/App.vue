<template lang="pug">
template(v-if="account !== 'pending'")
    router-view
</template>

<script setup>
import Service from '@/class/service.ts';
import { useRoute, useRouter } from 'vue-router';
import { account, skapi } from '@/main.js';
import { watch } from 'vue';
import { dataInit, serviceFetching, services } from '@/data.js';
import { recordFetchInit } from './views/Service/Records/RecordFetch';
import { subdomainInit } from './views/Service/Subdomain/SubdomainFetch';

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
            case 'myServices':
            case 'subscription':
            // myServices 아래 있는 모든 페이지
            // 더 있다면 추가하시오
            case 'accountSettings':
                router.replace({ path: '/login' });
                break;
        }
    }
    else {
        console.log(a)
        if (oa?.user_id !== a?.user_id) {
            // init
            dataInit();
            recordFetchInit();
            subdomainInit();
        }
        skapi.getUsers({service: import.meta.env.VITE_ADMIN, searchFor: 'user_id', value: a.user_id})
        .then(u=>{
            let serviceId = u.list[0].services;
            for(let sid of serviceId) {
                Service.load(sid).then(s => {
                    services.value[sid] = s;
                });    
            }
            console.log(services.value)
        })
        // serviceFetching.value = skapi.getServices(null, true)
        // .then(async(r) => {
        //     let serviceId = Object.keys(r);
        //     let serviceList = []
        //     for(let sid of serviceId) {
        //         Service.load(sid).then(s => {
        //             services.value[sid] = s;
        //         });    
        //     }
        //     console.log(services.value);
            // services.value = skapi.serviceMap.map(sid => skapi.services[sid]).reverse();
            // for(let i=0; i<services.value.length; i++) {
            //     let service = await Service.load(services.value[i].service);
            //     console.log(service)


            //     let service = services.value[i].service;

            //     if(services.value[i].subsInfo) {
            //         continue;
            //     }

            //     if(services.value[i].subs_id) {
            //         let subs_id = services.value[i].subs_id.split('#');

            //         if (subs_id.length < 2) {
            //             alert('Service does not have a subscription');
            //             return;
            //         }

            //         let SUBSCRIPTION_ID = subs_id[0];

            //         skapi.clientSecretRequest({
            //             clientSecretName: 'stripe_test',
            //             url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
            //             method: 'GET',
            //             headers: {
            //                 Authorization: 'Bearer $CLIENT_SECRET',
            //                 'Content-Type': 'application/x-www-form-urlencoded'
            //             },
            //         }).then(res => {
            //             console.log(res)
            //             services.value[i].subsInfo = res;
            //         }).catch(err => {
            //             console.log(err.message);
            //         });
            //     }
            // }
        // })
        // .finally(() => {
        //     serviceFetching.value = false;
        // });
    }
})
</script>

<style lang="less"></style>
