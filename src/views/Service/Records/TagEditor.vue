<template lang="pug">
#overlayWindow.recordData(style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        // edit
        header
            h5.title Tags
        main
            .content 
                TagsInput(:editTagsData = "true" :value='dataCopy' @change='e=>dataCopy=e')
                br
                br
                .buttonWrap 
                    button.cancel(@click="emits('close')") Cancel
                    button.save(@click='()=>{save(); emits("close")}') Save

</template>

<script setup>
import TagsInput from '@/components/TagsInput.vue';

let { tags } = defineProps(['tags']);

let dataCopy = tags ? JSON.parse(JSON.stringify(tags)) : null;

let emits = defineEmits(['close']);

let save = ()=>{
    // remove all items in tags
    tags.splice(0, tags.length);
    // add all items in dataCopy
    dataCopy.forEach((item) => {
        tags.push(item);
    })
}
</script>