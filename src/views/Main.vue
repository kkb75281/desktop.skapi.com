<template lang="pug">
EmailCaution(v-if="!account?.email_verified")
NavBar
router-view
</template>

<script setup>
import { provide, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { account } from '@/main.js';
import NavBar from '@/components/NavBar.vue';
import EmailCaution from '@/components/EmailCaution.vue';

let route = useRoute();
let router = useRouter();
let showVerifyEmail = ref(false);
let showEmailCaution = ref(account.email_verified);

provide('showVerifyEmail', showVerifyEmail);

watch(() => account.value.email_verified, () => {
    if(account.value.email_verified) {
        showEmailCaution.value = false;
    } else {
        showEmailCaution.value = true;
    }
})
</script>

<style lang="less"></style>