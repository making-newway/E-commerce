const Category = require("../models/category-model");
const Product = require("../models/product-model");

function createList(categories, parentId = null) {
    const categoryList = [];
    let category;
    if(parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createList(categories, cat._id)
        });
    }

    return categoryList;
}

exports.data = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
            .select('_id name price quantity slug description productPictures category')
            .populate({ path: 'category', select: '_id name' })
            .exec();

    res.status(200).json({
        categories: createList(categories),
        products
    })
}

