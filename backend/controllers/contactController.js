import responseModel from "../models/response.model.js";

export const saveResponse = async (req, res) => {
  const { email, phone, fullName, message } = req.body;

  try {
    const dateAdded = new Date();

    const newResponse = new responseModel({
      email,
      phone,
      fullName,
      message,
      dateAdded,
    });

    await newResponse.save();
    res.status(201).json({ message: "Response added" });
    
  } catch (error) {
    console.error("Error adding response: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
