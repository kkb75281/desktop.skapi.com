<template lang="pug">
#overlayWindow.cancelPlan(@click="emits('close')" style='--max-width: 480px;')
    .overlayWrap(@click.stop)
        header
            .title.withIcon.red
                .material-symbols-outlined.mid.icon warning
                h5 Cancel Plan
        main
            .content
                p During the cancellation, the service is deactivated. After three months, all data and users will be deleted unless you resume the plan before then. 
                br
                p Still want to cancel ?
                br
                br
                .buttonWrap 
                    template(v-if="promiseRunning")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        button.noLine(@click="emits('close')") Cancel
                        button.unFinished.warning(@click="cancelSubscription") Cancel Plan
</template>

<script setup>
import { skapi, account, customer } from '@/main.js';
import { currentService } from '@/data.js';
import { ref } from 'vue';

let emits = defineEmits(['close']);
let promiseRunning = ref(false);

let cancelSubscription = async () => {
    promiseRunning.value = true;

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

    let response = await skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            'cancel_at_period_end': true
        }
    });

    console.log(response);

    if (response.error) {
        alert(response.error.message);
        return;
    }

    promiseRunning.value = false;
    emits('close', response);
}
</script>