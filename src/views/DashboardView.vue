<template lang="pug">
main#dashboard
    .searchCreateButtons
        .searchBar 
            form
                .customSelect
                    select(:value="searchFor")
                        option(value="service") Name of Service
                        option(value="locale") Locale
                        option(value="timestamp") Date Created
                    .material-symbols-outlined.mid.selectArrowDown arrow_drop_down
                .material-symbols-outlined.mid.search search
                input#searchInput(v-if="searchFor === 'service'" placeholder="Search Name of Service" v-model="searchText")
                input#searchInput(v-else-if="searchFor === 'locale'" placeholder="2 digit country code e.g. KR" v-model="searchText")
                input#searchInput(v-else-if="searchFor === 'timestamp'" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText")
        .createButton(:class="{'nonClickable' : !account?.email_verified}")
            .material-symbols-outlined.mid add
            span Create new service
    
    .tableWrap
        table#resizeMe.table
            thead
                tr
                    th.th.center(style="width:102px;padding-left:50px;")
                        | Status
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:168px;")
                        | Name of Service
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:140px;")
                        | Locale
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:160px;")
                        | Cors
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:168px;")
                        | Date Created
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:140px;")
                        | Users
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:168px;")
                        | Cloud Storage
                        .resizer(@mousedown="mousedown")
                    th.th(style="width:240px;")
                        | Datebase
                        .resizer(@mousedown="mousedown")
            tbody
                template(v-if="services.length" v-for="(service, index) in services")
                    tr(ref="tr" :class="{'active' : showInfo}" @click="(e) => goServiceDashboard(e, service)")
                        td.center(style="padding-left:50px;")
                            .material-symbols-outlined.mid.downArrow(ref="downArrow" @click.stop="(e) => showServiceInfo(e, index)") arrow_forward_ios
                            .serviceActive(:class="{'active': service.active == 1 }")
                                .material-symbols-outlined.sml.power power_settings_new
                        td
                            .overflow {{ service.name }}
                        td
                            .overflow {{ regions?.[service.region] || service.region }}
                        td
                            .overflow {{ service.cors }}
                        td.center {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                        td.center
                            .percent(:class='{"green": 0 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 51, "orange": 51 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 81, "red": 81 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 101}') {{ Math.ceil(service.users/100*100) + '%' }}
                        td.center
                            .percent(:class='{"green": 0 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 51, "orange": 51 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 81, "red": 81 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 101}') {{ Math.ceil(service.users/100*100) + '%' }}
                        td
                            .percent(:class='{"green": 0 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 51, "orange": 51 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 81, "red": 81 <= Math.ceil(service.users/100*100) && Math.ceil(service.users/100*100) < 101}') {{ Math.ceil(service.users/100*100) + '%' }}
                            .menu(@click.stop="(e) => showPlanSetting(e, index)" :class='{"nonClickable": !account.email_verified}')
                                .material-symbols-outlined.mid.clickable more_vert
                            #moreVert.hide(ref="moreVert" @click.stop style="--moreVert-right: 20px; top:44px;")
                                .inner
                                    .more(style="width:unset;white-space:nowrap;") Downgrade Plan
                                    .more Upgrade Plan
                                    .more Stop Plan
                                    .more Cancel Plan
                    tr.cont(ref="trCont" :class="{'active' : showInfo}")
                        td(colspan="8")
                            br
                            .info
                                h6 Name
                                span {{ service.name }}
                            .info 
                                h6 CORS 
                                span {{ service.cors }}
                            br
                            .info.inline
                                h6 # of Users 
                                span {{ service.cors }}
                            .info.inline 
                                h6 Database Used
                                span {{ service?.info?.database + '/100' }}
                            .info.inline 
                                h6 Subscription Plan
                                span asdasd
                            .info.inline 
                                h6 Hosting Strorage
                                span {{ service.users + '/100' }}
                            br
                            br
                            .info.inline 
                                h6 Locale
                                span {{ regions?.[service.region] || service.region }}
                            .info.inline 
                                h6 Cloud Storage Used
                                span {{ service?.info?.cloud + '/100' }}
                            .info.inline 
                                h6 Date Created
                                span {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                            .info.inline 
                                h6 Subdomain
                                span {{ service.subdomain }}
                            .material-symbols-outlined.mid.upArrow(ref="upArrow" @click.stop="(e) => showServiceInfo(e, index)") arrow_forward_ios
                tr.loadingWrap(v-else-if="serviceFetching")
                    td(colspan="8" style="text-align:center; padding-top:20px;")
                        img.loading(src="@/assets/img/loading.png")
        .noServices(v-if="!services.length")
            //- h3 No Users
            //- br
            //- p There are no users matching your search terms.
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { skapi, account } from '@/main.js';
import { services, serviceFetching } from '@/data.js';

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})

