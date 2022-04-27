import {expect, assert} from 'chai';
import {describe} from 'mocha';
//import { waitFor, currentURL, goBack } from 'taiko';

import {
    addStore,
    deleteStore,
    getAllStoreNames, getClientSpecificStoreName,
    getRandomStoreId,
    getStore,
    getStoreDetails, getStoreFieldType, mergeWithSemicolon, selectStoreValue, storesSelected,
    updateStoreCity
} from "../fields/store.js";
import {clientData} from "../utils/datahelper.js";

describe('checking store', () => {

    it('Validate invalid store', async () => {
        const {status} = await getStoreDetails('10000');
        assert.equal(status, 404);
    });


    it('Validate valid store', async () => {
        const storeId = await getRandomStoreId();
        const storeDetails = await getStoreDetails(storeId);
        const statusCode = storeDetails.status;
        assert.equal(statusCode, 200);
    });

    it('Delete Store ', async () => {
        const storeId = await getRandomStoreId();
        // const actualStoreBody = await (await getStoreDetails(storeId)).json();
        const storeDeleted = await deleteStore(storeId);
        const deletedStoreJson = await storeDeleted.json();
        assert.equal(storeDeleted.status, 200);
        console.log(`Deleted store ${deletedStoreJson.name}`);
        const getDeletedStore = await getStoreDetails(storeId);
        assert.equal(getDeletedStore.status, 404);
        const addDeletedStore = await addStore(deletedStoreJson);
        assert.equal(addDeletedStore.status, 201);
        const addDeletedStoreJson = await addDeletedStore.json();
        console.log(`Recreated store ${addDeletedStoreJson.name} with new id ${addDeletedStoreJson.id}`);

    });

    it('Select store in UI ', async () => {
        const dataFromClient = await clientData(1);
        const allStoreNames = await getAllStoreNames();
        const typeOfField = await getStoreFieldType(dataFromClient);
        const storeNamesToSelect = await getClientSpecificStoreName(allStoreNames, dataFromClient);
        await selectStoreValue(typeOfField, storeNamesToSelect);
        const selectedStores = await storesSelected(typeOfField, dataFromClient);
        assert.equal(selectedStores, mergeWithSemicolon(storeNamesToSelect));
    });

})







