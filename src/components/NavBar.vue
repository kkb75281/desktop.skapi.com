<template lang="pug">
.navBar(:class="{'home' : route.name == 'home'}")
    router-link(to="/")
        template(v-if="route.name == 'home'")
            img.logo(src="@/assets/img/logo/logo-white.svg")
            img.mlogo(src="@/assets/img/logo/symbol-logo-white.png")
        template(v-else)
            img.logo(src="@/assets/img/logo/logo.png")
    .menu
        template(v-if="account")
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
import { skapi, account, bodyClick } from '@/main.js';

let route = useRoute();
let router = useRouter();
let accountInfo = ref(false);

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
    await skapi.logout();
    router.push({ path: '/' });
}
</script>

<style lang="less" scoped>
.navBar {
    position: relative;
    padding: 10px 40px 10px 40px;
    width: 100%;
    height: 60px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;

    &.home {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        z-index: 9999;

        .menu {
            ul {
                &:first-child {
                    &::after {
                        background-color: #fff;
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
    &.fixed {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999999;
        background-color: #f0f0f0;
        box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
    }

    :first-child {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 120px;
    }

    .mlogo {
        width: 32px;
        display: none;
    }

    .menu {
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
                    background-color: rgba(0,0,0,0.6);
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

@media (max-width: 1420px) {
    .navBar {
        width: 100%;
    }
}
@media (max-width: 680px) {
    .navBar {
        padding: 0 20px;
        &.home {
            .logo {
                display: none;
            }
            .mlogo {
                display: block;
            }
        }
        .menu {
            ul {
                &:last-child {
                    padding-right: 4px;

                    li {
                        margin-right: 0;
                        &.doc, &.login, &.account {
                            display: none;
                        }
                    }
                }
            }
            // ul {
            //     display: inline-block;
            //     text-align: right;
            //     li {
            //         margin-right: 0;
            //         .doc, .login, &.account {
            //             display: none;
            //         }
            //     }
            // }
        }
    }
}
</style>