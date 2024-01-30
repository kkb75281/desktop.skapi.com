<template lang="pug">
main#dashboard
    .createButton(@click="createService" :class="{'nonClickable' : !account?.email_verified}")
        .material-symbols-outlined.mid add
        span Create new service
    
    .tableWrap
        table#resizeMe.table
            thead
                tr
                    th.th.center(style="width:150px;")
                    th.th.center(style="width:128px;")
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
                        td(style="display:flex;align-items:center;")
                            .material-symbols-outlined.mid.upArrow.hide(ref="upArrow" @click.stop="(e) => showServiceInfo(e, index)") arrow_forward_ios
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
                            template(v-if="Math.ceil(service.users/10000*100)")
                                .percent(:class='{"green": 0 <= Math.ceil(service.users/10000*100) && Math.ceil(service.users/10000*100) < 51, "orange": 51 <= Math.ceil(service.users/10000*100) && Math.ceil(service.users/10000*100) < 81, "red": 81 <= Math.ceil(service.users/10000*100) && Math.ceil(service.users/10000*100) < 101}') {{ Math.ceil(service.users/10000*100) + '%' }}
                            template(v-else) 
                                .percent.green 0%
                        td.center
                            template(v-if="Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100)")
                                .percent(:class='{"green": 0 <= Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) && Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) < 51, "orange": 51 <= Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) && Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) < 81, "red": 81 <= Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100)}') {{ Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) + '%' }}
                            template(v-else)
                                .percent.green 0%
                        td(style="padding-left:40px;")
                            template(v-if="Math.ceil(storageInfo?.[service.service]?.database/4294967296*100)")
                                .percent(:class='{"green": 0 <= Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) && Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) < 51, "orange": 51 <= Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) && Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) < 81, "red": 81 <= Math.ceil(storageInfo?.[service.service]?.database/4294967296*100)}') {{ Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) + '%' }}
                            template(v-else)
                                .percent.green 0%
                            .menu(@click.stop="(e) => showPlanSetting(e, index)" :class='{"nonClickable": !account.email_verified}')
                                .material-symbols-outlined.mid.clickable more_vert
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
                                span {{ service.users }}
                            .info.inline 
                                h6 Database Used
                                span {{ convertToMb(storageInfo?.[service.service]?.database) + '/4000MB' }}
                            .info.inline 
                                h6 Subscription Plan
                                span Standard
                            .info.inline 
                                h6 Hosting Strorage
                                template(v-if="service?.subdomain")
                                    span {{ convertToMb(storageInfo?.[service.service]?.host) + '/50000MB' }}
                                template(v-else)
                                    span -
                            br
                            br
                            .info.inline 
                                h6 Locale
                                span {{ regions?.[service.region] || service.region }}
                            .info.inline 
                                h6 Cloud Storage Used
                                span {{ convertToMb(storageInfo?.[service.service]?.cloud) + '/50000MB' }}
                            .info.inline 
                                h6 Date Created
                                span {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                            .info.inline 
                                h6 Subdomain
                                template(v-if="service?.subdomain")
                                    span {{ service.subdomain }}
                                template(v-else)
                                    span -
                tr.loadingWrap(v-else-if="serviceFetching")
                    td(colspan="8" style="text-align:center; padding-top:20px;")
                        img.loading(src="@/assets/img/loading.png")
                tr.noServices(v-else)
                    td(colspan="8" style="text-align:center; padding-top:20px;")
                        h3 No Services
                        br
                        p Get started by creating a new service.
    br
    .plus(style="display:block;text-align:center;padding-bottom:2rem;")
        .material-symbols-outlined.big(@click="createService" style="color:#293FE6;cursor:pointer;") add_circle
   
    #moreVert.hide(v-if="showMore" @click.stop style="--moreVert-right: 100px;" :style="{top: clientY}")
        .inner
            .more(@click="showMore=false;" style="width:unset;white-space:nowrap;opacity:0.2") Downgrade Plan
            .more(@click="showMore=false;" style="width:unset;white-space:nowrap;opacity:0.2") Upgrade Plan
            .more(@click="showMore=false;" style="width:unset;white-space:nowrap;opacity:0.2") Stop Plan
            .more(@click="showMore=false;" style="width:unset;white-space:nowrap;opacity:0.2") Cancel Plan

#createNewService(:class="{'show' : create}")
    .material-symbols-outlined.mid.close(@click="create=false;") close
    header
        h4.title Create New Service
    main(v-if="create")
        form(@submit.prevent="addService")
            .label
                h6 Name of Service
            input#serviceName(type="text" :class="{'warning' : error}" @input='(e)=>{newServiceName=e.target.value;error="";}' placeholder="Name of Service")
            .error(v-if="error")
                .material-symbols-outlined.mid error
                span {{ error }}

            br
            br
        
            .label 
                h6 Service Plan
                span Please choose one of the plans

            br

            .card.clicked.nonClickable(:class="{'checked' : serviceMode == 'trial'}" @click="serviceMode='trial'" style="border-radius:8px;cursor:pointer;")
                .inner
                    .title 
                        h4 Trial Mode
                        .price $0
                    .contWrap(style="justify-content:space-between;")
                        ul
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span Provides 10k user accounts
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 4 GB of database
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 50 GB of file storage
                            li 
                                .material-symbols-outlined.sml.li warning
                                span All the users and data will be deleted every 7 days

                        //- ul
                        //-     li 
                        //-         .material-symbols-outlined.sml.li check_circle
                        //-         span asdaasd asdasdasdaasd asdasdasdaasd
                        //-     li 
                        //-         .material-symbols-outlined.sml.li check_circle
                        //-         span asdaasd asdasdasdaasd asdasdasdaasd
                        //-     li 
                        //-         .material-symbols-outlined.sml.li check_circle
                        //-         span asdaasd asdasdasdaasd asdasdasdaasd
                        //-     li 
                        //-         .material-symbols-outlined.sml.li check_circle
                        //-         span asdaasd asdasdasdaasd asdasdasdaasd
        
            br

            .card.clicked(:class="{'checked' : serviceMode == 'standard'}" @click="serviceMode='standard'" style="border-radius:8px;cursor:pointer;")
                .inner
                    .title 
                        h4(style="display:inline-block;") Standard Mode
                        .right(style="display:inline-block; text-align:right;")
                            .free 
                                span (Only for promotion period)
                                p(style="display:inline-block; margin-left:10px") Free
                            .price.discount $19
                    .contWrap(style="justify-content:space-between;")
                        ul
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span Provides 10k user accounts
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 4GB of database
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 50GB each for file storage and hosting storage
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span Real-time data

                        ul
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span Automated emails and sending newsletters
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 1GB of email storage
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span Subdomain hosting
                            //- li 
                            //-     .material-symbols-outlined.sml.li check_circle
                            //-     span asdaasd asdasdasdaasd asdasdasdaasd
        
            br

            .card.clicked.nonClickable(:class="{'checked' : serviceMode == 'premium'}" @click="serviceMode='premium'" style="border-radius:8px;cursor:pointer;")
                .inner
                    .title 
                        h4 Premium Mode
                        .price $129
                    .contWrap(style="justify-content:space-between;")
                        ul
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 100k user accounts
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 100GB of database
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 1TB each for file storage and hosting storage
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span Real-time data

                        ul
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span Automated emails and sending newsletters
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span 10GB of email storage
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span Subdomain hosting
                            li 
                                .material-symbols-outlined.sml.li check_circle
                                span unlimited use with pay-as-you-go when exceeding the limit

            br
        
            .buttonWrap(style="display:flex; justify-content:space-between;")
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    button.noLine(@click="create=false;") Cancel 
                    button.final(type="submit") Create
                    //- button.unFinished(v-else type="submit") Create
            
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { skapi, account, bodyClick } from '@/main.js';
import { services, serviceFetching, storageInfo } from '@/data.js';
import { launch, subdomainInfo } from '@/views/Service/Subdomain/SubdomainFetch.js';

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
onBeforeUnmount(() => {
    document.querySelector('body').classList.remove('fa');
})

const router = useRouter();
let serviceMode = ref('standard');
let searchFor = ref('service');
let searchText = ref('');
let showInfo = ref(false);
let tr = ref(null);
let downArrow = ref(null);
let upArrow = ref(null);
let trCont = ref(null);
let currentServiceIndex = null;
let currentPlanIndex = null;
let showMore = ref(false);
let clientY = 0;
// let inputError = ref(false);
let error = ref('');

let convertToMb = (size) => {
    if (size) {
        return (size / (1024 * 1024)).toFixed(2) + ' MB'
    }
    else {
        return '-'
    }
}

let showServiceInfo = (e, index) => {
    if(currentServiceIndex == index) {
        downArrow.value[index].classList.remove('hide');
        upArrow.value[index].classList.add('hide');
        trCont.value[index].classList.remove('active');
        currentServiceIndex = null;

        return;
    } else if(e.target.classList.contains('upArrow')) {
        downArrow.value[index].classList.remove('hide');
        upArrow.value[index].classList.add('hide');
        trCont.value[index].classList.remove('active');
        currentServiceIndex = null;

        return;
    }

    currentServiceIndex = index;
    downArrow.value[index].classList.add('hide');
    upArrow.value[index].classList.remove('hide');
    trCont.value[index].classList.add('active');
}

let showPlanSetting = (e, index) => {
    if(currentPlanIndex == index && showMore.value) {
        console.log('dd')
        showMore.value = false;
        currentPlanIndex = null;

        return;
    }

    showMore.value = false;
    currentServiceIndex = index;
    clientY = 200 + (60 *(index-1)) + 'px';

    showMore.value = true;
    currentPlanIndex = index;
    console.log(currentPlanIndex == index, showMore.value)
}

let goServiceDashboard = (e, service) => {
    e.currentTarget.classList.add('active');

    setTimeout(() => {
        router.push('/dashboard/' + service.service);
    }, 500);
}

bodyClick.recordPage = () => {
    showMore.value = false;
}

// table resize
let prevX, prevW, nextW = 0;
let prevCol, nextCol = null;
let widthSum = 0;

nextTick(() => {
    let ths = document.getElementsByTagName('th');
    let thsArr = Array.from(ths);

    thsArr.forEach((e) => {
        let widthStyle = window.getComputedStyle(e).width;
        e.style.width = widthStyle;
        widthSum += widthStyle;
    });
})

let mouseMoveHandler = function (e) {
    let dx = e.clientX - prevX;
    let ths = document.getElementsByTagName('th');
    let thsArr = Array.from(ths);

    thsArr.forEach((e) => {
        widthSum += e.offsetWidth;
    });

    if ((widthSum < window.innerWidth || dx < 0) && (prevW + dx > 100 && nextW - dx > 100)) {
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

let getServiceInfo = () => {
    if (services.value) {
        for(let i=0; i<services.value.length; i++) {
            let service = services.value[i].service
    
            if (!storageInfo.value[service]) {
                storageInfo.value[service] = {};
            }

            skapi.storageInformation(service).then(i => {
                console.log(i)
                // get storage info
                for (let k in i) {
                    storageInfo.value[service][k] = i[k];
                }
            });

            let sd = services.value[i].subdomain;

            if (sd && (sd[0] !== '*' || sd[0] !== '+')) {
                skapi.listHostDirectory({ dir: sd, info: true }, { limit: 1 }).then(u => {
                    // if (!storageInfo.value[service]) {
                    //     storageInfo.value[service] = {};
                    // }

                    storageInfo.value[service].host = u.size;
                });
            }
        }
    }
}

// update services
if (serviceFetching.value) {
    serviceFetching.value.then(() => {
        services.value = skapi.serviceMap.map(sid => skapi.services[sid]).reverse();
        getServiceInfo();
        // for(let i=0; i<services.value.length; i++) {
        //     let sd = services.value[i]?.subdomain;
        //     let host = 0;
        //     if (sd) {
        //         launch(services.value[i].subdomain, f => {
        //             if (f.length) {
        //                 host = f[0].size;
        //             }
        //         }, true);
        //     }
        //     skapi.storageInformation(services.value[i].service).then(async(info) => {
        //         info.host = host
        //         services.value[i].info = info;
        //     });

        // }
        // console.log(services.value)
    })
}
else {
    services.value = skapi.serviceMap.map(sid => skapi.services[sid]).reverse();
    getServiceInfo();
    // for(let i=0; i<services.value.length; i++) {
    //     let sd = services.value[i]?.subdomain;
    //         let host = 0;
    //         if (sd) {
    //             launch(services.value[i].subdomain, f => {
    //                 if (f.length) {
    //                     host = f[0].size;
    //                 }
    //             }, true);
    //         }
    //     skapi.storageInformation(services.value[i].service).then(info => {
    //         services.value[i].info = info;
    //     });
    // }
    // console.log(services.value)
}

let create = ref(false);
let createService = () => {
    if (account?.value.email_verified) {
        create.value = true;
        error.value = '';
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
    if(newServiceName == '') {
        promiseRunning.value = false;
        error.value = 'Please fill in the name of service';

        return;
    }
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
            newServiceName = '';
        }).catch(err => {
            // alert(err.message);
            console.log(err)
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
    height: calc(100vh - 60px - 3.4rem);
    margin-top: 3.4rem;
    padding: 0 2rem;
}

#createNewService {
    position: fixed;
    right: 0;
    top: 0;
    width: 700px;
    height: 100%;
    overflow: scroll;
    background: #FFF;
    box-shadow: -8px 4px 20px 0px rgba(0, 0, 0, 0.10);
    transform: translateX(110%);
    transition: all 0.3s;
    z-index: 999;

    &.show {
        transform: translateX(0px);
    }
    .close {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 32px;
        cursor: pointer;
    }
    .card {
        background-color: #fafafa;

        &.checked {
            box-shadow: 0 0 0 4px #A5AFFF inset !important;
            .inner {
                .contWrap {
                    ul {
                        li {
                            .li {
                                color: #293FE6;
                            }
                        }
                    }
                }
            }
        }
        &.clicked {
            &:hover {
                .inner {
                    .contWrap {
                        ul {
                            li {
                                .li {
                                    color: #293FE6;
                                }
                            }
                        }
                    }
                }
            }
        }
        .inner {
            .title {
                font-weight: 500;
                color: #293FE6;

                .free {
                    position: relative;
                    display: inline-block;
                    color: #293FE6;
                    font-size: 1.2rem;
                    font-weight: 700;

                    span {
                        color: rgba(0,0,0,0.6);
                        font-size: 0.7rem;
                        font-weight: 400;
                    }
                }

                .price {
                    position: relative;
                    display: inline-block;
                    padding-right: 60px;
                    padding-left: 10px;
                    font-size: 28px;
                    font-weight: 700;

                    &::before {
                        position: absolute;
                        content: '/month';
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 14px;
                        font-weight: 500;
                        color: rgba(0, 0, 0, 0.40);
                    }
                    &.discount {
                        margin-left: 10px;
                        color: #A7A8AD;

                        &::after {
                            position: absolute;
                            content: '';
                            width: 50%;
                            height: 2px;
                            left: 5px;
                            top: 50%;
                            transform: translateY(-50%);
                            background-color: #A7A8AD;
                        }
                    }
                }
            }
            .contWrap {
                ul {
                    // width: 50%; // <- i don't advise horizontal layout if unnecessary
                    list-style: none;

                    li {
                        .li {
                            font-size: 14px;
                            margin-right: 5px;
                        }
                        span {
                            font-size: 14px;
                            color: rgba(0, 0, 0, 0.60);
                            font-weight: 400;
                        }
                    }
                }
            }
        }
    }
    header {
        padding: 2rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        .title {
            color: #293FE6;
        }
    }
    main {
        padding: 30px 40px;

        h6 {
            display: inline-block;
            color: rgba(0, 0, 0, 0.60);
            margin-bottom: 8px;
        }
        .label {
            span {
                color: rgba(0, 0, 0, 0.40);
                font-size: 14px;
                font-weight: 400;
                margin-left: 16px;
            }
        }
        input {
            width: 100%;
            height: 44px;
            border: 0;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.05);
            padding: 0 20px;
        }
        .customSelect {
            select {
                height: 44px;
                background: rgba(0, 0, 0, 0.05);
                padding: 0 20px;
            }
        }
        // .planCard {
        //     border-radius: 8px;
        //     border: 0.5px solid rgba(0, 0, 0, 0.25);
        //     background: #FAFAFA;

        //     .header {
        //         display: flex;
        //         align-items: center;
        //         justify-content: space-between;
        //         padding: 1rem;
        //         border-bottom: 1px solid rgba(0, 0, 0, 0.10);
        //         box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);

        //         .mode {
        //             display: inline-block;
        //             font-weight: 500;
        //             color: #293FE6;
        //         }
        //         .price {
        //             position: relative;
        //             display: inline-block;
        //             padding-right: 60px;
        //             font-size: 28px;
        //             font-weight: 700;

        //             &::after {
        //                 position: absolute;
        //                 content: '/month';
        //                 right: 0;
        //                 top: 50%;
        //                 transform: translateY(-50%);
        //                 font-size: 14px;
        //                 font-weight: 500;
        //                 color: rgba(0, 0, 0, 0.40);
        //             }
        //         }
        //     }
        //     .content {
        //         padding: 1rem;
                
        //         ul {
        //             li {
        //                 box-sizing: border-box;

        //             }
        //         }
        //     }
        // }
    }
}

#moreVert {
    .inner {
        .more {
            font-size: 0.8rem;
        }
    }
}

.createButton {
    display: inline-block;
    // height: 40px;
    padding: 6px 28px 8px;
    border-radius: 8px;
    border: 1px solid #D9D9D9;
    color: #293FE6;
    cursor: pointer;
    
    * {
        user-select: none;
        font-size: 16px;
        font-weight: 500;
    }
}

.tableWrap {
    position: relative;
    // min-height: calc(100vh - 3.4rem - 160px);
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
                &:not(.cont, .active, .loadingWrap, .noServices):hover {
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
                }
                &.loadingWrap, &.noServices {
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
                    padding: 3px 12px;
                    border-radius: 4px;
                    box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                    color: #fff;

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

                .upArrow, .downArrow {
                    display: inline-block;
                    vertical-align: middle;
                    padding: 10px;
                    border-radius: 50%;
                    font-size: 24px;
                    color: rgba(0,0,0,0.4);
                    cursor: pointer;

                    &:hover {
                        background-color: rgba(41, 63, 230, 0.10);
                    }
                    &.hide {
                        display: none;
                    }
                }

                .upArrow {
                    rotate: 270deg;
                }

                .downArrow {
                    rotate: 90deg;
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
                    display: inline-block;
                    vertical-align: middle;
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

.plus {
    .material-symbols-outlined {
        position: relative;

        &:hover {
            &::before {
                display: block;
            }
        }

        &::before {
            position: absolute;
            content: '';
            left: 50%;
            top: 50%;
            width: 42px;
            height: 42px;
            transform: translate(-50%, -50%);
            background-color: rgba(41, 63, 230, 0.10);
            border-radius: 50%;
            display: none;
        }
    }
}

@media (max-width: 700px) {
    #createNewService {
            width: 100%;
    } 
}
</style>