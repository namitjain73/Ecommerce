const express = require('express');
const Product = require('../models/Product');
// we require products because we wnt to data and the data is in models
const router = express.Router() //mini instrance
const Review = require('../models/Review');
const {validationReview} = require('../middleware'); 

router.post('/products/:id/review', validationReview ,async (req,res)=>{
    try{
        let{id} = req.params;
        let {rating,comment} = req.body;
        let product = await Product.findById(id);
        const review = new Review({rating,comment});

        product.reviews.push(review);
        // console.log(req.body);
        await review.save();
        await product.save();
        req.flash('success','Review added successfully');
        res.redirect(`/products/${id}`);
        }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})


module.exports = router; 