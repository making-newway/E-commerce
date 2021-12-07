const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer'
    },
    mobile : {
        type: Number,
        required: true
    },
    address  : {
        type: String,
        required: true
    }
});

userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.password);
    },
  };

const User = mongoose.model('User', userSchema)
module.exports = User;