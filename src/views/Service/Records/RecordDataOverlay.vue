<template lang="pug">
#recordData(@click="()=>{if(!editSelectedData) emits('close')}")
    .wrap(@click.stop)
        template(v-if="editSelectedData")
            // edit
            .header 
                h4(v-if='dataCopy.tags') Tags
                h4(v-else) {{ dataCopy.type }} - {{ dataCopy.key }}
            .content 
                textarea#editData(:value='dataCopy.context' @input='inputData' spellcheck="false" :style='displayFontType()')
                .error(v-if="error")
                    .material-symbols-outlined.mid error
                    span {{ error }}
            .buttonWrap 
                button.cancel(@click="emits('close')") Cancel
                button.save(@click='()=>{if(error) return; emits("save", dataCopy);}') Save

        template(v-else)
            // view
            .header 
                h4 {{ selectedData.type }} - {{ selectedData.key }}

                // i don't see the need below...
                //- .editWrap(v-if="selectedData.type == 'json'" @click="edit")
                //-     .material-symbols-outlined.mid edit
                //-     span edit

            .content(:style='displayFontType()') {{ selectedData.context }}

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

<style lang="less" scoped>
#recordData {
    position: fixed;
    overflow: auto;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(26, 26, 26, 0.25);
    z-index: 99999;
}

.wrap {
    position: absolute;
    content: '';
    left: 50%;
    top: 50%;
    width: 580px;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
    z-index: 999;

    .header {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
    }

    .content {
        padding: 20px 20px 28px;

        textarea {
            width: 100%;
            max-height: calc(100vh*0.5);
            border: 0;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.05);
            padding: 12px;
            color: rgba(0, 0, 0, 0.60);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            resize: none;
        }
    }

    .buttonWrap {
        // width: 100%;
        height: 44px;
        // padding: 0 20px 20px 20px;
        margin: 0 20px 20px 20px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;

        button {
            background-color: unset;
            color: #293FE6;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;

            &.cancel {
                border: 0;
            }

            &.save {
                padding: 0 28px;
                height: 44px;
                border-radius: 8px;
                border: 2px solid #293FE6;
            }
        }
    }
}
</style>