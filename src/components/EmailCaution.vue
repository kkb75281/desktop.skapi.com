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
    background: #FFEEEC;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    .material-symbols-outlined {
        color: rgba(240, 78, 78, 1);
    }
    span {
        color: rgba(240, 78, 78, 1);
        margin: 0 7px;
    }
    a {
        text-decoration: none;
        color: #293FE6;
        font-weight: 700;
    }
}
</style>