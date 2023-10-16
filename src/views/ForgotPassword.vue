<template lang="pug">
.container
    RouterLink(:to="{name: 'home'}")
        img.logo(src="@/assets/img/logo/symbol-logo.png")
    .title Forgot Password
    template(v-if="step === 1")
        form(@submit.prevent="forgotPassword" action="")
            p 
                | Please check your inbox for a confirmation email. 
                br
                | Click the link in the email to confirm your email address. 
            .input
                label Email
                input(type="text" 
                :value="email"
                @input="(e) => { email = e.target.value; codeError = ''; }"
                pattern="[a-zA-Z0-9\+]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*" 
                title="Please enter a valid email address." 
                placeholder="Enter your email address" 
                required)
            .material.error(v-if="codeError") 
                .material-symbols-outlined.mid error
                span {{ codeError }}
            .bottom
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    RouterLink(:to="{name: 'login'}") Back to Log in
                    button(type="submit") Continue
    template(v-else-if="step === 2")
        form(@submit.prevent="step++")
            p 
                | Please check your email and insert the code
                br
                | in order to create a new password. 
            .email The code has sent to : {{ email }}
            .input
                label Code
                input(
                type="text"
                :value="code"
                @input="(e) => { code = e.target.value; codeError = ''; }"
                placeholder="Enter verification code"
                required)
            .resend 
                template(v-if="resending")
                    .resending The Code has been resent.
                template(v-else)
                    span Haven’t got any Code?
                    .click(@click="resend") Re-send Code
            .material.error(v-if="codeError") 
                .material-symbols-outlined.mid error
                span {{ codeError }}
            .bottom
                button.back(type="button" @click="back") Back
                button(type="submit") Continue
    template(v-else-if="step === 3")
        form(@submit.prevent="changePassword" action="")
            p Create a new password.
            .passwordInput    
                .input
                    label New password
                    input(
                    :type='showPassword ? "text" : "password"'
                    ref="newPasswordField" 
                    :value="newPassword"
                    @input="e=> { newPassword = e.target.value; e.target.setCustomValidity(''); }" 
                    @change="validateNewPassword" 
                    placeholder="Create a new password"
                    required)
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        .material-symbols-outlined.sml visibility
                    template(v-else)
                        .material-symbols-outlined.sml visibility_off
            .passwordInput    
                .input
                    label New password confirm
                    input(
                    :type='showPassword ? "text" : "password"'
                    ref="confirmNewPasswordField"
                    :value="newPasswordConfirm"
                    @input="e=> { newPasswordConfirm = e.target.value; e.target.setCustomValidity(''); }" 
                    @change="validateNewPassword" 
                    placeholder="Confirm the new password"
                    required)
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        .material-symbols-outlined.sml visibility
                    template(v-else)
                        .material-symbols-outlined.sml visibility_off
            .bottom(style="justify-content: flex-end;")
                button(type="submit") Continue
    .navigator(v-if="step <= 3")
        .ball(v-for="num in 3" @click="() => { num < step ? step = num : null; password = '';  passwordConfirm = '';}" :class="{'active': step === num}")
changeSuccess(:showSuccess="showSuccess")
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { skapi } from '@/main.js';
import changeSuccess from '@/components/ChangeSuccess.vue';

let step = ref(1);
let email = '';
let newPassword = '';
let newPasswordConfirm = '';
let code = ref('');
let showPassword = ref(false);
let showSuccess = ref(false);
let resending = ref(false);
let codeError = ref(''); // The code is invalid
let newPasswordField = ref(null);
let confirmNewPasswordField = ref(null);
let promiseRunning = ref(false);
onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
let forgotPassword = async () => {
    promiseRunning.value = true;
    codeError.value = '';
    try {
        await skapi.forgotPassword({ email });
        step.value++;
    }
    catch (err) {
        codeError.value = err.message;
    }
    finally {
        promiseRunning.value = false;
    }
}
let changePassword = () => {
    skapi.resetPassword({ email: email, code: code.value, new_password: newPassword }).then(res => {
        showSuccess.value = true;
    }).catch(err => {
        step.value--;
        nextTick(() => {
            codeError.value = err.message;
        });
    })
}
let back = () => {
    code = '';
    codeError.value = '';
    step.value--;
}
let resend = () => {
    resending.value = true;
    
    skapi.forgotPassword({ email }).catch(err => {
        codeError.value = err.message;
        step.value = 1;
    })

    setTimeout(() => {
        resending.value = false;
    }, 30000);
}
let validateNewPassword = () => {
    if (newPassword.length < 6 || newPassword.length > 60) {
        newPasswordField.value.setCustomValidity('Min 6 characters and Max 60 characters');
        newPasswordField.value.reportValidity();
    } else if (newPasswordConfirm !== newPassword) {
        confirmNewPasswordField.value.setCustomValidity('Password does not match');
        confirmNewPasswordField.value.reportValidity();
    }
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
        p {
            margin-bottom: 28px;
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
        }

        .email {
            color: rgba(0, 0, 0, 0.40);
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            margin-bottom: 28px;
        }

        .resend {
            span {
                font-weight: 500;
                margin-right: 5px;
            }

            .click {
                display: inline-block;
                color: #293FE6;
                font-weight: 700;
                font-size: 16px;
                cursor: pointer;
            }

            .resending {
                color: rgba(0, 0, 0, 0.40);
                font-weight: 400;
                font-size: 16px;
            }
        }

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

        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 48px;

            a {
                text-decoration: none;
                color: #293FE6;
                font-weight: 700;
                font-size: 16px;
            }

            button {
                border-radius: 8px;
                background: #293FE6;
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                border: 0;
                padding: 12px 28px;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;

                &.back {
                    background-color: unset;
                    color: #293FE6;
                    padding: 0;
                    box-shadow: unset;
                }
            }
        }
    }

    .navigator {
        text-align: center;
        margin-top: 48px;

        .ball {
            display: inline-block;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background-color: #D9D9D9;
            cursor: pointer;
            margin-right: 12px;

            &.active {
                background-color: #293FE6;
            }

            &:last-child {
                margin: 0;
            }
        }
    }
}
</style>