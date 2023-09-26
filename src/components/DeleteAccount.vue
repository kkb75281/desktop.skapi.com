<template lang="pug">
#deleteAccount(@click="closeWindow")
    .wrap(@click.stop)
        .header Delete Your Account
        .content
            template(v-if="step === 1")
                form(@submit.prevent="acknowledgeCheck")
                    p Are you sure you want to delete your account permanently? 
                    .warning Warning : this cannot be undone.
                    .customCheckBox(style="margin-bottom: 16px;")
                        input#understand(type="checkbox")
                        label(for="understand")
                            span I acknowledge that:
                            span.material-symbols-outlined.mid.check check
                    .point All the services will be permanently deleted
                    .point All the information will be permanently deleted
                    .material.error(v-if="acknowledgeError")
                        .material-symbols-outlined.mid error
                        span {{ acknowledgeError }}
                    .buttonWrap.block
                        button.yes(type="submit") Yes, delete my account
                        button.no(type="button" @click="emits('close')") No, keep my account
            template(v-if="step === 2")
                form(@submit.prevent="reasonCheck" action="")
                    p Please tell us why you’re leaving :
                    .customCheckBox
                        input#unUseful(type="checkbox" value="not_userful" v-model="reasons")
                        label(for="unUseful")
                            span I don’t find it useful for my project
                            span.material-symbols-outlined.mid.check check
                    .customCheckBox
                        input#hard(type="checkbox" value="hard_to_use" v-model="reasons")
                        label(for="hard")
                            span It’s not easy to use
                            span.material-symbols-outlined.mid.check check
                    .customCheckBox
                        input#safety(type="checkbox" value="security_issue" v-model="reasons")
                        label(for="safety")
                            span I have security concerns
                            span.material-symbols-outlined.mid.check check
                    .input(style="margin-top: 28px;")
                        label.normal Other reasons why you might be leaving :
                        input(type="text"
                        @input="e=> { reasonText = e.target.value; }")
                    .material.error(v-if="reasonError")
                        .material-symbols-outlined.mid error
                        span {{ reasonError }}
                    .buttonWrap 
                        button.cancel(type="button" @click="emits('close')") Cancel
                        button.save(type="submit") Submit
            template(v-if="step >= 3")
                form(@submit.prevent="deleteAccount" action="")
                    p Please enter your password.
                    .input
                        label Enter Password
                        input(type="password"
                        @input="e=> { password = e.target.value; }" 
                        placeholder="Password" 
                        required)
                    .material.error(v-if="disableError")
                        .material-symbols-outlined.mid error
                        span {{ disableError }}
                    .buttonWrap(:class="{'running' : promiseRunning}")
                        template(v-if="promiseRunning")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            button.cancel(type="button" @click="closeWindow") Cancel
                            button.save(type="submit") Delete
            .navigator(v-if="step <= 3")
                .ball(v-for="num in 3" @click="() => { num < step ? step = num : null; password = ''; }" :class="{'active': step === num}")
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { account, skapi } from "../main";

let emits = defineEmits(['close']);
let router = useRouter();
let password = '';
let reasonText = ref('');
let step = ref(1);
let acknowledgeError = ref(null); // You must acknowledge the this in order to proceed
let reasonError = ref(null); // You must choose one of the optionss
let disableError = ref(null); // auth, disable failed
let reasons = ref([]);
let loginFailed = false;
let promiseRunning = ref(false);

let acknowledgeCheck = () => {
    let understand = document.getElementById('understand');
    if (understand.checked) {
        acknowledgeError.value = '';
        step.value = 2;
    } else {
        acknowledgeError.value = 'You must acknowledge this in order to proceed';
    }
}

let reasonCheck = () => {
    if (reasons.value.length > 0 || reasonText.value !== '') {
        reasonError.value = ''
        step.value = 3;
    } else {
        reasonError.value = 'You must choose one of the optionss'
    }
}

let deleteAccount = async () => {
    promiseRunning.value = true;
    try {
        await skapi.login({
            email: account.value.email,
            password: password
        });

        loginFailed = false;

        await skapi.postRecord({
            reason: reasonText.value || '',
        }, {
            readonly: true,
            table: {
                name: 'delete_account',
                access_group: 1
            },
            tags: reasons.value,
        });

        await skapi.disableAccount();

        router.push({ path: '/bye' });
    }
    catch (err) {
        if (err.code === 'INCORRECT_USERNAME_OR_PASSWORD') {
            loginFailed = true;
            disableError.value = 'Incorrect password';
        }
        else {
            disableError.value = err.message;
        }
    }
    finally {
        promiseRunning.value = false;
    }
}

let closeWindow = () => {
    // login 이 실패하면 닫는순간 로그아웃됩니다
    if (loginFailed) {
        return skapi.logout().then(_ => account.value = null)
    }

    emits('close');
}

</script>
<style lang="less" scoped>
#deleteAccount {
    position: fixed;
    overflow: auto; // 높이가 작을때 스크롤이 생기도록
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(26, 26, 26, 0.25);
    z-index: 99999;
}

.customCheckBox {
    margin-bottom: 12px;
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
        color: rgba(240, 78, 78, 1);
        font-size: 24px;
        font-weight: 700;

        .editWrap {
            cursor: pointer;
        }
    }

    .content {
        padding: 28px;

        p {
            color: rgba(0, 0, 0, 0.60);
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            margin-bottom: 48px;
        }

        .warning {
            margin-bottom: 30px;
            color: rgba(0, 0, 0, 0.60);
            font-size: 16px;
            font-weight: 700;
        }

        .point {
            position: relative;
            color: rgba(0, 0, 0, 0.60);
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 4px;
            margin-left: 8px;

            &::after {
                position: absolute;
                content: '';
                left: -8px;
                top: 50%;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                transform: translateY(-50%);
                background-color: rgba(0, 0, 0, 0.60);
                // z-index: 3;
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

                &.normal {
                    font-weight: 400;
                }
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
            margin-top: 52px;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;

            &.running {
                height: 44px;
            }
            &.block {
                display: block;

                button {
                    display: block;
                    margin: 0 auto;
                }
            }

            button {
                background-color: unset;
                color: #293FE6;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;

                &.yes {
                    border: 0;
                    margin-bottom: 24px;
                }

                &.no {
                    padding: 0 28px;
                    height: 44px;
                    border-radius: 8px;
                    border: 2px solid #293FE6;
                }

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