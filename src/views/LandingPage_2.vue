<template lang="pug">
#lending(ref="lending")
    section#intro(ref="intro" @wheel="handleMouseWheel")
        .introWrap 
            .introInner
                img.introLogo(src="@/assets/img/logo/symbol-logo.png")
                img.mintroLogo(src="@/assets/img/logo/text-logo-white.svg")

                br
                br

                .point
                    span One Line of Code
                    |  =&gt;
                    br
                    | Full Backend API

                br
                br

                .codeWrap
                    .codeInner
                        .num 1
                        .line
                            span(style="color:#ff3399") const 
                            span skapi = 
                            span(style="color:#ff3399") new 
                            span Skapi( 
                            span(style="color:#ffd500") 'SERVICE_ID' 
                            span ,
                            span(style="color:#ffd500") 'OWNERS_ID' 
                            span );

                br
                br

                p.desc Skapi is a backend API service specially designed for frontend web developers.

                br
                br

                a(href='https://docs.skapi.com/introduction/getting-started.html' target="_blank") 
                    h5 Getting Started
                    .material-symbols-outlined.big.arrow arrow_forward
    section#other(ref="other")
        .packageWrap(ref="packageWrap")
            .packageInner
                h2.title(:class="{'show' : packageShow}") Skapi provides everything in one package
                br
                p(:class="{'show' : packageShow}") No more figuring out how to setup, or deploy each of your backend resources.
                br
                br
                .cardWrap(:class="{'show' : packageShow}") 
                    .cardInner
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-03.png")
                                h4.tit Database
                                p.desc Simple, yet flexible #[br]database that scales
                                p.mDesc Simple, yet flexible database that scales
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-04.png")
                                h4.tit Cloud Storage
                                p.desc Secure, #[br]Database integrated, #[br]Expands with no-limit
                                p.mDesc Secure, Database integrated, #[br]Expands with no-limit
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-05.png")
                                h4.tit Security
                                p.desc Works out-of-the-box, #[br]Fully implemented in #[br]all resources
                                p.mDesc Works out-of-the-box, Fully #[br]implemented in all resources
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-06.png")
                                h4.tit E-Mail service
                                p.desc Verification, #[br]Sending newsletters, #[br]Notification E-mails
                                p.mDesc Verification, Sending newsletters, #[br]Notification E-mails
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-07.png")
                                h4.tit Hosting
                                p.desc Immediate website #[br]hosting
                                p.mDesc Immediate website hosting
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-08.png")
                                h4.tit CDN
                                p.desc Implemented to the #[br]cloud storage by #[br]default
                                p.mDesc Implemented to the cloud storage by default
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-09.png")
                                h4.tit Load balancing
                                p.desc Everything controlled #[br]internally
                                p.mDesc Everything controlled internally
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-10.png")
                                h4.tit Serverless
                                p.desc No deployment, #[br]No installation #[br]required
                                p.mDesc No deployment, No installation required
        .htmlWrap(ref="htmlWrap")
            .htmlInner
                h2.title(:class="{'show' : htmlShow}") Compatible with either #[br]pure HTML projects or any SPA frameworks
                br
                p(:class="{'show' : htmlShow}") No additional settings, Just import Skapi library in your HTML file and you’re ready to go.
                br
                br
                .htmlCode(:class="{'show' : htmlShow}") 
                    h6.tit index.html 
                    .codeWrap
                        .codeInner
                            .num
                                div 1
                                div 2
                                div 3
                                div 4
                                div 5
                                div 6
                                div 7
                            .line
                                div
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") !DOCTYPE 
                                    span(style="color:#a8ff58") html
                                    span(style="color:#f0f0f0") &gt;
                                div
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") head
                                    span(style="color:#f0f0f0") &gt;
                                div
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") script 
                                    span(style="color:#a8ff58") src
                                    span =
                                    span(style="color:#ffd500") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"
                                    span(style="color:#ff3399") 
                                    span(style="color:#f0f0f0") &gt;
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#f0f0f0") /
                                    span(style="color:#ff3399") script
                                    span(style="color:#f0f0f0") &gt;
                                div
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#f0f0f0") /
                                    span(style="color:#ff3399") head
                                    span(style="color:#f0f0f0") &gt;
                                div
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") script
                                    span(style="color:#f0f0f0") &gt;
                                div
                                    span(style="color:#ff3399") let 
                                    span skapi 
                                    span = 
                                    span(style="color:#ff3399") new 
                                    span Skapi( 
                                    span(style="color:#ffd500") 'SERVICE_ID' 
                                    span ,  
                                    span(style="color:#ffd500") 'OWNERS_ID' 
                                    span );
                                div
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#f0f0f0") /
                                    span(style="color:#ff3399") script
                                    span(style="color:#f0f0f0") &gt;
        .docWrap(ref="docWrap" :class="{'show' : docShow}") 
            .docInner
                .left 
                    h2.title Written in #[br]human language
                    br
                    br
                    a(href='https://docs.skapi.com' target="_blank") Check out Documentation
                .right
                    img(src="@/assets/img/documentation.png")
        .joinWrap 
            h2 Skapi is on Beta 
            br
            h3 Try it while it's free!
            br
            br
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

