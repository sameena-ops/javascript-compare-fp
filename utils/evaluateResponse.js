import { ifElse, propEq } from 'ramda';
import { request } from '../apiHelper/api.js';
import HTTPResponseError from '../exception/HTTPResponseError.js';


const returnErrorDataObject = (message) => (data) => ({
    error: data.error,
    message,
    status: data.response.status,
    statusText: data.response.statusText,
});

const returnDataObject = async (data) => ({
    error: data.error,
    status: data.response.status,
    statusText: data.response.statusText,
    response: await data.response.json(),
});

const hasError = propEq('error', true);

const evaluateApiResponses = ifElse(
    hasError,
    returnErrorDataObject('API Failed'),
    returnDataObject
);

export const requestAndEvaluate =  ({ url, requestOptions }) =>
    request({
        url,
        requestOptions,
    }).then(evaluateApiResponses);


export const returnResponse =  (response) =>
    checkStatus(response);

export const handleError = ({ response }) => ({
    error: true,
    response,
});

const checkStatus = (response) => {
    if (response.ok) {
        return {
            error: false,
            response,
        };
    } else {
        throw new HTTPResponseError(response);
    }
};
