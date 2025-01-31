import Joi from "joi";

const teamValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

const addMemberValidation = Joi.object({
  userId: Joi.string().required(),
  role: Joi.string().valid('OWNER', 'ADMIN', 'MEMBER').required(),
});

export {
  teamValidation,
  addMemberValidation,

}