<template lang="pug">
#lending(ref="lending")
    section#intro(ref="intro" @wheel="handleMouseWheel")
        .introWrap 
            img.introLogo(src="@/assets/img/logo/symbol-logo.png")
            .point
                span One Line of Code
                | =&gt;
                br
                | Full Backend API
            .code(style="color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important; position:relative !important;overflow:auto")
                table(style="margin:0;padding:0;border:none;background-color:#434343;border-radius:4px;" cellspacing="0" cellpadding="0")
                    tr
                        td(style="padding:6px;border-right:2px solid #4f4f4f")
                            div(style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%")
                                div(style="line-height:130%") 1
                        td(style="padding:6px 0;text-align:left")
                            div(style="margin:0;padding:0;color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%")
                                div(style="padding:0 6px; white-space:pre; line-height:130%")
                                    span(style="color:#ff3399") const 
                                    span skapi 
                                    span(style="color:#ff3399") = 
                                    span(style="color:#ff3399") new 
                                    span Skapi( 
                                    span(style="color:#ffd500") 'SERVICE_ID' 
                                    span ,
                                    span(style="color:#ffd500") 'OWNERS_ID' 
                                    span );
            p
                | Skapi is a backend API service specially designed for 
                br
                | frontend web developers.
            a(href='https://docs.skapi.com/introduction/getting-started.html' target="_blank") 
                span Getting Started
                .material-symbols-outlined.big arrow_forward
    section#other(ref="other")
        .packageWrap(ref="packageWrap")
            .packageInner
                .title(:class="{'show' : packageShow}") Skapi provides everything in one package
                p(:class="{'show' : packageShow}") No more figuring out how to setup, or deploy each of your backend resources.
                .cardWrap(:class="{'show' : packageShow}") 
                    .card
                        .cardInner
                            img(src="@/assets/img/icon/icons-03.png")
                            .tit Database
                            .desc Simple, yet flexible #[br]database that scales
                            .mDesc Simple, yet flexible database that scales
                    .card
                        .cardInner
                            img(src="@/assets/img/icon/icons-04.png")
                            .tit Cloud Storage
                            .desc Secure, #[br]Database integrated, #[br]Expands with no-limit
                            .mDesc Secure, Database integrated, #[br]Expands with no-limit
                    .card
                        .cardInner
                            img(src="@/assets/img/icon/icons-05.png")
                            .tit Security
                            .desc Works out-of-the-box, #[br]Fully implemented in #[br]all resources
                            .mDesc Works out-of-the-box, Fully #[br]implemented in all resources
                    .card
                        .cardInner
                            img(src="@/assets/img/icon/icons-06.png")
                            .tit E-Mail service
                            .desc Verification, #[br]Sending newsletters, #[br]Notification E-mails
                            .mDesc Verification, Sending newsletters, #[br]Notification E-mails
                    .card
                        .cardInner
                            img(src="@/assets/img/icon/icons-07.png")
                            .tit Hosting
                            .desc Immediate website #[br]hosting
                            .mDesc Immediate website hosting
                    .card
                        .cardInner
                            img(src="@/assets/img/icon/icons-08.png")
                            .tit CDN
                            .desc Implemented to the #[br]cloud storage by #[br]default
                            .mDesc Implemented to the cloud storage by default
                    .card
                        .cardInner
                            img(src="@/assets/img/icon/icons-09.png")
                            .tit Load balancing
                            .desc Everything controlled #[br]internally
                            .mDesc Everything controlled internally
                    .card
                        .cardInner
                            img(src="@/assets/img/icon/icons-10.png")
                            .tit Serverless
                            .desc No deployment, #[br]No installation #[br]required
                            .mDesc No deployment, No installation required
        .htmlWrap(ref="htmlWrap")
            .htmlInner
                .title(:class="{'show' : htmlShow}") Compatible with either #[br]pure HTML projects or any SPA frameworks
                p(:class="{'show' : htmlShow}") No additional settings, Just import Skapi library in your HTML file and you’re ready to go.
                .htmlCode(:class="{'show' : htmlShow}") 
                    .tit index.html 
                    .code 
                        table(style="margin:0;border:none;background-color:#434343;" cellspacing="0" cellpadding="0")
                            tr
                                td(style="padding:6px;border-right:2px solid #4f4f4f")
                                    div(style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%")
                                        div(style="line-height:130%") 1
                                        div(style="line-height:130%") 2
                                        div(style="line-height:130%") 3
                                        div(style="line-height:130%") 4
                                        div(style="line-height:130%") 5
                                        div(style="line-height:130%") 6
                                        div(style="line-height:130%") 7
                                td(style="padding:6px 0;text-align:left")
                                    div(style="margin:0;padding:0;color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%")
                                        div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                            span(style="color:#f0f0f0") &lt;
                                            span(style="color:#ff3399") !DOCTYPE 
                                            span(style="color:#a8ff58") html
                                            span(style="color:#f0f0f0") &gt;
                                        div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                            span(style="color:#f0f0f0") &lt;
                                            span(style="color:#ff3399") head
                                            span(style="color:#f0f0f0") &gt;
                                        div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                            span(style="color:#f0f0f0") &lt;
                                            span(style="color:#ff3399") script 
                                            span(style="color:#a8ff58") src=
                                            span(style="color:#ffd500") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"
                                            span(style="color:#ff3399") 
                                            span(style="color:#f0f0f0") &gt;
                                            span(style="color:#f0f0f0") &lt;
                                            span(style="color:#f0f0f0") /
                                            span(style="color:#ff3399") script
                                            span(style="color:#f0f0f0") &gt;
                                        div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                            span(style="color:#f0f0f0") &lt;
                                            span(style="color:#f0f0f0") /
                                            span(style="color:#ff3399") head
                                            span(style="color:#f0f0f0") &gt;
                                        div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                            span(style="color:#f0f0f0") &lt;
                                            span(style="color:#ff3399") script
                                            span(style="color:#f0f0f0") &gt;
                                        div(style="padding:0 6px; white-space:pre; line-height:130%")   
                                            span(style="color:#ff3399") let 
                                            span skapi 
                                            span = 
                                            span(style="color:#ff3399") new 
                                            span Skapi( 
                                            span(style="color:#ffd500") 'SERVICE_ID' 
                                            span ,  
                                            span(style="color:#ffd500") 'OWNERS_ID' 
                                            span );
                                        div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                            span(style="color:#f0f0f0") &lt;
                                            span(style="color:#f0f0f0") /
                                            span(style="color:#ff3399") script
                                            span(style="color:#f0f0f0") &gt;
        .docWrap(ref="docWrap" :class="{'show' : docShow}") 
            .docInner
                .left 
                    .title Written in #[br]human language
                    a(href='https://docs.skapi.com' target="_blank") Check out Documentation
                .right
                    img(src="@/assets/img/documentation.png")
        .joinWrap 
            h2 Skapi is on Beta 
            h3 Try it while it's free!
            template(v-if="account")
                router-link(to="/dashboard") Go to Dashboard
            template(v-else)
                router-link(to="/signup") Sign-up
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { account } from '@/main.js';

let lending = ref(null);
let intro = ref(null);
let other = ref(null);
let packageWrap = ref(null);
let htmlWrap = ref(null);
let docWrap = ref(null);
let hasScrolled = false;
let packageShow = ref(false);
let htmlShow = ref(false);
let docShow = ref(false);

let handleMousewheel = function (e) {
    if(!hasScrolled && e.deltaY > 0) {
        smoothScroll({yPos: window.innerHeight, duration: 500});
        hasScrolled = true;
    } else if(hasScrolled && e.deltaY < 0 && document.documentElement.scrollTop < other.value.offsetTop) {
        smoothScroll({yPos: 0, duration: 500});
        hasScrolled = false;
    }
}

let moveHtml = function () {
    let packageWrapTop = window.pageYOffset + packageWrap.value.getBoundingClientRect().top;
    let htmlWrapTop = window.pageYOffset + htmlWrap.value.getBoundingClientRect().top;
    let docWrapTop = window.pageYOffset + docWrap.value.getBoundingClientRect().top;

    let packageTitle = packageWrap.value.querySelector('.title');
    let packageDesc = packageWrap.value.querySelector('p');
    let packageCards = packageWrap.value.querySelector('.cardWrap');
    let htmlTitle = htmlWrap.value.querySelector('.title');
    let htmlDesc = htmlWrap.value.querySelector('p');
    let htmlCode = htmlWrap.value.querySelector('.htmlCode');

    if(scrollY >= packageWrapTop - 500) {
        packageShow.value = true;
    } else {
        packageShow.value = false;
    }

    if(scrollY >= htmlWrapTop - 500) {
        htmlShow.value = true;
    } else {
        htmlShow.value = false;
    }

    if(scrollY >= docWrapTop - 500) {
        docShow.value = true;
    } else {
        docShow.value = false;
    }
}

onMounted(() => {
    // window.addEventListener('mousewheel', handleMousewheel);
    window.addEventListener('scroll', moveHtml);
})
onBeforeUnmount(() => {
    // window.removeEventListener('mousewheel', handleMousewheel);
    window.removeEventListener('scroll', moveHtml);
})
</script>

<style lang="less" scoped>
#intro {
    width: 100vw;
    height: 100vh;
    background-image: url(@/assets/img/background.svg);
    background-size: cover;
    position: relative;
    z-index: 9;

    .introWrap {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .introLogo {
            width: min(140px, 5vw);
            margin-bottom: min(28px, 2vw);
        }

        .point {
            color: #fff;
            font-size: min(64px, 3.4vw);
            font-weight: 500;
            line-height: min(100px, 5.4vw);
            margin-bottom: min(28px, 2.6vw);

            span {
                position: relative;
                margin-right: 20px;

                &::after {
                    position: absolute;
                    content: '';
                    left: 0;
                    bottom: -15px;
                    width: 100%;
                    height: 4px;
                    background-color: #fff;
                }
            }
        }

        .code {
            width: min(782px, 34vw);
            height: min(58px, 2.5vw);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.10);
            background: #434343;
            color: #FFF;
            text-align: center;
            font-family: monospace;
            font-size: min(24px, 1.1vw);
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
            margin-bottom: min(86px, 3.7vw);
        }

        p {
            color: #FFF;
            font-size: min(24px, 1.04vw);
            font-weight: 400;
            line-height: min(36px, 1.6vw);
            margin-bottom: min(36px, 2vw);
        }

        a {
            width: 238px;
            height: 52px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
            position: relative;
            text-decoration: none;
            color: #293FE6;
            display: flex;
            align-items: center;
            justify-content: end;
            padding-right: 20px;
            border-radius: 0 30px 30px 0;
            cursor: pointer;

            span {
                font-size: min(20px, 1.1vw);
                font-weight: 700;
                margin-right: 10px;
            }
        }
    }
}

