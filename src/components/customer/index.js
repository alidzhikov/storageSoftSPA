import React from 'react';
import List from '../common/List';
import { connect } from 'react-redux';
import { CUSTOMER_PAGE_LOADED, CUSTOMER_PAGE_UNLOADED } from '../../constants/actionTypes';
const mapStateToProps = state => ({
  ...state.customer,
  appName: state.common.appName,
  token: state.common.token
});
  
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: CUSTOMER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: CUSTOMER_PAGE_UNLOADED })
});

class Customer extends React.Component {

  componentWillMount() {
    //this.props.onLoad(agent.Customer.getAll());
  }
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return <List elements={this.props.customers} type="customer" />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
