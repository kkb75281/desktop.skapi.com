<template lang="pug">
#deleteService(@click="closeWindow")
    form.wrap(@click.stop @submit.prevent="deleteService")
        .title Delete the Service
        .message Are you sure you want to delete "{{ currentService.name }}" #[br]permanently? You can’t undo this action.
        .message To confirm deletion, enter Service ID
        .service.userSelect {{ currentService.service }}
        input(type="text" :placeholder="currentService.service" @input="(e) => { confirmationCode = e.target.value; error = '';}")
        .error(v-if="error" style='padding-top: 0;')
            .material-symbols-outlined.mid(style='font-size: 1.5rem;margin-bottom: 0;') error
            span {{ error }}
        .buttonWrap
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.cancel(type="button" @click="closeWindow") Cancel
                button.delete(type="submit") Delete
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
            router.replace({ path: '/dashboard' });
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
#deleteService {
    position: fixed;
    overflow: auto;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(26, 26, 26, 0.25);
    z-index: 99999;
}

.wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 28px;
    width: 480px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
    z-index: 999;

    .title {
        position: relative;
        color: #F04E4E;
        font-size: 20px;
        font-weight: 700;
        padding-bottom: 28px;

        &::before {
            position: absolute;
            content: '';
            left: -28px;
            bottom: 0px;
            width: calc(100% + 56px);
            height: 1px;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    .message {
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        padding-top: 28px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .service {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 700;
    }

    input {
        width: 100%;
        height: 44px;
        border-radius: 8px;
        border: 0;
        font-size: 16px;
        padding-left: 16px;
        margin-top: 32px;
        background: rgba(0, 0, 0, 0.05);
    }

    .buttonWrap {
        width: 100%;
        height: 44px;
        margin-top: 56px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;

        button {
            background-color: unset;
            color: #293FE6;
            font-size: 16px;
            font-weight: 700;
            width: 100px;
            height: 44px;
            cursor: pointer;

            &.cancel {
                border-radius: 8px;
                border: 2px solid #293FE6;
            }

            &.delete {
                border: 0;
                color: rgba(240, 78, 78, 1);
            }
        }
    }
}
</style>