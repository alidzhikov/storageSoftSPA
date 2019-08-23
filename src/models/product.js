export default class Product {
    name;
    basePrice;
    size;
    creator;
    createdAt;
    updatedAt;
    __v;
    _id;

    constructor({
        name = null,
        basePrice = { $numberDecimal: 0 },
        size = null,
        creator = '',
        createdAt = null,
        updatedAt = null,
        __v = null,
        _id = null
    }){
        this.name = name;
        this.basePrice = basePrice;
        this.size = size;
        this.creator = creator;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.__v = __v;
        this._id = _id;
    }
}