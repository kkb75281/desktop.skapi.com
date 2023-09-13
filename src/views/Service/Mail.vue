<template lang="pug">
.containerWrap
    .container
        h2 Automated Emails
        p 
            | Automated emails are sent to your users when certain events occur.
            br
            | You can customize the content of these emails by sending your customized version of the email to the addresses below.
            br
            | For more information refer the 
            a(href="https://docs.skapi.com" target="_blank") Documentation
        .email
            .tit 
                .material-symbols-outlined.sml.clickable file_copy
                span Welcome
            .cont ap22fAA39RwOW0KU6PUH-tp75497d34939ef12f87710de0e7bc66bd@mail.skapi.com
        .email
            .tit 
                .material-symbols-outlined.sml.clickable file_copy
                span Verification
            .cont ap22fAA39RwOW0KU6PUH-tp75497d34939ef12f87710de0e7bc66bd@mail.skapi.com
        .email
            .tit 
                .material-symbols-outlined.sml.clickable file_copy 
                span Signup Confirmation
            .cont ap22fAA39RwOW0KU6PUH-tp75497d34939ef12f87710de0e7bc66bd@mail.skapi.com
        .email
            .tit 
                .material-symbols-outlined.sml.clickable file_copy
                span Newsletter Subscription
            .cont ap22fAA39RwOW0KU6PUH-tp75497d34939ef12f87710de0e7bc66bd@mail.skapi.com
    .container
        h2 Newsletters
        p 
            | By sending the newsletter email to the addresses below,
            br
            | You can send newsletters either to your public subscribers or your service users.
            br
            | For more information refer the 
            a(href="https://docs.skapi.com" target="_blank") Documentation
        .email
            .tit 
                .material-symbols-outlined.sml.clickable file_copy
                span Public Newsletter
            .cont ap22fAA39RwOW0KU6PUH-tp75497d34939ef12f87710de0e7bc66bd@mail.skapi.com
        .email
            .tit 
                .material-symbols-outlined.sml.clickable file_copy 
                span Service User Newsletter
            .cont ap22fAA39RwOW0KU6PUH-tp75497d34939ef12f87710de0e7bc66bd@mail.skapi.com
</template>

<script setup>

</script>

<style lang="less" scoped>
.containerWrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    .container {
        width: 100%;
        padding: 40px;
        background-color: #fafafa;
        border-radius: 8px;
        margin-bottom: 2%;
        filter: drop-shadow(8px 12px 36px rgba(0, 0, 0, 0.10));

        h2 {
            font-size: 24px;
            font-weight: 700;
        }
        p {
            margin-top: 28px;
            margin-bottom: 56px;
            color: rgba(0, 0, 0, 0.60);
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            a {
                color: #293FE6;
                font-size: 16px;
                font-weight: 700;
            }
        }
        .email {
            padding: 28px;
            margin-bottom: 28px;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            .tit {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                color: rgba(0,0,0,0.6);
                margin-bottom: 12px;
                font-size: 16px;
                font-weight: 700;

                span {
                    margin-left: 16px;
                    vertical-align: middle;
                }
            }
            .cont {
                color: rgba(0, 0, 0, 0.40);
                font-size: 16px;
                font-weight: 400;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>