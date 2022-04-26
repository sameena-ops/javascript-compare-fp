import assert from 'assert';
import { always, equals, is } from 'ramda';
import {
    addStore,
    getAllStoreNames,
    findStoreWith,
    randomId,
    updateStore,
} from '../fields/store_fp.js';
import {getStoresToBeSelected, selectStore} from "../utils/datahelper.js";



describe('checking store', ()=>{


   it('Response should return 404', async () => {
        const { status } = await findStoreWith({ id: '00000' });
        assert.equal(status,404);
      //  expect(status).to.be.equal(404);
    });


    it('Response should return 200 for valid request', async () => {
        const { status } = await findStoreWith(randomId);
        assert.equal(status,200);
      //  expect(status).to.be.equal(200);
    });




    it('Update the Store city', async () => {
        const store = await findStoreWith(randomId).then((store) =>
            updateStore(store).then(always(store.response))
        );
        const updatedStore = await findStoreWith(store);
        assert.notEqual(store.city, updatedStore.city);
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
/*
    it('Select store in UI ',async()=> {
       // const storeId = await getRandomStoreId();
        const allStoreNames = await getAllStoreNames();
        const data =  await clientData(1);
        const numberOfStoresToSelect =data.default.noOfStoresToSelect;
        const randomStoreNames = await getStoresToBeSelected(allStoreNames, numberOfStoresToSelect)
        const storesSelected =await selectStore(1,randomStoreNames);
        assert.isTrue(storesSelected)
            });*/

    it('Select store in UI ',async()=> {
        const allStoreNames = await getAllStoreNames();
        const storesToBeSelected = [...allStoreNames]
        //const data =  await clientData(1);
      //  const numberOfStoresToSelect =data.default.noOfStoresToSelect;
        const randomStoreNames = await getStoresToBeSelected(storesToBeSelected, 2)
        const storesSelected =await selectStore(1,randomStoreNames);
        assert.isTrue(storesSelected)
    })
//


})







    