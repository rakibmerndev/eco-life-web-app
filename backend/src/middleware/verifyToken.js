import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = await req.cookies?.authToken;

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    return res.status(403).send("Invalid Token");
  }
};
