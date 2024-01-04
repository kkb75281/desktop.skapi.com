<template lang="pug">
.container#openid_script
    RouterLink(to="/")
        img.logo(src="@/assets/img/logo/symbol-logo.png")
    .title Sign up
    form(@submit.prevent="signup")
        .input
            label.label Email 
            input(type="text" 
            :value='form.email' 
            @input="e=> { form.email = e.target.value; }"
            title="Please enter a valid email address." 
            placeholder="Enter your email" 
            required)
        .passwordInput    
            .input
                label.label Password 
                input(
                :type='showPassword ? "text" : "password"'
                ref="passwordField" 
                @input="e=> { form.password = e.target.value; e.target.setCustomValidity(''); error = '' }"
                @change="validatePassword" 
                placeholder="Create a password" 
                required)
            .passwordIcon(@click="showPassword = !showPassword")
                template(v-if="showPassword")
                    .material-symbols-outlined.sml visibility
                template(v-else)
                    .material-symbols-outlined.sml visibility_off
        .passwordInput    
            .input
                label.label Password Confirm 
                input(
                :type='showPassword ? "text" : "password"'
                ref="confirmPasswordField" 
                @input="e=> { form.password_confirm = e.target.value; e.target.setCustomValidity(''); error = '' }"
                @change="validatePassword" 
                placeholder="Confirm the password" 
                required)
            .passwordIcon(@click="showPassword = !showPassword")
                template(v-if="showPassword")
                    .material-symbols-outlined.sml visibility
                template(v-else)
                    .material-symbols-outlined.sml visibility_off
        .action 
            .customCheckBox
                input#remember(type="checkbox" @input="(e)=> form.subscribe = e.target.checked" checked)
                label(for="remember")
                    span I agree to receive newsletters from Skapi via Email.
                    .material-symbols-outlined.mid.check check
        .error(v-if="error")
            .material-symbols-outlined.mid error
            span {{ error }}
        .bottom
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            
            template(v-else)
                button.create Continue
                .signup 
                    span Have an account?
                    RouterLink(:to="{name: 'login'}") Login

    br
    br

    // google login button
    a(:href="googleOpenId") Google Login (OpenID)
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { skapi, account, googleOpenId } from '@/main.js';

let route = useRoute();
let router = useRouter();
let form = reactive({
    email: '',
    password: '',
    password_confirm: '',
    subscribe: true,
});
let signupError = ref('');
let showPassword = ref(false);
let promiseRunning = ref(false);
let error = ref(null);
let passwordField = ref(null);
let confirmPasswordField = ref(null);

// get promocode query params
let promocode = ref('');
if(route.query?.hasOwnProperty('kdu')) {
    promocode.value = 'kdu'; // kook dong university
}

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
onBeforeUnmount(() => {
    document.querySelector('body').classList.remove('fa'); // <- 이게 필요하지 않을까요?
})

let validatePassword = () => {
    if (form.password.length < 6 || form.password.length > 60) {
        passwordField.value.setCustomValidity('Min 6 characters and Max 60 characters');
        passwordField.value.reportValidity();
    } else if (form.password_confirm !== form.password) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        confirmPasswordField.value.reportValidity();
    }
}

let signup = () => {
    error.value = '';
    promiseRunning.value = true;
    signupError.value = "";

    let params = {
        email: form.email,
        password: form.password,
        misc: promocode.value
    }
    let options = {
        signup_confirmation: '/success',
        email_subscription: form.subscribe
    }

    skapi.signup(params, options).then(res => {
        console.log(res);
        router.push({ path: '/confirmation', query: { email: form.email } })
    }).catch(err => {
        console.log(err)
        promiseRunning.value = false;

        switch (err.code) {
            case 'EXISTS':
                error.value = "This email is already in use";
                break;
            default:
                error.value = "Something went wrong please contact an administrator.";
                throw e;
        }
    });
}
</script>

<style lang="less" scoped>
.container {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 440px;
    transform: translate(-50%, -50%);
    // width: 440px;
    // margin: 0 auto;
    
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

            .label {
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

            select {
                display: block;
                width: 100%;
                height: 44px;
                padding: 0 16px;
                border: 0;
                border-radius: 8px;
                background: rgba(0,0,0,0.05);
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                color: rgba(0, 0, 0, 0.60);
                font-size: 16px;
                font-weight: 500;
            }

            .question {
                color: rgba(0, 0, 0, 0.80);
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 17px;
            }
        }
        .customCheckBox {
            margin-bottom: 14px;

            label {
                width: 100%;
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

            .create,
            .submit {
                border-radius: 8px;
                background: #293FE6;
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                border: 0;
                height: 44px;
                padding: 12px 28px;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
            }

            .skip {
                border: 0;
                background-color: unset;
                color: #293FE6;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
            }
        }
    }
}

@media (max-width: 480px) {
    .customCheckBox {
        label {
            align-items: unset;
        }
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
            .bottom {
                display: block;
                text-align: center;

                &.flex {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .create {
                    width: 100%;
                    margin-bottom: 40px;
                }
                .signup {
                    text-align: center;
                }
            }
        }
    }
}
</style>