<template lang="pug">
#lending(ref="lending")
    section#intro(ref="intro")
        .introWrap 
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
    section#other(ref="other")
        .packageWrap 
            .title Skapi provides everything in one package
            p No more figuring out how to setup, or deploy each of your backend resources.
            .cardWrap 
                .card
                    img(src="@/assets/img/icon/icons-03.png")
                    .tit Database
                    .desc Auto indexed, #[br]Full flexibility that #[br]scales
                .card
                    img(src="@/assets/img/icon/icons-04.png")
                    .tit Cloud Storage
                    .desc Secure, #[br]Database integrated, #[br]Expands with no-limit
                .card
                    img(src="@/assets/img/icon/icons-05.png")
                    .tit Security
                    .desc Works out-of-the-box, #[br]Fully implemented in #[br]all resources
                .card
                    img(src="@/assets/img/icon/icons-06.png")
                    .tit E-Mail service
                    .desc Verification, #[br]Sending newsletters, #[br]Notification E-mails
                .card
                    img(src="@/assets/img/icon/icons-07.png")
                    .tit Hosting
                    .desc Immediate website #[br]hosting
                .card
                    img(src="@/assets/img/icon/icons-08.png")
                    .tit CDN
                    .desc Implemented to the #[br]cloud storage by #[br]default
                .card
                    img(src="@/assets/img/icon/icons-09.png")
                    .tit Load balancing
                    .desc Everything controlled #[br]internally
                .card
                    img(src="@/assets/img/icon/icons-10.png")
                    .tit Serverless
                    .desc No deployment, #[br]No installation #[br]required
        .htmlWrap 
            .title Compatible with either #[br]pure HTML projects or any SPA frameworks
            p No additional settings, Just import Skapi library in your HTML file and you’re ready to go.
            .htmlCode 
                .tit index.html 
                //- .code
                //-     pre
                //-         code.language-html
                //-             |&lt;!DOCTYPE html&gt;
                //-             |&lt;head&gt;
                //-             |&lt;script src="https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"&gt;&lt;/script&gt;
                //-             |&lt;/head&gt;
                //-             |&lt;script&gt;
                //-             |    let skapi = new Skapi('
                //-             span SERVICE_ID
                //-             | ', '
                //-             span OWNERS_ID
                //-             | ');
                //-             |&lt;/script&gt;
                //- .code(style="color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important; position:relative !important;overflow:auto")
                table.code(style="margin:0;border:none;background-color:#272727;" cellspacing="0" cellpadding="0")
                    tr
                        td(style="padding:6px;border-right:2px solid #4f4f4f")
                            div(style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%")
                                div(style="line-height:130%") 1
                                div(style="line-height:130%") 2
                                div(style="line-height:130%") 3
                                div(style="line-height:130%") 4
                                div(style="line-height:130%") 5
                                div(style="line-height:130%") 6
                                div(style="line-height:130%") 7
                        td(style="padding:6px 0;text-align:left")
                            div(style="margin:0;padding:0;color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%")
                                div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") !DOCTYPE 
                                    span(style="color:#a8ff58") html
                                    span(style="color:#f0f0f0") &gt;
                                div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") head
                                    span(style="color:#f0f0f0") &gt;
                                div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") script 
                                    span(style="color:#a8ff58") src=
                                    span(style="color:#ffd500") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"
                                    span(style="color:#ff3399") 
                                    span(style="color:#f0f0f0") &gt;
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#f0f0f0") /
                                    span(style="color:#ff3399") script
                                    span(style="color:#f0f0f0") &gt;
                                div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#f0f0f0") /
                                    span(style="color:#ff3399") head
                                    span(style="color:#f0f0f0") &gt;
                                div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#ff3399") script
                                    span(style="color:#f0f0f0") &gt;
                                div(style="padding:0 6px; white-space:pre; line-height:130%")   
                                    span(style="color:#ff3399") let 
                                    span skapi 
                                    span = 
                                    span(style="color:#ff3399") new 
                                    span Skapi( 
                                    span(style="color:#ffd500") 'SERVICE_ID' 
                                    span ,  
                                    span(style="color:#ffd500") 'OWNERS_ID' 
                                    span );
                                div(style="padding:0 6px; white-space:pre; line-height:130%") 
                                    span(style="color:#f0f0f0") &lt;
                                    span(style="color:#f0f0f0") /
                                    span(style="color:#ff3399") script
                                    span(style="color:#f0f0f0") &gt;
        .docWrap 
            .left 
                .title Written in #[br]human language
                a(href='https://docs.skapi.com' target="_blank") Check out Documentation
            .right
                img(src="@/assets/img/documentation.png")
        .joinWrap 
            h2 Skapi is on deta 
            h3 Try it while it's free!
            router-link(to="/signup") Sign-up
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';

let lending = ref(null);
let intro = ref(null);
let other = ref(null);

// onMounted(() => {
//     console.log(lending.scrollHeight)
//     // window.addEventListener('scroll', () => {
//     //     if (scrollY >= 20) {
//     //         lending.value.style.transform = 'translateY(-100vh)';
//     //     } else {
//     //         lending.value.style.transform = 'translateY(0)';
//     //     }
//     // });
// });

// let section = 0;
// window.addEventListener('wheel', (e) => {
//     e.preventDefault();
//     if(e.deltaY > 0){
//         section++;
//     }else if(e.deltaY < 0){
//         section--;
//     }
//     if(section < 0){
//         section=0;
//     }else if(page > lastPage){
//         section = lastPage;
//     }
//     console.log(e.deltaY)
//     wrap.style.top = section * -100 + 'vh';
// },{passive:false})
</script>

<style lang="less" scoped>
#lending {
    transition: transform 2s ease;
}
// .wrap {
    // }
    
