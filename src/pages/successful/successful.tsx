import Button from 'components/common/Button/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearExchange } from 'store/exchange-reducer';

import s from './successful.module.scss';

const Successful = () => {

    const dispatch = useDispatch();

    return (
        <section className={s.main}>
            <h1 className="visually_hidden">Successful page</h1>

            <div className={s.wrapper}>
                <div className={s.img}>
                    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52.6544 99.7058C54.0019 100.425 55.6931 100.421 57.0406 99.7013C93.7623 79.9746 96.3702 41.4333 96.3381 30.4746C96.3346 29.5938 96.0743 28.7332 95.5891 27.9981C95.104 27.2629 94.4149 26.6853 93.6064 26.3358L56.7106 9.99167C56.1234 9.73285 55.4887 9.59956 54.847 9.60035C54.2053 9.60113 53.5709 9.73598 52.9844 9.99625L16.3452 26.3404C15.5486 26.6901 14.8693 27.2613 14.3882 27.9862C13.9072 28.711 13.6446 29.5589 13.6318 30.4288C13.476 41.3325 15.6714 79.9563 52.6544 99.7058ZM39.7568 47.1763L50.2664 57.6858L69.9427 38.0096L76.4235 44.4904L50.2664 70.6475L33.276 53.6571L39.7568 47.1763Z" fill="#58B4AE" />
                    </svg>
                </div>

                <p className={s.title}>Success!</p>
                <p className={s.text}>
                    Your exchange order has been placed successfully and will be processed soon.
                </p>

                <div className={s.button_wrapper}>
                    <NavLink to="/exchange">
                        <Button text="Home" onClick={() => dispatch(clearExchange())} />
                    </NavLink>
                </div>

            </div>

        </section>
    )
}

export default Successful;