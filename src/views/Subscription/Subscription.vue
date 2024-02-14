<template lang="pug">
.subsWrap(v-if='currentService')
    //- .back(@click="router.push('/myServices/' + currentService.service)")
    .back(@click="router.go(-1)")
        span.material-symbols-outlined.mid.clickable arrow_back_ios
        span Back
    main#subscription
        .inner
            RouterLink(to="/")
                img(src="@/assets/img/logo/logo.png" style="width:193px;")
            
            br
            br
            br
            br

            section.serviceInfo 
                .row
                    h5 Service Name
                    span {{ currentService.name }}

                .row 
                    h5 Service ID
                    span {{ currentService.service }}

                .row 
                    h5 Service Plan
                    template(v-if="currentService.group == 1") 
                        span Trial
                    template(v-else-if="currentService.group == 2") 
                        span Standard
                    template(v-else-if="currentService.group == 3") 
                        span Premium
                    template(v-else-if="currentService.group == 50") 
                        span Unlimited
                    template(v-else="currentService.group == 51") 
                        span Free Standard

            br

            table
                tbody
                    tr.title
                        td(colspan="4") 
                            h4 Service Plan
                    tr
                        td(rowspan="2") 
                        td(:class="{'currentMode' : currentService.group == 1}" style="padding-top: 1rem;")
                            .mode
                                p Trial Mode
                                span.fee $0
                                p(style="font-size:0.8rem;") Billed monthly

                        td(:class="{'currentMode' : currentService.group == 2}" style="padding-top: 1rem;") 
                            .mode
                                p Standard Mode
                                span.fee $19
                                p(style="font-size:0.8rem") Billed monthly
                        td(:class="{'currentMode' : currentService.group == 3}" style="padding-top: 1rem;")
                            .mode
                                p Premium Mode
                                span.fee $129
                                p(style="font-size:0.8rem") Billed monthly
                    tr
                        td(:class="{'currentMode' : currentService.group == 1}")
                        td(:class="{'currentMode' : currentService.group == 2}")
                            button.final(v-if="currentService.group == 3" @click="showDowngradePlan = true;") Downgrade
                            button.disabled(v-else-if="currentService.group == 2") Current Plan
                        td(:class="{'currentMode' : currentService.group == 3}")
                            button.final(v-if="currentService.group == 2" @click="showUpgradePlan = true;") Upgrade
                            button.disabled(v-else-if="currentService.group == 3") Current Plan
                    tr.title
                        td
                            h4 Compare Features
                        td(:class="{'currentMode' : currentService.group == 1}")
                        td(:class="{'currentMode' : currentService.group == 2}")
                        td(:class="{'currentMode' : currentService.group == 3}")
                    tr.feature
                        td(style="padding-top: 1.4rem;") #of User Account
                        td(:class="{'currentMode' : currentService.group == 1}" style="padding-top: 1rem;") 10 k
                        td(:class="{'currentMode' : currentService.group == 2}" style="padding-top: 1rem;") 10 k
                        td(:class="{'currentMode' : currentService.group == 3}" style="padding-top: 1rem;") 100 k
                    tr.feature
                        td Database
                        td(:class="{'currentMode' : currentService.group == 1}") 4 G
                        td(:class="{'currentMode' : currentService.group == 2}") 4 G
                        td(:class="{'currentMode' : currentService.group == 3}") 100 G
                    tr.feature
                        td.feature File Storage
                        td(:class="{'currentMode' : currentService.group == 1}") 50 GB
                        td(:class="{'currentMode' : currentService.group == 2}") 50 GB
                        td(:class="{'currentMode' : currentService.group == 3}") 1 TB
                    tr.feature
                        td Hosting Storage
                        td(:class="{'currentMode' : currentService.group == 1}") 
                            .material-symbols-outlined.mid.gray cancel
                        td(:class="{'currentMode' : currentService.group == 2}") 50 GB
                        td(:class="{'currentMode' : currentService.group == 3}") 1 TB
                    tr.feature
                        td Automated Email
                        td(:class="{'currentMode' : currentService.group == 1}") 
                            .material-symbols-outlined.mid.gray cancel
                        td(:class="{'currentMode' : currentService.group == 2}")
                            .material-symbols-outlined.mid.green check_circle
                        td(:class="{'currentMode' : currentService.group == 3}")
                            .material-symbols-outlined.mid.green check_circle
                    tr.feature
                        td Email Storage
                        td(:class="{'currentMode' : currentService.group == 1}") 
                            .material-symbols-outlined.mid.gray cancel
                        td(:class="{'currentMode' : currentService.group == 2}") 1 GB
                        td(:class="{'currentMode' : currentService.group == 3}") 10 GB
                    tr.feature
                        td Subdomain Hosting
                        td(:class="{'currentMode' : currentService.group == 1}") 
                            .material-symbols-outlined.mid.gray cancel
                        td(:class="{'currentMode' : currentService.group == 2}") 
                            .material-symbols-outlined.mid.green check_circle
                        td(:class="{'currentMode' : currentService.group == 3}") 
                            .material-symbols-outlined.mid.green check_circle
                    tr.caution
                        td 
                        td.red(:class="{'currentMode' : currentService.group == 1}")
                            ul 
                                li All the users and data will be deleted every 7 days
                        td(:class="{'currentMode' : currentService.group == 2}") 
                        td.blue(:class="{'currentMode' : currentService.group == 3}")
                            ul 
                                li Unlimited use with pay-as-you-go when exceeding the limit

            br

            section(v-if="currentService.active > 0")
                h4 Cancel Plan

                br

                ul.desc
                    li If you cancel the service plan, you will not be billed for the subscription for three months (from the last payment date). The service will be deactivated during the plan cancellation period. 
                        span However, after three months, all data and users will be deleted, and if you do not want this to happen, you must resume the plan before that.

                br

                .btn(style="display:block;text-align:right;")
                    button.unFinished.warning(@click="showCancelPlan = true;") Cancel Plan

            section(v-else)
                h4 Resume Plan

                br

                ul.desc 
                    li Your current service plan has been canceled and deactivated. To reactivate the service, please resume the plan. 
                        em(style="color:var(--caution-color);font-style: normal;") Your service will be completely deleted on 0000-00-00.
                
                br

                .btn(style="display:block;text-align:right;")
                    button.final Resume Plan

