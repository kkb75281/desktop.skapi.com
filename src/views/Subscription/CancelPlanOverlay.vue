<template lang="pug">
#overlayWindow.cancelPlan(@click="emits('close')" style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        header
            .title.withIcon.red
                .material-symbols-outlined.mid.icon warning
                h5 Cancel Plan
        main
            .content
                p During the cancellation, the service is deactivated. After three months, all data and users will be deleted unless you resume the plan before then. 
                br
                p Still want to cancel ?
                br
                br
                .buttonWrap 
                    button.noLine(@click="emits('close')") Cancel
                    button.unFinished.warning(@click="emits('close','disable')") Cancel Plan
</template>

<script setup>
let emits = defineEmits(['close']);
</script>