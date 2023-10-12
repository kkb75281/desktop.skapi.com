<template lang="pug">
#emailCaution 
    .material-symbols-outlined.mid error
    span In order to able the service, verification is necessary. 
    router-link(to="/accountSettings") Click here to verify
</template>

<script setup>

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
    a {
        text-decoration: none;
        color: rgba(240, 78, 78, 1);
        font-weight: 700;
    }
}

@media (max-width: 1280px) {
    #emailCaution {
        width: 100%;
    }
}
</style>