<template lang="pug">
template(v-if="account")
    EmailCaution(v-if="!account?.email_verified")
    NavBar
    router-view
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { account } from '@/main.js';

import NavBar from '@/components/NavBar.vue';
import EmailCaution from '@/components/EmailCaution.vue';

let route = useRoute();
let router = useRouter();
</script>