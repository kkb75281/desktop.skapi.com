<template lang="pug">
//- #verifyEmail(@click="closeWindow")
// verify email은 배경을 클릭했을때 닫히게 하는것이 좋지 않을수있다는 생각이 들었습니다. (인증메일 발송 이후 실수로 다시 닫아버리면 인증메일을 다시 요청해야하고 받은메일에서 어떤것이 맞는 인증메일인지 햇갈리수도있습니다)
#verifyEmail
    .wrap
        .header Verify Email
        .content
            form(@submit.prevent="verifyEmail")
                p 
                    | Verification Email has been sent. 
                    br
                    | Please check your email and enter the verification code.
                .input
                    label Verification Code
                    input(
                        required
                        type="text"
                        name="code"
                        placeholder="Verification Code" 
                    )
                .resend
                    template(v-if="resent")
                        .resending The Code has been resent.
                    template(v-else)
                        span Haven’t got any Code?
                        .click(@click="resend") Re-send Code
                .error(v-if="error")
                    .material-symbols-outlined.mid error
                    span {{ error }}
                .buttonWrap 
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
#verifyEmail {
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
            color: rgba(0, 0, 0, 0.60);
            font-size: 16px;
            font-weight: 500;
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
</style>