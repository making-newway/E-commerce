const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017/E-Commerce";
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false })
    .then(console.log('Connection successfull'))
    .catch((err) => console.log(err))

const userRouter = require("./routes/user-routes");
const adminRouter = require("./routes/admin-routes");
const categoryRouter = require("./routes/category-routes");
const productRouter = require("./routes/product-routes");
const addCart = require("./routes/cart-routes");
const data = require("./routes/data-routes");

app.use("/public", express.static(path.join(__dirname, 'uploads')));
app.use("/users", userRouter);
app.use("/users/cart", addCart);
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/data", data);

app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
})