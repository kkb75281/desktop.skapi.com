<template lang="pug">
template(v-if='currentService')
    .infoWrap
        .info
            .title 
                .name
                    template(v-if="modifyServiceName")
                        form.modifyForm.first(@submit.prevent="changeServiceName")
                            input#modifyServiceName(type="text" placeholder="Service name" :value='inputServiceName' @input="(e) => inputServiceName = e.target.value" required)
                            .buttonWrap
                                template(v-if="promiseRunning")
                                    img.loading(src="@/assets/img/loading.png")
                                template(v-else)
                                    button.cancel(type="button" @click="modifyServiceName = false;") Cancel
                                    button.save(type="submit") Save
                    template(v-else)
                        h2 {{ currentService.name }}
                        .material-symbols-outlined.mid.modify.clickable(:class="{'nonClickable' : !account.email_verified}" @click="editServiceName") edit
                .date 
                    span Date Created
                    h5 {{ new Date(currentService.timestamp).toDateString() }}
                .toggleWrap(:class="{'active': currentService.active >= 1}")
                    span Disable/Enable
                    .toggleBg(:class="{'nonClickable' : !account.email_verified}")
                        .toggleBtn(@click="enableDisableToggle")
            .startCode 
                .colorscripter-code(style="color:#f0f0f0;font-family:monospace !important; position:relative !important;overflow:auto")
                    table.colorscripter-code-table(style="width:100%;margin:0;padding:28px;border:none;background-color:#434343;border-radius:8px;font-size:16px;" cellspacing="0" cellpadding="0")
                        tr
                            td(style="padding:6px;border-right:2px solid #4f4f4f")
                                div(style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%")
                                    div(style="line-height:130%") 1
                            td(style="padding:6px 0;text-align:left")
                                div(style="margin:0;padding:0;color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%")
                                    div(style="padding:0 6px; white-space:pre; line-height:130%")
                                        span(style="color:#ff3399") const 
                                        span skapi 
                                        span(style="color:#ff3399") = 
                                        span(style="color:#ff3399") new 
                                        span Skapi(‘
                                        span(style="color:#ffd500") ap22fAA39RwOW0KU6PUH
                                        span ', ' 
                                        span(style="color:#ffd500") 3dd7a40d-c0be-4489-bf11-e42d0e3458dc
                                        span ');
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.mid file_copy
            a.question(href="https://docs.skapi.com" target="_blank")
                .material-symbols-outlined.empty.sml help 
                span Where do I put this code?
        .info 
            .title 
                h2 Security Setting
                .question.help
                    .material-symbols-outlined.empty.sml help 
                    span Help
            .listWrap
                .list
                    span(:class="{ active: modifyCors }") Cors
                    template(v-if="modifyCors")
                        form.modifyForm(style="margin-top: 8px" @submit.prevent="changeCors")
                            input#modifyCors(type="text" placeholder='https://your.domain.com' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")
                            .buttonWrap 
                                template(v-if="promiseRunning")
                                    img.loading(src="@/assets/img/loading.png")
                                template(v-else)
                                    button.cancel(type="button" @click="modifyCors = false;") Cancel
                                    button.save(type="submit") Save
                    template(v-else)
                        h5 {{ currentService.cors || '*' }}
                            .material-symbols-outlined.mid.pen.clickable(:class="{'nonClickable' : !account.email_verified}" @click="editCors") edit

                .list
                    span(:class="{ active: modifyKey }") Secret Key
                    template(v-if="modifyKey")
                        form.modifyForm(style="margin-top: 8px" @submit.prevent="setSecretKey")
                            input#modifyKey(type="text" placeholder="Secret key for external request" :value='inputKey' @input="(e) => inputKey = e.target.value")
                            .buttonWrap 
                                template(v-if="promiseRunning")
                                    img.loading(src="@/assets/img/loading.png")
                                template(v-else)
                                    button.cancel(type="button" @click="modifyKey = false;") Cancel
                                    button.save(type="submit") Save
                    template(v-else)
                        h5 {{ currentService.api_key || 'No key' }}
                            .material-symbols-outlined.mid.pen.clickable(:class="{'nonClickable' : !account.email_verified}" @click="editKey") edit

        router-link.info.hover.user.clicked(:to='`/dashboard/${currentService.service}/users`')
            .titleWrap
                .title 
                    .material-symbols-outlined.big group
                    h2 Users
            .listWrap.noWrap
                .list
                    span # of Users
                    h5 {{ currentService.users }}
        router-link.info.hover.record.clicked(:to='`/dashboard/${currentService.service}/records`')
            .titleWrap
                .title 
                    .material-symbols-outlined.big folder_open
                    h2 Records
            .listWrap.noWrap
                .list
                    span # of database storage Used
                    h5 {{ convertToMb(storageInfo?.[currentService.service]?.database) }}
                .list
                    span # of cloud storage Used
                    h5 {{ convertToMb(storageInfo?.[currentService.service]?.cloud) }}
        router-link.info.hover.mail.clicked(:to='`/dashboard/${currentService.service}/mail`')
            .titleWrap
                .title 
                    .material-symbols-outlined.big mail
                    h2 Mail
            .listWrap.noWrap
                .list
                    span # Subscribers
                    h5 {{ currentService.newsletter_subscribers }}
                .list 
                    span # Mail storage used 
                    h5 {{ convertToMb(storageInfo?.[currentService.service]?.email) }}
        router-link.info.hover.domain.clicked(:to='`/dashboard/${currentService.service}/subdomain`')
            .titleWrap
                .title 
                    .material-symbols-outlined.big language
                    h2 Subdomain
            .listWrap.noWrap
                .list
                    span Registered Subdomain
                    h5 {{ currentService.subdomain ? currentService.subdomain + ".skapi.com" : 'No subdomain' }}
                .list
                    span Host storage used
                    h5 {{ convertToMb(storageInfo?.[currentService.service]?.host) }}
    .deleteWrap(:class="{'nonClickable' : !account.email_verified}")
        .deleteInner(@click="!account.email_verified ? false : openDeleteService = true;")
            .material-symbols-outlined.mid delete
            span Delete Service
    DisableServiceOverlay(v-if="openDisableService" @close="disableService")
    DeleteService(v-if="openDeleteService" @close="openDeleteService = false;")

</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { currentService, storageInfo } from '@/data.js';
import { skapi, account } from '@/main.js';
import DisableServiceOverlay from '@/views/Service/Records/DisableServiceOverlay.vue';
import DeleteService from '@/components/DeleteService.vue';

const router = useRouter();
let convertToMb = (size) => {
    if (size) {
        return (size / (1024 * 1024)).toFixed(2) + ' MB'
    }
    else {
        return '-'
    }
}
let modifyServiceName = ref(false);
let modifyCors = ref(false);
let modifyKey = ref(false);
let openDisableService = ref(false);
let openDeleteService = ref(false);
let inputServiceName = '';
let inputCors = ref('');
let inputKey = '';
let enableDisablePromise = ref(false);
let promiseRunning = ref(false);

// let clicked = (e) => {
//     let target = e.currentTarget;

//     target.classList.add('clicked');
//     setTimeout(() => {
//         if (target.classList.contains('user')) {
//             router.push({ path: `/dashboard/${currentService.value.service}/users` });
//         }
//         if (target.classList.contains('record')) {
//             router.push({ path: `/dashboard/${currentService.value.service}/records` });
//         }
//         if (target.classList.contains('mail')) {
//             router.push({ path: `/dashboard/${currentService.value.service}/mail` });
//         }
//         if (target.classList.contains('domain')) {
//             router.push({ path: `/dashboard/${currentService.value.service}/subdomain` });
//         }
//     }, 200);
// }
let editServiceName = () => {
    if(account.value.email_verified) {
        inputServiceName = currentService.value.name; 
        modifyServiceName.value = true;
    } else {
        return false;
    }
}
let editCors = () => {
    if(account.value.email_verified) {
        inputCors = currentService.value.cors === '*' ? '' : currentService.value.cors; modifyCors.value = true;
    } else {
        return false;
    }
}
let editKey = () => {
    if(account.value.email_verified) {
        inputKey = currentService.value.api_key; modifyKey.value = true;
    } else {
        return false;
    }
}
let copy = (e) => {
    let currentTarget = e.currentTarget;
    let doc = document.createElement('textarea');
    doc.textContent = currentTarget.previousSibling.textContent.slice(1);
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    currentTarget.classList.add('copied');
    setTimeout(() => {
        currentTarget.classList.remove('copied');
    }, 1000);
}

let changeServiceName = () => {
    if (currentService.value.name !== inputServiceName) {
        let previous = currentService.value.name;
        
        promiseRunning.value = true;

        skapi.updateService(currentService.value.service, {
            name: inputServiceName
        }).then(() => {
            promiseRunning.value = false;
            currentService.value.name = inputServiceName;
            modifyServiceName.value = false;
        }).catch(err => {
            promiseRunning.value = false;
            currentService.value.name = previous;
            throw err;
        });
    } else {
        return false;
    }
}
let changeCors = () => {
    let previous = currentService.value.cors;
    let corsArr = inputCors.value.split(',');
    let corsToUpdate = []
    for (let u of corsArr) {
        u = u.trim().toLowerCase();
        if (u && skapi.validate.url(u)) {
            corsToUpdate.push(u);
        }
        else {
            document.getElementById('modifyCors').setCustomValidity('Cors origin should be a valid URL. ex) https://your.domain.com');
            document.getElementById('modifyCors').reportValidity();
            return;
        }
    }

    corsToUpdate.sort()
    skapi.updateService(currentService.value.service, {
        cors: corsToUpdate.length ? corsToUpdate : ['*']
    }).catch(err => {
        currentService.value.cors = previous;
        throw err;
    });
    currentService.value.cors = corsToUpdate.join(', ');
    modifyCors.value = false;
}
let setSecretKey = () => {
    let previous = currentService.value.api_key;
    skapi.updateService(currentService.value.service, {
        api_key: inputKey
    }).catch(err => {
        currentService.value.api_key = previous;
        throw err;
    });

    currentService.value.api_key = inputKey;
    modifyKey.value = false;
}
let enableDisableToggle = () => {
    if (enableDisablePromise.value || !account.value.email_verified) {
        return;
    }
    if (currentService.value.active === 0) {
        // enable
        enableDisablePromise.value = skapi.enableService(currentService.value.service).catch(err => {
            currentService.value.active = 0;
            throw err;
        }).finally(_ => {
            enableDisablePromise.value = false;
        });;
        currentService.value.active = 1;
    } else {
        // disable (opens disable service dialog)
        openDisableService.value = true;
    }
}
let disableService = (e) => {
    if (enableDisablePromise.value) {
        return;
    }
    if (e === 'disable') {
        enableDisablePromise.value = skapi.disableService(currentService.value.service).catch(err => {
            currentService.value.active = 1;
            throw err;
        }).finally(_ => {
            enableDisablePromise.value = false;
        });
        currentService.value.active = 0;
    }
    openDisableService.value = false;
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
        width: 49%;
        padding: 40px;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        margin-right: 2%;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

        &:first-child, &:nth-child(2) {
            width: 100%;
            margin-right: 0;
        }

        &:nth-child(2) {
            .list {
                h5 {
                    height: 44px;
                    line-height: 44px;
                }
            }
        }

        &:nth-child(4),
        &:nth-child(6) {
            margin-right: 0;
        }

        &.hover {
            &.clicked {
                // router-link 스타일 없에기
                text-decoration: unset;
                color: unset;
            }

            &.clicked:active {
                box-shadow: 0 0 0 4px #A5AFFF inset;
            }

            &:hover {
                cursor: pointer;
                background-color: #F5F7FF;
                // filter: drop-shadow(8px 12px 36px rgba(255, 255, 255, 0.30));
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
                color: rgba(0, 0, 0, 0.4);
            }
        }

        .title {
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            align-items: center;

            h2 {
                font-size: 24px;
            }

            .name {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                width: 50%;
                height: 44px;
            }

            .date {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;

                span {
                    color: rgba(0, 0, 0, 0.40);
                    font-size: 16px;
                    font-weight: 500;
                    margin-right: 10px;
                }

                h5 {
                    color: rgba(0, 0, 0, 0.60);
                    font-size: 16px;
                    font-weight: 700;
                }
            }

            .date, .toggleWrap {
                width: 25%;
                justify-content: end;
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

            .question {
                margin: 0;
                margin-left: 32px;
                cursor: pointer;

                .material-symbols-outlined {
                    margin: 0;
                }
            }
        }

        .startCode {
            position: relative;
            margin-top: 40px;

            .copy {
                position: absolute;
                right: 28px;
                top: 50%;
                transform: translateY(-50%);
                color: #fff;

                &::after {
                    position: absolute;
                    display: block;
                    right: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    text-align: center;
                    font-size: 14px;
                    font-weight: 400;
                    background: rgba(255, 255, 255, 0.6);
                    color: #343434;
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

        .question {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            text-decoration: none;
            color: #293FE6;
            font-size: 16px;
            font-weight: 500;
            margin-top: 20px;
            
            &.help {
                color: rgba(0, 0, 0, 0.40);
            }
            span {
                margin-left: 5px;
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
                width: 48%;
                margin-top: 28px;

                span {
                    display: block;
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.4);

                    &.active {
                        font-weight: 700;
                        color: rgba(0, 0, 0, 0.6);
                    }
                }

                h5 {
                    position: relative;
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 0.6);
                    margin-top: 8px;
                    .pen {
                        position: absolute;
                        right: -50px;
                        top: 50%;
                        transform: translateY(-50%);
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
            color: rgba(0, 0, 0, 0.6);
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
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    color: #F04E4E;
    margin-top: 20px;

    .deleteInner {
        width: 150px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        cursor: pointer;

        span {
            margin-left: 14px;
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
        }
    }
}

.modifyForm {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    &.first {
        input {
            width: 52%;
            margin-right: 3%;
        }
        .buttonWrap {
            width: 45%;
        }
    }

    input {
        width: max(246px, 65%);
        height: 44px;
        margin-right: 3%;
        background-color: #EDEDED;
        border: 0;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
    }

    .buttonWrap {
        width: max(153px ,32%);
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        button {
            height: 44px;
            border: 2px solid #293FE6;
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;

            &.cancel {
                background-color: unset;
                color: #293FE6;
                margin-right: 10px;
            }

            &.save {
                background-color: #293FE6;
                color: #fff;
            }
        }
    }
}

@media (max-width: 1150px) {
    .infoWrap {
        .info {
            .title {
                .name {
                    width: 45%;
                }
                .date {
                    width: 30%;
                }
                .toggleWrap {
                    width: 25%;
                }
            }
        }
    }
}
</style>