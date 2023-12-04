<template lang="pug">
NavBar(style='--position: absolute;')
#landing
    section.intro.gradback
        .introInner
            .introTop.intact
                h1 Mastering#[br]Backend&nbsp;Developemnt,#[br]Do It With HTML
                .side
                    p Instantly Power Your Application with a&nbsp;Robust Backend API
                    .tabletCenter
                        a.customButton.shadow(v-if='!account' href='/signup' style='background-color:white;color:#293FE6;') Try Out For Free
                        a.customButton.shadow(v-else href='/dashboard' style='background-color:white;color:#293FE6;') Go To Dashboard
            .introBottom 
                //- .slider 
                //-     img.login(src="@/assets/img/landingpage/intro_login.png")
                //-     img.users(src="@/assets/img/landingpage/intro_user.png")
                //-     .codeWindow
                //-         .windowInner 
                //-             .circle 
                //-                 .cir
                //-                 .cir
                //-                 .cir
                //-             .code
                //-                 span(style="color:#33adff") &lt;
                //-                 span(style="color:#33adff") form
                //-                 span(style="color:#58dfff")  onsubmit
                //-                 | =
                //-                 span(style="color:#ffa600") "skapi.login(event)"
                //-                 span(style="color:#58dfff")  action
                //-                 | =
                //-                 span(style="color:#ffa600") "login-success.html"
                //-                 span(style="color:#33adff") &gt;

                //-                 br

                //-                 span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                //-                 span(style="color:#33adff") input
                //-                 span(style="color:#58dfff")  name
                //-                 | =
                //-                 span(style="color:#ffa600") "email"
                //-                 span(style="color:#58dfff")  type
                //-                 | =
                //-                 span(style="color:#ffa600") "email"
                //-                 span(style="color:#33adff") &gt;

                //-                 br

                //-                 span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                //-                 span(style="color:#33adff") input
                //-                 span(style="color:#58dfff")  name
                //-                 | =
                //-                 span(style="color:#ffa600") "password"
                //-                 span(style="color:#58dfff")  type
                //-                 | =
                //-                 span(style="color:#ffa600") "password"
                //-                 span(style="color:#33adff") &gt;

                //-                 br

                //-                 span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                //-                 span(style="color:#33adff") input
                //-                 span(style="color:#58dfff")  type
                //-                 | =
                //-                 span(style="color:#ffa600") "submit" 
                //-                 span(style="color:#58dfff") value
                //-                 | =
                //-                 span(style="color:#ffa600") "Login"
                //-                 span(style="color:#33adff") &gt;

                //-                 br

                //-                 span(style="color:#33adff") &lt;/
                //-                 span(style="color:#33adff") form
                //-                 span(style="color:#33adff") &gt;
                .slider 
                    img.upload(src="@/assets/img/landingpage/intro_upload.png")
                    img.comment(src="@/assets/img/landingpage/intro_comment.png")
                    .codeWindow
                        .windowInner
                            .circle 
                                .cir 
                                .cir 
                                .cir 
                            .code
                                span(style="color:#33adff") &lt;
                                span(style="color:#33adff") form
                                span(style="color:#58dfff")  onsubmit
                                | =
                                span(style="color:#ffa600") "skapi.postRecord(event, { table:
                                span(style="color:#ffa600")  'my_collection'}).then(record =>
                                span(style="color:#ffa600")  console.log(record))"
                                span(style="color:#33adff") &gt;

                                br

                                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                span(style="color:#33adff") input
                                span(style="color:#58dfff")  type
                                | =
                                span(style="color:#ffa600") "text" 
                                span(style="color:#58dfff") name
                                | =
                                span(style="color:#ffa600") "myData"
                                span(style="color:#33adff") &gt;

                                br

                                span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                span(style="color:#33adff") input
                                span(style="color:#58dfff")  type
                                | =
                                span(style="color:#ffa600") "submit" 
                                span(style="color:#58dfff") value
                                | =
                                span(style="color:#ffa600") "Submit"
                                span(style="color:#33adff") &gt;

                                br

                                span(style="color:#33adff") &lt;/
                                span(style="color:#33adff") form
                                span(style="color:#33adff") &gt;
    
    br
    br
    br
    br

    section.intact.video(style="text-align:center;")
        h2 Backend Server, Simplified

        br
        br

        div(style="width:100%; height:400px; background-color:#999; border-radius:8px;")

    br
    br
    br
    br
    
    section.intact.technology(style="text-align:center;")
        h2 Powered by Serverless Technology 

        br
        br

        .techWrap 
            .tech 
                br
                img(src="@/assets/img/landingpage/tech1.svg")
                br
                br
                h5 Lower Your Costs By 10x
                br
                p Thanks to our well-architected serverless system, Skapi significantly reduces backend operational costs, accelerating your project development.
            .tech
                br 
                img(src="@/assets/img/landingpage/tech2.svg")
                br
                br
                h5 Scale Without Limits 
                br
                p Built to scale effortlessly, Skapi handles your concurrent connections without any manual intervention.
            .tech
                br
                img(src="@/assets/img/landingpage/tech3.svg")
                br
                br
                h5 No Setup, No Deployment 
                br
                p Farewell to complex backend deployment hassles. Everything is managed from the frontend, streamlining your development process.

    br
    br
    br
    br

    section.intact.database
        .data(style="margin-right:2%;")
            h2 Flexible,#[br]Schemaless Database

            br
            br

            p(style="color:rgba(0,0,0,0.6);") Skapi's thoughtfully engineered auto indexing system delivers full scalability and flexibility without any manual schema design.
            
            br
            
            p(style="color:rgba(0,0,0,0.6);") The database is optimized for a diverse range of applications with simplicity, while preventing cost overruns and performance issues.
        .dataCode 
            .btnWrap 
                .btn(:class="{'active' : showCode == 'post'}" @click="showCode = 'post'") Post Record
                .btn(:class="{'active' : showCode == 'get'}" @click="showCode = 'get'") Get Record 
            .code 
                template(v-if="showCode == 'post'")
                    span(style="color:#999999") // Data to be saved in key:value pairs
                    
                    br
                    
                    span(style="color:#33adff") let 
                    span(style="color:#58dfff") data 
                    | = 
                    span(style="color:#f9d849") {
                    
                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;myData: 
                    span(style="color:#ffa600") "Hello World"

                    br

                    span(style="color:#f9d849") }

                    br
                    br

                    span(style="color:#999999") // Configuration for the record to be uploaded

                    br

                    span(style="color:#33adff") let 
                    span(style="color:#58dfff") config 
                    | = 
                    span(style="color:#f9d849") {

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;table: 
                    span(style="color:#ffa600") "my_collection"

                    br

                    span(style="color:#f9d849") }
                    
                template(v-else)
                    p get
    br
    br
    br
    br

    section.intact.banner(style="text-align:right;")
        h2 Huge Files, Fast Delivery 

        br

        p You can upload huge files directly from HTML forms.
        p Your data is served through the CDN network, without any extra configuration.

    br
    br
    br
    br

    section.intact.features
        h2 Skapi Features 

        br
        br

        .cardWrap 
            .card(style="width:250px")
                .titWrap 
                    .icon
                        img(src="@/assets/img/landingpage/database.png")
                    h5 Database
                
                br

                p Simple, scalable, yet flexible database at your service.
                img.background(src="@/assets/img/landingpage/database_bg.png" style="right: 0px;bottom: 0px; height: 150px;")
            .card(style="width:250px")
                .titWrap 
                    .icon 
                        img(src="@/assets/img/landingpage/security.png")
                    h5 Security
                
                br

                p Solid security for your users and data.
                img.background(src="@/assets/img/landingpage/security_bg.png" style="left: 20px;bottom: 20px; height: 80px;")
                img.background(src="@/assets/img/landingpage/security_bg2.png" style="right: -45px;bottom: 20px; height: 80px;")
            .card(style="width:calc(100% - 540px); margin-right:0")
                .titWrap 
                    .icon 
                        img(src="@/assets/img/landingpage/cloud.png")
                    h5 Cloud Storage 
                
                br

                p Robust storage solutions for any data size.
                img.background(src="@/assets/img/landingpage/cloud_bg.svg" style="right: -40px;bottom: 10px; height: 150px;")
            .card(style="width:50%;")
                .titWrap 
                    .icon 
                        img(src="@/assets/img/landingpage/cdn.png")
                    h5 CDN
                
                br

                p Swift content delivery across the globe.
                img.background(src="@/assets/img/landingpage/cdn_bg.svg" style="right: -50px;bottom: -100px;")
            .card(style="width:calc(50% - 20px); margin-right:0;")
                .titWrap 
                    .icon 
                        img(src="@/assets/img/landingpage/hosting.png")
                    h5 Instant Hosting 
                
                br

                p Host your HTML content swiftly.
                img.background(src="@/assets/img/landingpage/hosting_bg.svg" style="right: -70px;bottom: -15px; height: 200px;")
            .card(style="width:calc(100% - 540px);")
                .titWrap 
                    .icon 
                        img(src="@/assets/img/landingpage/email.png")
                    h5 Automated E-Mail Service
                
                br

                p Simplified email automation and newsletters.
                img.background(src="@/assets/img/landingpage/email_bg.png" style="right: 30px;bottom: 15px; height: 120px;")
            .card(style="width:250px")
                .titWrap 
                    .icon 
                        img(src="@/assets/img/landingpage/api.png")
                    h5 API Bridge
                
                br

                p Expand with your own custom APIs.
                img.background(src="@/assets/img/landingpage/api_bg.svg" style="right: -25px;bottom: 25px;")
            .card(style="width:250px; margin-right:0;")
                .titWrap 
                    .icon 
                        img(src="@/assets/img/landingpage/realtime.png")
                    h5 Realtime Data
                
                br

                p Build chat, games, push notifications in no time.
                img.background(src="@/assets/img/landingpage/realtime_bg.svg" style="right: -130px;bottom: -60px;")
            
    br
    br
    br
    br

    section.intact(style="text-align:center;")
        h2 What you Can Build with Skapi

        br
        br

        p(style="color:rgba(0, 0, 0, 0.60)") Basic HTML and JavaScript skills is all you need. 
        p(style="color:rgba(0, 0, 0, 0.60)") Withness how simple it is to build a login form with Skapi: 

        br
        br

        .buildWrap 
            .build(style="display:inline-block; width:300px; height:300px; border-radius:12px; background-color:#d9d9d9; margin-right:30px;")
            .build(style="display:inline-block; width:300px; height:300px; border-radius:12px; background-color:#d9d9d9; margin-right:30px;")
            .build(style="display:inline-block; width:300px; height:300px; border-radius:12px; background-color:#d9d9d9;")
        
    br
    br
    br
    br

    section.line
        h2(style="width:100%;") Sign-up while it's free!

        br

        a.customButton(href="/" style="background-color:#293FE6;color:white;") Start my project

    br
    br
    br
    br

    section.intact 
        h2(style="text-align:center;") FAQ 

        br
        br

        details
            summary What is Skapi and how to use it?
            p(style="color: rgba(0,0,0,0.6);") Photo-sharing websites, chat application, file-sharing applications, social media platforms, newsletter subscription services, or any other application that requires a web server. Skapi is a complete backend API service that provides everything you'd expect from a backend server.

        details
            summary How much does it cost?
            p(style="color: rgba(0,0,0,0.6);") dddd

        details
            summary Do I need at least of basic backend knowledge to use Skapi?
            p(style="color: rgba(0,0,0,0.6);") dddd

        details
            summary Can I use my own domain using Skapi?
            p(style="color: rgba(0,0,0,0.6);") dddd

    br
    br
    br
    br


