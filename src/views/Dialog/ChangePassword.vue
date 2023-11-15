<template lang="pug">
dialog#changePasswordDialog(@click="closeDialog")
    .header Change Password
    .content
        template(v-if="step === 1")
            form(@submit.prevent="verifyPassword" action="")
                p Please enter your current password.
                .passwordInput    
                    .input
                        label Current Password
                        input(
                        :type='showPassword ? "text" : "password"'
                        :value='currentPassword' 
                        @input="e=> { currentPassword = e.target.value; }" 
                        placeholder="Enter old password" 
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
                        button.cancel(@click="close") Cancel
                        button.save(type="submit") Continue
        template(v-if="step >= 2")
            form(@submit.prevent="changePassword" action="")
                p Please enter new password.
                .passwordInput    
                    .input
                        label New password
                        input(
                        :type='showPassword ? "text" : "password"'
                        ref="passwordField"
                        :value='password' 
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
                        :value='passwordConfirm' 
                        @input="e=> { passwordConfirm = e.target.value; e.target.setCustomValidity(''); }" 
                        @change="validatePassword" 
                        placeholder="Confirm the new password" 
                        required)
                    .passwordIcon(@click="showPassword = !showPassword")
                        template(v-if="showPassword")
                            .material-symbols-outlined.sml visibility
                        template(v-else)
                            .material-symbols-outlined.sml visibility_off
                .buttonWrap 
                    template(v-if="promiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button.cancel(@click="close") Cancel
                        button.save(type="submit" :loading="promiseRunning") Change
        .navigator(v-if="step <= 2")
            .ball(v-for="num in 2" @click="() => { num < step ? step = num : null; currentPassword=''; password = '';  passwordConfirm = '';}" :class="{'active': step === num}")
</template>
<script setup>
import { ref } from "vue";

let promiseRunning = ref(false);
let showPassword = ref(false);
let currentPassword = '';
let password = '';
let passwordConfirm = '';
let passwordField = ref(null);
let confirmPasswordField = ref(null);
let step = ref(1);
let error = ref(''); // The password you have entered is incorrect.

let closeDialog = (e) => {
    if(promiseRunning.value) return false;

    let changePasswordDialog = document.getElementById('changePasswordDialog');
    let rect = e.target.getBoundingClientRect();

    if (rect.left > e.clientX || rect.right < e.clientX || rect.top > e.clientY || rect.bottom < e.clientY) {
        changePasswordDialog.close();
    }
}
let close = (e) => {
    e.preventDefault();
    currentPassword = '';
    password = '';
    passwordConfirm = '';
    step.value = 1;
    error.value = '';

    let changePasswordDialog = document.getElementById('changePasswordDialog');

    if(promiseRunning.value) return false;
    if(e.target.classList.contains('cancel')) {changePasswordDialog.close();}
}
let validatePassword = () => {
    if (password.length < 6 || password.length > 60) {
        passwordField.value.setCustomValidity('Min 6 characters and Max 60 characters');
        passwordField.value.reportValidity();
    } else if (passwordConfirm !== password) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        confirmPasswordField.value.reportValidity();
    }
}
let verifyPassword = async () => {
    promiseRunning.value = true;
    error.value = '';
    console.log(currentPassword)
    step.value++;
    promiseRunning.value = false;
}
let changePassword = () => {
    promiseRunning.value = true;
    error.value = '';

    if(password !== passwordConfirm) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        promiseRunning.value = false;
        return false;
    }

    console.log(password, passwordConfirm)
    promiseRunning.value = false;
}
</script>
<style lang="less" scoped>
dialog {
    position: fixed;
    content: '';
    left: 50%;
    top: 50%;
    width: 480px;
    transform: translate(-50%, -50%);
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
                    background-color:#293FE6;
                }
        
                &:last-child {
                    margin: 0;
                }
            }
        }
    }
}
</style>