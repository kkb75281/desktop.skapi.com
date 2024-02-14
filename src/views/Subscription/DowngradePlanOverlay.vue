<template lang="pug">
#overlayWindow.downgradePlan(@click="emits('close')" style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        header
            .title.blue
                h5 Downgrade Plan
        main
            .content
                p Do you really want to downgrade your plan? If you downgrade, you won't have access to some features of your current plan. Plan changes are only possible once per day.
                br
                br
                .buttonWrap 
                    button.noLine(@click="emits('close')") Cancel
                    button.final(@click="emits('close','disable')") Downgrade
</template>

<script setup>
let emits = defineEmits(['close']);
</script>