import { Router } from "express";

const router = Router();

router.post('/', createUser);
router.get('/:id', getCurrentUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;