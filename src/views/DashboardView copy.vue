<template lang="pug">
main#myServices
    .titleWrap
        .inner 
            h2 My Services
    .container
        .wrapper(v-if="!serviceFetching")
            // service 로딩이 완료 되면 표시
            .boxWrap
                .box.btn(v-if="!create" @click="createService" :class="{'nonClickable' : !account?.email_verified}")
                    .material-symbols-outlined.mid add
                    span Create Service

                .box.create(v-if="create")
                    form(@submit.prevent="addService")
                        h5 Create a new service
                        br
                        input#serviceName(type="text" @input='e=>newServiceName=e.target.value' placeholder="Name of Service" required)
                        br
                        br
                        br
                        .buttons
                            template(v-if="promiseRunning")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button(type="button" @click="create = false;").cancel Cancel
                                button(type="submit").create Create

                template(v-if='services.length')
                    router-link.box.card.clicked(v-for="service in services" :to="'/myServices/' + service.service" :style='{opacity: service?.pending ? ".5" : null}')
                        .inner
                            .title 
                                h4 {{ service.name }}
                                .material-symbols-outlined.mid arrow_forward_ios
                            .contWrap 
                                .cont 
                                    h6 Locale
                                    p {{ regions?.[service.region] || service.region }}
                                .cont 
                                    h6 Date Created
                                    p {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                                .cont(style="width:65%;margin-bottom: 0;")
                                    h6 CORS
                                    p.ellipsis {{ service.cors }}

                            .serviceActive(v-if='service?.pending')
                                // 왜 인지 모르겠으나 조건 class가 에니메이션을 영향줌 (생성될때 active가 켜졌다->꺼졌다->서비스 생성 완료되면 다시 켜짐)
                                .material-symbols-outlined.big power_settings_new
                            .serviceActive(v-else :class="{'active': service.active == 1 }")
                                .material-symbols-outlined.big power_settings_new

                template(v-else)
                    .box.noService
                        h3 No Services
                        br
                        p Get started by creating a new service.
        .loadingWrap(v-else)
            img.loading(src="@/assets/img/loading.png")
</template>

<script setup>
import { services, serviceFetching } from '@/data.js';
import { nextTick, ref } from 'vue';
import { skapi, account } from '@/main.js';

// update services
if (serviceFetching.value) {
    serviceFetching.value.then(() => {
        services.value = skapi.serviceMap.map(sid => skapi.services[sid]).reverse();
    })
}
else {
    services.value = skapi.serviceMap.map(sid => skapi.services[sid]).reverse();
}
let create = ref(false);
let createService = () => {
    if (account?.value.email_verified) {
        create.value = true;
        nextTick(() => {
            document.getElementById('serviceName').focus();
        });
    } else {
        return false;
    }
}
let newServiceName = '';
let promiseRunning = ref(false);
let addService = () => {
    promiseRunning.value = true;
    services.value.unshift({
        service: '',
        name: newServiceName,
        created_locale: '...',
        timestamp: '...',
        cors: '...',
        pending: true,
        active: 0
    });
    skapi.createService({ name: newServiceName })
        .then(s => {
            skapi.insertService(s);
            services.value[0] = s;
            create.value = false;
        }).catch(err => {
            alert(err.message);
            services.value.shift();
        })
        .finally(_ => promiseRunning.value = false)
}
const regions = {
    'us-west-2': 'US',
    'ap-northeast-2': 'KR',
    'ap-southeast-1': 'SG',
    'ap-south-1': 'IN'
}


skapi.getProfile().then(u => {
    if (u.misc === 'kdu') {
        skapi.consumeTicket({ ticket_id: 'kdu' }).catch(err => console.log({ err })).finally(() => {
            skapi.updateProfile({ misc: '' }).then(up => {
                account.value = up;
            });
        });
    }
}).catch(err => err);
</script>

<style lang="less" scoped>
#myServices {
    position: relative;
    margin-top: 3.4rem;

    .titleWrap {
        padding: 0 2rem;

        .inner {
            max-width: 1200px;
            margin: 0 auto;
            padding-bottom: 2.1rem;

            h2 {
                display: inline-block;
                font-weight: 700;
            }

            span {
                font-size: 1.2rem;
                font-weight: 500;
                margin-left: 18px;
                color: rgba(0, 0, 0, 0.40);
            }
        }
    }

    .container {
        width: 100%;
        min-height: calc(100vh - 10.1rem);
        padding: 2rem;
        background-color: #fafafa;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);
        border-radius: 8px;
    }

    .loadingWrap {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;

        img { 
            width: 30px;
            height: 30px;
        }
    }

    .wrapper {
        max-width: 1200px;
        margin: 0 auto;

        .boxWrap {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;

            .box {
                width: 31%;
                margin-right: 3.5%;
                margin-bottom: 3.5%;
                border-radius: 8px;
                background-color: #fafafa;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
                transition: all 0.1s;
                cursor: pointer;

                &:nth-child(3n+3) {
                    margin-right: 0;
                }

                &.btn {
                    background: rgba(41, 63, 230, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--main-color);
                    cursor: pointer;

                    .material-symbols-outlined {
                        margin-right: 8px;
                    }
                }

                &.create {
                    padding: 1.4rem;
                    box-shadow: 0 0 0 4px #A5AFFF inset;

                    form {
                        h5 {
                            color: var(--main-color);
                            font-weight: 500;
                            // margin-bottom: 20px;
                        }

                        input {
                            width: 100%;
                            border-radius: 8px;
                            background: rgba(0, 0, 0, 0.05);
                            border: 0;
                            padding: 15px 20px;
                            font-size: 0.8rem;
                            // margin-bottom: 45px;
                        }

                        .buttons {
                            height: 44px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            button {
                                height: 100%;
                                border: 0;
                                padding: 0 28px;
                                border-radius: 8px;
                                font-size: 0.8rem;
                                font-weight: 700;
                                cursor: pointer;

                                &.cancel {
                                    padding-left: 10px;
                                    background-color: unset;
                                    color: var(--main-color);
                                }

                                &.create {
                                    background-color: var(--main-color);
                                    color: #fff;
                                }
                            }
                        }
                    }
                }

                &.noService {
                    width: 360px;
                    padding: 80px 0;
                    text-align: center;
                    box-shadow: unset;
                    color: rgba(0, 0, 0, 0.40);
                }
            }
        }
    }
}

@media (max-width: 1023px) {
    #myServices {
        .wrapper {
            .boxWrap {
                .box {
                    width: 48%;
                    margin-right: 4%;
                    margin-bottom: 4%;

                    &:nth-child(2n+2) {
                        margin-right: 0;
                    }

                    &:nth-child(6n+6) {
                        margin-right: 0;
                    }

                    &:nth-child(3n+3) {
                        margin-right: 4%;
                    }
                }
            }
        }
    }
}

@media (max-width: 767px) {
    #myServices {
        .wrapper {
            .boxWrap {
                .box {
                    width: 100%;
                    margin-right: 0%;
                    margin-bottom: 30px;

                    &:nth-child(3n+3) {
                        margin-right: 0;
                    }

                    &.btn {
                        height: 240px;
                    }
                }
            }
        }
    }
}
</style>