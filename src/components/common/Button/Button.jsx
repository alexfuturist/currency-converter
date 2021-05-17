import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

import s from './Button.module.scss';

const Button = (props) => {
    //Получаем текущее состояние isButtonFetching
    const isButtonFetching = useSelector((state: any) => state.exchangePage.isButtonFetching);

    return (
        <div className={s.button} onClick={props.onClick}>
            {isButtonFetching
                ?
                <Loader />
                :
                props.text
            }
        </div>

    )
}

export default Button;