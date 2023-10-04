import { currentService } from '@/data.js';

import Pager from '@/skapi-extensions/js/pager.js';
import { ref, watch, nextTick } from 'vue';
import { skapi } from '@/main.js';

export let serviceHost = {};

const worker = new Worker(
    new URL('@/skapi-extensions/js/pager_worker.js', import.meta.url),
    { type: 'module' }
);

export let files = ref([]);
export let dirPage = null;
export let currentPage = ref(1);
export let maxPage = ref(1);
export let fetching = ref(false);
export let searchDir = ref('');

watch(currentPage, (page) => {
    selectNone();
    getPage(page);
});

export let getPage = (p, cb) => {
    let res = dirPage.getPage(p);
    dirPage.maxPage = res.maxPage;
    files.value.push(...res.list);
    maxPage.value = res.maxPage;
    if(cb) {
        cb(files.value);
    }
}

export let refresh = (dir, cb) => {
    if (!dir) {
        return;
    }

    if (fetching.value) {
        return;
    }

    files.value = [];

    serviceHost[dir] = new Pager(worker, {
        id: 'name',
        sortBy: 'name',
        order: 'asc',
        resultsPerPage: 10
    })

    searchDir.value = dir;
    dirPage = serviceHost[dir];

    fetching.value = true;
    skapi.listHostDirectory({ dir }, { limit: 50 }).then(u => {
        if (u.endOfList) {
            dirPage.endOfList = true;
        }

        dirPage.insertItems(u.list).then(_ => {
            // to avoid watch trigger
            if (currentPage.value === 1) {
                getPage(1);
            }
            else {
                currentPage.value = 1;
            }
            if(cb) {
                cb(files.value);
            }
        }).finally(() => {
            fetching.value = false;
        });
    });
}

export let launch = (dir, cb) => {
    if (!serviceHost?.[dir]) {
        refresh(dir, cb);
    }
    else {
        dirPage = serviceHost[dir];
        files.value = [];
        if (currentPage.value !== 1) {
            currentPage.value = 1;
            if(cb) {
                cb(files.value);
            }
        } else {
            selectNone();
            getPage(1, cb);
        }
    }
}

export let selectNone = () => {
    // page 넘길때 사용
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}
export let nextPage = (direction = true) => {
    // dir is direction. true is next, false is prev
    if (!direction) {
        currentPage.value--;
    }
    else {
        if (currentPage.value === maxPage.value && !dirPage.endOfList) {
            // files.value = null;
            fetching.value = true;
            skapi.listHostDirectory({ dir: searchDir.value }, { fetchMore: true, limit: 50 }).then(u => {
                if (u.endOfList) {
                    dirPage.endOfList = true;
                }
                dirPage.insertItems(u.list).then(_ => {
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