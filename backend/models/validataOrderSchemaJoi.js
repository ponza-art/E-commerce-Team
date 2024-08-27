import Joi from "joi";

const orderValidateSchema = Joi.object({
    amount: Joi.number().min(0),
    order: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required().min(1),
        price: Joi.number().required().min(0),
      })
    ).required(),
    orderDate: Joi.date().optional(),
    deliveryDate: Joi.date().optional(),
    isPaid: Joi.boolean().default(false),
    status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'canceled').default('pending'),
    // userDetails: Joi.object({
    //   fullName: Joi.string().optional(),
    //   address: Joi.string().optional(),
    //   phone: Joi.number().optional(), 
    //   email: Joi.string().email().optional(),
    //   pincode: Joi.number().optional(),
    //   userId: Joi.string().optional(),
    // }).optional()
  });
  
  export default orderValidateSchema;
  