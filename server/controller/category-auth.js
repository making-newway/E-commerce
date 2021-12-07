const slugify = require('slugify');
const Category = require("../models/category-model");

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

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.file) {
        categoryObj.categoryImages = process.env.API + 'public/' + req.file.filename;
    }

    if(req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const category = new Category(categoryObj);

    category.save()
        .then(() => res.status(201).json(category))
        .catch(err => res.status(402).json(`Error : ${err}`))
}

exports.getCategories = (req, res) => {
    setTimeout(() => {
        Category.find({})
            .then(categories => {
                const categoriesList = createList(categories);

                res.status(200).json({categoriesList});
            })
            .catch(err => res.status(501).json(`Err : ${err}`))
        }, 2000
    );
}



exports.updateCategory = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updateCategories = [];
    if(name instanceof Array) {
        for(let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            }

            if(parentId[i] !== "") {
                category.parentId = parentId[i];
            }

            const updateCat = await Category.findOneAndUpdate( { _id: _id[i] }, category, { new: true });
            updateCategories.push(updateCat);
        }
        return res.status(201).json({ updateCategories });
    }
    else {
        const category = {
            name,
            type
        }

        if(parentId !== "") {
            category.parentId = parentId;
        }

        const updateCat = await Category.findOneAndUpdate( {_id}, category, {new: true});
        return res.status(201).json({ updateCat });
    }
}