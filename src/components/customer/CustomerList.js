import React from 'react';
import ProductPreview from './CustomerPreview';
import { Link } from "react-router-dom";

const ProductList = props => {
  if (!props.products) {
    return (
      <div className="product-preview">Loading...</div>
    );
  }

  if (props.products.length === 0) {
    return (
      <div className="product-preview">
        No product are here... yet.
        <Link to="/addProduct"><button className="btn btn-primary">Добави продукт</button></Link>
      </div>
    );
  }

  return (
    <div>
      {
        props.products.map((product) => {
          return (
            <ProductPreview product={product} key={product._id} />
          );
        })
      }
      <br/>
      <Link to="/addProduct"><button className="btn btn-primary">Добави продукт</button></Link>
    </div>
  );
};

export default ProductList;
