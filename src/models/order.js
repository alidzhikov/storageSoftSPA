export default class Order{
    orderProducts;
    customerID;
    customer;
    creator;
    createdAt;
    lastModified;

    constructor(
        orderProducts = [],
        customerID = null,
        customer = null,
        creator = null,
        createdAt = new Date(),
        lastModified = null
    ){
        this.orderProducts = orderProducts;
        this.customerID = customerID;
        this.customer = customer;
        this.creator = creator;
        this.createdAt = createdAt;
        this.lastModified = lastModified;
    }
}