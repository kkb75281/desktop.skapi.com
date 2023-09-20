<template lang="pug">
.container
    RouterLink(:to="{name: 'home'}")
        img.logo(src="@/assets/img/logo/logo.png")
    h5 Congratulations!
    .message 
        | Thanks for joining!
        br
        | Your email has been confirmed. You can now login to Skapi.
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
    h5 {
        color: #293FE6;
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
        border: 2px solid #293FE6;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        color: #293FE6;
        text-decoration: none;
        user-select: none;
        cursor: pointer;
    }
}
</style>