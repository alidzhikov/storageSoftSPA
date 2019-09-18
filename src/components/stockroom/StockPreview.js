import React from 'react';
import { Link } from "react-router-dom";
import agent from '../../agent';
import { connect } from 'react-redux';
import { STOCK_REMOVE } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onDelete: id => {
    const payload = agent.Stock.delete(id);
    dispatch({ type: STOCK_REMOVE, payload });
  }
});

const StockPreview = props => {
  console.log("asdasddas");
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
    <div className="stock-preview" key={stock._id}>
      <p>{stock.product.name} - {stock.amount} бр. {stock.createdAt} </p>
      <Link to={stockEditURL}><button className="btn btn-primary">Редактирай</button></Link>
      <button className="btn btn-danger" onClick={onDeleteEv}>Изтрий</button>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(StockPreview);
