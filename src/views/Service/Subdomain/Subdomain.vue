<template lang="pug">
main#subdomain
    section#section
        .titleWrap
            h4.title Hosting
            .buttonWrap(v-if="currentService.subdomain") 
                .refresh.clickable(:class="{'nonClickable' : !account.email_verified || subdomainState || refreshCDNRun}" @click='refreshCdn()')
                    .material-symbols-outlined.mid(:class="{'rotate_animation': refreshCDNRun}") cached
                    span Refresh CDN
                .delete.clickable(:class="{'nonClickable' : !account.email_verified || subdomainState}" @click='showDeleteSubdomain = true;')
                    .material-symbols-outlined.mid delete
                    span Delete
        br

        // head panel when there is subdomain
        .settingWrap(v-if="currentService.subdomain" :class="{nonClickable: subdomainState}") 
            .setting
                h6.tit Subdomain
                template(v-if="modifySudomain && !subdomainState")
                    form.modifyInputForm.sub(@submit.prevent='registerSubdomain')
                        .customInput(style="max-width:350px")
                            input#modifySudomain(:disabled="subdomainState || subdomainPromiseRunning ? true : null" type="text" placeholder="Name of Subdomain" required minlength='5' pattern='[a-z0-9]+' title='Subdomain should be lowercase alphanumeric.' :value='inputSubdomain' @input="(e) => {e.target.setCustomValidity(''); inputSubdomain = e.target.value}")
                            .material-symbols-outlined.sml.cancel(@click="modifySudomain = false;") cancel
                        template(v-if="subdomainPromiseRunning")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            button.save(type="submit" :disabled="subdomainState ? true : null") Save
                template(v-else)
                    .cont
                        p {{ computedSubdomain }}
                            a.link(:href="'http://' + computedSubdomain + '.' + domain" target="_blank")
                                .material-symbols-outlined.sml link
                        .material-symbols-outlined.mid.clickable(:class="{'nonClickable' : !account.email_verified}") edit
            .setting
                h6.tit HTML file for 404 page
                .cont.line
                    p {{ subdomainInfo?.[computedSubdomain]?.['404'] || "Upload a file"}}
                    .customFile(:class="{'nonClickable' : !account.email_verified}")
                        template(v-if="set404PromiseRunning")
                            img.loading(style='position: absolute;right: 1em;top: 8px;' src="@/assets/img/loading.png")
                        template(v-else)
                            label.uploadBtn(v-if="subdomainInfo?.[computedSubdomain]?.['404']" @click='removeSet404')
                                .material-symbols-outlined.mid cancel
                                span Remove
                            label.uploadBtn(for="file404" v-else)
                                .material-symbols-outlined.mid upload
                                span Upload
                            input#file404(hidden type="file" @change="set404" accept='text/html')

        template(v-else-if="account.access_group == 1")
            div(style="text-align:center; background-color:rgba(0,0,0,0.05); padding: 2rem 0; border-radius: 8px;")
                p(style="color: rgba(0, 0, 0, 0.6); font-size: 0.8rem; font-weight: 500; line-height: 1.5;") Trial service does not provide hosting.

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

    section#section(v-if="currentService.subdomain" :class="{'nonClickable': subdomainState }")
        // path navigation
        .filesHeader
            .filesPathWrap
                .material-symbols-outlined.mid.clickable(@click="launch(computedSubdomain)") hard_drive
                span /
                template(v-for='(p, index) in pathArray')
                    span.clickable(@click='gotoFolder(index)') {{ p }}
                    span /

            .filesButtonWrap
                .menu(@click="showRemoveAllFiles = true; showEdit = false;")
                    .material-symbols-outlined.mid.clickable delete
                    span empty storage
                // file menu
                .menu(@click.stop="showEdit = !showEdit" :class='{"nonClickable": !checkedFiles.length || !account.email_verified}')
                    .material-symbols-outlined.mid.clickable more_vert
                    #moreVert(v-if="showEdit" @click.stop style="--moreVert-right: 0;")
                        .inner
                            .more(:class='{"nonClickable": !checkedFiles.length || !account.email_verified}' style="width:unset; white-space: nowrap;")
                                .material-symbols-outlined.mid download_2
                                span download
                            .more(:class='{"nonClickable": !checkedFiles.length || !account.email_verified}' @click="showDeleteFile = true; showEdit = false;")
                                .material-symbols-outlined.mid delete
                                span delete
                .menu.material-symbols-outlined.mid.refresh.clickable(:class='{"rotate_animation": fetching }' @click='refresh(searchDir)') cached
                .customFile(:class="{'nonClickable': !account.email_verified || Object.keys(fileList).length}")
                    label.uploadBtn(for="files")
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
                //- .fileWrapper
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
                            .pathWrapper(:data-filetype="'.'+file.name.split('.').splice(-1)[0]")
                                .path {{ file.name[0] === '#' ? file.name.slice(1) : file.name }}
                .tableWrap 
                    table#resizeMe.table
                        thead
                            tr
                                th.th.center(style="width:230px;")
                                    | Name
                                    .resizer(@mousedown="mousedown")
                                th.th.center(style="width:155px;")
                                    | Size
                                    .resizer(@mousedown="mousedown")
                                th.th(style="padding-left:90px;")
                                    | Last Modified
                                    .resizer(@mousedown="mousedown")
                        tbody
                            template(v-for="(file, index) in files")
                                tr(v-if='file.name !== "!"' :id="file.name" @click="(e) => clickedFileList(e, index)")
                                    td.name
                                        .material-symbols-outlined.mid.type(v-if="file.name[0] == '#'") folder
                                        .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.html')") html
                                        .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.css')") css
                                        .material-symbols-outlined.mid.type(v-else-if="file.name.includes('.pdf')") picture_as_pdf
                                        .material-symbols-outlined.mid.type(v-else-if="img.includes(file.name.split('.').slice(-1)[0])") image
                                        .material-symbols-outlined.mid.type(v-else-if="vid.includes(file.name.split('.').slice(-1)[0])") movie
                                        .material-symbols-outlined.mid.type(v-else) draft
                                        .overflow {{ file.name[0] === '#' ? file.name.slice(1) : file.name }}
                                    td.center 
                                        .overflow {{ formatBytes(file?.size || 0) }}
                                    td(style="padding-left:40px")
                                        .overflow {{ file?.upl ? new Date(file.upl).toString().split(' ').slice(0, 5).join(' ') : 'Unknown' }}
                                        .menu(@click.stop="(e) => showfileSetting(e, index)")
                                            .material-symbols-outlined.mid.clickable(:class='{"nonClickable": !account.email_verified}') more_vert
                                        #moreVert.hide(ref="moreVert" @click.stop style="--moreVert-right: 30px;top:15px;")
                                            .inner
                                                .more(:class='{"nonClickable": !account.email_verified}')
                                                    .material-symbols-outlined.mid download_2
                                                    span download
                                                .more(:class='{"nonClickable": !account.email_verified}' @click="showDeleteFile = true; moreVert[index-1].classList.remove('show');")
                                                    .material-symbols-outlined.mid delete
                                                    span delete
                                                .more(:class='{"nonClickable": !account.email_verified}' @click="fileInfo = file; copy(selectedFileUrl, index)")
                                                    .material-symbols-outlined.mid file_copy
                                                    span copy link

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
DeleteFileOverlay(v-if="showRemoveAllFiles" :callback='removeAllFiles' title='Delete All Files' @close="showRemoveAllFiles = false;")
    | You sure want to delete all files? The storage will be emptied. 
    br

