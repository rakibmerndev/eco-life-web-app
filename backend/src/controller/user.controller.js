import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { name, email, imageUrl, role } = req.body;

  console.log("Hitting CreateUser")

  // Check if User exists on the database
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //   If user does not exist, create a new user
    const newUser = new User({
      name,
      email,
      imageUrl,
      role,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    req.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    req.status(500).json({ message: "Server Error", error: error.message });
  }
};
