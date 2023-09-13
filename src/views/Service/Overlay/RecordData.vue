<template lang="pug">
dialog#recordDataDialog(@click="closeDialog")
    template(v-if="selectedData")
        .header 
            h4 {{ selectedData.type }} - {{ selectedData.key }}
            .editWrap(@click="edit")
                .material-symbols-outlined.mid edit
                span edit
        .content {{ selectedData.context }}
    template(v-else-if="editRecordData")
        .header 
            h4 {{ editRecordData.type }} - {{ editRecordData.key }}
        .content 
            textarea(:value="editRecordData.context" @input="heightControl")
        .buttonWrap 
            button.cancel Cancel
            button.save Save
</template>

<script setup>
import { nextTick } from 'vue';

let props = defineProps(['selectedData','editRecordData']);
let edit = async() => {
    await nextTick();
}
let closeDialog = (e) => {
    let rect = e.target.getBoundingClientRect();

    if (rect.left > e.clientX ||rect.right < e.clientX ||rect.top > e.clientY ||rect.bottom < e.clientY) {
        e.target.close();
    } else if (e.target.classList.contains('cancel')){
        e.target.parentNode.parentNode.close();
    }
}
let heightControl = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = (e.target.scrollHeight) + "px";
}
</script>

<style lang="less" scoped>
dialog {
    position: fixed;
    content: '';
    left: 50%;
    top: 50%;
    width: 580px;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
    z-index: 999;

    .header {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);

        .editWrap {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            user-select: none;
            cursor: pointer;

            span {
                margin-left: 8px;
            }
        }
    }
    .content {
        padding: 20px 20px 28px;

        textarea {
            width: 100%;
            max-height: calc(100vh*0.5);
            border: 0;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.05);
            padding: 12px;
            color: rgba(0, 0, 0, 0.60);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            resize: none;
        }
    }
    .buttonWrap {
        width: 100%;
        padding: 0 20px 20px 20px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;

        button {
            background-color: unset;
            color: #293FE6;
            font-size: 16px;
            font-weight: 700;
            user-select: none;
            cursor: pointer;

            &.cancel {
                border: 0;
            }
            &.save {
                padding: 0 28px;
                height: 44px;
                border-radius: 8px;
                border: 2px solid #293FE6;
            }
        }
    }
}
dialog::backdrop {
    background-color: rgba(0,0,0,0.2);
}
</style>