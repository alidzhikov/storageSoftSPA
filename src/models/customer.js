export default class Customer {
    fName;
    lName;
    creator;
    constructor(
        fName = '',
        lName = '',
        creator = ''
    ){
        this.fName = fName;
        this.lName = lName;
        this.creator = creator;
    }
}