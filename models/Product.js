const mongoose = require('mongoose');
const Review = require('./Review');
const productschema = new mongoose.Schema({
    name: {
        type : String,
        trim:true,
        required:true

    },

    img : {
        type :String,
        trim : true
    },

    price: {
        type : Number,
        min : 0,
        required : true
    },

    desc : {
        type : String,
        trim : true
    },
    reviews:[
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref:  'Review'  
        }
    ],

    author:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:  'User' 

    }
})

// middaleware jo bts  mongosh operation karvane par use hote hai and isske andar pre ans post 
// middleware hote hai which is basically use over the schema and before model  it js class

productschema.post('findOneAndDelete',async function(product){
    if(product.reviews.length > 0){
       await Review.deleteMany({_id:{$in:product.reviews} })
    }
})



let Product = mongoose.model('Product',productschema);


module.exports = Product;