<template lang="pug">
#emailCaution 
    .material-symbols-outlined.mid error
    span Skapi will not be functional unless your email is verified. 
    //- router-link(to="/accountSettings") Click here to verify
    .click(@click="goVerify") Click here to verify
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

let router = useRouter();
let emits = defineEmits(['showVerifyEmail']);

let goVerify = () => {
    let currentHref = window.location.href.split('/').slice(-1)[0];

    if(currentHref == 'accountSettings') {
        emits('showVerifyEmail');
    } else {
        router.replace({ path: '/accountSettings' });
    }
}
</script>

<style lang="less" scoped>
#emailCaution {
    width: 100%;
    padding: 0.8rem;
    background: #FFE7E8;
    font-size: 0.8rem;
    text-align: center;

    > * {
        display: inline-block;
        color: rgba(240, 78, 78, 1);
    }
    span {
        margin: 0 7px;
    }
    a, .click {
        text-decoration: none;
        font-weight: 700;
        cursor: pointer;
    }
}

@media (max-width: 1280px) {
    #emailCaution {
        width: 100%;
    }
}
</style>