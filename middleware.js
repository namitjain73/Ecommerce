const Product = require('./models/Product');
let {productschema,reviewschema} = require('./schema');

const validationProduct = (req,res,next)=>{
    let {name,img,price,desc} = req.body;
    const {error} = productschema.validate({name,img,price,desc})
    if(error){
        return res.render('error',{err:error});
    }
    next();
    
}

const validationReview = (req,res,next)=>{
    let {rating,comment} = req.body;
    const {error} = reviewschema.validate({rating,comment})
    if(error){
        return res.render('error',{err:error});
    }
    next();
}


const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','Please login first')
        return res.redirect('login');
    }
    next();
}


const isseller= (req,res,next)=>{
    if(!req.user.role){
        req.flash('error' , "you don't have the access");
        return res.redirect('/products')

    }else if(req.user.role != 'seller'){
        req.flash('error' , "you don't have the access");
        return res.redirect('/products')

    }

    next();
}



const isProductAuthor = async (req,res,next)=>{
    let {id} = req.params;
    let product =await Product.findById(id);
    if(!product.author.equals(req.user._id)){
        req.flash('error' , "you can't delete this");
        return res.redirect('/products');
    }
    next();


}

module.exports = {validationProduct,validationReview , isLoggedIn,isseller , isProductAuthor};