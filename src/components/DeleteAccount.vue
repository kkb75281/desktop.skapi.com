<template lang="pug">
#overlayWindow.deleteAccount(@click="closeWindow" style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        header
            h5.title.red Delete Your Account
        main
            .content
                template(v-if="step === 1")
                    form(@submit.prevent="acknowledgeCheck")
                        p Are you sure you want to delete your account permanently? 
                        br
                        br
                        p.warning Warning : this cannot be undone.
                        br
                        .customCheckBox
                            input#understand(type="checkbox")
                            label(for="understand")
                                span I acknowledge that:
                                span.material-symbols-outlined.mid.check check
                        br
                        ul.pointWrap 
                            li All the services will be permanently deleted
                            li All the information will be permanently deleted
                        .error(v-if="acknowledgeError")
                            .material-symbols-outlined.mid error
                            span {{ acknowledgeError }}
                        br
                        br
                        .buttonWrap.block
                            button.no(type="button" @click="emits('close')") No, keep my account
                            button.yes(type="submit") Yes, delete my account
                        br
                template(v-if="step === 2")
                    form.reasonForm(@submit.prevent="reasonCheck" action="")
                        p Please tell us why you’re leaving :
                        br
                        br
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
                        br
                        br
                        .input
                            label.normal Other reasons why you might be leaving :
                            input(type="text"
                            @input="e=> { reasonText = e.target.value; }")
                        .error(v-if="reasonError")
                            .material-symbols-outlined.mid error
                            span {{ reasonError }}
                        br
                        br
                        .buttonWrap 
                            button.cancel(type="button" @click="emits('close')") Cancel
                            button.save(type="submit") Submit
                template(v-if="step >= 3")
                    form(@submit.prevent="deleteAccount" action="")
                        p Please enter your password.
                        br
                        br
                        .input
                            label Enter Password
                            input(type="password"
                            @input="e=> { password = e.target.value; }" 
                            placeholder="Password" 
                            required)
                        .error(v-if="disableError")
                            .material-symbols-outlined.mid error
                            span {{ disableError }}
                        br
                        br
                        .buttonWrap(:class="{'running' : promiseRunning}")
                            template(v-if="promiseRunning")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button.cancel(type="button" @click="closeWindow") Cancel
                                button.save(type="submit") Delete
                br
                .navigator(v-if="step <= 3" :class="{'nonClickable' : promiseRunning}")
                    .ball(v-for="num in 3" @click="() => { num < step ? step = num : null; password = ''; }" :class="{'active': step === num}")
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { account, skapi } from "@/main";

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
.pointWrap {
    margin-left: 1rem;
    line-height: 1.5;

    li {
        font-size: 0.8rem;
        color: rgba(0, 0, 0, 0.60);
    }
}

.reasonForm {
    .customCheckBox {
        margin-bottom: 0.5rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>