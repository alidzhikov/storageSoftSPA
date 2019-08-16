import React from 'react';
import Customer from '../../models/customer';
import CommonInput from '../common/CommonInput';

export default function CustomerInput(props){
    const customerID = props.match.params['customerID'];
    const isEdit = props.match.url.indexOf('editCustomer') > -1;
    const customer = new Customer('test' + Date.now().toString().substr(11)+7, 'test' + Date.now().toString().substr(11)+4);
    const type = 'customer';
    const formFields = [
        {
            name: 'fName', 
            value: customer.fName, 
            label: 'Име', 
            placeholder: ''
        },
        {
            name: 'lName',
            value: customer.lName, 
            label: 'Фамилия', 
            placeholder: ''
        }
    ];
    return (
        <CommonInput 
            type={type} 
            element={customer} 
            formFields={formFields} 
            paramID={customerID} 
            isEdit={isEdit}
            label={ (!isEdit ? 'Добави' : 'Редактирай') + 'клиент'} />
     );
}