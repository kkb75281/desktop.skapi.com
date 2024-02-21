import { skapi } from '@/main.js';

type ServiceObj = {
    active: number; // 0 = disabled / -1 = suspended
    api_key: string;
    cors: string; // "url, url"
    created_locale: string; // country code ex) KR
    email: string;
    group: number; // 1 = trial / 2 = standard / 3 = premium
    host: string;
    lmt: string; // #users_exceed / #cloud_exceed / #db_exceed / #mail_exceed / #host_exceed ex) "#cloud_exceed#db_exceed#.."
    name: string;
    newsletter_subscribers: number;
    owner: string;
    region: string; // network region ex) ap-northeast-1
    service: string;
    timestamp: number; // service created time in 13 digit timestamp
    users: number;
    subdomain?: string,
    subs_id?: string,
    email_triggers?: {
        template_setters: {
            welcome: string,
            signup_confirmation: string,
            newsletter_subscription: string,
            verification: string,
            invitation: string
        }
    }
};

type SubscriptionObj = {
    application: null
    application_fee_percent: null
    automatic_tax: { enabled: boolean, liability: null }
    billing_cycle_anchor: number
    billing_cycle_anchor_config: null
    billing_thresholds: null
    cancel_at: null
    cancel_at_period_end: false
    canceled_at: null
    cancellation_details: { comment: null, feedback: null, reason: null }
    collection_method: string
    created: number
    currency: string
    current_period_end: number
    current_period_start: number
    customer: string
    days_until_due: null
    default_payment_method: string
    default_source: null
    default_tax_rates: []
    description: string
    discount: null
    ended_at: null
    id: string
    invoice_settings: { account_tax_ids: null, issuer: { type: string } }
    items: { object: string, data: [], has_more: false, total_count: 1, url: string }
    latest_invoice: string
    livemode: false
    metadata: { service: string }
    next_pending_invoice_item_invoice: null
    object: string
    on_behalf_of: null
    pause_collection: null
    payment_settings: { payment_method_options: null, payment_method_types: null, save_default_payment_method: string }
    pending_invoice_item_interval: null
    pending_setup_intent: null
    pending_update: null
    plan: {
        active: boolean,
        aggregate_usage: null,
        amount: number,
        amount_decimal: string,
        billing_scheme: string,
        created: number,
        currency: string,
        id: string,
        interval: string,
        interval_count: number,
        livemode: boolean,
        metadata: {},
        nickname: null,
        object: string,
        product: string,
        tiers_mode: null,
        transform_usage: null,
        trial_period_days: null,
        usage_type: string
    }
    quantity: number
    schedule: null
    start_date: number
    status: string
    test_clock: null
    transfer_data: null
    trial_end: null
    trial_settings: { end_behavior: { missing_payment_method: string } }
    trial_start: null
}

export default class Service {
    id: string;
    admin_private_endpoint: string;
    service: ServiceObj;
    getServiceUrl: string;
    dateCreated: string;
    plan: string;
    planCode: { [key: number]: string } = {
        1: 'Trial',
        2: 'Standard',
        3: 'Premium',
        50: 'Unlimited',
        51: 'Free Standard'
    };
    subscription?: SubscriptionObj | null;

    constructor(id: string, service: ServiceObj, admin_private_endpoint: string) {
        this.id = id;
        this.admin_private_endpoint = admin_private_endpoint;
        this.service = service;
        this.dateCreated = typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString();
        this.plan = this.planCode[this.service.group];
        this.getSubscription();
    }

    async getSubscription(refresh = false): Promise<SubscriptionObj> {
        if (this.subscription) {
            if (!refresh) {
                return this.subscription;
            }
        }

        if (this.service?.subs_id) {
            let subs_id = this.service?.subs_id.split('#');

            if (subs_id.length < 2) {
                alert('Service does not have a subscription');
                return;
            }

            let SUBSCRIPTION_ID = subs_id[0];

            let res = await skapi.clientSecretRequest({
                clientSecretName: 'stripe_test',
                url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer $CLIENT_SECRET',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            this.subscription = res;
            return res;
        }

        this.subscription = null;
        return null;
    }

    //////////////////////////////////////////////////////////////////////////////
    static async load(id: string) {
        let endpoint = await skapi.admin_endpoint;
        let admin_private_endpoint = endpoint.admin_private; // https://.../

        let service = await skapi.request(admin_private_endpoint + 'get-services', { service_id: id }, { auth: true })
        for (let k in service) {
            return new Service(id, service[k][0], admin_private_endpoint);
        }
    }
}