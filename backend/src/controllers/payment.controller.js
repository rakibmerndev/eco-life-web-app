import "dotenv/config";
import Stripe from "stripe";
import { Product } from "../models/product.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleCheckout = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided" });
    }

    const line_items = await Promise.all(
      products.map(async (item) => {
        const storedItem = await Product.findById(item.productId).lean();

        if (!storedItem) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        if (!Number.isInteger(item.quantity) || item.quantity < 1) {
          throw new Error(`Invalid quantity for product: ${item.productId}`);
        }

        return {
          price_data: {
            currency: "usd",
            product_data: { name: storedItem.name, images: [storedItem.image] },
            unit_amount: Math.round(item.discountedPrice * 100),
          },
          quantity: item.quantity,
        };
      }),
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.Client_URL}/order-success`,
      cancel_url: `${process.env.Client_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log("error in stripe", error.message);
    res.status(500).json({ error: error.message });
  }
};
