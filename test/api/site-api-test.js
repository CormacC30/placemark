import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, town, testPlacemarks, testSites } from "../fixtures.js";

suite("Site API tests", () => {
    let user = null;
    let dunAongus = null;

    setup(async () => {
        await placemarkService.deleteAllSites();
        await placemarkService.deleteAllPlacemarks();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(maggie);
        dunAongus = await placemarkService.createPlacemark(town);
        // concerto.placemarkid = beethovenSonatas._id;

    });

    teardown(async () => {

    });

    test("create site", async () => {
        const placemarkid = beethovenSonatas._id;
        const newSite = await placemarkService.createSite(placemarkid, town);
        assert.isNotNull(newSite);
        assertSubset(town, newSite);
    });

    test("create multiple sites", async () => {
        for (let i = 0; i < testSites.length; i += 1) {
            const placemarkid = beethovenSonatas._id;
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
        const placemarkId = beethovenSonatas._id;
        const site = await placemarkService.createSite(placemarkId, town);
        assert.isDefined(site._id);
        const response = await placemarkService.deleteSite(site._id);
        assert.equal(response.status, 204);
    });

    test("get a site - success", async() => {
        const placemarkId = dunAongus._id;
        const newSite = await placemarkService.createSite(placemarkId, town);
        assert.isDefined(newSite._id);
        const returnedSite = await placemarkService.getSite(newSite._id);
        assertSubset(newSite, returnedSite);
    });


    test("Test denormalised placemark", async () => {
        
    });

});