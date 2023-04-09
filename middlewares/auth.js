import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const isAuth= async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token)

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, "prakhar2009");

  req.user = await User.findById(decoded._id);
  next();
};
