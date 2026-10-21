const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validationProduct , isLoggedIn, isseller, isProductAuthor} = require('../middleware')
// we require products because we wnt to data and the data is in models
const router = express.Router() //mini instrance

// show all the products
router.get('/products' ,isLoggedIn ,async (req,res)=>{
    try{
        let products = await Product.find()
        // .find is mongoose method and all mongoos method give promise so we use async await 
        res.render('products/index',{products});
    }catch(e){
        res.status(500).render("error" , {err:e.message});
    }
});


// to show the form of new product
router.get('/product/new' ,isLoggedIn,isseller ,  (req,res)=>{
    res.render('products/new');
})


// to actuall add the product
router.post('/products', isLoggedIn,validationProduct,isseller ,async (req,res)=>{
    let {name,img,price,desc} = req.body;
    // this req.body gives undefined why it is because we get the data from for we wnt toadd medalwere function
    // there is a mongoosh methos create to create a new db data and we have model that is Product
    await Product.create({name,img,price,desc , author:req.user._id});
    // and every mongoose method returns promise so we use async await
    
    req.flash('success','Product added successfully');
    // then redirect the site
    res.redirect('/products');
})

// to show a perticular product
router.get('/products/:id' ,isLoggedIn ,async (req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        
    // console.log(foundProduct.reviews);
    
    res.render('products/show' , {foundProduct, msg:req.flash('msg')});
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})


// form to edit the product
router.get('/products/:id/edit' , isseller,isLoggedIn ,async (req,res)=>{
    try{
        let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit',{foundProduct})
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})



// to actually edit the data
router.patch('/products/:id'  , isLoggedIn , isseller,async (req,res)=>{
    let {id} = req.params;
    // to update the database we use update along with find id and also we delete this like find id
    // this method accepts two argument first id and send after submit this form what is see on viewport  
    // so we want to destructer it and then updayte
    let {name , img , price , desc }  = req.body;
    await Product.findByIdAndUpdate(id , {name , img , price , desc });
    // then  we riderect the route on the perticuler product
    
    req.flash('success','Product edited successfully');
    res.redirect(`/products/${id}`);
})
// to delete the peticular product
router.delete('/products/:id' , isLoggedIn, isProductAuthor,async (req,res)=>{
    let {id}= req.params;
    // so first findt the product t=and then delet all the review one by one from the array
    // this is not a ideal way  
    const product = await Product.findById(id);
    // for(let id of product.reviews){
    //     await Review.findByIdAndDelete(id);
    // }

    await Product.findByIdAndDelete(id);
    
    req.flash('success','Product deleted successfully');
    res.redirect('/products');
})


module.exports = router; 