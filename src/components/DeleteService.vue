<template lang="pug">
#deleteService(@click="closeWindow")
    form.wrap(@click.stop @submit.prevent="deleteService")
        .material-symbols-outlined error
        h4 Delete the Service
        .message Are you sure you want to delete "{{ currentService.name }}" permanently? You can’t undo this action.
        .message
            | To confirm deletion, enter Service ID 
            br
            span {{ currentService.service }}
        input(type="text" :placeholder="currentService.service" @input="(e) => { confirmationCode = e.target.value; error = '';}")
        .material.error(v-if="error" style='padding-top: 0;')
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
import { currentService } from "@/data.js";

let router = useRouter();
let emits = defineEmits(['close']);
let promiseRunning = ref(false);
let confirmationCode = ref('');
let error = ref('');
let closeWindow = () => {
    emits('close');
}
let deleteService = ()=>{
    if (confirmationCode.value !== currentService.value.service) {
        error.value = 'Service ID does not match.';
        return;
    }
    skapi.deleteService(currentService.value.service)
}
</script>
<style lang="less" scoped>
#deleteService {
    position: fixed;
    left: 0;
    top: 0;
    overflow: auto;
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
    width: 440px;
    padding: 28px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);

    .material-symbols-outlined {
        font-size:57px;
        color:rgba(240, 78, 78, 1);
        margin-bottom: 20px;
    }
    h4 {
        display: block;
        color:rgba(240, 78, 78, 1);
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 36px;
    }
    .message {
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        margin-bottom: 35px;
        span {
            font-weight: 700;
        }
    }
    input {
        width: 360px;
        height: 44px;
        border-radius: 8px;
        border: 0;
        padding-left: 16px;
        background: rgba(0, 0, 0, 0.05);
    }
    .buttonWrap {
        width: 100%;
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
            user-select: none;
            cursor: pointer;

            &.cancel {
                border-radius: 8px;
                border: 2px solid #293FE6;
            }
            &.delete {
                border: 0;
            }
        }
    }
}
</style>