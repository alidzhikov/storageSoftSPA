import React from 'react';

const StockView = props => {

    if (!props.stocks) return 'Грешка.. моля опитайте по-късно.';
    const stocks = Object.values(props.stocks
        .reduce((acc, obj) => {
            var key = obj.product._id;
            if (!acc[key]) {
                acc[key] = { product: obj.product, amount: 0 };
            }
            acc[key].amount += obj.amount;
            return acc;
        }, {}))
        .map((stock,i) =>
            (<tr key={i}>
                <td>{stock.product.name}</td>
                <td>{stock.amount} бр.</td>
            </tr>));

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Продукт</th>
                    <th>Наличност</th>
                </tr>
            </thead>
            <tbody>
                {stocks}
            </tbody>
        </table>
    );
}

export default StockView;