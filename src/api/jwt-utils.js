import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";
dotenv.config();
const cookiePassword = process.env.cookie_password;
export function createToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        scope: [],
    };
    const options = {
        algorithm: "HS256",
        expiresIn: "1h",
    };
    return jwt.sign(payload, cookiePassword, options);
}
export function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, cookiePassword);
        return {
            id: decoded.id,
            email: decoded.email,
            scope: decoded.scope,
        };
    }
    catch (e) {
        console.log(e.message);
    }
    return null;
}
export function validate(decoded) {
    try {
        const user = db.userStore.getUserById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }
        return { isValid: true, credentials: { user } };
    }
    catch (err) {
        console.error('Validation error:', err);
        return { isValid: false };
    }
}
export function getUserIdFromRequest(request) {
    let userId = null;
    try {
        const { authorization } = request.headers;
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "secretpasswordnotrevealedtoanyone");
        userId = decodedToken.id;
    }
    catch (e) {
        userId = null;
    }
    return userId;
}
