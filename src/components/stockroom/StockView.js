import React from 'react';
import NumberFormat from 'react-number-format';

const StockView = props => {
    if (!props.stocks || !props.orderedStocks) return 'Грешка.. моля опитайте по-късно.';
    const stocks = Object.values(
        props.stocks.reduce((acc, obj) => {
            var key = obj.product._id;
            if (!acc[key]) {
                acc[key] = { product: obj.product, amount: 0 };
            }
            acc[key].amount += obj.amount;
            return acc;
        }, {}));
    const stocksWithSoldAmount = props.orderedStocks
        .map(orderedStock => {
            orderedStock.sold = orderedStock.amount;
            orderedStock.amount = 0;
            const index = stocks.findIndex(stock => stock.product._id === orderedStock.product._id);
            if (index !== -1)
                orderedStock.amount += stocks[index].amount;
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
    );
};

export default StockView;