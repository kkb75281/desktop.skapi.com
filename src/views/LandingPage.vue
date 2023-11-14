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

            p(style='font-weight:700') Integrate Your Website with a Robust Backend&nbsp;API

            br
            br
            br

            .tabletCenter
                a.customButton.shadow(href='/signup' style='background-color:white;color:black;margin: 0 .5rem 1rem .5rem;') Try Out For Free
                a.customButton.outline(href='https://docs.skapi.com/introduction/getting-started.html' target="_blank" style='color:white;margin: 0 .5rem 1rem .5rem;') Getting Started

    br
    br

    .shine
        .frameShine(src="@/assets/img/FrameShine.png")
        img.frameLogo(src="@/assets/img/FrameLogo.png")

    section.intact.leftOnTablet.fullWidthOnTablet(style='text-align:center;padding-top:0;')
        h2(style='opacity:1;text-shadow: -2px -2px 0 WHITE;opacity:1;line-height:2') Single&nbsp;JavaScript&nbsp;Library,
        h3(style='opacity:1;text-shadow: -2px -2px 0 WHITE;') No&nbsp;Deployment, No&nbsp;Complex&nbsp;Setup, No&nbsp;Configurations

        br
        br

        .code
            span(style="color:#33adff") &lt;
            span(style="color:#33adff") !DOCTYPE 
            span(style="color:#58dfff") html
            span(style="color:#33adff") &gt;

            br

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

            span(style="color:#33adff") &lt;
            span(style="color:#33adff") script
            span(style="color:#33adff") &gt;

            br

            span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const 
            span skapi 
            span = 
            span(style="color:#33adff") new 
            span Skapi( 
            span(style="color:#ffa600") "YOUR_SERVICE_ID"
            span ,  
            span(style="color:#ffa600") "YOUR_OWNER_ID" 
            span );

            br

            span(style="color:#33adff") &lt;/
            span(style="color:#33adff") script
            span(style="color:#33adff") &gt;


    section.intact
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
                    h3 Authentication
                    p Solid security for your users and data.
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-08.png")
                .inline.desc
                    h3 CDN
                    p Fast content delivery across the globe
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
                    p Email automation and newsletters
            .featureCollection
                .inline.circle
                    img(src="@/assets/img/icon/icons-11.png")
                .inline.desc
                    h3 API Bridge
                    p Secure request to your custom APIs

    br
    br

    section.intact.fullWidthOnTablet(style='text-align:center;')
        img(src="@/assets/img/landingpage/1.png" style='padding: 2rem;padding-top:0;width:50%;vertical-align:middle;')

        .inline(style='width:50%;text-align:left;vertical-align:middle;')
            h2
                span(style='color:#293FE6') Backend API Service&nbsp;
                | for&nbsp;Your&nbsp;HTML

            p From&nbsp;static&nbsp;HTML to full&nbsp;SPA, Skapi is compatible with any&nbsp;type of projects, without the need for additional learning or installing frameworks.

    br
    br
    br
    br
    br
    br
    br
    br

    section.intact
        img.loginExamplePic.hideOnTablet(src="@/assets/img/landingpage/4.png")
        .leftOnTablet.fullWidthOnTablet
            h2 
                span(style='color:#293FE6') Write Less Javascript,&nbsp;
                | Do&nbsp;It&nbsp;With&nbsp;HTML

            br

            p(style='position:relative;') Tailored for frontend web&nbsp;developers,
            p(style='position:relative;') Skapi seamlessly integrates with vanilla&nbsp;HTML&nbsp;forms.
            p(style='position:relative;') No more writing tedious&nbsp;AJAX&nbsp;requests.

            br
            pre(style='opacity:.5;margin-bottom:.2em;font-size:12px') Example: Login Form
            .code.loginExample(style='position:relative;')
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

                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  name
                | =
                span(style="color:#ffa600") "email"
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "email"
                span(style="color:#33adff") &gt;

                br

                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  name
                | =
                span(style="color:#ffa600") "password"
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "password"
                span(style="color:#33adff") &gt;

                br

                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                span(style="color:#33adff") input
                span(style="color:#58dfff")  type
                | =
                span(style="color:#ffa600") "submit" 
                span(style="color:#58dfff")  value
                | =
                span(style="color:#ffa600") "Login"
                span(style="color:#33adff") &gt;

                br

                span(style="color:#33adff") &lt;/
                span(style="color:#33adff") form
                span(style="color:#33adff") &gt;

    br
    br
    br
    br
    br
    br

    section.intact.fullWidthOnTablet(style='text-align:center;')
        .inline(style='width:50%;vertical-align:middle;')
            h2(style='text-align:left') Database:
            h2(style='text-align:left')
                span(style='color:#293FE6') Minimized Costly&nbsp;Errors,&nbsp;
                | Maximized&nbsp;Scalability
            
            br.hideOnTablet
            img.showOnTablet(src="@/assets/img/landingpage/2.png" style='padding: 2rem;width:100%;vertical-align:middle;display:none;')

            p(style='text-align:left') Skapi's thoughtfully engineered auto-indexing system delivers scalability and flexibility without requiring manual schema design. 
            br
            p(style='text-align:left') The database is optimized for a diverse range of applications with simplicity, while preventing cost overruns and performance issues.
        img.hideOnTablet(src="@/assets/img/landingpage/2.png" style='padding: 2rem;padding-top:0;width:50%;vertical-align:middle;')

    br
    br
    br
    br
    br
    br

    section.intact(style='padding-bottom:0')
        h2 
            | Cloud Storage: 
            span(style='color:#293FE6') Huge Files,&nbsp;
            | Fast Delivery

    br
    br

    section.intact.fullWidthOnTablet(style='text-align:center;padding-top:0')
        img(src="@/assets/img/landingpage/3.png" style='padding: 2rem;padding-top: 0;width:50%;vertical-align:middle;')
        .inline(style='width:50%;vertical-align:middle;')
            p(style='text-align:left') Skapi provides direct secure upload via HTML forms up to 5tb per upload. Your data is served through the CDN network, without any extra configuration.

            br
            br

            .mobileCenter(style='text-align:left;')
                p.inline(style='font-weight:700;color:#293FE6;margin:.5rem 0') Curious for more?&nbsp;&nbsp;&nbsp;&nbsp;
                a.customButton.outline(href='https://docs.skapi.com/introduction/getting-started.html' target="_blank" style='padding: 0.8em 1em;vertical-align:middle;color:#293FE6;') Explore our Documentation


    br
    br

    section.gradback(style='text-align:center;padding:4rem 0;')
        h2.inline(style='color:white;opacity:1') Skapi is on Free Beta
        br
        br
        a.customButton.shadow(href='/signup' style='background-color:black;color:white;') Sign-up

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
                Photo-sharing websites, file-sharing applications, social media platforms, newsletter subscription services, or&nbsp;any&nbsp;other&nbsp;application that requires a web server.
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
            p No, Skapi is designed for frontend developers. You can build a complete full stack application without writing a single line of backend code.
        
        br
        br

        .faq
            h3 Where can I get help?
            p 
                | You can reach us at our&nbsp;
                a(href='https://discord.com/channels/1164154380816236626/1164154381269213188') Discord&nbsp;server
                | . We are happy to help you with any questions you may have.
    br
    br
    br
    br

</template>

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
    width: 300px;
    position: absolute;
    right: 0;
    bottom: -3rem;
    padding: 0.5rem;
}

.code {
    display: inline-block;
    text-align: left;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    overflow-x: auto;
    white-space: pre;
    border-radius: 8px;
    font-family: monospace;
    max-width: 100%;
    width: 702px;
    box-shadow: inset -3px -3px 4px 0px rgba(255, 255, 255, 0.2);

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
    max-width: 960px;
    box-sizing: content-box;
    position: relative;
    padding: 0 1rem 2rem 1rem;
    margin: auto;
}

img {
    display: inline-block;
    max-width: 400px;
}

h1 {
    font-size: 2.4em;
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

p {
    color: rgba(0, 0, 0, 0.6)
}

.outline {
    box-shadow: inset 0 0 0 2px;
    font-weight: 600;
}

.customButton {
    font-size: 14px;
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
            padding: 2px 0.25em;
            opacity: 1;
            line-height: 1.2;
        }
    }
}
</style>
