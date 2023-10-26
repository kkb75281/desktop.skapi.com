<template lang="pug">
#dialogBackground(@click="closeDialog" @mousedown="pendClose = true")
    .center
        .dialog(@mousedown.stop @mouseup='pendClose = false')
            .title {{ props.title }}
            div(style='padding: 28px;')
                slot
</template>
    
<script setup>
let props = defineProps(['title', 'preventBackgroundClick']);
let emits = defineEmits(['close']);
let closeDialog = () => {
    if (props.preventBackgroundClick) {
        return;
    }
    else {
        emits('close');
    }
}
</script>
    
<style lang="less" scoped>
#dialogBackground {
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

    max-width: 480px; // width of the dialog

    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);

    .title {
        position: relative;
        color: rgba(0, 0, 0, 0.80);
        font-size: 28px;
        font-weight: 700;
        padding: 28px 0;
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
}
</style>