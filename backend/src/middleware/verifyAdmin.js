import { User } from "../models/user.model.js";

export const verifyAdmin = async (req, res, next) => {
  const loggedUser = req.user;

  const user = await User.findOne({ email: loggedUser.email });

  if (user.role !== "admin") {
    return res.status(403).send("Unauthorized");
  }
  next();
};
