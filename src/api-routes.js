import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { siteApi } from "./api/site-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  
  { method: "GET", path: "/api/sites", config: siteApi.find },
  { method: "POST", path: "/api/placemarks/{id}/sites", config: siteApi.create },
  { method: "GET", path: "/api/sites/{id}", config: siteApi.findOne },
  { method: "DELETE", path: "/api/sites/{id}", config: siteApi.deleteOne },
  { method: "DELETE", path: "/api/sites", config: siteApi.deleteAll },
];