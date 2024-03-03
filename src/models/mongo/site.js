import Mongoose from "mongoose";

const { Schema } = Mongoose;

const siteSchema = new Schema({
  title: String,
  year: Number,
  era: String,
  latitude: Number,
  longitude: Number,
  description: String,
  placemarkid: {
    type: String, // Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Site = Mongoose.model("Site", siteSchema);