// mousewheel event
let handleMousewheel = function (e) {
    if (!hasScrolled && e.deltaY > 0) {
        smoothScroll({ yPos: window.innerHeight, duration: 500 });
        hasScrolled = true;
    } else if (hasScrolled && e.deltaY < 0 && document.documentElement.scrollTop < other.value.offsetTop) {
        smoothScroll({ yPos: 0, duration: 500 });
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

    if (scrollY >= packageWrapTop - 500) {
        packageShow.value = true;
    } else {
        packageShow.value = false;
    }

    if (scrollY >= htmlWrapTop - 500) {
        htmlShow.value = true;
    } else {
        htmlShow.value = false;
    }

    if (scrollY >= docWrapTop - 500) {
        docShow.value = true;
    } else {
        docShow.value = false;
    }
}

let resize = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        lending.value.classList.add('mobile');
    } else {
        lending.value.classList.remove('mobile');
    }
}

onMounted(() => {
    // window.addEventListener('scroll', moveHtml);
    window.addEventListener('resize', resize);
})
onBeforeUnmount(() => {
    // window.removeEventListener('scroll', moveHtml);
    window.removeEventListener('resize', resize);
})


</script>

<style lang="less" scoped>
#lending.mobile {
    #intro {
        height: 100%;
        padding: 140px 20px 120px 20px;
    }
}

.codeWrap {
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    text-align: center;
    background: #434343;
    color: #FFF;
    padding: 7px 20px;
    box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);

    .codeInner {
        white-space: nowrap;
    }
    .num {
        position: relative;
        display: inline-block;
        margin-right: 2em;
        color: rgba(170,170,170);

        &::after {
            position: absolute;
            content: '';
            right: -1em;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 100%;
            background-color: #666;
        }
    }
    .line {
        display: inline-block;
    }
}

