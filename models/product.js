const mongodb = require('mongodb');
const { getDb } = require('../util/database');



class Product {


  constructor(title, imageUrl, price, description, id, userId) {
    
    this.title = title;
    this.image = imageUrl;
    this.price = price;
    this.description = description;
    this.id = id;
    this.userId = userId;
  }


  async save() {
    const db = getDb();

    if(this.id) {

      return await db.collection('product').updateOne({
        _id: new mongodb.ObjectId(this.id),
      },  { $set: this });
    }

    return await db.collection('product').insertOne(this);
  }


  static async findAll() {
    const db = getDb();

    return await db.collection('product').find().toArray();
  }


  static async findById(prodId) {
    const db = getDb();

    return await db.collection('product').findOne({
      _id: new mongodb.ObjectId(prodId)
    });
  }


  static async deleteById(prodId) {
    const db = getDb();

    return await db.collection('product').deleteOne({
      _id: new mongodb.ObjectId(prodId)
    });
  }

}



module.exports = Product;