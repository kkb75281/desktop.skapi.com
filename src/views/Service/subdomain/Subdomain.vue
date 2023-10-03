<template lang="pug">
.containerWrap
    .container
        // main title
        h2 {{ subdomainState || (computedSubdomain ? computedSubdomain + '.skapi.com' : 'Subdomain') }}

        // head panel when there is subdomain
        template(v-if="currentService.subdomain")
            .buttonWrap 
                .refresh.clickable(:class="{'nonClickable' : !account.email_verified || subdomainState}")
                    .material-symbols-outlined.mid cached
                    span Refrech CDN
                .delete.clickable(:class="{'nonClickable' : !account.email_verified || subdomainState}" @click='showDeleteSubdomain = true;')
                    .material-symbols-outlined.mid delete
                    span Delete
            .settingWrap 
                .setting
                    h5.tit Subdomain
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
                            h5 {{ computedSubdomain }}
                            .material-symbols-outlined.mid.btn.clickable(:class="{'nonClickable' : !account.email_verified || subdomainState}") edit
                .setting
                    h5.tit HTML file for 404 page
                    .cont 
                        .customFile(:class="{'nonClickable' : !account.email_verified || subdomainState}")
                            p#fileName Upload a file
                            template(v-if="set404PromiseRunning")
                                img.loading(style='position: absolute;right: 1em;top: 8px;' src="@/assets/img/loading.png")
                            template(v-else)
                                label.uploadBtn.btn(for="file404")
                                    .material-symbols-outlined.mid upload
                                    span Upload
                                input#file404(hidden type="file" @change="set404" accept='text/html')

        // head panel when there is NO subdomain
        template(v-else)
            .create 
                h3.tit Register Subdomain
                form.createForm(@submit.prevent='registerSubdomain')
                    .input
                        input#modifySudomain(@input='e=>e.target.setCustomValidity("")' :disabled="subdomainPromiseRunning || null" type="text" placeholder="Name of Subdomain" required minlength='5' pattern='[a-z0-9]+' title='Subdomain should be lowercase alphanumeric.')
                    .btn(:class="{'nonClickable': !account.email_verified}" style='cursor:pointer')
                        template(v-if="subdomainPromiseRunning")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            button(type="submit") Create

    // file part
    .container(v-if="currentService.subdomain")
        .filesHeader
            .filesPathWrap
                .material-symbols-outlined.big.clickable hard_drive
                span /
            .filesButtonWrap
                .material-symbols-outlined.mid.refresh.clickable cached
                .material-symbols-outlined.mid.clickable(:class='{"nonClickable": !checkedFiles.length || !account.email_verified}' @click.stop="!account.email_verified ? false : showEdit = !showEdit") more_vert
                .editMenuWrap(v-if="showEdit" @click.stop)
                    .nest
                        .editMenu(@click="downloadFiles")
                            .material-symbols-outlined.mid download
                            span download   
                        .editMenu(@click="showDeleteFile = true; showEdit = false;")
                            .material-symbols-outlined.mid delete
                            span delete
                .customFile(:class="{'nonClickable' : !account.email_verified}")
                    label.uploadBtn.btn(for="files")
                        .material-symbols-outlined.mid upload
                        span Upload
                    input#files(hidden type="file" @change="showFileList")
        .filesWrapper(
            @dragover="onDragover"
            @drop="onDrop"
            )
            template(v-if="fileList.length == 0")
                //- .noFile
                //-     h2 No Files 
                //-     p You have not uploaded any files
                .dragNdropUpload
                    input(hidden type="file")
                    div
                        .material-symbols-outlined.empty(style="font-size:80px") file_present
                        p Drag and Drop Files or Folders here
            template(v-else-if="fileList.length")
                .fileWrapper
                    .file(v-for="(file, index) in fileList")
                        .customCheckBox
                            input(type="checkbox" :id="index" @change='trackSelectedFiles')
                            label(:for="index")
                                .material-symbols-outlined.mid.check check
                        .material-symbols-outlined.mid.type(v-if="file.type == 'folder'") folder
                        .material-symbols-outlined.mid.type(v-else-if="file.type.includes('html')") html
                        .material-symbols-outlined.mid.type(v-else-if="file.type.includes('css')") css
                        .material-symbols-outlined.mid.type(v-else-if="file.type.includes('pdf')") picture_as_pdf
                        .material-symbols-outlined.mid.type(v-else-if="file.type.includes('image')") image
                        .material-symbols-outlined.mid.type(v-else-if="file.type.includes('video')") movie
                        .material-symbols-outlined.mid.type(v-else="file.type == 'file'") draft
                        .pathWrapper
                            .path {{ file.name }}
