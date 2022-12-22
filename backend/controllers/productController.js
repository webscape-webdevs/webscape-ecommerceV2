const ProductSchema = require("../schemas/productSchema");
const createError = require("http-errors");

const productController = {
  getProductsAdmin: async (req, res, next) => {
    try {
      const products = await ProductSchema.find();
      res.status(201).json({ products });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getProducts: async (req, res, next) => {
    try {
      const products = await ProductSchema.find();
      res.status(201).json({ products });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  createProduct: async (req, res, next) => {
    try {
      const { productTitle, productDescription, productPrice, productDiscount, productStock } = req.body;
      const productExists = await ProductSchema.findOne({ productTitle }).lean();
      if (productExists) {
        res.status(400).send("Product Already Exists");
      }
      const product = await ProductSchema.create({ productTitle, productDescription, productPrice, productDiscount, productStock });
      res.status(201).send("Product Created Successfully");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { productId } = req.body;
      const deletedProduct = await ProductSchema.findOneAndDelete({ _id: productId });
      if (deletedProduct) {
        res.status(200).json({ deletedProduct });
      } else {
        res.status(500).send("Product Not Found");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const { productId, productTitle, productDescription, productPrice, productDiscount, productStock } = req.body;
      const updatedProduct = await ProductSchema.findOneAndUpdate({ _id: productId }, { productTitle, productDescription, productPrice, productDiscount, productStock });
      if (updatedProduct) {
        res.status(200).json({ updatedProduct });
      } else {
        res.status(500).send("Product Not Found");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = productController;
