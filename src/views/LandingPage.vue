<template lang="pug">
NavBar(style='--position: absolute;')
#landing
    section.intro.gradback
        .introInner(ref="intro")
            img.introLogo(src="@/assets/img/logo/text-logo-white.svg")
            br
            br

            h1.underline(style='font-size:2.2em') One Line of Code&nbsp;=&gt;

            br

            h1(style='font-size:2.1em') Instant Backend&nbsp;API

            br
            br

            p(style='font-weight:700') All-in-One Backend Solution for Your Web Application

            br
            br
            br

            .tabletCenter
                a.customButton.shadow(v-if='!account' href='/signup' style='background-color:white;color:black;margin: 0 .5rem 1rem .5rem;') Try Out For Free
                a.customButton.shadow(v-else href='/dashboard' style='background-color:white;color:black;margin: 0 .5rem 1rem .5rem;') Go To Dashboard
                //a.customButton.outline(href='https://docs.skapi.com/introduction/getting-started.html' target="_blank" style='color:white;margin: 0 .5rem 1rem .5rem;') Getting Started

    br
    br
    br

    section.intact(style="text-align:center;")
        img(src="@/assets/img/logo/symbol-logo.png" style='width:6rem; max-width:80%;vertical-align:middle;')
        
        br
        br
        
        
        h2 Backend Server, Simplified

        br
        br

        .code
            span(style="color:#33adff") &lt;
            span(style="color:#33adff") script 
            span(style="color:#58dfff") src
            span =
            span(style="color:#ffa600") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"
            span(style="color:#33adff") 
            span(style="color:#33adff") &gt;
            span(style="color:#33adff") &lt;/
            span(style="color:#33adff") script
            span(style="color:#33adff") &gt;
        
        br
        br
        br

        a.customButton.outline(href='https://docs.skapi.com/introduction/getting-started.html' target="_blank" style='padding: 0.8em 1em;vertical-align:middle;color:#293FE6;') Getting Started
    br
    br
    br
    br

    section.intact.fullWidthOnTablet(style='text-align:center;')
        img(src="@/assets/img/landingpage/1.png" style='padding: 2rem;padding-top:0;width:50%;vertical-align:middle;')

        .inline(style='width:50%;text-align:left;vertical-align:middle;')
            h3(style='color:#293FE6') Seamless Server Integration
            h3 with Your Web Projects

            br

            p From&nbsp;static&nbsp;HTML to complex &nbsp;SPA projects, Skapi is compatible&nbsp;with&nbsp;any type of projects.

    br
    br
    br

    section.intact.fullWidthOnTablet
        .leftOnTablet.inline(style='width:70%;vertical-align:middle;')
            h3(style='color:#293FE6') Do It With HTML,
            h3 No backend Code Required

            br

            p(style='position:relative;')
                | Basic HTML and JavaScript skills is all you need.
            p Withness how simple it is to build a login form with Skapi:

            br

            .code.loginExample(style='position:relative;width:100%')
                span(style="color:#33adff") &lt;
                span(style="color:#33adff") form
                span(style="color:#58dfff")  onsubmit
                | =
                span(style="color:#ffa600") "skapi.login(event)"
                span(style="color:#58dfff")  action
                | =
                span(style="color:#ffa600") "login-success.html"
                span(style="color:#33adff") &gt;

                br

                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  name
                | =
                span(style="color:#ffa600") "email"
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "email"
                span(style="color:#33adff") &gt;

                br

                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  name
                | =
                span(style="color:#ffa600") "password"
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "password"
                span(style="color:#33adff") &gt;

                br

                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "submit" 
                span(style="color:#58dfff") value
                | =
                span(style="color:#ffa600") "Login"
                span(style="color:#33adff") &gt;

                br

                span(style="color:#33adff") &lt;/
                span(style="color:#33adff") form
                span(style="color:#33adff") &gt;
        img.loginExamplePic.hideOnTablet(src="@/assets/img/landingpage/4.png" style='vertical-align:middle;')

    br
    br
    br

    section.intact.fullWidthOnTablet
        h3 Powered by Serverless Technology
        
        br

        ul(style='padding-left: 1rem;')
            li(style='color:#293FE6')
                h4(style='color:#293FE6;margin-bottom: .25em;') Lower Your Costs By 10x
                p Thanks to our well-architected serverless system, Skapi significantly reduces backend operational costs, accelerating your project development.
            
            
            br

            li(style='color:#293FE6')
                h4(style='color:#293FE6;margin-bottom: .25em;') Scale Without Limits
                p Built to scale effortlessly, Skapi handles your concurrent connections without any manual intervention.

            br

            li(style='color:#293FE6')
                h4(style='color:#293FE6;margin-bottom: .25em;') No Setup, No Deployment
                p Farewell to complex backend deployment hassles. Everything is managed from the frontend, streamlining your development process.
            

    br
    br

    section.intact.fullWidthOnTablet(style='text-align:center;')
        .inline(style='width:60%;vertical-align:middle;') 
            h3(style='text-align:left')
                span(style='color:#293FE6') Flexible,&nbsp;
                | Schemaless&nbsp;Database

            br.hideOnTablet
            img.showOnTablet(src="@/assets/img/landingpage/2.png" style='padding: 2rem;width:100%;vertical-align:middle;display:none;')

            p(style='text-align:left') Skapi's thoughtfully engineered auto&nbsp;indexing&nbsp;system delivers full scalability and flexibility without&nbsp;any&nbsp;manual&nbsp;schema&nbsp;design. 
            br
            p(style='text-align:left') The database is optimized for a diverse range of applications with simplicity, while preventing cost overruns and performance issues.
        img.hideOnTablet(src="@/assets/img/landingpage/2.png" style='padding: 2rem;width:40%;vertical-align:middle;')

    br
    br
    br

    section.intact(style='padding-bottom:0')
        h3
            span(style='color:#293FE6;') Huge Files,&nbsp;
            | Fast&nbsp;Delivery

    br

    section.intact.fullWidthOnTablet(style='text-align:center;padding-top:0')
        img(src="@/assets/img/landingpage/3.png" style='padding: 2rem;padding-top:0;width:40%;vertical-align:middle;')
        .inline(style='width:60%;vertical-align:middle;')
            p(style='text-align:left') You can upload huge files directly from&nbsp;HTML&nbsp;forms.
            p(style='text-align:left') Your data is served through the CDN network, without any extra configuration.

            br
            br
            br
            br
            
            //- .mobileCenter(style='text-align:left;')
            //-     p.inline(style='font-weight:700;color:#293FE6;margin:.5rem 0') Curious for more?&nbsp;&nbsp;&nbsp;&nbsp;
            //-     a.customButton.outline(href='https://docs.skapi.com/introduction/getting-started.html' target="_blank" style='padding: 0.8em 1em;vertical-align:middle;color:#293FE6;') Explore our Documentation


    br
    br
    
    .shine
        .frameShine(src="@/assets/img/FrameShine.png")
        img.frameLogo(src="@/assets/img/FrameLogo.png")

    section.intact.leftOnTablet.fullWidthOnTablet(style='text-align:center;padding-top:0;')
        br
        br

        h2(style='opacity:1;text-shadow: -2px -2px 0 WHITE;opacity:1;line-height:2') All-in-One Package
        p Skapi provides all the essential backend resources you need in a single javascript library.

    section.intact
        .fullWidthOnTablet
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-03.png")
                .inline.desc
                    h3 Database
                    p Auto-indexed database that scales
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-04.png")
                .inline.desc
                    h3 Cloud Storage
                    p Robust storage solutions for any data size
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-05.png")
                .inline.desc
                    h3 Authentication
                    p Solid security for your users and data
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-08.png")
                .inline.desc
                    h3 CDN
                    p Fast content delivery across the globe
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-12-trans.png" style='padding:10px;')
                .inline.desc
                    h3 Realtime Data
                    p Build chat, games, push notifications in no time
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-07.png")
                .inline.desc
                    h3 Instant Hosting
                    p Host your HTML content swiftly
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-06.png")
                .inline.desc
                    h3 Auto Email System
                    p Automated Emails and newsletters
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-11.png")
                .inline.desc
                    h3 API Bridge
                    p Expand with your own custom APIs

    br
    br

    section.gradback(style='text-align:center;padding:4rem 0;')
        h2.inline(style='color:white;opacity:1') Skapi is on Free Beta
        br
        br
        
        a.customButton.shadow(v-if='!account' href='/signup' style='background-color:black;color:white;') Sign-up
        a.customButton.shadow(v-else href='/dashboard' style='background-color:black;color:white;') Go To Dashboard

    br
    br
    br
    br

    section.intact

        h2 FAQ 

        br

        .faq
            h3 What Can You Build With Skapi?
            p.
                Photo-sharing websites, chat application, file-sharing applications, social media platforms, newsletter subscription services, or&nbsp;any&nbsp;other&nbsp;application that requires a web server.
                Skapi is a complete backend API service that provides everything you'd expect from a backend server.

        br
        br

        .faq
            h3 Is Skapi Typescript Supported?
            p Yes, Skapi is written in Typescript and is fully compatible with Typescript.

        br
        br

        .faq
            h3 What Are the Pricing Plans?
            p
                | Skapi is currently on free beta. We will announce the pricing plan soon.&nbsp;
                a(href='/signup') Sign Up&nbsp;
                | while it's free!

        br
        br

        .faq
            h3 Do I Need Basic&nbsp;Knowledge of Backend&nbsp;Development?
            p No, Skapi is designed for frontend developers. You can build a complete full stack application without&nbsp;writing&nbsp;a&nbsp;single&nbsp;line of backend code, or even touching a terminal window.

        br
        br

        .faq
            h3 Where can I get help?
            p 
                | You can reach us at our&nbsp;
                a(href='https://discord.com/channels/1164154380816236626/1164154381269213188' target="_blank") Discord&nbsp;server
                | . We are happy to help you with any questions you may have.
    br
    br
    br
    br

