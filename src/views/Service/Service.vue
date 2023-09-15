<template lang="pug">
template(v-if='currentService')
    .infoWrap
        .info
            .title 
                template(v-if="modifyServiceName")
                    form.modifyForm(@submit.prevent="changeServiceName")
                        input#modifyServiceName(type="text" placeholder="Service name" :value='inputServiceName' @input="(e) => inputServiceName = e.target.value" required)
                        .buttonWrap
                            button.cancel(type="button" @click="modifyServiceName = false;") Cancel
                            button.save(type="submit") Save
                template(v-else)
                    h2 {{ currentService.name }}
                    .material-symbols-outlined.mid.modify.clickable(@click="inputServiceName = currentService.name; modifyServiceName = true;") edit
            .toggleWrap(:class="{'active': currentService.active === 1 }")
                span Disable/Enable
                .toggleBg
                    .toggleBtn(@click="enableDisableToggle")
        .info
            .title 
                h2 Service Information
            .listWrap 
                .list(style="width: 100%")
                    span Service ID
                    h5 {{ currentService.service }}
                    .copy.clickable(@click="copy")
                        .material-symbols-outlined.mid file_copy
                .list(style="width: 100%")
                    span Owner ID
                    h5 {{ currentService.owner }}
                    .copy.clickable(@click="copy")
                        .material-symbols-outlined.mid file_copy
                //- .list(style="width: 50%")
                //-     span Service Location
                //-     h5 {{ currentService.created_locale }}
                .list(style="width: 50%")
                    span Date Created
                    h5 {{ new Date(currentService.timestamp).toDateString() }}
        .info
            .title 
                h2 Security Setting
            .listWrap
                .list(style="width: 100%")
                    span(:class="{ active: modifyCors }") Cors Origin
                    template(v-if="modifyCors")
                        form.modifyForm(style="margin-top: 8px" @submit.prevent="changeCors")
                            input#modifyCors(type="text" placeholder='https://your.domain.com' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")
                            .buttonWrap 
                                button.cancel(type="button" @click="modifyCors = false;") Cancel
                                button.save(type="submit") Save
                    template(v-else)
                        h5 {{ currentService.cors || '*' }}
                        .material-symbols-outlined.mid.pen.clickable(@click="inputCors = currentService.cors === '*' ? '' : currentService.cors; modifyCors = true;") edit

                .list(style="width: 100%")
                    span(:class="{ active: modifyKey }") Secret Key
                    template(v-if="modifyKey")
                        form.modifyForm(style="margin-top: 8px" @submit.prevent="setSecretKey")
                            input#modifyKey(type="text" placeholder="Secret key for external request" :value='inputKey' @input="(e) => inputKey = e.target.value")
                            .buttonWrap 
                                button.cancel(type="button" @click="modifyKey = false;") Cancel
                                button.save(type="submit") Save
                    template(v-else)
                        h5 {{ currentService.api_key || 'No key' }}
                        .material-symbols-outlined.mid.pen.clickable(@click="inputKey = currentService.api_key; modifyKey = true;") edit
            .que 
                .material-symbols-outlined.empty.sml help 
                span Help
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
    .deleteWrap
        .deleteInner(@click="openDeleteService = true;")
            .material-symbols-outlined.mid delete
            span Delete Service
    DisableService(v-if="openDisableService" @close="disableService")
    DeleteService(v-if="openDeleteService" @close="openDeleteService = false;")

</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { currentService, storageInfo } from '@/data.js';
import { skapi } from '@/main.js';
import DisableService from '@/views/Service/Overlay/DisableService.vue';
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

let changeServiceName = () => {
    if (currentService.value.name !== inputServiceName) {
        let previous = currentService.value.name;
        skapi.updateService(currentService.value.service, {
            name: inputServiceName
        }).catch(err => {
            currentService.value.name = previous;
            throw err;
        });
        currentService.value.name = inputServiceName;
    }
    modifyServiceName.value = false;
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
    if (enableDisablePromise.value) {
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

        &:nth-child(3),
        &:nth-child(5),
        &:nth-child(7) {
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
                color: rgba(0, 0, 0, 0.4);
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
                    color: rgba(0, 0, 0, 0.4);

                    &.active {
                        font-weight: 700;
                        color: rgba(0, 0, 0, 0.6);
                    }
                }

                h5 {
                    font-size: 16px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 0.6);
                    margin-top: 8px;
                }

                .copy,
                .pen {
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
        color: rgba(0, 0, 0, 0.8);
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