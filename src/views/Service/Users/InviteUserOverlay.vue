<template lang="pug">
#overlayWindow.dialogBackground(@click="closeDialog" @mousedown="pendClose = true" style='--max-width: 480px;')
    .overlayWrap(@mousedown.stop @mouseup='pendClose = false')
        header
            h5.title Invite User
        main
            .content
                form(@submit.prevent="createUser")
                    p Invitation Email includes a temporary password and the acception link.
                    p User must accept the invitation within 7 days.

                    br

                    p For more information, refer:&nbsp;
                        a(href="https://docs.skapi.com/email/email-templates.html" target="_blank" style='white-space: nowrap') E-Mail Templates

                    br
                    br

                    input(hidden name="service" :value="currentService.service")

                    .input
                        label.label User's Email 
                        input(
                            type="email"
                            @input="e => email = e.target.value"
                            title="Please enter a valid email address." 
                            placeholder="anonymous@anonymous.com"
                            required
                        )
                    br

                    .input
                        label.label Name 
                        input(
                            @input="e => name = e.target.value"
                            placeholder="User's Name" 
                            required
                        )

                    br

                    .input
                        label.label Redirect URL 
                        input(
                            @input="e => redirect = e.target.value"
                            placeholder="URL to redirect when accepted. (optional)"
                            type='url'
                        )

                    .error(v-if="error")
                        .material-symbols-outlined.mid error
                        span {{ error }}

                    br
                    br

                    .buttonWrap
                        template(v-if="promiseRunning")
                            img.loading(src="@/assets/img/loading.png")

                        template(v-else)
                            button.noLine(type="button" @click="emits('close')") Cancel
                            button.final Create User
</template>

<script setup>
import { ref } from 'vue';
import { currentService } from '@/data.js';
import { skapi } from '@/main.js'

let emits = defineEmits(['close']);
let error = ref('');
let promiseRunning = ref(false);
let email = '';
let name = '';
let redirect = '';
let pendClose = false;

let closeDialog = () => {
    if (!promiseRunning.value && pendClose) {
        emits('close', false);
    }
    pendClose = false;
}

let createUser = () => {
    promiseRunning.value = true;
    error.value = '';
    skapi.signup({
        email,
        name,
        access_group: 1,
        service: currentService.value.service
    }, {
        signup_confirmation: redirect || false
    }).then((res) => {
        promiseRunning.value = false;
        emits('close', true);
    }).catch((err) => {
        if (err.code === 'EXISTS') {
            skapi.resendInvitation({
                redirect: redirect || '',
                email,
                service: currentService.value.service
            }).then(() => {
                promiseRunning.value = false;
                emits('close', 'resent');
            }).catch((err) => {
                promiseRunning.value = false;
                error.value = err.message;
            });
        }
        else {
            promiseRunning.value = false;
            error.value = err.message;
        }
    });
}
</script>