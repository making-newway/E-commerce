const slugify = require("slugify");
const Category = require("../models/category-model");
const Product = require("../models/product-model");

exports.createProduct = (req, res) => {
    
    const { name, price, description, category, quantity } = req.body;
    var productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename };
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
    });

    product.save()
        .then(() => res.status(201).json({ product }))
        .catch(err => res.status(400).json({err}))

}

exports.findProductBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({slug: slug})
        .then(category => {
            Product.find({ category: category._id })
                .then(prod => {
                    res.status(200).json({ prod })
                })
        })
        .catch(err => res.status(400).json({ err }))
}