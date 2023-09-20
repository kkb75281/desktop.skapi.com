<template lang="pug">
section#intro
    .wrap 
        img.introLogo(src="@/assets/img/logo/logo.svg")
        .point
            span One Line Code
            | =&gt;
            br
            | Full Backend Service
        .code const skapi = new Skapi('service_id', 'owner_id');
        p
            | Skapi is a backend API service specifically designed for 
            br
            | frontend web developers.
        a(href='https://docs.skapi.com' target="_blank") 
            span Get Started
            .material-symbols-outlined.big arrow_forward
</template>

<script setup></script>

<style lang="less">
#intro {
  width: 100vw;
  height: calc(100vh - 76px);
  background-image: url(@/assets/img/background.svg);
  background-size: cover;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrap {
    width: 782px;

    .introLogo {
      width: 270px;
      margin-bottom: 50px;
    }
    .point {
      color: #fff;
      font-size: 64px;
      font-weight: 500;
      line-height: 110px;
      margin-bottom: 70px;

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
        width: 100%;
        height: 58px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.10);
        background: #434343;
        color: #FFF;
        text-align: center;
        font-family: monospace;
        font-size: 24px;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
        margin-bottom: 86px;
    }
    p {
        color: #FFF;
        font-size: 24px;
        font-weight: 400;
        line-height: 36px;
        margin-bottom: 36px;
    }
    a {
        width: 238px;
        height: 52px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(255,255,255,1));
        position: relative;
        text-decoration: none;
        font-size: 24px;
        color: #293FE6;
        display: flex;
        align-items: center;
        justify-content: end;
        padding-right: 20px;
        border-radius: 0 30px 30px 0;
        cursor: pointer;
        
        span {
            font-size: 20px;
            font-weight: 700;
            margin-right: 10px;
        }
    }
  }
}
</style>
