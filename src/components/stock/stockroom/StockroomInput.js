import React from 'react';
import Stockroom from '../../../models/stockroom';
import Input from '../../common/Input';
import fieldTypes from '../../../constants/fieldTypes';

export default class StockroomInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stockroomID: props.match.params['stockroomID'],
            isEdit: props.match.url.indexOf('editStockroom') > -1,
            stockroom:  new Stockroom({}),
            type: 'stockroom',
            formFields: [
                {
                    name: 'name', 
                    label: 'Име', 
                    placeholder: ''
                },
                {
                    name: 'address', 
                    label: 'Адрес', 
                    placeholder: ''
                },
                {
                    name: 'description', 
                    label: 'Описание', 
                    placeholder: ''
                },
                {
                    name: 'isDefault',
                    type: fieldTypes.CHECKBOX_FIELD,
                    label: 'Основен', 
                    placeholder: ''
                }
            ],
        }
    }

    render(){
        const stockroomID = this.state.stockroomID;
        const isEdit = this.state.isEdit;
        const stockroom = this.state.stockroom;
        const type = this.state.type;
        const formFields = this.state.formFields;
        return (
            <div>
                <Input 
                    type={type} 
                    element={stockroom} 
                    formFields={formFields} 
                    paramID={stockroomID} 
                    isEdit={isEdit}
                    label={ (!isEdit ? 'Създай' : 'Редактирай') + ' склад'} />
            </div>
        );
    }
}