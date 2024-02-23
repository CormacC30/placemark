import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
];