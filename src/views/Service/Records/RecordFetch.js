import { currentService } from '@/data.js';

import Pager from '@/skapi-extensions/js/pager.js';
import { ref, watch, nextTick } from 'vue';
import { skapi } from '@/main.js';

export let serviceRecords = {};

const worker = new Worker(
    new URL('@/skapi-extensions/js/pager_worker.js', import.meta.url),
    { type: 'module' }
);

export let records = ref(null);
export let recordPage = null;
export let currentPage = ref(1);
export let maxPage = ref(1);
export let fetching = ref(false);
export let searchInfo = ref(null);

watch(currentPage, (page) => {
    selectNone();
    getPage(page);
});

let defaultFetchParams = null;

export let fetchParams = defaultFetchParams

export let getPage = (p) => {
    let res = recordPage.getPage(p);
    recordPage.maxPage = res.maxPage;
    records.value = res.list;
    maxPage.value = res.maxPage;
}

export let refresh = (params) => {
    searchInfo.value = null;

    if (fetching.value) {
        return;
    }

    if (params) {
        fetchParams = params;
    }
    else {
        fetchParams = defaultFetchParams;
    }

    records.value = null;
    let reserved_index = {
        $uploaded: 'record_id',
        $updated: 'updated',
        $referenced_count: 'referenced_count',
        $user_id: 'record_id'
    }

    let targetIndex = 'record_id';

    if (fetchParams?.index?.name) {
        if (reserved_index[fetchParams.index.name]) {
            targetIndex = reserved_index[fetchParams.index.name];
        }
        else {
            targetIndex = 'index.value';
        }
    }

    serviceRecords[currentService.value.service] = new Pager(worker, {
        id: 'record_id',
        sortBy: targetIndex,
        order: fetchParams === null || fetchParams?.index?.condition?.includes('<') ? 'desc' : 'asc',
        resultsPerPage: 10
    })

    recordPage = serviceRecords[currentService.value.service];

    fetching.value = true;
    skapi.getRecords(fetchParams || {
        service: currentService.value.service
    }, { limit: 50 }).then(u => {
        if (u.endOfList) {
            recordPage.endOfList = true;
        }
        u.list = u.list.map((record) => {
            if (record.bin) {
                for (let k in record.bin) {
                    for (let i of record.bin[k]) {
                        delete i.getFile;
                    }
                }
            }
            return record;
        });
        recordPage.insertItems(u.list).then(_ => {
            // to avoid watch trigger
            if (currentPage.value === 1) {
                getPage(1);
            }
            else {
                currentPage.value = 1;
            }
        }).finally(() => {
            fetching.value = false;
        });
    });
}

export let launch = () => {
    if (!serviceRecords?.[currentService.value.service]) {
        refresh();
    }
    else {
        recordPage = serviceRecords[currentService.value.service];
        getPage(currentPage.value);
    }
}

export let selectNone = () => {
    // page 넘길때 사용
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}
export let nextPage = (dir = true) => {
    if (!dir) {
        currentPage.value--;
    }
    else {
        if (currentPage.value === maxPage.value && !recordPage.endOfList) {
            records.value = null;
            fetching.value = true;
            skapi.getRecords(fetchParams || {
                service: currentService.value.service
            }, { fetchMore: true, limit: 50 }).then(u => {
                if (u.endOfList) {
                    recordPage.endOfList = true;
                }
                u.list = u.list.map((record) => {
                    if (record.bin) {
                        for (let k in record.bin) {
                            for (let i of record.bin[k]) {
                                delete i.getFile;
                            }
                        }
                    }
                    return record;
                });
                recordPage.insertItems(u.list).then(_ => {
                    currentPage.value++;
                    fetching.value = false;
                });
            });
        }

        else {
            currentPage.value++;
        }
    }
    nextTick(selectNone);
}
export let timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        let val = Math.floor(interval);
        return val + " year" + (val > 1 ? 's' : '');
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        let val = Math.floor(interval);
        return val + " month" + (val > 1 ? 's' : '');
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " h";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " m";
    }
    return Math.floor(seconds) + " s";
}