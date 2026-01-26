import { Router } from "express";
import {

  getAllProducts,
  getFeaturedProducts,
  getSingleProduct,

} from "../controller/product.controller.js";

const router = Router();


router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getSingleProduct);



export default router;
