<template lang="pug">
main#mail
    section#section
        h4 Automated Emails
        p 
            | Automated emails are sent to your users when certain events occur.
            br
            | You can customize the content of these emails by sending your customized version of the email to the addresses below.
            br
            | For more information refer the 
            a(href="https://docs.skapi.com/email/email-templates.html" target="_blank") Documentation
        .email
            .tit 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.sml file_copy
                span Welcome
            .cont 
                template(v-if="currentService") {{ currentService?.email_triggers?.template_setters?.welcome }}
                template(v-else) loading...
        .email
            .tit 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.sml file_copy
                span Verification
            .cont
                template(v-if="currentService") {{ currentService?.email_triggers?.template_setters?.verification }}
                template(v-else) loading...
        .email
            .tit 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.sml file_copy
                span Signup Confirmation
            .cont 
                template(v-if="currentService") {{ currentService?.email_triggers?.template_setters?.signup_confirmation }}
                template(v-else) loading...
        .email
            .tit 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.sml file_copy
                span Invitation
            .cont 
                template(v-if="currentService") {{ currentService?.email_triggers?.template_setters?.invitation }}
                template(v-else) loading...
        .email
            .tit 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.sml file_copy
                span Newsletter Subscription
            .cont 
                template(v-if="currentService") {{ currentService?.email_triggers?.template_setters?.newsletter_subscription }}
                template(v-else) loading...
    section#section
        h4 Newsletters
        p 
            | By sending the newsletter email to the addresses below,
            br
            | You can send newsletters either to your public subscribers or your service users.
            br
            | For more information refer the 
            a(href="https://docs.skapi.com/email/newsletters.html" target="_blank") Documentation
        .email
            .tit 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.sml file_copy
                span Public Newsletter
            .cont 
                template(v-if="newsletter_sender?.[currentService.service]?.public") {{ newsletter_sender[currentService.service].public }}
                template(v-else-if="!account.email_verified") Email verification required
                template(v-else) loading...
        .email
            .tit 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.sml file_copy 
                span Service Newsletter
            .cont 
                template(v-if="newsletter_sender?.[currentService.service]?.authorized") {{ newsletter_sender[currentService.service].authorized }}
                template(v-else-if="!account.email_verified") Email verification required
                template(v-else) loading...
</template>

<script setup>
import { currentService, newsletter_sender } from '@/data.js';
import { account } from '@/main.js';

let copy = (e) => {
    let currentTarget = e.currentTarget;
    let doc = document.createElement('textarea');
    doc.textContent = currentTarget.parentNode.nextSibling.textContent;
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
        margin-bottom: 2%;
        box-shadow: 8px 12px 36px rgba(0, 0, 0, 0.10);

        p {
            margin-top: 1.4rem;
            margin-bottom: 2.8rem;
            color: rgba(0, 0, 0, 0.60);
            font-size: 0.8rem;
            font-weight: 500;
            line-height: 1.5;
            a {
                color: #293FE6;
                font-size: 0.8rem;
                font-weight: 700;
            }
        }
        .email {
            padding: 1.4rem;
            margin-bottom: 1.4rem;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            .tit {
                display: flex;
                flex-wrap: nowrap;
                color: rgba(0,0,0,0.6);
                margin-bottom: 0.6rem;
                font-size: 0.8rem;
                font-weight: 700;

                span {
                    margin-left: 0.8rem;
                    vertical-align: middle;
                }
                .copy {
                    position: relative;
                    &::after {
                        position: absolute;
                        display: block;
                        right: 25px;
                        top: 10px;
                        transform: translateY(-50%);
                        text-align: center;
                        font-size: 0.7rem;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 0.5);
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
            .cont {
                color: rgba(0, 0, 0, 0.40);
                font-size: 0.8rem;
                font-weight: 400;
                overflow: auto;
                white-space: nowrap;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>