<template lang="pug">
.containerWrap
    .container
        form
            .selectBar
                .customSelect
                    select(:value="searchFor" @change="(e) => { searchFor = e.target.value;}")
                        option(value="timestamp") Date Created
                        option(value="user_id") User ID
                        option(value="email") Email
                        option(value="phone_number") Phone
                        option(value="address") Address
                        option(value="gender") Gender
                        option(value="name") Name
                        option(value="locale") Locale
                        option(value="birthdate") Birth Date
                    .material-symbols-outlined.mid.search.selectArrowDown arrow_drop_down
            .searchBar
                .material-symbols-outlined.mid.search search
                input(v-if="searchFor === 'timestamp'" placeholder="2020-02-09~2023-02-09" v-model="searchText")
                input(v-if="searchFor === 'user_id'" placeholder="Search Users" v-model="searchText")
                input(v-if="searchFor === 'email'" placeholder="someone@email.com" v-model="searchText")
                input(v-if="searchFor === 'phone_number'" placeholder="eg+821234567890" v-model="searchText")
                input(v-if="searchFor === 'address'" placeholder="Address" v-model="searchText")
                input(v-if="searchFor === 'gender'" placeholder="Gender" v-model="searchText")
                input(v-if="searchFor === 'name'" placeholder="Name" v-model="searchText")
                input(v-if="searchFor === 'locale'" placeholder="2 digit country code e.g. KR" v-model="searchText")
                input(v-if="searchFor === 'birthdate'" placeholder="YYYY-MM-DD" v-model="searchText")
                .material-symbols-outlined.mid.delete(v-if="searchText" @click="searchText = ''") close
                .material-symbols-outlined.mid.modalIcon(v-if="searchFor === 'timestamp' && !searchText" @click="showCalendar = !showCalendar") calendar_today
                .material-symbols-outlined.mid.modalIcon(v-if="searchFor === 'locale' && !searchText" @click="showLocale = !showLocale") arrow_drop_down
    .container(style="overflow: hidden;")
        .tableHeader 
            .actions 
                .dropDown(@click.stop="showFilter = !showFilter")
                    span Headers
                    .material-symbols-outlined.mid arrow_drop_down
                .filterWrap(v-if="showFilter" @click.stop)
                    .filter 
                        .customCheckBox
                            input#userID(type="checkbox" :checked="filterOptions.userID" @change="filterOptions.userID = !filterOptions.userID")
                            label(for="userID")
                                .material-symbols-outlined.mid.check check
                        span User ID
                    .filter 
                        .customCheckBox
                            input#name(type="checkbox" :checked="filterOptions.name" @change="filterOptions.name = !filterOptions.name")
                            label(for="name")
                                .material-symbols-outlined.mid.check check
                        span Name
                    .filter 
                        .customCheckBox
                            input#block(type="checkbox" :checked="filterOptions.block" @change="filterOptions.block = !filterOptions.block")
                            label(for="block")
                                .material-symbols-outlined.mid.check check
                        span Block/Unblock
                    .filter 
                        .customCheckBox
                            input#status(type="checkbox" :checked="filterOptions.status" @change="filterOptions.status = !filterOptions.status")
                            label(for="status")
                                .material-symbols-outlined.mid.check check
                        span Status
                    .filter 
                        .customCheckBox
                            input#email(type="checkbox" :checked="filterOptions.email" @change="filterOptions.email = !filterOptions.email")
                            label(for="email")
                                .material-symbols-outlined.mid.check check
                        span Email
                    .filter 
                        .customCheckBox
                            input#address(type="checkbox" :checked="filterOptions.address" @change="filterOptions.address = !filterOptions.address")
                            label(for="address")
                                .material-symbols-outlined.mid.check check
                        span Address
                    .filter 
                        .customCheckBox
                            input#gender(type="checkbox" :checked="filterOptions.gender" @change="filterOptions.gender = !filterOptions.gender")
                            label(for="gender")
                                .material-symbols-outlined.mid.check check
                        span Gender
                    .filter 
                        .customCheckBox
                            input#group(type="checkbox" :checked="filterOptions.group" @change="filterOptions.group = !filterOptions.group")
                            label(for="group")
                                .material-symbols-outlined.mid.check check
                        span Group
                .material-symbols-outlined.mid.refresh.clickable cached
                .material-symbols-outlined.mid.menu.clickable(@click.stop="showUserSetting = !showUserSetting") more_vert
                .userSettingWrap(v-if="showUserSetting" @click.stop)
                    .setting(@click="userBlock")
                        .material-symbols-outlined.mid account_circle_off
                        span block
                    .setting(@click="userUnblock")
                        .material-symbols-outlined.mid account_circle
                        span unblock
                    .setting(@click="userDelete")
                        .material-symbols-outlined.mid delete
                        span delete
            .pagenator 
                .material-symbols-outlined.sml.prevPage.clickable arrow_back_ios
                .material-symbols-outlined.sml.nextPage.clickable arrow_forward_ios
        .tableWrap 
            table#resizeMe.table
                thead
                    tr
                        th(style="width:20px;")
                            .customCheckBox
                                input#allUsers(type="checkbox" value='selectall' @click="selectAll")
                                label(for="allUsers")
                                    .material-symbols-outlined.mid.check check
                        th.th.center(v-if="filterOptions.block" style="width:70px;")
                            | Block
                            .resizer(@mousedown="mousedown")
                        th.th.center(v-if="filterOptions.status" style="width:70px;")
                            | Status
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.userID" style="width:360px;")
                            | User ID
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.name" style="width:160px;")
                            | Name
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.email" style="width:160px;")
                            | Email
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.address" style="width:160px;")
                            | Address
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.gender" style="width:160px;")
                            | Gender
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.group" style="width:160px;")
                            | Group
                            .resizer(@mousedown="mousedown")
                tbody(v-if="users && users.length")
                    tr(v-for="(user, index) in users" :key="index")
                        td(style="min-width:20px")
                            .customCheckBox
                                input(type="checkbox" name="user" :id="user.user_id")
                                label(:for="user.user_id")
                                    .material-symbols-outlined.mid.check check
                        td.center(v-if="filterOptions.block")
                            .material-symbols-outlined.mid.block(v-if="user.group < 0") no_accounts
                            .material-symbols-outlined.mid.unblock(v-else) account_circle
                        td.center(v-if="filterOptions.status")
                            .material-symbols-outlined.mid.enable(v-if="user.group > 0") check_circle
                            .material-symbols-outlined.mid.disable(v-else) cancel
                        td(v-if="filterOptions.userID") 
                            .overflow {{ user.user_id }}
                        td(v-if="filterOptions.name")
                            .overflow {{ user.name }}
                        td(v-if="filterOptions.email")
                            .overflow {{ user.email }}
                        td(v-if="filterOptions.address") 
                            .overflow {{ user.address }}
                        td(v-if="filterOptions.gender")
                            .overflow {{ user.gender }}
                        td(v-if="filterOptions.group")
                            .overflow {{ user.group }}
                    tr(v-if="users.length < 10" v-for="i in (10 - users.length)" :key="'extra-' + i")
            .noUsers(v-if="users === null")
                img.loading(src="@/assets/img/loading.png" style='filter: grayscale(100%);')
            .noUsers(v-else-if="!users.length")
                h2 No Users
                p There are no users matching your search terms.
    Calendar(v-if="showCalendar" @dateClicked="handledateClick")
    LocaleSelector(v-if="showLocale" @countryClicked="handleCountryClick")
    </template>
    
