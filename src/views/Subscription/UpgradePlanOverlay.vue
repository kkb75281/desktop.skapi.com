<template lang="pug">
#overlayWindow.upgradePlan(@click="emits('close')" style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        header
            .title.blue
                h5 Upgrade Plan
        main
            .content
                p Do you truly wish to upgrade your plan?
                br
                br
                .buttonWrap 
                    template(v-if="promiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button.noLine(@click="emits('close')") Cancel
                        button.final(@click="upgrade") Upgrade
</template>

<script setup>
import { skapi, account, customer } from '@/main.js';
import { currentService } from '@/data.js';
import { ref } from 'vue';

let emits = defineEmits(['close']);
let props = defineProps(['changeMode']);
let promiseRunning = ref(false);

let upgrade = () => {
    promiseRunning.value = true;

    if(currentService.value.group == 1) {
        createSubscription(props.changeMode, currentService.value);
    } else {
        if(currentService.value.active == -1) {
            createSubscription(props.changeMode, currentService.value);
        } else {
            updateSubscription(props.changeMode);
        }
    }
}

let createSubscription = async (ticket_id, service_info) => {
    let resolvedCustomer = await customer;
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let customer_id = resolvedCustomer.id;
    let currentUrl = window.location;

    let response = await skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: 'https://api.stripe.com/v1/checkout/sessions',
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            client_reference_id: account.value.user_id,
            customer: customer_id,
            'customer_update[name]': 'auto',
            'customer_update[address]': 'auto',
            'subscription_data[metadata][service]': service_info.service,
            'subscription_data[metadata][owner]': account.value.user_id,
            'mode': 'subscription',
            'subscription_data[description]': 'Subscription Plan of service ID: ' + service_info.service,
            cancel_url: currentUrl.origin + '/subscription/' + service_info.service,
            "line_items[0][quantity]": 1,
            'line_items[0][price]': product[ticket_id],
            "success_url": currentUrl.origin + '/subscription/' + service_info.service + '?checkout_id={CHECKOUT_SESSION_ID}&service_id=' + service_info.service + '&ticket_id=' + ticket_id,
            'tax_id_collection[enabled]': true,
        }
    });
    if (response.error) {
        alert(response.error.message);
        return;
    }

    window.location = response.url;
    promiseRunning.value = false;
}

let updateSubscription = async (ticket_id) => {
    let resolvedCustomer = await customer;
    let subs_id = currentService.value.subs_id.split('#');

    if (!currentService.value.subs_id) {
        alert('Service does not have a subscription');
        return;
    }

    if (subs_id.length < 2) {
        alert('Service does not have a subscription');
        return;
    }

    let SUBSCRIPTION_ID = subs_id[0];
    let SUBSCRIPTION_ITEM_ID = subs_id[1];
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let dataObj = {};

    if(currentService.value?.subsInfo?.cancel_at_period_end) {
        dataObj = {
            'items[0][id]': SUBSCRIPTION_ITEM_ID,
            'items[0][price]': product[ticket_id],
            proration_behavior: 'create_prorations',
            'cancel_at_period_end': false
        }
    } else {
        dataObj = {
            'items[0][id]': SUBSCRIPTION_ITEM_ID,
            'items[0][price]': product[ticket_id],
            proration_behavior: 'create_prorations'
        }
    }

    let response = await skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: dataObj
    });

    console.log(response);

    if (response.error) {
        alert(response.error.message);
        return;
    }

    promiseRunning.value = false;
    emits('close');
}
</script>