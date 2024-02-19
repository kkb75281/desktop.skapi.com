<template lang="pug">
#planCaution 
    .material-symbols-outlined.mid error
    span The service has been deactivated due to the plan cancellation.
    span(@click="goResume" style="font-weight:700; cursor:pointer; margin:0") Please resume the plan
    span in order to activate your service.
    .material-symbols-outlined.big.close(@click="emits('close');") close
    //- router-link(to="/accountSettings") Click here to verify
    //- .click(@click="goVerify") Click here to verify
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

let router = useRouter();
let route = useRoute();
let emits = defineEmits(['close']);

let goResume = () => {
    let srvcId = route.path.split('/')[2];
    router.push("/subscription/" + srvcId)
}
</script>

<style lang="less" scoped>
#planCaution {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.8rem;
    background: #FFE7E8;
    font-size: 0.8rem;
    text-align: center;
    z-index: 99999;

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
    .close {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 2rem;
        color: var(--secondary-text);
        cursor: pointer;
    }
}

@media (max-width: 1280px) {
    #planCaution {
        width: 100%;
    }
}
</style>