<script setup>
import { bodyClick } from '@/main.js';
import { currentService, serviceUsers } from '@/data.js';
import { skapi } from '@/main.js';
import { computed, onMounted, ref } from 'vue';
import Calendar from '@/components/Calendar.vue';
import LocaleSelector from '@/components/LocaleSelector.vue';

import Pager from '@/skapi-extensions/js/pager.js';
const worker = new Worker(
    new URL('@/skapi-extensions/js/pager_worker.js', import.meta.url),
    { type: 'module' }
);

let serviceId = currentService.value.service;
if (!serviceUsers?.[serviceId]) {
    serviceUsers[serviceId] = {
        default: new Pager(worker, {
            id: 'user_id',
            sortBy: 'timestamp',
            order: 'desc',
            resultsPerPage: 10
        })
    }
}

let userPage = serviceUsers[serviceId].default;
let users = ref(null);
let firstPage = userPage.getPage(1).list;

if (firstPage.length) {
    users.value = firstPage;
}
else {
    skapi.getUsers({
        service: serviceId,
        searchFor: 'timestamp',
        condition: '>',
        value: 0
    }).then(u => {
        userPage.insertItems(u.list).then(_ => {
            let currPage = userPage.getPage(1).list;
            users.value = currPage;
        });
    });
}

bodyClick.showUserSetting = () => {
    showUserSetting.value = false;
}
bodyClick.showFilter = () => {
    showFilter.value = false;
}

