<template lang="pug">
.container
    RouterLink(:to="{name: 'home'}")
        img.logo(src="@/assets/img/logo/logo.png")
    .material-symbols-outlined.big.check check_circle
    h5 Congratulations!
    .message 
        | Thanks for joining!
        br
        | Your email has been confirmed. You can now login to Skapi.
    .message.br
        | Thanks for joining!
        br
        | Your email has been confirmed.
        br
        | You can now login to Skapi.
    router-link.login(to="/login") Login
</template>

<script setup>

</script>

<style lang="less" scoped>
.container {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 440px;
    text-align: center;
    transform: translate(-50%, -50%);

    .logo {
        width: 197px;
    }
    .check {
        display: none;
    }
    h5 {
        color: var(--main-color);
        font-size: 20px;
        font-weight: 700;
        margin-top: 32px;
    }
    .message {
        margin-top: 40px;
        margin-bottom: 52px;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;

        &.br {
            display: none;
        }
    }
    .login {
        margin: 0 auto;
        width: 104px;
        height: 44px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: 2px solid var(--main-color);
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        color: var(--main-color);
        text-decoration: none;
        cursor: pointer;
    }
}

@media (max-width: 480px) {
    .container {
        position: relative;
        width: 100%;
        margin: 0 auto;
        padding: 20px;
        left: unset;
        top: unset;
        transform: unset;

        .logo {
            width: 81px;
            margin-bottom: 140px;
        }
        .check {
            display: block;
            font-size: 68px;
            color: rgba(90, 216, 88, 1);
        }
        h5 {
            margin-top: 20px;
        }
        .message {
            display: none;

            &.br {
                display: block;
                margin-top: 36px;
            }
        }
        .login {
            width: 100%;
        }
    }
}
</style>