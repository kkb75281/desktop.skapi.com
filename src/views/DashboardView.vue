<template lang="pug">
main
    .title 
        h2 Dashboard
        span All Services
    .container
        .wrapper(v-if="!serviceFetching")
            // service 로딩이 완료 되면 표시
            .boxWrap
                .box.btn(v-if="!create" @click="createService" :class="{'disabled' : !account.email_verified}")
                    .material-symbols-outlined.mid add
                    span Create Service
                .box.create(v-if="create")
                    form(@submit.prevent="addService")
                        h3 Create a new service
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
                                h3 {{ service.name }}
                                .material-symbols-outlined.mid arrow_forward_ios
                            .contWrap 
                                .cont 
                                    span Locale
                                    h5 {{ service.created_locale }}
                                .cont 
                                    span Date Created
                                    h5 {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                                .cont 
                                    span CORS
                                    h5 {{ service.cors }}
                            
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
import { skapi, account } from '@/main.js'

let create = ref(false);
let createService = () => {
    if(!account.email_verified) {
        create.value = false;
    } else {
        create.value = true;
        nextTick(() => {
            document.getElementById('serviceName').focus();
        });
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
        })
        .finally(_ => promiseRunning.value = false)
}
</script>

<style lang="less" scoped>
main {
    position: relative;
    margin-top: 68px;
    padding: 0 40px;

    .title {
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 42px;

        h2 {
            display: inline-block;
            font-size: 32px;
            font-weight: 700;
            margin-right: 18px;
        }

        span {
            font-size: 24px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.40);
        }
    }
    .container {
        width: calc(100% + 80px);
        min-height: calc(100vh - 208px);
        margin-left: -40px;
        padding: 40px;
        background-color: #fafafa;
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));
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
                // width: 352.5px;
                height: 254px;
                margin-right: 3.5%;
                margin-bottom: 3.5%;
                border-radius: 8px;
                padding: 27px 29px;
                background-color: #fafafa;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
                transition: all 0.1s;

                &:nth-child(3n+3) {
                    margin-right: 0;
                }

                &.disabled {
                    opacity: 0.5;
                    user-select: none;
                    cursor: default !important;
                }
                
                &.btn {
                    background: rgba(41, 63, 230, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
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
                        h3 {
                            color: #293FE6;
                            font-size: 24px;
                            font-weight: 500;
                            margin-bottom: 20px;
                        }

                        input {
                            width: 100%;
                            border-radius: 8px;
                            background: rgba(0, 0, 0, 0.05);
                            border: 0;
                            padding: 15px 20px;
                            font-size: 16px;
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
                                font-size: 16px;
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
                        background: rgba(41, 63, 230, 0.05);
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

                            h3,
                            span {
                                font-size: 24px;
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
                                font-size: 16px;
                                margin-bottom: 25px;

                                h5 {
                                    font-size: 16px;
                                    padding-top: 12px;
                                    color: rgba(0, 0, 0, 0.60);
                                }

                                span {
                                    color: rgba(0, 0, 0, 0.40);
                                }

                                &:last-child {
                                    width: 200px;
                                    margin-bottom: 0;

                                    h5 {
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
    main {
        .title {
            width: 100%;
        }
        .container {
            .wrapper {
                width: 100%;
            }
        }
    }
}

// @media (max-width: 1100px) {
// main {
//     .wrapper {
//         width: 100%;

//         .box {
//             width: 48%;
//             margin-right: 4%;
//             margin-bottom: 4%;

//             &:nth-child(2n+2) {
//                 margin-right: 0;
//             }
//             &:nth-child(6n+6) {
//                 margin-right: 0;
//             }
//             &:nth-child(3n+3) {
//                 margin-right: 4%;
//             }
//         }
//     }
// }
// }

// @media (max-width: 700px) {
// main {
//     .wrapper {
//         width: 100%;
//         background-color: unset;
//         padding: 0;

//         .box {
//             width: 100%;
//             margin-right: 0%;
//             margin-bottom: 30px;

//             &:nth-child(3n+3) {
//                 margin-right: 0;
//             }

//             &.btn {
//                 height: 251px;
//             }
//         }
//     }
// }
// }
</style>