UploadFileList(v-if="fileList.length && showUploadFileList" :fileList = "fileList" @close="showUploadFileList = false;")
DeleteFileOverlay(v-if="showDeleteFile" @close="showDeleteFile = false;" title='Delete Files')
    | Are you sure want to delete the files?
    br
DeleteFileOverlay(v-if="showDeleteSubdomain" :callback='removeSubdomain' title='Delete Subdomain' @close="showDeleteSubdomain = false;")
    | Are you sure want to delete your subdomain? All your hosted files will be lost.
    br
</template>

<script setup>
import { computed, inject, nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { skapi, account, bodyClick } from '@/main.js';
import { currentService } from '@/data.js';
import UploadFileList from '@/views/Service/subdomain/UploadFileList.vue';
import DeleteFileOverlay from '@/views/Service/subdomain/DeleteFileOverlay.vue';

let route = useRoute();
let currnetPath = route.path.split('/')[2];
let showUploadFileList = ref(false);
let modifySudomain = ref(false);
let showEdit = ref(false);
let showDeleteFile = ref(false);
let inputSubdomain = ref('');
let errorFile = ref('');
let fileList = ref([]);
let checkedFiles = ref([]);
let showDeleteSubdomain = ref(false);
let subdomainState = ref('');

let computedSubdomain = ref('...')
let subdomainPromiseRunning = ref(false);
watch(modifySudomain, (newValue) => {
    if (newValue) {
        nextTick(() => {
            document.getElementById('modifySudomain').focus();
        })
    }
})
let subdomainCallback = e => {
    console.log({ e });
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
    console.log(e.target.value);
    console.log(e.target.files);
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
            fileName.textContent = fn;
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
let showFileList = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const existingIndex = fileList.value.findIndex((uploadedFile) => uploadedFile.name === file.name);

            if (existingIndex !== -1) {
                const existingFile = fileList.value[existingIndex];
                if (file.lastModified > existingFile.lastModified) {
                    fileList.value.splice(existingIndex, 1, {
                        name: file.name,
                        type: file.type,
                        lastModified: file.lastModified // 파일의 최신 수정 일자 저장
                    });
                }
            } else {
                fileList.value.push({
                    name: file.name,
                    type: file.type,
                    lastModified: file.lastModified // 파일의 수정 일자 저장
                });
            }
        }

        showUploadFileList.value = true;
    } else {
        fileList.value = [];
    }
}
let onDragover = (event) => {
    event.preventDefault()
}
let onDrop = (event) => {
    event.preventDefault()
    showUploadFileList.value = true;
    const files = event.dataTransfer.files;
    console.log(files)
    addFiles(files)
}
let addFiles = async (files) => {
    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        // 중복 파일 확인
        let duplicateIndex = fileList.value.findIndex(
            (uploadedFile) => uploadedFile.name === file.name
        );

        if (duplicateIndex !== -1) {
            // 중복 파일이 존재하는 경우 최신 버전으로 교체
            let existingFile = fileList.value[duplicateIndex];
            if (file.lastModified > existingFile.lastModified) {
                fileList.value.splice(duplicateIndex, 1, file);
            }
        } else {
            // 중복 파일이 없는 경우 파일을 추가
            fileList.value.push(file);
        }
    }
}
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
</script>

