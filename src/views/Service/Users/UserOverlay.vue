<template lang="pug">
#overlayWindow.userDialog(@click="closeDialog" @mousedown="pendClose = true" style='--max-width: 376px;')
    .overlayWrap(@mousedown.stop @mouseup='pendClose = false')
        header
            h5.title(:class="{'red' : props.state == 'Delete'}") {{ props.state }} User
        main
            .content
                slot
                br
                br
                .buttonWrap
                    template(v-if="promiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button.cancel(@click="emits('close');") Cancel
                        button.save(@click="changeUserState") {{ props.state }}
</template>
    
<script setup>
import { ref } from "vue";
import { skapi } from '@/main.js';
import { currentService } from '@/data.js';

let props = defineProps(['state', 'checkedUsers', 'preventBackgroundClick']);
let emits = defineEmits(['close']);
let pendClose = false;
let promiseRunning = ref(false);
let serviceId = currentService.value.service;

let closeDialog = () => {
    if (props.preventBackgroundClick) {
        return;
    }
    else if (pendClose) {
        emits('close');
    }
}

let changeUserState = () => {
    promiseRunning.value = true;
    let promises = [];

    for (let userId of props.checkedUsers) {
        if(props.state == 'Block') {
            promises.push(skapi.blockAccount(serviceId, { userId }))
        } else if(props.state == 'Unblock') {
            promises.push(skapi.unblockAccount(serviceId, { userId }))
        } else {
            promises.push(skapi.deleteAccount(serviceId, { userId }))
        }
    }

    Promise.all(promises).then(_ => {
        promiseRunning.value = false;
        emits('close', props.checkedUsers);
    }).catch(e => {
        alert(e.message);
    })
}
</script>
