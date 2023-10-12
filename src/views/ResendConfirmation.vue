<template lang="pug">
.container
    RouterLink(:to="{name: 'home'}")
        img.logo(src="@/assets/img/logo/symbol-logo.png")
    .title Confirm your email
    .content 
        | Please check your inbox for a confirmation email. 
        br
        | Click the link in the email to confirm your email address. 
    .email The code has sent to : 
        span {{ decodedEmail }}
    .resend
        template(v-if="resending")
            .resending The Code has been resent.
        template(v-else)
            span Haven’t got any Code?
            .click(@click="resend") Re-send Code
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { skapi } from '@/main.js';

let resending = ref(false);

onMounted(()=>{
    document.querySelector('body').classList.add('fa');
})

let email = window.location.search.split('=')[1];
let decodedEmail = decodeURIComponent(email);

let resend = () => {
    resending.value = true;
    console.log('resend!');
    let redirectUrl = '/login'
    skapi.resendSignupConfirmation(redirectUrl).then(res=>{
        console.log(res); // 'SUCCESS: Signup confirmation E-Mail has been sent.'
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
    .content {
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        margin-bottom: 24px;
    }
    .email {
        margin-bottom: 40px;
        color: rgba(0, 0, 0, 0.40);
        font-size: 16px;
        font-weight: 400;

        span {
            color: #293FE6;
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
}

@media (max-width: 480px) {
    .container {
        position: relative;
        width: 100%;
        margin: 0 auto;
        padding: 75px 20px 0 20px;
        left: unset;
        top: unset;
        transform: unset;
    }
}
</style>