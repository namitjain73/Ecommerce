

const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name : "Iphone 14 pro",
        img : "https://m.media-amazon.com/images/I/61xJlx-3KDL._AC_UY327_FMwebp_QL65_.jpg",
        price : 121900,
        desc : "iPhone 16 Pro 256 GB: 5G Mobile Phone with Camera Control, 4K 120 fps Dolby Vision and a Huge Leap in Battery Life. Works with AirPods; White Titanium"
    },
    {
        name : "SGNICS Smart Watch",
        img : "https://m.media-amazon.com/images/I/71qimMnXNoL._AC_SY175_.jpg",
        price : 8699,
        desc : "SGNICS Smart Watch for Samsung Galaxy A15 5G Military Smart Watch for Men (Answer/Make Call)"
    },
    {
        name : "Aquaminder Smart Water Bottle",
        img : "https://m.media-amazon.com/images/I/71MXSFRW87L._AC_SY175_.jpg",
        price : 1300, 
        desc : "Aquaminder Smart Water Bottle Glows & Beeps to Remind You to Drink More 770 ml Chug Cap Bottle"
    },
    {
        name : "Iphone 14 pro Phone case",
        img : "https://m.media-amazon.com/images/I/61Qsf4nQiZL._AC_UY327_FMwebp_QL65_.jpg",
        price : 1500,
        desc : "ESR for iPhone 14 Pro Max Case, Compatible with MagSafe, Scratch-Resistant, Thin and Slim, Classic Shockproof Military-Grade Protection, TPU, Magnetic Back Cover, Clear"
    }
]


async function seedDB(){
    // yaha data ko aane me time lagega tho wait karna padega
    await Product.insertMany(products);
    console.log("data seeded succesfully");
    
}


module.exports = seedDB;