export default class Order{
    products;
    customerID;
    creator;
    createdAt;
    lastModified;

    constructor(
        products = [],
        customerID = null,
        creator = null,
        createdAt = new Date(),
        lastModified = null
    ){
        this.products = products;
        this.customerID = customerID;
        this.creator = creator;
        this.createdAt = createdAt;
        this.lastModified = lastModified;
    }
}