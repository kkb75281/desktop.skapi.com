<template lang="pug">
main#dashboard
    .title 
        h2 Dashboard
        span All Services
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
                        input#serviceName(type="text" @input='e=>newServiceName=e.target.value' placeholder="Name of Service" required)
                        .buttons
                            template(v-if="promiseRunning")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button(type="button" @click="create = false;").cancel Cancel
                                button(type="submit").create Create

                template(v-if='services.length')
                    router-link.box.service.clicked(v-for="service in services" :to="'/dashboard/' + service.service" :style='{opacity: service?.pending ? ".5" : null}')
                        .inner
                            .tit 
                                h5 {{ service.name }}
                                .material-symbols-outlined.mid arrow_forward_ios
                            .contWrap 
                                .cont 
                                    span Locale
                                    p {{ regions?.[service.region] || service.region }}
                                .cont 
                                    span Date Created
                                    p {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                                .cont 
                                    span CORS
                                    p {{ service.cors }}

                            .serviceActive(v-if='service?.pending')
                                // 왜 인지 모르겠으나 조건 class가 에니메이션을 영향줌 (생성될때 active가 켜졌다->꺼졌다->서비스 생성 완료되면 다시 켜짐)
                                .material-symbols-outlined.big power_settings_new
                            .serviceActive(v-else :class="{'active': service.active == 1 }")
                                .material-symbols-outlined.big power_settings_new
                template(v-else)
                    .box.noService
                        h2 No Services
                        p Get started by creating a new service.
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
</script>

<style lang="less" scoped>
#dashboard {
    position: relative;
    margin-top: 6.4rem;
    // padding: 0 2rem;

    .title {
        width: 1200px;
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

    .container {
        width: 100%;
        min-height: calc(100vh - 10.1rem);
        padding: 2rem;
        background-color: #fafafa;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);
        border-radius: 8px;
    }
    
    .wrapper {
        width: 1200px;
        margin: 0 auto;

        .boxWrap {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;

            .box {
                width: 31%;
                // height: 254px;
                margin-right: 3.5%;
                margin-bottom: 3.5%;
                border-radius: 8px;
                padding: 1.5rem;
                background-color: #fafafa;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
                transition: all 0.1s;

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
                    color: #293FE6;
                    cursor: pointer;

                    .material-symbols-outlined {
                        margin-right: 8px;
                    }
                }

                &.create {
                    box-shadow: 0 0 0 4px #A5AFFF inset;

                    form {
                        h5 {
                            color: #293FE6;
                            font-weight: 500;
                            margin-bottom: 20px;
                        }

                        input {
                            width: 100%;
                            border-radius: 8px;
                            background: rgba(0, 0, 0, 0.05);
                            border: 0;
                            padding: 15px 20px;
                            font-size: 0.8rem;
                            margin-bottom: 45px;
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
                                    color: #293FE6;
                                }

                                &.create {
                                    background-color: #293FE6;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }

                &.service {
                    color: unset;
                    text-decoration: unset;

                    position: relative;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                    cursor: pointer;

                    &:hover {
                        background: #F5F7FF;
                    }

                    a {
                        text-decoration: none;
                        color: unset;
                    }

                    &.clicked:active {
                        box-shadow: 0 0 0 4px #A5AFFF inset;
                    }

                    .inner {
                        .tit {
                            position: relative;
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 45px;

                            > h5,
                            span {
                                font-weight: 500;
                            }

                            &::after {
                                position: absolute;
                                content: '';
                                width: 200%;
                                height: 1px;
                                background: rgba(0, 0, 0, 0.15);
                                left: 50%;
                                bottom: -20px;
                                transform: translateX(-50%);
                            }
                        }

                        .contWrap {
                            display: flex;
                            flex-wrap: wrap;

                            .cont {
                                width: 50%;
                                margin-bottom: 25px;

                                span {
                                    font-size: 0.8rem;
                                    color: rgba(0, 0, 0, 0.40);
                                }

                                p {
                                    font-size: 0.8rem;
                                    font-weight: 700;
                                    padding-top: 12px;
                                    color: rgba(0, 0, 0, 0.60);
                                }

                                &:last-child {
                                    width: 65%;
                                    margin-bottom: 0;

                                    p {
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                }
                            }
                        }

                        .serviceActive {
                            position: absolute;
                            width: 36px;
                            height: 36px;
                            right: 29px;
                            bottom: 27px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fff;
                            background-color: rgba(0, 0, 0, 0.25);
                            border-radius: 50%;

                            &.active {
                                background-color: rgba(90, 216, 88, 1);
                            }

                            .toggleBg {
                                position: relative;
                                width: 63px;
                                height: 32px;
                                border-radius: 16px;
                                background-color: rgba(0, 0, 0, 0.25);
                                transition: all 1s;

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
                }

                &.noService {
                    width: 360px;
                    padding: 80px 0;
                    box-shadow: unset;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    color: rgba(0, 0, 0, 0.40);

                    h2 {
                        font-size: 28px;
                        font-weight: 700;
                    }
                }
            }
        }
    }
}

@media (max-width: 1280px) {
    #dashboard {
        .title {
            width: 100%;
            padding-left: 2rem;
        }

        .container {
            .wrapper {
                width: 100%;
            }
        }
    }
}

@media (max-width: 1100px) {
    #dashboard {
        .wrapper {
            width: 100%;

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

@media (max-width: 680px) {
    #dashboard {
        .wrapper {
            width: 100%;
            background-color: unset;
            padding: 0;

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