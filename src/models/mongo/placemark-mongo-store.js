import { Placemark } from "./placemark.js";
import { siteMongoStore } from "./site-mongo-store.js";
export const placemarkMongoStore = {
    async getAllPlacemarks() {
        const placemarks = await Placemark.find().lean();
        return placemarks;
    },
    async getPlacemarkById(id) {
        if (id) {
            const placemark = await Placemark.findOne({ _id: id }).lean();
            if (placemark) {
                placemark.sites = await siteMongoStore.getSitesByPlacemarkId(placemark._id);
            }
            return placemark;
        }
        return null;
    },
    async addPlacemark(placemark) {
        const newPlacemark = new Placemark(placemark);
        const placemarkObj = await newPlacemark.save();
        return this.getPlacemarkById(placemarkObj._id);
    },
    async getUserPlacemarks(id) {
        const placemark = await Placemark.find({ userid: id }).lean();
        return placemark;
    },
    async deletePlacemarkById(id) {
        try {
            await Placemark.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllPlacemarks() {
        await Placemark.deleteMany({});
    },
    async updatePlacemark(updatedPlacemark) {
        const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
        placemark.name = updatedPlacemark.name;
        placemark.img = updatedPlacemark.img;
        await placemark.save();
    }
};
