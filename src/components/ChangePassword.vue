<template lang="pug">
#overlayWindow.changePassword(@mousedown="closeWindow" style='--max-width: 480px;')
    .overlayWrap(@mousedown.stop)
        header
            h5.title Change Password
        main
            .content
                template(v-if="step === 1")
                    form(@submit.prevent="verifyPassword" action="")
                        p Please enter your current password.
                        br
                        br
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
                        .error(v-if="error")
                            .material-symbols-outlined.mid error
                            span {{ error }}
                        br
                        br
                        .buttonWrap(:class="{'running' : promiseRunning}")
                            template(v-if="promiseRunning")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button.cancel(type="button" @click="closeWindow") Cancel
                                button.save(type="submit") Continue
                template(v-if="step >= 2")
                    form(@submit.prevent="changePassword" action="")
                        p Please enter new password.
                        br
                        br
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
                        br
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
                        br
                        br
                        .buttonWrap 
                            template(v-if="promiseRunning")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button.cancel(type="button" @click="emits('close')") Cancel
                                button.save(type="submit" :loading="promiseRunning") Change
                br
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
