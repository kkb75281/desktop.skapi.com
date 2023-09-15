<template lang="pug">
input(type="hidden" :value="tagArray?.join(',')")
.tagContainer(@click="focusEl" :disabled="props.disabled")
    span.tag(v-for="(tag, index) in tagArray" @click.stop="")
        span {{ tag }}
        .material-symbols-outlined.mid(@click="removeTag(index)") close
    .tagInput(v-if="!props.disabled" ref="input" contenteditable="true" tabindex="0" @keydown.enter.space.prevent="addTag" @input="addTag" @keydown.delete="deleteTag" @blur="addTag")  
.material.error(v-if="inputError")
  .material-symbols-outlined.mid error
  span  No special characters are allowed
</template>
<script setup>
import { ref } from 'vue';

let props = defineProps(['value', 'disabled']);
let emits = defineEmits(['change']);
const inputError = ref(false);
let tagArray = ref([]);

if(props.value) {
  tagArray.value = JSON.parse(JSON.stringify(props.value));
}

let input = ref(null);

let focusEl = () => {
  if(!props.disabled) {
    input.value.focus();
  }
}

let tagIsValid = (string) => {
  return !(/[.`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~\[ \]]/.test(string));
}

let addTag = (e) => {
  let string = input.value.innerHTML.replace('&nbsp;', '');

  if(tagIsValid(string)) {
    inputError.value = false;
  } else {    
    inputError.value = true;
  }

  if(e.type === 'input' && e.data !== ' ') return;
  
  if(string && tagIsValid(string)) {
    tagArray.value.push(string);
    input.value.innerHTML = '';
  }
  emits('change', tagArray);
}

let deleteTag = () => {
  let tag = input.value.innerHTML;
  if(tag === '') {
    tagArray.value.pop();
  }

  emits('change', tagArray);
}

let removeTag = (index) => {
  if(props.disabled) return false;
  tagArray.value.splice(index, 1);
  emits('change', tagArray);
}

</script>
<style lang="less" scoped>
.tagContainer {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.80);
    overflow-x: auto;

    &:not([disabled]) {
        cursor: text;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.tag {
    height: 20px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
    margin-right: 8px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;

    svg {
        width: 16px;
        margin-left: 4px;
        cursor: pointer;
    }
}

.tagInput {
  line-height: calc(30px - 6px);
  margin: 3px;
  min-width: 5px;

  &:focus {
    outline: none;
  }
}
</style>