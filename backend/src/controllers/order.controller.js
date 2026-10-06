import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

export const createOrder = async (req, res) => {
  const {
    userEmail,
    products,
    totalPrice,
    orderStatus,
    paymentStatus,
    shippingAddress,
  } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const newOrder = new Order({
      userId: user._id,
      products,
      totalPrice,
      shippingAddress,
      orderStatus,
      paymentStatus,
    });

    console.log("Order object created, saving to DB...");
    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("ERROR in createOrder:", error);
    console.error("Error stack:", error.stack);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("userId")
      .populate("products.productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve order", error: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId: userId }).populate(
      "products.productId",
    );
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus, paymentStatus },
      { new: true },
    ).populate("products.productId");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update order", error: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error.message });
  }
};
