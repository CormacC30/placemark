import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  category: String,
  userid: {
    type: String,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);