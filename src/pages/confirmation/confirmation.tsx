import cn from 'classnames';
import Button from 'components/common/Button/Button';
import ButtonTransparent from 'components/common/ButtonTransparent/ButtonTransparent';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { sendExchangeRequest } from 'store/exchange-reducer';

import s from './confirmation.module.scss';

const Confirmation = () => {

    const dispatch = useDispatch();

    //определяем выбранные названия валют для "Sell" и "Buy"
    const invoiceCurrentMethodID = useSelector((state: any) => state.exchangePage.invoiceCurrentMethod);
    const withdrawCurrentMethodID = useSelector((state: any) => state.exchangePage.withdrawCurrentMethod);

    const invoiceCurrentMethodObj = useSelector((state: any) => state.exchangePage.invoice.find((obj: any) => obj.id === invoiceCurrentMethodID));
    const withdrawCurrentMethodObj = useSelector((state: any) => state.exchangePage.withdraw.find((obj: any) => obj.id === withdrawCurrentMethodID));

    let invoiceCurrentMethodName = '';
    let withdrawCurrentMethodName = '';

    if (invoiceCurrentMethodObj != undefined) {
        invoiceCurrentMethodName = invoiceCurrentMethodObj.name;
    }

    if (withdrawCurrentMethodObj != undefined) {
        withdrawCurrentMethodName = withdrawCurrentMethodObj.name;
    }

    //определяем текущие значения для "Sell" и "Buy"
    const invoiceAmount = useSelector((state: any) => state.exchangePage.invoiceAmount);
    const withdrawAmount = useSelector((state: any) => state.exchangePage.withdrawAmount);

    
    //определяем успешность создания заявки на обмен
    const isRequestСompleted = useSelector((state: any) => state.exchangePage.isRequestСompleted);

    //Получаем текущее состояние isButtonFetching
    const isButtonFetching = useSelector((state: any) => state.exchangePage.isButtonFetching);

    //клик по кнопке "Confirm"
    const onClickConfirm = () => {
        dispatch(sendExchangeRequest());
    }

    if (isRequestСompleted) {
        return <Redirect to={"/successful"} />
    }

    return (
        <section className={s.main}>
            <h1 className="visually_hidden">Confirmation page</h1>

            <div className={isButtonFetching ? cn(s.wrapper, s.element_disabled) : s.wrapper}>


                <p className={s.title}>Details</p>

                <div className={s.method}>
                    <p className={s.method_title}>Sell</p>
                    <p className={s.method_amount}>
                        <span>{invoiceAmount}</span>
                        &nbsp;
                        <span>{invoiceCurrentMethodName}</span>
                    </p>
                </div>

                <div className={s.method}>
                    <p className={s.method_title}>Buy</p>
                    <p className={s.method_amount}>
                        <span>{withdrawAmount}</span>
                        &nbsp;
                        <span>{withdrawCurrentMethodName}</span>
                    </p>
                </div>

                <div className={s.buttons_wrapper}>
                    <NavLink to="/exchange" className={s.button_left}>
                        <ButtonTransparent text="Cancel" />
                    </NavLink>

                    <div onClick={onClickConfirm}>
                        <Button text="Confirm" />
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Confirmation;