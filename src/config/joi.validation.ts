import * as Joi from 'joi';
//validations for env variables
// TODO:check which default value env variables will take if they are not specified
// these values or app.config values
export const JoiValidationSchema = Joi.object({
  MONGO_DB: Joi.string().min(1).required(),
  PORT: Joi.number().default(3000),
  CLOUD_NAME: Joi.string().required(),
  API_KEY: Joi.string().required(),
  API_SECRET: Joi.string().required(),
});
