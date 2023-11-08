<template lang="pug">
#serviceMain(v-if='currentService')
    .left
        nav.menuWrap 
            router-link.menu(:to="`/dashboard/${currentService.service}`" :class="{'active': route.name == 'service'}")
                .material-symbols-outlined.big home
                h3 Home
            router-link.menu(:to="`/dashboard/${currentService.service}/users`" :class="{'active': route.name == 'users'}")
                .material-symbols-outlined.big supervisor_account
                h3 Users
            router-link.menu(:to="`/dashboard/${currentService.service}/records`" :class="{'active': route.name == 'records'}")
                .material-symbols-outlined.big database
                h3 Database
            router-link.menu(:to="`/dashboard/${currentService.service}/mail`" :class="{'active': route.name == 'mail'}")
                .material-symbols-outlined.big email
                h3 Mail
            router-link.menu(:to="`/dashboard/${currentService.service}/subdomain`" :class="{'active': route.name == 'subdomain'}")
                .material-symbols-outlined.big language
                h3 Hosting
    .right 
        router-view
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { services, serviceFetching, currentService, storageInfo, serviceUsers, newsletter_sender } from '@/data.js';
import { serviceRecords } from '@/views/Service/Records/RecordFetch.js';
import { launch, nextPage, serviceHost, subdomainInfo } from './subdomain/SubdomainFetch';
import { skapi, account, bodyClick } from '@/main.js';

import NavBar from '@/components/NavBar.vue';
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
#serviceMain {
    margin-top: 60px;
    padding-top: 56px;

    .left {
        display: inline-block;
        vertical-align: top;
        width: 240px;

        .menuWrap {
            padding: 0 16px;

            .menu {
                position: relative;
                display: block;
                padding: 12px;
                color: #293FE6;
                text-decoration: none;
                margin-bottom: 4px;
                cursor: pointer;

                * {
                    display: inline-block;
                    vertical-align: middle;
                }

                &::after {
                    position: absolute;
                    content: '';
                    width: 208px;
                    height: 56px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
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

                h3 {
                    margin-left: 13px;
                    font-size: 20px;
                    font-weight: 500;
                }
            }
        }
    }
    .right {
        display: inline-block;
        width: calc(100vw - 240px);
        padding: 0 40px 40px 0;
    }
}
</style>