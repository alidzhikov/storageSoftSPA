import React from 'react';
import Product from '../../models/product';
import Input from '../common/Input';

export default function ProductInput(props){
    const productID = props.match.params['productID'];
    const isEdit = props.match.url.indexOf('editProduct') > -1;
    const product =  new Product({name: "testProd " +  Date.now().toString().substr(11)+7, basePrice: { $numberDecimal: Date.now().toString().substr(9)}});
    const type = 'product';
    const formFields = [
        {
            name: 'name', 
            label: 'Име', 
            placeholder: ''
        },
        {
            name: 'basePrice', 
            label: 'Цена', 
            placeholder: ''
        },
        {
            name: 'size', 
            label: 'Размер', 
            placeholder: 'Размер на продукт',
        }
    ];
    return (
        <Input 
            type={type} 
            element={product} 
            formFields={formFields} 
            paramID={productID} 
            isEdit={isEdit}
            label={ (!isEdit ? 'Добави' : 'Редактирай') + ' продукт'} />
     );
}