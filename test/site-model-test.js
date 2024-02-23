import { assert } from "chai";
import { db } from "../src/models/db.js";
import { town, testSites, newgrange, testPlacemarks } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";
import { analytics } from "../src/utils/analytics.js";

suite("Site Tests", () => {

    setup(async () => {
        db.init("mongo");
        await db.placemarkStore.deleteAllPlacemarks();
        await db.siteStore.deleteAllSites();
        const testTown = await db.placemarkStore.addPlacemark(town);
        for (let i = 0; i < testSites.length; i += 1){
             // eslint-disable-next-line no-await-in-loop
            testSites[i] = await db.siteStore.addSite(testTown._id, testSites[i]);
        };
    });

    test("Create single site", async () => {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        const placemarkid = placemarks[0]._id;
        const site = await db.siteStore.addSite(placemarkid, newgrange);
        assert.isNotNull(site._id);
        assertSubset(site, newgrange);
    });

    test("get a site - success", async() => {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        const site = await db.siteStore.addSite(placemarks[0]._id, newgrange);
        const returnedSite = await db.siteStore.getSiteById(site._id);
        assertSubset(returnedSite, site);
    });

    test("get all placemark sites - success", async() => {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        const sites = await db.siteStore.getSitesByPlacemarkId(placemarks[0]._id);
        assert.equal(sites.length, testSites.length);
    });

    test("get a site - bad params", async() => {
        let nullSite = await db.siteStore.getSiteById("");
        assert.isNull(nullSite);
    });

    test("delete One Site - success", async () => {
        await db.siteStore.deleteSite(testSites[0]._id);
        const sites = await db.siteStore.getAllSites();
        assert.equal(sites.length, testPlacemarks.length - 1);
        const deletedSite = await db.siteStore.getSiteById(testSites[0]._id);
        assert.isNull(deletedSite);
      });

      test("delete one site - fail", async () => {
        await db.siteStore.deleteSite("bad-id");
        const sites = await db.siteStore.getAllSites();
        assert.equal(sites.length, testPlacemarks.length);
      });

    test("delete all sites", async() => {
        let returnedSites = await db.siteStore.getAllSites();
        assert.equal(returnedSites.length, 3);
        await db.siteStore.deleteAllSites();
        returnedSites = await db.siteStore.getAllSites();
        assert.equal(returnedSites.length, 0);
    });

    test("site age", async() => {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        const site = await db.siteStore.addSite(placemarks[0]._id, newgrange);
        assert.equal(site.year, 3000);
        assert.equal(site.era, "BC");
        const siteAge = await analytics.getSiteAge(site.year, site.era);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const age = currentYear + 3000;
        assert.equal(siteAge, age);
    });
});