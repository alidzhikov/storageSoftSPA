import React from 'react';
import List from '../common/List';
import { connect } from 'react-redux';
import {PRODUCT_PAGE_LOADED, PRODUCT_PAGE_UNLOADED} from '../../constants/actionTypes';
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
    //this.props.onLoad(agent.Product.getAll());
  }
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return <List elements={this.props.products} type="product"/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
