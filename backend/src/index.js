import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./lib/db.js";
import adminRoute from "./routes/admin.route.js"
import authRoute from "./routes/auth.route.js";
import orderRoute from "./routes/order.route.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://eco-life-web-app.vercel.app"],
    credentials: true,
  }),
);

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/auth", authRoute);
app.use('/api/admin',adminRoute)

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const startServerAsync = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to connect to database: ${error.message}`);
    process.exit(1);
  }
};

startServerAsync();