const router = useRouter();
let searchFor = ref('service');
let searchText = ref('');
let showInfo = ref(false);
let tr = ref(null);
let moreVert = ref(null);
let downArrow = ref(null);
let upArrow = ref(null);
let trCont = ref(null);
let currnetServiceIndex = null;
let currnetPlanIndex = null;

let showServiceInfo = (e, index) => {
    if(currnetServiceIndex == index) {
        downArrow.value[index].classList.remove('hide');
        trCont.value[index].classList.remove('active');
        currnetServiceIndex = null;

        return;
    } else if(e.target.classList.contains('upArrow')) {
        downArrow.value[index].classList.remove('hide');
        trCont.value[index].classList.remove('active');
        currnetServiceIndex = null;

        return;
    }

    currnetServiceIndex = index;
    downArrow.value[index].classList.add('hide');
    trCont.value[index].classList.add('active');
}

let showPlanSetting = (e, index) => {
    if(currnetPlanIndex == index) {
        moreVert.value[index].classList.remove('show');
        currnetPlanIndex = null;

        return;
    }

    for(let i=0; i<moreVert.value.length; i++) {
        if(moreVert.value[i].className.includes('show')) { 
            moreVert.value[i].classList.remove('show');
        }
    }

    currnetPlanIndex = index;
    moreVert.value[index].classList.add('show');
}

let goServiceDashboard = (e, service) => {
    e.currentTarget.classList.add('active');

    setTimeout(() => {
        router.push('/dashboard/' + service.service);
    }, 500);
}

