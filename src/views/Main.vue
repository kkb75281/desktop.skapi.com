<template lang="pug">
NavBar(v-if="showNavBar")
router-view
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavBar from '@/components/NavBar.vue';

let route = useRoute();
let router = useRouter();
let excluded = ['login', 'signup', 'confirmation', 'forgotpassword', 'success', 'bye'];
let showNavBar = ref(!excluded.includes(route.name));

watch(() => router.currentRoute.value.name, (newRouteName) => {
  showNavBar.value = !excluded.includes(newRouteName);
});
</script>

<style lang="less">

</style>