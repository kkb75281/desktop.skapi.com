<template lang="pug">
#overlayWindow.verifyEmail( style='--max-width: 480px;')
    .overlayWrap
        header
            h5.title Verify Email
        main
            .content
                form(@submit.prevent="verifyEmail")
                    p 
                        | Verification Email has been sent. 
                        br
                        | Please check your email and enter the verification code.
                    br
                    br
                    .input
                        label Verification Code
                        input(
                            required
                            type="text"
                            name="code"
                            placeholder="Verification Code" 
                        )
                    br
                    .resend
                        template(v-if="resent")
                            .resending The Code has been resent.
                        template(v-else)
                            span Haven’t got any Code?
                            .click(@click="resend") Re-send Code
                    .error(v-if="error")
                        .material-symbols-outlined.mid error
                        span {{ error }}
                    br
                    br
                    .buttonWrap(:class="{'running' : promiseRunning}") 
                        // 결과를 기다렸다가 에러메세지를 보여야 하는 경우가 있어 verification code 확인하는 동안 에니메이션이 나타나게 하였습니다. (시은님과 의논필요)
                        template(v-if="promiseRunning")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            button.cancel(type="button" @click="emits('close')") Cancel
                            button.save(type="submit") Verify
</template>
<script setup>
import { ref } from "vue";
import { skapi, account } from '@/main.js';

let emits = defineEmits(['close']);
let error = ref(''); // The code is incorrect. Please check the code again.
let resent = ref(false);
let promiseRunning = ref(false);

let resend = () => {
    skapi.verifyEmail().catch(err => {
        if (err.code === 'TooManyRequestsException') {
            error.value = 'Too many attempts. Please try again later.'
        }
        else {
            throw err;
        }
    });

    resent.value = true;
}
let verifyEmail = (e) => {
    error.value = '';
    promiseRunning.value = true;
    skapi.verifyEmail(e).then(_=> {
        // 성공
        promiseRunning.value = true;
        account.value.email_verified = true;
        emits('close');
    }).catch(err=>{
        promiseRunning.value = false;
        if (err.code === 'TooManyRequestsException') {
            error.value = 'Too many attempts. Please try again later.'
        }
        else if(err.code === 'CodeMismatchException') {
            error.value = 'The code is invalid. Please check the code again.'
        }
        else if(err.code === 'ExpiredCodeException') {
            error.value = 'The code has expired. Please request the code again.';
            resent.value = false;
        }
        else {
            throw err;
        }
    });
}
</script>
<style lang="less" scoped>
.resend {
    span {
        font-size: 0.8rem;
        font-weight: 500;
        margin-right: 5px;
    }

    .click {
        display: inline-block;
        color: #293FE6;
        font-weight: 700;
        font-size: 0.8rem;
        cursor: pointer;
    }

    .resending {
        color: rgba(0, 0, 0, 0.40);
        font-weight: 400;
        font-size: 0.8rem;
    }
}
</style>