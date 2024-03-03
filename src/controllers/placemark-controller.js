import { db } from "../models/db.js";
import { SiteSpec } from "../models/joi-schemas.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const placemarkSites = await db.siteStore.getSitesByPlacemarkId(request.params.id);
      let list = true;
      if (placemarkSites.length === 0) list = false;
      const viewData = {
        title: "Placemark",
        placemark: placemark,
        list: list,
      };
      return h.view("placemark-view", viewData);
    },
  },

  addSite: {
    validate: {
      payload: SiteSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Add Historic site error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      // const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newSite = {
        title: request.payload.title,
        year: Number(request.payload.year),
        era: request.payload.era,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        description: request.payload.description,
      };
      await db.siteStore.addSite(request.params.id, newSite);
      return h.redirect(`/placemark/${request.params.id}`);
    },
  },

  deleteSite: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.siteStore.deleteSite(request.params.siteid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};
