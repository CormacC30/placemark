import { v4 } from "uuid";

let sites = [];

export const siteMemStore = {
    async getAllSites() {
        return sites;
    },

    async addSite(placemarkId, site) {
        site._id = v4();
        site.placemarkid = placemarkId;
        sites.push(site);
        return site;
    },

    async getSitesByPlacemarkId(id) {
        return sites.filter((site) => site.placemarkid === id);
    },

    async getSiteById(id) {
        return sites.find((site) => site._id === id);
    },

    async deleteSite(id) {
        const index = sites.findIndex((site) => site._id === id);
        sites.splice(index, 1);
    },

    async deleteAllSites() {
        sites = [];
    },

    async updateSite(site, updatedSite) {
        site.title = updatedSite.title;
        site.year = updatedSite.year;
        site.latitude = updatedSite.latitude;
        site.longitude = updatedSite.longitude;
        site.description = updatedSite.descripton;
    },
};