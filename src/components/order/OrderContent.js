import React from 'react';
import OrderProductPreview from './OrderProductPreview';

class OrderContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            order: props.order,
            // only when editable
            onChange: props.onChange,
            onProductDelete: props.onProductDelete,
        };
        this.getOrderSum = this.getOrderSum.bind(this);
    }

    getOrderSum(order) {
        let orderSum = 0;
        order.orderProducts.forEach(oPr => orderSum += oPr.qty * oPr.price);
        return orderSum;
    }

    render(){
        const order = this.state.order;
        if(!order) return 'Поръчката не е намерена.';
        const editable =!(this.state.onChange === undefined || this.state.onProductDelete === undefined);
        const products = order.orderProducts
            .map((orderProduct,i) => {
                return <OrderProductPreview orderProduct={orderProduct} 
                onDelete={this.state.onProductDelete} 
                editable={editable} 
                key={i} />
            });
        const customerName = this.state.order.customer ? this.state.order.customer.fName + ' ' + this.state.order.customer.lName : null;
        const totalSum = this.getOrderSum(order);
        return (
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
        );
    }
}

export default OrderContent;