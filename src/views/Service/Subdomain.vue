<template lang="pug">
.containerWrap
    .container
        h2 Subdomain
        template(v-if="!currentService.subdomain")
            .buttonWrap 
                .refresh.clickable
                    .material-symbols-outlined.mid cached
                    span Refrech CDN
                .delete.clickable
                    .material-symbols-outlined.mid delete
                    span Delete
            .settingWrap 
                .setting
                    .tit Subdomain
                    template(v-if="modifySudomain")
                        form.modifyForm(style="margin-top: 8px")
                            input#modifySudomain(type="text" :placeholder="`${currentService.subdomain}`" :value='inputSubdomain' @input="(e) => inputSubdomain = e.target.value")
                            .btnWrap
                                button.cancel(type="button" @click="modifySudomain = false;") Cancel
                                button.save(type="submit") Save
                    template(v-else)
                        .cont
                            h5 subdomain name here
                            .material-symbols-outlined.mid.btn(@click="modifySudomain = true;") edit
                .setting
                    .tit 404 file
                    .cont 
                        .customFile 
                            input#fileName(value="Upload a file")
                            label.uploadBtn.btn(for="file")
                                .material-symbols-outlined.mid upload
                                span Upload
                            input#file(hidden type="file" @change="showFileName")
        template(v-else)
            .create 
                .tit Register Subdomain
                .input 
                    input(type="text" placeholder="Name of Subdomain")
                    button Create
    .container(v-if="!currentService.subdomain")
        .filesHeader
            .filesPathWrap
                .material-symbols-outlined.big.clickable hard_drive
                span /
            .filesButtonWrap
                .material-symbols-outlined.mid.clickable cached
                .material-symbols-outlined.mid.clickable more_vert
                .uploadBtn
                    .material-symbols-outlined.mid upload
                    span Upload
        .filesWrapper
            template(v-if="currentService?.files[currentService.subdomain+"/"]?.list?.length == 0")
                .noFile
                    h2 No Files 
                    p You have not uploaded any files
            template(v-else-if="currentService?.files[currentService.subdomain+"/"]?.list?.length")
                .fileWrapper
                    .file(v-for="(file, index) in fileList")
                        .customCheckBox
                            input(type="checkbox" v-bind:id="index")
                            label(:for="index")
                                .material-symbols-outlined.mid.check check
                        .material-symbols-outlined.mid(v-if="file.type == 'folder'") folder
                        .material-symbols-outlined.mid(v-else-if="file.type == 'file'") draft
                        .pathWrapper
                            .path {{ file.name }}
            template(v-else)
                .dragNdropUpload
                    input(hidden type="file")
                    div
                        .material-symbols-outlined.empty(style="font-size:80px") file_present
                        p Drag and Drop Files or Folders here
                .selectUpload
                    input#selectFile(hidden type="file")
                    label(for="selectFile") Select File
        .uploadListWrapper 
            .header
                .number Uploading 24 files
            .progressBar
            .content    
                .list(v-for="(file, index) in fileList") 
                    .file 
                        .material-symbols-outlined.mid(v-if="file.type == 'folder'") folder
                        .material-symbols-outlined.mid(v-else-if="file.type == 'file'") draft
                        .pathWrapper
                            .path {{ file.name }}
                    .sucess

</template>

<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import { skapi, account } from '@/main.js';
import { services } from '@/data.js';

let route = useRoute();
let currnetPath = route.path.split('/')[2];
let currentService = services.value.find(service => service.service === currnetPath);
let modifySudomain = ref(false);
let inputSubdomain = ref('');
let errorFile = ref('');
let fileList = ref([
    {
        name: 'asdasd.jpg',
        type: 'file'
    },
    {
        name: 'asduhaosudad.css',
        type: 'file'
    },
    {
        name: 'imagefile.png',
        type: 'file'
    },
    {
        name: 'someFolder',
        type: 'folder'
    },
    {
        name: 'someFile.file',
        type: 'file'
    },
    {
        name: 'asduhaosudad.html',
        type: 'file'
    }
])
let showFileName = (e) => {
    let file = e.target.value.split('\\')[2];
    fileName.value = file;
}
</script>

