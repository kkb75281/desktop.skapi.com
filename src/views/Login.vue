<template lang="pug">
.container
    RouterLink(:to="{name: 'home'}")
        img.logo(src="@/assets/symbol-logo.png")
    .title Log in
    form(@submit.prevent="login" action="")
        .input
            label Email 
            input(type="text"
            @input="e=> { form.email = e.target.value; e.target.setCustomValidity(''); }" 
            placeholder="E.g. someone@gmail.com" 
            required)
        .passwordInput    
            .input
                label Password 
                input(
                :type='showPassword ? "text" : "password"'
                @input="e=>form.password = e.target.value" 
                placeholder="Enter password" 
                required)
            .passwordIcon(@click="showPassword = !showPassword")
                template(v-if="showPassword")
                    .material-symbols-outlined.sml visibility
                template(v-else)
                    .material-symbols-outlined.sml visibility_off
        .action 
            .customCheckBox
                input#remember(type="checkbox" @change="e => {form.remember = e.target.checked}" checked)
                label(for="remember")
                    span Remember Me
                    span.material-symbols-outlined.mid.check check
            RouterLink(:to="{name: 'forgotpassword'}") Forgot Email & Password?
        .material.error(v-if="error")
            .material-symbols-outlined.mid error
            span {{ error }}
        .bottom
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                .signup 
                    span No account?
                    RouterLink(:to="{name: 'signup'}") Sign up
                button.login Login
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { skapi } from '@/main.js';
import { account } from '../main';

let route = useRoute();
let router = useRouter();
let form = {
    email: '',
    password: '',
    remember: true,
};
let showPassword = ref(false);
let promiseRunning = ref(false);
// let emailConfirmed = ref(false);
let error = ref(null);

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
let login = () => {
    promiseRunning.value = true;
    let params = {
        email: form.email,
        password: form.password
    }
    let options = {
        remember: form.remember
    }
    skapi.adminLogin(params, options).then(res => {
        account.value = res;
        router.push({ path: '/dashboard' });
    }).catch(err => {
        promiseRunning.value = false;
        if (err.code === "SIGNUP_CONFIRMATION_NEEDED") {
            router.push({ path: '/confirmation', query: { email: form.email } });
        } else if (err.code === "USER_IS_DISABLED") {
            error.value = "This account is disabled."
        } else if (err.code === "INCORRECT_USERNAME_OR_PASSWORD") {
            error.value = "Incorrect email or password."
        } else if (err.code === "NOT_EXISTS") {
            error.value = "Incorrect email or password."
        } else {
            error.value = err.message;
        }
    })
}
</script>

<style lang="less" scoped>
.container {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 440px;
    transform: translate(-50%, -50%);

    .logo {
        width: 40px;
    }

    .title {
        position: relative;
        color: rgba(0, 0, 0, 0.80);
        font-size: 28px;
        font-weight: 700;
        padding: 28px 0;
        margin-bottom: 32px;

        &::after {
            position: absolute;
            content: '';
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background: rgba(0, 0, 0, 0.10);
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        }
    }

    form {
        .input {
            margin-bottom: 16px;
            user-select: none;

            label {
                display: block;
                margin-bottom: 8px;
                color: rgba(0, 0, 0, 0.60);
                font-size: 16px;
                font-weight: 700;
            }

            input {
                background-color: rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                border: 0;
                padding: 12px 15px;
                width: 100%;
                font-size: 16px;
                font-weight: 400;
            }
        }

        .action {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;

            a {
                color: #293FE6;
                font-size: 16px;
                font-weight: 400;
                text-decoration: none;
                user-select: none;
            }
        }

        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 48px;

            .signup {
                font-size: 16px;

                span {
                    font-weight: 500;
                    margin-right: 5px;
                }

                a {
                    text-decoration: none;
                    color: #293FE6;
                    font-weight: 700;
                }
            }

            .login {
                border-radius: 8px;
                background: #293FE6;
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                border: 0;
                padding: 12px 28px;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
            }
        }
    }
}
</style>