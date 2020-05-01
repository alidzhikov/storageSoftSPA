export default class Stockroom {
    name;
    description;
    address;//use address obj maybe
    isDefault;
    creator;
    createdAt;
    updatedAt;
    __v;
    _id;

    constructor({
        name = '',
        description = '',
        address = '',
        isDefault = false,
        creator = null,
        createdAt = null,
        updatedAt = null,
        __v = null,
        _id = null
    }){
        this.name = name;
        this.description = description;
        this.address = address;
        this.isDefault = isDefault;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creator = creator;
        this.__v = __v;
        this._id = _id;
    }
}