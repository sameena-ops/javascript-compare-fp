import fetch from 'node-fetch';

export const getStore =async(storeId) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    const apiResponse = await fetch(`http://localhost:3030/stores/${storeId}`, options);
    //apiResponse.Json()
    return apiResponse.status;
}