let searchText = ref('');
// let searchFor = ref('user_id');
let searchFor = ref('timestamp');
let showFilter = ref(false);
let showCalendar = ref(false);
let showLocale = ref(false);
let showUserSetting = ref(false);
let filterOptions = ref({
    userID: true,
    name: true,
    block: true,
    status: true,
    email: true,
    address: false,
    gender: false,
    group: false,
})
let maxTrCount = 10;
let selectAll = (e) => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked
    })
}
let userBlock = () => {
    let checkedUsers = document.querySelectorAll('input[name="user"]:checked');
    checkedUsers.forEach(checkedUser => {
        users.value[checkedUser.id].block = 0;
        checkedUser.checked = false;
    })
    allUsers.checked = false;
    showUserSetting.value = false;
}
let userUnblock = () => {
    let checkedUsers = document.querySelectorAll('input[name="user"]:checked');
    checkedUsers.forEach(checkedUser => {
        users.value[checkedUser.id].block = 1;
        checkedUser.checked = false;
    })
    allUsers.checked = false;
    showUserSetting.value = false;
}
let userDelete = () => {
    let checkedUsers = document.querySelectorAll('input[name="user"]:checked');
    checkedUsers.forEach(checkedUser => {
        checkedUser.checked = false;

        let to_delete = null;
        for (let idx = 0; users.value.length > idx; idx++) {
            if (checkedUser.id === users.value[idx].user_id) {
                to_delete = idx;
                break;
            }
        }
        if (to_delete !== null) {
            users.value.splice(to_delete, 1);
        }
    })
    allUsers.checked = false;
    showUserSetting.value = false;
}
let handleCountryClick = (key) => {
    searchText.value = key;
    showLocale.value = false;
}
let handledateClick = (startDate, endDate) => {
    if (startDate == null && endDate == null) {
        searchText.value = ''
        showCalendar.value = true;
    } else {
        searchText.value = startDate + '~' + endDate;
        showCalendar.value = false;
    }
}
let trCount = computed(() => {
    // return Math.max(0, maxTrCount - users.value.length);
});

// table resize
let prevX, prevW, nextW = 0;
let prevCol, nextCol = null;
let mouseMoveHandler = function (e) {
    let ths = document.getElementsByTagName('th');
    let thsArr = Array.from(ths);
    let dx = e.clientX - prevX;
    let widthSum = 0;

    thsArr.forEach((e) => {
        widthSum += e.offsetWidth - 2;
    });

    if ((widthSum < window.innerWidth || dx < 0) && (prevW + dx > 200 && nextW - dx > 200)) {
        prevCol.style.width = `${prevW + dx}px`;
        nextCol.style.width = `${nextW - dx}px`;
    }
};

let mousedown = function (e) {
    prevCol = e.target.parentNode;
    nextCol = prevCol.nextSibling;

    let prevStyles = window.getComputedStyle(e.target.parentNode);
    let nextStyles = window.getComputedStyle(prevCol.nextSibling);

    prevX = e.clientX;
    prevW = parseInt(prevStyles.width, 10);
    nextW = parseInt(nextStyles.width, 10);
    document.addEventListener('mousemove', mouseMoveHandler);
};

document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
});

onMounted(() => {
    let overflows = document.querySelectorAll('.overflow');
    overflows.forEach(overflow => {
        let scrollWidth = overflow.scrollWidth;
        if (scrollWidth > 120) {
            overflow.parentNode.classList.add('ellipsis');
        }
    });
})
</script>
    
<style lang="less" scoped>
.containerWrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    #calendar,
    #localeSelector {
        position: absolute;
        right: 41px;
        top: 80px;
    }

    .container {
        width: 100%;
        padding: 28px 40px;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));
    }

    form {
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
                cursor: pointer;
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

            .modalIcon {
                position: absolute;
                right: 16px;
                top: 10px;
                color: rgba(0, 0, 0, 0.8);
                cursor: pointer;
            }
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

            * {
                cursor: pointer;
            }

            .dropDown {
                display: flex;
                align-items: center;
                font-size: 16px;
                font-weight: 500;
                margin-right: 20px;
                color: rgba(0, 0, 0, 0.6);
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

                .filter {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                    color: rgba(0, 0, 0, 0.80);

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }

            .userSettingWrap {
                position: absolute;
                right: -100px;
                bottom: -162px;
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

                    &:last-child {
                        margin-bottom: 0;
                    }

                    span {
                        margin-left: 12px;
                    }
                }
            }

            .refresh {
                margin-right: 20px;
            }
        }

        .pagenator {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            .page {
                color: rgba(0, 0, 0, 0.60);
                margin-right: 10px;
            }

            .prevPage {
                margin-right: 20px;
            }
        }
    }

    .tableWrap {
        position: relative;
        min-height: 660px;
        margin: 40px 0;
        overflow-x: auto;

        .noUsers {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
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
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;

            .customCheckBox {
                label {
                    &::before {
                        margin-right: 0;
                    }
                }
            }

            thead {
                text-align: left;

                tr {
                    height: 60px;

                    th {
                        position: relative;
                        color: rgba(0, 0, 0, 0.40);
                        font-size: 16px;
                        font-weight: 700;
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
                            user-select: none;

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

                td {
                    position: relative;
                    height: 60px;
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

                    &.center {
                        padding: 0;
                        text-align: center;
                    }

                    .block {
                        color: rgba(0, 0, 0, 0.4);
                    }

                    .enable {
                        color: rgba(90, 216, 88, 1);
                    }

                    .disable {
                        color: rgba(240, 78, 78, 1);
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
</style>