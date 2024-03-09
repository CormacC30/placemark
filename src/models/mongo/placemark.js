import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  img: String,
  category: String,
  userid: {
    type: Schema.Types.ObjectId, // String, // 
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);