#intro {
    width: 100vw;
    height: 100vh;
    background-image: url(@/assets/img/background.svg);
    background-size: cover;
    position: relative;
    z-index: 9;

    .introWrap {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .introLogo {
            width: max(173px, 11.5vw);
            margin-bottom: max(28px, 2vw);
        }

        .point {
            color: #fff;
            font-size: max(40px, 3vw);
            font-weight: 500;
            line-height: max(70px, 5vw);
            margin-bottom: max(28px, 2.6vw);

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
            width: max(516px, 35vw);
            height: max(38px, 2.4vw);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.10);
            background: #434343;
            color: #FFF;
            text-align: center;
            font-family: monospace;
            font-size: max(16px, 1.1vw);
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
            margin-bottom: max(50px, 3.5vw);
        }

        p {
            color: #FFF;
            font-size: max(16px, 1.05vw);
            font-weight: 400;
            line-height: max(24px, 1.6vw);
            margin-bottom: max(36px, 2vw);
        }

        a {
            width: 238px;
            height: 52px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
            position: relative;
            text-decoration: none;
            color: #293FE6;
            display: flex;
            align-items: center;
            justify-content: end;
            padding-right: 20px;
            border-radius: 0 30px 30px 0;
            cursor: pointer;

            span {
                font-size: max(16px, 1vw);
                font-weight: 700;
                margin-right: 10px;
            }
        }
    }
}