</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { account } from '../main';
</script>

<style lang="less" scoped>
.faq {
    h3 {
        line-height: 1.5;

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: rgba(0, 0, 0, 0.6);
            margin: .5em 0;
        }
    }
}

#landing {
    max-width: 100vw;
}

.loginExamplePic {
    position: relative;
    width: 30%;
    right: 0;
    padding: 0.5rem;
}

.code {
    display: inline-block;
    text-align: left;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    overflow-x: auto;
    white-space: pre;
    border-radius: 8px;
    font-family: monospace;
    max-width: 100%;
    // width: 830px;
    box-shadow: inset -3px -3px 4px 0px rgba(255, 255, 255, 0.2);
    font-size: 14px;

    &>* {
        display: inline-block;
    }
}

span {
    display: inline-block;
}

#landing {
    background-color: white;
}

.inline {
    display: inline-block;
}

section.intact {
    max-width: 1080px;
    // box-sizing: content-box;
    position: relative;
    padding: 0 1rem 2rem 1rem;
    margin: auto;
}

img {
    display: inline-block;
    max-width: 500px;
}

h1 {
    font-size: 2.4em;
    line-height: 1.2;
}

h2,
h3 {
    opacity: .8;
}

// h2,
p,
h3,
h4 {
    line-height: 1.33;
}
h4 {
    font-size: 1.33rem;
    color: rgba(0, 0, 0, 0.6)
}
p {
    color: rgba(0, 0, 0, 0.6)
}

