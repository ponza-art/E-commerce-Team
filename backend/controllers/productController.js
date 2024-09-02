import ProductModel from "../models/product.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import productModel from "../models/product.model.js";
dotenv.config();

// function to get all products
export const getAllProducts = async (req, res) => {
  console.log(req.query);
  try {
    const products = await ProductModel.find(req.query);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to get all categories, brands and colors for products page
export const getFilters = async (req, res) => {
  try {
    const filter = req.params.filter;
    const data = await ProductModel.distinct(filter);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFilteredProducts = async (req, res) => {
  try {
    const minPrice = req.params.min;
    const maxPrice = req.params.max;
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Number.MAX_VALUE;
    if (isNaN(min) || isNaN(max) || min > max) {
      return res.status(400).json({ error: "Invalid price range" });
    }
    const products = await ProductModel.find({
      price: { $gte: min, $lte: max },
    });
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to get 8 products for home page
export const getSomeProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({}).limit(8);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to create new product
export const createProduct = async (req, res) => {
  // extract role from header
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userRole = decoded.role;

  if (userRole !== "admin") {
    return res.status(403).json({ error: "You are unauthorized to do this" });
  }

  // get product details from body
  const {
    productId,
    productName,
    description,
    category,
    brand,
    price,
    images,
    specifications,
    color,
    weight,
    material,
    gender,
  } = req.body;

  try {
    // check if the product with same id exists
    const existingProduct = await ProductModel.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({ error: "Product with same ID exists" });
    }

    // create new product object
    const newProduct = new ProductModel({
      productId,
      productName,
      description,
      category,
      brand,
      price,
      images,
      specifications,
      color,
      weight,
      material,
      gender,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error adding product: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// function to delete a product
export const deleteProduct = async (req, res) => {
  // extract role from header
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userRole = decoded.role;

  if (userRole !== "admin") {
    return res.status(403).json({ error: "You are unauthorized to do this" });
  }

  // const productId = req.body.productId;
  const productId = req.params.productId;

  try {
    const deletedProduct = await ProductModel.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    console.error("Error deleting product: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to update availability of product


//function to get details of one product
export const getProductById = async (req, res) => {
  const id = req.params.productId;

  try {
    const selectedProduct = await ProductModel.findById(id);
    if (!selectedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(selectedProduct);
  } catch (err) {
    console.error("Error getting product details: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateProduct = async (req, res) => {
  
  const { productId } = req.params;
  const updatedProductData = req.body;

  try {
    // Using $set to update only the fields that are provided
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { productId }, // Use the correct field to match the product
      { $set: updatedProductData },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
