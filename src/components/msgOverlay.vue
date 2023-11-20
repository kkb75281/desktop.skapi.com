<template lang="pug">
#overlayWindow(@click="closeDialog" @mousedown="pendClose = true" style='--max-width: 480px;')
    .overlayWrap(@mousedown.stop @mouseup='pendClose = false')
        header
            h5.title {{ props.title }}
        main
            .content
                slot
</template>
    
<script setup>
let props = defineProps(['title', 'preventBackgroundClick']);
let emits = defineEmits(['close']);
let pendClose = false;
let closeDialog = () => {
    if (props.preventBackgroundClick) {
        return;
    }
    else if (pendClose) {
        emits('close');
    }
}
</script>