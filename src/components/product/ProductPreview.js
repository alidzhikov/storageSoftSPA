import React from 'react';
import { Link } from "react-router-dom";
import agent from '../../agent';
import { connect } from 'react-redux';
import { PRODUCT_REMOVE } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onDelete: id => {
    const payload = agent.Product.delete(id);
    dispatch({ type: PRODUCT_REMOVE, payload });
  }
});

const ProductPreview = props => {
  const product = props.product;
  const onDeleteEv = (ev) => { 
    ev.preventDefault(); 
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Сигурни ли сте че искате да изтриете продукт?')) {
      props.onDelete(product._id);
    }
  };
  const productEditURL = "/editProduct/" + product._id;

  return (
    <tr className="order-preview" key={product._id}>
      <td>{product.name}</td>
      <td>{product.size}</td>
      <td>{product.basePrice}</td>
      <td><Link to={productEditURL}><button className="btn btn-primary">Редактирай</button></Link></td>
      <td><button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button></td>
    </tr>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ProductPreview);
