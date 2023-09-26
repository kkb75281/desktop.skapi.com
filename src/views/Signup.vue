<template lang="pug">
.container
    RouterLink(to="/")
        img.logo(src="@/assets/img/logo/symbol-logo.png")
    template(v-if="step === 1")
        .title Sign up
        form(@submit.prevent="checkExist")
            .input
                label.label Email 
                input(type="text" 
                :value='form.email' 
                @input="e=> { form.email = e.target.value; }"
                pattern="[a-zA-Z0-9\+]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*" 
                title="Please enter a valid email address." 
                placeholder="Enter your email" 
                required)
            .passwordInput    
                .input
                    label.label Password 
                    input(
                    :type='showPassword ? "text" : "password"'
                    ref="passwordField" 
                    @input="e=> { form.password = e.target.value; e.target.setCustomValidity(''); error = '' }"
                    @change="validatePassword" 
                    placeholder="Create a password" 
                    required)
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        .material-symbols-outlined.sml visibility
                    template(v-else)
                        .material-symbols-outlined.sml visibility_off
            .passwordInput    
                .input
                    label.label Password Confirm 
                    input(
                    :type='showPassword ? "text" : "password"'
                    ref="confirmPasswordField" 
                    @input="e=> { form.password_confirm = e.target.value; e.target.setCustomValidity(''); error = '' }"
                    @change="validatePassword" 
                    placeholder="Confirm the password" 
                    required)
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        .material-symbols-outlined.sml visibility
                    template(v-else)
                        .material-symbols-outlined.sml visibility_off
            .action 
                .customCheckBox
                    input#remember(type="checkbox" @input="(e)=> form.subscribe = e.target.checked" checked)
                    label(for="remember")
                        span I agree to receive newsletters from Skapi via Email.
                        span.material-symbols-outlined.mid.check check
            .material.error(v-if="error")
                .material-symbols-outlined.mid error
                span {{ error }}
            .bottom
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")
                
                template(v-else)
                    .signup 
                        span Have an account?
                        RouterLink(:to="{name: 'login'}") Login
                    button.login Create account
    template(v-if="step >= 2")
        .title Tell us More
        form(@submit.prevent="signup" action="")
            .input 
                label.label What is your role?
                .customSelect
                    select(@change="(e) => form.misc.role = e.target.value" :required="!noMisc")
                        option(value="" :selected="form.misc.role === ''") -- Please select one --
                        option(value="frontend" :selected="form.misc.role === 'frontend'") Frontend Engineer
                        option(value="backend" :selected="form.misc.role === 'backend'") Backend Engineer
                        option(value="fullstack" :selected="form.misc.role === 'fullstack'") Fullstack Engineer
                        option(value="others" :selected="form.misc.role === 'others'") None of the above
                    .material-symbols-outlined.selectArrowDown arrow_drop_down
            .input 
                label.label How many years of experience do you have in dev?
                .customSelect
                    select(@change="(e) => form.misc.experience = e.target.value" :required="!noMisc")
                        option(value="" :selected="form.misc.experience === ''") -- Please select one --
                        option(value="1" :selected="form.misc.experience === '1'") Less than a year
                        option(value="5" :selected="form.misc.experience === '5'") 1 to 5 years
                        option(value="10" :selected="form.misc.experience === '10'") 5 to 10 years
                        option(value="100" :selected="form.misc.experience === '100'") More than 10 years
                    .material-symbols-outlined.selectArrowDown arrow_drop_down
            .input
                .question You are looking for:
                .customCheckBox
                    input#database(type="checkbox" value="database" name="feature" v-model='form.misc.feature')
                    label(for="database")
                        span Database Solutions
                        .material-symbols-outlined.mid.check check
                .customCheckBox
                    input#storage(type="checkbox" value="cloud" name="feature" v-model='form.misc.feature')
                    label(for="storage")
                        span Cloud Storage
                        .material-symbols-outlined.mid.check check
                .customCheckBox
                    input#authentication(type="checkbox" value="authentication" name="feature" v-model='form.misc.feature')
                    label(for="authentication")
                        span Authentication
                        .material-symbols-outlined.mid.check check
            .input
                .question What will you use skapi for?
                .customCheckBox
                    input#hobby(type="checkbox" value="hobby" name="purpose" v-model='form.misc.purpose')
                    label(for="hobby")
                        span Hobby / Learning
                        .material-symbols-outlined.mid.check check
                .customCheckBox
                    input#personal(type="checkbox" value="personal" name="purpose" v-model='form.misc.purpose')
                    label(for="personal")
                        span Personal projects
                        .material-symbols-outlined.mid.check check
                .customCheckBox
                    input#company(type="checkbox" value="company" name="purpose" v-model='form.misc.purpose')
                    label(for="company")
                        span Company projects
                        .material-symbols-outlined.mid.check check
            .material.error(v-if="signupError")
                .material-symbols-outlined.mid error
                span {{ signupError }}
            .bottom
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    button.skip(type="button" @click="skip") Skip
                    button.submit(type="submit") Submit
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { skapi, account } from '@/main.js';

