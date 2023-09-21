<template lang="pug">
.navBar
    router-link(to="/")
        img.logo(src="@/assets/img/logo/logo.png")
    .menu
        ul(v-if="account")
            li 
                a(href="https://docs.skapi.com" target="_blank") Documentation
            li
                router-link(to="/dashboard") Dashboard
            li.account(@click.stop="accountInfo = !accountInfo") {{ account.email.charAt(0).toUpperCase() }}
        ul(v-else)
            li 
                a(href="https://docs.skapi.com" target="_blank") Documentation
            li
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

    .logo {
        width: 120px;
    }

    .menu {
        ul {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            li {
                list-style: none;
                margin-right: 60px;

                a {
                    color: #293FE6;
                    text-decoration: none;
                    font-size: 20px;
                    cursor: pointer;

                    &.signup {
                        color: #fff;
                        padding: 8px 20px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 700;
                        background: #293FE6;
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
                    user-select: none;
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
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));
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
}</style>