
const express = require('express');
const app = express();
const seedDB = require('./seed');
const path = require('path');
const mongoose = require('mongoose');
const ejsmate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const LocalStrtegy = require('passport-local');
const User = require('./models/User');

const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/review');
const authRouters = require('./routes/auth')
const cartRouters = require('./routes/cart')


mongoose.connect('mongodb://127.0.0.1:27017/shopping-namit-app')
.then(()=>{
    console.log("DB connectred successfully");
    
})
.catch((err)=>{
    console.log("error");
    console.log(err);
    
    
})


let object = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpsOnly : true,
    expires : Date.now() + 24*7*60*60*1000,
    maxAge : 7*24*60*60*1000

  }
}

app.set('view engine' , 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsmate);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(object));
app.use(flash());

// authorisation
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// seeding database
// seedDB();

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// .auhtorisation
passport.use(new LocalStrtegy(User.authenticate()));

    // to initialize passposrt we need to use  initialize and session middlewares like plugin

// ham aab routes me products pat chale gye tho get request karega tho vo baar baar har ek incomming request par  chana chiye

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRouters);
app.use(cartRouters)



app.listen(8080 , ()=>{
    console.log("Server is connected on 8080 port");
    
})