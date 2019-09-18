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
            (<div key={i}>
                {stock.product.name} --> {stock.amount} бр.
            </div>));

    return (
        <div>
            <h1>Наличност</h1>
            {stocks}
            <hr/>
        </div>
    );
}

export default StockView;