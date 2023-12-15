<template lang="pug">
#overlayWindow.dialogBackground(@click="closeDialog" @mousedown="pendClose = true" style='--max-width: 480px;')
    .overlayWrap(@mousedown.stop @mouseup='pendClose = false')
        header
            h5.title Create User
        main
            .content
                form(@submit.prevent="createUser")
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
                        label.label Password 
                        input(
                            @input="e => password = e.target.value"
                            placeholder="User's Password"
                            type='Password'
                            minlength="6"
                            required
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
                            button.cancel(type="button" @click="emits('close')") Cancel
                            button.save Create User
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
let password = '';
let pendClose = false;

let closeDialog = () => {
    if (!promiseRunning.value && pendClose) {
        emits('close');
    }
    pendClose = false;
}

let createUser = () => {
    promiseRunning.value = true;
    error.value = '';
    skapi.signup({
        email,
        name,
        password,
        service: currentService.value.service
    }).then((res) => {
        console.log(res)
        promiseRunning.value = false;
        emits('close', res);
    }).catch((err) => {
        promiseRunning.value = false;
        error.value = err.message;
    });
}
</script>