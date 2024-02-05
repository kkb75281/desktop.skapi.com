<template lang="pug">
NavBar(style='--position: fixed; --background-color:#262626')
#landing
    section.intro.gradback
        img(src="@/assets/img/logo/logo.svg" style="width:19rem;")
        br
        br
        h1 Backend API Library for HTML Frontend
        br
        .code
            span &lt;
            span(style="color:#44E9FF") script src
            span &#61;
            span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"
            span &gt;&lt;/
            span(style="color:#44E9FF") script 
            span &gt;
        br
        br
        .code npm i skapi-js

    section.dark
        .wrap.intact
            .desc
                h1 Backend-Powered Frontend
                p Build full-stack websites directly from your HTML frontend. 
                p(style="color:#FFED91;") No server required.

    section.blue(style="padding: 6rem 0rem 10rem;")
        .wrap.intact 
            .explain.one
                .image(style="width:23%")  
                    img(src="@/assets/img/landingpage/feature1.png") 
                .desc(style="width:73%")
                    .tit
                        h2 User-Centric
                        span  Database Design
                    br
                    br
                    p Your users own their data and decide on security levels and data structure. Skapi introduces a secure, user-centric database approach that does not require any database pre-configuration.
            br
            br
            br
            br
            br
            br
            br
            .explain.two
                .image(style="width:23%")
                    img(src="@/assets/img/landingpage/feature2.png" style="width:90%;")
                .desc(style="width:73%") 
                    .tit 
                        h2 Serverless Technology, 
                        br
                        span Scale without limits
                    br
                    br
                    p Skapi chains your entire backend infrastructure using serverless technology, enabling direct access without a central server.
            br
            br
            br
            br
            br
            br
            br
            .explain.three
                .desc(style="width:50%")
                    .tit 
                        h2 External API Integration
                        span Made Easy
                    br
                    br
                    p Skapi provides an API bridge where your users can securely request your custom or 3rd-party API services.
                .image(style="width:46%") 
                    img(src="@/assets/img/landingpage/feature3.png")
            br
            br
            br
            br
            br
            .explain.four
                .image(style="width:38%")
                    img(src="@/assets/img/landingpage/feature4.png")
                .desc(style="width:58%")
                    .tit 
                        h2(v-if="isMobile") No Vendor #[br]Lock-in
                        h2(v-else) No Vendor Lock-in
                    br
                    br
                    p Full control of your service data. Execute administrator-level tasks from your browser.

    section.intact.frame(style="padding: 7rem 1rem 8rem;")
        .image(style="width:46%;margin-right:4%;")
            img(src="@/assets/img/landingpage/frameworks.png")
        .desc(style="width:50%; color:#000") 
            .tit 
                span Compatible with 
                h2 Any Framework
            br
            p(style="font-size:1.6rem;line-height:2rem") Skapi is built to be compatible with any frontend framework, including vanilla HTML.

    section.intact.features(style="text-align: center;") 
        h2(style="color:#293FE6;font-weight:700;") Skapi Features
        br
        br
        .featureWrap(style="margin:0 auto;")
            .featureInner(style="text-align:left;")
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/database.png")
                    span Database
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/cloud.png")
                    span Cloud Storage
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/email.png")
                    span Automated #[br] E-Mail Service
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/security.png")
                    span Security
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/cdn.png")
                    span CDN
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/hosting.png")
                    span Instant Hosting
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/api.png")
                    span API Bridge
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/realtime.png" style="width:2.3rem;")
                    span Realtime Data
                .feature
                    .image 
                        img(src="@/assets/img/landingpage/typescript.png" style="width:1.8rem;")
                    span TypeScript support

    section.intact.doc
        img(src="@/assets/img/logo/symbol-logo.png" style="width:37px;margin-right:0.8rem;")
        span Check out our&nbsp;
        a(href="https://docs.skapi.com/" target="_blank") Documentation

    section.intact.video(style="text-align:center;margin-bottom:9rem;")
        .iframeContainer
            iframe(src="https://www.youtube.com/embed/y31F1ko9LbU?si=R3jS_reo2N1vY3hb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen)

    section.blue(style="padding:4rem 0;")
        .wrap.intact(style="text-align:center;color:#fff;") 
            img(src="@/assets/img/logo/symbol-logo-white.png" style="width:80px;")
            br
            br
            h3(style="font-size:1.6rem;font-weight:500;") Sign-up while it’s free
            br
            p(style="font-size:1.2rem;") Now we are in a promotion event !
            br
            a.customButton(v-if='account' href="/dashboard") Start my project
            a.customButton(v-else href="/signup") Sign-up

    section.intact.updates 
        h2 Updates
        .update 
            .title(style="line-height:1.8")
                span.date(style="color:rgba(0,0,0,0.6);margin-right:20px;") 2024. 02. 02
                h5(style="display:inline-block;color:#293FE6;") Skapi 1.1.0 version will be open soon
            br
            p We will soon reach the stable release (1.1.0) of Skapi! For early adopters who have created a service before the stable release, we will continue to provide your service free for an unlimited time.

    footer(style="padding:3.5rem 2rem;color:#fff;")
        img(src="@/assets/img/logo/logo-white.svg" style="width:126px;")
        br
        br
        h6(style="font-weight:500;") broadway Inc. BROADWAYINC PTE. LTD. Singapore.
        br
        router-link(to="/privacy" target="_blank") [Privacy & Policy]
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { account } from "@/main";

let showCode = ref("post");
let isMobile = ref(false);

let showNavBar = (e) => {
    let navBar = document.getElementById("top");

    if (e.deltaY > 0) {
    navBar.style.top = "-60px";
    } else {
    navBar.style.top = "0";
    }
};

let windowSize = () => {
    if (window.innerWidth < 480) {
        isMobile.value = true;
    } else {
        isMobile.value = false;
    }
}

onMounted(() => {
  window.addEventListener("wheel", showNavBar);
});
onBeforeUnmount(() => {
  window.removeEventListener("wheel", showNavBar);
});
</script>

<style lang="less" scoped>
summary::-webkit-details-marker {
    /* Safari 브라우저용 사용자 정의 스타일 */
    display: none;
}
summary {
    position: relative;
    list-style-type: none; /* 그 외의 브라우저용 사용자 정의 스타일 */
    cursor: pointer;
    padding: 20px 0;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 500;

    ::marker {
    content: "";
    }
    &::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.6);
    }
    &:after {
    position: absolute;
    content: "";
    background: url("@/assets/img/landingpage/plus.svg") no-repeat;
    right: 0;
    width: 30px;
    height: 30px;
    background-size: contain;
    }
}
details[open] summary:after {
    background: url("@/assets/img/landingpage/minus.svg") no-repeat;
    width: 30px;
    height: 30px;
    background-size: contain;
}

