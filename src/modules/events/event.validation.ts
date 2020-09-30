import * as Joi from '@hapi/joi';
import { contactNoRegex, IDRegex } from '../../utils/regex';

export const getOneJoiObjectSchema = (
  key: string,
  type: 'id' | 'string',
  required: boolean = true,
): Joi.ObjectSchema<any> => {
  let object: any = {};
  let rules: Joi.StringSchema = Joi.string().trim();

  if (type === 'id') {
    rules = rules.regex(IDRegex);
  }

  if (required) {
    object[key] = rules.required();
  }

  return Joi.object().keys(object);
};

// joi schema
const schema = {
  name: Joi.string().trim().min(2).max(32),
  contactNo: Joi.string().trim().regex(contactNoRegex),
  latitude: Joi.number().min(1),
  longitude: Joi.number().min(1),
};

export const createEventValidation = Joi.object().keys({
  body: Joi.object().keys({
    name: schema.name.required(),
    contactNo: schema.contactNo.required(),
    latitude: schema.latitude.required(),
    longitude: schema.longitude.required(),
  }),
});
