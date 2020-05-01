import React from 'react';
import { connect } from 'react-redux';
import List from '../common/List';
import { STOCK_PAGE_UNLOADED } from '../../constants/actionTypes';
import agent from '../../agent';
import StockView from './StockView';

const mapStateToProps = state => ({
  ...state.stock,
  appName: state.common.appName,
  token: state.common.token
});
  
const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: STOCK_PAGE_UNLOADED })
});

class Stock extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedStock: null
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  
  render() {
    const orderedStocks = this.props.orderedStocks ? this.props.orderedStocks.filter(orderedStock => orderedStock ) : [];//{orderedStock.stockroomId === this.state.selectedStock._id}
    return <div>
        <StockView stocks={this.props.stocks} orderedStocks={orderedStocks} stockrooms={this.props.stockrooms} selectedStockroom={null} />
        <List elements={this.props.stocks} type="stock"/>
      </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
