<template lang="pug">
.circle_progress
    span.left
        span.bar(ref='leftBar')
    span.right
        span.bar(ref='rightBar')
input(type='range' :value='props.percent' @change='e => progress(e.target.valueAsNumber)' @input='e => progress(e.target.valueAsNumber)' hidden)
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

let leftBar = ref(null);
let rightBar = ref(null);
let props = defineProps(['percent']);
function progress(value) {
    if (value <= 50) {
        let degree = 18 * value / 5;
        
        rightBar.value.style.transform = "rotate(" + degree + "deg)";
        leftBar.value.style.transform = "rotate(0deg)";
    } else {
        let degree = 18 * (value - 50) / 5;
        rightBar.value.style.transform = "rotate(180deg)";
        leftBar.value.style.transform = "rotate(" + degree + "deg)";
    }
}

onMounted(() => {
    progress(props.percent);
})

watch(() => props.percent, (value) => {
    if (leftBar.value && rightBar.value) {
        progress(value);
    }
})
</script>

<style lang="less">
@size: 24px;

.circle_progress {
    position: relative;
    width: @size;
    height: @size;
    // margin-bottom: 20px;

    &:after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        border: calc(@size * 0.1) solid #fff;
        box-sizing: border-box;
        content: "";
    }

    .left,
    .right {
        position: absolute;
        top: 0;
        width: calc(@size / 2);
        height: @size;
        overflow: hidden;
        z-index: 10;

        .bar {
            position: absolute;
            top: 0;
            width: calc(@size / 2);
            height: @size;
            border: calc(@size * 0.1) solid var(--main-color);
            box-sizing: border-box;
        }
    }

    .left {
        left: 0;

        & .bar {
            left: calc(@size / 2);
            border-top-right-radius: @size;
            border-bottom-right-radius: @size;
            border-left: 0;
            transform-origin: center left;
        }
    }

    .right {
        right: 0;

        & .bar {
            right: calc(@size / 2);
            border-top-left-radius: @size;
            border-bottom-left-radius: @size;
            border-right: 0;
            transform-origin: center right;
        }
    }

    .value {
        width: @size;
        height: @size;
        border-radius: 50%;
        font-size: calc(@size / 10);
        color: #888;
        line-height: @size;
        text-align: center;
        position: absolute;
    }
}
</style>