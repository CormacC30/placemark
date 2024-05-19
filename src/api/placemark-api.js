import Boom from "@hapi/boom";
import { validationError } from "./logger.js";
import { IdSpec, PlacemarkArraySpec, PlacemarkSpec, PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
export const placemarkApi = {
    find: {
        auth: { strategy: "jwt", },
        handler: async function (request, h) {
            try {
                const userId = request.auth.credentials.id;
                const placemarks = await db.placemarkStore.getUserPlacemarks(userId);
                return h.response(placemarks).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: PlacemarkArraySpec, failAction: validationError },
        description: "Get all placemarks",
        notes: "Returns all placemarks"
    },
    findOne: {
        auth: { strategy: "jwt", },
        async handler(request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (placemark === null) {
                    return Boom.notFound("No Placemark with this id");
                }
                return h.response(placemark).code(200);
            }
            catch (err) {
                return Boom.notFound("No Placemark with this id");
            }
        },
        tags: ["api"],
        description: "Find a placemark",
        notes: "Returns a placemark",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },
    create: {
        auth: { strategy: "jwt", },
        handler: async function (request, h) {
            try {
                const userId = request.auth.credentials.id;
                const placemark = request.payload;
                placemark.userid = userId; // i dunno
                const newPlacemark = (await db.placemarkStore.addPlacemark(placemark));
                if (newPlacemark !== null) {
                    return h.response(newPlacemark).code(201);
                }
                return Boom.badImplementation("error creating placemark");
            }
            catch (err) {
                return Boom.serverUnavailable("Database error");
            }
        },
        tags: ["api"],
        description: "Create a placemark",
        notes: "returns the newly created placemark",
        validate: { payload: PlacemarkSpec, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError }
    },
    deleteAll: {
        auth: { strategy: "jwt", },
        handler: async function (request, h) {
            try {
                await db.placemarkStore.deleteAllPlacemarks();
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all placemarksAPI",
    },
    deleteOne: {
        auth: { strategy: "jwt", },
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (placemark === null) {
                    return Boom.notFound("No Placemark with this id");
                }
                await db.siteStore.deleteSitesByPlacemarkId(placemark._id); // Cascading delete: removes all associated sites
                await db.placemarkStore.deletePlacemarkById(placemark._id);
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("No Placemark with this id");
            }
        },
        tags: ["api"],
        description: "Delete a placemark, and its associated sites",
        validate: { params: { id: IdSpec }, failAction: validationError }
    },
    updateImage: {
        auth: { strategy: "jwt" },
        handler: async function (request, h) {
            try {
                const { imageUrl } = request.payload;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No Placemark with this id");
                }
                placemark.img = imageUrl;
                await db.placemarkStore.updatePlacemark(placemark);
                return h.response(placemark).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database error");
            }
        },
        tags: ["api"],
        description: "Update a placemark's image",
        notes: "Updates the image of a specific placemark",
    }
};
