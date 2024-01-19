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

}



module.exports = Order;
