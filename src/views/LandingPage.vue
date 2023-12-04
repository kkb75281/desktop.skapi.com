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

    section.intact(style="text-align:center;")
        h2 Backend Server, Simplified

        br
        br

        div(style="width:100%; height:400px; background-color:#999; border-radius:8px;")

    br
    br
    br
    br
    
    section.intact(style="text-align:center;")
        h2 Powered by Serverless Technology 

        br
        br

        .techWrap 
            .tech 
                br
                .img
                br
                br
                h4 Lower Your Costs By 10x
                br
                p Thanks to our well-architected serverless system, Skapi significantly reduces backend operational costs, accelerating your project development.
            .tech
                br 
                .img
                br
                br
                h4 Scale Without Limits 
                br
                p Built to scale effortlessly, Skapi handles your concurrent connections without any manual intervention.
            .tech
                br
                .img
                br
                br
                h4 No Setup, No Deployment 
                br
                p Farewell to complex backend deployment hassles. Everything is managed from the frontend, streamlining your development process.

    br
    br
    br
    br

    section.intact
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
                    p post
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

    section.intact
        h2 Skapi Features 

        br
        br

        .cardWrap 
            .card.min
                .titWrap 
                    .img
                    h5 Database
                
                br

                p Simple, scalable, yet flexible database at your service.
            .card.min
                .titWrap 
                    .img
                    h5 Security
                
                br

                p Solid security for your users and data.
            .card(style="margin-right:0")
                .titWrap 
                    .img 
                    h5 Cloud Storage 
                
                br

                p Robust storage solutions for any data size.
            
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';
import { account } from '@/main';

let showCode = ref('post');

console.log(showCode.value)
</script>

<style lang="less" scoped>

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
            padding: 20px;
            font-family: monospace;
            font-size: 14px;
            border-radius: 20px;
            background-color: #262626;
            color: #fff;
        }
    }
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
        background-color: #999;
    }
    .techWrap {
        .tech {
            display: inline-block;
            vertical-align: middle;
            width: 32%;
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
            .img {
                width: 120px;
                height: 120px;
                background-color: #888;
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
        .code {
            width: 100%;
            height: 256px;
            background-color: #434343;
            border-radius: 8px;
            color: #fff;
        }
    }
    .cardWrap {
        display: flex;
        flex-wrap: wrap;

        .card {
            min-width: 250px;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            background: #E5E9F3;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
            margin-right: 25px;
            margin-bottom: 25px;
            padding: 20px;

            &.min {
                width: 250px;
            }
            .titWrap {
                display: flex;
                align-items: center;
            }
            .img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                margin-right: 16px;
                background-color: #fff;
                filter: drop-shadow(0px 12px 36px rgba(69, 77, 255, 0.10));
            }
            p {
                max-width: 296px;
                line-height: 20px;
                font-size: 16px;
                color: rgba(0,0,0,0.6);
            }
        }
    }
}

</style>
