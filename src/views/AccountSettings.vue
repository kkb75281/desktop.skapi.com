<template lang="pug">
main(v-if='account')
    .container
        .title 
            h2 Account Setting
        .wrapper 
            .accountWrap 
                // info 변수를 정의하는 경우가 없는것같습니다. info의 역활은?
                .account(@click="info = true" :class="{'active': info}") Account info
                .account(@click="openDeleteAccount = true" :class="{'red': !info}") Delete Account
            .accountCont(v-if="info")    
                .row
                    .tit Email
                    .cont 
                        template(v-if="changeEmail")
                            form(@submit.prevent="reqeustEmailChange")
                                input#changeEmail(type="text" 
                                :value="email" 
                                :placeholder="account.email"
                                :disabled="promiseRunning"
                                pattern="[a-zA-Z0-9\+]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*" 
                                title="Please enter a valid email address." 
                                @input="(e) => {email = e.target.value;}")
                                .buttonWrap 
                                    template(v-if="promiseRunning")
                                        img.loading(src="@/assets/img/loading.png")
                                    template(v-else)
                                        button.cancel(type="button" @click="changeEmail = false;") Cancel
                                        button.save(type="submit") Save
                        template(v-else) {{ account.email }}
                    .btn(v-if="!changeEmail" @click="email=account.email; changeEmail = true;") Change email
                .row
                    .tit Verify Email
                    .cont
                        .material.verified(v-if="account.email_verified")
                            .material-symbols-outlined.sml check_circle
                            span Verified
                        .material.unVerified(v-else)
                            .material-symbols-outlined.sml error
                            span Unverified
                    .btn(type="button" v-if="!account.email_verified" @click="verifyEmail") Verify email
                .row
                    .tit Subscription
                    .cont 
                        .customCheckBox(:style='{opacity: disableNewsletterCheckbox ? ".5" : "1"}')
                            // !(account.email_verified || false) <- account.email_verified 가 undefined 인 경우도 있어서
                            // 사용자 email이 인증이 안되었을시 뉴스레터를 구독할수없습니다.
                            input#subscribeCheckbox(
                                type="checkbox"
                                v-model='newsletterSubscribed'
                                :disabled="disableNewsletterCheckbox"
                            )
                            label(for="subscribeCheckbox")
                                span Subscribe to Skapi newsletter
                                span.material-symbols-outlined.mid.check(:style="{cursor: disableNewsletterCheckbox ? 'default' : null }") check
                .row
                    .tit Password
                    .cont(v-if='passwordChanged')
                        .material.verified
                            .material-symbols-outlined.sml check_circle
                            span Password successfully changed
                    .btn(type="button" @click="openChangePassword = true;") Change Password
ChangePassword(v-if="openChangePassword" @close="(e)=>{ if (e === 'success') { passwordChanged = true } openChangePassword=false; }")
VerifyEmail(v-if="openVerifyEmail" @close="openVerifyEmail=false")
DeleteAccount(v-if="openDeleteAccount" @close="openDeleteAccount=false")
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { skapi, account } from '@/main.js';
import ChangePassword from '@/components/ChangePassword.vue';
import VerifyEmail from '@/components/VerifyEmail.vue';
import DeleteAccount from '@/components/DeleteAccount.vue';

let info = ref(true);
let email = ref('');
let emailConfirmed = ref(false);
let changeEmail = ref(false);
let openChangePassword = ref(false);
let openVerifyEmail = ref(false);
let openDeleteAccount = ref(false);
let promiseRunning = ref(false);
let disableEmail = ref(false); // disables input while api request is resolving
let newsletterPromise = ref(null);
let passwordChanged = ref(false);

