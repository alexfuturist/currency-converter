import { exchangeAPI } from "api/api";

const SET_INVOICE = 'SET_INVOICE';
const SET_WITHDRAW = 'SET_WITHDRAW';
const SET_INVOICE_CURRENT_METHOD = 'SET_INVOICE_CURRENT_METHOD';
const SET_WITHDRAW_CURRENT_METHOD = 'SET_WITHDRAW_CURRENT_METHOD';
const SET_INVOICE_AMOUNT = 'SET_INVOICE_AMOUNT';
const SET_WITHDRAW_AMOUNT = 'SET_WITHDRAW_AMOUNT';
const SET_CURRENT_BASE = 'SET_CURRENT_BASE';
const TOGGLE_INPUT_IS_FETCHING = 'TOGGLE_INPUT_IS_FETCHING';
const TOGGLE_BUTTON_IS_FETCHING = 'TOGGLE_BUTTON_IS_FETCHING';
const TOGGLE_IS_EXCHANGE_COMPLETED = 'TOGGLE_IS_EXCHANGE_COMPLETED';
const TOGGLE_IS_REQUEST_COMPLETED = 'TOGGLE_IS_REQUEST_COMPLETED';


export interface PayMethod {
    id: number;
    name: string;
}

interface Response {
    invoice: PayMethod[];
    withdraw: PayMethod[];
}

interface initialState extends Response {
    invoiceCurrentMethod: null | number;
    withdrawCurrentMethod: null | number;
    invoiceAmount: number;
    withdrawAmount: number;
    currentBase: string;
    isInputFetching: boolean;
    isButtonFetching: boolean;
    isExchangeСompleted: boolean;
    isRequestСompleted: boolean;
}

let initialState: initialState = {
    invoice: [],
    withdraw: [],
    invoiceCurrentMethod: null,
    withdrawCurrentMethod: null,
    invoiceAmount: 0,
    withdrawAmount: 0,
    currentBase: '',
    isInputFetching: false, //preloader
    isButtonFetching: false, //preloader
    isExchangeСompleted: false,
    isRequestСompleted: false
};

const exchangeReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case SET_INVOICE: {
            return {
                ...state,
                invoice: [...action.invoice]
            }
        }

        case SET_WITHDRAW: {
            return {
                ...state,
                withdraw: [...action.withdraw]
            }
        }

        case SET_INVOICE_CURRENT_METHOD: {
            return {
                ...state,
                invoiceCurrentMethod: action.invoiceId
            }
        }

        case SET_WITHDRAW_CURRENT_METHOD: {
            return {
                ...state,
                withdrawCurrentMethod: action.withdrawId
            }
        }

        case SET_INVOICE_AMOUNT: {
            return {
                ...state,
                invoiceAmount: parseFloat(action.invoiceAmount)
            }
        }

        case SET_WITHDRAW_AMOUNT: {
            return {
                ...state,
                withdrawAmount: parseFloat(action.withdrawAmount)
            }
        }

        case SET_CURRENT_BASE: {
            return {
                ...state,
                currentBase: action.currentBase
            }
        }

        case TOGGLE_INPUT_IS_FETCHING: {
            return {
                ...state,
                isInputFetching: action.isInputFetching
            }
        }

        case TOGGLE_BUTTON_IS_FETCHING: {
            return {
                ...state,
                isButtonFetching: action.isButtonFetching
            }
        }

        case TOGGLE_IS_EXCHANGE_COMPLETED: {
            return {
                ...state,
                isExchangeСompleted: action.isExchangeСompleted
            }
        }

        case TOGGLE_IS_REQUEST_COMPLETED: {
            return {
                ...state,
                isRequestСompleted: action.isRequestСompleted
            }
        }

        default:
            return state;
    }
}


//AC
export const setInvoice = (invoice: any) => ({
    type: SET_INVOICE,
    invoice
});

export const setWithdraw = (withdraw: any) => ({
    type: SET_WITHDRAW,
    withdraw
});

export const setInvoiceCurrentMethod = (invoiceId: any) => ({
    type: SET_INVOICE_CURRENT_METHOD,
    invoiceId: invoiceId
});

export const setWithdrawCurrentMethod = (withdrawId: any) => ({
    type: SET_WITHDRAW_CURRENT_METHOD,
    withdrawId: withdrawId
});

export const setInvoiceAmount = (invoiceAmount: number) => ({
    type: SET_INVOICE_AMOUNT,
    invoiceAmount: invoiceAmount
});

export const setWithdrawAmount = (withdrawAmount: number) => ({
    type: SET_WITHDRAW_AMOUNT,
    withdrawAmount: withdrawAmount
});

export const setCurrentBase = (currentBase: string) => ({
    type: SET_CURRENT_BASE,
    currentBase: currentBase
});

