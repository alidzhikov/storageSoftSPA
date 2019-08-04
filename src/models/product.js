export default class Product {
    name;
    basePrice;
    creator;

    constructor(
        name='',
        basePrice= { $numberDecimal: 0 },
        creator=''
    ){
        this.name = name;
        this.basePrice = basePrice;
        this.creator = creator;
    }
}