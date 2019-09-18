export default class User {
    email;
    fName; 
    lName;
    orgName; 
    mobilePhone;
    password;
    passwordConfirm;
    
    constructor(
        email = '', 
        fName = '', 
        lName = '', 
        orgName = '', 
        mobilePhone = ''
    ){
        this.email = email;
        this.fName = fName;
        this.lName = lName;
        this.orgName = orgName;
        this.mobilePhone = mobilePhone;
    }
}