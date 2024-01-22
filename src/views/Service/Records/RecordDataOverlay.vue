<template lang="pug">
#overlayWindow.recordData(@click="()=>{if(!editSelectedData) emits('close')}" style='--max-width: 580px;')
    .overlayWrap(@click.stop)
        template(v-if="editSelectedData")
            // edit
            header 
                h6.title(v-if='dataCopy.tags') Tags
                h6.title(v-else) {{ dataCopy.type }} - {{ dataCopy.key }}
            main
                .content 
                    textarea#editData(:value='dataCopy.context' @input='inputData' spellcheck="false" :style='displayFontType()')
                    .error(v-if="error")
                        .material-symbols-outlined.mid error
                        span {{ error }}
                    .buttonWrap 
                        button.noLine(@click="emits('close')") Cancel
                        button.final(@click='()=>{if(error) return; emits("save", dataCopy);}') Save

        template(v-else)
            // view
            header 
                h6.title {{ selectedData.type }} - {{ selectedData.key }}

                // i don't see the need below...
                //- .editWrap(v-if="selectedData.type == 'json'" @click="edit")
                //-     .material-symbols-outlined.mid edit
                //-     span edit
            main
                .content(:style='displayFontType()') 
                    p(style="word-wrap: break-word;") {{ selectedData.context }}

</template>

<script setup>
import { onMounted, ref } from 'vue';

let { selectedData } = defineProps(['selectedData']);

let editSelectedData = selectedData?.edit;
let dataCopy = editSelectedData ? JSON.parse(JSON.stringify(selectedData)) : null;
let error = ref('');

let emits = defineEmits(['close', 'save']);

let displayFontType = () => {
    switch (selectedData.type) {
        case 'json':
            return { 'font-family': 'monospace', 'white-space': 'pre', 'overflow-x': 'auto' };
        default:
            return null;
    }
}

let heightControl = (e) => {
    e.style.height = "auto";
    e.style.height = (e.scrollHeight + (selectedData.type === 'json' ? 16 : 0)) + "px";
}
let inputData = e=>{
    heightControl(e.target)
    error.value = '';
    dataCopy.context = e.target.value;
    if(dataCopy.type === 'json'){
        try{
            JSON.parse(dataCopy.context);
        }catch(e){
            error.value = 'Invalid JSON';
        }
    }
}
onMounted(() => {
    if (editSelectedData && !selectedData.tags) {
        let editor = document.getElementById('editData');

        if (selectedData.context) {
            heightControl(editor);
        }

        editor.focus();
    }
})
</script>
