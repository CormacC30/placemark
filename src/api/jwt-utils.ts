import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, ResponseToolkit } from "@hapi/hapi";
import dotenv from "dotenv";
import { db } from "../models/db.js";
import { User } from "../types/placemark-types.js";

dotenv.config();
const cookiePassword = process.env.cookie_password as string;

export function createToken(user: User): string {
  const payload = {
    id: user._id,
    email: user.email,
    scope: [],
  };
  const options: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, cookiePassword, options);
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, cookiePassword) as jwt.JwtPayload;
    return {
      id: decoded.id,
      email: decoded.email,
      scope: decoded.scope,
    } as JwtPayload;
  } catch (e: any) {
    console.log(e.message);
  }
  return null;
}

export function validate(decoded: JwtPayload) {
  try {
    const user: User = db.userStore.getUserById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    return { isValid: true, credentials: { id: decoded.id } };
  } catch (err) {
    console.error('Validation error:', err);
    return { isValid: false };
  }
}

export function getUserIdFromRequest(request: Request): string {
  let userId = null;
  try {
    const { authorization } = request.headers;
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secretpasswordnotrevealedtoanyone") as jwt.JwtPayload;
    userId = decodedToken.id;
  } catch (e) {
    userId = null;
  }
  return userId;
}