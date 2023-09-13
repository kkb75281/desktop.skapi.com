<template lang="pug">
.container
    RouterLink(:to="{name: 'home'}")
        img.logo(src="@/assets/logo.png")
    h5 We are sad to see you go.
    p But hopefully it’s just a while!
    .message 
        | Your account has been deleted, 
        br
        | but you can enable your account anytime within 6 months. 
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
        font-size: 24px;
        font-weight: 700;
        margin-top: 32px;
        margin-bottom: 17px;
    }
    p {
        font-size: 20px;
        font-weight: 500;
        line-height: 20px;
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