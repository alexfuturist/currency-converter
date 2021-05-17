import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { setInvoiceCurrentMethod } from 'store/exchange-reducer';

const customStyles = {

    //SELECT
    control: (provided: any, state: any) => ({
        ...provided,
        width: 313,
        height: 46,
        paddingLeft: 18,
        paddingRight: 50,

        color: '#3A3A3A',
        fontWeight: 500,
        fontSize: 18,

        border: state.isFocused ? '1px solid #58B4AE' : '1px solid #CBCBCB',
        borderRadius: 4,
        cursor: 'pointer',
        boxShadow: '0 0 0 1px transparent',

        ':hover': {
            borderColor: '#58B4AE',
        },

        ':after': {
            position: 'absolute',
            content: '" "',
            right: 20,
            top: 20,

            borderRight: '5px solid transparent',
            borderLeft: '5px solid transparent',
            borderTop: state.isFocused ? '6px solid #58B4AE' : '6px solid #3A3A3A',

            transform: state.isFocused && 'rotate(-180deg)'
        },

        ':hover:after': {
            borderTop: '6px solid #58B4AE',
        },
    }),

    valueContainer: () => ({
        paddingLeft: 0
    }),

    singleValue: (provided: any) => ({
        ...provided,
        lineHeight: 1.5,
        paddingRight: 50
    }),

    indicatorsContainer: () => ({
        display: 'none'
    }),

    //OPTION
    menu: (provided: any, state: any) => ({
        ...provided,
        marginTop: 0,

        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
        borderRadius: 4
    }),

    menuList: (provided: any, state: any) => ({
        ...provided,
        paddingTop: 8,
        paddingBottom: 8
    }),

    option: (provided: any, state: any) => ({
        ...provided,
        padding: '10px 20px',

        color: state.isSelected ? '#3A3A3A' : '#3A3A3A',
        fontWeight: 500,
        fontSize: 18,

        background: state.isSelected ? '#def1f0' : state.isFocused ? '#F4F4F4' : 'white',
    }),

}

const MySelect = (props: any) => {

    const dispatch = useDispatch();

    //записываем в state начальное значение селекта
    useEffect(() => {
        if (props.data[0]) {
            dispatch(props.setOption(props.defaultValue.value));
        }
    }, [])


    if (props.data[0]) {
        return (
            < Select
                defaultValue={props.defaultValue}
                styles={customStyles}
                isSearchable={false}
                options={props.data}
                onChange={({ value }) => {
                    dispatch(props.setOption(value));
                }}
            />
        )
    } else {
        return (
            <div style={{
                width: 313,
                height: 46,
                border: '1px solid #CBCBCB',
                borderRadius: 4
            }}></div>
        )
    }
}

export default MySelect;