.outline {
    box-shadow: inset 0 0 0 2px;
    font-weight: 600;
}

.customButton {
    font-size: 16px;
    min-width: 169px;
    box-sizing: border-box;
    padding: 0.8em 2.3em;
    text-decoration: none;
    border-radius: 8px;
    display: inline-block;
}

.shadow {
    box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
}

@media all and (max-width:767px) {
    .fullWidthOnTablet {
        &>* {
            width: 100% !important;
        }
    }

    .leftOnTablet {
        &>* {
            text-align: left !important;
        }
    }

    .hideOnTablet {
        display: none !important;
    }

    .showOnTablet {
        display: inline-block !important;
    }

    .tabletCenter {
        text-align: center !important;
    }
}

@media all and (max-width:480px) {
    .mobileCenter {
        text-align: center !important;
    }

    .fullWidthOnMobile {
        &>* {
            width: 100% !important;
        }
    }
}

.gradback {
    background: linear-gradient(217deg, rgba(0, 255, 170, 1), rgba(255, 0, 0, 0) 70.71%), linear-gradient(54deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%), linear-gradient(148deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgba(252, 208, 75, 1), rgba(0, 0, 255, 1) 70.71%);
}

section.intro {
    padding: 10rem 1em 6rem;
    text-align: center;
    line-height: 1;

    .introInner {
        display: inline-block;
        margin: 0 auto;
        text-align: left;
    }

    .introLogo {
        width: 12em;
        max-width: 80%;
    }

    h1 {
        color: #fff;

        &.underline {
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-underline-offset: .5em;
            line-height: 1.5;
        }
    }

    p {
        font-weight: 500;
        color: #fff;
        line-height: 1.5;
        padding: 4px 1rem;
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        border: black solid 1px;
    }
}

.shine {
    text-align: center;
    height: 210px;
    position: relative;

    img.frameLogo {
        width: 9rem;
        position: absolute;
        transform: translateX(-50%);
    }

    .frameShine {
        position: absolute;
        width: 100%;
        overflow: hidden;
        height: 100vw;

        &::before {
            content: '';
            width: 100vw;
            height: 100vw;
            display: inline-block;
            position: absolute;
            background: linear-gradient(135deg, rgba(112, 169, 255, 0.15) 0%, rgba(134, 255, 240, 0) 75vw);
            transform-origin: top left;
            transform: rotate(45deg);
            top: 3.5rem;
        }
    }
}

.featureCollection {
    display: inline-block;
    width: 50%;
    margin-bottom: 1.5rem;
    position: relative;
    min-height: 5.2rem;

    &>* {
        vertical-align: text-top;
    }

    .circle {
        width: 4.5rem;
        height: 4.5rem;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: white;

        &>img {
            width: 100%;
        }

        border: 1px solid rgba(0, 0, 0, 0.05);
        margin-right: 1rem;
        box-shadow: 8px 8px 36px rgba(0, 0, 0, 0.1);
        border-radius: 100%;
        padding: 0.5rem;
    }

    .desc {
        width: calc(100% - 5.5rem);
        padding: 0 0.25rem;

        h3,
        p {
            padding: 2px 0;
            opacity: 1;
            line-height: 1.2;
        }
    }
}
</style>
