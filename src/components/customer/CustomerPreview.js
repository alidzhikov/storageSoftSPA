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
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Сигурни ли сте че искате да изтриете клиент?')) {
      props.onDelete(customer._id);
    }
  };
  const customerEditURL = "/editCustomer/" + customer._id;

  return (
    <tr className="order-preview" key={customer._id}>
      <td>{customer.fName}</td>
      <td>{customer.lName}</td>
      <td>{customer.companyName}</td>
      <td>{customer.phoneNumber}</td>
      <td><Link to={customerEditURL}><button className="btn btn-primary">Редактирай</button></Link></td>
      <td><button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button></td>
    </tr>
  );
}

export default connect(() => ({}), mapDispatchToProps)(CustomerPreview);
