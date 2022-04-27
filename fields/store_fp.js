import { requestAndEvaluate } from '../utils/evaluateResponse.js';
import {curry, findLast, map, pipe, prop, pluck, omit, head, pick,find, reduce} from 'ramda';
import faker from 'faker';
import fetch from "node-fetch";

export const findStoreWith = curry(async (randomStore) => {
    const { id } =
        typeof randomStore === 'function' ? await randomStore() : randomStore;
    return await requestAndEvaluate({
        url: `/stores/${id}`,
        requestOptions: {
            method: 'GET',
        },
    });
});

export const updateStore = async ({ response }) => {
    const body = JSON.stringify({
        city: `${faker.address.city()}`,
    });
    return await requestAndEvaluate({
        url: `/stores/${response.id}`,
        requestOptions: {
            method: 'PATCH',
            body,
            redirect: 'follow',
        },
    });
};

export const randomId = async () => {
    const { response } = await requestAndEvaluate({
        url: '/stores',
        requestOptions: {
            method: 'GET',
        },
    });
    return pipe(prop('data'), findLast(prop('id')))(response);
};

export const addStore = async (responseBody) => {
    let body =JSON.stringify( omit(['id','services','createdAt','updatedAt'],responseBody));
    return await requestAndEvaluate({
        url: '/stores',
        requestOptions: {
            body,
            method: 'POST',
        },
    });
};

export const deleteStore =async(response) => {

    return await requestAndEvaluate({
        url: `/stores/${response.response.id}`,
        requestOptions: {
            method: 'DELETE',
            redirect: 'follow',
        },
    });
}

export const getAllStoreNames =async() => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await (await fetch(`http://localhost:3030/stores`, options)).json();
    return pipe(prop('data'), pluck('name'))(apiResponse);
}

export const selectStore = async (data, allStoreNames) => {
    const getStoreFieldType =async(data) => {
        console.log('entered method to get the field type of store')
        const displayName = data.storeDisplayFieldName;
        // console.log(`get attribute type from ${displayName}`)
        const attribute = 'dropdownElement';
        return attribute;
    }
    const getClientSpecificStoreName =  async (allStoreNames, data) => {
        console.log('entered method to get number of stores to select as per client');
        const noOfStoresToSelect = data.noOfStoresToSelect;
        return allStoreNames.slice(0,noOfStoresToSelect);
    }

    const selectStoreValue = async() => {

        await getStoreFieldType(data); //dropdown
        const storeNamesToSelect = await getClientSpecificStoreName(allStoreNames, data);
        for(var store=0; store<storeNamesToSelect;store++)
        {
            console.log(`clicked on store ${storeNamesToSelect[store]}`)
        }
        console.log('entered method to select the stores from dropdown');

        return storeNamesToSelect;
    }
    const storesSelected = async() => {
        console.log('entered method to get the stores selected in UI');

        const dropDownTextBox = await getStoreFieldType(data); //dropdownTextBox
        const dropDownValue= 'Store1;Store2' //dropDownTextBox.getText()
        //await dropdownElement.getText();
        return dropDownValue;
    }


    return {
        selectStoreValue,
        storesSelected
    }

}


export const mergeWithSemicolon = (storeNamesToSelect) => {
    const mergeData = storeNamesToSelect.join('; ')
    console.log(mergeData);
    return 'Store1;Store2';
}





