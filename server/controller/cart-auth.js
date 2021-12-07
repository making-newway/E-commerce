const Cart = require("../models/cart-model");

exports.addItemCart = (req, res) => {
    Cart.findOne({user: req.user.id})
        .then((cart) => {
            if(cart) {
                const products = req.body.items.product;
                const item = cart.items.find(c => c.product == products);
                let condition, action;
                if(item) {
                    condition = { user: req.user.id, "items.product": products }
                    action = {
                        "$set" : {
                            "items.$": {
                                ...req.body.items,
                                quantity : item.quantity + req.body.items.quantity
                            }
                        }
                    }
                }
                else {
                    condition = { user: req.user.id}
                    action = {
                        "$push" : {
                            "items": req.body.items
                        }
                    }
                }
                Cart.findOneAndUpdate(condition, action)
                    .then(() => res.status(201).json({cart}))
                    .catch((err) => res.staus(500).json(err))
                
            }
            else {
                const newCart = new Cart({
                    user : req.user.id,
                    items : [req.body.items]
                });
            
                newCart.save()
                    .then(() => res.status(201).json(newCart))
                    .catch((err) => res.status(502).json(`Error ${err}`));
            }
        })

}