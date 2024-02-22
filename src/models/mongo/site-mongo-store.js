import { Site } from "./site.js";

export const siteMongoStore = {
  async getAllSites() {
    const sites = await Site.find().lean();
    return sites;
  },

  async addSite(placemarkId, site) {
    site.placemarkid = placemarkId;
    const newSite = new Site(site);
    const siteObj = await newSite.save();
    return this.getSiteById(siteObj._id);
  },

  async getSitesByPlacemarkId(id) {
    const sites = await Site.find({ placemarkid: id }).lean();
    return sites;
  },

  async getSiteById(id) {
    if (id) {
      const site = await Site.findOne({ _id: id }).lean();
      return site;
    }
    return null;
  },

  async deleteSite(id) {
    try {
      await Site.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSites() {
    await Site.deleteMany({});
  },

  async updateSite(site, updatedSite) {
    const siteDoc = await Site.findOne({ _id: site._id });
    site.title = updatedSite.title;
    site.year = updatedSite.year;
    site.era = updatedSite.era;
    site.latitude = updatedSite.latitude;
    site.longitude = updatedSite.longitude;
    site.description = updatedSite.description;
    await siteDoc.save();
  },
};