import React from 'react';
import Order from '../../models/order';
import OrderProduct from '../../models/orderProduct';
import Input from '../common/Input';
import OrderProductPreview from '../order/OrderProductPreview';

export default class OrderInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderID: props.match.params['orderID'],
            isEdit: props.match.url.indexOf('editOrder') > -1,
            order:  new Order(),
            totalSum: 0,
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
                    onChange: this.onProductAddorUpdate.bind(this)
                }
            ],
        }
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
        this.onCustomerSelect = this.onCustomerSelect.bind(this);
        this.onProductAddorUpdate = this.onProductAddorUpdate.bind(this);
        this.addProductToOrder = this.addOrUpdateOrderProduct.bind(this);
    }
    
    onProductAddorUpdate(product, update=false){        
        const orderProduct = product instanceof OrderProduct ? product : new OrderProduct(product, product.basePrice, 1);
        this.setState(state => {
            this.addOrUpdateOrderProduct(state.order, orderProduct, update);
            state.totalSum = this.calculateTotalPrice();
            return state;
        });
    }

    onCustomerSelect(customer){
        this.setState(state => {
            state.customer = customer;
            state.order.customerID = customer._id;
            return state;
        });
    }

    calculateTotalPrice(){
        if(!this.state.order || !this.state.order.orderProducts) return 0;
        let totalSum = 0;
        this.state.order.orderProducts.forEach(oPr => totalSum += oPr.qty * oPr.price.$numberDecimal);
        return totalSum;
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
        const onProductAdd = this.onProductAddorUpdate;
        const products = order.orderProducts.map((orderProduct,i) => {
            return <OrderProductPreview orderProduct={orderProduct} onChange={onProductAdd} key={i} />
        });
        const totalSum = this.state.totalSum;
        const customerName = this.state.customer ? this.state.customer.fName + ' ' + this.state.customer.lName : null;
        return (
            <div>
                <Input 
                    type={type} 
                    element={order} 
                    formFields={formFields} 
                    paramID={orderID} 
                    isEdit={isEdit}
                    label={ (!isEdit ? 'Създай' : 'Редактирай') + ' поръчка'} />
                
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Клиент</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customerName}</td>
                        </tr>
                    </tbody>
                </table> 
                {/* a new component */}
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Продукт</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Брой</th>
                        <th scope="col">Цена 1</th>
                        <th scope="col">Цена</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products} 
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{totalSum}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}