CancelPlanOverlay(v-if="showCancelPlan" @close="showCancelPlan = false;")
UpgradePlanOverlay(v-if="showUpgradePlan" @close="showUpgradePlan = false;")
DowngradePlanOverlay(v-if="showDowngradePlan" @close="showDowngradePlan = false;")
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { nextTick, ref } from 'vue';
import { currentService, serviceFetching } from '@/data.js';
import { skapi, account } from '@/main.js';
import CancelPlanOverlay from '@/views/Subscription/CancelPlanOverlay.vue';
import UpgradePlanOverlay from '@/views/Subscription/UpgradePlanOverlay.vue';
import DowngradePlanOverlay from '@/views/Subscription/DowngradePlanOverlay.vue';

currentService.value = null;

// let x: string | number = 1;

let router = useRouter();
let route = useRoute();
let showCancelPlan = ref(false);
let showUpgradePlan = ref(false);
let showDowngradePlan = ref(false);

let getCurrentService = () => {
    let srvcId = route.path.split('/')[2];
    currentService.value = skapi.services[srvcId];

    if (!currentService.value) {
        if(account.value) {
            router.replace({ path: '/myServices' });
        } else {
            router.replace({ path: '/login' });
        }
    }

    console.log(currentService.value)
}

if (serviceFetching.value instanceof Promise) {
    serviceFetching.value.then(getCurrentService);
}
else {
    getCurrentService()
}


</script>

<style lang="less">
.subsWrap {
    padding: 0 1rem;
    padding-bottom: 5rem;
    margin-top: 72px;
    display: flex;
    flex-wrap: nowrap;
}
.back {
    width: 12rem;

    span {
        display: inline-block;
        vertical-align: middle;
        color: var(--main-color);

        &:first-child {
            padding-right: 1rem;
        }
    }
}
#subscription {
    width: calc(100vw - 12rem);
    color: var(--primary-text);

    .inner {
        max-width: 1200px;
        margin: 0 auto;
    }

    .row {
        margin-bottom: 0.5rem;

        h5 {
            display: inline-block;
            width: 8rem;
            font-weight: 400;
            color: var(--secondary-text);
        }
        span {
            font-weight: 700;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;

        tr {
            &.title {
                td {
                    white-space: nowrap;
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                    text-align: left;
                }
            }
            &.feature {
                td {
                    padding: 0.7rem 0;
                    text-align: center;

                    &:first-child {
                        color: var(--secondary-text);
                        text-align-last: left;
                    }
                }
            }
            &.caution {
                td {
                    padding: 0.5rem 1.2rem 2rem 1.2rem;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                    font-size: 0.8rem;
                    line-height: 1.2rem;
                    text-align: left;
                }
                .red {
                    color: var(--caution-color);
                }
                .blue {
                    color: var(--main-color);
                }
            }
        }
        td {
            width: 25%;
            text-align: center;

            &.currentMode {
                background: rgba(0,0,0,0.05);
            }
            .gray {
                color: rgba(0,0,0,0.4);
            }
            .green {
                color: #52D687;
            }
            .mode {
                display: inline-block;
                text-align: left;
            }
            .fee {
                position: relative;
                display: inline-block;
                font-size: 1.6rem;
                font-weight: 500;
                padding: 0.5rem 0;

                &::before {
                    position: absolute;
                    content: '/mo';
                    right: -2rem;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 0.7rem;
                    font-weight: 500;
                    color: rgba(0,0,0,0.4);
                }
            }
            button {
                margin-top: 1rem;
            }
        }
    }

    .desc {
        li {
            color: var(--secondary-text);
            line-height: 1.4rem;
            margin-left: 1rem;

            &::marker {
                color: var(--primary-text);
            }
            span {
                color: var(--primary-text);
                font-weight: 700;
            }
        }
    }
}
</style>