import { ref } from "vue";

export let serviceFetching = ref(false);
export let services = ref([]);
export let storageInfo = ref({});
export let currentService = ref(null);
export let serviceUsers = {};
export let newsletter_sender = ref({});

export let dataInit = () => {
    serviceFetching.value = false;
    services.value = [];
    storageInfo.value = {};
    currentService.value = null;
    serviceUsers = {};
    newsletter_sender.value = {};
}