let disableNewsletterCheckbox = computed(() => {
    // 사용자 email이 인증이 안되었을시 뉴스레터를 구독할수없습니다.
    if (!account.value.hasOwnProperty('_newsletterSubscribed') || newsletterPromise.value) {
        return true;
    }
    if (!account.value.email_verified) {
        if (account.value._newsletterSubscribed) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
})

let newsletterSubscribed = ref(null);

if (account.value.hasOwnProperty('_newsletterSubscribed')) {
    newsletterSubscribed.value = account.value._newsletterSubscribed;
}
else {
    skapi.getNewsletterSubscription({
        group: 'authorized'
    }).then(s => {
        if (s.length) {
            newsletterSubscribed.value = true;
            account.value._newsletterSubscribed = true;
        }
        else {
            newsletterSubscribed.value = false;
            account.value._newsletterSubscribed = false;
        }
    })
}

watch(newsletterSubscribed, (c, old) => {
    if (old === null) {
        // 로딩시 정의된 구독상태
        // console.log({ c });
    }
    else if (c) {
        newsletterPromise.value = skapi.subscribeNewsletter({
            group: 'authorized'
        }).then(n => {
            console.log(n);
            account.value._newsletterSubscribed = true;
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            newsletterPromise.value = null;
        });
    }
    else {
        newsletterPromise.value = skapi.unsubscribeNewsletter({
            group: 'authorized'
        }).then(n => {
            console.log(n);
            account.value._newsletterSubscribed = true;
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            newsletterPromise.value = null;
        });
    }
})

watch(changeEmail, () => {
    if (changeEmail.value) {
        nextTick(() => {
            // when change email is true, focus on the input
            document.getElementById('changeEmail').focus();
        })
    }
})

let reqeustEmailChange = () => {
    promiseRunning.value = true;
    disableEmail.value = true;

    skapi.updateProfile({ email: email.value })
        .then(u => {
            // success
            account.value = u;
            disableEmail.value = false;
            changeEmail.value = false;
            promiseRunning.value = false;

        }).catch(err => {
            // error
            disableEmail.value = false;
            promiseRunning.value = false;

            if (err.code === 'AliasExistsException') {
                // email is used by someone else
                nextTick(() => {
                    // nextTick is nessesary when you want to access html element when template re-renders
                    let emailInput = document.getElementById('changeEmail');
                    emailInput.focus();
                    emailInput.setCustomValidity('The E-Mail is already in use.');
                    emailInput.reportValidity();
                })
            }
            else {
                // throw if it's some other error...
                throw err;
            }
        });
}

let sentVerification = [];
let verifyEmail = () => {
    // 해당 이메일로 인증을 보낸적 없을시 인증메일 요청
    if (!sentVerification.includes(account.email)) {
        sentVerification.push(account.email);
        skapi.verifyEmail();
    }
    openVerifyEmail.value = true;
}
</script>

<style lang="less" scoped>
main {
    position: relative;
    margin-top: 68px;
    padding: 0 40px;

    &::before {
        position: absolute;
        content: '';
        left: 0;
        top: 80px;
        // width: 100%;
        width: max(1320px, 100%);
        height: calc(100vh - 208px);
        background-color: #fafafa;
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));
        border-radius: 8px 8px 0 0;
        z-index: -1;
    }

    .container {
        width: 1200px;
        margin: 0 auto;
    }

    .title {
        padding-bottom: 42px;

        h2 {
            display: inline-block;
            font-size: 32px;
            font-weight: 700;
            margin-right: 18px;
        }
    }

    .wrapper {
        width: 100%;
        padding: 60px 0;
        display: flex;
        flex-wrap: nowrap;

        .accountWrap {
            position: relative;
            width: 230px;
            padding-top: 30px;

            &::after {
                position: absolute;
                content: '';
                top: 0;
                right: 0;
                width: 1px;
                height: 100%;
                background: rgba(0, 0, 0, 0.04);
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
            }

            .account {
                color: rgba(0, 0, 0, 0.60);
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 32px;
                cursor: pointer;

                &:last-child {
                    font-size: 16px;
                    font-weight: 500;
                }

                &.active {
                    color: #293FE6;
                }

                &.red {
                    color: #F04E4E;
                }
            }
        }

        .accountCont {
            width: calc(100% - 230px);
            margin-left: 40px;

            .row {
                position: relative;
                padding: 30px 0;

                &::after {
                    position: absolute;
                    content: '';
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 1px;
                    background: rgba(0, 0, 0, 0.04);
                    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
                }

                &:last-child {
                    &::after {
                        display: none;
                    }
                }

                .tit {
                    display: inline-block;
                    vertical-align: middle;
                    min-width: 130px;
                    color: rgba(0, 0, 0, 0.40);
                    font-size: 16px;
                    font-weight: 500;
                }

                .cont {
                    width: calc(100% - 130px);
                    display: inline-block;
                    vertical-align: middle;

                    span {
                        vertical-align: middle;

                        &:first-child {
                            margin-right: 5px;
                        }
                    }

                    .verified {
                        color: rgba(90, 216, 88, 1);
                    }

                    .unVerified {
                        color: rgba(255, 141, 59, 1);
                    }

                    form {
                        display: flex;
                        flex-wrap: nowrap;
                        align-items: center;
                        justify-content: space-between;
                    }

                    input#changeEmail {
                        width: 280px;
                        height: 44px;
                        padding-left: 17px;
                        border-radius: 8px;
                        background-color: rgba(0, 0, 0, 0.05);
                        border: 0;
                        margin-right: 29px;
                        font-size: 16px;
                    }

                    .buttonWrap {
                        button {
                            display: inline-block;
                            height: 32px;
                            padding: 0 12px;
                            border-radius: 8px;
                            font-size: 16px;
                            font-weight: 700;
                            cursor: pointer;

                            &.cancel {
                                border: 2px solid #293FE6;
                                background-color: unset;
                                margin-right: 12px;
                                color: #293FE6;
                            }

                            &.save {
                                border: 0;
                                background: #293FE6;
                                color: #fff;
                            }
                        }
                    }
                }

                .btn {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #293FE6;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                }
            }
        }
    }
}

@media (max-width: 1280px) {
    main {
        .container {
            width: 100%;
        }
    }
}
</style>