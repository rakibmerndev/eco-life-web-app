import jwt from "jsonwebtoken";

export const generateAuthToken = async (req, res) => {
  const { user } = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 5 * 24 * 60 * 60 * 1000,
  };

  res
    .cookie("authToken", token, cookieOptions)
    .json({ success: true, message: token });
};

export const clearAuthToken = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 0,
  };

  res
    .cookie("authToken", "", cookieOptions)
    .json({ success: true, message: "Logout successful" });
};
