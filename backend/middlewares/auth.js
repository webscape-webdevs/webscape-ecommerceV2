const jwt = require("jsonwebtoken");
const User = require("../schemas/userSchema");
require("dotenv").config();

exports.isAuthenticated = async (req, res, next) => {
  let token;
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).send("Not Authorized, No token");
  }

  try {
    token = cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id: decoded.id }, { _id: true, email: true });

    next();
  } catch (error) {
    res.status(401).send("Not Authorized");
  }

  // if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
  //   try {
  //     token = req.headers.authorization.split(" ")[1];

  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //     req.user = await User.findOne({_id: decoded.id},{_id:true, email:true})

  //     next();
  //   } catch (error) {
  //     res.status(401).send("Not Authorized");
  //   }
  // }

  // if (!token) {
  //   res.status(401).send("Not Authorized, No token");
  // }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).send("Not An Admin");
  }
};
