import React from 'react';
import { connect } from 'react-redux';
import List from '../common/List';
import {STOCK_PAGE_IN_LOADED, STOCK_PAGE_OUT_LOADED, STOCK_PAGE_UNLOADED} from '../../constants/actionTypes';
import agent from '../../agent';
import StockroomView from './StockroomView';

const mapStateToProps = state => ({
  ...state.stockroom,
  appName: state.common.appName,
  token: state.common.token
});
  
const mapDispatchToProps = dispatch => ({
  onLoad: (inc, outc) => {
    dispatch({ type: STOCK_PAGE_IN_LOADED, payload: inc });
    dispatch({ type: STOCK_PAGE_OUT_LOADED, payload: outc });
  },
  onUnload: () =>
    dispatch({ type: STOCK_PAGE_UNLOADED })
});

class Stockroom extends React.Component {

  componentWillMount() {
    this.props.onLoad(agent.Stockroom.getAll(), agent.Stockroom.getProductsOrdered());    
  }
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return <div>
        <StockroomView stockrooms={this.props.stockrooms} orderedStockrooms={this.props.orderedStockrooms}/>
        <List elements={this.props.stockrooms} type="stockroom"/>
      </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stockroom);
