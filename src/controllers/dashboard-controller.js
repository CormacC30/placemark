import { db } from "../models/db.js";

export const dashboardController = {
    index: {
      handler: async function (request, h) {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        const viewData = {
          title: "Placemark Dashboard",
          placemarks: placemarks,
        }
        return h.view("dashboard-view", viewData);
      },
    },

    addPlacemark: {
      handler: async function (request, h) {
        const newPlacemark = {
          name: request.payload.name,
          category: request.payload.category,
        };
        await db.placemarkStore.addPlacemark(newPlacemark);
        return h.redirect("/dashboard");
      },
    },
  };