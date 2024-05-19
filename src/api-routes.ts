import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { siteApi } from "./api/site-api.js";

export const apiRoutes = [
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },
  
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET" as const, path: "/api/placemarks", config: placemarkApi.find },
  { method: "POST" as const, path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE" as const, path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  { method: "DELETE" as const, path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "GET" as const, path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  
  { method: "GET" as const, path: "/api/sites", config: siteApi.find },
  { method: "GET" as const, path: "/api/placemarks/{id}/sites", config: siteApi.findByPlacemark},
  { method: "POST" as const, path: "/api/placemarks/{id}/sites", config: siteApi.create },
  { method: "GET" as const, path: "/api/sites/{id}", config: siteApi.findOne },
  { method: "GET" as const, path: "/api/sites/user", config: siteApi.getUserSites },
  { method: "DELETE" as const, path: "/api/sites/{id}", config: siteApi.deleteOne },
  { method: "DELETE" as const, path: "/api/sites", config: siteApi.deleteAll },
];