const User = require("../models/user-models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
        .then(async user => {
            if(user)
                return res.status(400).json('Email already available');
            else {
                const username = req.body.username;
                const email = req.body.email;
                const _password = req.body.password;
                const mobile = Number(req.body.mobile);
                const address = req.body.address;

                const password = await bcrypt.hash(_password, 10);
            
                const newUser = new User({username, email, password, mobile, address});
                newUser.save()
                    .then(() => res.status(201).json(`User added`))
                    .catch((err) => res.status(500).json(`Error : ${err}`))
            }
        })
        .catch(err => res.status(500).json(`Error : ${err}`))
};

exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user && user.role == 'buyer') {
                const isPassword = user.authenticate(req.body.password);
                if(isPassword) {
                    const token = jwt.sign({ id : user._id, role: user.role }, process.env.SECRET_TOKEN, { expiresIn: "7d" });
                    const { username, email, role, mobile, address } = user;
                    return res.status(201).json(`Welcome ${username} with ${token}`);
                }
                else {
                    res.status(403).json("Invalid password");
                }
            }
            else {
                return res.status(403).json("User not Authenticated");
            }
        })
        .catch(err => res.status(500).json(`Error : ${err}`))
};
