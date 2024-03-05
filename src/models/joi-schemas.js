import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const SiteSpec = Joi.object()
.keys({
  title: Joi.string().required().example("Newgrange"),
  year: Joi.number().integer().required().example(3000),
  era: Joi.string().required().example("BC"),
  latitude: Joi.number().precision(6).allow("").optional().example(52.123), // left this as optional
  longitude: Joi.number().precision(6).allow("").optional().example(4.365), // again left as optional may change later
  description: Joi.string().optional().allow("").example("Ancient burial site"),
  placemarkid: IdSpec, // Joi.string().required().example("string"), //
})
.label("Site");

export const SiteSpecPlus = SiteSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("SitePlus");

export const SiteArray = Joi.array().items(SiteSpecPlus).label("SiteArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Bantry"),
    category: Joi.string().required().example("Stone Circle"),
    userid: IdSpec,
    sites: SiteArray,
  })
  .label("Playlist");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");
