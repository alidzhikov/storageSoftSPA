import React from 'react';
import OrderProductPreview from './OrderProductPreview';
import Util from './util';
class OrderContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // only when editable
            onChange: props.onChange,
            onProductDelete: props.onProductDelete,
            onProductUpdate: props.onProductUpdate,
        };
    }

    render(){
        const order = this.props.order;
        if(!order) return 'Поръчката не е намерена.';
        const editable =!(this.state.onChange === undefined || this.state.onProductDelete === undefined);
        const products = order.orderProducts
            .map((orderProduct,i) => {
                return <OrderProductPreview orderProduct={orderProduct} 
                onDelete={this.state.onProductDelete} 
                onChange={this.state.onProductUpdate} 
                editable={editable} 
                key={i} />
            });
        const customerName = this.props.order.customer ? this.props.order.customer.fName + ' ' + this.props.order.customer.lName : null;
        const totalSum = Util.getOrderSum(order);
        const totalSumString = Util.roundToTwoString(totalSum);
        const vatSum = Util.getVatSum(totalSum);
        let debt = Util.getDebt(vatSum, order.paidAmount); 
        debt = debt > 0 ? (<span>- {order.paidAmount} = {debt} лв.</span>) : (<span>Платено</span>);
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
                        <td>{totalSumString}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>с ДДС: {vatSum} {debt}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default OrderContent;