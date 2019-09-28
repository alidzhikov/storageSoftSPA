import React from 'react';
import { Link } from "react-router-dom";
import agent from '../../agent';
import { connect } from 'react-redux';
import { ORDER_REMOVE } from '../../constants/actionTypes';
import Util from './util';
import { formatDate } from '../common/util';

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
  const amountSold = Util.getSoldAmount(order);
  const totalSum = Util.getOrderSum(order);
  const vatSum = Util.getVatSum(totalSum);

  let debt = Util.getDebt(vatSum, order.paidAmount);
  debt = debt > 0 ? debt : 0;
  return (
    <tr className="order-preview" key={order._id}>
      <td><Link to={orderViewURL}> {customer.fName + ' ' + customer.lName} </Link></td>
      <td>{formatDate(order.createdAt)}</td>
      <td>{amountSold} бр.</td>
      <td>{totalSum} лв.</td>
      <td>{vatSum} лв.</td>
      <td>{debt} лв.</td>
      <td><Link to={orderEditURL}><button className="btn btn-primary">Редактирай</button></Link></td>
      <td><button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button></td>
    </tr>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPreview);
