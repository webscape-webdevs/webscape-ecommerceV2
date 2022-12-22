const CartSchema = require("../schemas/cartSchema");
const createError = require("http-errors");

const cartController = {
  getUserCart: async (req, res, next) => {
    try {
      const userCart = await CartSchema.find({ userId: req.session.user.id });
      res.status(201).json({ userCart });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  addToCart: async (req, res, next) => {
    try {
      const { productId, totalPrice } = req.body;
      const cartExists = await CartSchema.find({ userId: req.session.user.id }).lean();

      if (cartExists) {
        const newProductIds = [productId, ...cartExists.productIds];
        const cart = await CartSchema.findOneAndUpdate({ userId: req.session.user.id }, { productIds: newProductIds, totalPrice: totalPrice });
        res.status(201).json({ cart });
      }

      const cart = await CartSchema.create({ userId: req.session.user.id, productIds: productIds, totalPrice });
      res.status(201).json({ cart });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  removeFromCart: async (req, res, next) => {
    try {
      const { productId, totalPrice } = req.body;

      const oldCart = await CartSchema.find({ userId: req.session.user.id }).lean(); 

      if (oldCart) {
        const newProductIds = oldCart.productIds.map(e => e !== productId);
        const cart = await CartSchema.findOneAndUpdate({ userId: req.session.user.id }, { productIds: newProductIds, totalPrice: totalPrice });
        res.status(200).json({ cart });
      } else {
        res.status(500).send("Old Cart Not Found");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = cartController;
