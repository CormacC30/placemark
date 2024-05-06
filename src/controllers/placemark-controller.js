import { db } from "../models/db.js";
import { SiteSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
export const placemarkController = {
    index: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const placemarkSites = await db.siteStore.getSitesByPlacemarkId(request.params.id);
            let list = true;
            if (placemarkSites.length === 0)
                list = false;
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
    uploadImage: {
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                console.log(placemark);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    placemark.img = url;
                    await db.placemarkStore.updatePlacemark(placemark);
                }
                return h.redirect(`/placemark/${placemark._id}`);
            }
            catch (err) {
                console.log(err);
                return h.redirect(`/placemark/${placemark._id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    uploadSiteImage: {
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const site = await db.siteStore.getSiteById(request.payload.siteId);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    // If a file is uploaded
                    const url = await imageStore.uploadImage(file); // Upload the image and get the URL
                    site.img = url; // Update the image URL for the site
                    await db.siteStore.updateSite(site); // Update the site in the database
                }
                return h.redirect(`/placemark/${placemark._id}`);
            }
            catch (err) {
                console.log(err);
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                return h.redirect(`/placemark/${placemark._id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
};
