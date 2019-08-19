export default class Customer {
    fName;
    lName;
    prices;
    creator;
    constructor(
        fName = '',
        lName = '',
        prices = [],
        creator = ''
    ){
        this.fName = fName;
        this.lName = lName;
        this.prices = prices;
        this.creator = creator;
    }
}