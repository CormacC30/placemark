import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, town, testSites, newgrange, maggieCredentials } from "../fixtures.js";
suite("Site API tests", () => {
    let user = null;
    let bantry = null;
    setup(async () => {
        placemarkService.clearAuth();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        await placemarkService.deleteAllPlacemarks();
        await placemarkService.deleteAllSites();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        town.userid = user._id;
        bantry = await placemarkService.createPlacemark(town);
    });
    teardown(async () => {
    });
    test("create site", async () => {
        const placemarkid = bantry._id;
        const newSite = await placemarkService.createSite(placemarkid, newgrange);
        assert.isNotNull(newSite);
        assertSubset(town, newSite);
    });
    test("create multiple sites", async () => {
        for (let i = 0; i < testSites.length; i += 1) {
            const placemarkid = bantry._id;
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createSite(placemarkid, testSites[i]);
        }
        let returnedSites = await placemarkService.getAllSites();
        assert.equal(returnedSites.length, testSites.length);
        await placemarkService.deleteAllSites();
        returnedSites = await placemarkService.getAllSites();
        assert.equal(returnedSites.length, 0);
    });
    test("Delete Site", async () => {
        const placemarkId = bantry._id;
        const site = await placemarkService.createSite(placemarkId, newgrange);
        assert.isDefined(site._id);
        const response = await placemarkService.deleteSite(site._id);
        assert.equal(response.status, 204);
    });
    test("get a site - success", async () => {
        const placemarkId = bantry._id;
        const newSite = await placemarkService.createSite(placemarkId, newgrange);
        assert.isDefined(newSite._id);
        const returnedSite = await placemarkService.getSite(newSite._id);
        assertSubset(newSite, returnedSite);
    });
    test("Test denormalised placemark", async () => {
    });
});
