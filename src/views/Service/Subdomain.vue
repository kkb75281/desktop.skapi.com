<template lang="pug">
.containerWrap
    .container
        h2 Subdomain
        template(v-if="!currnetService.subdomain")
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
                    .cont 
                        h5 subdomain name here
                        .material-symbols-outlined.mid.btn edit
                .setting
                    .tit 404 file
                    .cont 
                        .customFile 
                            input#fileName(value="Upload a file")
                            label.uploadBtn.btn(for="file")
                                .material-symbols-outlined.mid upload
                                span Upload
                            input#file(type="file" @change="showFileName")
        template(v-else)
            .create 
                .tit Register Subdomain
                .input 
                    input(type="text" placeholder="Name of Subdomain")
                    button Create
    .container(v-if="!currnetService.subdomain")
        .filesHeader
            .filesPathWrap kk
            .filesButtonWrap
                .material-symbols-outlined.mid.clickable cached
                .material-symbols-outlined.mid.clickable more_vert
                .uploadBtn
                    .material-symbols-outlined.mid upload
                    span Upload
        .filesWrapper
            .noFile 
                h2 No Files 
                p You have not uploaded any files
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import { skapi, account } from '@/main.js';
import { services } from '@/data.js';

let route = useRoute();
let currnetPath = route.path.split('/')[2];
let currnetService = services.value.find(service => service.service === currnetPath);
let errorFile = ref('');
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
                        font-weight: 400;
                        color: rgba(0,0,0,0.4);
                        &:hover {
                            font-weight: 700;
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
                        input[type="file"] {
                            display: none;
                        }
                    }
                    .btn {
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
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
            width: 100%;
            min-height: 448px;
            border-radius: 8px;
            border: 1px solid rgba(0, 0, 0, 0.10);

            .noFile {

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