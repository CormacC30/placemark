import Mongoose from "mongoose";
const { Schema } = Mongoose;
const siteSchema = new Schema({
    title: String,
    year: Number,
    era: String,
    latitude: Number,
    longitude: Number,
    description: String,
    img: String,
    placemarkid: {
        type: Schema.Types.ObjectId, // String, // 
        ref: "Placemark",
    },
});
export const Site = Mongoose.model("Site", siteSchema);
