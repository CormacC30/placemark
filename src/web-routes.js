import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },
  { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/placemark/{id}", config: placemarkController.index },
  { method: "POST", path: "/placemark/{id}/addsite", config: placemarkController.addSite },
  { method: "GET", path: "/placemark/{id}/deletesite/{siteid}", config: placemarkController.deleteSite },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
// admin route
 // { method: "GET", path: "/admin", config: accountsController.admin },
  
  {
    method: "GET",
    path: "/admin",
    config: accountsController.adminDashboard
  },
  /*
  {
    method: "GET",
    path: "/admin",
    handler: async (request, h) => {
      return h.view("admin"); // Render your AdminJS UI view
    },
    options: {
      auth: "session", // Protect the route with the session authentication strategy
    },
  },

  {
    method: "DELETE",
    path: "/admin/api/resources/{resourceId}",
    handler: async (request, h) => {
      // Handle AdminJS API requests
    },
    options: {
      auth: "session", // Protect the route with the session authentication strategy
    },
  },
*/
];