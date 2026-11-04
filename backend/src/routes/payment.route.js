import { Router } from "express";
import {
  handleCheckout,
  handleCheckoutSuccess,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-checkout-session", verifyToken, handleCheckout);
router.post("/checkout-success", verifyToken, handleCheckoutSuccess);

export default router;
