import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/product.controller.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductById);

export default router;
