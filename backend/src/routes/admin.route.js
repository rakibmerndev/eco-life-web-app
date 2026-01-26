import { Router } from "express";
import { createProduct, deleteProductById, updateProduct } from "../controller/product.controller.js";
const router = Router();

router.get('/', (req, res) => {
    res.send('Admin Route')
})

router.post('/',createProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProductById)

export default router;