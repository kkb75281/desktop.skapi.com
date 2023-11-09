<template lang="pug">
header#navBar(style='--position: relative;')
    nav#top
        .left
            router-link.logo(to="/")
                img(v-if="route.name == 'home'" src="@/assets/img/logo/logo-white.svg")
                img(v-else-if="route.name == 'dashboard' || route.name == 'accountSettings'" src="@/assets/img/logo/logo.png")
                img.small(v-else src="@/assets/img/logo/symbol-logo.png")
        .right(:class="{'flex' : route.params.service && currentService}")
            .topRoute(v-if="route.params.service && currentService") 
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
            .topMenu(:class="{'white' : route.name == 'home'}")
                template(v-if="account")
                    ul
                        li
                            a(href="https://twitter.com/skapijs" target="_blank")
                                img(src="@/assets/img/icon/twitter.svg")
                        li
                            a(href="https://discord.gg/3QdZzQwR" target="_blank")
                                img(src="@/assets/img/icon/discord.svg")
                    ul
                        li.doc
                            a(href="https://docs.skapi.com" target="_blank") Documentation
                        li.dash
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
                        li.doc 
                            a(href="https://docs.skapi.com" target="_blank") Documentation
                        li.login
                            router-link(to="/login") Login
                        li 
                            router-link.signup(to="/signup") Sign-up
        .prof(v-if="accountInfo && account" @click.stop)
            .member 
                span {{ account.email }}
            .settings 
                .setting(@click="navigateToPage")
                    span.material-symbols-outlined.sml settings
                    span Account Settings
                .setting(@click="logout")
                    span.material-symbols-outlined.sml logout
                    span Logout
            .policy terms of service ● privacy policy
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { skapi, account, bodyClick } from '@/main';
import { services, serviceFetching, currentService, storageInfo, serviceUsers, newsletter_sender } from '@/data';
import { serviceRecords } from '@/views/Service/Records/RecordFetch';
import { launch, serviceHost, subdomainInfo } from '@/views/Service/subdomain/SubdomainFetch';

let route = useRoute();
let router = useRouter();
let accountInfo = ref(false);
let servicePage = ref(false);

currentService.value = null;

bodyClick.nav = ()=>{
    accountInfo.value = false;
}

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
        // router.replace({ path: '/dashboard' });
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
#top {
    position: var(--position);
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    z-index: 999;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
        position: relative;
        width: 220px;
        .logo {
            img {
                width: 120px;
                &.small {
                    width: 36px;
                    vertical-align: middle;
                }
            }
        }
    }
    .right {
        width: calc(100% - 220px);
        text-align: right;
        
        &.flex {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
        }
        .topRoute {
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

        .topMenu {
            &.white {
                ul {
                    &:first-child {
                        &::after {
                            background-color: rgba(255,255,255,0.4);
                        }
                    }
                    li {
                        a {
                            color: #fff;

                            &:hover {
                                color: #293FE6;

                                img {
                                    filter: invert(28%) sepia(100%) saturate(5415%) hue-rotate(234deg) brightness(89%) contrast(102%);
                                }
                            }
                            img {
                                filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(355deg) brightness(107%) contrast(106%);
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }

        ul {
            position: relative;
            display: inline-block;
            line-height: 40px;
            padding: 0 24px;

            &:first-child {
                vertical-align: middle;

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
                padding-right: 0 !important;
            }

            li {
                display: inline-block;
                list-style: none;
                margin-right: 24px;
                text-align: center;

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

                        &.signup {
                            color: #fff;
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
                    // display: flex;
                    // align-items: center;
                    // justify-content: center;
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
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                color: #293FE6;

                &:last-child {
                    margin-bottom: 0;
                }

                span {
                    &:first-child {
                        fill: #293FE6;
                        margin-right: 10px;
                    }
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
            padding: 27px 0 10px;
        }
    }
}

@media (max-width:1023px) {
    #top {
        .left {
            width: 65px;
        }
        .right {
            width: calc(100% - 65px);
        }
    }
}

@media (max-width:767px) {
    #top {
        .right {
            .topMenu {
                ul {
                    padding: 0 14px;

                    li {
                        &.doc, &.account {
                            display: none;
                        }
                        &.dash {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>