import Address from "./address";

export default class Customer {
    fName;
    lName;
    companyName;
    address;
    vat;
    phoneNumber;
    prices;
    creator;
    constructor({
        fName = '',
        lName = '',
        companyName = '',
        address = new Address(),
        vat = '',
        phoneNumber = '',
        prices = [],
        creator = '',
        createdAt = null,
        updatedAt = null,
        __v = null,
        _id = null
    }){
      
        this.fName = fName;
        this.lName = lName;
        this.companyName = companyName;
        this.address = address;
        this.vat = vat;
        this.phoneNumber = phoneNumber;
        this.prices = prices;
        this.creator = creator;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.__v = __v;
        this._id = _id;
    }
}