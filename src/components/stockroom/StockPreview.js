import React from 'react';
import { Link } from "react-router-dom";
import agent from '../../agent';
import { connect } from 'react-redux';
import { STOCK_REMOVE } from '../../constants/actionTypes';
import { formatDate } from '../common/util';

const mapDispatchToProps = dispatch => ({
  onDelete: id => {
    const payload = agent.Stock.delete(id);
    dispatch({ type: STOCK_REMOVE, payload });
  }
});

const StockPreview = props => {
  const stock = props.stock;
  const onDeleteEv = (ev) => { 
    ev.preventDefault(); 
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Сигурни ли сте че искате да изтриете складов регистър?')) {
      props.onDelete(stock._id);
    }
  };
  const stockEditURL = "/editStock/" + stock._id;

  return (
    <tr className="order-preview" key={stock._id}>
      <td>{stock.product.name}</td>
      <td>{stock.amount} бр.</td>
      <td>{formatDate(stock.createdAt)}</td>
      <td><Link to={stockEditURL}><button className="btn btn-primary">Редактирай</button></Link></td>
      <td><button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button></td>
    </tr>
  );
}

export default connect(() => ({}), mapDispatchToProps)(StockPreview);
