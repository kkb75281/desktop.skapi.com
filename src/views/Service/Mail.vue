<template lang="pug">
main#mail
    section#section
        h4 Automated Emails

        br

        p Automated emails are sent to your users when certain events occur. You can customize the content of these emails by sending your customized version of the email to the addresses below. For more information refer the 
            a(href="https://docs.skapi.com/email/email-templates.html" target="_blank") Documentation
        
        br

        .placeholder
            a(href="https://docs.skapi.com/email/email-templates.html#template-placeholders" target="_blank") Learn more about placeholder

        br

        template(v-if="account.access_group == 1")
            .email(style="text-align:center;")
                p(style="margin-bottom:1rem;") Trial service does not provide automated emails.
        template(v-else)
            .email
                h5 Welcome Email 
                p The user receives this email when they signup, and have successfully verified their email, and logged in for the first time.

                br

                .cont 
                    .tit Endpoint
                    .endPoint
                        template(v-if="currentService") 
                            span {{ currentService?.email_triggers?.template_setters?.welcome }}
                            .copy.clickable(@click="copy")
                                .material-symbols-outlined.sml file_copy
                        template(v-else) loading...
                .cont 
                    .tit Subject
                    .endPoint
                        template(v-if="currentService?.template_welcome") 
                            a(:href="currentService?.template_welcome?.url" target="_blank") {{ currentService?.template_welcome?.subject }}
                        template(v-else) 
                            a(href="javascript:void(0);" @click="openDefaultTemplate('welcome')") {{ defaultTemplate['welcome'].subject }}
            .email
                h5 Verification Email
                p The user receives this email when they verifes their email or when they request forgot password.

                br

                .cont 
                    .tit Endpoint
                    .endPoint
                        template(v-if="currentService") 
                            span {{ currentService?.email_triggers?.template_setters?.verification }}
                            .copy.clickable(@click="copy")
                                .material-symbols-outlined.sml file_copy
                        template(v-else) loading...
                .cont 
                    .tit Subject
                    .endPoint
                        template(v-if="currentService?.template_verification") 
                            a(:href="currentService?.template_verification?.url" target="_blank") {{ currentService?.template_verification?.subject }}
                        template(v-else)
                            a(href="javascript:void(0);" @click="openDefaultTemplate('verification')") {{ defaultTemplate['verification'].subject }}
                .cont 
                    .tit Required Placeholder
                    .endPoint
                        span ${code}
            .email
                h5 Signup Confirmation Email
                p The user receives this email when they are requested for confirmation on signup.

                br

                .cont 
                    .tit Endpoint
                    .endPoint
                        template(v-if="currentService") 
                            span {{ currentService?.email_triggers?.template_setters?.signup_confirmation }}
                            .copy.clickable(@click="copy")
                                .material-symbols-outlined.sml file_copy
                        template(v-else) loading...
                .cont 
                    .tit Subject
                    .endPoint
                        template(v-if="currentService?.template_confirmation") 
                            a(:href="currentService?.template_confirmation?.url" target="_blank") {{ currentService?.template_confirmation?.subject }}
                        template(v-else)
                            a(href="javascript:void(0);" @click="openDefaultTemplate('confirmation')") {{ defaultTemplate['confirmation'].subject }}
                .cont 
                    .tit Required Placeholder
                    .endPoint
                        span ${link}
            .email
                h5 Invitation Email
                p The user receives this email when they are invited to the service.

                br

                .cont 
                    .tit Endpoint
                    .endPoint
                        template(v-if="currentService") 
                            span {{ currentService?.email_triggers?.template_setters?.invitation }}
                            .copy.clickable(@click="copy")
                                .material-symbols-outlined.sml file_copy
                        template(v-else) loading...
                .cont 
                    .tit Subject
                    .endPoint
                        template(v-if="currentService?.template_invitation") 
                            a(:href="currentService?.template_invitation?.url" target="_blank") {{ currentService?.template_invitation?.subject }}
                        template(v-else)
                            a(href="javascript:void(0);" @click="openDefaultTemplate('invitation')") {{ defaultTemplate['invitation'].subject }}
                .cont 
                    .tit Required Placeholder
                    .endPoint
                        span ${password} , ${email}

    br

    section#section
        h4 Newsletters

        br

        p By sending the newsletter email to the addresses below, You can send newsletters either to your public subscribers or your service users. For more information refer the 
            a(href="https://docs.skapi.com/email/newsletters.html" target="_blank") Documentation

        br
        br

        template(v-if="account.access_group == 1")
            .email(style="text-align:center;")
                p(style="margin-bottom:1rem;") Trial service does not provide newsletters.
        template(v-else)
            .email
                h5 Public Newsletter

                br

                .cont 
                    .tit Endpoint
                    .endPoint
                        template(v-if="newsletter_sender?.[currentService.service]?.public") 
                            span {{ newsletter_sender[currentService.service].public }}
                            .copy.clickable(@click="copy")
                                .material-symbols-outlined.sml file_copy
                        span(v-else-if="!account.email_verified") Email verification required
                        span(v-else) loading...

            .email
                h5 Service User Newsletter

                br

                .cont 
                    .tit Endpoint
                    .endPoint
                        template(v-if="newsletter_sender?.[currentService.service]?.authorized") 
                            span {{ newsletter_sender[currentService.service].authorized }}
                            .copy.clickable(@click="copy")
                                .material-symbols-outlined.sml file_copy
                        span(v-else-if="!account.email_verified") Email verification required
                        span(v-else) loading...

