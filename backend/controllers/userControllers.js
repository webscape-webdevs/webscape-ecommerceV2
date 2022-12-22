const UserSchema = require("../schemas/userSchema");
const CartSchema = require("../schemas/cartSchema");
const OrdersSchema = require("../schemas/orderSchema");
const createError = require("http-errors");

const userController = {
  getUserData: async (req, res, next) => {
    try {
      const cart = await CartSchema.find({ _id: req.user.id });
      const orders = await OrdersSchema.find({ _id: req.user.id });
      res.status(201).json({ cart, orders });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = userController;
