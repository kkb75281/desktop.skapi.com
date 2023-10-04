<template lang="pug">
#localeSelector(@click.stop)
    .wrap
        .country(v-for="(c, key) in Countries" @click="handleCountryClick(key)") 
            span.flag {{ c.flag }}
            .name {{ key }} - {{ c.name }}
</template>
<script setup>
import Countries from '@/skapi-extensions/js/countries.js';
// import "/node_modules/flag-icons/css/flag-icons.min.css";
// const props = defineProps(['goto'])
const emit = defineEmits(['countryClicked']);
const handleCountryClick = (key) => {
  emit('countryClicked', key);
};
</script>
<style lang="less" scoped>
#localeSelector {
    width: 360px;
    height: 276px;
    overflow: hidden;
    padding: 20px 40px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);

    .wrap {
        height: 100%;
        overflow: scroll;
    }

  .country {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    font-size: 16px;
    cursor: pointer;

    .name {
      flex: 0.95;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>