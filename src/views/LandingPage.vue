<template lang="pug">
NavBar
#lending(ref="lending")
    section#intro(ref="intro" @wheel="handleMouseWheel")
        .introWrap 
            .introInner
                img.introLogo(src="@/assets/img/logo/symbol-logo.png")
                img.mintroLogo(src="@/assets/img/logo/text-logo-white.svg")

                br
                br

                .point
                    h1.hightlight One Line of Code
                    span  =&gt;
                    br
                    h1 Full Backend API

                br
                br

                .codeWrap
                    .codeInner
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
                    h6 Getting Started
                    .material-symbols-outlined.big.arrow arrow_forward
    section#other(ref="other")
        .packageWrap(ref="packageWrap")
            .packageInner
                h2.title(:class="{'show' : packageShow}") Skapi provides everything in one package
                br
                h4.desc(:class="{'show' : packageShow}") No more figuring out how to setup, or deploy each of your backend resources.
                br
                br
                .cardWrap(:class="{'show' : packageShow}") 
                    .cardInner
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-03.png")
                                br
                                h5.tit Database
                                br
                                br
                                p.des Simple, yet flexible #[br]database that scales
                                p.mDes Simple, yet flexible database that scales
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-04.png")
                                br
                                h5.tit Cloud Storage
                                br
                                br
                                p.des Secure, #[br]Database integrated, #[br]Expands with no-limit
                                p.mDes Secure, Database integrated, #[br]Expands with no-limit
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-05.png")
                                br
                                h5.tit Security
                                br
                                br
                                p.des Works out-of-the-box, #[br]Fully implemented in #[br]all resources
                                p.mDes Works out-of-the-box, Fully #[br]implemented in all resources
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-06.png")
                                br
                                h5.tit E-Mail service
                                br
                                br
                                p.des Verification, #[br]Sending newsletters, #[br]Notification E-mails
                                p.mDes Verification, Sending newsletters, #[br]Notification E-mails
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-07.png")
                                br
                                h5.tit Hosting
                                br
                                br
                                p.des Immediate website #[br]hosting
                                p.mDes Immediate website hosting
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-08.png")
                                br
                                h5.tit CDN
                                br
                                br
                                p.des Implemented to the #[br]cloud storage by #[br]default
                                p.mDes Implemented to the cloud storage by default
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-09.png")
                                br
                                h5.tit Load balancing
                                br
                                br
                                p.des Everything controlled #[br]internally
                                p.mDes Everything controlled internally
                        .card
                            .inner
                                img(src="@/assets/img/icon/icons-10.png")
                                br
                                h5.tit Serverless
                                br
                                br
                                p.des No deployment, #[br]No installation #[br]required
                                p.mDes No deployment, No installation required
        .htmlWrap(ref="htmlWrap")
            .htmlInner
                h2.title(:class="{'show' : htmlShow}") Compatible with either #[br]pure HTML projects or any SPA frameworks
                br
                h4.desc(:class="{'show' : htmlShow}") No additional settings, Just import Skapi library in your HTML file and you’re ready to go.
                br
                br
                .htmlCode(:class="{'show' : htmlShow}") 
                    h6.tit index.html 
                    .codeWrap
                        .codeInner
                            .line
                                div
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") !DOCTYPE 
                                    span(style="color:#a8ff58") html
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
                                    span(style="color:#ff3399") script
                                    span(style="color:#f0f0f0") &gt;
                                div
                                    span(style="color:#ff3399") &nbsp;&nbsp;&nbsp;&nbsp;let 
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
                    h2.title.big Written in #[br]human language
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
import NavBar from '@/components/NavBar.vue';

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
    window.addEventListener('scroll', moveHtml);
    window.addEventListener('resize', resize);
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', moveHtml);
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

#intro {
    width: 100vw;
    height: 100vh;
    padding: 0 20px;
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
            width: 6rem;
        }

        .mintroLogo {
            // width: 193px;
            width: 12rem;
            display: none;
        }

        .point {
            color: #fff;
            font-weight: 500;
            line-height: 1.6;

            h1 {
                font-weight: 500;
                display: inline-block;

                &.hightlight {
                    text-decoration-line: underline;
                    text-underline-offset : 24px;
                    text-decoration-thickness: 4px;
                }
            }
            span {
                font-size: 3.5rem;
            }
        }

        .codeWrap {
            font-size: 1.2rem;

            .codeInner {
                overflow: auto;
            }
        }

        .desc {
            color: #FFF;
            font-weight: 400;
            line-height: 1.5;
        }

        a {
            text-decoration: none;
            display: inline-block;
            padding: 10px 20px 10px 40px;
            border-radius: 0 30px 30px 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
            color: #293FE6;

            * {
                display: inline-block;
                vertical-align: middle;
            }
            .arrow {
                margin-left: 5px;
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
        // width: min(1400px, 70vw);
        padding: 0 20px;
        padding-top: min(330px, 19vw);
        width: 1400px;
        margin: 0 auto;

        div {
            .title {
                color: #262626;

                &.big {
                    font-size: 2.5rem;
                }
            }
        
            .desc {
                color: #000;
                font-weight: 400;
            }
        }
    }

    .cardWrap {
        .cardInner {
            .card {
                position: relative;
                display: inline-block;
                vertical-align: middle;
                background-color: #FAFAFA;
                width: 320px;
                height: 320px;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);
                margin-right: 20px;
                margin-bottom: 20px;

                .inner {
                    img {
                        height: 100px;
                    }
                    .tit {
                        width: 100%;
                        color: rgba(0, 0, 0, 0.8);
                        font-weight: 500;
                        padding-left: 20px;
                    }

                    .des {
                        width: 100%;
                        color: rgba(0, 0, 0, 0.6);
                        font-weight: 400;
                        line-height: 1.3;
                        padding-left: 20px;
                    }

                    .mDes {
                        display: none;
                        color: rgba(0, 0, 0, 0.6);
                        padding-left: 20px;
                    }
                }
            }
        }
    }

    .htmlCode {
        .tit {
            color: #000;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .codeWrap {
            padding: 20px;
            font-size: 1.1rem;
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
                font-weight: 700;
                line-height: 1.3;
                opacity: 1;
            }

            a {
                color: #293FE6;
                font-weight: 700;
                font-size: 1.2rem;
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

@media (max-width:1440px) {
    #other {
        > div {
            width: 100%;
        }
    }
}

@media (max-width:720px) {
    .introWrap {
        min-width: 100%;
    }
    .docWrap {
        display: none;
    }
}
</style>
