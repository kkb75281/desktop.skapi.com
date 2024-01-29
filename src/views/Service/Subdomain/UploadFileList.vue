<template lang="pug">
.uploadListWrapper(:class="{'hide' : hideList}")
    .header
        .number Uploading {{ fileList.length }} files
        .buttonWrap
            //- button.cancel(@click="emits('cancel')") Cancel
            .material-symbols-outlined.big(v-if="!hideList" @click="hideList = true;") expand_more
            .material-symbols-outlined.big(v-else @click="hideList = false;") expand_less
            .material-symbols-outlined.mid(:class="{'nonClickable' : props.uploadingPromise}" @click="emits('cancel')" style="margin-left:10px") close
    .progressBar
        .progress(:style="{ width: props.wholeProgress + '%', height: '100%', background: '#293FE6', position: 'absolute' }")
    .content   
        .listWrap 
            .list(v-for="(file, key, idx) in fileList" :class="hideDuplicateFolder(fileList, key, idx)" :key="idx")
                .pathWrapper
                    .material-symbols-outlined.mid.type(v-if="file.path.split('/').length > 1") folder
                    .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.html')") html
                    .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.css')") css
                    .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.pdf')") picture_as_pdf
                    .material-symbols-outlined.mid.type(v-else-if="img.includes(file.name.split('.').slice(-1)[0])") image
                    .material-symbols-outlined.mid.type(v-else-if="vid.includes(file.name.split('.').slice(-1)[0])") movie
                    .material-symbols-outlined.mid.type(v-else) draft
                    .path {{ file.path.split('/')[0] }}
                    .length(v-if="file.path.split('/').length > 1") 
                        span(v-if="props.uploadingPromise && file.progress !== 100") 0
                        span(v-else) {{ idx + 1 }}
                        span {{ ' / ' + (idx + 1) }}
                .status
                    //- .material-symbols-outlined.mid(v-if="file.status == 'uploading'") cloud_upload

                    .material-symbols-outlined.mid(v-if="file.progress === 100") check_circle
                    img.loading(v-else-if='file.progress < 1' src="@/assets/img/loading.png")
                    ProgressCircle(v-else :percent='file.progress')

                    //- .material-symbols-outlined.mid(v-else-if="file.status == 'error'") error
                    //- .material-symbols-outlined.mid(v-else) pending
</template>
<script setup>
import { computed, ref } from "vue";
import { img, vid } from '@/views/Service/Subdomain/extensions';
import ProgressCircle from "@/components/ProgressCircle.vue";
let props = defineProps(['fileList', 'wholeProgress', 'uploadingPromise', 'folderUpload']);
let emits = defineEmits(['cancel']);
let hideList = ref(false);
let hideDuplicateFolder = (fileList, key, idx) => {
    let keys = Object.keys(fileList);
    let thisFile = fileList[key];
    let thisFileIsFolder = thisFile.path.split('/').length > 1;
    let nextFile = keys?.[idx + 1] ? fileList[keys[idx + 1]] : null;
    let nextFileIsFolder = nextFile ? nextFile.path.split('/').length > 1 : false;
    if(thisFileIsFolder && nextFileIsFolder) {
        if(thisFile.path.split('/')[0] === nextFile.path.split('/')[0]) {
            // is same folder
            return 'displayNone';
        }
    }

    return '';
}

</script>
<style lang="less">
.displayNone {
    display: none !important;
}
.uploadListWrapper {
    position: fixed;
    width: 500px;
    border-radius: 4px;
    right: 40px;
    bottom: 0;
    background-color: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0.15);
    overflow: hidden;
    z-index: 999;

    &.hide {
        bottom: -321px;
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
        position: relative;
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

            .pathWrapper {
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                margin-left: 12px;
                color: rgba(0,0,0,0.6);

                .type {
                    margin-right: 20px;
                }

                .path {
                    width: 250px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .length {
                    width: 100px;
                    text-align: right;
                    font-size: 0.8rem;
                }
            }
        }
    }
}
</style>