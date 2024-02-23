import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const siteApi = {
    find: {
        auth: false,
        handler: async function (request, h) {
            try {
                const sites = await db.siteStore.getAllSites();
                return sites;
            } catch (err) {
                return Boom.serverUnavailable("Database error");
            }
        },
      },
    
      findOne: {
        auth: false,
        handler: async function (request) {
            try {
                const site = await db.siteStore.getSiteById(request.params.id);
                if(!site){
                    return Boom.notFound("No Site with this id");
                }
                return site;
            } catch (err) {
                return Boom.serverUnavailable("No Site with this id");
            }
        },
      },
    
      create: {
        auth: false,
        handler: async function (request, h) {
          try {
            const site = request.payload;
            const newSite = await db.siteStore.addSite(request.params.id, site);
            if (newSite) {
              return h.response(newSite).code(201);
            }
            return Boom.badImplementation("error creating site");
          } catch (err) {
            return Boom.serverUnavailable("Database error");
          }
        },
      },
    
      deleteOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const site = await db.siteStore.getSiteById(request.params.id);
                if (!site){
                    return Boom.notFound("No site with this id");
                }
                await db.siteStore.deleteSite(request.params.id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No site with this id");
            }
        },
      },
    
      deleteAll: {
        auth: false,
        handler: async function (request, h) {
          try {
            await db.siteStore.deleteAllSites();
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
        },
      },
};