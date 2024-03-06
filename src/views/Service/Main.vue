<template lang="pug">
#serviceMain(v-if='currentService')
    .left
        router-link.back(:to="`/myServices`")
            .material-symbols-outlined.mid arrow_back_ios
            p My services
        nav.menuWrap 
            router-link.menu(:to="`/myServices/${currentService.service}`" :class="{'active': route.name == 'service'}")
                .material-symbols-outlined.big home
                h3 Dashboard
            router-link.menu(:to="`/myServices/${currentService.service}/users`" :class="{'active': route.name == 'users'}")
                .material-symbols-outlined.big supervisor_account
                h3 Users
            router-link.menu(:to="`/myServices/${currentService.service}/records`" :class="{'active': route.name == 'records'}")
                .material-symbols-outlined.big database
                h3 Database
            router-link.menu(:to="`/myServices/${currentService.service}/mail`" :class="{'active': route.name == 'mail', 'nonClick' : currentService.group == 1}")
                .material-symbols-outlined.big email
                h3 Mail
            router-link.menu(:to="`/myServices/${currentService.service}/subdomain`" :class="{'active': route.name == 'subdomain', 'nonClick' : currentService.group == 1}")
                .material-symbols-outlined.big language
                h3 Hosting
    .right 
        router-view
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { services, serviceFetching, currentService, storageInfo, serviceUsers, newsletter_sender } from '@/data.js';
import { serviceRecords } from '@/views/Service/Records/RecordFetch.js';
import { launch, subdomainInfo } from '@/views/Service/Subdomain/SubdomainFetch.js';
import { skapi, account } from '@/main.js';

import NavBar from '@/components/NavBar.vue';
import EmailCaution from '@/components/EmailCaution.vue';

currentService.value = null;

const route = useRoute();
const router = useRouter();

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

        let sd = currentService.value.subdomain;
        if (sd && (sd[0] !== '*' || sd[0] !== '+')) {
            // get subdomain storage info (404 file info)
            skapi.getSubdomainInfo(currentService.value.service, {
                subdomain: sd,
            }).then(s =>
                subdomainInfo.value[sd] = s
            ).catch(err=>err);
        }
    }
    else {
        if(account.value) {
            router.replace({ path: '/myServices' });
        } else {
            router.replace({ path: '/login' });
        }
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
    display: flex;
    margin-top: 3rem;
    
    .left {
        display: inline-block;
        vertical-align: top;
        
        .back {
            display: block;
            margin: 0 16px;
            padding: 12px 20px;
            color: var(--main-color);
            text-decoration: none;
            margin-bottom: 4px;

            * {
                display: inline-block;
                vertical-align: middle;
            }

            p {
                margin-left: 13px;
                font-weight: 500;
            }
        }
        .menuWrap {
            margin-top: 63px;
            padding: 0 16px;

            .menu {
                position: relative;
                display: block;
                padding: 12px;
                color: var(--main-color);
                text-decoration: none;
                border-radius: 8px;
                margin-bottom: 4px;
                white-space: pre;
                cursor: pointer;

                * {
                    display: inline-block;
                    vertical-align: middle;
                }

                &:hover {
                    &::after {
                        opacity: 1;
                    }
                }

                &.active {
                    background: #293FE60D;
                    box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;

                    h3 {
                        font-weight: 700;
                    }
                }

                &.nonClick {
                    opacity: 0.5;
                    pointer-events: none;
                    cursor: default;
                }

                svg {
                    display: inline-block;
                    width: 28px;
                    height: 28px;
                }

                h3 {
                    padding-right: 50px;
                    margin-left: 13px;
                    font-size: 20px;aaaa
                    font-weight: 500;
                }
            }
        }
    }
    .right {
        display: inline-block;
        width: calc(100vw - 250px);
        padding: 0 20px 20px 0;
        flex-grow: 1;
    }
}

@media (max-width:1023px) {
    #serviceMain {
        .left {
            width: 88px;
            .back {
                p {
                    display: none;
                }
            }
            .menuWrap {
                .menu {
                    h3 {
                        display: none;
                    }
                }
            }
        }
        .right {
            width: calc(100vw - 88px);
        }
    }
}

@media (max-width:767px) {
    #serviceMain {
        .left {
            display: none;
        }
        .right {
            width: 100%;
            padding-left: 20px;
        }
    }
}
</style>