#other {
    width: 100%;
    height: 100%;
    // margin-top: -50vh;

    >div {
        width: max(1130px, 62vw);
        margin: 0 auto;
        padding-top: max(400px, 17vw);
    }

    .title {
        color: #262626;
        font-size: max(36px, 1.5vw);
        font-weight: 700;
        margin-bottom: max(22px, 1.2vw);
    }

    p {
        color: #000;
        font-size: max(24px, 1.2vw);
        font-weight: 400;
        margin-bottom: max(52px, 1.8vw);
    }

    .cardWrap {
        display: flex;
        flex-wrap: wrap;

        .card {
            width: 23.5%;
            height: max(317px, 17vw);
            padding: max(32px, 1.7vw);
            margin-right: 2%;
            margin-bottom: 2%;
            border-radius: 8px;
            background-color: #FAFAFA;
            border: 1px solid rgba(0, 0, 0, 0.15);
            filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: space-between;

            &:nth-child(4n+4) {
                margin-right: 0;
            }

            img {
                height: max(108px, 5.5vw);
                object-fit: contain;
                align-self: start;
                margin-top: max(-10px, -0.5vw);
                margin-left: max(-10px, -0.5vw);
            }

            .tit {
                width: 100%;
                color: #262626;
                font-size: max(24px, 1.2vw);
                font-weight: 500;
            }

            .desc {
                width: 100%;
                color: #262626;
                font-size: max(19px, 1vw);
                font-weight: 400;
                line-height: max(24px, 1.4vw);
            }
        }
    }

    .htmlCode {
        .tit {
            color: #000;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .code {
            width: 100%;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.10);
            background: #434343;
            padding: 30px 10px;
            font-size: 20px;
            font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;

            // code {
            //     color: #FFF;
            //     font-size: 20px;
            //     font-weight: 400;
            //     line-height: 30px;
            // }
        }
    }

    .docWrap {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        .left {
            width: 40%;

            .title {
                color: rgba(0, 0, 0, 0.80);
                font-size: max(48px, 2.5vw);
                font-weight: 700;
                line-height: 64px;
            }

            a {
                color: #293FE6;
                font-size: max(28px, 1.2vw);
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
        height: max(300px, 39vw);
        margin-top: max(400px, 17vw);
        padding: 0;
        background-image: url(@/assets/img/background.svg);
        background-size: cover;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: #FFF;
        text-align: center;

        h2 {
            width: 100%;
            font-size: max(52px, 2.5vw);
            font-weight: 700;
            margin-bottom: max(17px, 0.8vw);
        }

        h3 {
            width: 100%;
            font-size: max(32px, 1.4vw);
            font-weight: 500;
            margin-bottom: max(36px, 1.6vw);
        }

        a {
            padding: 12px 28px;
            border-radius: 8px;
            background: #293FE6;
            font-size: max(20px, 0.85vw);
            font-weight: 700;
            color: #fff;
            text-decoration: none;
        }
    }
}


@media (min-width:2200px) {
    #intro {
        .introWrap {
            .introLogo {
                width: 270px;
                margin-bottom: 50px;
            }

            .point {
                font-size: 64px;
                line-height: 100px;
                margin-bottom: 70px;
            }

            .code {
                width: 782px;
                height: 52px;
                font-size: 24px;
                margin-bottom: 86px;
            }

            p {
                font-size: 24px;
                line-height: 36px;
                margin-bottom: 36px;
            }

            a {
                span {
                    font-size: 20px;
                }
            }
        }
    }

    #other {
        >div {
            width: 1416px;
            padding-top: 400px;
        }

        .title {
            font-size: 36px;
            margin-bottom: 24px;
        }

        p {
            font-size: 28px;
            margin-bottom: 42px;
        }

        .cardWrap {
            .card {
                height: 400px;
                padding: 40px;

                img {
                    height: 135px;
                    margin-top: -12px;
                    margin-left: -12px;
                }

                .tit {
                    font-size: 28px;
                }

                .desc {
                    font-size: 24px;
                    line-height: 32px;
                }
            }
        }

        .docWrap {
            .left {
                .title {
                    font-size: 60px;
                }

                a {
                    font-size: 28px;
                }
            }
        }

        .joinWrap {
            height: 500px;
            margin-top: 400px;

            h2 {
                font-size: 60px;
                margin-bottom: 17px;
            }

            h3 {
                font-size: 32px;
                margin-bottom: 36px;
            }

            a {
                font-size: 20px;
            }
        }
    }
}
</style>
