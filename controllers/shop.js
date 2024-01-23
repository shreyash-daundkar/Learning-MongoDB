const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
  };
  
  exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  const products = req.user.cart;

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: products
  });
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const { cart } = req.user;

    const products = cart.filter(prod => prodId === prod._id.toString());
    if(products.length === 0) {

      const { _id } = await Product.findById(prodId);

      cart.push({
        productId: _id,
        quantity: 1,
       });

    } else products[0].quantity++;

    await req.user.save();
    res.redirect('/cart');

  } catch (error) {
    console.log(error.stack);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const { _id, cart } = req.user;
    
    const updatedCart = cart.filter(prod => prodId !== prod._id.toString());
  
    req.user.cart = updatedCart;
    await req.user.save();
    
    res.redirect('/cart');

  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const { _id, cart } = req.user;

    const order = new Order({
      userId: _id, 
      items: cart,
    });

    await order.save();

    req.user.cart = [];
    await req.user.save();

    res.redirect('/orders');
    
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const orders = await Order.findByUserId(_id);

    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
    
  } catch (error) {
    console.log(error);
  }
};
