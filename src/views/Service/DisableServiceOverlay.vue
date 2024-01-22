<template lang="pug">
#overlayWindow.disableService(@click="emits('close')" style='--max-width: 376px;')
    .overlayWrap(@click.stop)
        header
            h5.title Disable Service
        main
            .content
                p This action will disable your service. Unless the service is re-enabled, the disabled service will be deleted after 1 month.
                br
                br
                .buttonWrap 
                    button.noLine(@click="emits('close')") Cancel
                    button.unFinished.warning(@click="emits('close','disable')") Disable
</template>

<script setup>
let emits = defineEmits(['close']);
</script>