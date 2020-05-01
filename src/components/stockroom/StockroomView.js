import React from 'react';
import NumberFormat from 'react-number-format';

const StockroomView = props => {
    if (!props.stockroomrooms || !props.orderedStockrooms) return 'Грешка.. моля опитайте по-късно.';
    const stockrooms = Object.values(
        props.stockroomrooms.reduce((acc, obj) => {
            var key = obj.product._id;
            if (!acc[key]) {
                acc[key] = { product: obj.product, amount: 0 };
            }
            acc[key].amount += obj.amount;
            return acc;
        }, {}));
    const stockroomsWithSoldAmount = props.orderedStockrooms
        .map(orderedStockroom => {
            orderedStockroom.sold = orderedStockroom.amount;
            orderedStockroom.amount = 0;
            const index = stockrooms.findIndex(stockroom => stockroom.product._id === orderedStockroom.product._id);
            if (index !== -1)
                orderedStockroom.amount += stockrooms[index].amount;
            return orderedStockroom;
        })
        .map((stockroom, i) =>
            (<tr key={i}>
                <td>{stockroom.product.name}</td>
                <td><NumberFormat value={stockroom.amount} displayType={'text'} thousandSeparator=' ' suffix=' бр.'/></td>
                <td><NumberFormat value={stockroom.sold} displayType={'text'} thousandSeparator=' ' suffix=' бр.'/></td>
                <td><NumberFormat value={stockroom.amount - stockroom.sold} displayType={'text'} thousandSeparator=' ' suffix=' бр.'/></td>
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
                {stockroomsWithSoldAmount}
            </tbody>
        </table>
    );
};

export default StockroomView;