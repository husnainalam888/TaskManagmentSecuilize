import Joi from "joi";

export const createPermissionValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).optional(),
});

export const updatePermissionValidation = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  description: Joi.string().max(255).optional(),
});
