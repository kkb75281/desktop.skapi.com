<template lang="pug">
#landing
    section.intro.gradback
        .introInner(ref="intro")
            img.introLogo(src="@/assets/img/logo/text-logo-white.svg")
            br
            br
            h1.underline One Line of Code&nbsp;=&gt;
            br
            h1 Complete Backend&nbsp;API
            br
            br
            p Integrate Your Website with a Robust Backend&nbsp;API
            br
            br
            br
            .mobileCenter
                a.customButton.shadow(href='/signup' style='background-color:white;color:black;margin: 0 1rem 1rem 0;') Try Out For Free
                a.customButton.outline(href='https://docs.skapi.com' target="_blank" style='color:white;margin: 0 1rem 1rem 0;') Documentation

    br

    section.intact.fullWidthOnMobile(style='text-align:center;')
        .inline(style='width:50%')
            h2(style='text-align:left') Skapi
            br
            h3(style='text-align:left;')
                | Instant 
                span(style='color:#293FE6') Backend API Service&nbsp;
                | for Your HTML Web&nbsp;Application.
        img(src="@/assets/img/Skapi_Img1.jpg" style='width:50%;vertical-align:middle;')

    br
    br
    br

    .shine
        .frameShine(src="@/assets/img/FrameShine.png")
        img.frameLogo(src="@/assets/img/FrameLogo.png")

    section.intact
        h2 Your Backend, Simplified

        br
        br

        p
            | Skapi bundles everything you expect from a backend server into a single, 
            span ready-to-go package.

        br
        br
        .fullWidthOnTablet
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-03.png")
                .inline.desc
                    h3 Database
                    p Simple, scalable, yet flexible database at your service
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
                    h3 Security
                    p Solid security for your users and data.
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-06.png")
                .inline.desc
                    h3 Email System
                    p Simplified email automation and newsletters
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-07.png")
                .inline.desc
                    h3 Instant Hosting
                    p Host your HTML content swiftly
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-08.png")
                .inline.desc
                    h3 CDN
                    p Fast content delivery across the globe
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-11.png")
                .inline.desc
                    h3 API Bridge
                    p Secure request to your custom APIs

    br
    br
    br

    section.intact
        h2 No&nbsp;Deployment, No&nbsp;Complex&nbsp;Setup, No&nbsp;Configuration&nbsp;Puzzles

        br
        br

        p Just initialize the Skapi JS library from your index.html, and everything is ready out of the box.

        br

        pre(style='opacity:0.5;font-size:.8rem;margin-bottom:.5em;') index.html 

        .code
            div
                span(style="color:#33adff") &lt;
                span(style="color:#33adff") !DOCTYPE 
                span(style="color:#58dfff") html
                span(style="color:#33adff") &gt;
            div
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
            div
                span(style="color:#33adff") &lt;
                span(style="color:#33adff") script
                span(style="color:#33adff") &gt;
            div
                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const 
                span skapi 
                span = 
                span(style="color:#33adff") new 
                span Skapi( 
                span(style="color:#ffa600") 'YOUR_SERVICE_ID' 
                span ,  
                span(style="color:#ffa600") 'YOUR_OWNER_ID' 
                span );
            div
                span(style="color:#33adff") &lt;/
                span(style="color:#33adff") script
                span(style="color:#33adff") &gt;

        br

    br
    br
    br

    section.intact 
        h2 Designed for Frontend Developers

        br
        br

        p Skapi is designed for anyone with a basic HTML/JavaScript knowleadge.
        p Compatible with both classic HTML and SPA frameworks, it ensures HTML forms functions as intended.

        br
        p Witness how simple it is to integrate your HTML forms with Skapi's backend API.

        br

        pre(style='opacity:0.5;font-size:.8rem;margin-bottom:.5em') Example: Login form

        .code
            div
                span(style="color:#33adff") &lt;
                span(style="color:#33adff") form
                span(style="color:#58dfff")  onsubmit
                | =
                span(style="color:#ffa600") "skapi.login(event)"
                span(style="color:#58dfff")  action
                | =
                span(style="color:#ffa600") "login-success.html"
                span(style="color:#33adff") &gt;
            div
                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  name
                | =
                span(style="color:#ffa600") "email"
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "email"
                span(style="color:#33adff") &gt;
            div
                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  name
                | =
                span(style="color:#ffa600") "password"
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "password"
                span(style="color:#33adff") &gt;
            div
                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "submit"
                span(style="color:#33adff") &gt;
            div
                span(style="color:#33adff") &lt;/
                span(style="color:#33adff") form
                span(style="color:#33adff") &gt;

        br
        br

        div(style='text-align:right;')
            p.inline(style='vertical-align:middle') Want to know more?
            a.customButton(href='https://docs.skapi.com/introduction/getting-started.html' target="_blank" style='margin: .25rem 0 .25rem 1rem;vertical-align:middle;background-color:black;color:white;') Documentation

    br
    br
    br

    section.intact.fullWidthOnMobile(style='text-align:center;')
        img(src="@/assets/img/Skapi_Img2.jpg" style='width:50%;vertical-align:middle;')
        .inline(style='width:50%;vertical-align:middle;')
            h2(style='text-align:left') Database:
            h2(style='text-align:left') Simple, Flexible, Scalable
            br
            br
            p(style='text-align:left') Skapi's unique database design provides both scalability and flexibility without the need for manual schema design.
            br
            p(style='text-align:left') The index structure is thoughtfully engineered, crafted to cater a diverse range of applications with such simplicity.

    section.intact.fullWidthOnMobile(style='text-align:center;')
        .inline(style='width:50%;vertical-align:middle;')
            h2(style='text-align:left') Cloud Storage:
            h2(style='text-align:left') Database Integrated
            br
            br
            p(style='text-align:left') Cloud storage integrated with the database and served through the CDN without any extra coding or configuration.
            br
            p(style='text-align:left') Provides direct secure upload via HTML forms up to file size of 5tb.
        img(src="@/assets/img/Skapi_Img2.jpg" style='width:50%;vertical-align:middle;')

    section.gradback.fullWidthOnMobile(style='text-align:center;padding:4rem 0;')

        h2.inline(style='color:white;opacity:1') We are on Public Beta
        br
        h2.inline(style='color:white;opacity:1') Sign up while it's free!
        br
        br
        a.customButton.shadow(href='/signup' style='background-color:black;color:white;') Sign Up
