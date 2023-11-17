<template lang="pug">
main#service
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
                        h4 {{ currentService.name }}
                        .material-symbols-outlined.mid.modify.clickable(:class="{'nonClickable' : !account?.email_verified}" @click="editServiceName") edit
                .right
                    .date 
                        span Date Created
                        h6 {{ new Date(currentService.timestamp).toDateString() }}
                    .toggleWrap(:class="{'active': currentService.active >= 1}")
                        span Disable/Enable
                        .toggleBg(:class="{'nonClickable' : !account?.email_verified}")
                            .toggleBtn(@click="enableDisableToggle")
            .codeWrap
                .codeInner
                    .line
                        div
                            span(style="color:#33adff") &lt;
                            span(style="color:#33adff") script 
                            span(style="color:#58dfff") src
                            span =
                            span(style="color:#ffa600") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"
                            span(style="color:#33adff") 
                            span(style="color:#33adff") &gt;
                            span(style="color:#33adff") &lt;
                            span(style="color:#33adff") /
                            span(style="color:#33adff") script
                            span(style="color:#33adff") &gt;
                        div
                            span(style="color:#33adff") &lt;
                            span(style="color:#33adff") script
                            span(style="color:#33adff") &gt;
                        div(style="margin-left: 30px")
                            span(style="color:#33adff") const 
                            span skapi 
                            span = 
                            span(style="color:#33adff") new 
                            span Skapi(
                            span(style="color:#ffa600") "{{ currentService.service }}"
                            span , 
                            span(style="color:#ffa600") "{{ currentService.owner }}"
                            span );
                        div
                            span(style="color:#33adff") &lt;
                            span(style="color:#33adff") /
                            span(style="color:#33adff") script
                            span(style="color:#33adff") &gt;
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.mid file_copy
            a.question(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank")
                .material-symbols-outlined.empty.sml help 
                span Where do I put this code?
        
        .info 
            .title 
                h4 Security Setting
                a.question.help(href='https://docs.skapi.com/security/security-settings.html' target="_blank")
                    .material-symbols-outlined.empty.sml help 
                    span Help
            .listWrap
                .list
                    h6(:class="{ active: modifyCors }") Cors
                    template(v-if="modifyCors")
                        form.modifyForm(style="margin-top: 8px" @submit.prevent="changeCors")
                            input#modifyCors(:disabled="promiseRunningCors || null" type="text" placeholder='https://your.domain.com' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")
                            .buttonWrap 
                                template(v-if="promiseRunningCors")
                                    img.loading(src="@/assets/img/loading.png")
                                template(v-else)
                                    button.cancel(type="button" @click="modifyCors = false;") Cancel
                                    button.save(type="submit") Save
                    template(v-else)
                        h5 {{ currentService.cors || '*' }}
                            .material-symbols-outlined.mid.pen.clickable(:class="{'nonClickable' : !account?.email_verified}" @click="editCors") edit

                .list
                    h6(:class="{ active: modifyKey }") Secret Key
                    template(v-if="modifyKey")
                        form.modifyForm(style="margin-top: 8px" @submit.prevent="setSecretKey")
                            input#modifyKey(:disabled="promiseRunningSecKey || null" type="text" placeholder="Secret key for external request" :value='inputKey' @input="(e) => inputKey = e.target.value")
                            .buttonWrap 
                                template(v-if="promiseRunningSecKey")
                                    img.loading(src="@/assets/img/loading.png")
                                template(v-else)
                                    button.cancel(type="button" @click="modifyKey = false;") Cancel
                                    button.save(type="submit") Save
                    template(v-else)
                        h5 {{ currentService.api_key || 'No key' }}
                            .material-symbols-outlined.mid.pen.clickable(:class="{'nonClickable' : !account?.email_verified}" @click="editKey") edit

        router-link.info.hover.user.clicked(:to='`/dashboard/${currentService.service}/users`')
            .titleWrap
                .title 
                    .material-symbols-outlined.big group
                    h4 Users
            .listWrap.noWrap
                .list
                    h6 # of Users
                    h5 {{ currentService.users }}
        router-link.info.hover.record.clicked(:to='`/dashboard/${currentService.service}/records`')
            .titleWrap
                .title 
                    .material-symbols-outlined.big database
                    h4 Database
            .listWrap.noWrap
                .list
                    h6 # of database storage Used
                    h5 {{ convertToMb(storageInfo?.[currentService.service]?.database) }}
                .list
                    h6 # of cloud storage Used
                    h5 {{ convertToMb(storageInfo?.[currentService.service]?.cloud) }}
        router-link.info.hover.mail.clicked(:to='`/dashboard/${currentService.service}/mail`')
            .titleWrap
                .title 
                    .material-symbols-outlined.big mail
                    h4 Mail
            .listWrap.noWrap
                .list
                    h6 # Subscribers
                    h5 {{ currentService.newsletter_subscribers }}
                .list 
                    h6 # Mail storage used 
                    h5 {{ convertToMb(storageInfo?.[currentService.service]?.email) }}
        router-link.info.hover.domain.clicked(:to='`/dashboard/${currentService.service}/subdomain`')
            .titleWrap
                .title 
                    .material-symbols-outlined.big language
                    h4 Hosting
            .listWrap.noWrap
                .list
                    h6 Registered Subdomain
                    h5 {{ currentSubdomain }}
                .list
                    h6 Host storage used
                    h5 {{ convertToMb(storageInfo?.[currentService.service]?.host) }}
    .deleteWrap(:class="{'nonClickable' : !account?.email_verified}")
        .deleteInner(@click="!account?.email_verified ? false : openDeleteService = true;")
            .material-symbols-outlined.mid delete
            span Delete Service
DisableServiceOverlay(v-if="openDisableService" @close="disableService")
DeleteService(v-if="openDeleteService" @close="openDeleteService = false;")
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { currentService, storageInfo } from '@/data.js';
import { skapi, account } from '@/main.js';
import DisableServiceOverlay from '@/views/Service/DisableServiceOverlay.vue';
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
let promiseRunningCors = ref(false);
let promiseRunningSecKey = ref(false);
let promiseRunning = ref(false);
let currentSubdomain = computed(() => {
    if (currentService.value.subdomain) {
        if (currentService.value.subdomain[0] === '*' || currentService.value.subdomain[0] === '+') {
            // subdomain will start with * or + when in pending state or removal state
            return currentService.value.subdomain.slice(1) + '.skapi.com';
        }
        return currentService.value.subdomain + '.skapi.com';
    }
    else {
        return 'No subdomain';
    }
});
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
    if (account.value?.email_verified) {
        inputServiceName = currentService.value.name;
        modifyServiceName.value = true;
    } else {
        return false;
    }
}
let editCors = () => {
    if (account.value?.email_verified) {
        inputCors.value = currentService.value.cors === '*' ? '' : currentService.value.cors; modifyCors.value = true;
    } else {
        return false;
    }
}
let editKey = () => {
    if (account.value?.email_verified) {
        inputKey = currentService.value.api_key; modifyKey.value = true;
    } else {
        return false;
    }
}
let copy = (e) => {
    let currentTarget = e.currentTarget;
    let doc = document.createElement('textarea');
    doc.textContent = currentTarget.previousSibling.textContent;
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
    let corsArr = inputCors.value.split(',');
    let corsToUpdate = []
    for (let u of corsArr) {
        u = u.trim().toLowerCase();
        if (u) {
            if (skapi.validate.url(u)) {
                corsToUpdate.push(u);
            }
            else {
                document.getElementById('modifyCors').setCustomValidity('Cors origin should be a valid URL. (Separated with comma) ex) https://your.domain1.com, https://your.domain2.com');
                document.getElementById('modifyCors').reportValidity();
                return;
            }
        }
    }

    promiseRunningCors.value = true;
    corsToUpdate.sort()
    skapi.updateService(currentService.value.service, {
        cors: corsToUpdate.length ? corsToUpdate : ['*']
    }).then(() => {
        promiseRunningCors.value = false;
        modifyCors.value = false;
        currentService.value.cors = corsToUpdate.join(', ');
    }).catch(err => {
        promiseRunningCors.value = false;
        nextTick(() => {
            document.getElementById('modifyCors').focus();
            document.getElementById('modifyCors').setCustomValidity(err.message);
            document.getElementById('modifyCors').reportValidity();
        });
    });
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
    if (enableDisablePromise.value || !account.value?.email_verified) {
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
#service {
    max-width: 1200px;
    margin: 0 auto;
}
.infoWrap {
    display: flex;
    flex-wrap: wrap;

    .info {
        width: 49%;
        padding: 2rem;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        margin-right: 2%;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

        &:first-child,
        &:nth-child(2) {
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

        .title {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: nowrap;

            .name {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                width: calc(100% - 480px);

                h4 {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            .right {
                text-align: end;

                > div {
                    text-align: right;
                    display: inline-block;
                    height: 30px;
                }
                .date {        
                    span {
                        color: rgba(0, 0, 0, 0.40);
                        font-size: 0.8rem;
                        font-weight: 500;
                        margin-right: 10px;
                    }
    
                    h6 {
                        display: inline-block;
                        color: rgba(0, 0, 0, 0.60);
                    }
                }
    
                .toggleWrap {
                    display: inline-block;
                    margin-left: 30px;
                    opacity: 1;
    
                    &.locked {
                        opacity: 0.4;
                    }
    
                    &.active {
                        .toggleBg {
                            background-color: #293FE6;
    
                            .toggleBtn {
                                transform: translate(31px, -50%);
                                transition: all 1s;
                            }
                        }
                    }
    
                    span {
                        color: rgba(0, 0, 0, 0.40);
                        font-size: 0.8rem;
                        font-weight: 500;
                    }
    
                    .toggleBg {
                        position: relative;
                        display: inline-block;
                        vertical-align: middle;
                        width: 63px;
                        height: 32px;
                        margin-left: 1rem;
                        border-radius: 16px;
                        background-color: rgba(0, 0, 0, 0.25);
                        transition: all 1s;
    
                        &.nonClickable { 
                            .toggleBtn {
                                cursor: default;
                            }
                        }
                        .toggleBtn {
                            position: absolute;
                            width: 26px;
                            height: 26px;
                            right: unset;
                            left: 3px;
                            top: 50%;
                            transform: translateY(-50%);
                            border-radius: 50%;
                            background-color: #eee;
                            transition: all 1s;
                            cursor: pointer;
                        }
                    }
                }
            }

            .material-symbols-outlined {
                margin-right: 17px;
                vertical-align: middle;
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

        .titleWrap {
            .title {
                justify-content: start;
            }
            
            h4 {
                display: inline-block;
            }
        }

        .codeWrap {
            font-family: monospace;
            margin-top: 1.5rem;
            padding: 1rem 2rem;
            text-align: left;
            box-shadow: unset;

            .copy {
                top: 20px;
                transform: unset;
                top: 20px;
                transform: unset;
            }
        }

        .question {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            text-decoration: none;
            color: #293FE6;
            font-size: 0.8rem;
            font-weight: 500;
            margin-top: 1rem;

            &.help {
                position: absolute;
                left: 9rem;
                top: 50%;
                transform: translateY(-50%);
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

                h6 {
                    font-weight: 500;
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
        width: max(153px, 32%);
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        button {
            height: 32px;
            border: 2px solid #293FE6;
            border-radius: 8px;
            padding: 0 12px;
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

@media (max-width: 1023px) {
    .infoWrap {
        .info {
            width: 100%;
            margin-right: 0;
        }
    }
}

@media (max-width:767px) {
    .infoWrap {
        .info {
            .title {
                display: block;

                .name {
                    width: 100%;
                    margin-bottom: 0.8rem;
                }

                .right {
                    > div {
                        text-align: left;
                    }
                }
            }
        }
    }
}
</style>