#other {
    width: 100%;
    height: 100%;
    // margin-top: -50vh;

    @keyframes show {
        from{
            opacity: 0;
            transform: translateY(100px);
        }
        to{
            opacity: 1;
            transform: translateY(0px);
        }
    }

    >div {
        width: min(1400px, 70vw);
        margin: 0 auto;
        // padding-top: min(550px, 32vw);
        padding-top: min(330px, 19vw);

    }

    .packageWrap {
        // padding-top: min(330px, 19vw);
    }

    .title {
        color: #262626;
        font-size: min(36px, 2.1vw);
        font-weight: 700;
        margin-bottom: min(24px, 1.3vw);
        transition: all 1s;
        opacity: 0;

        &.show {
            animation: show 1s;
            opacity: 1;
        }
    }

    p {
        color: #000;
        font-size: min(28px, 1.4vw);
        font-weight: 400;
        margin-bottom: min(42px, 1.8vw);
        opacity: 0;

        &.show {
            animation: show 1.5s;
            opacity: 1;
        }
    }

    .cardWrap {
        display: flex;
        flex-wrap: wrap;
        opacity: 0;

        &.show {
            animation: show 2s;
            opacity: 1;
        }

        .card {
            position: relative;
            width: 23.5%;
            margin-right: 2%;
            margin-bottom: 2%;
            border-radius: 8px;
            background-color: #FAFAFA;
            border: 1px solid rgba(0, 0, 0, 0.15);
            box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

            &:nth-child(4n+4) {
                margin-right: 0;
            }

            &::after {
                display: block;
                content: "";
                padding-bottom: 100%;
            }
            .cardInner {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                padding: min(28px, 1.2vw);

                img {
                    height: min(100px, 4.3vw);
                    margin-bottom: min(36px, 1.5vw);
                    object-fit: contain;
                    align-self: start;
                    margin-top: min(-10px, -0.5vw);
                    margin-left: min(-10px, -0.5vw);
                }

                .tit {
                    width: 100%;
                    margin-bottom: min(24px, 1vw);
                    color: rgba(0,0,0,0.8);
                    font-size: min(24px, 1.2vw);
                    font-weight: 500;
                }

                .desc {
                    width: 100%;
                    color: rgba(0,0,0,0.6);
                    font-size: min(19px, 1vw);
                    font-weight: 400;
                    line-height: min(24px, 1.4vw);
                }

                .mDesc {
                    display: none;
                    color: rgba(0,0,0,0.6);
                }
            }
        }
    }

    .htmlCode {
        opacity: 0;

        &.show {
            animation: show 2s;
            opacity: 1;
        }

        .tit {
            color: #000;
            font-size: min(24px, 2.5vw);
            font-weight: 700;
            margin-bottom: 10px;
        }

        .code {
            width: 100%;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.10);
            background: #434343;
            padding: 20px 10px;
            font-size: min(20px, 1vw);
            font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;
            overflow: auto;
        }
    }

    .docWrap {
        align-items: center;
        opacity: 0;

        .docInner {
            display: flex;
            flex-wrap: nowrap;
        }

        &.show {
            animation: show 1s;
            opacity: 1;
        }

        .left {
            width: 40%;

            .title {
                color: rgba(0, 0, 0, 0.80);
                font-size: min(48px, 2.1vw);
                margin-bottom: min(65px, 2.8vw);
                font-weight: 700;
                line-height: 50px;
                opacity: 1;
            }

            a {
                color: #293FE6;
                font-size: min(28px, 1.2vw);
                font-weight: 700;
                text-decoration-line: underline;
            }
        }

        .right {
            width: 60%;

            img {
                width: 100%;
                box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
            }
        }
    }

    .joinWrap {
        width: 100%;
        margin-top: min(400px, 17vw);
        padding-top: min(140px, 6vw);
        padding-bottom: min(140px, 6vw);
        background-image: url(@/assets/img/background.svg);
        background-size: cover;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: #FFF;
        text-align: center;

        h2 {
            width: 100%;
            font-size: 50px;
            font-weight: 700;
            margin-bottom: 17px;
        }

        h3 {
            width: 100%;
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 36px;
        }

        a {
            padding: 12px 28px;
            border-radius: 8px;
            background: #293FE6;
            font-size: 20px;
            font-weight: 700;
            color: #fff;
            text-decoration: none;
        }
    }
}

