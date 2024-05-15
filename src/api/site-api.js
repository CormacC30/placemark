import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { SiteArray, SiteSpec, SiteSpecPlus, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
export const siteApi = {
    find: {
        auth: { strategy: "jwt" },
        handler: async function (request, h) {
            try {
                const sites = await db.siteStore.getAllSites();
                return h.response(sites).code(200);
            }
            catch (err) {
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
        handler: async function (request, h) {
            const sites = (await db.siteStore.getSitesByPlacemarkId(request.params.id));
            return h.response(sites).code(200);
        },
    },
    findOne: {
        auth: { strategy: "jwt" },
        handler: async function (request, h) {
            try {
                const site = (await db.siteStore.getSiteById(request.params.id));
                if (site === null) {
                    return Boom.notFound("No Site with this id");
                }
                return site;
            }
            catch (err) {
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
        handler: async function (request, h) {
            try {
                const placemark = (await db.placemarkStore.getPlacemarkById(request.params.id)); // maybe want to look at how placemark is retrieved
                if (placemark === null) {
                    return Boom.notFound("No Placemark with this ID");
                }
                const sitePayload = request.payload; // this is where issues might start arising
                const site = {
                    title: sitePayload.title,
                    year: sitePayload.year,
                    era: sitePayload.era,
                    latitude: sitePayload.latitude,
                    longitude: sitePayload.longitude,
                    description: sitePayload.description,
                    placemark: placemark,
                };
                const newSite = await db.siteStore.addSite(placemark._id, request.payload);
                if (newSite) {
                    return h.response(newSite).code(201);
                }
                return Boom.badImplementation("error creating site");
            }
            catch (err) {
                return Boom.serverUnavailable("Database error");
            }
        },
        tags: ["api"],
        description: "Create a site",
        notes: "Returns the newly created site",
        validate: { payload: SiteSpec },
        response: { schema: SiteSpecPlus, failAction: validationError },
    },
    deleteOne: {
        auth: { strategy: "jwt" },
        handler: async function (request, h) {
            try {
                const site = (await db.siteStore.getSiteById(request.params.id));
                if (site === null) {
                    return Boom.notFound("No site with this id");
                }
                await db.siteStore.deleteSite(request.params.id);
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("No site with this id");
            }
        },
        tags: ["api"],
        description: "Delete a site",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },
    deleteAll: {
        auth: { strategy: "jwt" },
        handler: async function (request, h) {
            console.log("delete...");
            try {
                await db.siteStore.deleteAllSites();
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all siteAPI",
    },
};
