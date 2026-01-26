import jwt from "jsonwebtoken";

export const generateAuthToken = async (req, res) => {
  const { user } = request.body;

  const authToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5d",
  });

  res
    .cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    })
    .json({ success: true });
};

export const clearAuthToken = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 0,
  };

  res.cookie("authToken", "", cookieOptions).json({ success: true });
};
