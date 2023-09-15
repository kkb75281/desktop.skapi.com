<template lang="pug">
#calendar
    .timeWrap
        .timeNav 
            select.year(v-model="currentYear" @wheel="scrollYearOptions" @change="updateCalendar")
                option(v-for="year in years" :key="year" :value="year") {{ year }}
            //- input(type="number" min="1111" max="9999")
            select.month(v-model="whatMonth[currentMonth]" @change="updateCalendar")
                option(v-for="month in whatMonth" :key="month" :value="month") {{ month }}
            .goback
                .material-symbols-outlined.sml.prev(@click="prevTime") arrow_back_ios
                .material-symbols-outlined.sml.next(@click="nextTime") arrow_forward_ios
        .timeCont 
            .days 
                .day Mo
                .day Tu
                .day We
                .day Th
                .day Fr
                .day Sa
                .day Su
            .dates  
                div(v-for="date in dates" :key="date.key" :class="date.classes" @click="createdDate(date)") {{ date.day }}
    .timeSettingWrap(:class="{ active: activeTime }")
        .start {{ startDate }}
        span ~
        .end {{ endDate }}
</template>

<script setup>
import { onMounted, ref } from 'vue';

let activeTime = ref(false);
let startDate = ref('');
let endDate = ref('');

let newDate = new Date(); // 현재 날짜
let utc = newDate.getTime() + (newDate.getTimezoneOffset() * 60 * 1000); // utc 표준시
let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시
let today = new Date(utc + kstGap); // 한국 시간 date

let whatMonth = [ 'January', 'February', 'March', 'Aprill', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
let currentYear = ref(thisMonth.getFullYear());
let currentMonth = ref(thisMonth.getMonth());
let currentDate = thisMonth.getDate();
let startYear = currentYear.value - 5; // 현재 년도에서 5년 전부터 시작
let endYear = currentYear.value + 5;   // 현재 년도에서 5년 후까지 표시
let years = ref(Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index));
// let years = Array.from({ length: 3000 }, (_, index) => index);
let dates = ref([]);

let scrollYearOptions = (e) => {
    console.log(e)
    e.preventDefault();
    const deltaY = e.deltaY;


    if (deltaY > 0) {
        // 스크롤 다운 (다음 년도로 이동)
        currentYear.value++;
    } else {
        // 스크롤 업 (이전 년도로 이동)
        currentYear.value--;
    }
}

function renderCalender(thisMonth) {
    dates.value.splice(0);
    currentYear.value = thisMonth.getFullYear();
    currentMonth.value = thisMonth.getMonth();
    currentDate = thisMonth.getDate();

    console.log(currentYear.value, currentMonth.value, currentDate)

    let startDay = new Date(currentYear.value, currentMonth.value, 0);
    let prevDate = startDay.getDate();  // 저번달 마지막 날짜
    let prevDay = startDay.getDay();    // 저번달 마지막 요일

    let endDay = new Date(currentYear.value, currentMonth.value + 1, 0);
    let nextDate = endDay.getDate();    // 이번달 마지막 날짜
    let nextDay = endDay.getDay();      // 이번달 마지막 요일
    
    for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
        dates.value.push({ day: i, classes: 'date prev disable', key: 'prev-' + i });
    }
    
    for (let i = 1; i <= nextDate; i++) {
        dates.value.push({ day: i, classes: 'date current', key: 'current-' + i });
    }
    
    for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
        dates.value.push({ day: i, classes: 'date next disable', key: 'next-' + i });
    }
}
renderCalender(thisMonth);

// 오늘 날짜 표기
onMounted(()=>{
    if (today.getMonth() == currentMonth.value) {
        let todayDate = today.getDate();
        let currentMonthDate = document.querySelectorAll('.dates .current');
        currentMonthDate[todayDate -1].classList.add('today');
    }
})

let updateCalendar = () => {
    console.log(thisMonth, currentYear.value, currentMonth.value)
    thisMonth = new Date(currentYear.value, currentMonth.value, 1);
    renderCalender(thisMonth);
}

let prevTime = () => {
    thisMonth = new Date(currentYear.value, currentMonth.value - 1, 1);
    renderCalender(thisMonth);
}

let nextTime = () => {
    thisMonth = new Date(currentYear.value, currentMonth.value + 1, 1);
    renderCalender(thisMonth);
}

let emit = defineEmits(['dateClicked']);

let createdDate = (date) => {
    let selectedYear = currentYear.value;
    let selectedMonth = currentMonth.value + 1
    let selectedDay = date.day
    let formattedDate = `${selectedYear}-${selectedMonth<10?`0${selectedMonth}`:selectedMonth}-${selectedDay<10?`0${selectedDay}`:selectedDay}`;
    
    activeTime.value = true;

    if (!startDate.value) {
        startDate.value = formattedDate;
    } else if (!endDate.value) {
        endDate.value = formattedDate;
        if (endDate.value < startDate.value) {
            startDate.value = null;
            endDate.value = null;
        }
        emit('dateClicked', startDate.value, endDate.value);
    } else {
        startDate.value = formattedDate;
        endDate.value = null;
    }
}
</script>

<style lang="less" scoped>
#calendar {
    width: 340px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
    .timeWrap {
        padding: 28px;
        .timeNav {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            margin-bottom: 28px;
            * {
                text-align: center;
                font-size: 20px;
                font-weight: 700;
            }
            .goback {
                width: 27%;
                text-align: right;
                padding-right: 7px;

                * {
                    cursor: pointer;
                }
                .prev {
                    margin-right: 10px;
                }
            }
            select {
                background-color: unset;
                border: 0;
                cursor: pointer;

                &.year {
                    width: 25%;
                }
                &.month {
                    width: 48%;
                }
            }
        }
        .timeCont {
            .days {
                display: flex;
                flex-wrap: nowrap;
                margin-bottom: 15px;
    
                .day {
                    text-align: center;
                    width: calc(100% / 7);
                    color: rgba(0, 0, 0, 0.25);
                    font-size: 14px;
                    font-weight: 500;
                }
            }
            .dates {
                display: flex;
                flex-wrap: wrap;
    
                .date {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    font-size: 14px;
                    width: calc(100% / 7);
                    line-height: 32px;
                    cursor: pointer;

                    &::before {
                        position: absolute;
                        content: '';
                        width: 32px;
                        height: 32px;
                        background-color: rgba(41, 63, 230, 0.05);
                        transition: all 0.3s;
                        border-radius: 4px;
                        opacity: 0;
                    }
                    &:hover::before { 
                        opacity: 1;
                    }
                    &.prev, &.next {
                        color: rgba(0,0,0,0.2);
                    }
                }
            }
        }
    }
    .timeSettingWrap {
        position: relative;
        padding: 20px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        
        &::after {
            position: absolute;
            content: '';
            width: 100%;
            height: 1px;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.10);
            filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.06));
        }
        &.active {
            .start, .end {
                opacity: 1;
            }
        }
        .start, .end {
            width: 130px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.05);
            font-size: 16px;
            font-weight: 700;
            opacity: 0.4;
        }
        span {
            font-size: 20px;
            padding: 0 10px;
        }
    }
}
</style>