#landing {
    max-width: 100vw;
    background-color: #f0f0f0;
}

.gradback {
  background: linear-gradient(217deg, rgba(0, 255, 170, 1), rgba(255, 0, 0, 0) 70.71%),
    linear-gradient(54deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(148deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(252, 208, 75, 1), rgba(0, 0, 255, 1) 70.71%);
}

.iframeContainer {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;  
    padding-top: calc(9/16 * 100%);

    iframe {
        position: absolute;
        padding: 0;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
}

.customButton {
    font-size: 1rem;
    font-weight: 700;
    min-width: 169px;
    box-sizing: border-box;
    padding: 0.6em 1.4em;
    text-decoration: none;
    border-radius: 8px;
    display: inline-block;
    background-color: #fff;
    color: #293FE6;
} 

.intact {
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
    padding: 0 1rem;
}

.blue {
    background: linear-gradient(258deg, #4F95E9 8.82%, #4484D9 30.32%, #4C5DE3 51.82%, #3F4BD5 73.32%, #282CC7 94.81%, #4343E0 116.31%);
}

section {
    // width: 100vw; // display: block is always full width of parent
    margin: 0 auto;

    h1,
    h2,
    h5 {
        font-weight: 500;
    }
    h1 {
        font-size: 2.4rem;
        color: #fff;
    }
    h2 {
        font-size: 2rem;
    }
    .image {
        display: inline-block;
        vertical-align: middle;

        img {
            width: 100%;
        }
    }
    .desc {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        font-size: 2rem;

        h2 {
            display: inline-block;
            font-weight: 700;
        }
        span {
            font-weight: 500;
        }
        p {
            font-size: 1.2rem;
            font-weight: 400;
        }
    }
    &.intro {
        width: 100%;
        text-align: center;
        padding: 15rem 40px 15rem 40px;
        overflow: hidden;

        h1 {
            font-weight: 600;
        }
        .code {
            display: inline-block;
            padding: 12px 36px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: #434343;
            font-size: 0.9rem;
            font-family: monospace;
            color: #fff;
            filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.3));
            word-break: break-all;
        }
    }
    &.dark {
        padding: 12rem 0;
        background: #1f1f1f;

        position: relative;
        &::before {
            position: absolute;
            content: '';
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            background-image: url('@/assets/img/landingpage/code.png');
            background-size: 100rem;
            background-repeat: no-repeat;
            background-position: center center;
            opacity: 0.7;
        }
        .wrap {
            .image {
                display: none;
            }
            .desc {
                position: relative;
                width: unset !important;
                max-width: 500px !important;

                h1 {
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                }
                p {
                    font-weight: 500;
                    font-size: 1.6rem;
                    line-height: 2rem;
                }
            }
        }

        // .intact {
        //     div {
        //         display: inline-block;
        //         vertical-align: middle;
        //         color: #fff;

        //         &:first-child {
        //             width: 43%;
        //             margin-right: 2%;
        //         }
        //         &:last-child {
        //             width: 55%;
        //         }
        //         img {
        //             height: 500px;
        //             object-fit: cover;

        //         }
        //         h1 {
        //             font-weight: 700;
        //             margin-bottom: 1.5rem;
        //         }
        //         p {
        //             font-weight: 500;
        //             font-size: 1.6rem;
        //             line-height: 2rem;
        //         }
        //     }
        // }
    }
    &.doc {
        text-align: center;
        padding: 8rem 0;
        
        * {
            display: inline-block;
            vertical-align: middle;
        }
        a {
            font-weight: 700;
            color: #293FE6;
        }
    }
    &.updates {
        padding: 7rem 1rem;

        .update {
            position: relative;
            margin-top: 1.5rem;
            padding: 2rem 0;
            border-top: 1px solid rgba(0, 0, 0, 0.20);
            border-bottom: 1px solid rgba(0, 0, 0, 0.20);

            p {
                line-height: 1.6rem;
            }
        }
    }    
}
.explain {
    div {
        display: inline-block;
        vertical-align: middle;

        &:first-child {
            margin-right: 4%;
        }
        p {
            line-height: 1.6rem;
        }
    }
    .desc {
        .tit {
            text-shadow: 1px 1px 1px #000;
        }
        p {
            text-shadow: 1px 1px 1px #000;
        }
    }
}
.featureWrap {
    .feature {
        display: inline-block;
        vertical-align: middle;
        width: 320px;
        margin: 0.6rem;
        padding: 1rem;
        text-align: left;
        border-radius: 8px;
        background: #E5E9F3;
    }
    .icon {
      position: relative;
      width: 45px;
      height: 45px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0px 12px 36px rgba(69, 77, 255, 0.1);
      margin-right: 18px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 45px;
        scale: 0.9;
      }
    }
    p {
      max-width: 296px;
      line-height: 20px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}

@media (max-width: 825px) {
  section {
    &.intro {
      .introBottom {
        .slider {
          &:first-child, &:last-child {
            .codeWindow {
              bottom: 130px !important;
            }
          }
          .sliderInner {
            > img {
              opacity: 0;
            }
          }
          .comment, .users {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .cardWrap {
    .card {
      &:nth-child(1),
      &:nth-child(7) {
        width: 50% !important;
      }
      &:nth-child(2),
      &:nth-child(8) {
        width: calc(50% - 20px) !important;
        margin-right: 0;
      }
      &:nth-child(3),
      &:nth-child(6) {
        width: 100% !important;
        margin-right: 0;
      }
    }
}

@media (max-width: 479px) {
    section {
        &.dark {
            &::before {
                background-image: url('@/assets/img/landingpage/code_mobile.png');
                background-size: cover;
                background-position: left center;
                opacity: 0.3;
            }
        }
    }
    .explain {
        position: relative;

        &::before {
            position: absolute;
            content: '';
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            background-image: url('@/assets/img/landingpage/feature3.png');
            background-size: 13rem;
            background-repeat: no-repeat;
            background-position: right top;
            opacity: 0.5;
        }
        &.one {
            padding-top: 6rem;
            &::before {
                background-image: url('@/assets/img/landingpage/feature1.png');
            }
        }
        &.two {
            &::before {
                background-image: url('@/assets/img/landingpage/feature2.png');
                background-size: 10rem;
            }
        }
        &.four {
            padding-top: 2rem;
            &::before {
                background-image: url('@/assets/img/landingpage/feature4.png');
            }
        }
        .image {
            display: none;
        }
        .desc {
            .tit {
                position: relative;
                max-width: 300px;
            }
            p {
                position: relative;
            }
        }
        .desc {
            width: 100% !important;
        }
    }
    
}
</style>
    