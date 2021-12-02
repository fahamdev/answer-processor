import Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.valid('development', 'production', 'test', 'provision').default(
    'development',
  ),
  PORT: Joi.number().default(3000),
});