@media (max-width:1500px) {
    #intro {
        .introWrap {
            .introLogo {
                width: 71px;
                margin-bottom: 25px;
            }
            .point {
                font-size: 50px;
                font-size: min(50px, 5vw);
                line-height: 82px;
                margin-bottom: 32px;
            }
            .code {
                width: 500px;
                height: 38px;
                font-size: 16px;
                margin-bottom: 52px;
            }
            p {
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 30px;
            }
            a {
                span {
                    font-size: 16px;
                }
            }
        }
    }

    #other {
        >div {
            width: 940px;
            // width: min(940px, 62vw);
            // padding-top: 535px;
            padding-top: 248px;
        }
        .packageWrap {
            // padding-top: min(330px, 19vw);
            width: 100%;
            overflow: auto;

            .packageInner {
                width: 940px;
                margin: 0 auto;
            }
        }

        .htmlWrap {
            width: 100%;
            overflow: auto;
            .htmlInner {
                width: 940px;
                margin: 0 auto;
            }
        }

        .title {
            font-size: 32px;
            margin-bottom: 20px;
        }

        p {
            font-size: 20px;
            margin-bottom: 36px;
        }

        .cardWrap {
            .card {
                .cardInner {
                    padding: 20px;

                    img {
                        height: 80px;
                        margin-bottom: 8px;
                    }
                    .tit {
                        font-size: 18px;
                        margin-bottom: 12px;
                    }
                    .desc {
                        font-size: 16px;
                        line-height: 20px;
                    }
                }
            }
        }

        .htmlCode {
            .title {
                font-size: 16px;
            }
            
            .code {
                font-size: 16px;
            }
        }

        .docWrap {
            width: 100%;
            overflow: auto;
            .docInner {
                width: 940px;
                margin: 0 auto;
            }
            .left {
                .title {
                    font-size: 40px;
                    margin-bottom: 57px;
                }

                a {
                    font-size: 20px;
                }
            }
            .right {
                width: 57%;
                margin-left: 3%;
            }
        }

        .joinWrap {
            margin-top: 337px;
            padding-top: 56px;
            padding-bottom: 56px;
        }
    }
}

