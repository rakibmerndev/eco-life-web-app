import { Router } from "express";
import { handleCheckout, handleCheckoutSuccess } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-checkout-session", handleCheckout);
router.post('/checkout-success', handleCheckoutSuccess)

export default router;
