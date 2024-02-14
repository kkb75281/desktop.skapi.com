<template lang="pug">
#overlayWindow.upgradePlan(@click="emits('close')" style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        header
            .title.blue
                h5 Upgrade Plan
        main
            .content
                p Do you truly wish to upgrade your plan? Plan changes are only possible once per day.
                br
                br
                .buttonWrap 
                    button.noLine(@click="emits('close')") Cancel
                    button.final(@click="emits('close','disable')") Upgrade
</template>

<script setup>
let emits = defineEmits(['close']);
</script>