import React from 'react';
import NumberFormat from 'react-number-format';
import StockroomFilter from './stockroom/StockroomFilter';

export default class StockView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: Object.values(
                props.stocks.reduce((acc, obj) => {
                    var key = obj.product._id;
                    if (!acc[key]) {
                        acc[key] = { product: obj.product, amount: 0, stockroom: obj.stockroom };
                    }
                    acc[key].amount += obj.amount;
                    return acc;
                }, {})),
            orderedStocks: props.orderedStocks,
            stockrooms: props.stockrooms,
            selectedStockroom: null
        };
        this.onChangeSelectedStock = this.onChangeSelectedStock.bind(this);
    }
  
    onChangeSelectedStock(newStockroom) {
        this.setState({selectedStockroom: newStockroom}); 
    }
    
    render() {
        if (!this.state.stocks || !this.state.orderedStocks) return 'Грешка.. моля опитайте по-късно.';
        const stocksWithSoldAmount = this.state.orderedStocks
            .map(orderedStock => {
                orderedStock.sold = orderedStock.amount;
                orderedStock.amount = 0;
                const index = this.state.stocks.findIndex(stock => 
                    stock.product._id === orderedStock.product._id 
                );
                if (index !== -1)
                    orderedStock.amount += this.state.stocks[index].amount;
                return orderedStock;
            })
            .map((stock, i) =>
                (<tr key={i}>
                    <td>{stock.product.name}</td>
                    <td><NumberFormat value={stock.amount} displayType={'text'} thousandSeparator=' ' suffix=' бр.'/></td>
                    <td><NumberFormat value={stock.sold} displayType={'text'} thousandSeparator=' ' suffix=' бр.'/></td>
                    <td><NumberFormat value={stock.amount - stock.sold} displayType={'text'} thousandSeparator=' ' suffix=' бр.'/></td>
                </tr>));

        return (
            <div>
            <StockroomFilter stockrooms={this.state.stockrooms} onChangeSelectedStock={this.onChangeSelectedStock} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Продукт</th>
                        <th>Наличност</th>
                        <th>Продадено</th>
                        <th>Баланс</th>
                    </tr>
                </thead>
                <tbody>
                    {stocksWithSoldAmount}
                </tbody>
            </table>
        </div>
        );
    }
}

