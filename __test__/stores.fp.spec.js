import assert from 'assert';
import {always, equals, is, pick} from 'ramda';
import {
    addStore,
    getAllStoreNames,
    findStoreWith,
    randomId,
    deleteStore,
    selectStore, mergeWithSemicolon
} from '../fields/store_fp.js';
import {clientData} from "../utils/datahelper.js";


describe('checking store', () => {


    it('Response should return 404', async () => {
        const {status} = await findStoreWith({id: '00000'});
        assert.equal(status, 404);
    });


    it('Response should return 200 for valid request', async () => {
        const {status} = await findStoreWith(randomId);
        assert.equal(status, 200);
    });

    it('Delete Store ', async () => {
        const deletedStoreResponse = await findStoreWith(randomId).then((store) =>
            deleteStore(store).then(always(store))
        );
        assert.equal(deletedStoreResponse.status, 200);
        console.log(`Deleted store ${deletedStoreResponse.response.name}`);
        console.log(`Deleted store ${deletedStoreResponse.response.id}`);
        const {status: getStoreStatus} = await findStoreWith(pick(['id'], deletedStoreResponse.response));
        assert.equal(getStoreStatus, 404);
        const {status: deletedStoreStatus, response: {id, name},} = await addStore(deletedStoreResponse.response);
        assert.equal(deletedStoreStatus, 201);
        assert.equal(deletedStoreResponse.response.name, name);
        console.log(`Recreated store ${name} with new id ${id}`);

    });

    it('Select store in UI ', async () => {
        const dataFromClient = await clientData(1);
        const allStoreNames = await getAllStoreNames();
        const selectStoreForClient = await selectStore(dataFromClient, allStoreNames);
        const storesSelectedFromDropdown = await selectStoreForClient.selectStoreValue()
        const storesSelectedText = await selectStoreForClient.storesSelected();
        assert.equal(storesSelectedText, mergeWithSemicolon(storesSelectedFromDropdown));
    });

})







