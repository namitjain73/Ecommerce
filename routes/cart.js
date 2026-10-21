const express = require('express');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express();

router.get('/user/cart' , isLoggedIn ,async (req,res)=>{
        let user = User.findById(req.user._id);
        res.render('cart/cart' , {user});
})


router.post('/user/:productId/add' , isLoggedIn ,async (req,res)=>{
        let  {id} = req.params;
        let userid =  req.user._id;
        let product = await Product.findById(id);
        let user = await User.findById(userid);
        user.cart.push(product);
        res.redirect('/user/cart');
})







module.exports  = router
