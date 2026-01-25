import { Router } from "express";
import { createUser, deleteUser, getCurrentUser } from "../controller/user.controller.js";

const router = Router();

router.post('/', createUser);
router.get('/:id', getCurrentUser);
router.delete('/:id', deleteUser);

export default router;