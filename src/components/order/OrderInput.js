import React from 'react';
import Order from '../../models/order';
import OrderProduct from '../../models/orderProduct';
import Input from '../common/Input';
import OrderContent from './OrderContent';

export default class OrderInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderID: props.match.params['orderID'],
            isEdit: props.match.url.indexOf('editOrder') > -1,
            order:  new Order(),
            type: 'order',
            formFields: [
                {
                    name: 'customerID', 
                    label: 'Клиент', 
                    placeholder: 'Избери клиент',
                    onChange: this.onCustomerSelect.bind(this)
                },
                {
                    name: 'products', 
                    label: 'Продукти', 
                    placeholder: 'Добави продукт',
                    onChange: this.onProductAddOrUpdate.bind(this)
                }
            ],
        }
        this.onCustomerSelect = this.onCustomerSelect.bind(this);
        this.addProductToOrder = this.addOrUpdateOrderProduct.bind(this);
    }
    
    onProductAddOrUpdate(product, update=false){      
        if(!product){
            console.log("asdas2222d");
            this.setState(state => state);
            return;
        }  
        const orderProduct = product instanceof OrderProduct ? product : new OrderProduct(product, product.basePrice, 1);
        this.setState(state => {
            this.addOrUpdateOrderProduct(state.order, orderProduct, update);
            return state;
        });
    }

    onProductDelete(productID){
        this.setState(state => {
            state.order.orderProducts = state.order.orderProducts.filter(opr => opr.product._id !== productID);
            return state;
        });
    }

    onCustomerSelect(customer){
        this.setState(state => {
            state.order.customer = customer;
            state.order.customerID = customer._id;
            return state;
        });
    }

    addOrUpdateOrderProduct(order, orderProduct, update){
        const productIndex = order.orderProducts.findIndex(oPr => oPr.product._id === orderProduct.product._id);
        if(productIndex > -1){
            if(update){
                order.orderProducts[productIndex] = orderProduct;
            }else{
                order.orderProducts[productIndex].qty = Number(order.orderProducts[productIndex].qty) + 1;
            }
        }else{
            order.orderProducts.push(orderProduct);
        }
    }

    render(){
        const orderID = this.state.orderID;
        const isEdit = this.state.isEdit;
        const order = this.state.order;
        const type = this.state.type;
        const formFields = this.state.formFields;
        const onProductAdd = this.onProductAddOrUpdate.bind(this);
        const onProductUpdate = this.onProductAddOrUpdate.bind(this);
        const onProductDelete = this.onProductDelete.bind(this);
        return (
            <div>
                <Input 
                    type={type} 
                    element={order} 
                    formFields={formFields} 
                    paramID={orderID} 
                    isEdit={isEdit}
                    label={ (!isEdit ? 'Създай' : 'Редактирай') + ' поръчка'} />
                <OrderContent order={order} onChange={onProductAdd} onProductUpdate={onProductUpdate} onProductDelete={onProductDelete} />
            </div>
        );
    }
}