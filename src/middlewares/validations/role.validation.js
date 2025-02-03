import Joi from "joi";

export const createRoleValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).optional(),
});

export const updateRoleValidation = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  description: Joi.string().max(255).optional(),
});