</template>

<script setup>
import msgOverlay from '@/components/msgOverlay.vue';
import { computed, inject, nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { skapi, account, bodyClick, domain } from '@/main.js';
import { currentService } from '@/data.js';
import UploadFileList from '@/views/Service/Subdomain/UploadFileList.vue';
import DeleteFileOverlay from '@/views/Service/Subdomain/DeleteFileOverlay.vue';
import { launch, currentPage, fetching, searchDir, files, refresh, fileList, dirPage, getPage, selectNone, subdomainInfo, uploading, uploadWholeProgress } from '@/views/Service/Subdomain/SubdomainFetch';
import { img, vid } from '@/views/Service/Subdomain/extensions';

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
let moreVert = ref(null);
let settingIndex = null;
let clickedIndex = null;

let showfileSetting = (e, index) => {
    if(settingIndex == index-1) {
        moreVert.value[index-1].classList.remove('show');
        settingIndex = null;

        return;
    }

    for(let i=0; i<moreVert.value.length; i++) {
        if(moreVert.value[i].className.includes('show')) { 
            moreVert.value[i].classList.remove('show');
        }
    }

    settingIndex = index-1;
    moreVert.value[index-1].classList.add('show');
}

let clickedFileList = (e, index) => {
    let removeIndex = checkedFiles.value.findIndex(id=>id == e.currentTarget.id);

    if(removeIndex >= 0 || clickedIndex == index-1) {
        checkedFiles.value.splice(removeIndex, 1);
        e.currentTarget.classList.remove('clicked');
        clickedIndex = null;

        return;
    }

    checkedFiles.value.push(e.currentTarget.id);
    e.currentTarget.classList.add('clicked');
    clickedIndex = index-1;
}

let copy = (url, index) => {
    let doc = document.createElement('textarea');
    doc.textContent = url;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();
    moreVert.value[index-1].classList.remove('show');
}

let pathArray = computed(() => {
    return searchDir.value.split('/').slice(1);
})
let gotoFolder = index => {
    let path = computedSubdomain.value + "/" + pathArray.value.slice(0, index + 1).join("/");
    launch(path);
}
let refreshCDNRun = ref(true);

watch(() => subdomainInfo.value?.[computedSubdomain.value], (newValue) => {
    if (newValue) {
        if (newValue?.invid) {
            checkCDNStatus();
        }
        else {
            refreshCDNRun.value = false;
        }
    }
}, { immediate: true, deep: true });

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
    }).then(async () => {
        for (let k in dirPage.list) {
            await dirPage.deleteItem(k);
        }
        launch(computedSubdomain.value);
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

let selectedFileUrl = computed(() => {
    if (!fileInfo.value) {
        return '';
    }
    let path = fileInfo.value.path.split(computedSubdomain.value).slice(1).join('');

    if (path[0] === '/') {
        path = path.slice(1);
    }

    let filename = encodeURI(fileInfo.value.name);
    path = path ? encodeURI(path) + '/' + filename : filename;

    return 'https://' + computedSubdomain.value + `.${domain}/` + path;
});

// let downloadFile = (f) => {
//     let path = f.path + '/' + f.name;
//     let pathSplit = path.split('/');
//     path = pathSplit.slice(1).join('/');
//     let endpoint = 'https://' + pathSplit[0] + '.skapi.com/' + path;
//     skapi.getFile(endpoint, { expires: 30 });
// }

let subdomainCallback = async e => {
    if (!e) {
        return;
    }
    currentService.value = e;
    if (currentService.value.subdomain?.[0] === '+') {
        inputSubdomain.value = currentService.value.subdomain.slice(1);
        subdomainState.value = ' ...Pending';
    }
    else if (currentService.value.subdomain?.[0] === '*') {
        inputSubdomain.value = currentService.value.subdomain.slice(1);
        subdomainState.value = ' ...Removing';
    }
    else {
        let subdomain = currentService.value.subdomain;
        if (subdomainState.value === ' ...Pending') { // If previous state was pending, then initialize new page class (launch())
            launch(currentService.value.subdomain, null, true);
        }
        let s = await skapi.getSubdomainInfo(currentService.value.service, { subdomain }).catch(err => err);
        subdomainInfo.value[subdomain] = s;

        inputSubdomain.value = subdomain || '';
        subdomainState.value = ''; // idle
    }
    computedSubdomain.value = inputSubdomain.value;
    modifySudomain.value = false;
}

if (currentService.value.subdomain?.[0] === '+' || currentService.value.subdomain?.[0] === '*') {
    // visited page while pending or removing
    computedSubdomain.value = currentService.value.subdomain.slice(1);

    if (currentService.value.subdomain?.[0] === '+') {
        inputSubdomain.value = currentService.value.subdomain.slice(1);
        subdomainState.value = ' ...Pending';
    }
    else if (currentService.value.subdomain?.[0] === '*') {
        inputSubdomain.value = currentService.value.subdomain.slice(1);
        subdomainState.value = ' ...Removing';
    }

    skapi.updateSubdomain(currentService.value.service, subdomainCallback);
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
    }).then(subdomainCallback).catch(err => {
        console.log({ err });
        alert(err.message);
        throw err;
    });
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
    if(subdomainState.value) {
        return;
    }

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

    let fileLength = 0;

    let trackUpload = track => {
        if (uploading.value === null) {
            track.abort();
        }
        if (track.status === 'upload' && track.currentFile) {
            loadedSize += track.loaded - fileList.value[track.currentFile.name].loaded;
            uploadWholeProgress.value = Math.round(loadedSize / wholeSize * 100);
            fileList.value[track.currentFile.name].progress = track.progress;
            fileList.value[track.currentFile.name].loaded = track.loaded;

            if (track.progress == 100) {
                fileLength ++;
            }
        }

        nextTick(() => {
            let scrollTarget = document.querySelector('.uploadListWrapper .content .listWrap');

            if (scrollTarget.getBoundingClientRect().height < scrollTarget.scrollHeight && fileLength > 4) {
                scrollTarget.scrollTop += 56;
            }
        })
    }

    uploading.value = skapi.uploadHostFiles(formData, {
        serviceId: currentService.value.service,
        progress: trackUpload,
        nestKey: pathArray.value.join('/')
    }).then(async e => {
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

            a {
                // text-decoration: none;
                color: #000;
            }

            .title {
                width: 300px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .buttonWrap {
                text-align: end;

                >div {
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

        .customFile {
            cursor: pointer;

            label {
                display: block;
                width: 105px;
                border: 2px solid #293FE6;
                border-radius: 8px;
                text-align: center;
                color: #293FE6;
                cursor: pointer;

                span {
                    margin-left: 3px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #293FE6;
                }
            }

            #fileName {
                border: 0;
                background-color: unset;
                font-size: 0.8rem;
                color: rgba(0, 0, 0, 0.6);
            }
        }

        .settingWrap {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;

            .setting {
                width: 48%;

                .tit {
                    color: rgba(0, 0, 0, 0.40);
                    font-weight: 500;
                    margin-bottom: 8px;
                }

                .cont {
                    position: relative;
                    width: 100%;
                    height: 44px;
                    // line-height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

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

                        &::before,
                        p {
                            width: calc(100% - 120px);
                        }
                    }

                    p {
                        max-width: 300px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 0.8rem;
                        font-weight: 700;
                        color: rgba(0, 0, 0, 0.6);

                        &:hover {
                            color: rgba(0, 0, 0, 0.8);
                            cursor: default;

                            .link {
                                color: rgba(0, 0, 0, 0.8);
                            }
                        }
                        .link {
                            margin-left: 10px;
                            color: rgba(0, 0, 0, 0.6);
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
                    margin-right: 1rem;
                    cursor: pointer;
                    
                    span {
                        font-size: 0.8rem;
                        font-weight: 500;
                        color: rgba(0,0,0,0.6);
                        margin-left: 8px;
                    }
                }

                .refresh {
                    color: rgba(0,0,0,0.6);
                    // color: #293FE6;
                }
            }
        }

        .filesWrapper {
            position: relative;
            // width: 100%;
            // min-height: 448px;
            height: 450px;
            overflow: hidden;
            // padding: 1.5rem 1.4rem;
            padding: 0 1rem;
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
                        position: relative;
                        font-size: 0.7rem;
                        font-weight: 500;
                        width: calc(100% - 5rem);
                        
                        .path {
                            width: 100%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        &:after {
                            content: attr(data-filetype);
                            position: absolute;
                            left: 100%;
                            top: 0;
                            display: none;
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
    .tableWrap {
        position: relative;
        min-height: 660px;
        overflow-x: auto;

        .noUsers {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;

            h3 {
                color: rgba(0, 0, 0, 0.40);
            }

            p {
                color: rgba(0, 0, 0, 0.40);
                font-weight: 500;
            }
        }

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;

            thead {
                text-align: left;

                tr {
                    height: 40px;

                    th {
                        position: relative;
                        color: rgba(0, 0, 0, 0.40);
                        font-size: 0.7rem;
                        font-weight: 500;
                        padding-left: 20px;

                        &::after {
                            position: absolute;
                            content: '';
                            width: 100%;
                            height: 1px;
                            left: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, 0.1);
                            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
                        }

                        &:first-child {
                            padding-left: 0;
                        }

                        &:last-child {
                            .resizer {
                                display: none;
                            }
                        }

                        &.center {
                            padding: 0;
                            text-align: center;
                        }

                        .resizer {
                            position: absolute;
                            top: 50%;
                            right: 0px;
                            transform: translateY(-50%);
                            width: 4px;
                            height: 20px;
                            background-color: rgba(0, 0, 0, 0.1);
                            cursor: col-resize;

                            &.contrast {
                                background-color: #fff !important;
                            }
                        }

                        .resizable {
                            height: 100px;
                            width: 100px;
                            position: relative;
                        }
                    }
                }
            }

            tbody {
                font-weight: 400;

                tr {
                    cursor: pointer;

                    &:hover {
                        background-color: rgba(41, 63, 230, 0.05);
                    }
                    &.clicked {
                        background-color: rgba(41, 63, 230, 0.10);
                    }
                    &:last-child {
                        td {
                            &::after {
                                display: none;
                            }
                        }
                    }
                }

                td {
                    position: relative;
                    // height: 40px;
                    // line-height: 40px;
                    padding: 8px 20px;
                    color: rgba(0,0,0,0.6);

                    &::after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 1px;
                        left: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.1);
                        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
                    }

                    &.center {
                        padding: 0;
                        text-align: center;
                    }

                    &.name {
                        display: flex;
                    }

                    > div:not(.material-symbols-outlined) {
                        font-size: 0.8rem;
                    }

                    .menu {
                        position: absolute;
                        right: 8px;
                        top: 50%;
                        padding: 4px;
                        text-align: center;
                        border-radius: 50%;
                        transform: translateY(-50%);
                        z-index: 1;

                        &:hover {
                            background-color: rgba(41, 63, 230, 0.10);
                        }
                    }

                    #moreVert {
                        &.hide {
                            display: none;
                        }

                        &.show {
                            display: block;
                        }
                    }

                    .type {
                        padding-right: 20px;
                    }

                    .overflow {
                        position: relative;
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        &::-webkit-scrollbar {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}

@media (max-width:767px) {
    .modifyInputForm.sub {
        .customInput {
            max-width: unset !important;
            width: calc(100% - 50px);
        }
    }
    #subdomain {
        #section {
            .titleWrap {
                flex-wrap: wrap;

                .title {
                    margin-bottom: 1rem;
                }

                .buttonWrap {
                    width: 100%;

                    >div {
                        &.delete {
                            margin-left: 1rem;
                        }

                        span {
                            display: none;
                        }
                    }
                }
            }

            .customFile {
                label {
                    width: unset;
                    border: 0;

                    span {
                        display: none;
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

                    .cont {
                        .material-symbols-outlined {
                            padding-right: 1rem;
                        }

                        &.line {
                            &::before {
                                width: 100%;
                            }
                        }
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

    a,
    span,
    b {
        display: inline-block;
        word-break: break-all;
        user-select: text;

        &.value {
            line-height: 1;
        }
    }
}
</style>