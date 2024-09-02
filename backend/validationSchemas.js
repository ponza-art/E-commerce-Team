import Joi from 'joi';

export const decreaseCartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});

export const addCartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});

export const addFavouriteSchema = Joi.object({
  productId: Joi.string().required()
});

export const createOrderSchema = Joi.object({
  amount: Joi.number().required(),
  order: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).required()
});

export const createProductSchema = Joi.object({
  productId: Joi.string().optional(),
  productName: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().required(),
  specifications: Joi.string().optional(),
  color: Joi.string().required(),
  weight: Joi.string().required(),
  material: Joi.string().optional(),
  gender: Joi.string().optional(),
});

export const updateProductSchema = Joi.object({
_id:Joi.optional(),
productId : Joi.optional(),
  productName: Joi.string().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  price: Joi.number().optional(),
  images: Joi.string().optional(),
  specifications: Joi.string().optional(),
  color: Joi.string().optional(),
  weight: Joi.string().optional(),
  material: Joi.string().optional(),
  gender: Joi.string().optional(),
  isAvailable: Joi.boolean().optional(),
});

export const createAdminSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export const updatePasswordSchema = Joi.object({
  userInput: Joi.string().required(),
  newPassword: Joi.string().min(8).required()
});

export const updateUserSchema = Joi.object({
  fullName: Joi.string().optional().min(10),
  email: Joi.string().email().optional(),
  phone: Joi.number().optional().min(11),
  profileImage: Joi.string().optional(),
  address: Joi.string().optional().min(10),
  pincode: Joi.number().optional()
});

export const updateProfileImageSchema = Joi.object({
  image: Joi.string().required()
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
