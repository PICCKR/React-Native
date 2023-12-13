import axios from 'axios';
import { getLocalData } from '../helper/AsyncStorage';
import { storageKeys } from '../helper/AsyncStorage/storageKeys';


export async function getHeaders() {
    let userData = await getLocalData(storageKeys?.userData);
    // console.log("userData", userData);
    if (userData) {
        return {
            Authorization: `Bearer ${userData && userData.token}`,
        };
    }
    return {};
}

export async function apiReq(
    endPoint,
    data,
    method,
    headers,
    requestOptions = {}
) {

    return new Promise(async (res, rej) => {
        // console.log('hhhh')
        const getTokenHeader = await getHeaders();
        headers = {
            ...getTokenHeader,
            ...headers
        };

        if (method === 'get' || method === 'delete') {
            data = {
                ...requestOptions,
                ...data,
                headers
            };
        }

        axios[method](endPoint, data, { headers })
            .then(result => {
                const { data } = result;
                return res(result);
            })
            .catch(error => {
                console.log(error, 'the error respne')
                const { data } = error?.response ? error?.response : error;
                if (data) {
                    return res(data)
                }else{
                    return res(error)
                }
            });
    });
}

export function apiPost(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'put', headers);
}
