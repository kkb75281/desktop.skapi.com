<template lang="pug">
main
    .container
        .title 
            h2 Dashboard
            span All Services
        .wrapper 
            // service 로딩이 완료 되면 표시
            .boxWrap(v-if="!serviceFetching")
                .box.btn(v-if="!create" @click="create = true;")
                    .material-symbols-outlined.mid add
                    span Create Service
                .box.create(v-if="create")
                    form(@submit.prevent="" action="")
                        h3 Create a new service
                        input(type="text" placeholder="Name of Service")
                        .buttons
                            button(type="button" @click="create = false;").cancel Cancel
                            button(type="button").create Create

                template(v-if="services?.length")         
                    router-link.box.service.clicked(v-for="service in services" :to="'/dashboard/' + service.service")
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
                                    h5 {{ new Date(service.timestamp).toDateString() }}
                                .cont 
                                    span CORS
                                    h5 {{ service.cors }}
                            .toggleWrap.locked(:class="{'active': service.active == 1 }")
                                .toggleBg
                                    .toggleBtn
                template(v-else)
                    .box.noService
                        h2 No Services
                        p Get started by creating a new service.
</template>

<script setup>
import { services, serviceFetching } from '@/data.js';
</script>

<style lang="less" scoped>
main {
    position: relative;
    margin-top: 68px;
    padding: 0 40px;

    &::before {
        position: absolute;
        content: '';
        left: 0;
        top: 80px;
        width: 100%;
        height: calc(100vh - 208px);
        background-color: #fafafa;
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));
        border-radius: 8px 8px 0 0;
        z-index: -1;
    }

    .container {
        // margin: 0 120px;
        width: 1200px;
        margin: 0 auto;
    }

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

    .wrapper {
        width: 100%;
        height: 100%;
        padding: 40px;

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
                            display: flex;
                            justify-content: space-between;

                            button {
                                border: 0;
                                padding: 14px 28px;
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

                        .toggleWrap {
                            position: absolute;
                            right: 29px;
                            bottom: 27px;
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
        .container {
            width: 100%;
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
// }</style>