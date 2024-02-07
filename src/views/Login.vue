<template lang="pug">
.container#openid_script
    RouterLink(:to="{name: 'home'}")
        img.logo(src="@/assets/img/logo/symbol-logo.png")
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
                    .material-symbols-outlined.mid.check check
            RouterLink.forgot(:to="{name: 'forgotpassword'}") Forgot Email & Password?
        .error(v-if="error")
            .material-symbols-outlined.mid error
            span {{ error }}
        br
        br
        .bottom
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.final Login
                //- br
                //- br
                //- a.googleLogin(:href="googleOpenId")
                //-     img(src="@/assets/img/icon/google.svg")
                //-     span Sign in with Google
                br
                br
                RouterLink.forgot(:to="{name: 'forgotpassword'}") Forgot Email & Password?
                .signup 
                    span No account?
                    RouterLink(:to="{name: 'signup'}") Sign up

    br
    br

    // google login button
    //- a.googleLogin(:href="googleOpenId")
    //-     img(src="@/assets/img/icon/google.svg")
    //-     span Sign in with Google
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { skapi } from '@/main.js';
import { account, googleOpenId } from '../main';

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
        router.push({ path: '/myServices' });
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

    .customCheckBox label {
        width: 100%;
    }

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
            }
        }

        .bottom {
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row-reverse;
            // margin-top: 48px;

            .forgot {
                display: none;
            }

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

            .googleLogin {
                display: none;
            }
        }
    }
}

.googleLogin {
    display: block;
    padding: 8px 0;
    border-radius: 8px;
    border: 1px solid #D9D9D9;
    text-decoration: none;
    text-align: center;

    img {
        display: inline-block;
        vertical-align: middle;
        width: 24px;
        height: 24px;
        margin-right: 7px;
    }
    span {
        font-size: 16px;
        font-weight: 700;
        color: #293FE6;
    }
}

@media (max-width: 480px) {
    .customCheckBox {
        label {
            align-items: unset;
        }
    }

    .googleLogin{
        display: none;
    }

    .container {
        position: relative;
        width: 100%;
        margin: 0 auto;
        padding: 75px 20px 0 20px;
        left: unset;
        top: unset;
        transform: unset;

        form {
            .action {
                .forgot {
                    display: none;
                }
            }

            .bottom {
                height: unset;
                display: block;
                text-align: center;

                .final {
                    width: 100%;
                    // margin-bottom: 40px;
                }

                .forgot {
                    display: block;
                    margin-bottom: 28px;
                    text-decoration: none;
                    color: #293FE6;
                }

                .googleLogin {
                    display: block;
                }
            }
        }
    }
}
</style>