const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const errorController = require('./controllers/error');
// const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', async (req, res, next) => {
    try {
        req.user = await User.findById('0000000135a017e5c81d24b9');
        next();
    } catch (error) {
        console.error(error.stack);
    }
});

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

// app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(result => {
//     return User.findById(1);
//     // console.log(result);
//   })
//   .then(user => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com' });
//     }
//     return user;
//   })
//   .then(user => {
//     // console.log(user);
//     return user.createCart();
//   })
//   .then(cart => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_USERNAME}.kaqa2nx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {

    console.log('db');
    return User.findById('0000000135a017e5c81d24b9');
})
.then(user => {
    
    if(!user) {
        user = new User({
            _id:'0000000135a017e5c81d24b9', 
            name: 'test', 
            email:'test@test.com', 
            cart: []
        });
        user.save();
    }

    app.listen(4000);
})
.catch(err => {
    console.log(err);
});
