<template lang="pug">
#overlayWindow.downgradePlan(@click="emits('close')" style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        header
            .title.blue
                h5 Downgrade Plan
        main
            .content
                p Do you really want to downgrade your plan? If you downgrade, you won't have access to some features of your current plan. Plan changes are only possible once per day.
                br
                br
                .buttonWrap 
                    template(v-if="promiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button.noLine(@click="emits('close')") Cancel
                        button.final(@click="updateSubscription(props.changeMode)") Downgrade
</template>

<script setup>
import { skapi, account, customer } from '@/main.js';
import { currentService, storageInfo } from '@/data.js';
import { ref } from 'vue';

let emits = defineEmits(['close']);
let props = defineProps(['changeMode']);
let promiseRunning = ref(false);

let updateSubscription = async (ticket_id) => {
    promiseRunning.value = true;

    if (currentService.value.users > 10000000 || storageInfo?.value[currentService.value.service]?.database > 4294967296 || storageInfo?.value[currentService.value.service]?.cloud > 53687091200) {
        return false;
    }
    if(currentService.value.subdomain) {
        if (storageInfo?.value[currentService.value.service]?.host > 5242900000) {
            return false;
        }
    }

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

    promiseRunning.value = false;
    emits('close');
}
</script>