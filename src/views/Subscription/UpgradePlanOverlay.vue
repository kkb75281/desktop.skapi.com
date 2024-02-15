<template lang="pug">
#overlayWindow.upgradePlan(@click="emits('close')" style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        header
            .title.blue
                h5 Upgrade Plan
        main
            .content
                p Do you truly wish to upgrade your plan? Plan changes are only possible once per day.
                br
                br
                .buttonWrap 
                    button.noLine(@click="emits('close')") Cancel
                    button.final(@click="updateSubscription(props.changeMode)") Upgrade
</template>

<script setup>
import { skapi, customer } from '@/main.js';
import { currentService } from '@/data.js';

let emits = defineEmits(['close']);
let props = defineProps(['changeMode']);

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

    let response = await skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            'items[0][id]': SUBSCRIPTION_ITEM_ID,
            'items[0][price]': product[ticket_id],
            proration_behavior: 'create_prorations'
        }
    });

    console.log(response);

    if (response.error) {
        alert(response.error.message);
        return;
    }

    emits('close');
}
</script>