import { stripe } from "../lib/stripe.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

// create stripe checkout for products
export const handleCheckout = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided" });
    }


    if (!process.env.CLIENT_URL) {
      console.error("ERROR: CLIENT_URL is not defined in environment variables");
      return res.status(500).json({
        error: "Server configuration error: CLIENT_URL not set"
      });
    }

    const user = await User.findOne({ email: req.user.email }).lean();

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const enrichedItems = await Promise.all(
      products.map(async (item) => {
        const storedItem = await Product.findById(item.productId).lean();
        if (!storedItem)
          throw new Error(`Product not found: ${item.productId}`);
        if (!Number.isInteger(item.quantity) || item.quantity < 1)
          throw new Error(`Invalid quantity for product: ${item.productId}`);
        return { storedItem, quantity: item.quantity };
      }),
    );

    const line_items = enrichedItems.map(({ storedItem, quantity }) => ({
      price_data: {
        currency: "usd",
        product_data: { name: storedItem.name, images: [storedItem.image] },
        unit_amount: Math.round(storedItem.discountedPrice * 100),
      },
      quantity,
    }));

    // calculation of total price of the products

    const totalPrice = line_items.reduce(
      (sum, item) => sum + (item.price_data.unit_amount / 100) * item.quantity,
      0,
    );

    //  creation of order for the product

    const order = new Order({
      userId: user._id,
      products: enrichedItems.map(({ storedItem, quantity }) => ({
        productId: storedItem._id,
        name: storedItem.name,
        image: storedItem.image,
        price: storedItem.discountedPrice,
        quantity: quantity,
      })),
      totalPrice,
      shippingAddress,
      orderStatus: "pending",
      paymentStatus: "pending",
    });

    await order.save();

    // creation of stripe session
    const successUrl = `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.CLIENT_URL}/cart`;

    console.log("Stripe URLs:", { successUrl, cancelUrl });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderId: order._id.toString(),
        userId: user._id.toString(),
      },
    });

    // saving stripe session id to order
    order.stripeSessionId = session.id;
    await order.save();

    res.json({ url: session.url });
  } catch (error) {
    console.log("error in stripe", error.message);
    res.status(500).json({ error: error.message });
  }
};

// check out success and update product status
export const handleCheckoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        error: `Payment not completed. Status: ${session.payment_status}`,
      });
    }

    const orderId = session.metadata.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }

    //prevention of duplicate processing
    if (order.paymentStatus === "completed") {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
        order: {
          _id: order._id,
          totalPrice: order.totalPrice,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
        },
      });
    }

    order.paymentStatus = "completed";
    order.orderStatus = "processing";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment successful",
      order: {
        _id: order._id,
        totalPrice: order.totalPrice,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    console.log("Error in handleCheckoutSuccess", error.message);
    res.status(500).json({ error: error.message });
  }
};
