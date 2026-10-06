import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, createOrder);
router.get("/:id", verifyToken, getOrderById);
router.get("/:userId", verifyToken, getOrdersByUserId);
router.put("/:id", verifyToken, updateOrderStatus);
router.delete("/:id", verifyToken, deleteOrder);

export default router;
