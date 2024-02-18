import { db } from "../models/db.js";

export const placemarkController = {
    index: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const viewData = {
                title: "Placemark",
                placemark: placemark,
            };
            return h.view("placemark-view", viewData);
        },
    },

    addSite: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);

            const era = request.payload.era;

            const newSite = {
                title: request.payload.title,
                year: Number(request.payload.year),
                era: era,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
                description: request.payload.description,
            };
            await db.siteStore.addSite(placemark._id, newSite);
            return h.redirect(`/placemark/${placemark._id}`);
        },
    },
};