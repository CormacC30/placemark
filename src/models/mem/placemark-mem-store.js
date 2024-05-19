import { v4 } from "uuid";
import { siteMemStore } from "./site-mem-store.js";
let placemarks = [];
export const placemarkMemStore = {
    async getAllPlacemarks() {
        return placemarks;
    },
    async addPlacemark(placemark) {
        placemark._id = v4();
        placemarks.push(placemark);
        return placemark;
    },
    async getPlacemarkById(id) {
        const list = placemarks.find((placemark) => placemark._id === id);
        list.sites = await siteMemStore.getSitesByPlacemarkId(list._id);
        return list;
    },
    async deletePlacemark(id) {
        const index = placemarks.findIndex((placemark) => placemark._id === id);
        placemarks.splice(index, 1);
    },
    async getUserPlacemarks(userid) {
        return placemarks.filter((placemark) => placemark.userid === userid);
    },
    async deleteAllPlacemarks() {
        placemarks = [];
    },
};
