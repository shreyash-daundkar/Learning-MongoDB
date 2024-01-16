const mongodb = require('mongodb');
const { getDb } = require('../util/database');

class Product {

  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.image = imageUrl;
    this.price = price;
    this.description = description;
  }

  async save() {
    const db = getDb();
    return await db.collection('product').insertOne(this);
  }

  static async findAll() {
    const db = getDb();
    return await db.collection('product').find().toArray();
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
