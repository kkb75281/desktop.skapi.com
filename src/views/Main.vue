<template lang="pug">
template(v-if="account")
    EmailCaution(v-if="!account?.email_verified")
    NavBar
    router-view
</template>

<script setup>
import { provide, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { skapi, account } from '@/main.js';
import { services, serviceFetching, currentService, storageInfo, serviceUsers, newsletter_sender } from '@/data.js';

import NavBar from '@/components/NavBar.vue';
import EmailCaution from '@/components/EmailCaution.vue';

let route = useRoute();
let router = useRouter();
</script>