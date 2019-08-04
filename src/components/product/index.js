import React from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';
import {PRODUCT_PAGE_LOADED, PRODUCT_PAGE_UNLOADED} from '../../constants/actionTypes';
import agent from '../../agent';
const mapStateToProps = state => ({
  ...state.product,
  appName: state.common.appName,
  token: state.common.token
});
  
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: PRODUCT_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: PRODUCT_PAGE_UNLOADED })
});

class Product extends React.Component {

  componentWillMount() {
    this.props.onLoad(agent.Product.getAll());
  }
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ProductList products={this.props.products} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
