<template lang="pug">
#userDialog(@click="closeDialog" @mousedown="pendClose = true" style='--max-width: 376px;')
    .center
        .dialog(@mousedown.stop @mouseup='pendClose = false')
            h5.title {{ props.state }} User
            .content(style='padding: 28px;max-width: 100%;box-sizing: content-box;')
                slot
                .buttonWrap
                    template(v-if="promiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button.cancel(@click="emits('close')") Cancel
                        button.disable(@click="changeUserState") {{ props.state }}
</template>
    
<script setup>
import { ref } from "vue";
import { skapi } from '@/main.js';
import { currentService } from '@/data.js';

let props = defineProps(['state', 'checkedUsers', 'preventBackgroundClick']);
let emits = defineEmits(['close']);
let pendClose = false;
let promiseRunning = ref(false);
let closeDialog = () => {
    if (props.preventBackgroundClick) {
        return;
    }
    else if (pendClose) {
        emits('close');
    }
}

let serviceId = currentService.value.service;
let changeUserState = () => {
    if(props.state == 'Block') {
        blockUsers();
    } else if(props.state == 'Unblock') {
        unBlockUsers();
    } else {
        deleteUsers();
    }
}
let blockUsers = () => {
    promiseRunning.value = true;
    let promises = [];
    for (let userId of props.checkedUsers) {
        promises.push(skapi.blockAccount(serviceId, { userId }))
    }
    Promise.all(promises).then(_ => {
        promiseRunning.value = false;
        emits('close', props.checkedUsers);
    }).catch(e => {
        alert(e.message);
    })
}
let unBlockUsers = () => {
    promiseRunning.value = true;
    let promises = [];
    for (let userId of props.checkedUsers) {
        promises.push(skapi.unblockAccount(serviceId, { userId }))
    }
    Promise.all(promises).then(_ => {
        promiseRunning.value = false;
        emits('close', props.checkedUsers);
    }).catch(e => {
        alert(e.message);
    })
}
let deleteUsers = () => {
    promiseRunning.value = true;
    let promises = [];
    for (let userId of props.checkedUsers) {
        promises.push(skapi.deleteAccount(serviceId, { userId }))
    }
    Promise.all(promises).then(_ => {
        promiseRunning.value = false;
        emits('close', props.checkedUsers, 'delete');
    }).catch(e => {
        alert(e.message);
    })
}
</script>
    
<style lang="less" scoped>
#userDialog {
    z-index: 99999;
    position: fixed;
    overflow: hidden;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(26, 26, 26, 0.25);

    display: table;
    text-align: center;
}

.center {
    display: table-cell;
    vertical-align: middle;
}

.dialog {
    display: inline-block;
    max-height: 100vh;
    overflow: auto;
    text-align: left;

    max-width: var(--max-width); // width of the dialog

    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);

    .title {
        position: relative;
        color: #293FE6;
        padding: 28px;

        &::after {
            position: absolute;
            content: '';
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background: rgba(0, 0, 0, 0.10);
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        }
    }

    .buttonWrap {
        height: 44px;
        margin-top: 56px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;

        button {
            color: #293FE6;
            font-size: 16px;
            font-weight: 700;
            background-color: unset;
            cursor: pointer;
        }

        .cancel {
            border: 0;
        }

        .disable {
            height: 100%;
            border-radius: 8px;
            border: 2px solid #293FE6;
            padding: 10px 28px;
        }
    }
}
</style>

<style>
#userDialog p {
    font-size: 0.8em;
    font-weight: 500;
    line-height: 1.2rem;
}
</style>