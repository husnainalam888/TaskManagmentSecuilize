import Joi from "joi";

export const assignRoleValidation = Joi.object({
  userId: Joi.number().integer().positive().required().messages({
    "number.base": "User ID must be a number",
    "number.integer": "User ID must be an integer",
    "number.positive": "User ID must be a positive number",
    "any.required": "User ID is required",
  }),

  teamId: Joi.number().integer().positive().required().messages({
    "number.base": "Team ID must be a number",
    "number.integer": "Team ID must be an integer",
    "number.positive": "Team ID must be a positive number",
    "any.required": "Team ID is required",
  }),

  roleId: Joi.number().integer().positive().required().messages({
    "number.base": "Role ID must be a number",
    "number.integer": "Role ID must be an integer",
    "number.positive": "Role ID must be a positive number",
    "any.required": "Role ID is required",
  }),
});
