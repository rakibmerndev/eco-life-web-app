import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { name, email, imageUrl } = req.body;

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
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update the user

export const updateUser = async (req, res) => {
  const { email } = req.query;

  const { name, imageUrl, city, postalCode, streetAddress, phoneNumber } =
    req.body.updatedUser;

  const updatedFields = {
    name,
    imageUrl,
    city,
    postalCode,
    streetAddress,
    phoneNumber,
  };

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await User.findOneAndUpdate(
      { email },
      { $set: updatedFields },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
