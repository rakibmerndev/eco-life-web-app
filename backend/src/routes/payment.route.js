import { Router } from "express";
import { handleCheckout } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-checkout-session", handleCheckout);

export default router;