<style lang="less" scoped>
.containerWrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    .container {
        position: relative;
        width: 100%;
        padding: 40px;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));

        h2 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 40px;
        }
        .buttonWrap {
            position: absolute;
            right: 40px;
            top: 40px;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            * {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                span {
                    font-size: 16px;
                    font-weight: 700;
                    margin-left: 12px;
                }
            }
            .refresh {
                color: #293FE6;
            }
            .delete {
                margin-left: 40px;
            }
        }
        .uploadBtn {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            color: #293FE6;
            width: 105px;
            height: 32px;
            border-radius: 8px;
            border: 2px solid #293FE6;
            cursor: pointer;

            span {
                margin-left: 3px;
                font-size: 16px;
                font-weight: 700;
                color: #293FE6;
            }
        }
        .settingWrap {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            .setting {
                width: 47%;
                .tit {
                    color: rgba(0, 0, 0, 0.40);
                    font-size: 16px;
                    font-weight: 500;
                }
                .cont {
                    position: relative;
                    width: 100%;
                    height: 44px;
                    line-height: 44px;

                    &::before {
                        position: absolute;
                        content: '';
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 1px;
                        background: rgba(0, 0, 0, 0.10);
                        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
                    }
                    h5 {
                        font-size: 16px;
                        font-weight: 700;
                        color: rgba(0,0,0,0.6);
                        &:hover {
                            color: rgba(0,0,0,0.8);
                            cursor: default;
                        }
                    }
                    .customFile {
                        #fileName {
                            border: 0;
                            background-color: unset;
                            font-size: 16px;
                            color: rgba(0,0,0,0.4);
                        }
                        // input[type="file"] {
                        //     display: none;
                        // }
                    }
                    .btn {
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }
                }
                .modifyForm {
                    display: flex;
                    flex-wrap: nowrap;
                    // gap: 12px;

                    input {
                        width: max(65%, 280px);
                        margin-right: 32px;
                        background-color: #EDEDED;
                        border: 0;
                        padding: 12px 20px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 500;
                        color: rgba(0,0,0,0.8);
                    }
                    .btnWrap {
                        // width: 35%;
                        display: flex;
                        flex-wrap: nowrap;
                        align-items: center;
                        justify-content: end;
                        
                        button {
                            border: 2px solid #293FE6;
                            border-radius: 8px;
                            padding: 6px 12px;
                            font-size: 16px;
                            font-weight: 700;
                            cursor: pointer;
                            &.cancel {
                                background-color: unset;
                                color: #293FE6;
                                margin-right: 12px;
                            }
                            &.save {
                                background-color: #293FE6;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
        .filesHeader {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
            .filesPathWrap {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                color: rgba(0, 0, 0, 0.60);
                span {
                    font-size: 20px;
                    font-weight: 500;
                    margin-left: 13px;
                }
            }
            .filesButtonWrap {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                .mid {
                    &:nth-child(2) {
                        margin: 0 25px;
                    }
                }
            }
        }
        .filesWrapper {
            position: relative;
            width: 100%;
            min-height: 448px;
            border-radius: 8px;
            border: 1px solid rgba(0, 0, 0, 0.10);

            .noFile {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: rgba(0, 0, 0, 0.40);
                text-align: center;
                h2 {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 28px;
                }
                p {
                    font-size: 20px;
                    font-weight: 500;
                }
            }
            .fileWrapper {
                padding: 32px 28px;
                .file {
                    width: 100%;
                    height: 40px;
                    padding: 10px;
                    border-radius: 4px;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    color: rgba(0,0,0,0.6);
                    &:nth-child(2n+1) {
                        background: rgba(0, 0, 0, 0.05);
                    }
                    .material-symbols-outlined {
                        margin-left: 10px;
                        margin-right: 20px;
                    }
                    .pathWrapper {
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
            }
            .dragNdropUpload {
                width: 100%;
                min-height: 448px;
                text-align: center;
                padding-top: 130px;
                color: rgba(0,0,0,0.4);
                p {
                    font-size: 20px;
                    font-weight: 500;
                    margin-top: 10px;
                }
            }
            .selectUpload {
                position: absolute;
                left: 50%;
                top: 65%;
                transform: translate(-50%, -50%);
                text-align: center;

                label {
                    width: 105px;
                    height: 32px;
                    padding: 6px 12px;
                    border-radius: 8px;
                    border: 2px solid #293FE6;
                    color: #293FE6;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                }
            }
        }
        .uploadListWrapper {
            position: absolute;
            width: 500px;
            border-radius: 4px;
            right: 0;
            bottom: 0;
            background-color: #fafafa;
            border: 1px solid rgba(0,0,0,0.15);
            .header {
                width: 100%;
                height: 60px;
                border-radius: 4px 4px 0px 0px;
                background: rgba(41, 63, 230, 0.05);
                padding: 20px 28px;
                font-size: 20px;
                font-weight: 500;
            }
            .progressBar {
                width: 100%;
                height: 8px;
                background: rgba(41, 63, 230, 0.20);
            }
            .content {
                width: 100%;
                height: 320px;
                overflow-y: auto;
                padding: 16px 28px;
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
        .create {
            width: 100%;
            padding: 28px;
            border-radius: 8px;
            border: 4px solid #A5AFFF;
            filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.10));
            .tit {
                color: #293FE6;
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 12px;
            }
            .input {
                position: relative;
                height: 44px;
                
                &::before {
                    position: absolute;
                    content: '';
                    width: 600px;
                    height: 100%;
                    border-radius: 8px;
                    background: rgba(0, 0, 0, 0.05);
                    z-index: -1;
                }
                &::after {
                    position: absolute;
                    content: '.skapi.com';
                    left: 500px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 16px;
                    font-weight: 400;
                }
                input {
                    border: 0;
                    width: 480px;
                    height: 44px;
                    padding: 13px;
                    margin-right: 140px;
                    background-color: unset;
                    font-size: 16px;
                    font-weight: 400;
                }
                button {
                    border: 0;
                    padding: 0 28px;
                    height: 44px;
                    border-radius: 8px;
                    color: #FFF;
                    font-size: 16px;
                    font-weight: 700;
                    background: #293FE6;
                    box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                }
            }
        }
    }
}
</style>