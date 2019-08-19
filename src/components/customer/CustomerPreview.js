import React from 'react';
import { Link } from "react-router-dom";
import agent from '../../agent';
import { connect } from 'react-redux';
import { CUSTOMER_REMOVE } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onDelete: id => {
    const payload = agent.Customer.delete(id);
    dispatch({ type: CUSTOMER_REMOVE, payload });
  }
});

const CustomerPreview = props => {
  const customer = props.customer;
  const onDeleteEv = (ev) => { 
    ev.preventDefault(); 
    props.onDelete(customer._id);
  };
  const customerEditURL = "/editCustomer/" + customer._id;

  return (
    <div className="customer-preview" key={customer._id}>
      <p>{customer.fName} - {customer.lName}</p>
      <Link to={customerEditURL}><button className="btn btn-primary">Редактирай</button></Link>
      <button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(CustomerPreview);
