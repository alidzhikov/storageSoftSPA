export default class OrderProduct {
    product;
    price;
    qty;

    constructor(
        product=null,
        price = { $numberDecimal: 0 },
        qty=0
    ){
        this.product = product;
        this.price = price;
        this.qty = qty;
    }
}