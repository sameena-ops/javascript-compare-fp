import { expect , assert} from 'chai';
import {describe} from 'mocha';
//import { waitFor, currentURL, goBack } from 'taiko';

import {
    addStore,
    deleteStore,
     getAllStoreNames,
    getRandomStoreId,
    getStore,
    getStoreDetails,
    updateStoreCity
} from "../utils/store.js";
import {clientData, getStoresToBeSelected, selectStore} from "../utils/datahelper.js";

describe('checking store', ()=>{

    it('Validate invalid store', async () => {
        const {status} = await getStoreDetails('10000');
        assert.equal(status,404);
    });

  /*

   it('Response should return 404', async () => {
        const { status } = await findStoreWith({ id: '00000' });
        expect(status).to.be.equal(404);
    });*/

    it('Validate valid store', async () => {
        const storeId = await getRandomStoreId();
        const storeDetails = await getStoreDetails(storeId);
        const statusCode = storeDetails.status;
        assert.equal(statusCode,200);
    });

/*
    it('Response should return 200 for valid request', async () => {
        const { status } = await findStoreWith(randomId);
        expect(status).to.be.equal(200);
    });*/


    it('Update the Store city', async () => {
        const storeId = await getRandomStoreId();
        const actualStoreBody = await (await getStoreDetails(storeId)).json();
        const updatedStoreBody =  await updateStoreCity(storeId);
        console.log(`${actualStoreBody.city} has been updated to ${updatedStoreBody.city} `)
        assert.notEqual(actualStoreBody.city, updatedStoreBody.city);
    });

/*    it('Update the Store city', async () => {
        const store = await findStoreWith(randomId).then((store) =>
            updateStore(store).then(always(store.response))
        );
        const updatedStore = await findStoreWith(store);
        expect(equals(store.city, updatedStore.city)).to.be.equal(false);
    });*/

    it('Delete Store ', async () => {
        const storeId = await getRandomStoreId();
        const actualStoreBody = await (await getStoreDetails(storeId)).json();
        const storeDeleted = await deleteStore(storeId);
        assert.equal(storeDeleted.status,200);
        const getDeletedStore = await getStoreDetails(storeId);
        assert.equal(getDeletedStore.status,404);
        const addDeletedStore = await addStore(actualStoreBody);
        assert.equal(addDeletedStore.status,201);
    });

    /*
    Client 1
    Single select DropDown
    UI display Name : Select Store
    Dropdown has 20 stores

    Client 2 :
    Select radio button from Dropdown
    UI display Name : Choose outlet
    Dropdown has 3 options

    Client 3 :
    Multi select checkbox dropdown
    UI display name : Select All Stores
    Dropdown has 30 options
     */

    it('Select store in UI ',async()=> {
       // const storeId = await getRandomStoreId();
        const allStoreNames = await getAllStoreNames();
        const data =  await clientData(1);
        const numberOfStoresToSelect =data.default.noOfStoresToSelect;
        const randomStoreNames = await getStoresToBeSelected(allStoreNames, numberOfStoresToSelect)
        const storesSelected =await selectStore(1,randomStoreNames);
        assert.isTrue(storesSelected)
            });



})







    