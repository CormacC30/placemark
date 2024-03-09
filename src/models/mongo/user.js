import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema ({
    isAdmin: { type: Boolean, default: false },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

export const User = Mongoose.model("User", userSchema);