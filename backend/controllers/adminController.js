const UserSchema = require("../schemas/userSchema");
const createError = require("http-errors");

const adminController = {
  getUsers: async (req, res, next) => {
    try {
      const users = await UserSchema.find();
      res.status(201).json({ users });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = adminController;
