import { db } from "../models/db.js";

export const dashboardController = {
    index: {
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
        const viewData = {
          title: "Placemark Dashboard",
          user: loggedInUser,
          placemarks: placemarks,
        }
        return h.view("dashboard-view", viewData);
      },
    },

    addPlacemark: {
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const newPlacemark = {
          userid: loggedInUser._id,
          name: request.payload.name,
          category: request.payload.category,
        };
        await db.placemarkStore.addPlacemark(newPlacemark);
        return h.redirect("/dashboard");
      },
    },
  };