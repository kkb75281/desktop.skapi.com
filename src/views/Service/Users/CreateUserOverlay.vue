<template lang="pug">
#createUser(@click="emits('close')")
    .wrap(@click.stop)
        .title Create User
        form(@submit.prevent="createUser")
            p Create a new user for testing purpose. The given email and password can be used to login to your service. The email will also be used for "name" attribute.
            br
            br
            input(hidden name="service" :value="currentService.service")
            .input
                label.label Email 
                input(
                    type="email" 
                    name="email"
                    @input="e=>email = e.target.value"
                    pattern="[a-zA-Z0-9\+]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*" 
                    title="Please enter a valid email address." 
                    placeholder="anonymous@anonymous.com" 
                    required
                )
            .passwordInput    
                .input
                    label.label Password 
                    input(
                        :type='showPassword ? "text" : "password"'
                        name="password"
                        @input="e=>password = e.target.value"
                        minlength="6"
                        maxlength="60"
                        placeholder="Create a password" 
                        required
                    )
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        .material-symbols-outlined.sml visibility
                    template(v-else)
                        .material-symbols-outlined.sml visibility_off
            .material.error(v-if="error")
                .material-symbols-outlined.mid error
                span {{ error }}
            .bottom
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")

                template(v-else)
                    button.cancel(type="button" @click="emits('close')") Cancel
                    button.login Create User
</template>

<script setup>
import { ref } from 'vue';
import { currentService } from '@/data.js';
import { skapi } from '@/main.js'

let emits = defineEmits(['close']);
let showPassword = ref(false);
let error = ref('');
let promiseRunning = ref(false);
let email = '';
let password = '';


let createUser = () => {
    promiseRunning.value = true;
    error.value = '';
    skapi.signup({
        email,
        // password,
        access_group: 2,
        service: currentService.value.service
    }, {
        signup_confirmation: '/hello',
    }).then((res) => {
        promiseRunning.value = false;
        emits('close', res);
    }).catch((err) => {
        promiseRunning.value = false;
        error.value = err.message;
    });
}
</script>

<style lang="less" scoped>
#createUser {
    position: fixed;
    overflow: auto;
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

    .title {
        position: relative;
        color: rgba(0, 0, 0, 0.80);
        font-size: 28px;
        font-weight: 700;
        padding: 28px 0;
        // margin-bottom: 32px;
        padding: 28px;

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

    form {
        padding: 28px;

        .input {
            margin-bottom: 16px;

            .label {
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

        .bottom {
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 48px;

            .cancel {
                border: 0;
                background-color: unset;
                color: #293FE6;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
            }

            .login {
                padding: 0 28px;
                height: 100%;
                border-radius: 8px;
                border: 2px solid #293FE6;
                background-color: unset;
                color: #293FE6;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
            }
        }
    }
}
</style>