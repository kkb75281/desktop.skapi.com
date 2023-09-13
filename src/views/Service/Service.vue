<template lang="pug">
template(v-if='currnetService')
    .infoWrap
        .info
            .title 
                template(v-if="modifyServiceName")
                    form.modifyForm(@submit.prevent="modify" action="")
                        input#modifyServiceName(type="text" :placeholder="`${currnetService.name}`" :value='inputServiceName' @input="(e) => inputServiceName = e.target.value")
                        .buttonWrap 
                            template(v-if="promiseRunning")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button.cancel(type="button" @click="modifyServiceName = false;") Cancel
                                button.save(type="submit") Save
                template(v-else)
                    h2 {{ currnetService.name }}
                    .material-symbols-outlined.mid.modify.clickable(@click="inputServiceName = currnetService.name; modifyServiceName = true;") edit
            .toggleWrap(:class="{'active': currnetService.active == 1 }")
                span Disable/Enable
                .toggleBg
                    .toggleBtn(@click="disableCheck")
        .info
            .title 
                h2 Service Information
            .listWrap 
                .list(style="width: 100%")
                    span Service ID
                    h5 {{ currnetService.service }}
                    .copy.clickable(@click="copy")
                        .material-symbols-outlined.mid file_copy
                .list(style="width: 100%")
                    span Owner ID
                    h5 {{ currnetService.owner }}
                    .copy.clickable(@click="copy")
                        .material-symbols-outlined.mid file_copy
                .list(style="width: 50%")
                    span Service Location
                    h5 {{ currnetService.created_locale }}
                .list(style="width: 50%")
                    span Date Created
                    h5 {{ currnetService.timestamp }}
        .info
            .title 
                h2 Security Setting
            .listWrap
                .list(style="width: 100%")
                    span(:class="{ active: modifyCors }") Cors
                    template(v-if="modifyCors")
                        form.modifyForm(style="margin-top: 8px")
                            input#modifyCors(type="text" :placeholder="`${currnetService.cors}`" :value='inputCors' @input="(e) => inputCors = e.target.value")
                            .buttonWrap 
                                button.cancel(type="button" @click="modifyCors = false;") Cancel
                                button.save(type="button") Save
                    template(v-else)
                        h5 {{ currnetService.cors }}
                        .material-symbols-outlined.mid.pen.clickable(@click="inputCors = currnetService.cors; modifyCors = true;") edit
                .list(style="width: 100%")
                    span(:class="{ active: modifyKey }") Secret Key
                    template(v-if="modifyKey")
                        form.modifyForm(style="margin-top: 8px")
                            input#modifyKey(type="text" :placeholder="`${currnetService.secretKey}`" :value='inputKey' @input="(e) => inputKey = e.target.value")
                            .buttonWrap 
                                button.cancel(type="button" @click="modifyKey = false;") Cancel
                                button.save(type="button") Save
                    template(v-else)
                        h5 {{ currnetService.secretKey }}
                        .material-symbols-outlined.mid.pen.clickable(@click="inputKey = currnetService.secretKey; modifyKey = true;") edit
            .que 
                .material-symbols-outlined.empty.sml help 
                span Help
        .info.hover.user(@click="clicked")
            .titleWrap
                .title 
                    .material-symbols-outlined.big group
                    h2 Users
            .listWrap.noWrap
                .list
                    span # of Users
                    h5 {{ currnetService.users }}
                .list
                    span # of Blocked Users
                    h5 545
                .list
                    span # of Inactive Users
                    h5 545
        .info.hover.record(@click="clicked")
            .titleWrap
                .title 
                    .material-symbols-outlined.big folder_open
                    h2 Records
            .listWrap.noWrap
                .list
                    span # of Records
                    h5 545
                .list
                    span # of Tables
                    h5 545
                .list
                    span # of Storage Used
                    h5 233KB
        .info.hover.mail(@click="clicked")
            .titleWrap
                .title 
                    .material-symbols-outlined.big mail
                    h2 Mail
            .listWrap.noWrap
                .list
                    span # of Newsletter
                    h5 545
                .list
                    span # Subscribers
                    h5 545
        .info.hover.domain(@click="clicked")
            .titleWrap
                .title 
                    .material-symbols-outlined.big language
                    h2 Subdomain
            .listWrap.noWrap
                .list
                    span Registered Subdomain
                    h5 {{ currnetService.subdomain }}
                .list
                    span Storage used
                    h5 545
    .deleteWrap(@click="openDeleteService = true;")
        .deleteInner
            .material-symbols-outlined.mid delete
            span Delete Service
    DisableService(v-if="openDisableService" @close="openDisableService = false;")
    DeleteService(v-if="openDeleteService" @close="openDeleteService = false;")

</template>

