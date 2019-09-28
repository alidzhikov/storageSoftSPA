import OrderProduct from "./orderProduct";

export default class Order{
    orderProducts;
    customerID;
    customer;
    paidAmount;
    creator;
    createdAt;
    lastModified;

    constructor({
        orderProducts = [],
        customerID = null,
        customer = null,
        paidAmount = 0,
        creator = null,
        lastModified = null,
        createdAt = null,
        updatedAt = null,
        __v = null,
        _id = null
    }){
        this.customerID = customerID;
        this.orderProducts = orderProducts.map(el => new OrderProduct(el));
        this.customer = customer;
        this.paidAmount = paidAmount;
        this.creator = creator;
        this.createdAt = createdAt;
        this.lastModified = lastModified;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.__v = __v;
        this._id = _id;
    }
}