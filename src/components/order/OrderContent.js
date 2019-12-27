import React from 'react';
import OrderProductPreview from './OrderProductPreview';
import Util from './util';
import { formatDate } from '../common/util';
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

    orderTableHeaders() {
        return this.isEditable() ? 
            (
                <tr>
                    <th scope="col">Клиент</th>
                </tr>
            ) : 
            (
                <tr>
                    <th scope="col">Клиент</th>
                    <th  scope="col">Поръчано на</th>
                    <th  scope="col">Създадено на</th>
                </tr>
            );
    }

    orderTableBody() {
        const customerName = this.props.order.customer ? this.props.order.customer.fName + ' ' + this.props.order.customer.lName : null;
        return this.isEditable() ?
        (
            <tr>
                <td>{customerName}</td>
            </tr>
        ) :
        (
            <tr>
                <td>{customerName}</td>
                <td>{formatDate(this.props.order.orderedAt)}</td>
                <td>{formatDate(this.props.order.createdAt)}</td>
            </tr>
        );
    }

    isEditable() {
        return !(this.state.onChange === undefined || this.state.onProductDelete === undefined);
    }

    render(){
        const order = this.props.order;
        if(!order) return 'Поръчката не е намерена.';
        const editable = this.isEditable();
        const products = order.orderProducts
            .map((orderProduct,i) => {
                return <OrderProductPreview orderProduct={orderProduct} 
                onDelete={this.state.onProductDelete} 
                onChange={this.state.onProductUpdate} 
                editable={editable} 
                key={i} />
            });
     
        const totalSum = Util.getOrderSum(order);
        const totalSumString = Util.roundToTwoString(totalSum);
        const vatSum = Util.getVatSum(totalSum);
        let debt =  Util.roundToTwoString(Util.getDebt(vatSum, order.paidAmount)); 
        debt = debt > 0 ? (<span>- {order.paidAmount} = {debt} лв.</span>) : (<span>Платено</span>);
        const tHeads = this.orderTableHeaders();
        const tBody = this.orderTableBody();
        return (
            <table className="table">
                <thead>
                    {tHeads}
                </thead>
                <tbody>
                    {tBody}
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