const mongodb = require('mongodb');
const { getDb } = require('../util/database');

class Product {

  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.image = imageUrl;
    this.price = price;
    this.description = description;
    this.id = id;
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

    return await db.collection('product').find({
      _id: new mongodb.ObjectId(prodId)
    }).next();
  }

}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
