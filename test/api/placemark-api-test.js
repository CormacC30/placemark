import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { testPlacemarks, town, maggie, newgrange } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Placemark API tests", () => {
    
    let user = null;
    let sites = [];
    
    setup(async () => {
        placemarkService.clearAuth();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggie);
        await placemarkService.deleteAllPlacemarks();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggie);
        town.userid = user._id;
        town.sites = sites;
    });
    teardown(async () => {
        await placemarkService.deleteAllPlacemarks();
        await placemarkService.deleteAllUsers();
    });

    test("create a placemark", async () => {
        const returnedPlacemark = await placemarkService.createPlacemark(town);
        assert.isNotNull(returnedPlacemark);
        assertSubset(town, returnedPlacemark);
    });

    test("create multiple placemarks", async () => {
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            testPlacemarks[i].userid = user._id;
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createPlacemark(testPlacemarks[i]);
          }
          let returnedLists = await placemarkService.getAllPlacemarks();
          assert.equal(returnedLists.length, testPlacemarks.length);
          await placemarkService.deleteAllPlacemarks();
          returnedLists = await placemarkService.getAllPlacemarks();
          assert.equal(returnedLists.length, 0);
    });

    test("remove non-existent placemark", async () => {
        try {
            const placemark = await placemarkService.deletePlacemark("1234");
        assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Placemark with this id", "Incorrect response message");
        }
    });

    test("delete a placemark", async () => {
        const placemark = await placemarkService.createPlacemark(town);
        const response = await placemarkService.deletePlacemark(placemark._id);
        assert.equal(response.status, 204);
        try {
          const returnedPlacemark = await placemarkService.getPlacemark(placemark.id);
          assert.fail("Should not return a response");
        } catch (error) {
          assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
        }
      });


});