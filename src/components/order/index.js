import React from 'react';
import List from '../common/List';
import { connect } from 'react-redux';
import {ORDER_PAGE_LOADED, ORDER_PAGE_UNLOADED} from '../../constants/actionTypes';
import agent from '../../agent';
const mapStateToProps = state => ({
  ...state.order,
  appName: state.common.appName,
  token: state.common.token
});
  
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: ORDER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ORDER_PAGE_UNLOADED })
});

class Order extends React.Component {

  componentWillMount() {
    this.props.onLoad(agent.Order.getAll());
  }
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return <List elements={this.props.orders} type="order"/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
