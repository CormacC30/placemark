import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";

export const webRoutes = [
  { method: "GET" as const, path: "/", config: accountsController.index },
  { method: "GET" as const, path: "/signup", config: accountsController.showSignup },
  { method: "GET" as const, path: "/login", config: accountsController.showLogin },
  { method: "GET" as const, path: "/logout", config: accountsController.logout },
  { method: "POST" as const, path: "/register", config: accountsController.signup },
  { method: "POST" as const, path: "/authenticate", config: accountsController.login },

  { method: "GET" as const, path: "/dashboard", config: dashboardController.index },
  { method: "POST" as const, path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },
  { method: "GET" as const, path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark },

  { method: "GET" as const, path: "/about", config: aboutController.index },

  { method: "GET" as const, path: "/placemark/{id}", config: placemarkController.index },
  { method: "POST" as const, path: "/placemark/{id}/addsite", config: placemarkController.addSite },
  { method: "GET" as const, path: "/placemark/{id}/deletesite/{siteid}", config: placemarkController.deleteSite },

  { method: "POST" as const, path: "/placemark/{id}/uploadimage", config: placemarkController.uploadImage },
  { method: "POST" as const, path: "/placemark/{id}/site/{siteid}/uploadimage", config: placemarkController.uploadSiteImage },

  {
    method: "GET" as const,
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false as const },
  },
];