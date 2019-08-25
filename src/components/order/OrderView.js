import React from 'react';
import OrderProductPreview from '../order/OrderProductPreview';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state.order,
    ...state.customer
});

class OrderView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orders: props.orders,
            order: props.order,
            onChange: props.onChange,
            customers: props.customers,
            orderID: props.match ? props.match.params['orderID'] : null,
        };
        this.getOrderSum = this.getOrderSum.bind(this);
    }

    getOrderSum(order) {
        let orderSum = 0;
        order.orderProducts.forEach(oPr => orderSum += oPr.qty * oPr.price);
        return orderSum;
    }

    render(){
        let order;
        if(this.state.order){
            order = this.state.order;
        }else if(this.state.orders && this.state.orderID){
            order = this.state.orders[this.state.orders.findIndex(ord => ord._id === this.state.orderID)];
        }
        if(!order) return 'Поръчката не е намерена.'
        const products = order.orderProducts
            .map((orderProduct,i) => {
                return <OrderProductPreview orderProduct={orderProduct} notEditable={this.state.orderID != null} key={i} />
            });
        const customerIndex = this.state.customers.findIndex(cust => cust._id === order.customerID);
        const customerName = this.state.customers[customerIndex] ?
         this.state.customers[customerIndex].fName + ' ' + this.state.customers[customerIndex].lName : null;
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

export default connect(mapStateToProps, null)(OrderView);