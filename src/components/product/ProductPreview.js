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
    props.onDelete(product._id);
  };
  const productEditURL = "/editProduct/" + product._id;

  return (
    <div className="product-preview" key={product._id}>
      <p>{product.name} - {product.size} - {product.basePrice.$numberDecimal}</p>
      <Link to={productEditURL}><button className="btn btn-primary">Редактирай</button></Link>
      <button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ProductPreview);
