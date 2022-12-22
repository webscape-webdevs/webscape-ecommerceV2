const OrderSchema = require("../schemas/orderSchema");
const createError = require("http-errors");

const orderController = {
  getOrdersAdmin: async (req, res, next) => {
    try {
      const orders = await OrderSchema.find();
      res.status(201).json({ orders });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const { orderId } = req.body;
      const deletedOrder = await OrderSchema.findOneAndDelete({ _id: orderId });
      if (deletedOrder) {
        res.status(200).json({ deletedOrder });
      } else {
        res.status(500).send("Order Not Found");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  updateOrder: async (req, res, next) => {
    try {
      const { orderId, orderStatus } = req.body;
      const updatedOrder = await OrderSchema.findOneAndUpdate({ _id: orderId }, { orderStatus: orderStatus });
      if (updatedOrder) {
        res.status(200).json({ updatedOrder });
      } else {
        res.status(500).send("Order Not Found");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getOrdersUser: async (req, res, next) => {
    try {
      const userOrders = await OrderSchema.find({ userId: req.session.user.id });
      res.status(201).json({ userOrders });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  createOrder: async (req, res, next) => {
    try {
      const { productIds, totalPrice } = req.body;
      const createdOrder = await OrderSchema.create({ userId: req.session.user.id, productIds, totalPrice });
      res.status(201).json({ createdOrder });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = orderController;
