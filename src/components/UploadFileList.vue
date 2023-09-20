<template lang="pug">
.uploadListWrapper(:class="{'hide' : hideList}")
    .header
        .number Uploading {{ fileList.length }} files
        .buttonWrap
            button.cancel(@click="emits('close')") Cancel
            .material-symbols-outlined.mid(v-if="!hideList" @click="hideList = true;") expand_more
            .material-symbols-outlined.mid(v-else @click="hideList = false;") expand_less
    .progressBar
    .content   
        .listWrap 
            .list(v-for="(file, index) in fileList") 
                .file 
                    .material-symbols-outlined.mid(v-if="file.type == 'folder'") folder
                    .material-symbols-outlined.mid(v-else-if="file.type.includes('html')") html
                    .material-symbols-outlined.mid(v-else-if="file.type.includes('css')") css
                    .material-symbols-outlined.mid(v-else-if="file.type.includes('pdf')") picture_as_pdf
                    .material-symbols-outlined.mid(v-else-if="file.type.includes('image')") image
                    .material-symbols-outlined.mid(v-else-if="file.type.includes('video')") movie
                    .material-symbols-outlined.mid(v-else="file.type == 'file'") draft
                    .pathWrapper
                        .path {{ file.name }}
                .sucess
</template>
<script setup>
import { ref } from "vue";

let props = defineProps(['fileList']);
let emits = defineEmits(['close']);
let hideList = ref(false);
</script>
<style lang="less">
.uploadListWrapper {
    position: fixed;
    width: 500px;
    border-radius: 4px;
    right: 40px;
    bottom: 0;
    background-color: #fafafa;
    border: 1px solid rgba(0,0,0,0.15);

    &.hide {
        bottom: -328px;
    }
    .header {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 60px;
        border-radius: 4px 4px 0px 0px;
        background: rgba(41, 63, 230, 0.05);
        padding: 20px 28px;
        font-size: 20px;
        font-weight: 500;

        .buttonWrap {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            * {
                cursor: pointer;
            }
            .cancel {
                border: 0;
                background-color: unset;
                margin-right: 20px;
                font-size: 16px;
                font-weight: 700;
                color: #293FE6;
            }
        }
    }
    .progressBar {
        width: 100%;
        height: 8px;
        background: rgba(41, 63, 230, 0.20);
    }
    .content {
        width: 100%;
        height: 320px;
        padding: 16px 28px;
        overflow: hidden;
        .listWrap {
            height: 100%;
            overflow-y: auto;
        }
        .list {
            height: 56px;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            .file {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                color: rgba(0,0,0,0.6);
                .pathWrapper {
                    margin-left: 12px;
                }
            }
        }
    }
}
</style>