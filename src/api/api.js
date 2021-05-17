import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://perimeter-e.ew.r.appspot.com/",
});

interface QueryStringParams {
    base: 'invoice' | 'withdraw';
    amount: number;
    invoicePayMethod: number;
    withdrawPayMethod: number;
}

interface PostBody {
    amount: number;
    base: 'invoice' | 'withdraw';
    invoicePayMethod: number;
    withdrawPayMethod: number;
}


export const exchangeAPI = {
    getCurrency() {
        return (
            instance.get(`payMethods`)
            .then(response => {
                return response.data
            })
        )
    },

    getCalculate(obj: QueryStringParams) {
        return (
            instance.get(`payMethods/calculate?base=${obj.base}&amount=${obj.amount}&invoicePayMethod=${obj.invoicePayMethod}&withdrawPayMethod=${obj.withdrawPayMethod}`)
            .then(response => {
                return response.data
            })
        )
    },

    sendExchangeRequest(obj: PostBody) {
        return (
            instance.post(`bids`, {
                amount: `${obj.amount}`,
                base: `${obj.base}`,
                invoicePayMethod: `${obj.invoicePayMethod}`,
                withdrawPayMethod: `${obj.withdrawPayMethod}`
            })
        )
    }
};
