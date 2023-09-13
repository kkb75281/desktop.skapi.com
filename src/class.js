let records = [
    {
        data: {
            answer:"점"
        },
        ip: "211.217.251.144",
        record_id: "TlaF3jI72QXnUs38",
        index: {
            name:"e",
            value:8
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
            name:"a",
            value:10
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
]

class Page {
    itemPerPage;
    order;
    totalList = [];

    constructor(itemPerPage, order) {
        this.itemPerPage = itemPerPage;
        this.order = order;
    }

    addList(list) {
        for(let i of list) {
            // insert sorted to totalList
            let index = 0;
            for(let j of this.totalList) {
                if(i < j) {
                    break;
                }
                index++;
            }
            this.totalList.splice(index, 0, i);
        }
        return "success"
    }

    orderList(property) {
        function compareByProperty(p) {
            return function(a, b) {
                const valueA = a.hasOwnProperty(p) ? a[p] : undefined;
                const valueB = b.hasOwnProperty(p) ? b[p] : undefined;

                console.log(valueA, valueB)

                if (valueA === undefined && valueB === undefined) {
                    return 0;
                }
                if (valueA === undefined) {
                    return -1;
                }
                if (valueB === undefined) {
                    return 1;
                }

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return valueA - valueB;
                }

                const stringValueA = valueA?.toString().toLowerCase() || '';
                const stringValueB = valueB?.toString().toLowerCase() || '';

                if (stringValueA < stringValueB) {
                    return -1;
                }
                if (stringValueA > stringValueB) {
                    return 1;
                }
                return 0;
            };
        }

        let res = this.totalList.sort(compareByProperty(property));
        return res;
    }

    viewPage(pageNumb, order) {
        let start = (pageNumb - 1) * this.itemPerPage;
        let end = start + this.itemPerPage;
        // let result = this.totalList.slice(start, end);
        let result = this.orderList(order)
        return result;
    }
}

// let page = new Page(3);

// page.addList(records);
// // console.log(page.totalList);

// // let res = page.viewPage(2, 'index.name');
// let res = page.orderList('index.name');
// console.log(res);

let a = {
    index: {
        name: 'ayoyo'
    }
}

console.log(a.hasOwnProperty('index.name'))

