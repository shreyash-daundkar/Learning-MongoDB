const mongodb = require('mongodb');
const { getDb } = require('../util/database');



class User {


  constructor(id, name, email) {

    this._id = new mongodb.ObjectId(id);
    this.name = name;
    this.email = email;
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
  
    
}


module.exports = User;
