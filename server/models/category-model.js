const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String
    },
    categoryImages: {
        type: String
    },
    parentId: {
        type: String
    }
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;