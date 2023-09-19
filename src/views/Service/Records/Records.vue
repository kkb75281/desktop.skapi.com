<template lang="pug">
.containerWrap
    .container
        form
            .searchForm
                .selectBar
                    .customSelect
                        select(v-model="selectedOption")
                            option(value="table") Table Name
                            option(value="user") User ID
                            option(value="record") Record ID
                        .material-symbols-outlined.mid.selectArrowDown arrow_drop_down
                .searchBar
                    .material-symbols-outlined.mid.search search
                    input(placeholder="Search Record" v-model="searchText")
                    .material-symbols-outlined.mid.delete(v-if="searchText" @click="searchText = ''") close
            .advancedForm(v-if="selectedOption === 'table'")
                .left 
                    .condition
                        .label Access Group
                        .radioFormWrap
                            .customSelect
                                select
                                    option(value="1") All
                                    option(value="0") Public
                                    option(value="private") Private
                                .material-symbols-outlined.mid.selectArrowDown arrow_drop_down
                    .condition 
                        .label Reference ID
                        .textFormWrap
                            input(type="text" name='reference')
                    .condition 
                        .label Subscription
                        .textFormWrap
                            input(type="text" name='reference')
                    .condition 
                        .label Tag
                        .textFormWrap
                            input(type="text" name='reference')
                .right
                    .title Index
                    .condition 
                        .label Name
                        .textFormWrap
                            input(type="text" name='reference' v-model="firstInput")
                    .condition 
                        .label(:class="{'disabled': !firstInput}") Value Type
                        .textFormWrap
                            input(type="text" name='reference' :disabled="!firstInput")
                    .condition 
                        .label(:class="{'disabled': !firstInput}") Index Value
                        .textFormWrap
                            input(type="text" name='reference' :disabled="!firstInput")
                .buttonWrap 
                    input.clear(type="reset" value="Clear filter" @click="clearSearchFilter")
                    button.search(type="submit") Search
    .container 
        .viewRecord(:loading="isSaving || null")
            form.recordForm(v-if="selectedRecordForm" @submit.prevent="saveRecordData")
                .recordInfo 
                    .header
                        .tit Record Information
                    .content
                        .info 
                            .label Record ID 
                            .value(:class="{ disabled: recordInfoEdit }" :value="selectedRecord.record_id" style="width: calc(100% - 170px);") {{ selectedRecord.record_id }}
                            .copy(v-if="!recordInfoEdit" @click="copy")
                                .material-symbols-outlined.sml file_copy
                        .info 
                            .label Table name 
                            .value 
                                input(v-if="recordInfoEdit" type="text" :value="selectedRecord.table.name" :placeholder="`${selectedRecord.table.name}`" @input="(e) => {selectedRecord.table.name = e.target.value; }")
                                template(v-else) {{ selectedRecord.table.name }}
                        .info 
                            .label Access group 
                            .value 
                                select(v-if="recordInfoEdit" :value="selectedRecord.table.access_group" @change="(e) => selectedRecord.table.access_group = e.target.value")
                                    option(value="0") Public
                                    option(value="1") Registered
                                template(v-else) {{ selectedRecord.table.access_group == 'private' ? 'Private' : selectedRecord.table.access_group ? 'Registered' : 'Public' }}
                        .info 
                            .label User ID 
                            .value(:class="{ disabled: recordInfoEdit }" :value="selectedRecord.user_id" @click="showHidden" style="width: calc(100% - 200px); cursor: pointer") {{ selectedRecord.user_id }}
                            .copy(v-if="!recordInfoEdit" @click="copy")
                                .material-symbols-outlined.sml file_copy
                        .hidden.userID(v-if="hiddenUserID") {{ selectedRecord.user_id }}
                        .info
                            .label Reference
                            .value.various
                                .smallInfo 
                                    .smallLabel Index Name 
                                    .smallValue 
                                        input(v-if="recordInfoEdit" type="text" :value="selectedRecord.index.name" :placeholder="`${selectedRecord.index.name}`" @input="(e)=> {selectedRecord.index.name = e.target.value;}")
                                        template(v-else) {{ selectedRecord.index.name }}
                                .smallInfo 
                                    .smallLabel Index Value 
                                    .smallValue 
                                        .typeValue(v-if="recordInfoEdit")
                                            select(:value="indexValueType" @change="(e) => {indexValueType = e.target.value; selectedRecord.index.value = indexValueType === 'boolean' ? true : '';}")
                                                option(value="string") String
                                                option(value="number") Number
                                                option(value="boolean") Boolean
                                            input(type="text" :value="selectedRecord.index.value" :placeholder="`${selectedRecord.index.value}`" @input="(e)=> {selectedRecord.index.value = e.target.value;}")
                                        template(v-else) {{ selectedRecord.index.value }}
                                    .copy(v-if="!recordInfoEdit" @click="copy")
                                        .material-symbols-outlined.sml file_copy
                                .smallInfo 
                                    .smallLabel Upload Datetime 
                                    .smallValue(:class="{ disabled: recordInfoEdit }" :value="selectedRecord.updated") {{ selectedRecord.updated }}
                            .material-symbols-outlined.empty.sml.que help
                        .info 
                            .label Reference Setting 
                            .value.various
                                .smallInfo 
                                    .smallLabel Multiple Reference 
                                    .smallValue 
                                        select(v-if="recordInfoEdit" :value="selectedRecord.reference.allow_multiple_reference" @change="(e) => {selectedRecord.reference.allow_multiple_reference = e.target.value}")
                                            option(value="true") Allowed
                                            option(value="null") Disallowed
                                        template(v-else) {{ selectedRecord.reference.allow_multiple_reference?'Allowed':'Disallowed' }}
                                .smallInfo 
                                    .smallLabel Reference Limit
                                    .smallValue 
                                        input(v-if="recordInfoEdit" type="number" min="1" :value="selectedRecord.reference.reference_limit === null ? '' : selectedRecord.reference?.reference_limit" placeholder="Infinite" @input="(e) => selectedRecord.reference.reference_limit = e.target.value ? parseInt(e.target.value) : null")
                                        template(v-else) {{ selectedRecord.reference.reference_limit }}
                        .info 
                            .label Tags 
                            .value(style="width: calc(100% - 170px);")
                                template(v-if="recordInfoEdit")
                                    .tagsWrapper(@click="showRecordData")
                                        template(v-if="selectedRecord?.tags")
                                            .tag(v-for="tag in selectedRecord?.tags") {{ tag }}
                                        template(v-else) -
                                template(v-else)
                                    .tagsWrapper(@click="showHidden")
                                        template(v-if="selectedRecord?.tags")
                                            .tag(v-for="tag in selectedRecord?.tags") {{ tag }}
                                        template(v-else) -
                        .hidden.tags(v-if="hiddenTags && selectedRecord?.tags")
                            .tag(v-for="tag in selectedRecord?.tags") {{ tag }}
                .recordData
                    .header
                        .tit Type
                        .tit Key Name 
                        .tit Context
                    .content
                        template(v-if="records_data.length")
                            template(v-for="(data, index) in records_data" :key="index")
                                template(v-if="records_data.length && !recordInfoEdit")
                                    .row(@click="showRecordData(index, data)")
                                        .data {{ data.type }}
                                        .data
                                            .overflow(v-if="data?.key") {{ data.key }}
                                            .overflow(v-else) -
                                        .data 
                                            .overflow {{ data.context }}
                                template(v-else)
                                    .rowEdit
                                        .material-symbols-outlined.sml.minus(@click="removeField(index)") do_not_disturb_on
                                        select.type(:value="data.type" @change="(e) => selectType(e, data)")
                                            option(value="json") JSON
                                            option(value="string") String
                                            option(value="boolean") Boolean
                                            option(value="file") File
                                            option(value="number") Number
                                        input.key(type="text" :value="data.key" :placeholder="`${data.key?data.key:'Key name'}`")
                                        template(v-if="data.type == 'json'")
                                            .context.click(@click="showRecordData(index, data)")
                                                .overflow {{ data.context }}
                                        template(v-else-if="data.type == 'boolean'")
                                            select.context(:value="data.context" @change="(e) => data.context = e.target.value")
                                                option(value="true") true
                                                option(value="false") false
                                        template(v-else-if="data.type == 'file'") 
                                            template(v-if="data.context === ''")
                                                .context.fileUpload Choose a file OR Drag and drop
                                            template(v-else)
                                                .context.disabled {{ data.context }}
                                        template(v-else)
                                            input.context(type="text" :value="data.context" :placeholder="`${data.context}`")
                            template(v-if="!recordInfoEdit" v-for="i in dataTrCount" :key="'extra-' + i")
                                .row
                        template(v-else)
                            .noData(v-if="!recordInfoEdit")
                                .material-symbols-outlined.big scan_delete
                                p No data
                        .addDataRow(v-if="recordInfoEdit" @click="addField")  
                            .material-symbols-outlined.sml add_circle
                            span Add data
                .material-symbols-outlined.mid.menu(v-if="!recordInfoEdit" @click="showEdit = !showEdit") more_vert
                .editMenuWrap(v-if="showEdit")
                    div(@click="recordInfoEdit = true; showEdit = false;")
                        .material-symbols-outlined.mid edit
                        span eidt   
                    div(@click="recordDelete")
                        .material-symbols-outlined.mid delete
                        span delete  
                .editBtnWrap(v-if="recordInfoEdit") 
                    button.cancel(@click="recordInfoEdit = false;") 
                        .material-symbols-outlined.mid close
                    button.save
                        .material-symbols-outlined.mid check
            form.createForm(v-else-if="createRecordForm" @submit.prevent="createRecordData")
                .recordInfo 
                    .header
                        .tit Create Record
                    .content
                        .info 
                            .label Record ID 
                            .value
                                input(type="text" @input="(e) => {createRecord.record_id = e.target.value; }")
                        .info 
                            .label Table name 
                            .value 
                                input(type="text" @input="(e) => {createRecord.table.name = e.target.value; }")
                        .info 
                            .label Access group 
                            .value 
                                select(value="0" @change="(e) => createRecord.table.access_group = e.target.value")
                                    option(value="0") Public
                                    option(value="1") Registered
                        .info 
                            .label User ID 
                            .value
                                input(type="text" @input="(e) => {createRecord.user_id = e.target.value; }")
                        .info(style="padding-right:0")
                            .label Reference
                            .value.various
                                .smallInfo 
                                    .smallLabel Index Name 
                                    .smallValue 
                                        input(type="text" @input="(e)=> {createRecord.index.name = e.target.value;}")
                                .smallInfo 
                                    .smallLabel Index Value 
                                    .smallValue 
                                        .typeValue
                                            select(value="string" @change="(e) => {indexValueType = e.target.value; createRecord.index.value = indexValueType === 'boolean' ? true : '';}")
                                                option(value="string") String
                                                option(value="number") Number
                                                option(value="boolean") Boolean
                                            input(type="text" @input="(e)=> {createRecord.index.value = e.target.value;}")
                        .info 
                            .label Reference Setting 
                            .value.various
                                .smallInfo 
                                    .smallLabel Multiple Reference 
                                    .smallValue 
                                        select(@change="(e) => {createRecord.reference.allow_multiple_reference = e.target.value}")
                                            option(value="true") Allowed
                                            option(value="null") Disallowed
                                .smallInfo 
                                    .smallLabel Reference Limit
                                    .smallValue 
                                        input(type="number" min="1" placeholder="Infinite" @input="(e) => createRecord.reference.reference_limit = e.target.value ? parseInt(e.target.value) : null")
                        .info 
                            .label Tags 
                            .value 
                                input(type="text" @click="enterTags")
                .recordData
                    .header
                    .content
                        .dataRow
                            .rowEdit(v-for="(data, index) in dataList" :key="index")
                                .material-symbols-outlined.sml.minus(@click="removeField(index)") do_not_disturb_on
                                select.type(:value="data.type" @change="(e) => selectType(e, data)")
                                    option(value="json") JSON
                                    option(value="string") String
                                    option(value="boolean") Boolean
                                    option(value="file") File
                                    option(value="number") Number
                                input.key(type="text" :value="data.key" :placeholder="`${data.key?data.key:'Key name'}`")
                                template(v-if="data.type == 'boolean'")
                                    select.context(:value="data.context" @change="(e) => data.context = e.target.value")
                                        option(value="true") true
                                        option(value="false") false
                                template(v-else-if="data.type == 'file'")
                                    template(v-if="data.context === ''")
                                        input#file.inputfile(type="file" name="file" style="display:none;")
                                        label.context.fileUpload(for="file") Choose a file OR Drag and drop
                                    template(v-else)
                                        .context.disabled {{ data.context }}
                                template(v-else)
                                    input.context(type="text" :value="data.context" :placeholder="`${data.context}`")
                        .addDataRow(@click="createAddField")  
                            .material-symbols-outlined.sml add_circle
                            span Add data
                .editBtnWrap
                    button.cancel(type="button" @click="createRecordForm = false;")
                        .material-symbols-outlined.mid close
                    button.save(type="submit")
                        .material-symbols-outlined.mid check
            .noSelect(v-else) No record selected
        .tableHeader 
            .actions 
                .material-symbols-outlined.mid.refresh.clickable cached
                .material-symbols-outlined.mid.menu.clickable(@click="showUserSetting = !showUserSetting") more_vert
                .recordSettingWrap(v-if="showUserSetting")
                    .setting
                        .material-symbols-outlined.mid delete
                        span delete
                button.create(@click="viewRecordCheck") create record
            .pagenator 
                .material-symbols-outlined.sml.prevPage.clickable arrow_back_ios
                .material-symbols-outlined.sml.nextPage.clickable arrow_forward_ios
        .tableWrap
            table
                colgroup
                    col(width="6%")
                    col(width="15%")
                    col(width="13%")
                    col(width="13%")
                    col(width="13%")
                    col(width="15%")
                    col(width="25%")
                thead
                    tr
                        th
                            .customCheckBox
                                input#allRecords(type="checkbox")
                                label(for="allRecords")
                                    .material-symbols-outlined.mid.check check
                        th Table Name
                        th Record ID
                        th User ID
                        th Date
                        th.center Access Group
                        th.center Features
                tbody(v-if="records.length")
                    tr(v-for="(record, index) in records" :key="index" @click="showRecordInfo(index)" :class="{ active: activeIndex === index }")
                        td(style="text-align:center")
                            .customCheckBox
                                input(type="checkbox" v-bind:id="index")
                                label(:for="index")
                                    .material-symbols-outlined.mid.check check
                        td {{ record.table.name }}
                        td
                            .overflow {{ record.record_id }}
                        td
                            .overflow {{ record.user_id }}
                        td {{ record.uploaded }}
                        td.center
                            .material-symbols-outlined.mid(v-if="record.table.access_group == 'private'") vpn_key
                            .material-symbols-outlined.mid(v-else) language
                        td.center
                            .featureWrap
                                .feature.tag(:class="{'active': record?.tags}" @mouseenter="previewTags = true;" @mouseleave="previewTags = false;") Tag
                                .feature.index(:class="{'active': record?.index}") Index
                                .feature.ref(:class="{'active': record?.ref}") Ref
                            .previewWrap
                                .preview
                                    .tag.tag(v-if="previewTags") {{ record.tags }}
                                    .tag.index(v-if="previewIndex") {{ record.index }}
                                    .tag.ref(v-if="previewRef") {{ record.ref }}
                    tr(v-for="i in trCount" :key="'extra-' + i")
            .noRecords(v-if="!records.length")
                h2 No Records
                p List of records will show when there is data
    RecordDataOverlay(v-if="showRecordDataWindow" :selectedData="selectedData" :editRecordData="editRecordData" @close="showRecordDataWindow = false;")
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { records, records_data } from '@/data.js';
import RecordDataOverlay from '@/views/Service/Records/RecordDataOverlay.vue';
// import TagsInput from '@/components/TagsInput.vue';

