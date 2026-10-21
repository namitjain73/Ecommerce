let express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();




router.get('/register',(req,res)=>{
    res.render('users/signUp')
})



router.post('/register',async (req,res)=>{
    let {email,password , username,role} = req.body;
    let user = new User({email,username,role});
    const newuser = await User.register(user,password);
    // res.send(newuser);
    // res.redirect('/login');
    // now we automate login

    req.logIn(newuser , function(err){
        if(err){return next(err)}

        req.flash('success','Welcome');
        return res.redirect('/products');
    })
})

// to get login form

router.get('/login' , (req,res)=>{
    res.render('users/sighIn')
})




// to get actually login 

router.post('/login' ,
    passport.authenticate('local', 
    { 
        failureRedirect: '/login', 
        failureMessage: true 
    }) ,
    (req,res) =>{
        req.flash('success' , 'welcome back')
        res.redirect('/products');
    })
// logout
// always req.logout function is workes in a callback function
router.get('/logout',(req,res)=>{
    ()=>{
        req.logOut();
        
    }
    req.flash('success' , 'you are logout')
    req.session.destroy()
    res.redirect('/login');
})








module.exports =  router;