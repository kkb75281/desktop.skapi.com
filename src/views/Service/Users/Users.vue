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
                .material-symbols-outlined.mid.cal(v-if="searchFor === 'timestamp'" @click="showCalendar = !showCalendar") calendar_today
    .container(style="overflow: hidden;")
        .tableHeader 
            .actions 
                .dropDown(@click="showFilter = !showFilter")
                    span Headers
                    .material-symbols-outlined.mid arrow_drop_down
                .filterWrap(v-if="showFilter")
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
                .material-symbols-outlined.mid.menu.clickable(@click="showUserSetting = !showUserSetting") more_vert
                .userSettingWrap(v-if="showUserSetting")
                    .setting
                        .material-symbols-outlined.mid account_circle_off
                        span block
                    .setting
                        .material-symbols-outlined.mid account_circle
                        span unblock
                    .setting
                        .material-symbols-outlined.mid delete
                        span delete
            .pagenator 
                .material-symbols-outlined.sml.prevPage.clickable arrow_back_ios
                .material-symbols-outlined.sml.nextPage.clickable arrow_forward_ios
        .tableWrap
            table
                //- colgroup
                //-     col(width="6%")
                //-     col(width="7%")
                //-     col(width="12%")
                //-     col(width="25%")
                //-     col(width="25%")
                //-     col(width="25%")
                thead
                    tr
                        th
                            .customCheckBox
                                input#allUsers(type="checkbox")
                                label(for="allUsers")
                                    .material-symbols-outlined.mid.check check
                        th.center(v-if="filterOptions.block") Block
                        th.center(v-if="filterOptions.status") Status
                        th(v-if="filterOptions.userID") User ID
                        th(v-if="filterOptions.name") Name
                        th(v-if="filterOptions.email") Email
                        th(v-if="filterOptions.address") Address
                        th(v-if="filterOptions.gender") Gender
                        th(v-if="filterOptions.group") Group
                tbody(v-if="users.length")
                    tr(v-for="(user, index) in users" :key="index")
                        td(style="min-width:20px")
                            .customCheckBox
                                input(type="checkbox" v-bind:id="index")
                                label(:for="index")
                                    .material-symbols-outlined.mid.check check
                        td.center(v-if="filterOptions.block" style="min-width:80px")
                            .material-symbols-outlined.mid(v-if="user.block == 1") account_circle_off
                            .material-symbols-outlined.mid(v-else) account_circle
                        td.center(v-if="filterOptions.status" style="min-width:80px")
                            .material-symbols-outlined.mid(v-if="user.status == 1") check_circle
                            .material-symbols-outlined.mid(v-else) cancel
                        td(v-if="filterOptions.userID" style="min-width:120px")
                            .overflow {{ user.user_id }}
                        td(v-if="filterOptions.name" style="min-width:100px")
                            .overflow {{ user.name }}
                        td(v-if="filterOptions.email" style="min-width:100px")
                            .overflow {{ user.email }}
                        td(v-if="filterOptions.address" style="min-width:80px")
                            .overflow {{ user.address }}
                        td(v-if="filterOptions.gender" style="min-width:80px")
                            .overflow {{ user.gender }}
                        td(v-if="filterOptions.group" style="min-width:80px")
                            .overflow {{ user.group }}
                    tr(v-for="i in trCount" :key="'extra-' + i")
            .noUsers(v-if="!users.length")
                h2 No Users
                p There are no users matching your search terms.
    Calendar(v-if="showCalendar" :startDate = "startDate" :endDate = "endDate")
    //- LocaleSelector(v-if="showLocale")
</template>

<script setup>
import { services, users } from '@/data.js';
import { computed, onMounted, ref } from 'vue';
import Calendar from '@/components/Calendar.vue';
// import LocaleSelector from '@/components/LocaleSelector.vue';

let startDate = ref(null);
let endDate = ref(null);
let searchText = ref('');
let searchFor = ref('user_id');
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
let trCount = computed(() => {
    return Math.max(0, maxTrCount - users.length);
});
</script>

<style lang="less" scoped>
.containerWrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    #calendar {
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
                color: rgba(0,0,0,0.4);
            }
            .delete {
                position: absolute;
                right: 16px;
                top: 10px;
                cursor: pointer;
            }
            .cal {
                position: absolute;
                right: 16px;
                top: 10px;
                color: rgba(0,0,0,0.8);
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
                color: rgba(0,0,0,0.6);
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
            // table-layout: fixed;

            tr {
                height: 60px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.10);
                filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.06));  
            }
            td, th {
                padding-right: 15px;
                &.center {
                    text-align: center;
                }
                .overflow {
                    width: 150px;
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

                .customCheckBox {
                    label {
                        &::before {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>