@media (max-width: 660px) {
    #intro {
        padding: 0 20px;
        .introWrap {
            position: relative;
            width: 100%;
            .introLogo {
                width: 70px;
                margin-bottom: 33px;
            }
            .point {
                font-size: 35px;
                line-height: 74px;
            }
            .code {
                width: 100%;
                padding: 0 10px;
            }
            p {
                font-size: 20px;
                line-height: 28px;
                margin-bottom: 48px;
            }
        }
    }

    #other {
        >div {
            width: 100%;
            padding-top: 100px;
        }
        .packageWrap, .htmlWrap {
            padding: 100px 20px 0 20px;
            .packageInner, .htmlInner {
                width: 100%;
            }
        }
        .title {
            width: 320px;
            font-size: 28px;
            line-height: 32px;
            margin-bottom: 38px;
        }
        p {
            display: none;
        }
        .cardWrap {
            display: block;

            .card {
                position: relative;
                width: 100%;
                height: 100%;
                margin-right: unset;
                margin-bottom: 48px;
                border-radius: 8px;
                background-color: unset;
                border: 0;
                box-shadow: unset;

                &::after {
                    display: none;
                }
                .cardInner {
                    position: relative;
                    padding: unset;

                    .tit {
                        font-size: 24px;
                    }
                    .desc {
                        display: none;
                    }
                    .mDesc{
                        font-size: 20px;
                        display: block;
                    }
                }
            }
        }
        .htmlCode {
            .tit {
                font-size: 24px;
            }
            .code {
                table {
                    td {
                        font-size: 16px !important;

                        div {
                            font-size: 16px !important;
                            span {
                                font-size: 16px !important;
                            }
                        }
                    }
                }
            }
        }
        .docWrap {
            display: none;
        }
        .joinWrap {
            margin-top: 140px;
            padding-top: 80px;
            padding-bottom: 80px;

            h2 {
                font-size: 40px;
            }
            h3 {
                font-size: 28px;
            }
            a {
                font-size: 20px;
            }
        }
    }
}

@media (max-width: 500px) {
    #intro {
        .introWrap {
            .code {
                position: relative;

                table {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
</style>
