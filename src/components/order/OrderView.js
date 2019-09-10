import React from 'react';
import { connect } from 'react-redux';
import OrderContent from './OrderContent';
import OrderViewPDF from './OrderViewPDF';

const mapStateToProps = state => ({
    ...state.order,
    ...state.customer
});

class OrderView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orders: props.orders,
            customers: props.customers,
            orderID: props.match ? props.match.params['orderID'] : null,
        };
    }


    rdf(order) {
        OrderViewPDF(order);
    }
    render(){
        if(!this.state.orders) return 'Поръчката не е намерена.';
        const order = this.state.orders[this.state.orders.findIndex(ord => ord._id === this.state.orderID)];
        if(!order) return 'Поръчката не е намерена.';
        const customerIndex = this.state.customers.findIndex(cust => cust._id === order.customerID);
        order.customer = this.state.customers[customerIndex];
        const rdf = this.rdf.bind(this, order);
        return (
           <div>
               <h1>Преглед на поръчка</h1>
               <OrderContent order={order}/>
               <button className="btn btn-primary" onClick={rdf}>Принтиране2</button>
           </div>
        );
    }
}

export default connect(mapStateToProps, null)(OrderView);