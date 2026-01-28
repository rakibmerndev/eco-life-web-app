import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, verifyAdmin, (req, res) => {
  res.send("Admin Route", req.user);
});

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductById);

export default router;
