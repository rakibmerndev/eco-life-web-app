import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getCurrentUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);
router.get("/", getCurrentUser);
router.delete("/:id", deleteUserById);
router.patch("/:id", updateUser);

export default router;
