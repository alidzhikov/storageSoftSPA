import React from 'react';
import Order from '../../models/order';
import Input from '../common/Input';

export default function OrderInput(props){
    const orderID = props.match.params['orderID'];
    const isEdit = props.match.url.indexOf('editOrder') > -1;
    const order =  new Order();
    const type = 'order';
    const formFields = [
        {
            name: 'customerID', 
            label: 'Клиент', 
            placeholder: 'Избери клиент'
        },
        // {
        //     name: 'basePrice.$numberDecimal', 
        //     label: 'Цена', 
        //     placeholder: ''
        // }
    ];
    return (
        <Input 
            type={type} 
            element={order} 
            formFields={formFields} 
            paramID={orderID} 
            isEdit={isEdit}
            label={ (!isEdit ? 'Добави' : 'Редактирай') + ' продукт'} />
     );
}