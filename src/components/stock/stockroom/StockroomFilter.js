import React from 'react';
import { Link } from 'react-router-dom';

export default class StockroomFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockrooms: props.stockrooms,
            onChangeSelectedStock: props.onChangeSelectedStock
        }
        this.changeStockroom = this.changeStockroom.bind(this);
    }

    changeStockroom(ev) {
        this.state.onChangeSelectedStock(ev.target.value);
    }
    
    render() {
        const stockroomCreateURL = <Link to='/addStockroom'><button className="btn btn-primary">Създай нов склад</button></Link>;
        if (!this.state.stockrooms) return stockroomCreateURL;
        const stockroomOptions = this.state.stockrooms.map((stockroom, i) => (<option value={stockroom._id} key={i}>{stockroom.name}</option>));
        return (
            <div>
                <select className="custom-select custom-select-sm" onChange={this.changeStockroom}>
                    {stockroomOptions}
                </select>
                {stockroomCreateURL}
            </div>
        );
    }
}