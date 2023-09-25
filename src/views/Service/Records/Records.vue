<template lang="pug">
.containerWrap
    .container
        // search form
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
                                select(name='access_group' @change="e => advancedForm.access_group = e.target.value")
                                    option(value="1") All
                                    option(value="0") Public
                                    option(value="private") Private
                                .material-symbols-outlined.mid.selectArrowDown arrow_drop_down
                    .condition 
                        .label Reference ID
                        .textFormWrap
                            input(type="text" name='reference' @change="e => advancedForm.reference = e.target.value")
                    .condition 
                        .label Subscription
                        .textFormWrap
                            input(type="text" name='subscription' @change="e => advancedForm.subscription = e.target.value")
                    .condition 
                        .label Tag
                        .textFormWrap
                            input(type="text" name='tag' @change="e => advancedForm.tag = e.target.value")
                .right
                    .title Index
                    .condition 
                        .label Name
                        .textFormWrap
                            input(type="text" name='index_name' v-model="firstInput" @change="e => advancedForm.index_name = e.target.value")
                    .condition 
                        .label(:class="{'disabled': !firstInput}") Value Type
                        .textFormWrap
                            input(type="text" name='index_type' :disabled="!firstInput" @change="e => advancedForm.index_type = e.target.value")
                    .condition 
                        .label(:class="{'disabled': !firstInput}") Index Value
                        .textFormWrap.indexValue(:class="{'disabled' : !firstInput}")
                            input(type="text" name='index_value' :disabled="!firstInput" @change="e => advancedForm.index_value = e.target.value")
                            .customSelect
                                select(name="index_condition" :disabled="!firstInput" @change="e => advancedForm.index_condition = e.target.value")
                                    option(disabled) Condition
                                    option(value=">=") &gt;=
                                    option(value=">") &gt;
                                    option(value="=" selected) =
                                    option(value="<") &lt;
                                    option(value="<=") &lt;=
                                .material-symbols-outlined.mid.selectArrowDown arrow_drop_down
                .buttonWrap 
                    input.clear(type="reset" value="Clear filter" @click="clearSearchFilter")
                    button.search(type="submit") Search
    .container 
        // view / edit record / create record
        .viewRecord
            // view | edit | create record
            form(:class='{recordForm: selectedRecord?.record_id, createForm: !selectedRecord?.record_id}' v-if="selectedRecord" @submit.prevent="saveRecordData")
                // left panel of record info
                .recordInfo 
                    .header
                        .tit {{ selectedRecord?.record_id ? 'Record Information' : 'Create Record' }}
                    .content
                        template(v-if='selectedRecord?.record_id')
                            .info 
                                .label Record ID 
                                .value(:class="{ disabled: recordInfoEdit }" :value="selectedRecord.record_id" style="width: calc(100% - 170px);") {{ selectedRecord.record_id }}
                                .copy(v-if="!recordInfoEdit" @click="copy")
                                    .material-symbols-outlined.sml file_copy

                            .info 
                                .label User ID 
                                .value(:class="{ disabled: recordInfoEdit }" :value="selectedRecord.user_id" style="position:relative;overflow: visible;width: calc(100% - 200px); cursor: pointer")
                                    span#userId(@click.stop="()=>{if(ellipsisCheck('userId')) hiddenUserID=true}" style='width:100%;display:inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;') {{ selectedRecord.user_id }}
                                    .hidden.userID(v-if="hiddenUserID" @click.stop style='top: 100%;left: -5rem;') {{ selectedRecord.user_id }}
                                .copy(v-if="!recordInfoEdit" @click="copy")
                                    .material-symbols-outlined.sml file_copy

                            .info 
                                .label Uploaded
                                .value(:class="{ disabled: recordInfoEdit }") {{ new Date(selectedRecord.uploaded).toLocaleString() }}

                            .info 
                                .label Updated
                                .value(:class="{ disabled: recordInfoEdit }") {{ new Date(selectedRecord.updated).toLocaleString() }}

                        .info 
                            .label Permission
                            .value 
                                select(v-if="recordInfoEdit && selectedRecord?.record_id && selectedRecord.user_id !== account.user_id" :value="selectedRecord.readonly.toString()" @change="(e) => selectedRecord.readonly = JSON.parse(e.target.value)")
                                    option(value="false") Read/Write
                                    option(value="true") Read Only

                                // admin can't upload readonly because its meaningless
                                template(v-else) {{ selectedRecord.readonly ? 'Read Only' : 'Read/Write' }}
                        .info
                            .label Table
                            .value.various
                                .smallInfo 
                                    .smallLabel Name 
                                    .smallValue 
                                        input(v-if="recordInfoEdit" type="text" pattern="[a-zA-Z0-9]+" title="Table name should only be alphanumeric." :value="selectedRecord.table.name" placeholder="(Required)" @input="(e) => { selectedRecord.table.name = e.target.value; }" required)
                                        template(v-else) {{ selectedRecord.table.name }}
                                .smallInfo 
                                    .smallLabel Access Group
                                    .smallValue 
                                        select(v-if="recordInfoEdit && selectedRecord.table.access_group !== 'private'" :value="selectedRecord.table.access_group" @change="(e) => selectedRecord.table.access_group = parseInt(e.target.value)")
                                            option(value="0") Public
                                            option(value="1") Authorized
                                        template(v-else) {{ selectedRecord.table.access_group == 'private' ? 'Private' : selectedRecord.table.access_group === 0 ? 'Public' : 'Authorized' }}
                                .smallInfo 
                                    .smallLabel Subscription Group
                                    .smallValue 
                                        input(:style='{opacity: !selectedRecord.user_id || selectedRecord.user_id === account.user_id ? 0.5 : 1}' :disabled="!selectedRecord.user_id || selectedRecord.user_id === account.user_id || null" :class="{nonClickable: !selectedRecord.user_id || selectedRecord.user_id === account.user_id}" v-if="recordInfoEdit" type="number" min='0' max='99' :value="selectedRecord.table?.subscription_group || ''" placeholder="None" @input="(e) => {selectedRecord.table.subscription_group = e.target.value ? parseInt(e.target.value) : null }")

                                        // admin can't upload subscription group because its meaningless
                                        template(v-else) {{ selectedRecord.table?.subscription_group || 'None' }}
                        .info
                            .label Index
                            .value.various
                                .smallInfo 
                                    .smallLabel Name 
                                    .smallValue 
                                        input(v-if="recordInfoEdit" type="text" :value="selectedRecord.index?.name || ''" pattern="[_a-zA-Z0-9]+" title="Index name should only be alphanumeric." placeholder="No Index" @input="(e)=> { if (!selectedRecord.index) { selectedRecord.index={}; } selectedRecord.index.name = e.target.value; }")
                                        template(v-else) {{ selectedRecord.index?.name || 'No Index' }}
                                .smallInfo 
                                    .smallLabel Value 
                                    .smallValue(:class="{'indexValue' : !recordInfoEdit}")
                                        .typeValue(v-if="recordInfoEdit" :class="{ nonClickable: !selectedRecord?.index?.name }" :style='{opacity: selectedRecord?.index?.name ? 1 : 0.5}')
                                            select(:value="indexValueType" @change="handleIndexTypeChange")
                                                option(value="string") String
                                                option(value="number") Number
                                                option(value="boolean") Boolean 

                                            select(
                                                v-if="indexValueType === 'boolean'"
                                                :value="selectedRecord.index?.value.toString()"
                                                @change="(e) => { if (!selectedRecord.index) { selectedRecord.index={}; } selectedRecord.index.value = JSON.parse(e.target.value); }"
                                            )
                                                option(value="true") true
                                                option(value="false") false

                                            input(
                                                v-else 
                                                :type="indexValueType === 'string' ? 'text' : 'number'" :value="selectedRecord.index?.value"
                                                placeholder="(Value Required)"
                                                @input="(e)=> { if(!selectedRecord.index) { selectedRecord.index={}; } selectedRecord.index.value = indexValueType === 'number' ? parseInt(e.target.value) : e.target.value; }"
                                                :required="selectedRecord?.index?.name ? true : null"
                                            )
                                        template(v-else-if='!selectedRecord.index?.name') No Index
                                        template(v-else) {{ typeof selectedRecord.index.value }} | {{ selectedRecord.index.value }}

                        .info 
                            .label Reference
                            .value.various
                                .smallInfo 
                                    .smallLabel Reference ID
                                    .smallValue 
                                        input#referenceIdInput(v-if="recordInfoEdit" type="text" :value="selectedRecord.reference?.record_id || ''" placeholder="Record ID to reference (optional)" @input="(e) => {selectedRecord.reference.record_id = e.target.value || null; e.target.setCustomValidity('')}")
                                        template(v-else) {{ selectedRecord.reference.record_id || 'None' }}
                                .smallInfo 
                                    .smallLabel Multiple Reference 
                                    .smallValue 
                                        select(v-if="recordInfoEdit" :value="JSON.stringify(selectedRecord.reference.allow_multiple_reference)" @change="(e) => {selectedRecord.reference.allow_multiple_reference = e.target.value ? JSON.parse(e.target.value) : null}")
                                            option(value="true") Allowed
                                            option(value="null") Not Allowed
                                        template(v-else) {{ selectedRecord.reference.allow_multiple_reference ? 'Allowed' : 'Not Allowed' }}
                                .smallInfo 
                                    .smallLabel Reference Limit
                                    .smallValue 
                                        input(v-if="recordInfoEdit" type="number" min="0" :value="selectedRecord.reference.reference_limit === null ? '' : selectedRecord.reference?.reference_limit" placeholder="Infinite" @input="(e) => selectedRecord.reference.reference_limit = e.target.value ? parseInt(e.target.value) : null")
                                        template(v-else) {{ selectedRecord.reference.reference_limit || 'Infinite' }}
                        .info 
                            .label Tags 
                            .value(style="width: calc(100% - 170px);")
                                .tagsWrapper#tagsWrapper(@click.stop="e=>{if(recordInfoEdit) editTags=(()=>{if(!selectedRecord?.tags) {selectedRecord.tags = []} return selectedRecord.tags;})(); else if(ellipsisCheck('tagsWrapper')) hiddenTags=true;}")
                                    template(v-if="selectedRecord?.tags?.length")
                                        .tag(v-for="tag in selectedRecord?.tags") {{ tag }}
                                    template(v-else) {{ recordInfoEdit ? 'Add Tags' : '-'}}
                        .hidden.tags(v-if="hiddenTags && selectedRecord?.tags" @click.stop)
                            .tag(v-for="tag in selectedRecord?.tags") {{ tag }}

                // right panel of record info
                .recordData
                    .header
                        .tit Type
                        .tit Key Name 
                        .tit Context
                    .content
                        .noData(v-if="selectedRecord.data && selectedRecord.data.hasOwnProperty('__is_private__')")
                            .material-symbols-outlined.big lock
                            p Private Data

                        template(v-else-if="records_data.length")

                            template(v-for="(data, index) in records_data" :key="index")    
                                template(v-if="records_data.length && !recordInfoEdit")
                                    .row(@click="()=>{ if(data.type === 'file') data.download(); else if((data.type === 'json' || data.type === 'string') && ellipsisCheck('data-context-' + index)) showRecordDataValue=data}" :class="{'disabled' : ['boolean', 'number', 'string'].includes(data.type), 'file': data.type == 'file'}")
                                        .data {{ data.type }}
                                        .data
                                            .overflow(v-if="data?.key") {{ data.key }}
                                            .overflow(v-else) -
                                        .data 
                                            .overflow(:id='"data-context-" + index') {{ data.context }}
                                        .material-symbols-outlined.sml.download(v-if="data.type == 'file'") download

                                template(v-else)
                                    .rowEdit
                                        .material-symbols-outlined.sml.minus(@click="records_data.splice(index, 1)") do_not_disturb_on

                                        select.type(:value="data.type" @change="(e) => selectType(e, data)" :disabled="selectedRecord.record_id && data.type === 'file' && data.context || null")
                                            // on edit, record file data cannot be changed. only delete is allowed
                                            option(value="json") JSON
                                            option(value="string") String
                                            option(value="boolean") Boolean
                                            option(value="file") File
                                            option(value="number") Number

                                        // on edit, record file data cannot be changed. only delete is allowed
                                        div(v-if='selectedRecord.record_id && data.type === "file" && data.context' style='opacity:0.5; width: 84px;margin-right: 20px;') {{ data.key }}

                                        input.key(v-else type="text" v-model="data.key" placeholder="Key name" required)

                                        template(v-if="data.type == 'json'")
                                            .context.click(@click="showRecordDataValue=Object.assign(data, {edit:true})")
                                                .overflow {{ data.context }}

                                        template(v-else-if="data.type == 'boolean'")
                                            select.context(:value="data.context === 'true' ? data.context : 'false'" @change="(e) => data.context = e.target.value")
                                                option(value="true") true
                                                option(value="false") false

                                        template(v-else-if="data.type == 'file'")
                                            template(v-if='selectedRecord.record_id && data.type === "file" && data.context')
                                                // on edit, record file data cannot be changed. only delete is allowed
                                                div(style='width: calc(100% - 208px);')
                                                    span(style='opacity: 0.5') {{ data.context }}
                                                    .material-symbols-outlined.sml(@click='data.download()' style='float: right; cursor: pointer;' v-if="data.type == 'file'") download

                                            template(v-else-if="data.context === ''")
                                                .context.fileUpload Choose a file

                                        template(v-else)
                                            input.context(:type="data.type === 'number' ? 'number' : 'text'" v-model="data.context" :placeholder="`<${data.type}> Value`")

                            template(v-if="!recordInfoEdit" v-for="i in dataTrCount" :key="'extra-' + i")
                                .row.empty

                        .noData(v-else-if="!recordInfoEdit")
                            .material-symbols-outlined.big scan_delete
                            p No data

                        .addDataRow(v-if="!(selectedRecord.data && selectedRecord.data.hasOwnProperty('__is_private__')) && recordInfoEdit" @click="addField")  
                            .material-symbols-outlined.sml add_circle
                            span Add data

                // right panel top right menu
                .material-symbols-outlined.mid.menu(v-if="!recordInfoEdit" @click.stop="showEdit = !showEdit") more_vert
                // drop down menu (no edit)
                .editMenuWrap(v-if="showEdit" @click.stop)
                    .nest
                        .editMenu(@click="recordInfoEdit = true; showEdit = false;")
                            .material-symbols-outlined.mid edit
                            span edit   
                        .editMenu(@click="recordDelete(selectedRecord.record_id); showEdit = false;")
                            .material-symbols-outlined.mid delete
                            span delete  

                // buttons (edit)
                .editBtnWrap(v-if="recordInfoEdit" :class="{'smallver' : isSmallScreen}") 
                    button.cancel(type='button' @click="()=>{recordInfoEdit = false; selectedRecord = recordPage.list[selectedRecord.record_id] ? JSON.parse(JSON.stringify(recordPage.list[selectedRecord.record_id])) : null; }") 
                        .material-symbols-outlined.mid(v-if="isSmallScreen") close
                        span(v-else) Cancel
                    button.save
                        .material-symbols-outlined.mid(v-if="isSmallScreen") check
                        span(v-else) Save

            .noSelect(v-else) No record selected

        // top menu of record list
        .tableHeader 
            .actions 
                .material-symbols-outlined.mid.refresh.clickable(@click='refresh' :class='{"rotate_animation": fetching }') cached
                .material-symbols-outlined.mid.menu.clickable(:class='{"nonClickable": !checkedRecords.length}' @click.stop="showRecordSetting = !showRecordSetting") more_vert
                .recordSettingWrap(v-if="showRecordSetting" @click.stop)
                    .nest
                        .setting(@click="()=>{recordDelete(); showRecordSetting=false;}")
                            .material-symbols-outlined.mid delete
                            span delete
                button.create(@click="()=>{ selectedRecord = JSON.parse(JSON.stringify(createRecordTemplate)); recordInfoEdit=true; }") create record
            .pagenator 
                .material-symbols-outlined.sml.prevPage.clickable(:class='{"nonClickable": currentPage === 1 || fetching }' @click='nextPage(false)') arrow_back_ios
                .material-symbols-outlined.sml.nextPage.clickable(:class='{"nonClickable": maxPage <= currentPage && recordPage?.endOfList || fetching }' @click='nextPage') arrow_forward_ios

        // record list
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
                                input#allRecords(type="checkbox" value='allRecords' @click="selectAll")
                                label(for="allRecords")
                                    .material-symbols-outlined.mid.check check
                        th Table Name
                        th Record ID
                        th User ID
                        th Date
                        th.center Access Group
                        th.center Features
                tbody(v-if="records && records.length")
                    //tr(v-for="(record, index) in records" :key="index" @click="()=>{recordInfoEdit=false;selectedRecord = JSON.parse(JSON.stringify(record))}" :class="{ active: activeIndex === index }")
                    tr(v-for="record in records" @click="()=>{ recordInfoEdit=false; if(selectedRecord?.record_id === record.record_id) selectedRecord = null; else selectedRecord = JSON.parse(JSON.stringify(record)) }" :class="{ active: selectedRecord?.record_id === record.record_id }")
                        td(@click.stop style="text-align:center")
                            .customCheckBox
                                input(type="checkbox" name="record" :id="record.record_id" @change='trackSelectedRecords' :value="record.record_id")
                                label(:for="record.record_id")
                                    .material-symbols-outlined.mid.check check
                        td {{ record.table.name }}
                        td
                            .overflow {{ record.record_id }}
                        td
                            .overflow {{ record.user_id }}
                        td {{ timeSince(record.uploaded) }}
                        td.center
                            .accessWrap
                                .hoverWrap(v-if="record.table.access_group == 'private'")
                                    .material-symbols-outlined.mid(v-if="record.table.access_group == 'private'") vpn_key
                                    .hoverPreview(style="--pos-l:45px; --arr-l:25px") Private
                                .hoverWrap(v-else-if="record.table.access_group > 0")
                                    .material-symbols-outlined.mid person
                                    .hoverPreview(style="--pos-l:30px; --arr-l:40px") Authorized
                                .hoverWrap(v-else-if="record.table.access_group == 0")
                                    .material-symbols-outlined.mid language
                                    .hoverPreview(style="--pos-l:45px; --arr-l:25px") Public

                        // indexes
                        td
                            .featureWrap_v2
                                .hoverWrap(v-if='record?.tags?.length' style='display: inline-block')
                                    .feature.tag Tag
                                    .hoverPreview(style="--pos-r: 0; --arr-r:0; max-width: 25vw")
                                        // .tagsWrapper_ext - reference style section below
                                        .tagsWrapper_ext
                                            .tag(v-for='t in record.tags') {{ t }}
                                .hoverWrap(v-if='record?.index' style='display: inline-block')
                                    .feature.index Index
                                    .hoverPreview(style="--pos-r: 0; --arr-r:0")
                                        span(style='white-space: nowrap') {{ record.index.name }} | {{ record.index.value }}
                                .hoverWrap(v-if='record?.reference?.record_id' style='display: inline-block')
                                    .feature.ref Ref
                                    .hoverPreview(style="--pos-r: 0; --arr-r:0")
                                        span(style='white-space: nowrap') {{ record?.reference?.record_id }}

                    tr(v-for="i in trCount" :key="'extra-' + i")

            .noRecordsFound(v-if="records && !records.length")
                .tit 
                    .material-symbols-outlined.big search
                    h2 No Records Found
                p There was no record matching query 
    TagEditor(v-if="editTags" @close="editTags = null" :tags="editTags")
    RecordDataOverlay(v-if="showRecordDataValue" @close="showRecordDataValue = null" :selectedData="showRecordDataValue" @save="saveRecordDataValue")
    DeleteRecordOverlay(v-if="showDeleteRecord" @close="showDeleteRecord = null;" :toDelete="showDeleteRecord")