let route = useRoute();
let router = useRouter();
let form = reactive({
    email: '',
    password: '',
    password_confirm: '',
    subscribe: true,
    misc: {
        role: '',
        experience: '',
        feature: [],
        purpose: []
    }
});
let signupError = ref('');
let showPassword = ref(false);
let promiseRunning = ref(false);
let noMisc = ref(false);
let step = ref(1);
let error = ref(null);
let passwordField = ref(null);
let confirmPasswordField = ref(null);

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
onBeforeUnmount(() => {
    document.querySelector('body').classList.remove('fa'); // <- 이게 필요하지 않을까요?
})
let checkExist = ()=>{
    promiseRunning.value = true;
    skapi.login({email: form.email, password: form.password}).then(res => {
        account.value = res;
        router.push({ path: '/dashboard' });
    }).catch(err => {
        if(err.code === 'NOT_EXISTS') {
            step.value++;
        } 
        else if(err.code === 'INCORRECT_USERNAME_OR_PASSWORD' || err.code === 'USER_IS_DISABLED' || err.code === 'SIGNUP_CONFIRMATION_NEEDED') {
            error.value = "This email is already in use";
        }
        else if(err.code === 'REQUEST_EXCEED') {
            error.value = "Too many requests. Please try again later.";
        }
        else {
            error.value = "Something went wrong please try again.";
            throw err;
        }
    }).finally(() => {
        promiseRunning.value = false;
    });
}
let validatePassword = () => {
    if (form.password.length < 6 || form.password.length > 60) {
        passwordField.value.setCustomValidity('Min 6 characters and Max 60 characters');
        passwordField.value.reportValidity();
    } else if (form.password_confirm !== form.password) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        confirmPasswordField.value.reportValidity();
    }
}

let skip = async () => {
    promiseRunning.value = true;
    noMisc.value = true;

    let params = {
        email: form.email,
        password: form.password,
    }
    let options = {
        signup_confirmation: '/success',
        email_subscription: form.subscribe
    }

    skapi.signup(params, options).then(res => {
        router.push({ path: '/confirmation', query: { email: form.email } })
    }).catch(err => {
        promiseRunning.value = false;

        switch (err.code) {
            case 'EXISTS':
                error.value = "This email is already in use";
                step.value = 1;
                break;
            default:
                error.value = "Something went wrong please try again.";
                throw e;
        }
    });
}
let signup = () => {
    noMisc.value = false;
    error.value = '';
    promiseRunning.value = true;
    signupError.value = "";

    if (form.misc.purpose.length && form.misc.feature.length) {
        let params = {
            email: form.email,
            password: form.password,
            misc: JSON.stringify(form.misc)
        }
        let options = {
            signup_confirmation: '/success',
            email_subscription: form.subscribe
        }

        skapi.signup(params, options).then(res => {
            console.log(res);
            router.push({ path: '/confirmation', query: { email: form.email } })
        }).catch(err => {
            console.log(err)
            promiseRunning.value = false;

            switch (err.code) {
                case 'EXISTS':
                    error.value = "This email is already in use";
                    step.value = 1;
                    break;
                default:
                    error.value = "Something went wrong please contact an administrator.";
                    throw e;
            }
        });

    } else {
        promiseRunning.value = false;
        signupError.value = "Please select at least one checkbox from each question above.";
        return false;
    }
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

    form {
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

            select {
                display: block;
                width: 100%;
                height: 44px;
                padding: 0 16px;
                border: 0;
                border-radius: 8px;
                background: rgba(0,0,0,0.05);
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                color: rgba(0, 0, 0, 0.60);
                font-size: 16px;
                font-weight: 500;
            }

            .question {
                color: rgba(0, 0, 0, 0.80);
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 17px;
            }
        }
        .customCheckBox {
            margin-bottom: 14px;
        }

        .action {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;

            a {
                color: #293FE6;
                font-size: 16px;
                font-weight: 400;
                text-decoration: none;
            }
        }
        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 48px;

            .signup {
                font-size: 16px;

                span {
                    font-weight: 500;
                    margin-right: 5px;
                }

                a {
                    text-decoration: none;
                    color: #293FE6;
                    font-weight: 700;
                }
            }

            .login,
            .submit {
                border-radius: 8px;
                background: #293FE6;
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                border: 0;
                padding: 12px 28px;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
            }

            .skip {
                border: 0;
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