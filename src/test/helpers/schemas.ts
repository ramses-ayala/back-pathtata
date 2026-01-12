import Joi from 'joi';

export const createUserResponseSchema = Joi.object({
  data: Joi.object({
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').required(),
  }),
  error: Joi.allow(null),
});

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'admin'] } }).required(),
  password: Joi.string().required()
});

export const loginUserResponseSchema = Joi.object({
  data: Joi.object({
    token: Joi.string().required(),
  }),
  error: Joi.allow(null),
});

export const authenticateUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'admin'] } }).required(),
  password: Joi.string().required()
});

export const registerUserSchema = Joi.object({
  data: Joi.object({
    id: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
  }),
  error: Joi.allow(null),
});

export const loginUserSchema = Joi.object({
  data: Joi.object({
    token: Joi.string().required(),
  }),
  error: Joi.allow(null),
});

export const errorResponseSchema = Joi.object({
  error: Joi.string().required(),
});

export const productSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const createProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
})

export const productsResponseSchema = Joi.object({
  data: Joi.array().items(productSchema),
});

export const productResponseSchema = Joi.object({
  data: productSchema,
});