<script setup>
import { inject, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { services, users } from '@/data.js';
import DisableService from '@/views/Service/Overlay/DisableService.vue';
import DeleteService from '@/views/Service/Overlay/DeleteService.vue';

const route = useRoute();
const router = useRouter();
let promiseRunning = ref(false);
let ableDisable = ref(true);
let modifyServiceName = ref(false);
let modifyCors = ref(false);
let modifyKey = ref(false);
let openDisableService = ref(false);
let openDeleteService = ref(false);
let inputServiceName = '';
let inputCors = ref('');
let inputKey = ref('')
let currnetPath = route.path.split('/')[2];
let currnetService = services.value.find(service => service.service === currnetPath);

let clicked = (e) => {
    let target = e.currentTarget;

    target.classList.add('clicked');
    setTimeout(() => {
        if(target.classList.contains('user')) {
            router.push({ path: `/dashboard/${currnetService.service}/users` });
        }
        if(target.classList.contains('record')) {
            router.push({ path: `/dashboard/${currnetService.service}/records` });
        }
        if(target.classList.contains('mail')) {
            router.push({ path: `/dashboard/${currnetService.service}/mail` });
        }
        if(target.classList.contains('domain')) {
            router.push({ path: `/dashboard/${currnetService.service}/subdomain` });
        }
    }, 200);
}
let copy = (e) => {
    let currentTarget = e.currentTarget;
    let doc = document.createElement('textarea');
    doc.textContent = currentTarget.previousSibling.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    currentTarget.classList.add('copied');
    setTimeout(() => {
        currentTarget.classList.remove('copied');
    }, 1000);
}
let modify = () => {
    promiseRunning.value = true;
    if(currnetService.name === inputServiceName) {
        promiseRunning.value = false;
        modifyServiceName.value = false;
    } else {
        currnetService.name = inputServiceName;
        promiseRunning.value = false;
        modifyServiceName.value = false;
    }
}
let disableCheck = () => {
    if(currnetService.active === 0) {
        currnetService.active = 1;
    } else {
        openDisableService.value = true;
    }
}
watch(modifyServiceName, () => {
    if (modifyServiceName.value) {
        nextTick(() => {
            document.getElementById('modifyServiceName').focus();
        })
    }
})
watch(modifyKey, () => {
    if (modifyKey.value) {
        nextTick(() => {
            document.getElementById('modifyKey').focus();
        })
    }
})
watch(modifyCors, () => {
    if (modifyCors.value) {
        nextTick(() => {
            document.getElementById('modifyCors').focus();
        })
    }
})
</script>

<style lang="less" scoped>
.infoWrap {
    display: flex;
    flex-wrap: wrap;
    .info {
        width: 100%;
        padding: 40px;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));

        &:first-child {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
        }
        &:not(:first-child) {
            width: 49%;
            margin-right: 2%;
        }
        &:nth-child(3), &:nth-child(5), &:nth-child(7) {
            margin-right: 0;
        }
        &.hover {
            &.clicked {
                box-shadow: 0 0 0 4px #A5AFFF inset;
            }
            &:hover {
                cursor: pointer;
                background-color: rgba(41, 63, 230, 0.05);
                filter: drop-shadow(8px 12px 36px rgba(255, 255, 255, 0.30));
            }
        }
        .titleWrap {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            
            svg {
                width: 32px;
                height: 32px;
                color: rgba(0,0,0,0.4);
            }
        }
        .title {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            h2 {
                font-size: 24px;
            }
            .material-symbols-outlined {
                margin-right: 17px;
            }
            .modify {
                width: 24px;
                height: 24px;
                margin-left: 8px;
                margin-right: 0;
            }
        }
        .listWrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            &.noWrap {
                flex-wrap: nowrap;

                .list {
                    width: 33.333%;
                }
            }
            .list {
                position: relative;
                margin-top: 28px;

                span {
                    font-size: 16px;
                    color: rgba(0,0,0,0.4);

                    &.active {
                        font-weight: 700;
                        color: rgba(0,0,0,0.6);
                    }
                }
                h5 {
                    font-size: 16px;
                    font-weight: 700;
                    color: rgba(0,0,0,0.6);
                    margin-top: 8px;
                }
                .copy, .pen {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .copy {
                    &::after {
                        position: absolute;
                        display: block;
                        right: 25px;
                        top: 50%;
                        transform: translateY(-50%);
                        text-align: center;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 0.5);
                        padding: 4px;
                        content: "Copied";
                        transition: opacity .4s;
                        opacity: 0;
                    }

                    &.copied::after {
                        opacity: 1;
                    }
                }
            }
        }
        .que {
            position: absolute;
            top: 46px;
            right: 44px;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            color: rgba(0,0,0,0.6);
            cursor: help;

            span {
                margin-left: 8px;
                font-size: 16px;
                font-weight: 500;
            }
        }
    }
}
.deleteWrap {
    display: inline-block;
    float: right;
    width: 150px;
    color: #F04E4E;
    margin-top: 20px;
    cursor: pointer;

    .deleteInner {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        span {
            margin-left: 14px;
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
        }
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
    .buttonWrap {
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
</style>