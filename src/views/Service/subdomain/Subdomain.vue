<template lang="pug">
main#subdomain
    section#section
        .titleWrap
            // main title
            h4 {{ subdomainState || (computedSubdomain ? computedSubdomain + '.skapi.com' : 'Hosting') }}
            .buttonWrap(v-if="currentService.subdomain") 
                .refresh.clickable(:class="{'nonClickable' : !account.email_verified || subdomainState || refreshCDNRun}" @click='refreshCdn()')
                    .material-symbols-outlined.mid(:class="{'rotate_animation': refreshCDNRun}") cached
                    span Refresh CDN
                .delete.clickable(:class="{'nonClickable' : !account.email_verified || subdomainState}" @click='showDeleteSubdomain = true;')
                    .material-symbols-outlined.mid delete
                    span Delete
        br

        // head panel when there is subdomain
        .settingWrap(v-if="currentService.subdomain") 
            .setting
                h6.tit Subdomain
                template(v-if="modifySudomain && !subdomainState")
                    form.modifyForm(style="margin-top: 8px" @submit.prevent='registerSubdomain')
                        .input
                            input#modifySudomain(:disabled="subdomainState || subdomainPromiseRunning ? true : null" type="text" placeholder="Name of Subdomain" required minlength='5' pattern='[a-z0-9]+' title='Subdomain should be lowercase alphanumeric.' :value='inputSubdomain' @input="(e) => {e.target.setCustomValidity(''); inputSubdomain = e.target.value}")
                        .btnWrap
                            template(v-if="subdomainPromiseRunning")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                button.cancel(type="button" @click="modifySudomain = false;") Cancel
                                button.save(type="submit" :disabled="subdomainState ? true : null") Save
                template(v-else)
                    .cont(@click="modifySudomain = true")
                        p {{ computedSubdomain }}
                        .material-symbols-outlined.mid.btn.clickable(:class="{'nonClickable' : !account.email_verified || subdomainState}") edit
            .setting
                h6.tit HTML file for 404 page
                .cont.line 
                    .customFile(:class="{'nonClickable' : !account.email_verified || subdomainState}")
                        p {{ subdomainInfo?.[computedSubdomain]?.['404'] || "Upload a file"}}
                        template(v-if="set404PromiseRunning")
                            img.loading(style='position: absolute;right: 1em;top: 8px;' src="@/assets/img/loading.png")
                        template(v-else)
                            label.uploadBtn.btn(v-if="subdomainInfo?.[computedSubdomain]?.['404']" @click='removeSet404')
                                .material-symbols-outlined.mid cancel
                                span Remove
                            label.uploadBtn.btn(for="file404" v-else)
                                .material-symbols-outlined.mid upload
                                span Upload
                            input#file404(hidden type="file" @change="set404" accept='text/html')

        // head panel when there is NO subdomain
        .create(v-else) 
            h3.tit Register Subdomain
            form.createForm(@submit.prevent='registerSubdomain')
                .input
                    input#modifySudomain(@input='e=>e.target.setCustomValidity("")' :disabled="subdomainPromiseRunning || null" type="text" placeholder="Name of Subdomain" required minlength='5' pattern='[a-z0-9]+' title='Subdomain should be lowercase alphanumeric.')
                .btn(:class="{'nonClickable': !account.email_verified}" style='cursor:pointer')
                    template(v-if="subdomainPromiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button(type="submit") Create

    section#section(v-if="currentService.subdomain")
        // path navigation
        .filesHeader
            .filesPathWrap
                .material-symbols-outlined.mid.clickable(@click="launch(computedSubdomain)") hard_drive
                span /
                template(v-for='(p, index) in pathArray')
                    span.clickable(@click='gotoFolder(index)') {{ p }}
                    span /

            .filesButtonWrap
                // file menu
                .material-symbols-outlined.mid.refresh.clickable(:class='{"rotate_animation": fetching }' @click='refresh(searchDir)') cached
                .material-symbols-outlined.mid.menu.clickable(@click.stop="showEdit = !showEdit") more_vert
                    #moreVert(v-if="showEdit" @click.stop)
                        .inner
                            .more(@click="showRemoveAllFiles = true; showEdit = false;")
                                .material-symbols-outlined.mid delete
                                span Remove All Files
                            .more(:class='{"nonClickable": !checkedFiles.length || !account.email_verified}' @click="showDeleteFile = true; showEdit = false;")
                                .material-symbols-outlined.mid delete
                                span Delete
                .customFile(:class="{'nonClickable' : !account.email_verified || Object.keys(fileList).length}")
                    label.uploadBtn.btn(for="files")
                        .material-symbols-outlined.mid upload
                        span Upload
                    input#files(hidden type="file" @change="e=>onDrop(null,e.target.files)" multiple)

        // file part
        .filesWrapper(
            @dragover.stop.prevent="e=>{e.dataTransfer.dropEffect = 'copy'}"
            @drop.stop.prevent="onDrop")
            template(v-if="!fetching && (files.length == 0 || files.length === 1 && files[0].name === '!')")
                .dragNdropUpload
                    input(hidden type="file")
                    div
                        .material-symbols-outlined.empty(style="font-size:80px") file_present
                        p Drag and Drop Files or Folders here
            template(v-else-if="files.length")
                .fileWrapper
                    template(v-for="(file, index) in files")
                        .file.clickable(v-if='file.name !== "!"' @click="file.name[0] == '#' ? launch(file.path + '/' + file.name.slice(1)) : viewFileInfo(file)")
                            .customCheckBox(@click.stop)
                                input(type="checkbox" :id="index" :value='file.path + "/" + file.name' @change='trackSelectedFiles')
                                label(:for="index")
                                    .material-symbols-outlined.mid.check check
                            .material-symbols-outlined.mid.type(v-if="file.name[0] == '#'") folder
                            .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.html')") html
                            .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.css')") css
                            .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.pdf')") picture_as_pdf
                            .material-symbols-outlined.mid.type(v-else-if="img.includes(file.name.split('.').slice(-1)[0])") image
                            .material-symbols-outlined.mid.type(v-else-if="vid.includes(file.name.split('.').slice(-1)[0])") movie
                            .material-symbols-outlined.mid.type(v-else) draft
                            .pathWrapper
                                .path {{ file.name[0] === '#' ? file.name.slice(1) : file.name }}

UploadFileList(
    v-if="uploading && fileList && Object.keys(fileList).length"
    :fileList = "fileList"
    @cancel='uploading = null;'
    :wholeProgress='uploadWholeProgress')

DeleteFileOverlay(v-if="showDeleteFile" @close="showDeleteFile = false;" title='Delete Files' :callback='deleteSelectedFiles')
    | Are you sure want to delete the selected file(s)?
    br
DeleteFileOverlay(v-if="showDeleteSubdomain" :callback='removeSubdomain' title='Delete Subdomain' @close="showDeleteSubdomain = false;")
    | Are you sure want to delete your subdomain? All your hosted files will be lost.
    br
DeleteFileOverlay(v-if="showRemoveAllFiles" :callback='removeAllFiles' title='Delete Subdomain' @close="showRemoveAllFiles = false;")
    | Are you sure want to delete all the files in your subdomain? All your hosted files will be lost.
    br

msgOverlay(v-if="fileInfo" @close="fileInfo = null" :title="fileInfo?.name" style='--max-width: 600px;')
    .fileInfo
        span
            b Filename:&nbsp;
        a(target="_blank" :href='`https://${ computedSubdomain }.skapi.com/${ fileInfo?.path.split(computedSubdomain).slice(1).join("") }${ encodeURI(fileInfo.name) }`') {{ fileInfo.name }}
        
        br
        br

        span
            b Size:&nbsp;
        span.value {{ formatBytes(fileInfo?.size || 0) }}

        br
        br

        span
            b Last Modified:&nbsp;
        span.value {{ fileInfo?.upl ? new Date(fileInfo.upl).toString().split(' ').slice(0, 5).join(' ') : 'Unknown' }}

        br
        br

        span
            b URL:&nbsp;
        span.value https://{{ computedSubdomain }}.skapi.com/{{ fileInfo?.path.split(computedSubdomain + '/').slice(1).join('') }}{{ encodeURI(fileInfo.name) }}

        br
        br
        br
        br

        div(style='text-align: right;')
            button.msgButton(@click='fileInfo=false') Close
</template>

<script setup>
import msgOverlay from '@/components/msgOverlay.vue';
import { computed, inject, nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { skapi, account, bodyClick } from '@/main.js';
import { currentService } from '@/data.js';
import UploadFileList from '@/views/Service/subdomain/UploadFileList.vue';
import DeleteFileOverlay from '@/views/Service/subdomain/DeleteFileOverlay.vue';
import { launch, currentPage, fetching, searchDir, files, refresh, fileList, dirPage, getPage, selectNone, subdomainInfo, uploading, uploadWholeProgress } from './SubdomainFetch';
import { img, vid } from './extensions';

let route = useRoute();
let currnetPath = route.path.split('/')[2];
let modifySudomain = ref(false);
let showEdit = ref(false);
let showDeleteFile = ref(false);
let inputSubdomain = ref('');
let errorFile = ref('');
let checkedFiles = ref([]);
let showDeleteSubdomain = ref(false);
let subdomainState = ref('');
let showRemoveAllFiles = ref(false);

let computedSubdomain = ref('')
let subdomainPromiseRunning = ref(false);

let pathArray = computed(() => {
    return searchDir.value.split('/').slice(1);
})
let gotoFolder = index => {
    let path = computedSubdomain.value + "/" + pathArray.value.slice(0, index + 1).join("/");
    launch(path);
}
let refreshCDNRun = ref(true);

if (subdomainInfo.value?.[computedSubdomain.value]) {
    if (subdomainInfo.value?.[computedSubdomain.value]?.invid) {
        checkCDNStatus();
    }
    else {
        refreshCDNRun.value = false;
    }
}

watch(() => subdomainInfo.value?.[computedSubdomain.value], (newValue) => {
    if (newValue?.invid) {
        checkCDNStatus();
    }
    else {
        refreshCDNRun.value = false;
    }
}, { deep: true });

let cdnCheckRunning = false;
let checkCDNStatus = async () => {
    if (cdnCheckRunning) {
        return;
    }

    refreshCDNRun.value = true;
    skapi.refreshCDN(currentService.value.service, {
        checkStatus: (e) => {
            if (e === 'COMPLETE') {
                cdnCheckRunning = false;
                refreshCDNRun.value = false;
                subdomainInfo.value[computedSubdomain.value].invid = null;
            }
        }
    });
}

let refreshCdn = async () => {
    refreshCDNRun.value = true;
    await skapi.refreshCDN(currentService.value.service);
    checkCDNStatus();
}
watch(modifySudomain, (newValue) => {
    if (newValue) {
        nextTick(() => {
            document.getElementById('modifySudomain').focus();
        })
    }
})

watch(computedSubdomain, (newValue) => {
    if (newValue && !subdomainState.value) {
        launch(newValue);
    }
})

let removeAllFiles = async () => {
    await skapi.deleteHostFiles({
        serviceId: currentService.value.service,
        paths: ['']
    }).then(() => {
        launch(computedSubdomain.value, async () => {
            for (let k in dirPage.list) {
                await dirPage.deleteItem(k);
            }
            launch(computedSubdomain.value);
        });
    }).catch(err => {
        console.log({ err });
        alert(err.message);
    });
}

let deleteSelectedFiles = async () => {
    let fileList = [];
    let toDel = checkedFiles.value.map(f => {
        let path = f.split('/').slice(1);
        let file = path.pop();
        fileList.push(file);
        if (file[0] === '#') {
            file = file.slice(1) + '/';
        }

        let fullpath = path.join('/') + '/' + file;
        if (fullpath[0] === '/') {
            fullpath = fullpath.slice(1);
        }

        return fullpath;
    });

    selectNone();

    for (let f of fileList) {
        await dirPage.deleteItem(f);
    }

    await skapi.deleteHostFiles({
        serviceId: currentService.value.service,
        paths: toDel
    }).then(() => {
        launch(searchDir.value);
    }).catch(err => {
        console.log({ err });
        alert(err.message);
    });
}

let fileInfo = ref(null);
let viewFileInfo = f => {
    fileInfo.value = f;
}

// let downloadFile = (f) => {
//     let path = f.path + '/' + f.name;
//     let pathSplit = path.split('/');
//     path = pathSplit.slice(1).join('/');
//     let endpoint = 'https://' + pathSplit[0] + '.skapi.com/' + path;
//     skapi.getFile(endpoint, { expires: 30 });
// }

let subdomainCallback = e => {
    if (!e) {
        return;
    }
    currentService.value = e;
    if (currentService.value.subdomain?.[0] === '+') {
        inputSubdomain.value = currentService.value.subdomain.slice(1);
        console.log(' ...Pending')
        subdomainState.value = ' ...Pending';
    }
    else if (currentService.value.subdomain?.[0] === '*') {
        inputSubdomain.value = currentService.value.subdomain.slice(1);
        console.log(' ...Removing')
        subdomainState.value = ' ...Removing';
    }
    else {
        inputSubdomain.value = currentService.value.subdomain || '';
        subdomainState.value = ''; // idle
    }
    computedSubdomain.value = inputSubdomain.value;
    modifySudomain.value = false;
}

if (currentService.value.subdomain?.[0] === '+' || currentService.value.subdomain?.[0] === '*') {
    skapi.updateSubdomain(currentService.service, subdomainCallback);
}
else {
    computedSubdomain.value = currentService.value.subdomain || '';
    inputSubdomain.value = currentService.value.subdomain || '';
    subdomainState.value = ''; // idle
}

let removeSubdomain = e => {
    return skapi.registerSubdomain(currentService.value.service, {
        subdomain: '',
        cb: subdomainCallback
    }).then(s => { console.log({ ccc: s }); subdomainCallback(s); }).catch(err => {
        console.log({ err });
        alert(err.message);
        throw err;
    })
}
let registerSubdomain = e => {
    subdomainPromiseRunning.value = true;
    skapi.registerSubdomain(currentService.value.service, {
        subdomain: document.getElementById('modifySudomain').value,
        cb: subdomainCallback
    })
        .then(s => {
            subdomainPromiseRunning.value = false; // don't touch this
            subdomainCallback(s);
            modifySudomain.value = false;
        })
        .catch(err => {
            subdomainPromiseRunning.value = false; // this is needed BEFORE customvalidity. or else page refresh will make the validity message go away.
            nextTick(() => {
                let ms = document.getElementById('modifySudomain');

                ms.focus();
                ms.setCustomValidity('The subdomain has already been taken');
                ms.reportValidity();
            });
        });
}

let set404PromiseRunning = ref(false);
let set404 = (e) => {
    set404PromiseRunning.value = true;
    let formdata = new FormData();
    formdata.append('file', e.target.files[0], e.target.files[0].name);

    skapi.uploadHostFiles(formdata, {
        serviceId: currentService.value.service,
        progress: (e) => {
            console.log(e);
        }
    }).then(async () => {
        let fn = e.target.value.split('\\').slice(-1)[0];
        try {
            await skapi.set404({ serviceId: currentService.value.service, path: fn });
            subdomainInfo.value[computedSubdomain.value]['404'] = fn;
        } catch (err) {
            console.log({ err });
            alert(err.message);
        }
    }).catch(err => {
        console.log({ err });
        alert(err.message);
    }).finally(() => {
        set404PromiseRunning.value = false;
    })
}

let removeSet404 = async () => {
    set404PromiseRunning.value = true;
    try {
        await skapi.set404({ serviceId: currentService.value.service, path: null });
        delete subdomainInfo.value[computedSubdomain.value]['404'];
    } catch (err) {
        console.log({ err });
        alert(err.message);
    }
    finally {
        set404PromiseRunning.value = false;
    }
}

function traverseFileTree(item, path = '') {
    return new Promise((resolve) => {
        if (item.isFile) {
            item.file(function (file) {
                resolve([{ file, path: path + file.name }]);
            });
        } else if (item.isDirectory) {
            let dirReader = item.createReader();
            dirReader.readEntries(async function (entries) {
                let promises = entries.map(entry => traverseFileTree(entry, path + item.name + '/'));
                let results = await Promise.all(promises);
                resolve([].concat(...results));
            });
        }
    });
}

let onDrop = async (event, files) => {

    if (!searchDir.value) {
        return;
    }

    if (Object.keys(fileList.value).length > 0) {
        return;
    }

    let formData = new FormData();
    let allFiles = [];

    if (files) {
        // add files to formdata
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            allFiles.push({ file, path: file.name });
            formData.append('files[]', file, file.name);
        }
    }
    else {
        let items = event.dataTransfer.items;
        let filePromises = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i].webkitGetAsEntry();
            if (item) {
                filePromises.push(traverseFileTree(item));
            }
        }

        let allFileGroups = await Promise.all(filePromises);
        allFiles = [].concat(...allFileGroups);

        allFiles.forEach(({ file, path }) => {
            formData.append('files[]', file, path);
        });
    }

    if (!allFiles.length) {
        return;
    }

    let wholeSize = 0;
    let loadedSize = 0;
    for (let f of allFiles) {
        fileList.value[f.path] = {
            name: f.file.name,
            path: f.path,
            progress: 0,
            loaded: 0,
            size: f.file.size
        }
        wholeSize += f.file.size;
    }

    uploadWholeProgress.value = 0;

    let trackUpload = track => {
        if (uploading.value === null) {
            track.abort();
        }
        if (track.status === 'upload' && track.currentFile) {
            loadedSize += track.loaded - fileList.value[track.currentFile.name].loaded;
            uploadWholeProgress.value = Math.round(loadedSize / wholeSize * 100);
            fileList.value[track.currentFile.name].progress = track.progress;
            fileList.value[track.currentFile.name].loaded = track.loaded;
        }
    }

    uploading.value = skapi.uploadHostFiles(formData, {
        serviceId: currentService.value.service,
        progress: trackUpload,
        nestKey: pathArray.value.join('/')
    }).then(e => {
        if (uploading.value) {
            launch(searchDir.value, () => { }, true);
        }
    }).finally(() => {
        uploading.value = null;
        fileList.value = {};
    });
}

