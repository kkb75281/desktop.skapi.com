import { ref, reactive } from "vue";

export let serviceFetching = ref(false);
export let services = ref([]);
export let storageInfo = ref({});
export let currentService = ref(null);
export let serviceUsers = {};
export let serviceRecords = {};

export let users = ref([
    {
        block: 0,
        status: 1,
        user_id: "0c4d24ea-4382-4363-a6b3-e261c6dbd4d1",
        name: "test2",
        email: "test2@gmail.com",
        address: "경기도 안산시 상록구 사동",
        gender: "test2@gmail.com",
        group: "test2@gmail.com"
    },
    {
        block: 1,
        status: 0,
        user_id: "f8982f17-6fff-491b-9876-31a49566f9fc",
        name: "asdf",
        email: "assdasdkasdajlssdkajsdlaksjdlaskdjaslkdjasddf@gmail.com",
        address: "KR",
        gender: "test2@gmail.com",
        group: "test2@gmail.com"
    },
    {
        block: 1,
        status: 0,
        user_id: "a4c9aec8-c106-49ef-8cb9-cc96f2f24e2b",
        name: "tteesstt",
        email: "tteesstt@gmail.com",
        address: "KR",
        gender: "test2@gmail.com",
        group: "test2@gmail.com"
    },
    {
        block: 0,
        status: 1,
        user_id: "90cf0b46-2858-4c9c-bf29-9d6489877dbc",
        name: "nameeee",
        email: "nameeee@gmail.com",
        address: "KR",
        gender: "test2@gmail.com",
        group: "test2@gmail.com"
    },
    {
        block: 0,
        status: 1,
        user_id: "ef1528a1-91ec-4514-884c-ea31a907d645",
        name: "test100",
        email: "test100@gmail.com",
        address: "KR",
        gender: "test2@gmail.com",
        group: "test2@gmail.com"
    },
    {
        block: 1,
        status: 0,
        user_id: "a3aaa127-547f-46b1-9abd-c32461e42f33",
        name: "testA",
        email: "testA@gmail.com",
        address: "KR",
        gender: "test2@gmail.com",
        group: "test2@gmail.com"
    },
    {
        block: 0,
        status: 1,
        user_id: "a5725c08-919d-4945-870d-29a6d4faece6",
        name: "testX",
        email: "testX@gmail.com",
        address: "KR",
        gender: "test2@gmail.com",
        group: "test2@gmail.com"
    },
])

export let records = ref([
    {
        data: {
            answer:"점"
        },
        ip: "211.217.251.144",
        record_id: "TlaF3jI72QXnUs38",
        index: {
            name:"aaadsfsdf",
            value:"dfdfdf"
        },
        reference: {
            allow_multiple_reference: true,
            reference_limit: null,
            referenced_count: 0,
        },
        table: {
            access_group:0,
            name:"uploadAnswer"
        },
        tags: [
            "aaaa", "bbbb", "cccc", "dddd", "eee", "ffff", "gggg"
        ],
        updated: 1690800612396,
        uploaded: 1690800612396,
        user_id: "f66a6888-653d-4e9c-ace6-0c1486986170"
    },
    {
        data: {
            answer:"123123"
        },
        ip: "125.180.116.116",
        record_id:"Tn1LKvARcnrTUs38",
        index: {
            name:"aaadsfsdf",
            value:"ssdsa"
        },
        reference: {
            allow_multiple_reference:true,
            reference_limit:null,
            referenced_count:0
        },
        table: {
            access_group: 'private',
            name:"uploadAnswer"
        },
        ref: {
            dddd: "sdsds"
        },
        updated:1692117202352,
        uploaded:1692117202352,
        user_id:"f66a6888-653d-4e9c-ace6-0c1486986170"
    },
    {
        data: {
            answer:"123123"
        },
        ip: "125.180.116.116",
        record_id:"Tv4LKvARcnrTUs38",
        index: {
            name:"aaadsfsdf",
            value:"ssdsa"
        },
        reference: {
            allow_multiple_reference:true,
            reference_limit:null,
            referenced_count:0
        },
        table: {
            access_group: 'private',
            name:"uploadAnswer"
        },
        tags: [
            "hhh", "iii", "jjj", "kkkk", "lll", "mmm", "nnn"
        ],
        ref: {
            dddd: "sdsds"
        },
        updated:1692117202352,
        uploaded:1692117202352,
        user_id:"f66a6888-653d-4e9c-ace6-0c1486986170"
    },
    {
        data: {
            answer:"123123"
        },
        ip: "125.180.116.116",
        record_id:"Tn3LKvARcnrTUs38",
        index: {
            name:"aaadsfsdf",
            value:"ssdsa"
        },
        reference: {
            allow_multiple_reference:true,
            reference_limit:null,
            referenced_count:0
        },
        table: {
            access_group: 'private',
            name:"uploadAnswer"
        },
        ref: {
            dddd: "sdsds"
        },
        updated:1692117202352,
        uploaded:1692117202352,
        user_id:"f66a6888-653d-4e9c-ace6-0c1486986170"
    }
])

export let records_data = ref([
    {
        type: "json",
        key: "wewwewwewwewewewewew",
        context: "lfkjsflksjadflkasdjfldkjfasdoife2qoirewlfknadslkjfsaldkfjlksfjlkdjfailsdjf"
    },
    {
        type: "string",
        key: "",
        context: "sdjasdijaosidjaosidjaosidj"
    },
    {
        type: "boolean",
        key: "",
        context: "false"
    },
    {
        type: "file",
        key: "",
        context: "file name. jpg"
    },
    {
        type: "number",
        key: "",
        context: "1928379843732948724"
    }
])