// table resize
let prevX, prevW, nextW = 0;
let prevCol, nextCol = null;
let mouseMoveHandler = function (e) {
    // let ths = document.getElementsByTagName('th');
    // let thsArr = Array.from(ths);
    // let dx = e.clientX - prevX;
    // let widthSum = 0;

    // thsArr.forEach((e) => {
    //     widthSum += e.offsetWidth - 2;
    // });

    // if ((widthSum < window.innerWidth || dx < 0) && (prevW + dx > 200 && nextW - dx > 200)) {
    //     prevCol.style.width = `${prevW + dx}px`;
    //     nextCol.style.width = `${nextW - dx}px`;
    // }
    let dx = e.clientX - prevX;

    // 현재 이동 중인 컬럼의 너비 변경
    let newPrevWidth = prevW + dx;

    // 최소 너비
    const minColumnWidth = 100;
    if (newPrevWidth < minColumnWidth) {
        return;
    }

    // 현재 이동 중인 컬럼만 위치 이동
    prevCol.style.width = `${newPrevWidth}px`;
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

// update services
if (serviceFetching.value) {
    serviceFetching.value.then(() => {
        services.value = skapi.serviceMap.map(sid => skapi.services[sid]).reverse();
        for(let i=0; i<services.value.length; i++) {
            skapi.storageInformation(services.value[i].service).then(info => {
                services.value[i].info = info;
            })
        }
        console.log(services.value)
    })
}
else {
    services.value = skapi.serviceMap.map(sid => skapi.services[sid]).reverse();
    for(let i=0; i<services.value.length; i++) {
        skapi.storageInformation(services.value[i].service).then(info => {
            services.value[i].info = info;
        })
    }
    console.log(services.value)
}

let create = ref(false);
let createService = () => {
    if (account?.value.email_verified) {
        create.value = true;
        nextTick(() => {
            document.getElementById('serviceName').focus();
        });
    } else {
        return false;
    }
}
let newServiceName = '';
let promiseRunning = ref(false);
let addService = () => {
    promiseRunning.value = true;
    services.value.unshift({
        service: '',
        name: newServiceName,
        created_locale: '...',
        timestamp: '...',
        cors: '...',
        pending: true,
        active: 0
    });
    skapi.createService({ name: newServiceName })
        .then(s => {
            skapi.insertService(s);
            services.value[0] = s;
            create.value = false;
        }).catch(err => {
            alert(err.message);
            services.value.shift();
        })
        .finally(_ => promiseRunning.value = false)
}

const regions = {
    'us-west-2': 'US',
    'ap-northeast-2': 'KR',
    'ap-southeast-1': 'SG',
    'ap-south-1': 'IN'
}

skapi.getProfile().then(u => {
    if (u.misc === 'kdu') {
        skapi.consumeTicket({ ticket_id: 'kdu' }).catch(err => console.log({ err })).finally(() => {
            skapi.updateProfile({ misc: '' }).then(up => {
                account.value = up;
            });
        });
    }
}).catch(err => err);
</script>

<style lang="less" scoped>
#dashboard {
    position: relative;
    margin-top: 3.4rem;
    padding: 0 2rem;

    .searchCreateButtons {
        height: 44px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;;

        .searchBar {
            width: 400px;
            height: 100%;
            line-height: 40px;
            padding: 0 17px;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.05);

            .customSelect {
                display: inline-block;
                width: 150px;
            }
            .search {
                padding: 0 13px;
                border-left: 1px solid rgba(0,0,0,0.25);
                color: rgba(0,0,0,0.4);
            }
            #searchInput {
                width: 165px;
                height: 20px;
                border: 0;
                background-color: unset;
            }
        }
        .createButton {
            height: 100%;
            line-height: 40px;
            padding: 0 28px;
            border-radius: 8px;
            background-color: #293FE6;
            color: #fff;
            cursor: pointer;

            * {
                font-size: 16px;
                font-weight: 700;
            }
        }
    }

    .tableWrap {
        position: relative;
        min-height: calc(100vh - 3.4rem - 160px);
        margin-top: 16px;
        overflow-x: auto;

        .noServices {
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
                position: sticky;
                top: 0px;
                background-color: #fafafa;
                z-index: 10;
                text-align: left;

                tr {
                    height: 60px;

                    th {
                        position: relative;
                        color: rgba(0, 0, 0, 0.40);
                        font-size: 0.7rem;
                        font-weight: 500;
                        padding-left: 40px;

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
                overflow-y: auto;
                font-weight: 400;

                tr {
                    &:not(.cont, .active, .loadingWrap):hover {
                        background-color: rgba(41,63,230,0.05);
                        cursor: pointer;
                    }
                    &.active {
                        background-color: rgba(41, 63, 230, 0.10);
                    }
                    &.cont {
                        height: 250px;
                        background-color: rgba(0, 0, 0, 0.02);
                        display: none;

                        &.active {
                            display: table-row;
                        }

                        td {
                            padding: 0 75px;
                        }

                        .info {
                            display: block;
                            margin-bottom: 10px;

                            &.inline {
                                display: inline-block;
                                width: 25%;

                                h6 {
                                    display: block;
                                    margin-bottom: 8px;
                                }
                            }
                            h6 {
                                display: inline-block;
                                font-weight: 400;
                                color: rgba(0, 0, 0, 0.40);
                                margin-right: 10px;
                            }
                            span {
                                color: rgba(0, 0, 0, 0.60);
                            }
                        }
                        .upArrow {
                            position: absolute;
                            left: -7px;
                            bottom: 0;
                            rotate: 270deg;
                            transform-origin: top;
                            font-size: 24px;
                            padding: 10px;
                            border-radius: 50%;
                            color: rgba(0,0,0,0.4);
                            opacity: 1;
                            cursor: pointer;

                            &:hover {
                                background-color: rgba(41, 63, 230, 0.10);
                            }
                            &.hide {
                                opacity: 0;
                            }
                        }
                    }
                    &.loadingWrap {
                        td {
                            &::after {
                                display: none !important;
                            }
                        }
                    }
                }

                td {
                    position: relative;
                    height: 60px;
                    padding: 0 20px;
                    font-size: 0.8rem;

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
                        font-size: 0.8rem;
                    }

                    .percent {
                        display: inline-block;
                        padding: 0px 12px;
                        border-radius: 4px;
                        box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;

                        &.green {
                            background-color: #52D687;
                        }
                        &.orange {
                            background-color: #FCA642;
                        }
                        &.red {
                            background-color: #F04E4E;
                        }
                    }

                    .downArrow {
                        position: absolute;
                        left: 16px;
                        top: 50%;
                        padding: 10px;
                        border-radius: 50%;
                        transform: translateY(-50%);
                        font-size: 24px;
                        color: rgba(0,0,0,0.4);
                        rotate: 90deg;
                        transform-origin: top center;
                        opacity: 1;
                        cursor: pointer;

                        &:hover {
                            background-color: rgba(41, 63, 230, 0.10);
                        }
                        &.hide {
                            opacity: 0;
                        }
                    }

                    .menu {
                        position: absolute;
                        right: 28px;
                        top: 50%;
                        padding: 10px;
                        text-align: center;
                        padding-top: 8px;
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

                    .serviceActive {
                        position: relative;
                        width: 20px;
                        height: 20px;
                        margin: 0 auto;
                        border-radius: 50%;
                        background-color: rgba(0,0,0,0.25);

                        &.active {
                            background-color: #5AD858;
                        }

                        .power {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            color: #fff;
                        }
                    }

                    > div:not(.material-symbols-outlined) {
                        font-size: 0.8rem;
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