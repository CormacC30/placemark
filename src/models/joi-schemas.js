import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object() 
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).example("secret").required(), // pattern adapted from joi docs
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  };
  
  export const SiteSpec = {
    title: Joi.string().required(),
    year: Joi.number().integer().required(),
    era: Joi.string().required(),
    latitude: Joi.number().optional().precision(6), // left this as optional
    longitude: Joi.number().optional().precision(6), // again left as optional may change later
    description: Joi.string().optional(),
};
  
  export const PlacemarkSpec = {
    name: Joi.string().required(),
    category: Joi.string().required(),
  };