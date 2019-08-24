export default class OrderProduct {
    product;
    price;
    qty;

    constructor(
        product=null,
        price = 0,
        qty=0
    ){
        this.product = product;
        this.price = price;
        this.qty = qty;
    }
}