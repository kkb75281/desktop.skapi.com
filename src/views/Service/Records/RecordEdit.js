import { ref, watch } from "vue";
import { skapi } from "../../../main";

export let selectedRecord = ref(null);
export let records_data = ref([]);
export let indexValueType = ref('string');

watch(selectedRecord, (newVal) => {
    records_data.value = [];
    indexValueType.value = typeof newVal?.index?.value === 'undefined' ? 'string' : typeof newVal?.index?.value;

    if (newVal) {
        // address records_data
        if (!newVal.data || !Object.keys(newVal.data).length) {
            return;
        }
        if (newVal.data.hasOwnProperty('__is_private__')) {
            records_data.value.push({
                type: 'string',
                key: '__is_private__',
                context: ''
            })
        }
        else {
            for (let d in newVal.data) {
                let data = newVal.data[d];
                switch (typeof data) {
                    case 'object':
                        if (Array.isArray(data)) {
                            let nonFile = [];
                            for (let i of data) {
                                if (i.__file_id__ && i.filename && i.md5 && i.url) {
                                    // files in array
                                    records_data.value.push({
                                        type: 'file',
                                        key: d,
                                        context: i.filename,
                                        fileData: data,
                                        download: () => skapi.getFile(i.url, {dataType: 'download'})
                                    });
                                }
                                else {
                                    nonFile.push(i);
                                }
                            }
                            if (nonFile.length) {
                                // non file in array
                                records_data.value.push({
                                    type: 'json',
                                    key: d,
                                    context: JSON.stringify(nonFile, null, 2)
                                })
                            }
                        } else {
                            if (data.__file_id__ && data.filename && data.md5 && data.url) {
                                // single file object
                                records_data.value.push({
                                    type: 'file',
                                    key: d,
                                    context: data.filename,
                                    fileData: data,
                                    download: () => skapi.getFile(data.url, {dataType: 'download'})
                                });
                            }
                            else {
                                // object
                                records_data.value.push({
                                    type: 'json',
                                    key: d,
                                    context: JSON.stringify(data, null, 2)
                                })
                            }
                        }
                        break;
                    case 'string':
                        records_data.value.push({
                            type: 'string',
                            key: d,
                            context: data
                        })
                        break;
                    case 'boolean':
                        records_data.value.push({
                            type: 'boolean',
                            key: d,
                            context: data.toString()
                        })
                        break;
                    case 'number':
                        records_data.value.push({
                            type: 'number',
                            key: d,
                            context: data.toString()
                        })
                        break;
                }
            }
        }
    }
});