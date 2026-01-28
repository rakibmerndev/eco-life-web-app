import { Router } from "express";
import {
  clearAuthToken,
  generateAuthToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", generateAuthToken);

router.post("/logout", clearAuthToken);

export default router;
