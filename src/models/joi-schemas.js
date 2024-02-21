import Joi from "joi";

export const UserSpec = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(), // adapted from joi docs
};

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