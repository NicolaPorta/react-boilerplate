import Joi from 'joi';
/* eslint-disable no-underscore-dangle */
const schema = Joi.array().items(
  Joi.object({
    _id: Joi.string().required(),
    text: Joi.string().required(),
    __v: Joi.number(),
  }),
);

export default schema;
