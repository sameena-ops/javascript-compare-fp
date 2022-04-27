export const clientData = async (clientId) => {

    if (clientId === 1) {
        const json = JSON.parse('{\n' +
            '            "randomStoreId":"15",\n' +
            '            "storeName": "abc",\n' +
            '            "noOfStoresToSelect": "1",\n' +
            '            "clientId": "1",\n' +
            '            "storeDisplayFieldName" : "Select store"\n' +
            '        }')
        return json;

    }
}