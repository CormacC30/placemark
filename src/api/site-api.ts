import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { SiteArray, SiteSpec, SiteSpecPlus, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { Placemark, Site } from "../types/placemark-types.js";

export const siteApi = {
  find: {
    auth: { strategy: "jwt" },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const sites = await db.siteStore.getAllSites();
        return h.response(sites).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    response: { schema: SiteArray, failAction: validationError },
    description: "Get all siteAPI",
    notes: "Returns details of all siteAPI",
  },

  findByPlacemark: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const sites = (await db.siteStore.getSitesByPlacemarkId(request.params.id)) as Site;
      return h.response(sites).code(200);
    },
  },

  findOne: {
    auth: { strategy: "jwt" },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const site = (await db.siteStore.getSiteById(request.params.id)) as Site;
        if (site === null) {
          return Boom.notFound("No Site with this id");
        }
        return site;
      } catch (err) {
        return Boom.serverUnavailable("No Site with this id");
      }
    },
    tags: ["api"],
    description: "Find a site",
    notes: "Returns a site",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SiteSpecPlus, failAction: validationError },
  },

  create: {
  auth: { strategy: "jwt" },
  handler: async function (request: Request, h: ResponseToolkit) {
    try {
      const placemark = (await db.placemarkStore.getPlacemarkById(request.params.id)) as Placemark;
      if (placemark === null) {
        return Boom.notFound("No Placemark with this ID");
      }
      const sitePayload = request.payload as Site;
      const site = {
        title: sitePayload.title,
        year: sitePayload.year,
        era: sitePayload.era,
        latitude: sitePayload.latitude,
        longitude: sitePayload.longitude,
        description: sitePayload.description,
        placemarkid: placemark._id,  // Ensure placemark ID is set correctly
      };
      const newSite = await db.siteStore.addSite(placemark._id, site);
      if (newSite) {
        return h.response(newSite).code(201);
      }
      return Boom.badImplementation("error creating site");
    } catch (err) {
      return Boom.serverUnavailable("Database error");
    }
  },
  tags: ["api"],
  description: "Create a site",
  notes: "Returns the newly created site",
  validate: { payload: SiteSpec },
  response: { schema: SiteSpecPlus, failAction: validationError },
},

  getUserSites: {
    auth: { strategy: "jwt" },
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const userId = request.auth.credentials.id;
        console.log("User ID: " + userId);
        const sites = await db.siteStore.getUserSites(userId);
        return h.response(sites).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all sites for a user",
    notes: "Returns all sites for the logged in user",
    response: { schema: SiteArray, failAction: "log" },
  },

  deleteOne: {
    auth: { strategy: "jwt" },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const site = (await db.siteStore.getSiteById(request.params.id)) as Site;
        if (site === null) {
          return Boom.notFound("No site with this id");
        }
        await db.siteStore.deleteSite(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No site with this id");
      }
    },
    tags: ["api"],
    description: "Delete a site",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: { strategy: "jwt" },
    handler: async function (request: Request, h: ResponseToolkit) {
      console.log("delete...");
      try {
        await db.siteStore.deleteAllSites();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all siteAPI",
  },
  
// In your site-api.ts or equivalent
updateSiteImage: {
  auth: { strategy: "jwt" },
  handler: async function (request: Request, h: ResponseToolkit) {
    try {
      const { siteId, imageUrl } = request.payload as { siteId: string; imageUrl: string };
      const site = await db.siteStore.updateSiteImage(siteId, imageUrl);
      console.log("hitting endpoint with", site.img);
      return h.response(site).code(200);
    } catch (err) {
      return Boom.serverUnavailable("Database Error");
    }
  },
  tags: ["api"],
  description: "Update site image",
  notes: "Updates the image URL of a site",
 // validate: { payload: { siteId: IdSpec, imageUrl: String } },
}

  
};
