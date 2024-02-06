<template lang="pug">
main#accountSetting(v-if='account')
    .titleWrap 
        .inner
            h2 Account Setting
    .container
        .wrapper 
            .accountWrap 
                h5.account.active Account info
                h5.account(:class="{'nonClickable' : !account.email_verified}" @click="!account.email_verified ? false : openDeleteAccount = true") Delete Account
            .accountCont
                .row
                    h6.tit Email
                    .cont 
                        template(v-if="changeEmail")
                            form.modifyInputForm(@submit.prevent="reqeustEmailChange")
                                .customInput
                                    input#changeEmail(type="text" 
                                    :value="email" 
                                    :placeholder="account.email"
                                    :disabled="promiseRunning"
                                    pattern="[a-zA-Z0-9\+]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*" 
                                    title="Please enter a valid email address." 
                                    @input="(e) => {email = e.target.value;}")
                                template(v-if="promiseRunning")
                                    img.loading(src="@/assets/img/loading.png")
                                template(v-else)
                                    .material-symbols-outlined.big.save(type="submit") done
                                    .material-symbols-outlined.sml.cancel(@click="changeEmail = false;") close
                        template(v-else) 
                            img(v-if="account.approved.includes('ggl')" src="@/assets/img/icon/google.svg" style="display:inline-block;width:24px;height:24px;vertical-align:middle;margin-right:5px;")
                            span {{ account.email }}
                    .btn(v-if="!changeEmail && !account.approved.includes('ggl')" @click="email=account.email; changeEmail = true;") Change email
                    .btnIcon(v-if="!changeEmail && !account.approved.includes('ggl')" @click="email=account.email; changeEmail = true;")
                        .material-symbols-outlined.mid.clickable edit
                .row
                    h6.tit Verify Email
                    .cont
                        .material.verified(v-if="account.email_verified")
                            .material-symbols-outlined.sml check_circle
                            span Verified
                        .material(v-else)
                            .material-symbols-outlined.sml error
                            span Unverified
                    .btn(v-if="!account.email_verified" @click="verifyEmail") Verify email
                    .btnIcon(v-if="!account.email_verified" @click="verifyEmail")
                        .material-symbols-outlined.mid.clickable send
                .row
                    h6.tit Subscription
                    .cont 
                        .customCheckBox(:class="{'nonClickable' : !account.email_verified}" :style='{opacity: disableNewsletterCheckbox ? ".5" : "1"}')
                            input#subscribeCheckbox(
                                type="checkbox"
                                v-model='newsletterSubscribed'
                                :disabled="disableNewsletterCheckbox"
                            )
                            label(for="subscribeCheckbox")
                                span Subscribe to Skapi newsletter
                                .material-symbols-outlined.mid.check(:style="{cursor: disableNewsletterCheckbox ? 'default' : null }") check
                .row(v-if="!account.approved.includes('ggl')")
                    h6.tit Password
                    .cont(v-if='passwordChanged')
                        .material.verified
                            .material-symbols-outlined.sml check_circle
                            span Password successfully changed
                    .btn(:class="{'nonClickable' : !account.email_verified}" @click="!account.email_verified ? false : openChangePassword = true;") Change Password
                    .btnIcon(:class="{'nonClickable' : !account.email_verified}" @click="!account.email_verified ? false : openChangePassword = true;")
                        .material-symbols-outlined.mid.clickable lock_reset
                .row.delete 
                    h6.tit Delete Account
                    .btnIcon(:class="{'nonClickable' : !account.email_verified}" @click="!account.email_verified ? false : openDeleteAccount = true")
                        .material-symbols-outlined.mid.clickable delete
ChangePassword(v-if="openChangePassword" @close="(e)=>{ if (e === 'success') { passwordChanged = true } openChangePassword=false; }")
VerifyEmail(v-if="openVerifyEmail" @close="openVerifyEmail=false;")
DeleteAccount(v-if="openDeleteAccount" @close="openDeleteAccount=false")
</template>

<script setup>
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import { skapi, account } from '@/main.js';
import ChangePassword from '@/components/ChangePassword.vue';
import VerifyEmail from '@/components/VerifyEmail.vue';
import DeleteAccount from '@/components/DeleteAccount.vue';

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
        .then(async(u) => {
            // success
            account.value = u;
            await nextTick(() => {
                disableEmail.value = false;
                changeEmail.value = false;
                promiseRunning.value = false;
            })

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
#accountSetting {
    position: relative;
    margin-top: 3.4rem;

    .customCheckBox label {
        width: 100%;
        height: 20px;
    }

    .titleWrap {
        padding: 0 2rem;
        .inner {
            max-width: 1200px;
            margin: 0 auto;
            padding-bottom: 2.1rem;
    
            h2 {
                display: inline-block;
                font-weight: 700;
            }
        }
    }

    .container {
        min-height: calc(100vh - 10.1rem);
        padding: 2rem;
        background-color: #fafafa;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);
        border-radius: 8px;
    }

    .wrapper {
        max-width: 1200px;
        margin: 0 auto;
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
            margin-left: 2rem;

            .row {
                position: relative;
                padding: 1.5rem 0;

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

                &.delete {
                    display: none;
                }

                .tit {
                    display: inline-block;
                    vertical-align: middle;
                    min-width: 130px;
                    color: rgba(0, 0, 0, 0.40);
                    font-weight: 500;
                }

                .cont {
                    width: calc(100% - 130px);
                    display: inline-block;
                    vertical-align: middle;

                    span {
                        font-size: 0.8rem;
                        vertical-align: middle;

                        &:first-child {
                            margin-right: 5px;
                        }
                    }

                    .material {
                        color: rgba(255, 141, 59, 1);

                        &.verified {
                            color: rgba(90, 216, 88, 1);
                        }
                        .material-symbols-outlined {
                            font-size: 24px;
                            margin-right: 5px;
                        }
                    }
                }

                .btn, .btnIcon {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 0.8rem;
                    font-weight: 700;
                    cursor: pointer;
                }

                .btn {
                    color: #293FE6;
                }

                .btnIcon {
                    display: none;
                }
            }
        }
    }
}

@media (max-width: 1023px) {
    .modifyInputForm {
        .customInput {
            max-width: unset;
        }
    }
    #accountSetting {
        .wrapper {
            .accountCont {
                .row {
                    .cont {
                        width: 100%;
                        display: block;
                        margin-top: 1rem;
                    }
                }
            }
        }
    }
}
@media (max-width: 767px) {
    #accountSetting {
        .container {
            margin: 0 20px 20px 20px;
        }
        .wrapper {
            .accountWrap {
                display: none;
            }
            .accountCont {
                width: 100%;
                margin: 0;

                .row {
                    &:first-child {
                        padding-top: 0;
                    }
                    &.delete {
                        display: block;
                    }
                    .btn {
                        display: none;
                    }

                    .btnIcon {
                        display: block;
                    }
                }
            }
        }
    }
}
</style>