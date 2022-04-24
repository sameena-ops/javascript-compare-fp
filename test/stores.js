import assert from 'assert';
import {describe,beforeEach} from 'mocha';
import {getStore} from "../utils/store.js";
import {clientData} from "../utils/datahelper.js";





describe('checking store', ()=>{

    const randomStoreId =  beforeEach(  function () {


        return  clientData(1);
    });

    it('checking stores',async ()=>{
        console.log(randomStoreId);

        const status =await getStore(randomStoreId);
        assert.equal('200',status)
    })

})







    