<template lang="pug">
#changeSuccess(v-if="showSuccess")
    .wrap 
        .material-symbols-outlined check_circle 
        h4 New Password Success
        .message 
            | Your password has been changed successfully.
            br
            | Please login with new password.
        router-link(to="/login") Login
</template>
<script setup>
import { ref } from "vue";
// import { useRouter, useRoute } from 'vue-router';

// let route = useRoute();
let props = defineProps(['showSuccess']);
</script>
<style lang="less" scoped>
#changeSuccess {
    top: 0;
    left: 0;
    overflow: auto;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(26, 26, 26, 0.25);
}

.wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 376px;
    padding: 28px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);

    .material-symbols-outlined {
        width: 56px;
        height: 56px;
        color: rgba(90, 216, 88, 1);
        margin-bottom: 20px;
    }

    h4 {
        display: block;
        color: #293FE6;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 36px;
    }

    .message {
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        margin-bottom: 56px;
    }

    a {
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
        cursor: pointer;
    }
}</style>