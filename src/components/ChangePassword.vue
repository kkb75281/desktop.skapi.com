<template lang="pug">
#changePassword(@mousedown="closeWindow")
    .wrap(@mousedown.stop)
        .header Change Password
        .content
            template(v-if="step === 1")
                form(@submit.prevent="verifyPassword" action="")
                    p Please enter your current password.
                    .passwordInput    
                        .input
                            label Current Password
                            input#currentPasswordInput(
                            :type='showPassword ? "text" : "password"'
                            @input="e=> { currentPassword = e.target.value; }" 
                            placeholder="Enter old password" 
                            required)
                        .passwordIcon(@click="showPassword = !showPassword")
                            template(v-if="showPassword")
                                .material-symbols-outlined.sml visibility
                            template(v-else)
                                .material-symbols-outlined.sml visibility_off
                    .material(v-if="error")
                        .material-symbols-outlined.mid error
                        span {{ error }}
                    .buttonWrap 
                        template(v-if="promiseRunning")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            button.cancel(type="button" @click="closeWindow") Cancel
                            button.save(type="submit") Continue
            template(v-if="step >= 2")
                form(@submit.prevent="changePassword" action="")
                    p Please enter new password.
                    .passwordInput    
                        .input
                            label New password
                            input#newPasswordInput(
                            :type='showPassword ? "text" : "password"'
                            ref="passwordField"
                            @input="e=> { password = e.target.value; e.target.setCustomValidity(''); }" 
                            @change="validatePassword" 
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
                            ref="confirmPasswordField"
                            @input="e=> { passwordConfirm = e.target.value; e.target.setCustomValidity(''); }" 
                            @change="validatePassword" 
                            placeholder="Confirm the new password" 
                            required)
                        .passwordIcon(@click="showPassword = !showPassword")
                            template(v-if="showPassword")
                                .material-symbols-outlined.sml visibility
                            template(v-else)
                                .material-symbols-outlined.sml visibility_off
                    .error(v-if="error")
                        .material-symbols-outlined.mid error
                        span {{ error }}
                    .buttonWrap 
                        template(v-if="promiseRunning")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            button.cancel(type="button" @click="emits('close')") Cancel
                            button.save(type="submit" :loading="promiseRunning") Change
            .navigator(v-if="step <= 2")
                .ball(v-for="num in 2" @click="() => { num < step ? step = num : null; currentPassword=''; password = '';  passwordConfirm = '';}" :class="{'active': step === num}")
</template>
<script setup>
import { nextTick, onMounted, ref } from "vue";
import { skapi } from "@/main.js";
import { account } from "../main";

let emits = defineEmits(['close']);
let promiseRunning = ref(false);
let showPassword = ref(false);
let currentPassword = '';
let password = '';
let passwordConfirm = '';
let passwordField = ref(null);
let confirmPasswordField = ref(null);
let step = ref(1);
let error = ref('');

let closeWindow = () => {
    // login 이 실패하면 닫는순간 로그아웃됩니다
    if (loginFailed) {
        return skapi.logout().then(_ => account.value = null)
    }

    emits('close');
}

onMounted(() => {
    // 열렸을때 비번 인풋에 포커스
    document.getElementById('currentPasswordInput').focus();
})

let validatePassword = () => {
    if (password.length < 6 || password.length > 60) {
        passwordField.value.setCustomValidity('Min 6 characters and Max 60 characters');
        passwordField.value.reportValidity();
    } else if (passwordConfirm !== password) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        confirmPasswordField.value.reportValidity();
    }
}

let loginFailed = false;
let verifyPassword = async () => {
    promiseRunning.value = true;
    error.value = '';
    // 같은 비밀번호로 비번 변경 호출 시도. 에러가 뜨면 비번이 틀린것
    skapi.login({
        email: account.value.email,
        password: currentPassword
    }).then(_ => {
        loginFailed = false;
        promiseRunning.value = false;
        step.value++;
        nextTick(() => {
            document.getElementById('newPasswordInput').focus();
        })
    }).catch(err => {
        loginFailed = true;
        promiseRunning.value = false;
        if (err.code === 'REQUEST_EXCEED') {
            error.value = err.message;
        }
        else {
            error.value = 'The password you have entered is incorrect.'
        }
    });
}

let changePassword = () => {
    promiseRunning.value = true;
    error.value = '';

    if (password !== passwordConfirm) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        promiseRunning.value = false;
        return false;
    }
    skapi.changePassword({
        current_password: currentPassword,
        new_password: password
    }).then(_ => {
        //성공
        promiseRunning.value = false;
        emits('close', 'success');
    }).catch(err => {
        promiseRunning.value = false;
        error.value = err.message;
    });
}
</script>
<style lang="less" scoped>
#changePassword {
    position: fixed;
    overflow: auto; // 높이가 작을때 스크롤이 생기도록
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(26, 26, 26, 0.25);
    z-index: 99999;
}

.wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
    z-index: 999;

    .header {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: 28px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        color: rgba(0, 0, 0, 0.85);
        font-size: 24px;
        font-weight: 700;

        .editWrap {
            cursor: pointer;
        }
    }

    .content {
        padding: 28px;

        p {
            margin-bottom: 48px;
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

        .buttonWrap {
            width: 100%;
            height: 44px;
            margin-top: 56px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;

            button {
                background-color: unset;
                color: #293FE6;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;

                &.cancel {
                    border: 0;
                }

                &.save {
                    padding: 0 28px;
                    height: 44px;
                    border-radius: 8px;
                    border: 2px solid #293FE6;
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
}
</style>