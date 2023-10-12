<template lang="pug">
#emailCaution 
    .material-symbols-outlined.mid error
    span In order to able the service, verification is necessary. 
    router-link(to="/accountSettings") Click here to verify
    //- .click(@click="goVerify") Click here to verify
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

let router = useRouter();

// let goVerify = () => {
//     let currentHref = window.location.href.split('/').slice(-1)[0];

//     if(currentHref == 'accountSettings') {
//         // emits('showVerifyEmail');
//     } else {
//         router.replace({ path: '/accountSettings' });
//         console.log('ddddsdsdsd')
//     }
// }
</script>

<style lang="less" scoped>
#emailCaution {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFE7E8;

    .material-symbols-outlined {
        color: rgba(240, 78, 78, 1);
    }
    span {
        color: rgba(240, 78, 78, 1);
        margin: 0 7px;
    }
    a, .click {
        text-decoration: none;
        color: rgba(240, 78, 78, 1);
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