</template>

<script setup>
import { bodyClick } from '@/main.js';
import { computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import RecordDataOverlay from '@/views/Service/Records/RecordDataOverlay.vue';
import DeleteRecordOverlay from '@/views/Service/Records/DeleteRecordOverlay.vue';
import TagEditor from './TagEditor.vue';
import { account, skapi } from '../../../main';
import { currentService } from '@/data.js';
import { selectedRecord, records_data, indexValueType } from './RecordEdit';
import { launch, serviceRecords, getPage, records, selectNone, recordPage, currentPage, maxPage, fetching, refresh, nextPage, timeSince } from './RecordFetch';

launch();
let showRecordDataValue = ref(null);
let showRecordData = ref(false);
let showDeleteRecord = ref(null);
let showRecordSetting = ref(false);
let showEdit = ref(false);
let hiddenUserID = ref(false);
let hiddenTags = ref(false);
let editTags = ref(null);
let searchText = ref('');
let recordInfoEdit = ref(false);
let advancedForm = ref({
    access_group: 0,
    table: undefined,
    subscription: null,
    index_type: 'string',
    index_name: undefined,
    index_name: undefined,
    index_value: undefined,
    index_condition: '=',
    tag: undefined,
    reference: undefined
});
let createRecordTemplate = {
    table: {
        name: '',
        access_group: 0,
    },
    index: {
        name: '',
        value: '',
    },
    reference: {
        allow_multiple_reference: true,
        reference_limit: null
    },
    tags: [],
    readonly: false
};
let dataList = ref([]);
let checkedRecords = ref([]);
let selectedData = ref(null);
let firstInput = ref('');
let selectedOption = ref('table');
let isSmallScreen = ref(window.innerWidth < 1200)
let maxTrCount = 10;

let trCount = computed(() => {
    return Math.max(0, maxTrCount - records.value.length);
});
let dataTrCount = computed(() => {
    return Math.max(0, maxTrCount - records_data.value.length);
});

let saveRecordDataValue = d => {
    for (let key in d) {
        showRecordDataValue.value[key] = d[key];
    }
    showRecordDataValue.value = null;
}
let copy = (e) => {
    let doc = document.createElement('textarea');
    doc.textContent = e.target.parentNode.previousSibling.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    e.target.parentNode.classList.add('copied');
    setTimeout(() => {
        e.target.parentNode.classList.remove('copied');
    }, 1000);
}

let clearSearchFilter = () => {
    firstInput.value = '';
}

let selectAll = (e) => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked
    })
    trackSelectedRecords();
}

