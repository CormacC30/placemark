import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const dashboardController = {
    index: {
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        let noPlacemarks = true;
        const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
        if (placemarks.length > 0){
          noPlacemarks = false;
        }
        const viewData = {
          title: "Placemark Dashboard",
          user: loggedInUser,
          placemarks: placemarks,
          noPlacemarks: noPlacemarks
        }
        console.log(noPlacemarks);
        return h.view("dashboard-view", viewData);
      },
    },

    addPlacemark: {
      validate: {
        payload: PlacemarkSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("dashboard-view", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
        },
      },
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

    deletePlacemark: {
      handler: async function (request, h) {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        await db.placemarkStore.deletePlacemarkById(placemark._id);
        return h.redirect("/dashboard");
      },
    },


  };