<template lang="pug">
EmailCaution(v-if="account && !account?.email_verified && route.name !== 'home'")
NavBar(v-if="showNavBar")
router-view
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { account } from '@/main.js';
import NavBar from '@/components/NavBar.vue';
import EmailCaution from '@/components/EmailCaution.vue';

let route = useRoute();
let router = useRouter();
let excluded = ['login', 'signup', 'confirmation', 'forgotpassword', 'success', 'bye'];
let showNavBar = ref(!excluded.includes(route.name));

watch(() => router.currentRoute.value.name, (newRouteName) => {
  showNavBar.value = !excluded.includes(newRouteName);
});

</script>

<style lang="less"></style>