import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();




// function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to create a new user
export const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // check if the user has already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user object
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    // save the user to db
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating the user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }

  // generate a token for user and send it
};

// function to login the user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check the if their a user with email
    const requestedUser = await UserModel.findOne({ email });
    // console.log(requestedUser);

    if (!requestedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // check if the password is correct
    const passwordMatch = await bcrypt.compare(
      password,
      requestedUser.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const role =
      requestedUser.email === process.env.ADMIN_EMAIL ? "admin" : "user";

    // Generate JWT token
    const token = jwt.sign(
      { id: requestedUser._id, role },
      process.env.SECRET_KEY
    );

    // to send user image
    const userImage = requestedUser.profileImage;

    // send the user data except password and token to clint
    res.status(200).json({ userImage, token, role });
  } catch (err) {
    console.error("Error finding user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to get user profile data
export const getProfileData = async (req, res) => {
  // extract id from header
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// function to update user profile image
export const updateProfileImage = async (req, res) => {
  const userImage = req.body.image;
  // extract id from header
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;

  try {
    const updatedUserData = await UserModel.findByIdAndUpdate(
      userId,
      { profileImage: userImage },
      { new: true }
    );
    if (!updatedUserData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(500).json({ message: "Server error" + err });
  }
};

// function to update user details
export const updateUser = async (req, res) => {
  const updates = req.body;

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to update password
export const updatePassword = async (req, res) => {
  // get the user input and new password from the body
  const { userInput, newPassword } = req.body;

  // separate the id from token
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;

  try {
    // find the user details with the id
    const requestedUser = await UserModel.findById(userId);
    // compare the user input with the current password
    const passwordMatch = await bcrypt.compare(
      userInput,
      requestedUser.password
    );

    // if not not same return error as current password is not correct
    if (!passwordMatch) {
      return res.status(401).json({ error: "Current password is wrong" });
    }
    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update the database with the new password return the user data
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred", details: error.message });
  }
};