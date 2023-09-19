<template lang="pug">
#deleteRecord(@click="emits('close')")
    .wrap(@click.stop)
        .title Delete Record
        p 
            | You sure want to delete the record?
            br
            | This process cannot be undone.
        .buttonWrap 
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.cancel(@click="emits('close')") Cancel
                button.disable(@click="deleteRecords") Delete
</template>

<script setup>
import { skapi } from '@/main.js';
import { currentService } from '@/data.js';
import { ref } from 'vue';

let emits = defineEmits(['close']);
let props = defineProps(['checkedRecords']);
let promiseRunning = ref(false);

let deleteRecords = () => {
    console.log(props.checkedRecords)
}
</script>

<style lang="less" scoped>
#deleteRecord {
    position: fixed;
    overflow: auto;
    left: 0;
    top: 0;
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
    padding: 28px;
    width: 376px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
    z-index: 999;

    .title {
        position: relative;
        color: #F04E4E;
        font-size: 20px;
        font-weight: 700;

        &::before {
            position: absolute;
            content: '';
            left: -28px;
            bottom: -28px;
            width: calc(100% + 56px);
            height: 1px;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    p {
        width: 300px;
        margin-top: 56px;
        margin-bottom: 56px;
        font-size: 16px;
        font-weight: 400;
        line-height: 25px;
        color: rgba(0, 0, 0, 0.8);

        &:last-child {
            margin: 0;
        }
    }

    .buttonWrap {
        height: 44px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;

        button {
            height: 44px;
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
            border-radius: 8px;
            border: 2px solid #293FE6;
            padding: 10px 28px;
        }
    }
}
</style>