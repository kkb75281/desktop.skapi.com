<template lang="pug">
main(style='padding: 1em;')
    h1 Payment System

    br

    h2 1. Get service info
    p Prepare for service object
    hr

    input(placeholder="service ID" v-model="service_id")
    button(@click="skapi.getServices(service_id).then(response => service_info = response[0])") Get Service
    pre {{ service_info }}

    br

    h2 2. Stripe create/get customer
    p Prepare for customer object
    hr

    button(@click="getCustomer") Get customer
    pre {{ customer }}

    br

    h2 3. Create subscription
    hr
    p You can create standard or premium subscription from trial services

    button(@click="createSubscription('standard')") Create standard subscription
    br
    button(@click="createSubscription('premium')") Create premium subscription

    br

    h2 4. Update subscription 
    hr
    p You can update/downgrade to standard or premium subscription

    button(@click="updateSubscription('standard')") Update standard subscription
    br
    button(@click="updateSubscription('premium')") Update premium subscription

    br

    h2 5. Cancel subscription 
    hr
    p You can cancel subscription. The service will be active until the end of period. after the period, the service will be suspended. when the service is suspended, user can delete the service.

    button(@click="cancelSubscription()") Cancel subscription

    br

    h2 5. Get subscription info
    hr
    p You can get service subscription info. See console for response.

    button(@click="getSubscription()") Get subscription

    br

    h2 5. Open customer Portal
    hr
    p User can cancel subscription from customer portal, if they do the service will be suspended after the pay period.
    button(@click='openCustomerPortal') Open customer portal
</template>

<script setup>
import { ref } from 'vue';
import { skapi, account } from '@/main.js';

let user = account.value;
let customer = ref(null);
let service_id = ref(null);
let service_info = ref(null);

let product = JSON.parse(import.meta.env.VITE_PRODUCT)

function openCustomerPortal() {
    // code to open customer portal
    if (!customer.value) {
        alert('Please get customer first');
        return;
    }

    skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: `https://api.stripe.com/v1/billing_portal/sessions`,
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            customer: customer.value.id,
            return_url: window.location.origin + '/experiment'
        }
    }).then(response => {
        window.location = response.url;
    });
}

if (window.location.search.includes('checkout_id')) {
    // when payment is successful, user must wait at this page.
    let urlParams = new URLSearchParams(window.location.search);
    let service_id = urlParams.get('service_id');
    let ticket_id = urlParams.get('ticket_id'); // standard | premium

    // manually set service group number
}

let getCustomer = async () => {
    let misc = JSON.parse(user?.misc || null);

    if (misc?.stripe_customer_id) {
        // stripe_customer_id exists

        let customer_id = misc.stripe_customer_id;

        // get customer info, and update customer.value
        customer.value = await skapi.clientSecretRequest({
            clientSecretName: 'stripe_test',
            url: `https://api.stripe.com/v1/customers/${customer_id}`,
            method: 'GET',
            headers: {
                Authorization: 'Bearer $CLIENT_SECRET'
            }
        });
    }

    else {
        // stripe_customer_id does not exist

        // create customer, save customer id in user misc
        let customer_info = await skapi.clientSecretRequest({
            clientSecretName: 'stripe_test',
            url: 'https://api.stripe.com/v1/customers',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer $CLIENT_SECRET'
            },
            data: {
                name: user.name || user.email,
                email: user.email
            }
        })

        customer.value = customer_info;

        // update customer id in user misc
        account.value = await skapi.updateProfile({
            misc: JSON.stringify({ stripe_customer_id: customer_info.id })
        });
    }
};

let getSubscription = async () => {
    if (!customer.value) {
        alert('Please get customer first');
        return;
    }

    if (!service_info.value) {
        alert('Please get service first');
        return;
    }

    let subs_id = service_info.value.subs_id.split('#');

    console.log(service_info.value)

    if (!service_info.value.subs_id) {
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
        method: 'GET',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });

    console.log(response);

    if (response.error) {
        alert(response.error.message);
        return;
    }
}

let cancelSubscription = async () => {
    if (!customer.value) {
        alert('Please get customer first');
        return;
    }

    if (!service_info.value) {
        alert('Please get service first');
        return;
    }

    let subs_id = service_info.value.subs_id.split('#');

    if (!service_info.value.subs_id) {
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
}

let updateSubscription = async (ticket_id) => {
    if (!customer.value) {
        alert('Please get customer first');
        return;
    }

    if (!service_info.value) {
        alert('Please get service first');
        return;
    }

    let subs_id = service_info.value.subs_id.split('#');

    if (!service_info.value.subs_id) {
        alert('Service does not have a subscription');
        return;
    }

    if (subs_id.length < 2) {
        alert('Service does not have a subscription');
        return;
    }

    let SUBSCRIPTION_ID = subs_id[0];
    let SUBSCRIPTION_ITEM_ID = subs_id[1];

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
}

let createSubscription = async (ticket_id) => {
    if (!customer.value) {
        alert('Please get customer first');
        return;
    }

    if (!service_info.value) {
        alert('Please get service first');
        return;
    }

    let customer_id = customer.value.id;
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
            client_reference_id: user.user_id,
            customer: customer_id,
            'customer_update[name]': 'auto',
            'customer_update[address]': 'auto',
            'subscription_data[metadata][service]': service_id.value,
            'subscription_data[metadata][owner]': user.user_id,
            'mode': 'subscription',
            'subscription_data[description]': 'Subscription Plan of service ID: ' + service_id.value,
            cancel_url: currentUrl.origin + '/experiment',
            "line_items[0][quantity]": 1,
            'line_items[0][price]': product[ticket_id],
            "success_url": currentUrl.origin + '/experiment?checkout_id={CHECKOUT_SESSION_ID}&service_id=' + service_id.value + '&ticket_id=' + ticket_id,
            'tax_id_collection[enabled]': true,
        }
    });
    if (response.error) {
        alert(response.error.message);
        return;
    }

    window.location = response.url;
};

</script>