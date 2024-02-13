<template lang="pug">
dialog#deleteAccountDialog(@click="closeDialog")
    .header Delete Your Account
    .content
        template(v-if="step === 1")
            form(@submit.prevent="step++" action="")
                p Are you sure you want to delete your account permanently? 
                .warning Warning : this cannot be undone.
                .customCheckBox(style="margin-bottom: 16px;")
                    input#understand(type="checkbox" value="understand" name="understand")
                    label(for="understand")
                        span I acknowledge that:
                        span.material-symbols-outlined.mid.check check
                .point All the services will be permanently deleted
                .point All the information will be permanently deleted
                //- .error(v-if="acknowledgError")
                //-     .material-symbols-outlined.mid error
                //-     span {{ acknowledgError }}
                .buttonWrap.block
                    button.yes(@click="handleDeleteAccount") Yes, delete my account
                    button.no No, keep my account
        template(v-if="step === 2")
            form(@submit.prevent="step++" action="")
                p Before you disable your account, can you tell us why you’re leaving?
                .customCheckBox
                    input#database(type="checkbox" value="I don’t find it useful" name="reason")
                    label(for="database")
                        span I don’t find it useful
                        span.material-symbols-outlined.mid.check check
                .customCheckBox
                    input#storage(type="checkbox" value="I don’t understand how it works" name="reason")
                    label(for="storage")
                        span I don’t understand how it works
                        span.material-symbols-outlined.mid.check check
                .customCheckBox
                    input#authentication(type="checkbox" value="It’s not easy to use" name="reason")
                    label(for="authentication")
                        span It’s not easy to use
                        span.material-symbols-outlined.mid.check check
                .customCheckBox
                    input#authentication(type="checkbox" value="I have safety concerns" name="reason")
                    label(for="authentication")
                        span I have safety concerns
                        span.material-symbols-outlined.mid.check check
                .input(style="margin-top: 28px;")
                    label.normal Please list any other reasons why you might be leaving :
                    input(type="text"
                    :value='reasonText' 
                    @input="e=> { reasonText = e.target.value; }")
                //- .error(v-if="reasonError")
                //-     .material-symbols-outlined.mid error
                //-     span {{ reasonError }}
                .buttonWrap 
                    button.cancel(@click="closeDialog") Cancel
                    button.save Submit
        template(v-if="step >= 3")
            form(@submit.prevent="deleteAccount" action="")
                p In order to delete the account, Please enter password.
                .input
                    label Enter Password
                    input(type="text" 
                    :value='password' 
                    @input="e=> { password = e.target.value; }" 
                    placeholder="password" 
                    required)
                .buttonWrap 
                    button.cancel(@click="closeDialog") Cancel
                    button.save Delete
        .navigator(v-if="step <= 3")
            .ball(v-for="num in 3" @click="() => { num < step ? step = num : null; currentPassword=''; password = '';  passwordConfirm = '';}" :class="{'active': step === num}")
</template>
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router';

let router = useRouter();
let password = '';
let reasonText = '';
let step = ref(1);
let acknowledgeError = ref(null); // You must acknowledge the this in order to proceed
let reasonError = ref(null); // You must choose one of the optionss

let props = defineProps(['info']);
const info = ref(props.info);

step.value = 1;

let closeDialog = (e) => {
    console.log(e.target)
    let deleteAccountDialog = document.getElementById('deleteAccountDialog');
    let rect = e.target.getBoundingClientRect();

    if (rect.left > e.clientX || rect.right < e.clientX || rect.top > e.clientY || rect.bottom < e.clientY || e.target.classList.contains('cancel') || e.target.classList.contains('no')) {
        deleteAccountDialog.close();
        // info.value = true;
    }
}
let handleDeleteAccount = () => {
    if (understand.value) {
        step.value = 2;
        acknowledgeError.value = '';
    } else {
        acknowledgeError.value = 'You must acknowledge this in order to proceed';
    }
}
let deleteAccount = () => {

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
            margin-top: 32px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            &.block {
                display: block;
                button {
                    display: block;
                    margin: 0 auto;
                }
            }
            button {
                background-color: unset;
                color: var(--main-color);
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
                    border: 2px solid var(--main-color);
                }
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
    }
}
</style>