import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { db } from "../models/db.js";
import { UserSpec, UserSpecPlus, UserArray, IdSpec, JwtAuth, UserCredentialsSpec, SuccessResponse } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";
const saltRounds = 10;
export const userApi = {
    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const userPayload = request.payload;
                const hashedPassword = await bcrypt.hash(userPayload.password, saltRounds);
                userPayload.password = hashedPassword;
                console.log(hashedPassword);
                const user = await db.userStore.addUser(userPayload);
                if (user) {
                    return h.response({ success: true }).code(201);
                }
                return Boom.badImplementation("error creating user");
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a User",
        notes: "Returns the newly created user",
        validate: { payload: UserSpec, failAction: validationError },
        response: { schema: SuccessResponse, failAction: validationError },
    },
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const users = await db.userStore.getAllUsers();
                return h.response(users).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all userApi",
        notes: "Returns details of all userApi",
        response: { schema: UserArray, failAction: validationError },
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const user = await db.userStore.getUserById(request.params.id);
                if (user === null) {
                    return Boom.notFound("No User with this id");
                }
                return h.response(user).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get a specific user",
        notes: "Returns user details",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: UserSpecPlus, failAction: validationError },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.userStore.deleteAll();
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all userApi",
        notes: "All userApi removed from Playtime",
    },
    authenticate: {
        auth: false,
        handler: async function (request, h) {
            const payload = request.payload;
            //      console.log("HERE");
            try {
                const user = (await db.userStore.getUserByEmail(payload.email));
                //     console.log("response", h)
                if (user === null) {
                    return Boom.unauthorized("User not found");
                }
                const passwordsMatch = await bcrypt.compare(payload.password, user.password);
                if (!passwordsMatch) {
                    return Boom.unauthorized("Invalid password");
                }
                const token = createToken(user);
                return h.response({ success: true,
                    name: `${user.firstName} ${user.lastName}`,
                    token: token, _id: user._id
                }).code(201);
            }
            catch (err) {
                return Boom.serverUnavailable("Data Error");
            }
        },
        tags: ["api"],
        description: "Authenticate a user",
        notes: "If user has valid email/password, create and return a JWT token",
        validate: { payload: UserCredentialsSpec, failAction: validationError },
        response: { schema: JwtAuth, failAction: validationError }
    },
};
