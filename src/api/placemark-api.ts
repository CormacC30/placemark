import Boom from "@hapi/boom";
import { validationError } from "./logger.js";
import { IdSpec, PlacemarkArraySpec, PlacemarkSpec, PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Placemark } from "../types/placemark-types.js";

export const placemarkApi = {
    find: {
        auth: { strategy: "jwt", },
        handler: async function (request: Request, h: ResponseToolkit) {
            try {
                const userId = request.auth.credentials.id;
                const placemarks = await db.placemarkStore.getUserPlacemarks(userId);
                return h.response(placemarks).code(200);
            } catch (err) {
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
        async handler(request: Request, h: ResponseToolkit) {
          try {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            if (placemark === null) {
              return Boom.notFound("No Placemark with this id");
            }
            return h.response(placemark).code(200);
          } catch (err) {
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
        handler: async function (request: Request, h: ResponseToolkit) {
            try {
                const userId = request.auth.credentials.id as string;
                const placemark = request.payload as Placemark;
                placemark.userid = userId; // i dunno
                const newPlacemark = (await db.placemarkStore.addPlacemark(placemark)) as Placemark;
                if (newPlacemark !== null) {
                    return h.response(newPlacemark).code(201);
                }
                return Boom.badImplementation("error creating placemark");                
            } catch (err) {
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
        handler: async function (request: Request, h: ResponseToolkit) {
            try{
                await db.placemarkStore.deleteAllPlacemarks();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all placemarksAPI",
    },

    deleteOne: {
        auth: { strategy: "jwt", },
        handler: async function (request: Request, h: ResponseToolkit) {
          try {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            if (placemark === null) {
              return Boom.notFound("No Placemark with this id");
            }
            await db.placemarkStore.deletePlacemarkById(placemark._id); // mignt need to be changed as per lab if it doesn't work
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("No Placemark with this id");
          }
        },
        tags: ["api"],
        description: "Delete a placemark",
        validate: { params: { id: IdSpec }, failAction: validationError }
      },
}