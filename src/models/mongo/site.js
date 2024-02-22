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
    type: Schema.Types.ObjectId,
    ref: "Playlist",
  },
});

export const Site = Mongoose.model("Site", siteSchema);