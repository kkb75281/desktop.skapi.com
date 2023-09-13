<template lang="pug">
.containerWrap
    .container
        h2 Subdomain
        template(v-if="currnetService.subdomain")
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
                        h5 {{ currnetService.subdomain }}
                        .material-symbols-outlined.mid.btn edit
                .setting
                    .tit 404 file
                    .cont 
                        input(type="text" placeholder="Enter path eg. /404.html" :value="errorFile" @input="(e) => errorFile = e.target.value")
                        .uploadBtn.btn
                            .material-symbols-outlined.mid upload
                            button(type="submit") Upload
        template(v-else)
            .create 
                .tit Register Subdomain
                .input 
                    input(type="text" placeholder="Name of Subdomain")
                    button Create
    .container(v-if="currnetService.subdomain")
        .filesHeader
            .filesPathWrap
            .filesButtonWrap
                .material-symbols-outlined.mid cached
        .filesWrapper
</template>

<script setup>
import { inject, ref } from 'vue';
import { skapi, account } from '@/main.js';

let currnetService = inject('currnetService');
let errorFile = ref('');
console.log(currnetService.subdomain)
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
        .settingWrap {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            .setting {
                width: 45%;
                .tit {
                    color: rgba(0, 0, 0, 0.40);
                    font-size: 16px;
                    font-weight: 500;
                }
                .cont {
                    position: relative;
                    width: 100%;
                    padding: 12px 0;
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
                    }
                    input {
                        border: 0;
                        background-color: unset;
                        font-size: 16px;
                    }
                    .uploadBtn {
                        display: flex;
                        flex-wrap: nowrap;
                        align-items: center;
                        color: #293FE6;
                        height: 32px;
                        padding: 0 12px;
                        border-radius: 8px;
                        border: 2px solid #293FE6;
                        cursor: pointer;

                        button {
                            margin-left: 5px;
                            border: 0;
                            font-size: 16px;
                            font-weight: 700;
                            color: #293FE6;
                            background-color: unset;
                        }
                    }
                    .btn {
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
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