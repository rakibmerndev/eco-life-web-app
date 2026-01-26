import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  updateProduct,
} from "../controller/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
const router = Router();

router.get("/", verifyToken, verifyAdmin, (req, res) => {
  res.send("Admin Route", req.user);
});

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductById);

export default router;
