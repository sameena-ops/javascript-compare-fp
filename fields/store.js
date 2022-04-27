import fetch from 'node-fetch';
import faker from 'faker';


export const getStore = async (storeId) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`, options);
    return apiResponse.status;
}

export const getStoreDetails = async (storeId) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`, options);
    return apiResponse;
}
/*
export const requestAndEvaluate = (apiResponse) =>
{
    if(apiResponse.status===200)
        return apiResponse;
    else
        throw Exception;
}*/


export const updateStoreCity = async (storeId) => {
    const body = JSON.stringify({
        city: `${faker.address.city()}`,
    });
    const options = {
        method: 'PATCH',
        body: body,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`, options);
    const apiBody = await apiResponse.json();
    return apiBody;

};


export const getRandomStoreId = async () => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores`, options);

    const json = await apiResponse.json();
    //Path dependency is bad. Need to be path independent.
    const storeId = json.data[0].id;

    return storeId;
}

export const getAllStoreNames = async () => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores`, options);
    var stores = [];
    const json = await apiResponse.json();
    const {data} = json;

    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
        stores.push(data[i].name);
    }

    return stores;
}

export const getStoreFieldType = async (data) => {
    console.log('entered method to get the field type of store')
    const displayName = data.storeDisplayFieldName;
    console.log(`get attribute type from ${displayName}`)
    const attribute = 'dropdownElement';
    return attribute;
}

export const getClientSpecificStoreName = async (allStoreNames, data) => {
    console.log('entered method to get number of stores to select as per client');
    const noOfStoresToSelect = data.noOfStoresToSelect;
    return allStoreNames.slice(0, noOfStoresToSelect);
}

export const selectStoreValue = async (typeOfField, storeNamesToSelect) => {
    console.log('entered method to select the stores from dropdown');

    //click typeOfField
    for (var store = 0; store < storeNamesToSelect; store++) {
        console.log(`clicked on store ${storeNamesToSelect[store]}`)
    }
}

export const storesSelected = async (dropdownElement) => {
    console.log('using field type value provided')
    console.log('entered method to get the stores selected in UI');
    const dropDownValue = 'Store1;Store2'
    //await dropdownElement.getText();
    return dropDownValue;
}

export const mergeWithSemicolon = (storeNamesToSelect) => {
    const displayedName = '';
    for (var store = 0; store < storeNamesToSelect; store++) {
        displayedName + storeNamesToSelect[store] + ';';
    }
    return 'Store1;Store2';
}


export const deleteStore = async (storeId) => {
    const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`, options);
    return apiResponse;
}

export const addStore = async (body) => {

    let apiBody = JSON.stringify({
        name: body.name,
        type: body.type,
        address: body.address,
        city: body.city,
        state: body.state,
        zip: body.zip,
    });
    const options = {
        method: 'POST',
        body: apiBody,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }
    const apiResponse = await fetch(`http://localhost:3030/stores`, options);
    return apiResponse;

};

export const selectStore = async (storeNamesToSelect) => {
    //await click(//dropdownlocator);
    for (var a = 0; a < storeNamesToSelect.length; a++) {
        await click(storeNamesToSelect(a));
    }
}
/*
const request = (options) => () => {
    const response = fetch(`${BASE_URL}${options.url}`, options.requestOptions);
    return response;
};*/






