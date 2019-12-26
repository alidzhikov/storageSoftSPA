export default class Product {
    productId;
    price;
    creator;
    product;
    createdAt;
    updatedAt;
    __v;
    _id;

    constructor({
        productId = null,
        price = 0,
        creator = null,
        product = null,
        createdAt = null,
        updatedAt = null,
        __v = null,
        _id = null
    }){
        this.productId = productId;
        this.price = price;
        this.creator = creator;
        this.product = product;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.__v = __v;
        this._id = _id;
    }
}