let isSaving = ref(false);
let showRecordDataWindow = ref(false);
let previewTags = ref(false);
let previewIndex = ref(false);
let previewRef = ref(false);
let showFilter = ref(false);
let showUserSetting = ref(false);
let showEdit = ref(false);
let showData = ref(false);
let addData = ref(false);
let hiddenUserID = ref(false);
let hiddenTags = ref(false);
let searchText = ref('');
let recordInfoEdit = ref(false);
let activeIndex = ref(null);
let selectedRecordForm = ref(false);
let selectedRecord = ref(null);
let currentIndex = -1;
let createRecordForm = ref(false);
let createRecord = ref(null);
let dataList = ref([]);
let selectedData = ref(null);
let editRecordData = ref(null);
let firstInput = ref('');
let indexValueType = ref('string');
let selectedOption = ref('table');
let maxTrCount = 10;

let trCount = computed(() => {
    return Math.max(0, maxTrCount - records.value.length);
});
let dataTrCount = computed(() => {
    return Math.max(0, maxTrCount - records_data.value.length);
});
let showRecordInfo = (index) => {
    createRecordForm.value = false;
    if(currentIndex === index) {
        selectedRecordForm.value = false;
        activeIndex.value = null;
        currentIndex = -1;
        hiddenTags.value = false;
    } else {
        currentIndex = index;
        activeIndex.value = currentIndex;
        selectedRecord.value = records.value[currentIndex];
        selectedRecordForm.value = true;
        hiddenTags.value = false;
    }
}
let viewRecordCheck = () => {
    if(selectedRecordForm.value) {
        selectedRecordForm.value = false;
        activeIndex.value = null;
        currentIndex = -1;
    }
    dataList.value = [];
    createRecordForm.value = true;
}
let showRecordData = (index, data) => {
    if(recordInfoEdit.value) {
        editRecordData.value = data;
        selectedData.value = null;
    } else {
        editRecordData.value = null;
        selectedData.value = records_data.value[index];
    }
    showRecordDataWindow.value = true;
} 
let showHidden = (e) => {
    if(e.currentTarget.classList.contains('tagsWrapper')) {
        if(hiddenTags.value) {
            hiddenTags.value = false;
        } else {
            hiddenTags.value = true;
        }
    } else {
        if(hiddenUserID.value) {
            hiddenUserID.value = false;
        } else {
            hiddenUserID.value = true;
        }
    }
}
let editWindow = (e) => {
    console.log(e.target)
}
let copy = (e) => {
    let doc = document.createElement('textarea');
    doc.textContent = e.target.parentNode.parentNode.previousSibling.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    e.target.parentNode.parentNode.classList.add('copied');
    setTimeout(() => {
        e.target.parentNode.parentNode.classList.remove('copied');
    }, 1000);
}

