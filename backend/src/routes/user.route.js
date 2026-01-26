import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getCurrentUser,
} from "../controller/user.controller.js";

const router = Router();

router.post("/", createUser);
router.get("/:id", getCurrentUser);
router.delete("/:id", deleteUserById);

export default router;
