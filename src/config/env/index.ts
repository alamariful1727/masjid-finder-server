import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
dotenv.config();

interface IConfig {
  NODE_ENV: string;
  PORT: number;
  MONGO_HOST: string;
}

let config: IConfig = {
  NODE_ENV: '',
  PORT: 4040,
  MONGO_HOST: '',
};

// Joi validation options
const _validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

dotenv.config({ path: `${__dirname}/../../../.env.production` });

// define validation for all the env vars
const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid(['development', 'test', 'production']).required(),
  PORT: Joi.number().valid([4040]).required(),
  MONGO_HOST: Joi.string().required(),
});

const { error, value } = envSchema.validate(process.env, _validationOptions);

if (error as Joi.ValidationError) {
  console.error({
    message: `Please fill up your .env.${config.NODE_ENV}`,
    name: error?.name,
    details: error?.details,
  });
  process.exit(1);
} else {
  config = {
    NODE_ENV: value.NODE_ENV,
    PORT: parseInt(value.PORT),
    MONGO_HOST: value.MONGO_HOST,
  };
}

export = config;
