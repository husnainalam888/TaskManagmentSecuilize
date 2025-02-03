import Joi from "joi";

const taskValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE").optional(),
  priority: Joi.string().valid("LOW", "MEDIUM", "HIGH").optional(),
  teamId: Joi.string().guid().required(),
});

const updateTaskValidation = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE").optional(),
  priority: Joi.string().valid("LOW", "MEDIUM", "HIGH").optional(),
});

const assignToUserValidation = Joi.object({
  taskId: Joi.string().guid().required(),
  userId: Joi.string().guid().required(),
});

export { taskValidation, updateTaskValidation, assignToUserValidation };
