import React from 'react';
import Product from '../../models/product';
import CommonInput from '../common/CommonInput';

export default function ProductInput(props){
    const productID = props.match.params['productID'];
    const isEdit = props.match.url.indexOf('editProduct') > -1;
    const product =  new Product("testProd " +  Date.now().toString().substr(11)+7, { $numberDecimal: Date.now().toString().substr(9)});
    const type = 'product';
    const formFields = [
        {
            name: 'name', 
            label: 'Име', 
            placeholder: ''
        },
        {
            name: 'basePrice.$numberDecimal', 
            label: 'Цена', 
            placeholder: ''
        }
    ];
    return (
        <CommonInput 
            type={type} 
            element={product} 
            formFields={formFields} 
            paramID={productID} 
            isEdit={isEdit}
            label={ (!isEdit ? 'Добави' : 'Редактирай') + ' продукт'} />
     );
}