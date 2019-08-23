export default class Order{
    orderProducts;
    customerID;
    creator;
    createdAt;
    lastModified;

    constructor(
        orderProducts = [],
        customerID = null,
        creator = null,
        createdAt = new Date(),
        lastModified = null
    ){
        this.orderProducts = orderProducts;
        this.customerID = customerID;
        this.creator = creator;
        this.createdAt = createdAt;
        this.lastModified = lastModified;
    }
}