import React from 'react';
import Stock from '../../models/stock';
import Input from '../common/Input';
import fieldTypes from '../../constants/fieldTypes';

export default class OrderInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stockID: props.match.params['stockID'],
            isEdit: props.match.url.indexOf('editStock') > -1,
            stock:  new Stock({}),
            type: 'stock',
            formFields: [
                {
                    name: 'products',
                    type: fieldTypes.PRODUCT_FIELD,
                    label: 'Продукт', 
                    placeholder: 'Избери продукт',
                    onChange: this.onProductSelect.bind(this)
                },
                {
                    name: 'amount', 
                    label: 'Количество', 
                    placeholder: ''
                },
                {
                    name: 'stockroom',
                    type: fieldTypes.STOCKROOM_FIELD,
                    label: 'Склад', 
                    placeholder: '',
                    onChange: this.onStocroomSelect.bind(this)
                }
            ],
        }
    }

    onProductSelect(product) {
        this.setState(state => {
            state.stock.product = product._id;
            return state;
        });
    }

    onStocroomSelect(stockroom) {
        this.setState(state => {
            state.stock.stockroom = stockroom._id;
            return state;
        });
    }


    render() {
        const formFields = this.state.formFields;
        const stockID = this.state.stockID;
        const isEdit = this.state.isEdit;
        const stock = this.state.stock;
        const type = this.state.type;
        return (
            <div>
                <Input 
                    type={type} 
                    element={stock} 
                    formFields={formFields} 
                    paramID={stockID} 
                    isEdit={isEdit}
                    label={(!isEdit ? 'Регистрирай' : 'Редактирай') + ' складова наличност'} />
            </div>
        );
    }
}