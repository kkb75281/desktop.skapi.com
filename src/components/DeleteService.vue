<template lang="pug">
#overlayWindow.deleteService(@click="closeWindow" style='--max-width: 480px;')
    form.overlayWrap(@click.stop @submit.prevent="deleteService")
        header
            .title.withIcon.red
                .material-symbols-outlined.mid.icon warning
                h5 Delete the Service
        main
            .content
                p Are you sure you want to delete "{{ currentService.name }}" #[br]permanently? You can’t undo this action.
                br
                p To confirm deletion, enter Service ID
                .service {{ currentService.service }}
                br
                input(type="text" :placeholder="currentService.service" @input="(e) => { confirmationCode = e.target.value; error = '';}")
                .error(v-if="error")
                    .material-symbols-outlined.mid error
                    span {{ error }}
                br
                br
                br
                .buttonWrap
                    template(v-if="promiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button.noLine(type="button" @click="closeWindow") Cancel
                        button.unFinished.warning(type="submit") Delete
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { skapi, account } from '@/main.js';
import { currentService, services } from "@/data.js";

let router = useRouter();
let emits = defineEmits(['close']);
let promiseRunning = ref(false);
let confirmationCode = ref('');
let error = ref('');
let closeWindow = () => {
    emits('close');
}
let deleteService = async () => {
    if (confirmationCode.value !== currentService.value.service) {
        error.value = 'Service ID does not match.';
        return;
    }
    promiseRunning.value = true;

    let deleteService = () => {
        return skapi.deleteService(currentService.value.service).then(_ => {
            // remove from services
            let idx = services.value.findIndex(s => s.service === currentService.value.service);
            services.value.splice(idx, 1);
            // remove from currentService
            currentService.value = null;
            router.replace({ path: '/myServices' });
        });
    }

    if (currentService.value.active >= 1) {
        try {
            await skapi.disableService(currentService.value.service);
            await deleteService();
        }
        catch (e) {
            error.value = e.message;
        }
        finally {
            promiseRunning.value = false;
        }
    }
    else {
        deleteService();
    }
}
</script>

<style lang="less" scoped>
.service {
    font-size: 0.8rem;
    font-weight: 700;
}

input {
    width: 100%;
    height: 44px;
    border-radius: 8px;
    border: 0;
    font-size: 0.8rem;
    padding-left: 0.8rem;
    background: rgba(0, 0, 0, 0.05);
}
</style>