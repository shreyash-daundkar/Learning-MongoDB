const { Schema, model } = require('mongoose');


const orderSchema = new Schema({
  userId : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId : {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
}); 


module.exports = model('Order', orderSchema);