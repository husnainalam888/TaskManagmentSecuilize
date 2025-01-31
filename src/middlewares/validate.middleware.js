import Joi from 'joi';

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    return res.status(400).json({ message });
  }
  next();
};

export default validate;