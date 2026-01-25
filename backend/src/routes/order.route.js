import { Router } from "express";
import { createOrder, deleteOrder, getOrderById, getOrdersByUserId, updateOrderStatus } from "../controller/order.controller.js";

const router = Router()

router.post('/', createOrder);
router.get('/:id', getOrderById);
router.get('/:userId', getOrdersByUserId);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;