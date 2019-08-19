import React from 'react';
import { Link } from "react-router-dom";
import agent from '../../agent';
import { connect } from 'react-redux';
import { ORDER_REMOVE } from '../../constants/actionTypes';

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
    props.onDelete(order._id);
  };
  const orderEditURL = "/editOrder/" + order._id;

  return (
    <div className="order-preview" key={order._id}>
      <p>{order.fName} - {order.lName}</p>
      <Link to={orderEditURL}><button className="btn btn-primary">Редактирай</button></Link>
      <button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(OrderPreview);
