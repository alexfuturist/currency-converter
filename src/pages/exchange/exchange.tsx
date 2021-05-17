import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrency, getWithdraw, getInvoice, setInvoiceAmount, setInvoiceCurrentMethod, setWithdrawCurrentMethod } from 'store/exchange-reducer';
import MySelect from 'components/common/Select/MySelect';
import s from './exchange.module.scss';
import Button from 'components/common/Button/Button';
import { NavLink } from 'react-router-dom';
import Loader from 'components/common/Loader/Loader';
import { DebounceInput } from 'react-debounce-input';

const Exchange = () => {

    const dispatch = useDispatch();

    //получаем список валют с сервера
    useEffect(() => {
        dispatch(getCurrency());
    }, [])

    //формируем массивы данных для селектов
    const invoice = useSelector((state: any) => state.exchangePage.invoice);
    const withdraw = useSelector((state: any) => state.exchangePage.withdraw);

    const invoiceToSelect = invoice.map((el: any) => ({
        value: el.id,
        label: el.name
    }));

    const withdrawToSelect = withdraw.map((el: any) => ({
        value: el.id,
        label: el.name
    }));

    //определяем начальное значение для селекта "Sell"
    const invoiceCurrentMethod = useSelector((state: any) => state.exchangePage.invoiceCurrentMethod);

    let invoiceDefault;

    if (invoiceCurrentMethod == null) {
        invoiceDefault = invoiceToSelect[0];
    } else {
        let index = invoice.findIndex((el: any) => el.id === invoiceCurrentMethod);
        invoiceDefault = invoiceToSelect[index];
    }

    //определяем начальное значение для селекта "Buy"
    const withdrawCurrentMethod = useSelector((state: any) => state.exchangePage.withdrawCurrentMethod);

    let withdrawDefault;

    if (withdrawCurrentMethod == null) {
        withdrawDefault = withdrawToSelect[0];
    } else {
        let index = withdraw.findIndex((el: any) => el.id === withdrawCurrentMethod);
        withdrawDefault = withdrawToSelect[index];
    }

    //определяем текущие значения для инпутов "Sell" и "Buy"
    const invoiceAmount = useSelector((state: any) => state.exchangePage.invoiceAmount);
    const withdrawAmount = useSelector((state: any) => state.exchangePage.withdrawAmount);

    //запрашиваем расчет суммы обмена для поля ввода Buy(withdraw)
    const changeInvoiceInput = (e: any) => {
        dispatch(getWithdraw(e.target.value));
    }

    //запрашиваем расчет суммы обмена для поля ввода Sell(invoice)
    const changeWithdrawInput = (e: any) => {
        dispatch(getInvoice(e.target.value));
    }

    //Получаем текущее состояние isInputFetching
    const isInputFetching = useSelector((state: any) => state.exchangePage.isInputFetching);

    //Получаем текущее состояние isButtonFetching
    const isButtonFetching = useSelector((state: any) => state.exchangePage.isButtonFetching);

    //Получаем текущее состояние exchangeСompleted
    const isExchangeСompleted = useSelector((state: any) => state.exchangePage.isExchangeСompleted);


    return (
        <section className={s.main}>
            <h1 className="visually_hidden">Exchange page</h1>

            <div className={isButtonFetching ? classNames(s.wrapper, s.element_disabled) : s.wrapper}>
                <div className={s.methods}>
                    <fieldset className={s.method}>
                        <p className={s.method_title}>Sell</p>

                        <div className={isInputFetching && s.element_disabled}>
                            <MySelect
                                data={invoiceToSelect}
                                defaultValue={invoiceDefault}
                                setOption={setInvoiceCurrentMethod}
                            />
                        </div>

                        <div className={s.method_input_wrapper}>
                            <DebounceInput
                                className={s.method_input}
                                type="number"
                                minLength={1}
                                value={invoiceAmount}
                                debounceTimeout={1000}
                                readOnly={isInputFetching}
                                onChange={changeInvoiceInput}
                            />
                            {isInputFetching
                                ?
                                <div className={s.method_input_loader}>
                                    <Loader />
                                </div>
                                :
                                null
                            }
                        </div>
                    </fieldset>

                    <fieldset className={s.method}>
                        <p className={s.method_title}>Buy</p>

                        <div className={isInputFetching && s.element_disabled}>
                            <MySelect
                                data={withdrawToSelect}
                                defaultValue={withdrawDefault}
                                setOption={setWithdrawCurrentMethod}
                            />
                        </div>

                        <div className={s.method_input_wrapper}>
                            <DebounceInput
                                className={s.method_input}
                                type="number"
                                minLength={1}
                                value={withdrawAmount}
                                debounceTimeout={1000}
                                readOnly={isInputFetching}
                                onChange={changeWithdrawInput}
                            />
                            {isInputFetching
                                ?
                                <div className={s.method_input_loader}>
                                    <Loader />
                                </div>
                                :
                                null
                            }
                        </div>
                    </fieldset>
                </div>

                <div className={s.button_wrapper}>
                    <NavLink to="/confirmation"
                        className={(!isExchangeСompleted || isInputFetching) && s.element_disabled}
                    >
                        <Button text="Exchange" />
                    </NavLink>
                </div>
            </div>

        </section>
    )
}

export default Exchange;