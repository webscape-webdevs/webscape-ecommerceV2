const UserSchema = require("../schemas/userSchema");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sessionController = {
  getSession: async (req, res, next) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) {
        return res.sendStatus(401);
      }
      const refreshToken = cookies.jwt;

      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

      const user = await UserSchema.findOne({ _id: decoded.id, refreshToken: refreshToken }, { password: false, refreshToken: false }).lean();

      if (!user) {
        return res.sendStatus(403); //Forbidden
      }

      const accessToken = jwt.sign({ _id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.json({ user, accessToken });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  register: async (req, res, next) => {
    try {
      const { email, password } = req.query;

      if (!email || !password) {
        res.status(400).send("Please Add ALL Fields");
      }

      const userExists = await UserSchema.findOne({ email }).lean();

      if (userExists) {
        res.status(400).send("User Already Exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userCreated = await UserSchema.create({ email, password: hashedPassword });

      if (userCreated) {
        req.session.user = user;
        req.session.authorized = true;
        user = { _id: userCreated._id, email: email };
        res.status(201).json({ user });
      } else {
        res.status(400).send("Invalid User Data");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.query;

      if (!email || !password) {
        res.status(400).send("Please Add ALL Fields");
      }

      const user = await UserSchema.findOne({ email: email }, { refreshToken: false });

      if (user && (await bcrypt.compare(password, user.password))) {
        //Create JWT
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        //Saving refereshToken in DB
        const storeToken = await UserSchema.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken });

        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: process.env.SESSION_EXPIRE * 60 * 60 * 1000 });
        res.status(200).json({ user, accessToken });
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  logout: async (req, res, next) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) {
        return res.sendStatus(204); //No Content
      }
      const refreshToken = cookies.jwt;

      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

      await UserSchema.findOneAndUpdate({ _id: decoded.id }, { refreshToken: "" });

      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
      res.sendStatus(204);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = sessionController;
