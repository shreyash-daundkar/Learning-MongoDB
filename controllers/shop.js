const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
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
  Product.findAll()
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
    const { _id, cart } = req.user;

    const products = cart.filter(prod => prodId === prod._id.toString());
    let product;
    if(products.length === 0) {

      product = await Product.findById(prodId);
      product.quantity = 1;
      cart.push(product);

    } else {
      product = products[0];
      product.quantity++;
    }
  
    await User.saveCart(_id, cart);
    res.redirect('/cart');

  } catch (error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const { _id, cart } = req.user;
    
    const updatedCart = cart.filter(prod => prodId !== prod._id.toString());
  
    await User.saveCart(_id, updatedCart);
    res.redirect('/cart');

  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = (req, res, next) => {
  try {
    const { _id, cart } = req.user;

    const order = new Order(_id, cart);
    order.save();

    User.saveCart(_id, []);

    res.redirect('/orders');
  } catch (error) {
    
  }
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
