import Joi from 'joi';

const schema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    text: Joi.string().required(),
    v: Joi.number(),
  }),
);

export default schema;
