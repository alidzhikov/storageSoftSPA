export default class OrderProduct {
    product;
    price;
    qty;
    stockroom;

    constructor({
        product = null,
        price = 0,
        qty = 0,
        stockroom = null
    }) {
        this.product = product;
        this.price = price;
        this.qty = qty;
        this.stockroom = stockroom;
    }
}