</template>

<script setup>
import { currentService, newsletter_sender } from '@/data.js';
import { account } from '@/main.js';

let defaultTemplate = {
    welcome : {
        'html': '<pre><span style="font-weight: bold">Hello ${name}</span>Thank you for joining ${service_name}Your login email is: <span style="font-weight: bold">${email}</span></pre>',
        'subject': 'Thank you for joining ${service_name}',
    },
    verification : {
        'html': '<pre>Your verification code is <span style="font-weight: bold">${code}</span></pre>',
        'subject': '[${service_name}] Verification code'
    },
    invitation : {
        'html': '<pre>Hello ${name}You are invited to ${service_name}You can accept the invitation by clicking on this <a href="${link}" style="font-weight: bold">LINK</a>Your login e-mail is: <b>${email}</b>Your account password is: <b>${password}</b>Your activation link is valid for 7 days.</pre>',
        'subject': "[${service_name}] Invitation",
    },
    confirmation : {
        'html': '<pre>Please activate your account by clicking this <a href="${link}" style="font-weight: bold">LINK</a>Your activation link is valid for 7 days</pre>',
        'subject': '[${service_name}] Account activation',
    },
    template_confirm_newsletter_subscription : {
        'html': '<pre>Thank you for subscribing to ${service_name} newsletter.Please confirm your subscription by clicking this <a href="${link}">LINK</a></pre>',
        'subject': '[${service_name}] Thank you for subscribing to our newsletter.',
    }
}

let openDefaultTemplate = (email) => {
    let newWindow = window.open('', '_blank', 'width=600,height=400');
    let htmlContent = '<html>' + defaultTemplate[email].html + '</html>';

    newWindow.document.write(htmlContent);
    newWindow.document.close();
}

let copy = (e) => {
    let currentTarget = e.currentTarget;
    let doc = document.createElement('textarea');
    doc.textContent = currentTarget.previousSibling.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    currentTarget.classList.add('copied');
    setTimeout(() => {
        currentTarget.classList.remove('copied');
    }, 1000);
}
</script>

<style lang="less" scoped>
#mail {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    
    #section {
        width: 100%;
        padding: 2rem;
        background-color: #fafafa;
        border-radius: 8px;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

        p {
            color: rgba(0, 0, 0, 0.60);
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1.5;
            a {
                color: #293FE6;
                font-size: 0.8rem;
                font-weight: 700;
            }
        }
        .placeholder {
            text-align: end;

            a {
                display: inline-block;
                border-radius: 8px;
                text-align: right;
                border: 1px solid #D9D9D9;
                line-height: 32px;
                padding: 0 24px;
                text-decoration: none;
                font-size: 0.8rem;
                font-weight: 500;
                color: #293FE6;
            }
        }
        .email {
            padding: 1.4rem;
            margin-bottom: 1.4rem;
            background-color: rgba(0, 0, 0, 0.02);
            border-radius: 8px;

            h5 {
                color: rgba(0,0,0,0.6);
                margin-bottom: 16px;
            }

            p {
                font-size: 14px;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.40);
            }

            .cont {
                position: relative;
                margin-bottom: 12px;

                &:last-child {
                    margin-bottom: 0;
                }
                .tit, .endPoint {
                    display: inline-block;
                }
                .tit {
                    width: 238px;
                    color: rgba(0, 0, 0, 0.40);
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                .endPoint {
                    span, a {
                        color: rgba(0, 0, 0, 0.60);
                        font-size: 0.8rem;
                        font-weight: 400;
                        line-height: 24px;
                        word-wrap: break-word;
                    }
                    .copy {
                        position: relative;
                        display: inline-block;
                        padding-left: 10px;

                        &::after {
                            position: absolute;
                            display: block;
                            right: -60px;
                            top: 50%;
                            transform: translateY(-50%);
                            text-align: center;
                            font-size: 14px;
                            font-weight: 400;
                            background: rgba(255, 255, 255, 0.6);
                            color: #343434;
                            padding: 4px;
                            content: "Copied";
                            transition: opacity .4s;
                            opacity: 0;
                        }

                        &.copied::after {
                            opacity: 1;
                        }
                    }
                }
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

@media (max-width: 1300px) {
    #mail {
        #section {
            .email {
                .cont {
                    margin-bottom: 24px;
                    .endPoint {
                        display: block;
                        margin-top: 8px;
                    }
                    .copy {
                        position: absolute !important;
                        right: 0;
                        top: 0;

                        &::after {
                            right: 30px !important;
                        }
                    }
                }
            }
        }
    }
}
</style>