// let addFiles = async (files) => {
//     for (let i = 0; i < files.length; i++) {
//         let file = files[i];

//         // 중복 파일 확인
//         let duplicateIndex = fileList.value.findIndex(
//             (uploadedFile) => uploadedFile.name === file.name
//         );

//         if (duplicateIndex !== -1) {
//             // 중복 파일이 존재하는 경우 최신 버전으로 교체
//             let existingFile = fileList.value[duplicateIndex];
//             if (file.lastModified > existingFile.lastModified) {
//                 fileList.value.splice(duplicateIndex, 1, file);
//             }
//         } else {
//             // 중복 파일이 없는 경우 파일을 추가
//             fileList.value.push(file);
//         }
//     }
// }
let trackSelectedFiles = () => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checked.push(checkbox.value);
        }
    })
    checkedFiles.value = checked;
}
bodyClick.recordPage = () => {
    showEdit.value = false;
}
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
</script>

<style lang="less" scoped>
#subdomain {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-wrap: wrap;

    #section {
        position: relative;
        width: 100%;
        padding: 2rem;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

        .titleWrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .buttonWrap {
                text-align: end;

                > div {
                    display: inline-block;
                    vertical-align: middle;
    
                    &.refresh {
                        color: #293FE6;
                    }
        
                    &.delete {
                        margin-left: 2rem;
                    }
                    div {
                        vertical-align: middle;
                    }
                    span {
                        font-size: 0.8rem;
                        font-weight: 700;
                        margin-left: 12px;
                    }
                }
    
            }
        }

        .uploadBtn {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            color: #293FE6;
            width: 105px;
            height: 32px;
            border-radius: 8px;
            border: 2px solid #293FE6;
            cursor: pointer;

            span {
                margin-left: 3px;
                font-size: 0.8rem;
                font-weight: 700;
                color: #293FE6;
            }
        }

        .settingWrap {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;

            .setting {
                width: 47%;

                .tit {
                    color: rgba(0, 0, 0, 0.40);
                    font-weight: 500;
                }

                .cont {
                    position: relative;
                    width: 100%;
                    height: 44px;
                    line-height: 44px;

                    &::before {
                        position: absolute;
                        content: '';
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 1px;
                        background: rgba(0, 0, 0, 0.10);
                        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
                    }

                    &.line {
                        &::before {
                            width: calc(100% - 120px);
                        }

                        .btn {
                            bottom: 0;
                            transform: translateY(-10px);
                        }
                    }

                    p {
                        font-size: 0.8rem;
                        font-weight: 700;
                        color: rgba(0, 0, 0, 0.6);

                        &:hover {
                            color: rgba(0, 0, 0, 0.8);
                            cursor: default;
                        }
                    }

                    .customFile {
                        #fileName {
                            border: 0;
                            background-color: unset;
                            font-size: 0.8rem;
                            color: rgba(0, 0, 0, 0.6);
                        }
                    }

                    .btn {
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }
                }

                .modifyForm {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    height: 44px;

                    .input {
                        width: 65%;
                        position: relative;

                        &::before {
                            position: absolute;
                            content: '';
                            width: 100%;
                            height: 100%;
                            border-radius: 8px;
                            background: rgba(0, 0, 0, 0.05);
                            // z-index: -1;
                            pointer-events: none;
                        }

                        &::after {
                            position: absolute;
                            content: '.skapi.com';
                            right: 13px;
                            top: 50%;
                            transform: translateY(-50%);
                            font-size: 0.8rem;
                            font-weight: 400;
                        }

                        input {
                            border: 0;
                            width: calc(100% - 87px);
                            padding: 13px;
                            height: 44px;
                            background-color: unset;
                            font-size: 0.8rem;
                            font-weight: 400;
                        }
                    }

                    .btnWrap {
                        width: 35%;
                        display: flex;
                        flex-wrap: nowrap;
                        align-items: center;
                        justify-content: end;

                        button {
                            border: 2px solid #293FE6;
                            border-radius: 8px;
                            padding: 6px 12px;
                            font-size: 0.8rem;
                            font-weight: 700;
                            cursor: pointer;

                            &.cancel {
                                background-color: unset;
                                color: #293FE6;
                                margin-right: 12px;
                            }

                            &.save {
                                background-color: #293FE6;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }

        .filesHeader {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.4rem;

            .filesPathWrap {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                color: rgba(0, 0, 0, 0.60);

                span {
                    font-size: 0.8rem;
                    font-weight: 500;
                    margin-left: 0.6rem;
                }
            }

            .filesButtonWrap {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;

                .menu {
                    position: relative;
                    margin: 0 1rem;
                }

                .refresh {
                    color: #293FE6;
                }
            }
        }

        .filesWrapper {
            position: relative;
            // width: 100%;
            // min-height: 448px;
            height: 450px;
            overflow: hidden;
            padding: 1.5rem 1.4rem;
            border-radius: 8px;
            border: 1px solid rgba(0, 0, 0, 0.10);

            .fileWrapper {
                height: 100%;
                overflow: auto;

                .file {
                    height: 40px;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    color: rgba(0, 0, 0, 0.6);
                    border-radius: 4px;
                    padding: 10px;

                    &:nth-child(2n+1) {
                        background: rgba(0, 0, 0, 0.05);
                    }

                    .type {
                        margin: 0 1rem;
                        padding-left: 1rem;
                    }

                    .pathWrapper {
                        font-size: 0.7rem;
                        font-weight: 500;

                        .path {
                            white-space: nowrap;
                        }
                    }
                }
            }

            .dragNdropUpload {
                width: 100%;
                height: 100%;
                background-color: rgba(250, 250, 250, 0.6);
                text-align: center;
                color: rgba(0, 0, 0, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;

                p {
                    font-weight: 500;
                    margin-top: 10px;
                }
            }
        }

        .uploadListWrapper {
            position: absolute;
            width: 500px;
            border-radius: 4px;
            right: 0;
            bottom: 0;
            background-color: #fafafa;
            border: 1px solid rgba(0, 0, 0, 0.15);

            .header {
                width: 100%;
                height: 60px;
                border-radius: 4px 4px 0px 0px;
                background: rgba(41, 63, 230, 0.05);
                padding: 1rem 1.4rem;
                font-size: 1rem;
                font-weight: 500;
            }

            .progressBar {
                width: 100%;
                height: 8px;
                background: rgba(41, 63, 230, 0.20);
            }

            .content {
                width: 100%;
                height: 320px;
                padding: 0.8rem 1.4rem;
                overflow: hidden;

                .listWrap {
                    height: 100%;
                    overflow-y: auto;
                }

                .list {
                    height: 56px;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: space-between;

                    .file {
                        display: flex;
                        flex-wrap: nowrap;
                        align-items: center;
                        color: rgba(0, 0, 0, 0.6);

                        .pathWrapper {
                            margin-left: 12px;
                        }
                    }
                }
            }
        }

        .create {
            position: relative;
            width: 100%;
            padding: 1.4rem;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.10);
            border: 1px solid rgba(0, 0, 0, 0.15);

            .tit {
                color: #293FE6;
                font-size: 1rem;
                font-weight: 700;
                margin-bottom: 0.6rem;
            }

            .createForm {
                height: 44px;
                display: flex;
                align-items: center;

                .input {
                    position: relative;
                    width: 600px;
                    margin-right: 1rem;

                    &::before {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
                        background: rgba(0, 0, 0, 0.05);
                        pointer-events: none;
                        // z-index: -1; <-- this is not good. to prevent mouse event, use pointer-events: none;
                    }

                    &::after {
                        position: absolute;
                        content: '.skapi.com';
                        right: 13px;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 0.8rem;
                        font-weight: 400;
                    }

                    input {
                        border: 0;
                        width: calc(100% - 85px);
                        height: 44px;
                        padding: 13px;
                        background-color: unset;
                        font-size: 0.8rem;
                        font-weight: 400;
                    }
                }

                .btn {
                    button {
                        border: 0;
                        padding: 0 1.4rem;
                        height: 44px;
                        border-radius: 8px;
                        color: #FFF;
                        font-size: 0.8rem;
                        font-weight: 700;
                        background: #293FE6;
                        box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                    }
                }
            }
        }
    }
}

@media (max-width:767px) {
    #subdomain {
        #section {
            .titleWrap {
                flex-wrap: wrap;

                .buttonWrap {
                    > div {
                        &.delete {
                            margin-left: 1rem;
                        }
                        span {
                            display: none;
                        }
                    }
                }
            }
            .settingWrap {
                flex-wrap: wrap;
    
                .setting {
                    width: 100%;
                    margin-bottom: 2rem;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
            .filesHeader {
                flex-wrap: wrap;
                justify-content: flex-end;
                flex-direction: column-reverse;
                .filesPathWrap {
                    width: 100%;
                }
                .filesButtonWrap {
                    width: 100%;
                    justify-content: end;
                    margin-bottom: 1rem;
                }
            }
        }
    }
}
</style>

<style lang="less">
.fileInfo {
    user-select: text;
    
    a, span, b {
        display: inline-block;
        word-break: break-all;
        user-select: text;

        &.value {
            line-height: 1;
        }
    }
}
</style>