<template lang="pug">
EmailCaution(v-if="account && !account?.email_verified && route.name !== 'home'")
NavBar(v-if="showNavBar")
router-view
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { account } from '@/main.js';
import NavBar from '@/components/NavBar.vue';
import EmailCaution from '@/components/EmailCaution.vue';

let route = useRoute();
let router = useRouter();
let excluded = ['login', 'signup', 'confirmation', 'forgotpassword', 'success', 'bye'];
let showNavBar = ref(!excluded.includes(route.name));
// let showEmailCaution = ref(account.email_verified);

watch(() => router.currentRoute.value.name, (newRouteName) => {
  showNavBar.value = !excluded.includes(newRouteName);
});

// watch(() => account.value.email_verified, () => {
//     if(account.value.email_verified) {
//         showEmailCaution.value = false;
//     } else {
//         showEmailCaution.value = true;
//     }
// })
</script>

<style lang="less"></style>