import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const siteJsonStore = {
    async getAllSites() {
        await db.read();
        return db.data.sites;
      },
    
      async addSite(placemarkId, site) {
        await db.read();
        site._id = v4();
        site.placemarkid = placemarkId;
        db.data.sites.push(site);
        await db.write();
        return site;
      },
    
      async getSitesByPlacemarkId(id) {
        await db.read();
        let list = db.data.sites.filter((site) => site.placemarkid === id);
        if (list === undefined) list = null;
        return list;
      },
    
      async getSiteById(id) {
        await db.read();
        let u = db.data.sites.find((site) => site._id === id);
        if (u === undefined) u = null;
        return u;  
    },
    
      async deleteSite(id) {
        await db.read();
        const index = db.data.sites.findIndex((site) => site._id === id);
        if (index !== -1) db.data.sites.splice(index, 1);
        await db.write();
      },
    
      async deleteAllSites() {
        db.data.sites = [];
        await db.write();
      },
    
      async updateSite(site, updatedSite) {
        site.title = updatedSite.title;
        site.year = updatedSite.year;
        site.era = updatedSite.era;
        site.latitude = updatedSite.latitude;
        site.longitude = updatedSite.longitude;
        await db.write();
      },
};