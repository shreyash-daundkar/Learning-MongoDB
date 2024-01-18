const mongodb = require('mongodb');
const { getDb } = require('../util/database');



class User {


  constructor(id, name, email, cart) {

    this._id = new mongodb.ObjectId(id);
    this.name = name;
    this.email = email;
    this.cart = cart;
  }


  async save() {
    const db = getDb();
      
    return await db.collection('users').insertOne(this);
  }


  static async findById(id) {
    const db = getDb();

    return await db.collection('users').findOne({
       _id: new mongodb.ObjectId(id) 
    });
  }


  static async saveCart(userId, updatedCart) {
    const db = getDb();

    return await db.collection('users').updateOne({ _id: userId },  { $set: { cart: updatedCart} });
  }
  
    
}


module.exports = User;