</template>

<style lang="less" scoped>
#landing {
    max-width: 100vw;
}

.code {
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    overflow-x: auto;
    white-space: pre;
    border-radius: 8px;
    font-family: monospace;
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
    max-width: 960px;
    box-sizing: content-box;
    position: relative;
    padding: 1rem;
    margin: auto;
}

img {
    display: inline-block;
}

h1 {
    font-size: 2.4em;
    // font-weight: 500;
    line-height: 1.2;
}

h2,
h3 {
    opacity: .8;
}

p,
h2,
h3 {
    line-height: 1.5;
}

.outline {
    box-shadow: inset 0 0 0 2px #FFF;
}

.customButton {
    font-size: 14px;
    min-width: 169px;
    max-width: 100px;
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
    padding: 10rem 1em 8rem;

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
        // background-color: #434343;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 4px;
    }
}

.shine {
    text-align: center;
    height: 210px;
    position: relative;

    img.frameLogo {
        width: 162px;
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
            top: 64px;
        }
    }
}

.featureCollection {
    display: inline-block;
    width: 50%;
    margin-bottom: 1.5rem;
    position: relative;

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
            padding: 2px 0.25em;
        }

        h3 {
            margin-bottom: 0.25rem;
            background-color: white;
            border-radius: 8px;
            display: inline-block;
        }
    }
}
</style>
