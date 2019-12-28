import React from 'react';
import { connect } from 'react-redux';
import List from '../common/List';
import {STOCK_PAGE_IN_LOADED, STOCK_PAGE_OUT_LOADED, STOCK_PAGE_UNLOADED} from '../../constants/actionTypes';
import agent from '../../agent';
import StockView from './StockView';

const mapStateToProps = state => ({
  ...state.stock,
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
    this.props.onLoad(agent.Stock.getAll(), agent.Stock.getProductsOrdered());    
  }
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return <div>
        <StockView stocks={this.props.stocks} orderedStocks={this.props.orderedStocks}/>
        <List elements={this.props.stocks} type="stockroom"/>
      </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stockroom);
