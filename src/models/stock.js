export default class Stock {
    product;
    amount;
    sold;
    stockroom;
    creator;
    createdAt;
    updatedAt;
    __v;
    _id;

    constructor({
        product = '',
        amount = 0,
        sold = 0,
        stockroom = null,
        createdAt = null,
        updatedAt = null,
        creator = null,
        __v = null,
        _id = null
    }){
        this.product = product;
        this.amount = amount;
        this.sold = sold;
        this.stockroom = stockroom;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creator = creator;
        this.__v = __v;
        this._id = _id;
    }
}