export default class Address {
 city;
 street;
 creator;
 createdAt;
 updatedAt;

 constructor(
    city='',
    street='',
    creator,
    createdAt,
    updatedAt,
 ){
     this.city = city;
     this.street = street;
     this.creator = creator;
     this.createdAt = createdAt;
     this.updatedAt = updatedAt;
 }
}