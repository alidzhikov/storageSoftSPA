import React from 'react';
import { Link } from "react-router-dom";
import agent from '../../agent';
import { connect } from 'react-redux';
import { ORDER_REMOVE } from '../../constants/actionTypes';
import Util from './util';

const mapStateToProps = state => ({
  ...state.customer,
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => {
    const payload = agent.Order.delete(id);
    dispatch({ type: ORDER_REMOVE, payload });
  }
});

const OrderPreview = props => {

  const order = props.order;
  const onDeleteEv = (ev) => { 
    ev.preventDefault(); 
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Сигурни ли сте че искате да изтриете поръчка?')) {
      props.onDelete(order._id);
    }
  };
  const orderEditURL = "/editOrder/" + order._id;
  const orderViewURL = "/orderView/" + order._id;
  const customer = props.customers.find(c => c._id === order.customerID);
  const totalSum = Util.getOrderSum(order);
  const amountSold = Util.getSoldAmount(order);

  return (
    <div className="order-preview" key={order._id}>
      <p><Link to={orderViewURL}> {customer.fName + ' ' + customer.lName} - {order.createdAt} - {amountSold} бр. - {totalSum} лв. </Link> </p>
      <Link to={orderEditURL}><button className="btn btn-primary">Редактирай</button></Link>
      <button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPreview);
