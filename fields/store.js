import fetch from 'node-fetch';
import faker from 'faker';

export const getStore =async(storeId) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`, options);
    return apiResponse.status;
}

export const getStoreDetails =async(storeId) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`, options);
    return apiResponse;
}

export const updateStoreCity = async ( storeId ) => {
    const body = JSON.stringify({
        city: `${faker.address.city()}`,
    });
    const options =  {
     method: 'PATCH',
     body: body,
     headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`,options);
    const apiBody = await apiResponse.json();
    return apiBody;

};



export const getRandomStoreId =async() => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores`, options);

    const json = await apiResponse.json();
    const storeId =json.data[0].id;
    return storeId;
}

export const getAllStoreNames =async() => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores`, options);
    var stores = []  ;
    const json = await apiResponse.json();
    const {data} = json;

    console.log(data.length);
    for( var i=0; i<data.length;i++ )
    {
        stores.push(data[i].name);
    }

    return stores;
}






export const deleteStore =async(storeId) => {
    const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`, options);
    return apiResponse;
}

export const addStore = async ( body ) => {

    let apiBody = JSON.stringify({
        name: body.name,
        type: body.type,
        address: body.address,
        city:body.city,
        state: body.state,
        zip:  body.zip,
    });

    console.log(apiBody);
    const options =  {
        method: 'POST',
        body: apiBody,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }
    const apiResponse = await fetch(`http://localhost:3030/stores`,options);
    return apiResponse;

};





