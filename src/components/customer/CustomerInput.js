import React from 'react';
import Customer from '../../models/customer';
import Input from '../common/Input';

export default function CustomerInput(props){
    const customerID = props.match.params['customerID'];
    const isEdit = props.match.url.indexOf('editCustomer') > -1;
    const customer = new Customer({fName: 'test' + Date.now().toString().substr(11)+7, lName: 'test' + Date.now().toString().substr(11)+4});
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
        },
        {
            name: 'companyName',
            value: customer.companyName, 
            label: 'Име на фирма', 
            placeholder: ''
        },
        {
            name: 'vat',
            value: customer.vat, 
            label: 'ЕИК(VAT)', 
            placeholder: ''
        },
        {
            name: 'address.city',
            value: customer.address ? customer.address.city : null, 
            label: 'Град', 
            placeholder: ''
        },
        {
            name: 'address.street',
            value: customer.address ? customer.address.street : null, 
            label: 'Улица', 
            placeholder: ''
        },
        {
            name: 'phoneNumber',
            value: customer.phoneNumber, 
            label: 'Телефон',
            placeholder: ''
        }
    ];
    return (
        <Input 
            type={type} 
            element={customer} 
            formFields={formFields} 
            paramID={customerID} 
            isEdit={isEdit}
            label={ (!isEdit ? 'Добави' : 'Редактирай') + ' клиент'} />
     );
}