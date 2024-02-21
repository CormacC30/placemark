import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { siteMemStore } from "./mem/site-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";

export const db = {
    userStore: null,
    placemarkStore: null,
    siteStore: null,

    init() {
        this.userStore = userJsonStore;
        this.placemarkStore = placemarkMemStore;
        this.siteStore = siteMemStore;
    },
};