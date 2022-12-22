const express = require("express");
const app = express();
const session = require("express-session"); //For Express Session
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("./schemas/userSchema");
require("./schemas/orderSchema");
require("./schemas/productSchema");
require("./schemas/cartSchema");

//middleware for cookies
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

//-----For Express Session Only START-----

// let options = {
//   secret: process.env.SECRET, //sid.signature
//   name: "sessionId",
//   cookie: {
//     maxAge: process.env.SESSION_EXPIRE * 60 * 60 * 1000,
//     sameSite: "None",
//   },
//   resave: false,
//   saveUninitialized: true,
// };

// if (process.env.NODE_ENV === "PRODUCTION") {
//   app.set("trust proxy", 1); // trust first proxy
//   options.cookie.secure = true; // serve secure cookies
// }

// app.use(session(options));

//-----For Express Session Only ENDS-----

//Routes Section Start------------------------

const sessionRoutes = require("./routes/sessionRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use("/api/session", sessionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);

//Routes Section End--------------------------

module.exports = app;
