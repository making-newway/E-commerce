const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    slug  : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    productPictures : [
        { img: { type: String } }
    ],
    description : {
        type: String,
    },
    quantity : {type: Number},
    offer : {
        tpe: Number
    },
    reviews : [
        {
            userId:  {
                type:  mongoose.Schema.Types.ObjectId, ref: "User"
            },
            review: String
        }
    ],
    category : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    createddBy : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }
})
const Product = mongoose.model('Product', productSchema);
module.exports = Product;