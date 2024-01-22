<template lang="pug">
#overlayWindow.deleteFile(@click="emits('close')" style="--max-width: 376px;")
    .overlayWrap(@click.stop)
        header
            h5.title.red {{ props.title }}
        main
            .content
                p 
                    slot
                    | This process cannot be undone.
                br
                .buttonWrap 
                    template(v-if="promiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button.noLine(@click="emits('close')") Cancel
                        button.unFinished.warning(v-if="props.title == 'Empty Storage'" @click="runCallback") Empty
                        button.unFinished.warning(v-else @click="runCallback") Delete
</template>

<script setup>
// import { skapi } from '@/main.js';
// import { currentService } from '@/data.js';
import { ref } from 'vue';

let emits = defineEmits(['close']);
let props = defineProps(['callback', 'title']);
let promiseRunning = ref(false);
let deleteFiles = () => {
    console.log(props.checkedFiles);
    emits('close');
}
let runCallback = () => {
    promiseRunning.value = true;
    props.callback().then(() => {
        emits('close');
    }).finally(() => {
        promiseRunning.value = false;
    })
}
</script>