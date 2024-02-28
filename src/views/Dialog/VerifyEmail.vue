<template lang="pug">
dialog#verifyEmailDialog(@click="closeDialog")
    .header Verify Email
    .content
        form(@submit.prevent="verifyEmail" action="")
            p 
                | Verification Email has been sent. 
                br
                | Please check your email and enter the verification code.
            .input
                label Verification Code
                input(type="text" 
                :value='code' 
                @input="e=> { code = e.target.value; }" 
                placeholder="Verification Code" 
                )
            .resend
                span Haven’t got any Code?
                .click(@click="resend") Re-send Code
            .error(v-if="error")
                .material-symbols-outlined.mid error
                span {{ error }}
            .buttonWrap 
                button.cancel(@click="closeDialog") Cancel
                button.save Verify
</template>
<script setup>
import { ref } from "vue";

let code = '';
let error = ref('The code is incorrect. Please check the code again.');

let closeDialog = (e) => {
    let verifyEmailDialog = document.getElementById('verifyEmailDialog');
    let rect = e.target.getBoundingClientRect();

    if (rect.left > e.clientX ||rect.right < e.clientX ||rect.top > e.clientY ||rect.bottom < e.clientY || e.target.classList.contains('cancel')) {
        verifyEmailDialog.close();
    }
}
let verifyEmail = () => {
    error.value = '';
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
                color: var(--main-color);
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
            margin-top: 56px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;

            button {
                background-color: unset;
                color: var(--main-color);
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
                    border: 2px solid var(--main-color);
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
            background-color:var(--main-color);
        }

        &:last-child {
            margin: 0;
        }
    }
}
</style>