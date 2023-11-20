<template lang="pug">
input(type="hidden" :value="tagArray?.join(',')")
.tagContainer(:class="{'tagEdit' : editTagsData}" @click="focusEl" :disabled="props.disabled")
    span.tag(v-for="(tag, index) in tagArray" @click.stop="")
        span {{ tag }}
        .material-symbols-outlined.sml.cancel(@click="removeTag(index)") cancel
    .tagInput(v-if="!props.disabled" ref="input" contenteditable="true" tabindex="0" @keydown.enter.space.prevent="addTag" @input="addTag" @keydown.delete="deleteTag" @blur="addTag")  
.error(v-if="inputError")
  .material-symbols-outlined.mid error
  span  No special characters are allowed
</template>
<script setup>
import { nextTick, onMounted, ref } from 'vue';

let props = defineProps(['value', 'disabled', 'editTagsData']);
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
  if (/[\[\]\\^_`]/.test(string)) {
    return string;
  }

  return !(/[.`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~\[ \]]/.test(string));
}
onMounted(() => {
    input.value.focus();
})
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
  emits('change', tagArray.value);

    nextTick(() => {
        let scrollTarget = document.querySelector('.tagContainer');
        if(scrollTarget.getBoundingClientRect().width < scrollTarget.scrollWidth) {
            scrollTarget.scrollLeft = scrollTarget.scrollWidth;
        }
    })
}

let deleteTag = () => {
  let tag = input.value.innerHTML;
  if(tag === '') {
    tagArray.value.pop();
  }

  emits('change', tagArray.value);
}

let removeTag = (index) => {
  if(props.disabled) return false;
  tagArray.value.splice(index, 1);
  emits('change', tagArray.value);
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
    font-size: 0.7rem;

    &:not([disabled]) {
        cursor: text;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &.tagEdit {
        max-height: calc(100vh*0.5);
        border: 0;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.05);
        padding: 12px;
        flex-wrap: wrap;

        .tag {
            margin: 3px;
        }
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
    font-size: 0.7rem;
    font-weight: 400;

    .cancel {
        font-size: 15px;
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