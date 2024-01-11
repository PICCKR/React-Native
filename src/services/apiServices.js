import axios from 'axios';
import { getLocalData } from '../helper/AsyncStorage';
import { storageKeys } from '../helper/AsyncStorage/storageKeys';


export async function getHeaders() {
    let userData = await getLocalData(storageKeys?.userData);
    // console.log("userData", userData);
    if (userData) {
        return {
            Authorization: `Bearer ${userData && userData?.token}`,
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
                // console.log("====>",endPoint, data, { headers });
                return res(result);
            })
            .catch(error => {
                // console.log(error, 'the error respne
                // console.log("===>",endPoint, data, { headers })
                const data1 = error?.response ? error?.response : error;
                if (data1) {
                    return res(data1)
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
    // console.log("datadata", data);
    return apiReq(endPoint, data, 'put', headers);
}
