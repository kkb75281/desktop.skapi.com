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

export function normalizeRecord(record) {
    function base_decode(chars) {
        let charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return chars.split('').reverse().reduce((prev, curr, i) =>
            prev + (charset.indexOf(curr) * (62 ** i)), 0);
    }

    const output = {
        user_id: '',
        record_id: '',
        updated: 0,
        uploaded: 0,
        table: {
            name: '',
            access_group: 0
        },
        reference: {
            reference_limit: null,
            allow_multiple_reference: true,
            referenced_count: 0
        },
        ip: '',
        bin: []
    };

    const keys = {
        'ip': (r) => {
            if (r.slice(-1) === 'R') {
                output.readonly = true;
                r = r.slice(0, -1);
            }
            else {
                output.readonly = false;
            }
            output.ip = r;
        },
        'rec': (r) => {
            if (!r) return;
            output.record_id = r;
            let base62timestamp = r.substring(0, r.length - 9); // id: [base62 timestamp][random 5 char][suid 4 char]
            let uploaded = base_decode(base62timestamp);
            output.uploaded = uploaded;
        },
        'usr': (r) => {
            output.user_id = r;
        },
        'tbl': (r) => {
            if (!r) return;
            let rSplit = r.split('/');
            // table/service/group(** | group)/[subscription(user id)/group(00 - 99)]/[tag]
            output.table.name = rSplit[0];
            output.table.access_group = rSplit[2] == '**' ? 'private' : parseInt(rSplit[2]);
            if (rSplit?.[3]) {
                output.table.subscription_group = parseInt(rSplit[4]);
            }
        },
        'usr_tbl': (r) => {
            // user-id/table/service/group(** | group)[/subscription(user id)/group(00 - 99)][/tag]
            let rSplit = r.split('/');
            output.user_id = rSplit[0];
            output.table.name = rSplit[1];
            output.table.access_group = rSplit[3] == '**' ? 'private' : parseInt(rSplit[3]);
            if (rSplit?.[4]) {
                output.table.subscription_group = parseInt(rSplit[4]);
            }
        },
        'idx': (r) => {
            if (!r) return;
            let rSplit = r.split('!');
            let name = rSplit.splice(0, 1)[0];
            let value = normalizeTypedString('!' + rSplit.join('!'));
            output.index = {
                name,
                value
            };
        },
        'ref': (r) => {
            if (!r) return;
            output.reference.record_id = r.split('/')[0];
        },
        'tags': (r) => {
            output.tags = r;
        },
        'upd': (r) => {
            output.updated = r;
        },
        'acpt_mrf': (r) => {
            output.reference.allow_multiple_reference = r;
        },
        'ref_limt': (r) => {
            output.reference.reference_limit = r;
        },
        'rfd': (r) => {
            output.reference.referenced_count = r;
        },
        'bin': (r) => {
            output.bin = r;
        },
        'data': (r) => {
            let data = r;
            if (r === '!D%{}') {
                data = {};
            }
            else if (r === '!L%[]') {
                data = [];
            }
            output.data = data;
        }
    };

    if (record.record_id) {
        // bypass already normalized records
        return record;
    }

    for (let k in keys) {
        if (record.hasOwnProperty(k)) {
            keys[k](record[k]);
        }
    }

    return output
}

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