<template lang="pug">
#recordData(@click="()=>{if(!editSelectedData) emits('close')}")
    .wrap(@click.stop)
        template(v-if="editSelectedData")
            // edit
            .header 
                h4(v-if='selectedData.tags') Tags
                h4(v-else) {{ selectedData.type }} - {{ selectedData.key }}
            .content 
                TagsInput(v-if='selectedData.tags' :editTagsData = "selectedData.tags")
                textarea#editData(v-else-if="selectedData.hasOwnProperty('context')" :value="selectedData.context" @input="heightControl")
            .buttonWrap 
                button.cancel(@click="emits('close')") Cancel
                button.save Save
        
        template(v-else)
            // view
            .header 
                h4 {{ selectedData.type }} - {{ selectedData.key }}
                
                // i don't see the need below...
                //- .editWrap(v-if="selectedData.type == 'json'" @click="edit")
                //-     .material-symbols-outlined.mid edit
                //-     span edit

            .content {{ selectedData.context }}

</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import TagsInput from '@/components/TagsInput.vue';

let { selectedData } = defineProps(['selectedData']);
let editSelectedData = selectedData?.edit;

let emits = defineEmits(['close']);

let heightControl = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = (e.target.scrollHeight) + "px";
}

onMounted(() => {
    if(editSelectedData) {
        document.getElementById('editData').focus();
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

        .editWrap {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            user-select: none;
            cursor: pointer;

            span {
                margin-left: 8px;
            }
        }
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
            user-select: none;
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