<style lang="less" scoped>
.containerWrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    .container {
        position: relative;
        width: 100%;
        padding: 40px;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

        h2 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 40px;
        }

        .buttonWrap {
            position: absolute;
            right: 40px;
            top: 40px;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            * {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;

                span {
                    font-size: 16px;
                    font-weight: 700;
                    margin-left: 12px;
                }
            }

            .refresh {
                color: #293FE6;
            }

            .delete {
                margin-left: 40px;
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
                font-size: 16px;
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
                    font-size: 16px;
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

                    h5 {
                        font-size: 16px;
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
                            font-size: 16px;
                            // color: rgba(0, 0, 0, 0.4);
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
                            font-size: 16px;
                            font-weight: 400;
                        }

                        input {
                            border: 0;
                            width: calc(100% - 87px);
                            padding: 13px;
                            height: 44px;
                            background-color: unset;
                            font-size: 16px;
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
                            font-size: 16px;
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
            margin-bottom: 28px;

            .filesPathWrap {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                color: rgba(0, 0, 0, 0.60);

                span {
                    font-size: 20px;
                    font-weight: 500;
                    margin-left: 13px;
                }
            }

            .filesButtonWrap {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;

                .mid {
                    &:nth-child(2) {
                        margin: 0 25px;
                    }

                    &.refresh {
                        color: #293FE6;
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
                        width: 155px;
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
            }
        }

        .filesWrapper {
            position: relative;
            width: 100%;
            // min-height: 448px;
            height: 450px;
            overflow: hidden;
            padding: 32px 28px;
            border-radius: 8px;
            border: 1px solid rgba(0, 0, 0, 0.10);

            .noFile {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: rgba(0, 0, 0, 0.40);
                text-align: center;

                h2 {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 28px;
                }

                p {
                    font-size: 20px;
                    font-weight: 500;
                }
            }

            .fileWrapper {
                height: 100%;
                overflow: auto;

                .file {
                    width: 100%;
                    height: 40px;
                    padding: 10px;
                    border-radius: 4px;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    color: rgba(0, 0, 0, 0.6);

                    &:nth-child(2n+1) {
                        background: rgba(0, 0, 0, 0.05);
                    }

                    .type {
                        margin-left: 10px;
                        margin-right: 20px;
                    }

                    .pathWrapper {
                        font-size: 14px;
                        font-weight: 500;
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
                    font-size: 20px;
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
                padding: 20px 28px;
                font-size: 20px;
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
                padding: 16px 28px;
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
            padding: 28px;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.10);
            border: 1px solid rgba(0, 0, 0, 0.15);

            .tit {
                color: #293FE6;
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 12px;
            }

            .createForm {
                height: 44px;
                display: flex;
                align-items: center;

                .input {
                    position: relative;
                    width: 600px;
                    margin-right: 20px;

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
                        font-size: 16px;
                        font-weight: 400;
                    }

                    input {
                        border: 0;
                        width: calc(100% - 85px);
                        height: 44px;
                        padding: 13px;
                        background-color: unset;
                        font-size: 16px;
                        font-weight: 400;
                    }
                }

                .btn {
                    button {
                        border: 0;
                        padding: 0 28px;
                        height: 44px;
                        border-radius: 8px;
                        color: #FFF;
                        font-size: 16px;
                        font-weight: 700;
                        background: #293FE6;
                        box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                    }
                }
            }
        }
    }
}

@media (max-width: 1240px) {
    .containerWrap {
        .container {
            .settingWrap {
                .setting {
                    .modifyForm {
                        .input {
                            width: calc(100% - 160px);
                        }

                        .btnWrap {
                            width: 42%;
                        }
                    }
                }
            }
        }
    }
}
</style>