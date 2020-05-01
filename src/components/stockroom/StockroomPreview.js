import React from 'react';
import { Link } from "react-router-dom";
import agent from '../../agent';
import { connect } from 'react-redux';
import { STOCK_REMOVE } from '../../constants/actionTypes';
import { formatDate } from '../common/util';

const mapDispatchToProps = dispatch => ({
  onDelete: id => {
    const payload = agent.Stockroom.delete(id);
    dispatch({ type: STOCK_REMOVE, payload });
  }
});

const StockroomPreview = props => {
  const stockroom = props.stockroom;
  const onDeleteEv = (ev) => { 
    ev.preventDefault(); 
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Сигурни ли сте че искате да изтриете складов регистър?')) {
      props.onDelete(stockroom._id);
    }
  };
  const stockroomEditURL = "/editStockroom/" + stockroom._id;

  return (
    <tr className="order-preview" key={stockroom._id}>
      <td>{stockroom.product.name}</td>
      <td>{stockroom.amount} бр.</td>
      <td>{formatDate(stockroom.createdAt)}</td>
      <td><Link to={stockroomEditURL}><button className="btn btn-primary">Редактирай</button></Link></td>
      <td><button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button></td>
    </tr>
  );
}

export default connect(() => ({}), mapDispatchToProps)(StockroomPreview);