let clearSearchFilter = () => {
    firstInput.value = '';
}

// recordData edit
let addField = () => {
	records_data.value.push({ type: 'string', key: '', context: '' });
    console.log(records_data.value)
    nextTick(() => {
        let scrollTarget = document.querySelector('.recordData .content');
        if(scrollTarget.getBoundingClientRect().height < scrollTarget.scrollHeight) {
            scrollTarget.scrollTop = scrollTarget.getBoundingClientRect().height + 30;
        }
    })
};
let removeField = (index) => {
    if(createRecordForm.value) {
        dataList.value.splice(index, 1);
    } else {
        records_data.value.splice(index, 1);
    }
};
let selectType = (e, data) => {
    data.type = e.target.value;
    if(data.type == 'file'){
        data.context = '';
    }
}
let saveRecordData = () => {
    console.log(selectedRecord.value)
}

// create Record
let createAddField = () => {
    dataList.value.push({
        type: "json",
        key: "",
        context: ""
    });
}
let createRecordData = () => {
    console.log(selectedRecord.value)
}

// delete Record
let recordDelete = () => {
    records.value.splice(currentIndex, 1); 
    selectedRecordForm.value = false;
    activeIndex.value = null;
    currentIndex = -1;
    showEdit.value = false;
}
</script>