#intro {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(217deg, rgba(0, 255, 170, 1), rgba(255, 0, 0, 0) 70.71%), linear-gradient(54deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%), linear-gradient(148deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgba(252, 208, 75, 1), rgba(0, 0, 255, 1) 70.71%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;

    .introWrap {
        .introInner {
            margin: 0 auto;
        }

        .introLogo {
            width: 6em;
        }

        .mintroLogo {
            width: 193px;
            display: none;
        }

        .point {
            color: #fff;
            font-size: 3.5em;
            font-weight: 500;
            line-height: 1.6;

            span {
                text-decoration-line: underline;
                text-underline-offset : 24px;
            }
        }

        .codeWrap {
            font-size: 1.3em;
        }

        .desc {
            color: #FFF;
            font-size: 1.2em;
            font-weight: 400;
            line-height: 1.5;
        }

        a {
            text-decoration: none;
            display: inline-block;
            font-size: 1.3em;
            padding: 10px 20px 10px 40px;
            border-radius: 0 30px 30px 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
            color: #293FE6;

            h5 {
                display: inline-block;
                margin-right: 5px;
            }
            .arrow {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}

#other {
    width: 100%;
    height: 100%;

    @keyframes show {
        from {
            opacity: 0;
            transform: translateY(100px);
        }

        to {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    > div {
        width: min(1400px, 70vw);
        margin: 0 auto;
        padding-top: min(330px, 19vw);

        div {
            > .title {
                color: #262626;
                font-size: 1.8rem;
                font-weight: 700;
                // transition: all 1s;
            }
        
            > p {
                color: #000;
                font-size: 1.4rem;
                font-weight: 400;
            }
        }
    }

    .cardWrap {
        .cardInner {
            text-align: center;
            .card {
                position: relative;
                display: inline-block;
                background-color: #FAFAFA;
                width: 250px;
                text-align: left;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

                &::after {
                    display: block;
                    content: "";
                    padding-bottom: 100%;
                }

                .inner {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;

                    img {
                        height: 100px;
                    }
                }
            }
        }
    }

    // .cardWrap {
    //     .card {
    //         position: relative;
    //         display: inline-block;
    //         width: 23.5%;
    //         margin-right: 2%;
    //         margin-bottom: 2%;
    //         border-radius: 8px;
    //         background-color: #FAFAFA;
    //         border: 1px solid rgba(0, 0, 0, 0.15);
    //         box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

    //         &:nth-child(4n+4) {
    //             margin-right: 0;
    //         }

    //         &::after {
    //             display: block;
    //             content: "";
    //             padding-bottom: 100%;
    //         }

    //         .cardInner {
    //             position: absolute;
    //             top: 0;
    //             left: 0;
    //             width: 100%;
    //             height: 100%;
    //             object-fit: cover;
    //             padding: min(28px, 1.2vw);

    //             img {
    //                 height: min(100px, 4.3vw);
    //                 margin-bottom: min(36px, 1.5vw);
    //                 object-fit: contain;
    //                 align-self: start;
    //                 margin-top: min(-10px, -0.5vw);
    //                 margin-left: min(-10px, -0.5vw);
    //             }

    //             .tit {
    //                 width: 100%;
    //                 margin-bottom: min(24px, 1vw);
    //                 color: rgba(0, 0, 0, 0.8);
    //                 font-size: 1.5rem;
    //                 font-weight: 500;
    //             }

    //             .desc {
    //                 width: 100%;
    //                 color: rgba(0, 0, 0, 0.6);
    //                 font-size: 1.2rem;
    //                 font-weight: 400;
    //                 line-height: 1.3;
    //             }

    //             .mDesc {
    //                 display: none;
    //                 font-size: 1.2rem;
    //                 color: rgba(0, 0, 0, 0.6);
    //             }
    //         }
    //     }
    // }

    .htmlCode {
        .tit {
            color: #000;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .codeWrap {
            padding: 20px;
            font-size: 1.2rem;
            text-align: left;
        }
    }

    .docWrap {
        align-items: center;

        .docInner {
            display: flex;
            flex-wrap: nowrap;
        }

        .left {
            width: 40%;

            .title {
                color: rgba(0, 0, 0, 0.80);
                // font-size: min(48px, 2.1vw);
                font-size: 2.6rem;
                font-weight: 700;
                line-height: 1.3;
                opacity: 1;
            }

            a {
                color: #293FE6;
                font-size: 1.4rem;
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
        padding: 140px 0;
        background: linear-gradient(217deg, rgba(0, 255, 170, 1), rgba(255, 0, 0, 0) 70.71%), linear-gradient(54deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%), linear-gradient(148deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgba(252, 208, 75, 1), rgba(0, 0, 255, 1) 70.71%);
        color: #FFF;
        text-align: center;

        h2 {
            font-size: 3.1rem;
            font-weight: 700;
        }

        h3 {
            font-size: 1.3rem;
            font-weight: 500;
        }

        a {
            padding: 12px 28px;
            border-radius: 8px;
            background: #293FE6;
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
            text-decoration: none;
        }
    }
}

@media (max-width:1500px) {
    #other {
        >div {
            width: 940px;
            padding-top: 248px;
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
                        font-size: 1.2rem;
                        margin-bottom: 12px;
                    }

                    .desc {
                        font-size: 1rem;
                        line-height: 20px;
                    }
                }
            }
        }

        .htmlWrap {
            .htmlInner {
                width: 100%;
                margin: 0 auto;
            }
        }

        .docWrap {
            width: 100%;

            .docInner {
                width: 940px;
                margin: 0 auto;
            }

            .right {
                width: 57%;
                margin-left: 3%;
            }
        }

        .joinWrap {
            padding: 80px 0;
        }
    }
}

@media (max-width:980px) {
    #other {
        >div {
            padding-left: 20px;
            padding-right: 20px;
            width: 100%;
        }
        .cardWrap {
            .card {
                width: 32%;

                &:nth-child(4n+4) {
                    margin-right: 2%;
                }

                &:nth-child(3n+3) {
                    margin-right: 0;
                }
            }
        }
        .htmlCode {
            .codeWrap {
                font-size: 1rem;
            }
        }
        .docWrap {
            .docInner {
                width: 100%;
                flex-wrap: wrap;
            }
            .left, .right {
                width: 100%;
                margin: 0;
            }
            .left {
                margin-bottom: 30px;
            }
        }
    }
}

@media (max-width: 690px) {
    #intro {
        padding: 0 20px;

        .introWrap {
            min-width: 100%;
            .introLogo {
                display: none;
            }

            .mintroLogo {
                display: block;
            }
            .point {
                font-size: 3em;

                span {
                    text-underline-offset: 15px;
                }
            }
            .codeWrap {
                width: 100%;
                overflow: auto;
            }
        }
    }

    #other {
        >div {
            width: 100%;
            padding-top: 100px;

            div {
                > p {
                    display: none;
                }
            }
        }

        .packageWrap,
        .htmlWrap {
            padding-top: 100px;

            .packageInner,
            .htmlInner {
                width: 100%;
            }
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

                    .desc {
                        display: none;
                    }

                    .mDesc {
                        display: block;
                    }
                }
            }
        }

        .htmlCode {
            .codeWrap {
                overflow: hidden;

                .codeInner {
                    overflow: auto;
                }
            }
        }

        .docWrap {
            display: none;
        }
        .joinWrap {
            h2 {
                font-size: 2.5rem;
            }
        }
    }
}

@media (max-width: 420px) {
    #intro {
        .introWrap {
            .point {
                font-size: 2.1rem;
            }
        }
    }
}
</style>