</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';
import { account } from '@/main';

let showCode = ref('post');

console.log(showCode.value)
</script>

<style lang="less" scoped>
summary::-webkit-details-marker { /* Safari 브라우저용 사용자 정의 스타일 */
    display: none;
}
summary {
    position: relative;
    list-style-type: none; /* 그 외의 브라우저용 사용자 정의 스타일 */
    cursor: pointer;
    padding: 20px 0;
    margin-bottom: 20px;
    font-size: 1.2rem;

    ::marker {
        content: '';
    }
    &::before {
        position: absolute;
        content: '';
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #000;
    }
    &:after {
        position: absolute;
        content: '';
        background: url('@/assets/img/landingpage/plus.png') no-repeat;
        right: 0;
        width: 30px;
        height: 30px;
        background-size: contain;
    }
}
details[open] summary:after {
    background: url('@/assets/img/landingpage/minus.png') no-repeat;
    width: 30px;
    height: 30px;
    background-size: contain;
}

#landing {
    max-width: 100vw;
    background-color: #f0f0f0;
}

.gradback {
    background: linear-gradient(217deg, rgba(0, 255, 170, 1), rgba(255, 0, 0, 0) 70.71%), linear-gradient(54deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%), linear-gradient(148deg, rgba(0, 14, 255, 1), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgba(252, 208, 75, 1), rgba(0, 0, 255, 1) 70.71%);
}

