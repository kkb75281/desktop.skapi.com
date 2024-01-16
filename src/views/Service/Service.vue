<template lang="pug">
main#service
    .infoWrap
        .info
            .title 
                .name(style="height: 44px;")
                    template(v-if="modifyServiceName")
                        form.modifyInputForm(@submit.prevent="changeServiceName")
                            .customInput
                                input#modifyServiceName(type="text" placeholder="Service name" :value='inputServiceName' @input="(e) => inputServiceName = e.target.value" required)
                                .material-symbols-outlined.sml.cancel(@click="modifyServiceName = false;") cancel
                            template(v-if="promiseRunning")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
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
                pre.codeInner.
                    #[span(style="color:#33adff") &lt;script] #[span(style="color:#58dfff") src]=#[span(style="color:#ffa600") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]#[span(style="color:#33adff") &gt;]#[span(style="color:#33adff") &lt;/script&gt;]
                    #[span(style="color:#33adff") &lt;script&gt;]
                    #[span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#ffa600") "{{ currentService.service }}"], #[span(style="color:#ffa600") "{{ currentService.owner }}"]);
                    #[span(style="color:#33adff") &lt;/script&gt;]
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
                        form.modifyInputForm(style="margin-top: 8px" @submit.prevent="changeCors")
                            .customInput
                                input#modifyCors(:disabled="promiseRunningCors || null" type="text" placeholder='https://your.domain.com' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")
                                .material-symbols-outlined.sml.cancel(@click="modifyCors = false;") cancel
                            template(v-if="promiseRunningCors")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button.save(type="submit") Save
                    template(v-else)
                        h5 {{ currentService.cors || '*' }}
                            .material-symbols-outlined.mid.pen.clickable(:class="{'nonClickable' : !account?.email_verified}" @click="editCors") edit

                .list
                    h6(:class="{ active: modifyKey }") Secret Key
                    template(v-if="modifyKey")
                        form.modifyInputForm(style="margin-top: 8px" @submit.prevent="setSecretKey")
                            .customInput
                                input#modifyKey(:disabled="promiseRunningSecKey || null" type="text" placeholder="Secret key for external request" :value='inputKey' @input="(e) => inputKey = e.target.value")
                                .material-symbols-outlined.sml.cancel(@click="modifyKey = false;") cancel
                            template(v-if="promiseRunningSecKey")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button.save(type="submit") Save
                    template(v-else)
                        h5 {{ currentService.api_key || 'No key' }}
                            .material-symbols-outlined.mid.pen.clickable(:class="{'nonClickable' : !account?.email_verified}" @click="editKey") edit

        .info.card
            .inner
                .title 
                    .logoTitle
                        .material-symbols-outlined.big group
                        h4 Users
                    router-link.material-symbols-outlined.arrowIcon.mid(:to='`/dashboard/${currentService.service}/users`') arrow_forward_ios
                .contWrap.noWrap
                    .cont 
                        h6 # of Users
                        p {{ currentService.users }}
                    .cont(style="width:unset;")
                        h6 Creating User
                        .customSelect 
                            select(:value="currentService.prevent_signup ? 'admin' : 'anyone'" @change="(e) => changeCreateUserMode(e)")
                                option(value="admin") Only Admin allowed 
                                option(value="anyone") Anyone allowed
                            .material-symbols-outlined.mid.search.selectArrowDown(style="right:-30px;top:66%;") arrow_drop_down

        .info.card
            .inner
                .title 
                    .logoTitle
                        .material-symbols-outlined.big database
                        h4 Database
                    router-link.material-symbols-outlined.arrowIcon.mid(:to='`/dashboard/${currentService.service}/records`') arrow_forward_ios
                .contWrap.noWrap
                    .cont 
                        h6 # of database storage Used
                        p {{ convertToMb(storageInfo?.[currentService.service]?.database) }}
                    .cont 
                        h6 # of cloud storage Used
                        p {{ convertToMb(storageInfo?.[currentService.service]?.cloud) }}

        .info.card
            .inner
                .title 
                    .logoTitle
                        .material-symbols-outlined.big mail
                        h4 Mail
                    router-link.material-symbols-outlined.arrowIcon.mid(:to='`/dashboard/${currentService.service}/mail`' :class="{'nonClick' : account.access_group == 1}") arrow_forward_ios
                .contWrap.noWrap
                    template(v-if="account.access_group == 1")
                        .cont(style="width:100%; padding:0;")
                            h6 Trial service does not provide mail.
                    template(v-else)
                        .cont 
                            h6 # Subscribers
                            p {{ currentService.newsletter_subscribers }}
                        .cont 
                            h6 # Mail storage used 
                            p {{ convertToMb(storageInfo?.[currentService.service]?.email) }}

        .info.card
            .inner
                .title 
                    .logoTitle
                        .material-symbols-outlined.big language
                        h4 Hosting
                    router-link.material-symbols-outlined.arrowIcon.mid(:to='`/dashboard/${currentService.service}/subdomain`' :class="{'nonClick' : account.access_group == 1}") arrow_forward_ios
                .contWrap.noWrap
                    template(v-if="account.access_group == 1")
                        .cont(style="width:100%; padding:0;")
                            h6 Trial service does not provide hosting.
                    template(v-else)
                        .cont 
                            h6 Registered Subdomain
                            p {{ currentSubdomain }}
                        .cont 
                            h6 Host storage used
                            p {{ convertToMb(storageInfo?.[currentService.service]?.host) }}

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
import { skapi, account, domain } from '@/main.js';
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
            return currentService.value.subdomain.slice(1) + '.' + domain;
        }
        return currentService.value.subdomain + '.' + domain;
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
    // let doc = document.createElement('textarea');
    // doc.textContent = currentTarget.previousSibling.textContent + '\n';
    // document.body.append(doc);
    // doc.select();
    // document.execCommand('copy');
    // doc.remove();
    const range = document.createRange();
    range.selectNode(currentTarget.previousSibling);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

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
let changeCreateUserMode = (e) => {
    e.target.parentNode.classList.add('nonClickable');

    skapi.setServiceOption({
        serviceId: currentService.value.service, option: {'prevent_signup': e.target.value == 'admin' ? true : false}
    }).then(() => {
        e.target.parentNode.classList.remove('nonClickable');
    }).catch(err => console.log(err));
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

        &.nonClick {
            opacity: 0.5;
            pointer-events: none;
            cursor: default;
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

        &.card {
            padding-top: 1.4rem;
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

            .logoTitle {
                .material-symbols-outlined {
                    margin-right: 17px;
                    vertical-align: middle;
                }
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

        .question {
            text-decoration: none;
            color: #293FE6;
            font-size: 0.8rem;
            font-weight: 500;

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

.codeWrap {
    position: relative;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: rgba(0,0,0,0.8);
    font-family: monospace;
    color: #FFF;
    box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
    margin-top: 1.5rem;
    user-select: text !important;
    margin-bottom: 1rem;

    .codeInner {
        width: 100%;
        white-space: pre;
        overflow-x: auto;
        padding: 1rem;
        line-height: 1.4;
        font-size: 0.9rem;
    }
    .copy {
        position: absolute;
        right: 20px;
        top: 28px;
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
            >.title {
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