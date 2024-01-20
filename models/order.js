const mongodb = require('mongodb');
const { getDb } = require('../util/database');



class Order {


  constructor(userId, cart) {

    this.userId = new mongodb.ObjectId(userId);
    this.items = cart;
    this.date = new Date();
  }


  async save() {
    const db = getDb();
      
    return await db.collection('orders').insertOne(this);
  }


  static async findByUserId(id) {
    const db = getDb();

    return await db.collection('orders').find({
       userId: new mongodb.ObjectId(id) 
    }).toArray();
  }

}



module.exports = Order;