.customButton {
    font-size: 16px;
    font-weight: 700;
    min-width: 169px;
    box-sizing: border-box;
    padding: 0.8em 2.3em;
    text-decoration: none;
    border-radius: 8px;
    display: inline-block;
}

.codeWindow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    .windowInner {
        width: 500px;
        padding: 10px 15px 15px;
        border-radius: 20px;
        background-color: #434343;
        box-shadow: 8px 12px 16px 8px rgba(0, 0, 0, 0.20);
        .circle {
            .cir {
                display: inline-block;
                width: 14px;
                height: 14px;
                margin-right: 10px;
                border-radius: 50%;
                background-color: #FFCC80;

                &:first-child {
                    background-color: #FF8686;
                }
                &:last-child {
                    background-color: #8DE585;
                }
            }
        }
        .code {
            width: 100%;
            margin-top: 10px;
            border-radius: 20px;
            background-color: #262626;
        }
    }
}

.code {
    font-family: monospace;
    background-color: #434343;
    color: #fff;
    padding: 20px;
    font-size: 14px;
    line-height: 1.7; 
    border-radius: 8px;
}

section {    
    width: 100vw;
    margin: 0 auto;

    h1, h2, h5 {
        font-weight: 500;
    }
    h2 {
        // margin-bottom: 2.6rem;
    }
    &.intact {
        max-width: 1080px;
        position: relative;
        padding: 0 1rem 2rem 1rem;
    }
    &.intro {
        width: 100%;
        text-align: center;
        padding: 10rem 40px 0 40px;
        overflow: hidden;
        .introInner {
            display: inline-block;
            margin: 0 auto;
        }
        .introTop {
            text-align: left;
            color: #fff;
            h1 {
                display: inline-block;
                margin-right: 3rem;
                font-size: 2.6rem;
            }
            .side {
                display: inline-block;
            }
            p {
                max-width: 470px;
                padding-top: 2rem;
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            .customButton {
                margin-bottom: 2rem;
            }
        }   
        .introBottom {
            max-width: 1000px;
            margin: 0 auto;
            margin-bottom: -20px;
            text-align: left;
            overflow: hidden;
            .slider {
                position: relative;

                .login {
                    width: 28%;
                    margin-right: 4%;
                }
                .users {
                    width: 68%;
                }
                .upload {
                    width: 38%;
                    margin-right: 4%;
                }
                .comment {
                    width: 58%;
                }
            }
        }
    }
    &.banner {
        width: 100%;
        height: 300px;
        background: url(@/assets/img/landingpage/intro_banner.png);
        background-size: cover;
        background-position-y: -560px;
    }
    &.line {
        text-align: center;
        background-color: #e5e9f3;
        padding: 5rem 0;
    }
}
.techWrap {
    .tech {
        display: inline-block;
        vertical-align: middle;
        width: 32%;
        height: 372px;
        min-width: 300px;
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        background-color: #E5E9F3;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);

        &:last-child {
            margin-right: 0;
        }
        h5 {
            font-weight: 700;
        }
        img {
            width: 120px;
            height: 120px;
            display: inline-block;
            text-align: center;
        }
        p {
            font-size: max(0.8rem, 14px);
            color: rgba(0,0,0,0.6);
        }
    }
}
.data, .dataCode {
    display: inline-block;
    vertical-align: middle;
    width: 49%;
    text-align: left;
}
.dataCode {
    .btn {
        display: inline-block;
        border-radius: 8px;
        border: 2px solid #434343;
        color: #434343;
        padding: 2px 12px;
        margin-right: 10px;
        margin-bottom: 20px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        
        &.active {
            background: #434343;
            color: #fff;
        }
    }
}
.cardWrap {
    display: flex;
    flex-wrap: wrap;

    .card {
        position: relative;
        min-width: 250px;
        height: 284px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        background: #E5E9F3;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 20px;
        overflow: hidden;
        .background {
            position: absolute;
            opacity: 0.7;
        }
        .titWrap {
            display: flex;
            align-items: center;
        }
        .icon {
            position: relative;
            width: 45px;
            height: 45px;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0px 12px 36px rgba(69, 77, 255, 0.10);
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
            color: rgba(0,0,0,0.6);
        }
    }
}

@media (max-width: 825px) {
    .cardWrap {
        .card {
            &:nth-child(1),&:nth-child(7) {
                width: 50% !important;
            }
            &:nth-child(2),&:nth-child(8) {
                width: calc(50% - 20px) !important;
                margin-right: 0;
            }
            &:nth-child(3), &:nth-child(6) {
                width: 100% !important;
                margin-right: 0;
            }
        }
    }
}

@media (max-width: 650px) {
    .techWrap {
        .tech {
            margin-right: 0;
        }
    }
}

@media (max-width: 580px) {
    .cardWrap {
        .card {
            &:nth-child(1),&:nth-child(2),&:nth-child(4),&:nth-child(5),&:nth-child(7),&:nth-child(8) {
                width: 100% !important;
                margin-right: 0 !important;
            }
        }
    }
}
</style>
