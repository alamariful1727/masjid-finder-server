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
  name: Joi.string().trim().min(2).max(150),
  contactNo: Joi.string().trim().regex(contactNoRegex),
  address: Joi.string().trim().min(2).max(500),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
  maxDistance: Joi.number().min(1000).max(100000),
};

export const createMasjidValidation = Joi.object().keys({
  body: Joi.object().keys({
    name: schema.name.required(),
    contactNo: schema.contactNo.required(),
    address: schema.address.required(),
    latitude: schema.latitude.required(),
    longitude: schema.longitude.required(),
  }),
});

export const getAllNearByMasjidsValidation = Joi.object().keys({
  query: Joi.object().keys({
    maxDistance: schema.maxDistance.required(),
    latitude: schema.latitude.required(),
    longitude: schema.longitude.required(),
  }),
});
