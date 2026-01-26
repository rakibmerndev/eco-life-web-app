import jwt from "jsonwebtoken";

export const generateAuthToken = async (req, res) => {
  const { user } = request.body;

  const authToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "4d",
  });

  res
    .cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3600000,
    })
    .send({ success: true });
};
