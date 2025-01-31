
import Joi from "joi";


const taskValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'DONE').required(),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').required(),
});

const updateTaskValidation = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'DONE').optional(),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').optional(),
});


export { taskValidation, updateTaskValidation };