export const toggleInputIsFetching = (isInputFetching: boolean) => ({
    type: TOGGLE_INPUT_IS_FETCHING,
    isInputFetching
});

export const toggleButtonIsFetching = (isButtonFetching: boolean) => ({
    type: TOGGLE_BUTTON_IS_FETCHING,
    isButtonFetching
});

export const toggleIsExchangeСompleted = (isExchangeСompleted: boolean) => ({
    type: TOGGLE_IS_EXCHANGE_COMPLETED,
    isExchangeСompleted
});

export const toggleIsRequestСompleted = (isRequestСompleted: boolean) => ({
    type: TOGGLE_IS_REQUEST_COMPLETED,
    isRequestСompleted: isRequestСompleted
});


//TC
//запрашиваем списки платежных методов с сервера
export const getCurrency = () => async (dispatch: any) => {
    try {
        //side-effect
        let response = await exchangeAPI.getCurrency();

        dispatch(setInvoice(response.invoice));
        dispatch(setWithdraw(response.withdraw));

    } catch (error) {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};

//запрашиваем расчет суммы обмена для поля ввода Buy(withdraw)
export const getWithdraw = (value: number) => async (dispatch: any, getState: any) => {

    dispatch(toggleInputIsFetching(true));
    dispatch(setInvoiceAmount(value));

    const invoiceAmount = getState().exchangePage.invoiceAmount;
    const invoicePayMethod = getState().exchangePage.invoiceCurrentMethod;
    const withdrawPayMethod = getState().exchangePage.withdrawCurrentMethod;

    try {
        //side-effect
        let response = await exchangeAPI.getCalculate({
            base: 'invoice',
            amount: invoiceAmount,
            invoicePayMethod: invoicePayMethod,
            withdrawPayMethod: withdrawPayMethod
        });

        dispatch(setWithdrawAmount(response.amount));
        dispatch(setCurrentBase('invoice'));
        dispatch(toggleInputIsFetching(false));
        dispatch(toggleIsExchangeСompleted(true));

    } catch (error) {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};

//запрашиваем расчет суммы обмена для поля ввода Sell(invoice)
export const getInvoice = (value: number) => async (dispatch: any, getState: any) => {

    dispatch(toggleInputIsFetching(true));
    dispatch(setWithdrawAmount(value));

    const withdrawAmount = getState().exchangePage.withdrawAmount;
    const withdrawPayMethod = getState().exchangePage.withdrawCurrentMethod;
    const invoicePayMethod = getState().exchangePage.invoiceCurrentMethod;

    try {
        //side-effect
        let response = await exchangeAPI.getCalculate({
            base: 'withdraw',
            amount: withdrawAmount,
            invoicePayMethod: invoicePayMethod,
            withdrawPayMethod: withdrawPayMethod
        });

        dispatch(setInvoiceAmount(response.amount));
        dispatch(setCurrentBase('withdraw'));
        dispatch(toggleInputIsFetching(false));
        dispatch(toggleIsExchangeСompleted(true));

    } catch (error) {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};

//отправляем запрос на создание заявки на обмен
export const sendExchangeRequest = () => async (dispatch: any, getState: any) => {

    dispatch(toggleButtonIsFetching(true));

    const currentBase = getState().exchangePage.currentBase;
    const invoicePayMethod = getState().exchangePage.invoiceCurrentMethod;
    const withdrawPayMethod = getState().exchangePage.withdrawCurrentMethod;

    let currentAmount: number;
    const invoiceAmount = getState().exchangePage.invoiceAmount;
    const withdrawAmount = getState().exchangePage.withdrawAmount;

    if (currentBase == 'invoice') {
        currentAmount = invoiceAmount;
    } else {
        currentAmount = withdrawAmount;
    }


    try {
        //side-effect
        let response = await exchangeAPI.sendExchangeRequest({
            amount: currentAmount,
            base: currentBase,
            invoicePayMethod: invoicePayMethod,
            withdrawPayMethod: withdrawPayMethod
        });

        dispatch(toggleButtonIsFetching(false));
        dispatch(toggleIsRequestСompleted(true));

    } catch (error) {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};

//обнуляем поля обмена при нажатии на кнопку "Home"
export const clearExchange = () => async (dispatch: any) => {
    dispatch(setInvoiceCurrentMethod(null));
    dispatch(setWithdrawCurrentMethod(null));
    dispatch(setInvoiceAmount(0));
    dispatch(setWithdrawAmount(0));
    dispatch(setCurrentBase(''));
    dispatch(toggleInputIsFetching(false));
    dispatch(toggleButtonIsFetching(false));
    dispatch(toggleIsExchangeСompleted(false));
    dispatch(toggleIsRequestСompleted(false));
};

export default exchangeReducer;