<style lang="less" scoped>
.containerWrap {
    display: flex;
    flex-wrap: wrap;
    .container {
        width: 100%;
        padding: 28px 40px;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));
    }
    .searchForm {
        display: flex;
        flex-wrap: nowrap;
        .selectBar {
            width: 200px;
            margin-right: 20px;
            
            select {
                height: 44px;
                background: rgba(0, 0, 0, 0.05);
                font-size: 16px;
                padding: 0 20px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.80);
            }
        }
        .searchBar {
            position: relative;
            width: calc(100% - 220px);
            
            input {
                width: 100%;
                height: 44px;
                border: 0;
                border-radius: 8px;
                background: rgba(0, 0, 0, 0.05);
                font-size: 16px;
                padding-left: 50px;
                font-weight: 400;
            }
            .search {
                position: absolute;
                left: 16px;
                top: 10px;
                color: rgba(0,0,0,0.4);
            }
            .delete {
                position: absolute;
                right: 16px;
                top: 10px;
                cursor: pointer;
            }
        }
    }
    .advancedForm {
        margin-top: 30px;

        .left {
            width: 48%;
            margin-right: 4%;
            display: inline-block;
        }
        .right {
            width: 48%;
            display: inline-block;
            .title {
                color: rgba(0, 0, 0, 0.80);
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 20px;
            }
        }
        .condition {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 28px;
            }
            .label, .radioFormWrap, .radio {
                display: inline-block;
            }
            .label {
                width: 90px;
                color: rgba(0, 0, 0, 0.80);
                font-size: 14px;
                font-weight: 700;
                margin-right: 34px;

                &.disabled {
                    color: rgba(0, 0, 0, 0.25);
                }
            }
            .radioFormWrap {
                select {
                    width: 110px;
                    border: 0;
                    background: unset;
                    color: rgba(0, 0, 0, 0.60);
                    font-size: 14px;
                    font-weight: 700;
                }
            }
            .radio {
                margin-right: 20px;
            }
            .textFormWrap {
                width: calc(100% - 124px);
                display: inline-block;
                input {
                    position: relative;
                    width: 100%;
                    border: 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.80);
                    background-color: unset;
                }
                input:disabled {
                    border-bottom: 1px solid rgba(0, 0, 0, 0.10);
                }
            }
        }
        .buttonWrap {
            text-align: right;
            * {
                padding: 12px 28px;
                border: 0;
                font-size: 16px;
                font-weight: 700;
                border-radius: 8px;
                background-color: unset;
                cursor: pointer;
            }
            .clear {
                color: #293FE6;
            }
            .search {
                color: #fff;
                background-color: #293FE6;
                box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
            }
        }
    }
    .viewRecord {
        width: 100%;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        margin-bottom: 40px;
        .recordForm, .createForm {
            position: relative;
            display: flex;
            flex-wrap: nowrap;

            &::after {
                position: absolute;
                content: '';
                left: 50%;
                top: 40px;
                width: 1px;
                height: calc(100% - 40px);
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.1);
                filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.06));
            }
            .recordInfo, .recordData {
                width: 50%;
                overflow: hidden;
                padding-bottom: 20px;
            }
            .recordData {
                .header {
                    padding-left: 40px;
                    .tit {
                        min-width: 84px;
                        padding-left: 0;
                    }
                }
                // .content {
                //     padding-top: 12px;
                // }
            }
            .menu {
                position: absolute;
                right: 14px;
                top: 7.5px;
                color: rgba(0,0,0,0.6);
                cursor: pointer;
            }
            .editBtnWrap {
                position: absolute;
                right: 20px;
                top: 8px;
                
                button {
                    font-size: 16px;
                    font-weight: 700;
                    border: 0;
                    background-color: unset;
                    cursor: pointer;
                    &.cancel {
                        color: rgba(0, 0, 0, 0.80);
                        margin-right: 6px;
                    }
                    &.save {
                        color: #293FE6;
                    }
                }
            }
            .editMenuWrap {
                position: absolute;
                right: 20px;
                top: 34px;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background: #FAFAFA;
                box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
                padding: 20px;
                width: 134px;
                cursor: pointer;
                z-index: 2;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                > div {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;

                    &:first-child {
                        margin-bottom: 20px;
                    }
                }

                span {
                    margin-left: 10px;
                    font-size: 16px;
                    font-weight: 500;
                }
            }
            .header {
                position: relative;
                height: 40px;

                &::after {
                    position: absolute;
                    content: '';
                    left: 0;
                    top: 40px;
                    width: 100%;
                    height: 1px;
                    background: rgba(0, 0, 0, 0.1);
                    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.06));
                }
                .tit {
                    min-width: 84px;
                    height: 40px;
                    line-height: 40px;
                    margin-right: 20px;
                    display: inline-block;
                    color: rgba(0, 0, 0, 0.40);
                    font-size: 14px;
                    font-weight: 400;
                    padding-left: 20px;

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            .content {
                height: 404px;
                padding: 16px 20px 0 20px;
                overflow-y: auto;
                .info, .smallInfo {
                    position: relative;
                    user-select: none;
                    .label, .smallLabel {
                        display: inline-block;
                        vertical-align: middle;
                        color: rgba(0, 0, 0, 0.40);
                        font-size: 14px;
                    }
                    .value, .smallValue {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 14px;
                        font-weight: 700;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        &.disabled {
                            color: rgba(0, 0, 0, 0.25);
                        }
                        &.various {
                            display: block;
                            width: 100%;
                        }
                        input {
                            color: rgba(0, 0, 0, 0.60);
                            background-color: unset;
                            border: 0;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.80);
                        }
                        select {
                            color: rgba(0, 0, 0, 0.60);
                            background-color: unset;
                            border: 0;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.80);
                            cursor: pointer;
                        }
                    }
                    .tagsWrapper {
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        height: 20px;
                        cursor: pointer;
                        .tag {
                            display: inline-block;
                            height: 20px;
                            border-radius: 4px;
                            background: rgba(0, 0, 0, 0.05);
                            box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                            padding: 2px 8px;
                            margin-right: 8px;
                            text-align: center;
                            font-weight: 500;
                            color: rgba(0,0,0,0.6);
                        }
                    }
                    .copy {
                        position: absolute;
                        top: 65%;
                        right: 20px;
                        transform: translateY(-50%);
                        color: rgba(0,0,0,0.4);
                        cursor: pointer;

                        svg {
                            width: 20px;
                        }

                        &::after {
                            position: absolute;
                            display: block;
                            top: 50%;
                            right: 25px;
                            transform: translateY(-50%);
                            text-align: center;
                            font-size: 12px;
                            font-weight: 400;
                            color: rgba(0, 0, 0, 0.5);
                            background-color: rgba(250,250,250,0.9);
                            border-radius: 4px;
                            padding: 4px;
                            content: "Copied";
                            transition: opacity .4s;
                            display: none;
                        }

                        &.copied::after {
                            display: block;
                        }
                    }
                }
                .info {
                    position: relative;
                    margin-bottom: 12px;
                    
                    .label {
                        width: 150px;
                        font-weight: 700;
                    }
                    .value {
                        width: calc(100% - 150px);

                        input, select {
                            width: calc(100% - 20px);
                        }
                    }
                    &:nth-child(8) {
                        margin-bottom: 42px;
                    }
                    .que {
                        position: absolute;
                        left: 170px;
                        top: 0;
                        width: 20px;
                        height: 20px;
                        color: rgba(0, 0, 0, 0.60);
                        cursor: pointer;
                    }
                }
                .hidden {
                    position: absolute;
                    background-color: #FAFAFA;
                    border: 1px solid rgba(0,0,0,0.15);
                    filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));
                    border-radius: 8px;
                    z-index: 10;
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.60);

                    &.userID {
                        left: 170px;
                        top: 176px;
                        padding: 20px;
                        font-weight: 700;
                    }
                    &.tags {
                        width: 270px;
                        left: 45%;
                        bottom: 0;
                        padding: 16px;
                        display: flex;
                        flex-wrap: wrap;
                        .tag {
                            height: 20px;
                            border-radius: 4px;
                            background: rgba(0, 0, 0, 0.05);
                            box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                            padding: 2px 8px;
                            margin: 4px 4px;
                            text-align: center;
                            font-weight: 500;
                            color: rgba(0,0,0,0.6);
                        }
                    }
                }
                .smallInfo {
                    margin-top: 12px;
                    .smallLabel {
                        width: 140px;
                        font-weight: 400;
                        margin-left: 10px;
                    }
                    .smallValue {
                        width: calc(100% - 140px);

                        input, select {
                            width: calc(100% - 30px);
                        }
                    }
                    .typeValue {
                        width: calc(100% - 30px);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.80);
                        input {
                            width: calc(100% - 95px) !important;
                            border-bottom: 0 !important;
                        }
                        select {
                            width: 84px !important;
                            border-bottom: 0 !important;
                            margin-right: 10px !important;
                            cursor: pointer;
                        }
                    }
                }
                .row {
                    position: relative;
                    padding: 0 20px;
                    height: 40px;
                    border-radius: 4px;
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.40);
                    font-weight: 500;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    cursor: pointer;

                    &:first-child {
                        margin-top: -12px;
                    }
                    &:nth-child(2n) {
                        background: rgba(0, 0, 0, 0.05);
                    }
                    &:hover {
                        color: rgba(0, 0, 0, 0.80);
                        font-weight: 700;
                    }
                }
                .rowEdit {
                    position: relative;
                    padding-left: 20px;
                    margin-bottom: 12px;
                    border-radius: 4px;
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.60);
                    font-weight: 500;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    .minus {
                        position: absolute;
                        left: -8px;
                        top: 50%;
                        width: 20px;
                        height: 20px;
                        transform: translateY(-50%);
                        color: rgba(0, 0, 0, 0.60);
                        cursor: pointer;
                    }
                    .type, .key, .context {
                        position: relative;
                        border: 0;
                        background-color: unset;
                    }
                    .type {
                        width: 84px;
                        margin-right: 20px;
                    }
                    .key {
                        width: 84px;
                        margin-right: 20px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.80);
                    }
                    .context {
                        width: calc(100% - 208px);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.80);

                        &.disabled {
                            color: rgba(0, 0, 0, 0.25);
                            font-size: 14px;
                            font-weight: 500;
                            border-bottom: 0;
                        }
                        &.fileUpload {
                            color: #293FE6;
                            font-size: 14px;
                            font-weight: 500;
                            border-bottom: 0;
                            cursor: pointer;
                        }
                        &.click {
                            cursor: pointer;
                        }
                        .overflow {
                            width: 100%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: block;
                        }
                    }
                    select {
                        cursor: pointer;
                    }
                    input {
                        color: rgba(0, 0, 0, 0.60);
                    }
                }
                .data {
                    margin-right: 20px;
                    display: inline-block;

                    &:first-child {
                        width: 84px;
                    }
                    &:nth-child(2) {
                        width: 84px;
                    }
                    &:last-child {
                        width: calc(100% - 208px);
                        margin-right: 0;
                    }
                    .overflow {
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: block;
                    }
                }
                .addDataRow {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;
                    margin-top: 12px;
                    text-align: center;
                    padding: 6px 0;
                    color: #293FE6;
                    background-color: rgba(41, 63, 230, 0.05);
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;

                    span {
                        margin-left: 8px;
                    }
                }
                .noData {
                    position: absolute;
                    left: 75%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    font-size: 28px;
                    font-weight: 700;
                    color: rgba(0,0,0,0.4);
                    .big {
                        width: 52px;
                        height: 52px;
                        font-size: 52px;
                        margin-bottom: 5px;
                    }
                }
            }
        }
        .createForm {
            .header {
                .tit {
                    color: #293FE6;
                    font-size: 16px;
                    font-weight: 700;
                }
            }
            .content {
                .info {
                    padding-right: 2px;

                    &:last-child {
                        margin-bottom: 42px;
                    }
                }
            }
        }
        .noSelect {
            min-height: 100px;
            text-align: center;
            line-height: 100px;
            color: rgba(0, 0, 0, 0.40);
            font-size: 16px;
            font-weight: 500;
        }
    }
    .tableHeader {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .actions {
            position: relative;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            .refresh, .menu {
                margin-right: 20px;
            }
            .dropDown {
                display: flex;
                align-items: center;
                font-size: 16px;
                font-weight: 500;
                margin-right: 20px;
            }
            .filterWrap {
                position: absolute;
                left: 0;
                bottom: -330px;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background: #FAFAFA;
                box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
                z-index: 10;
                user-select: none;
                .filter {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                    color: rgba(0, 0, 0, 0.80);

                    &:last-child {
                        margin-bottom: 0;
                    }
                    input {
                        width: 20px;
                        height: 20px;
                        margin-right: 12px;
                    }
                }
            }
            .recordSettingWrap {
                position: absolute;
                left: -64px;
                bottom: -64px;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background: #FAFAFA;
                color: rgba(0, 0, 0, 0.80);
                box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
                z-index: 10;
                .setting {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                    user-select: none;

                    &:last-child {
                        margin-bottom: 0;
                    }
                    span {
                        margin-left: 14px;
                    }
                }
            }
            .create {
                height: 32px;
                padding: 0px 12px;
                border-radius: 8px;
                border: 2px solid #293FE6;
                color: #293FE6;
                font-size: 16px;
                font-weight: 700;
                background-color: unset;
                user-select: none;
                cursor: pointer;
            }
        }
        .pagenator {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            .prevPage {
                margin-right: 20px;
            }
            svg {
                cursor: pointer;
            }
        }
    }
    .tableWrap {
        position: relative;
        min-height: 660px;
        margin: 40px 0;

        .noRecords {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            h2 {
                color: rgba(0, 0, 0, 0.40);
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 28px;
            }
            p {
                color: rgba(0, 0, 0, 0.40);
                font-size: 20px;
                font-weight: 500;
            }
        }
        table {
            min-width: 100%;
            border-collapse: collapse;
            // table-layout: auto;
            // width: 100%;
            table-layout: fixed;
            .featureWrap {
                position: relative;
                width: 100%;
                .feature {
                    display: inline-block;
                    height: 24px;
                    padding: 2px 12px;
                    border-radius: 4px;
                    box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                    margin-right: 8px;
                    color: #fff;
                    cursor: pointer;
                    opacity: 0;

                    &.active {
                        opacity: 1;
                    }
                    &:first-child {
                        background: #FCA642;
                    }
                    &:nth-child(2) {
                        background: #52D687;
                    }
                    &:last-child {
                        background: #B881FF;
                        margin-right: 0;
                    }
                }
            }
            tr {
                height: 60px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.10);
                border-radius: 8px;
                filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.06));  
                // cursor: pointer;
                overflow: hidden;

                &.active {
                    background-color: rgba(41, 63, 230, 0.05);
                    box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                    border: 0;
                }
            }
            td {
                position: relative;
                .previewWrap {
                    position: absolute;
                    left: 0;
                    top: -33px;
                    .preview {
                        position: relative;
                        height: 44px;
                        background-color: #fafafa;
                        border-radius: 8px;
                        filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.25));
                        color: rgba(0, 0, 0, 0.60);
                        font-size: 14px;
                        padding: 0 12px;
                        font-weight: 700;
                        display: none;
                        &::after {
                            position: absolute;
                            content: '';
                            left: 45px;
                            top: 50%;
                            border-top: 20px solid transparent;
                            border-right: 20px solid transparent;
                            border-left: 20px solid #fafafa;
                            rotate: -45deg;
                        }
                        // &.active {
                        //     display: block;
                        // }
                        .tag {
                            width: 150px;
                            line-height: 44px;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }
                }
            }
            td, th {
                &.center {
                    text-align: center;
                }
                .overflow {
                    width: 90px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: block;
                }
            }
            thead {
                color: rgba(0, 0, 0, 0.40);
                font-weight: 700;
                text-align: left;
            }
            tbody {
                color: rgba(0, 0, 0, 0.80);
                font-weight: 400;
            }
            input {
                width: 20px;
                height: 20px;
                margin-left: 20px;
            }
        }
    }
}
</style>
