import Joi from 'joi';
/* eslint-disable no-underscore-dangle */
const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().required(),
});

export default schema;
