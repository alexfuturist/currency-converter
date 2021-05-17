import React from 'react';

import s from './ButtonTransparent.module.scss';

const ButtonTransparent = (props) => {
    return (
        <div className={s.button} onClick={props.onClick}>{props.text}</div>
    )
}

export default ButtonTransparent;