let trackSelectedRecords = () => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked && checkbox.value !== 'selectall') {
            checked.push(checkbox.value);
        }
    })
    checkedRecords.value = checked;
}

let validateTableName = (event) => {
    let regex = /^[\p{L}\d\s.]+$/u;

    let isValid = event.target.value.match(regex) ? true : false;
    if (isValid) {
        event.target.setCustomValidity('');
    } else {
        event.target.setCustomValidity('Can not contain special characters other than period and spaces');
        event.target.reportValidity();
    }
};

// recordData edit
let addField = () => {
    records_data.value.push({ type: 'string', key: '', context: '' });
    nextTick(() => {
        let scrollTarget = document.querySelector('.recordData .content');
        if (scrollTarget.getBoundingClientRect().height < scrollTarget.scrollHeight) {
            scrollTarget.scrollTop = scrollTarget.getBoundingClientRect().height + 30;
        }
    })
};
let removeField = (index) => {
    if (createRecordForm.value) {
        dataList.value.splice(index, 1);
    } else {
        records_data.value.splice(index, 1);
    }
};
let selectType = (e, data) => {
    data.type = e.target.value;
    if (data.type === 'string') {
        data.context = '';
    }
    else if (data.type === 'number') {
        data.context = '0';
    }
    else if (data.type === 'boolean') {
        data.context = 'false';
    }
    else if (data.type === 'file') {
        data.context = '';
    }
    else if (data.type === 'json') {
        data.context = 'null';
    }
}
let saveRecordData = () => {
    let record_params = {
        service: currentService.value.service,
        record_id: selectedRecord.value.record_id,
        readonly: selectedRecord.value.readonly,
        table: selectedRecord.value.table,
        index: selectedRecord.value.index,
        reference: selectedRecord.value.reference,
        tags: selectedRecord.value.tags
    };

    let data = {};

    if (record_params.table.subscription) {
        delete record_params.table.subscription;
    }
    if (!record_params.index?.name) {
        record_params.index = null;
    }

    // build record data
    let rec_data = records_data.value;
    if (!rec_data.length) {
        data = null;
    }
    else {
        let makeArray = (key, data, value) => {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                }
                else {
                    data[key] = [data[key], value];
                }
            }
            else {
                data[key] = value;
            }
        }

        for (let d of rec_data) {
            if (d.type === 'string') {
                makeArray(d.key, data, d.context);
            }
            else if (d.type === 'number') {
                makeArray(d.key, data, d.context.includes('.') ? parseFloat(d.context) : parseInt(d.context));
            }
            else if (d.type === 'boolean' || d.type === 'json') {
                makeArray(d.key, data, JSON.parse(d.context));
            }
            else if (d.type === 'file') {
                makeArray(d.key, data, d.fileData);
            }
        }
    }

    skapi.postRecord(data, record_params).then(res => {
        recordInfoEdit.value = false;
        recordPage.insertItems([res]).then(_ => {
            getPage(currentPage.value);
        });
    }).catch(err => {
        let errmsg = err.message.charAt(0).toUpperCase() + err.message.slice(1)
        if (err.message.includes('referenc')) {
            document.getElementById('referenceIdInput').setCustomValidity(errmsg)
            document.getElementById('referenceIdInput').reportValidity()
        }
        else {
            alert(errmsg)
        }
    });
}

