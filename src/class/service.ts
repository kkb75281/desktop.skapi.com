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

    constructor(id: string, service: ServiceObj, admin_private_endpoint: string) {
        this.id = id;
        this.admin_private_endpoint = admin_private_endpoint;
        this.service = service;
        this.dateCreated = typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString();
        this.plan = this.planCode[this.service.group];
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