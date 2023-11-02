<template lang="pug">
EmailCaution(v-if="!account?.email_verified")
template(v-if='currentService')
    .navSide(:class="{'caution' : !account?.email_verified}")
        .navSideWrap
            router-link.logo(to="/")
                img(src="@/assets/img/logo/symbol-logo.png")
            .menuList 
                router-link.menu(:to="`/dashboard/${currentService.service}`" :class="{'active': route.name == 'service'}")
                    .material-symbols-outlined.big home
                    p Home
                router-link.menu(:to="`/dashboard/${currentService.service}/users`" :class="{'active': route.name == 'users'}")
                    .material-symbols-outlined.big supervisor_account
                    p Users
                router-link.menu(:to="`/dashboard/${currentService.service}/records`" :class="{'active': route.name == 'records'}")
                    .material-symbols-outlined.big database
                    p Database
                router-link.menu(:to="`/dashboard/${currentService.service}/mail`" :class="{'active': route.name == 'mail'}")
                    .material-symbols-outlined.big email
                    p Mail
                router-link.menu(:to="`/dashboard/${currentService.service}/subdomain`" :class="{'active': route.name == 'subdomain'}")
                    .material-symbols-outlined.big language
                    p Hosting
            .settingWrap
                .setting
                    .material-symbols-outlined.empty.sml.que help
                    a(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank") Help & getting started
                //- .settingIcon
                //-     .material-symbols-outlined.empty.sml brightness_5
                //- .settingToggle
                //-     input(type="checkbox" id="switch")
                //-     label(for="switch")
                //-         .toggle
                //-         .names
                //-             .light
                //-                 .material-symbols-outlined.empty.sml brightness_5
                //-                 span Light
                //-             .dark
                //-                 .material-symbols-outlined.empty.sml clear_night
                //-                 span Dark
    .navCont
        .navTop
            .routeWrap
                nav 
                    ol
                        li 
                            router-link(to="/dashboard") Dashboard
                        li(:class="{'active': route.name == 'service'}")
                            router-link(:to="`/dashboard/${currentService.service}`") {{ currentService.name }}
                        li(v-if="route.name == 'users'" :class="{'active': route.name == 'users'}")
                            router-link(:to="`/dashboard/${currentService.service}/users`") Users
                        li(v-if="route.name == 'records'" :class="{'active': route.name == 'records'}")
                            router-link(:to="`/dashboard/${currentService.service}/records`") Records
                        li(v-if="route.name == 'mail'" :class="{'active': route.name == 'mail'}")
                            router-link(:to="`/dashboard/${currentService.service}/records`") Mail
                        li(v-if="route.name == 'subdomain'" :class="{'active': route.name == 'subdomain'}")
                            router-link(:to="`/dashboard/${currentService.service}/records`") Hosting
            .menuWrap
                template(v-if="account")
                    ul
                        li
                            a(href="https://twitter.com/skapijs" target="_blank")
                                img(src="@/assets/img/icon/twitter.svg")
                        li
                            a(href="https://discord.gg/3QdZzQwR" target="_blank")
                                img(src="@/assets/img/icon/discord.svg")
                    ul
                        li 
                            a(href="https://docs.skapi.com" target="_blank") Documentation
                        li
                            router-link(to="/dashboard") Dashboard
                        li.account(@click.stop="accountInfo = !accountInfo") {{ account.email.charAt(0).toUpperCase() }}
                template(v-else)
                    ul
                        li
                            a(href="https://twitter.com/skapijs" target="_blank")
                                img(src="@/assets/img/icon/twitter.svg")
                        li
                            a(href="https://discord.com/channels/1164154380816236626/1164154380816236628" target="_blank")
                                img(src="@/assets/img/icon/discord.svg")
                    ul
                        li 
                            a(href="https://docs.skapi.com" target="_blank") Documentation
                        li
                            router-link(to="/login") Login
                        li 
                            router-link.signup(to="/signup") Sign-up
            .prof(v-if="accountInfo && account" @click.stop)
                .member 
                    span {{ account?.email }}
                .settings 
                    .setting(@click="navigateToPage")
                        .material-symbols-outlined.mid settings
                        .click Account Settings
                    .setting(@click="logout")
                        .material-symbols-outlined.mid logout
                        .click Logout
                .policy terms of service ● privacy policy
        .cont
            router-view
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { services, serviceFetching, currentService, storageInfo, serviceUsers, newsletter_sender } from '@/data.js';
import { serviceRecords } from '@/views/Service/Records/RecordFetch.js';
import { launch, serviceHost, subdomainInfo } from './subdomain/SubdomainFetch';
import { skapi, account, bodyClick } from '@/main.js';
import EmailCaution from '@/components/EmailCaution.vue';

currentService.value = null;

bodyClick.nav = () => {
    accountInfo.value = false;
}

const route = useRoute();
const router = useRouter();
let accountInfo = ref(false);
let navigateToPage = () => {
    accountInfo.value = false;
    router.push({ path: '/accountSettings' });
}
let logout = async () => {
    accountInfo.value = false;
    account.value = null;
    services.value = [];
    storageInfo.value = {};

    for (let k in serviceUsers) {
        delete serviceUsers[k];
    }

    for (let k in serviceRecords) {
        delete serviceRecords[k];
    }

    await skapi.logout();

    router.push({ path: '/' });
}

let getCurrentService = () => {
    let srvcId = route.path.split('/')[2];
    currentService.value = skapi.services[srvcId];

    if (currentService.value) {
        if (!newsletter_sender.value?.[currentService.value.service]?.public) {
            if (!newsletter_sender.value?.[currentService.value.service]) {
                newsletter_sender.value[currentService.value.service] = {};
            }
            skapi.requestNewsletterSender(currentService.value.service, { groupNum: 0 }).then(s => {
                newsletter_sender.value[currentService.value.service]['public'] = s;
            });
        }

        if (!newsletter_sender.value?.[currentService.value.service]?.authorized) {
            if (!newsletter_sender.value?.[currentService.value.service]) {
                newsletter_sender.value[currentService.value.service] = {};
            }
            skapi.requestNewsletterSender(currentService.value.service, { groupNum: 1 }).then(s => {
                newsletter_sender.value[currentService.value.service]['authorized'] = s;
            });
        }

        if (!storageInfo.value[currentService.value.service]) {
            storageInfo.value[currentService.value.service] = {};
        }
        let sd = currentService.value.subdomain;
        if (sd && (sd[0] !== '*' || sd[0] !== '+')) {
            // get subdomain storage info (404 file info)
            skapi.getSubdomainInfo(currentService.value.service, {
                subdomain: sd,
            }).then(s =>
                subdomainInfo.value[sd] = s
            ).catch(err=>err);

            launch(currentService.value.subdomain, f => {
                if (f.length) {
                    storageInfo.value[currentService.value.service].host = f[0].size;
                }
            }, true);
        }

        skapi.storageInformation(currentService.value.service).then(i => {
            // get storage info
            for (let k in i) {
                storageInfo.value[currentService.value.service][k] = i[k];
            }
        });
    }
    else {
        router.replace({ path: '/dashboard' });
    }
}

if (serviceFetching.value instanceof Promise) {
    serviceFetching.value.then(getCurrentService);
}
else {
    getCurrentService()
}

</script>

<style lang="less" scoped>
.navSide {
    position: absolute;
    width: 240px;
    height: 100%;
    padding-left: 28px;
    left: 0;
    top: 0;
    z-index: 9999;

    &.caution {
        padding-top: 52px;
    }
}

.navSideWrap {
    position: relative;
    width: 100%;
    height: 100%;
    .logo {
        height: 60px;
        display: flex;
        align-items: center;
        margin-bottom: 56px;

        img {
            width: 36px;
        }
    }

    .menuList {
        .menu {
            position: relative;
            padding: 12px 0;
            color: #293FE6;
            display: flex;
            align-items: center;
            text-decoration: none;
            margin-bottom: 4px;
            cursor: pointer;

            &::after {
                position: absolute;
                content: '';
                width: 208px;
                height: 56px;
                left: -12px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 8px;
                background: rgba(0, 0, 0, 0.05);
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                opacity: 0;
            }

            &:hover {
                &::after {
                    opacity: 1;
                }
            }

            &.active {
                &::after {
                    opacity: 1;
                }

                span {
                    font-weight: 700;
                }
            }

            &:first-child {
                margin-bottom: 66px;
            }

            svg {
                display: inline-block;
                width: 28px;
                height: 28px;
            }

            p {
                margin-left: 13px;
                font-size: 20px;
                font-weight: 500;
            }
        }
    }

    .settingWrap {
        position: absolute;
        left: 0;
        bottom: 40px;
        bottom: 10px;
        color: rgba(0, 0, 0, 0.6);
    
        &::before {
            position: absolute;
            content: '';
            top: 0;
            width: 100%;
            height: 1px;
            background-color: rgba(0, 0, 0, 0.1);
        }
    
        .setting {
            padding-top: 28px;
            padding-bottom: 21px;
            text-decoration: none;
    
            a {
                margin-left: 9px;
                font-size: 14px;
                text-decoration: none;
                color: rgba(0, 0, 0, 0.6);
            }
        }
    
        .setting,
        .settingIcon {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
        }
    
        .settingIcon {
            display: none;
        }
    
        .settingToggle {
            display: flex;
            flex-direction: column;
            text-align: center;
            width: 100%;
    
            label {
                width: 100%;
                height: 32px;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 20px;
                position: relative;
                cursor: pointer;
            }
    
            .toggle {
                position: absolute;
                top: 4px;
                left: 4px;
                width: 50%;
                height: 25px;
                background-color: #fafafa;
                border-radius: 20px;
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                transition: all 0.3s;
            }
    
            .names {
                width: 100%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: space-around;
    
                div {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
    
                    span {
                        font-size: 14px;
                        font-weight: 500;
                    }
    
                    svg {
                        margin-right: 8px;
                    }
                }
    
                .dark {
                    opacity: 0.5;
                    padding-right: 9px;
                }
            }
        }
    
        input[type="checkbox"] {
            display: none;
        }
    
        input[type="checkbox"]:checked+.settingWrap .toggle {
            transform: translateX(95px);
        }
    
        input[type="checkbox"]:checked+.settingWrap .dark {
            opacity: 1;
        }
    
        input[type="checkbox"]:checked+.settingWrap .light {
            opacity: .5;
        }
    }
}


.navCont {
    padding: 0 40px 0 240px;
    width: 100%;

    .navTop {
        height: 60px;
        margin-bottom: 56px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;

        .routeWrap {
            nav {
                ol {
                    height: 40px;
                    display: flex;
                    align-items: center;

                    li {
                        position: relative;
                        list-style: none;
                        margin-right: 50px;

                        a {
                            font-size: 20px;
                            font-weight: 700;
                            text-decoration: none;
                            color: rgba(0, 0, 0, 0.40);
                        }

                        &:nth-child(2) {
                            // width: 80px;
                            // white-space: nowrap;
                            // overflow: hidden;
                            // text-overflow: ellipsis;
                        }

                        &:last-child {
                            margin-right: 0;
                        }

                        &::before {
                            position: absolute;
                            content: '>';
                            right: -30px;
                            top: 50%;
                            transform: translateY(-50%);
                            font-size: 20px;
                            color: rgba(0, 0, 0, 0.40);
                        }

                        &.active {
                            a {
                                color: #293FE6;
                            }
                        }

                        &.active::before {
                            display: none;
                        }
                    }
                }
            }
        }

        .menuWrap {
            display: flex;
            flex-wrap: nowrap;

            ul {
                position: relative;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                padding: 0 24px;

                &:first-child {
                    &::after {
                        position: absolute;
                        content: '';
                        top: 50%;
                        right: 0;
                        transform: translateY(-50%);                    
                        width: 1px;
                        height: 25px;
                        background-color: rgba(0,0,0,0.1);
                    }

                    li {
                        margin-right: 16px;
                    }
                }

                &:last-child {
                    padding-right: 0;
                }

                li {
                    list-style: none;
                    margin-right: 24px;

                    &:last-child {
                        margin-right: 0;
                    }
                    
                    a {
                        color: rgba(0,0,0,0.6);
                        text-decoration: none;
                        font-size: 20px;
                        font-weight: 700;
                        cursor: pointer;
                        
                        &:hover {
                            color: rgba(0,0,0,1);

                            img {
                                opacity: 1;
                            }
                        }

                        &.signup {
                            color: #fff;
                            padding: 8px 20px;
                            border-radius: 8px;
                            font-size: 16px;
                            font-weight: 700;
                            background: #293FE6;
                        }

                        img {
                            width: 20px;
                            height: 20px;
                            opacity: 0.6;
                            margin-top: 5px;
                        }
                    }

                    &:last-child {
                        margin-right: 0;
                    }

                    &.account {
                        position: relative;
                        margin-right: 0;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #293FE6;
                        color: #fff;
                        font-size: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                }
            }
        }

        .prof {
            position: absolute;
            right: 40px;
            top: 70px;
            width: 265px;
            padding: 20px 20px 0;
            overflow: hidden;
            background-color: #fafafa;
            color: rgba(0, 0, 0, 0.80);
            border: 1px solid rgba(0, 0, 0, 0.15);
            box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);
            border-radius: 8px;
            z-index: 99;

            .member {
                h4 {
                    font-size: 16px;
                    font-weight: 700;
                }

                span {
                    font-size: 14px;
                }
            }

            .settings {
                position: relative;
                margin-top: 40px;

                &::before {
                    position: absolute;
                    content: '';
                    left: 0;
                    top: -20px;
                    width: 120%;
                    height: 1px;
                    transform: translateX(-20px);
                    background-color: rgba(0, 0, 0, 0.15);
                }

                &::after {
                    position: absolute;
                    content: '';
                    left: 0;
                    bottom: -20px;
                    width: 120%;
                    height: 1px;
                    transform: translateX(-20px);
                    background-color: rgba(0, 0, 0, 0.15);
                }

                .setting {
                    display: flex;
                    align-items: center;
                    margin-bottom: 18px;
                    color: #293FE6;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;

                    .click {
                        margin-left: 10px;
                        margin-bottom: 0;
                    }
                }
            }

            .policy {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.15);
                padding: 10px 0;
            }
        }
    }

    .cont {
        max-width: 1200px;
        min-width: 935px;
        margin: 0 auto;
        padding-bottom: 56px;
    }
}

// @media (max-width: 1352px) {
//     .navSide {
//         width: 88px;

//         .menuList {
//             .menu {
//                 &::after {
//                     width: 56px;
//                     height: 56px;
//                 }

//                 p {
//                     display: none;
//                 }
//             }
//         }
//     }

//     .navCont {
//         padding-left: 88px;

//         .cont {
//             max-width: 1112px;
//             margin: 0 auto;
//         }
//     }

//     .settingWrap {
//         width: 56px;
//         left: 14px;

//         .setting {
//             span {
//                 display: none;
//                 margin-right: 14px;
//             }
//         }

//         .settingIcon {
//             display: flex;
//         }

//         .settingToggle {
//             display: none;
//         }
//     }
// }

// @media (max-width: 1065px) {
//     .navCont {
//         .navTop {
//             width: 935px;
//         }
//     }
// }
</style>