// create Record
let createAddField = () => {
    dataList.value.push({
        type: "json",
        key: "",
        context: ""
    });
}

// delete Record
let recordDelete = (id) => {
    id = id ? [id] : checkedRecords.value;
    let recDelete = async () => {
        skapi.deleteRecords({
            service: currentService.value.service,
            record_id: id
        });
        for (let i of id) {
            if (id === selectedRecord.value.record_id) {
                selectedRecord.value = null;
            }
            await recordPage.deleteItem(i);
        }
        selectNone();
        getPage(currentPage.value);
    }

    showDeleteRecord.value = { cb: recDelete, count: id.length };
}

let handleResize = () => {
    isSmallScreen.value = window.innerWidth < 1200;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

bodyClick.recordPage = () => {
    showRecordSetting.value = false;
    showEdit.value = false;
    hiddenTags.value = false;
    hiddenUserID.value = false;
}

let ellipsisCheck = (id) => {
    let e = document.getElementById(id);
    return e.offsetWidth < e.scrollWidth;
}
let handleIndexTypeChange = (e) => {
    let originalValue = recordPage.list[selectedRecord.value.record_id].index?.value;
    let valueType = e.target.value;

    if (!selectedRecord.value.index) {
        selectedRecord.value.index = {};
    }

    if (valueType === 'boolean') {
        selectedRecord.value.index.value = typeof originalValue === 'boolean' ? originalValue : true;
    }
    else if (valueType === 'number') {
        selectedRecord.value.index.value = typeof originalValue === 'number' ? originalValue : 0;
    }
    else {
        selectedRecord.value.index.value = typeof originalValue === valueType ? originalValue : '';
    }

    indexValueType.value = valueType;
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
                color: rgba(0, 0, 0, 0.4);
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

            .label,
            .radioFormWrap,
            .radio {
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

                &.indexValue {
                    position: relative;

                    &::after {
                        position: absolute;
                        content: '';
                        right: 70px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 1px;
                        height: 60%;
                        background-color: #000;
                    }

                    &.disabled {
                        &::after {
                            background-color: rgba(0, 0, 0, 0.10);
                        }

                        .customSelect {
                            .selectArrowDown {
                                color: rgba(0, 0, 0, 0.25);
                            }
                        }
                    }

                    input {
                        padding-right: 80px;
                    }

                    .customSelect {
                        position: absolute;
                        right: 0;
                        top: 45%;
                        transform: translateY(-50%);
                        width: 66px;

                        select {
                            border: 0;
                            padding-left: 20px;
                            background-color: unset;
                        }

                        .selectArrowDown {
                            right: 0;
                        }
                    }
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

        .recordForm,
        .createForm {
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

            .recordInfo,
            .recordData {
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
            }

            .menu {
                position: absolute;
                right: 14px;
                top: 7.5px;
                color: rgba(0, 0, 0, 0.6);
                cursor: pointer;
            }

            .editBtnWrap {
                position: absolute;
                right: 20px;
                top: 10px;

                &.smallver {
                    top: 8px;

                    .cancel {
                        margin-right: 6px;
                    }
                }

                button {
                    font-size: 16px;
                    font-weight: 700;
                    border: 0;
                    background-color: unset;
                    cursor: pointer;

                    &.cancel {
                        color: rgba(0, 0, 0, 0.80);
                        margin-right: 20px;
                    }

                    &.save {
                        color: #293FE6;
                    }
                }
            }

            .editMenuWrap {
                position: relative;

                .nest {
                    position: absolute;
                    right: 20px;
                    top: 34px;
                    border-radius: 8px;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    background: #FAFAFA;
                    box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
                    padding: 20px;
                    width: 134px;
                    z-index: 2;

                    .editMenu {
                        display: flex;
                        flex-wrap: nowrap;
                        align-items: center;
                        cursor: pointer;

                        &:first-child {
                            margin-bottom: 20px;
                        }

                        &:hover {
                            span {
                                font-weight: 700;
                            }
                        }

                        span {
                            margin-left: 10px;
                            font-size: 16px;
                            font-weight: 500;
                        }
                    }
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
                    font-weight: 700;
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

                .info,
                .smallInfo {
                    position: relative;
                    user-select: none;

                    .label,
                    .smallLabel {
                        display: inline-block;
                        vertical-align: middle;
                        color: rgba(0, 0, 0, 0.40);
                        font-size: 14px;
                    }

                    .value,
                    .smallValue {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 14px;
                        font-weight: 500;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: rgba(0, 0, 0, 0.6);

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
                            padding: 1px 4px;
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
                            color: rgba(0, 0, 0, 0.6);
                        }
                    }

                    .copy {
                        position: absolute;
                        top: 65%;
                        right: 0;
                        transform: translateY(-50%);
                        color: rgba(0, 0, 0, 0.4);
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
                            background-color: rgba(250, 250, 250, 0.9);
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

                        input,
                        select {
                            width: 100%;
                        }
                    }

                    &:nth-child(8) {
                        margin-bottom: 42px;
                    }

                    .que {
                        position: absolute;
                        left: 148px;
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
                    border: 1px solid rgba(0, 0, 0, 0.15);
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
                            color: rgba(0, 0, 0, 0.6);
                        }
                    }
                }

                .smallInfo {
                    margin-top: 12px;

                    .smallLabel {
                        width: 140px;
                        font-weight: 400;
                        // margin-left: 10px;
                        padding-left: 10px;
                    }

                    .smallValue {
                        width: calc(100% - 140px);
                        padding-left: 10px;

                        input,
                        select {
                            width: 100%;
                        }

                        &.indexValue {
                            width: calc(100% - 200px);
                        }
                    }

                    .typeValue {
                        // width: calc(100% - 10px);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.80);

                        input,
                        select {
                            width: calc(100% - 95px) !important;
                            border-bottom: 0;
                        }

                        select {
                            &:first-child {
                                width: 84px !important;
                                margin-right: 10px;
                            }

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
                    color: rgba(0, 0, 0, 0.60);
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

                    &.empty:hover {
                        cursor: default;
                    }

                    &.disabled:hover {
                        color: rgba(0, 0, 0, 0.40);
                        font-weight: 500;
                        cursor: default;
                    }

                    &.file:hover {
                        .download {
                            display: block;
                        }
                    }

                    &:hover {
                        color: rgba(0, 0, 0, 0.80);
                        font-weight: 700;
                    }

                    .download {
                        position: absolute;
                        right: 12px;
                        top: 50%;
                        transform: translateY(-50%);
                        display: none;
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
                    // align-items: center;

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

                    .type,
                    .key,
                    .context {
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
                        padding: 1px 4px;
                    }

                    .context {
                        width: calc(100% - 208px);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.80);
                        padding: 1px 4px;

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
                    color: rgba(0, 0, 0, 0.4);

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

            .refresh,
            .menu {
                margin-right: 20px;
            }

            .refresh {
                color: #293FE6;
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
                position: relative;

                .nest {
                    position: absolute;
                    width: 134px;
                    left: -40px;
                    bottom: -78px;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    background: #FAFAFA;
                    color: rgba(0, 0, 0, 0.80);
                    box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
                    z-index: 10;
                    cursor: pointer;

                    .setting {
                        display: flex;
                        align-items: center;
                        user-select: none;

                        &:hover {
                            span {
                                font-weight: 700;
                            }
                        }

                        span {
                            margin-left: 14px;
                        }
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

        .noRecords,
        .noRecordsFound {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: rgba(0, 0, 0, 0.40);

            .tit {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: center;

                .material-symbols-outlined {
                    margin-right: 12px;
                }
            }

            h2 {
                font-size: 28px;
                font-weight: 700;
            }

            p {
                font-size: 20px;
                font-weight: 500;
                margin-top: 28px;
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

            .featureWrap_v2 {
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

                    &.tag {
                        background: #FCA642;
                    }

                    &.index {
                        background: #52D687;
                    }

                    &.ref {
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
                }

                &:hover {
                    background-color: rgba(41, 63, 230, 0.05);
                }
            }

            td {
                position: relative;

                .accessWrap {
                    * {
                        cursor: pointer;
                    }
                }

                .featurePreview,
                .accessPreview {
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
                            left: 2vw;
                            top: 50%;
                            border-top: 20px solid transparent;
                            border-right: 20px solid transparent;
                            border-left: 20px solid #fafafa;
                            rotate: -45deg;
                        }

                        &.active {
                            display: block;
                        }

                        &.fir {
                            left: 10%;
                        }

                        &.sec {
                            left: 50%;
                        }

                        &.last {
                            left: 90%;
                        }

                        div {
                            width: 150px;
                            line-height: 44px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            display: none;

                            &.active {
                                display: block;
                            }
                        }
                    }
                }

                .accessPreview {
                    .preview {
                        &::after {
                            left: 50%;
                        }

                        div {
                            width: 100px;
                        }
                    }
                }
            }

            td,
            th {
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

                tr {
                    &:hover {
                        background-color: unset;
                    }
                }
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

.tagsWrapper_ext {
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
        color: rgba(0, 0, 0, 0.6);
    }
}
</style>
