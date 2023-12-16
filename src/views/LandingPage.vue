<template lang="pug">
NavBar(style='--position: fixed; --background-color:#262626')
#landing
    section.intro.gradback
        .introInner
            .introTop.intact
                h1.long Build Fullstack Applications#[br]Right From HTML
                h1.mobile Build Fullstack Application#[br]from the Frontend
                .side
                    p(style="font-weight:400;") Skapi is a serverless backend JS library that allows you to build fullstack applications without writing a single line of backend code.

                    br

                    .tabletCenter
                        a.customButton.shadow(target="_blank" href='https://docs.skapi.com/introduction/getting-started.html' style='background-color:white;color:#293FE6;') Learn More
            .introBottom
                Swiper.swiper(:modules="[Autoplay]" :autoplay="{delay: 2500,disableOnInteraction: false}" :loop="true") 
                    SwiperSlide.slider 
                      .sliderInner
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
                                    span(style="color:#ffa600") "skapi.postRecord(event, { table: 'my_photos'}).then(record => console.log(record))"
                                    span(style="color:#33adff") &gt;

                                    br

                                    span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                    span(style="color:#33adff") input
                                    span(style="color:#58dfff")  type
                                    | =
                                    span(style="color:#ffa600") "file" 
                                    span(style="color:#58dfff") name
                                    | =
                                    span(style="color:#ffa600") "myPhoto"
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
                    SwiperSlide.slider.sec
                      .sliderInner
                        img.login(src="@/assets/img/landingpage/intro_login.png")
                        img.users(src="@/assets/img/landingpage/intro_user.png")
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

    br
    br
    br
    br
    br
    br

    section.intact.video(style="text-align:center;")
        h2 Backend Server, Simplified

        br
        br

        iframe(width="100%" height="400" style="border-radius:8px;" src="https://www.youtube.com/embed/y31F1ko9LbU?si=R3jS_reo2N1vY3hb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen)

    br
    br
    br
    br
    br
    br
    
    //section.intact.technology(style="text-align:center;")
    section.intact.technology
        h2 Powered by Serverless Technology 

        br
        br

        .techWrap 
            .tech
                div(style="text-align: center;")
                  img(src="@/assets/img/landingpage/tech3.svg")
                br
                h5 No Setup, No Deployment 
                br
                p Farewell to complex backend deployment hassles. Everything is managed from the frontend, streamlining your development process.
            .tech
                div(style="text-align: center;")
                  img(src="@/assets/img/landingpage/tech1.svg")
                br
                h5 Lower Your Costs By 10x
                br
                p Thanks to our well-architected serverless system, Skapi significantly reduces backend operational costs, accelerating your project development.
            .tech
                div(style="text-align: center;")
                  img(src="@/assets/img/landingpage/tech2.svg")
                br
                h5 Scale Without Limits 
                br
                p Built to scale effortlessly, Skapi handles your concurrent connections without any manual intervention.
            
    br
    br
    br
    br
    br
    br
    br
    br
    br
    br

    section.intact.database
      .databaseWrap
        //- .data(style="margin-right:2%;")
        .data
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
                    span(style="color:#999999") // JSON data to be saved
                    
                    br
                    
                    span(style="color:#33adff") let 
                    span(style="color:#58dfff") data 
                    | = 
                    span(style="color:#f9d849") {
                    
                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;title: 
                    span(style="color:#ffa600") "Vintage Les Paul"

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;image: 
                    span(style="color:#ffa600") "https://.../..."

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
                    span(style="color:#ffa600") "my_collection",

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;index: 
                    span(style="color:#f9d849") {
                    
                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;&nbsp;&nbsp;name: 
                    span(style="color:#ffa600") "price",

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;&nbsp;&nbsp;value: 
                    span(style="color:#ffa600") 499,

                    br
                    
                    span(style="color:#f9d849") &nbsp;&nbsp;}

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;tag: 
                    | [
                    span(style="color:#ffa600") "vintage"
                    | , 
                    span(style="color:#ffa600") "guitar"
                    | ]

                    br

                    span(style="color:#f9d849") }

                    br
                    br
                    
                    span(style="color:#999999") // Post to database

                    br

                    span(style="color:#58dfff") skapi
                    | .
                    span(style="color:#f9d849") postRecords(
                    span(style="color:#58dfff") data
                    | , 
                    span(style="color:#58dfff") config
                    span(style="color:#f9d849") )
                    
                template(v-else)
                    span(style="color:#33adff") let 
                    span(style="color:#58dfff") query 
                    | = 
                    span(style="color:#f9d849") {

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;table: 
                    span(style="color:#ffa600") "my_collection",

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;index: 
                    span(style="color:#f9d849") {
                    
                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;&nbsp;&nbsp;name: 
                    span(style="color:#ffa600") "price",

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;&nbsp;&nbsp;value: 
                    span(style="color:#ffa600") 500,

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;&nbsp;&nbsp;condition: 
                    span(style="color:#ffa600") "&lt;",
                    
                    br

                    span(style="color:#f9d849") &nbsp;&nbsp;}

                    br

                    span(style="color:#58dfff") &nbsp;&nbsp;tag: 
                    span(style="color:#ffa600") "guitar"

                    br

                    span(style="color:#f9d849") }

                    br
                    br

                    span(style="color:#58dfff") skapi
                    | .
                    span(style="color:#f9d849") getRecords(
                    span(style="color:#58dfff") query
                    span(style="color:#f9d849") )
                    | .
                    span(style="color:#f9d849") then(
                    span(style="color:#58dfff") response 
                    span(style="color:#33adff") => 
                    span(style="color:#cc76d1") {

                    br
                    
                    span(style="color:#999999") &nbsp;&nbsp;// Items in "my_collection",
                    br
                    span(style="color:#999999") &nbsp;&nbsp;// priced below 500 and tagged as "guitar"

                    br

                    span(style="color:#cc76d1") }
                    span(style="color:#f9d849") )
                    span ;
    br
    br
    br
    br
    br
    br
    br
    br
    br
    br

    section.intact.banner(style="text-align:right;")
        h2 Huge Files, Fast Delivery 

        br

        p(style="color:rgba(0,0,0,0.6);") You can upload huge files directly from HTML forms. #[br]Your data is served through the CDN network, without any extra configuration.

    br
    br
    br
    br
    br
    br
    br
    br
    br
    br

    section.intact.features
        h2 Features 

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

    //- section.intact(style="text-align:center;")
        h2 What you Can Build with Skapi

        br
        br

        p(style="color:rgba(0, 0, 0, 0.60)") Basic HTML and JavaScript skills is all you need. 
        p(style="color:rgba(0, 0, 0, 0.60)") Withness how simple it is to build a login form with Skapi: 

        br
        br

        .buildWrap 
            .build(style="display:inline-block; width:300px; height:300px; border-radius:12px; background-color:#d9d9d9; margin-right:20px;")
            .build(style="display:inline-block; width:300px; height:300px; border-radius:12px; background-color:#d9d9d9; margin-right:20px;")
            .build(style="display:inline-block; width:300px; height:300px; border-radius:12px; background-color:#d9d9d9;")
        
    br
    br
    br
    br

    section.line
        h2(v-if='account' style="width:100%;") Start a new project!
        h2(v-else style="width:100%;") Sign-up while it's free!

        br

        a.customButton(v-if='account' href="/dashboard" style="background-color:#293FE6;color:white;") Start my project
        a.customButton(v-else href="/signup" style="background-color:#293FE6;color:white;") Sign up

    br
    br
    br
    br

    // please refer current website's FAQ
    section.intact 
        h2(style="text-align:center;") FAQ 

        br
        br

        details
            summary What Can You Build With Skapi?
            p(style="color: rgba(0,0,0,0.6);") Photo-sharing websites, chat application, file-sharing applications, social media platforms, newsletter subscription services, or any other application that requires a web server. Skapi is a complete backend API service that provides everything you'd expect from a backend server.
            br
            br
            
        details
            summary Is Skapi Typescript Supported?
            p(style="color: rgba(0,0,0,0.6);") Yes, Skapi is written in Typescript and is fully compatible with Typescript.
            br
            br

        details
            summary What Are the Pricing Plans?
            p(style="color: rgba(0,0,0,0.6);") 
                | Skapi is currently on free beta. We will announce the pricing plan soon. 
                a(href="/signup") Sign up&nbsp;
                | while it's free!
            br
            br

        details
            summary Do I Need Basic Knowledge of Backend Development?
            p(style="color: rgba(0,0,0,0.6);") No, Skapi is designed for frontend developers. You can build a complete full stack application without writing a single line of backend code, or even touching a terminal window.
            br
            br

        details
            summary Where can I get help?
            p(style="color: rgba(0,0,0,0.6);") 
                | You can reach us at our 
                a(href="https://discord.com/channels/1164154380816236626/1164154381269213188") Discord server
                | . We are happy to help you with any questions you may have.
            br
            br

    br
    br
    br
    br


</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { account } from "@/main";

let showCode = ref("post");

let showNavBar = (e) => {
  let navBar = document.getElementById("top");

  if (e.deltaY > 0) {
    navBar.style.top = "-60px";
  } else {
    navBar.style.top = "0";
  }
};

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
  bottom: 120px;
  .windowInner {
    width: 500px;
    padding: 10px 15px 15px;
    border-radius: 20px;
    background-color: #434343;
    box-shadow: 8px 12px 16px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
    .circle {
      .cir {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #ffcc80;

        &:first-child {
          background-color: #ff8686;
        }
        &:last-child {
          background-color: #8de585;
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
  white-space: pre;
  font-family: monospace;
  background-color: #434343;
  color: #fff;
  padding: 20px;
  font-size: 14px;
  line-height: 1.7;
  border-radius: 8px;
  overflow-x:auto;
}

section {
  // width: 100vw; // display: block is always full width of parent
  margin: 0 auto;

  h1,
  h2,
  h5 {
    font-weight: 500;
  }
  p {
    font-weight: 300;
    line-height: 1.5;
  }
  &.intact {
    max-width: 1080px;
    position: relative;
    padding: 0 1rem;
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
      max-width: 1100px;
      margin: 0 auto;
      text-align: left;
      color: #fff;
      h1 {
        display: inline-block;
        margin-right: 3rem;
        font-size: 2.6rem;

        &.mobile {
          display: none;
        }
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
      max-width: calc(100vw - 80px);
      margin: 0 auto;
      margin-bottom: -100px;
      text-align: left;
      overflow: hidden;
      .slider {
        position: relative;

        &.sec {
          .codeWindow {
            bottom: 50px;
          }
        }
        .sliderInner {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;

          > img {
            border-radius: 8px;
            box-shadow: 8px 12px 16px 8px rgba(0, 0, 0, 0.2);
          }
        }
        .login {
          width: 30%;
          margin-top: 4%;
          margin-right: 4%;
        }
        .users {
          width: 53%;
          margin-bottom: 9%;
        }
        .upload {
          width: 30%;
          margin-right: 4%;
          margin-bottom: 15%;
        }
        .comment {
          width: 50%;
          margin-bottom: 15%;
        }
      }
    }
  }
  &.banner {
    display: grid;
    align-content: center;
    padding-bottom: 0;
    width: 100%;
    // height: 300px;
    height: 475px;
    background: url(@/assets/img/landingpage/intro_banner.png) no-repeat;
    // background-size: 1200px;
    background-size: 900px;
    // background-position-x: -50px;
    // background-position-y: -150px;
    background-position-y: -20px;
  }
  &.line {
    text-align: center;
    background-color: #e5e9f3;
    padding: 5rem 0;
  }
}

.techWrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .tech {
    flex-grow: 1;
    flex-shrink: 0;
    // display: inline-block; // display type not relevant when parent is a flexbox
    width: 300px; // width effect as min-width in flex box
    padding: 2rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background-color: #e5e9f3;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    text-align: center;

    img {
      width: 120px;
      height: 120px;
      display: inline-block;
    }
    p {
      font-size: max(0.8rem, 14px);
      color: rgba(0, 0, 0, 0.6);
    }
  }
}

.databaseWrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  align-items: center;

  .data,
  .dataCode {
    // display: inline-block;
    // vertical-align: middle;
    // width: 49%;
    text-align: left;

    flex-grow: 1;
    flex-shrink: 0;
    width: calc(300px - 2rem); // acts as min-width in flexbox. never exceed 300px which may be the smallest phone width. calc is used to compensate for padding
  }
  .dataCode {
    .code {
      height:470px; 
      @media (max-width: 650px) {
        height:unset; 
      }
    }

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
    background: #e5e9f3;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
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
}

@media (max-width: 740px) {
  section {
    &.intro {
      .introTop {
        text-align: center;

        h1 {
          margin: 0 auto;
          &.long {
            display: none;
          }
          &.mobile {
            display: block;
          }
        }
      }
      .side {
        margin-bottom: 6rem;
      }
      .introBottom {
        display: none;
      }
    }
    &.video {
      padding: 0;
    }
  }
}

@media (max-width: 580px) {
  section {
    &.banner {
      text-align: left !important;
    }
  }
  .cardWrap {
    .card {
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(7),
      &:nth-child(8) {
        width: 100% !important;
        margin-right: 0 !important;
      }
    }
  }
}
</style>
