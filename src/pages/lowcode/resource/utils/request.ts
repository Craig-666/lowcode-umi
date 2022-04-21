import {stringify} from 'qs'

const devService = {
    businessService: 'http://127.0.0.1:7001',
    commonService: 'https://test.common.yx.toplion.com.cn',
    loginService: 'https://test.sso.yx.toplion.com.cn',
    canteenService: 'https://test.canteen.server.toplion.com.cn', //食堂
    superCardService: 'https://test.super-card.server.toplion.com.cn', //超卡通
    cloudCoreService: 'https://test.cloud-core.server.toplion.com.cn', //云芯
    dataOpenService: 'https://test.iot-open.toplion.com.cn', //云智
}

const testService = {
    businessService: 'https://test.iot.yx.toplion.com.cn',
    commonService: 'https://test.common.yx.toplion.com.cn',
    loginService: 'https://test.sso.yx.toplion.com.cn',
    canteenService: 'https://test.canteen.server.toplion.com.cn', //食堂
    superCardService: 'https://test.super-card.server.toplion.com.cn', //超卡通
    cloudCoreService: 'https://test.cloud-core.server.toplion.com.cn', //云芯
    dataOpenService: 'https://test.iot-open.toplion.com.cn', //云智
}

const proService = {
    businessService: 'https://iot-server.toplion.com.cn',
    commonService: 'https://iot-common.toplion.com.cn',
    loginService: 'https://iot-sso.toplion.com.cn',
    canteenService: 'https://canteen-server.toplion.com.cn',
    superCardService: 'https://super-card-server.toplion.com.cn', //超卡通
    cloudCoreService: 'https://cloud-core-server.toplion.com.cn', //云芯
    dataOpenService: 'https://datai-iot-open-server.toplion.com.cn', //云智
}

export const getService = (serviceName: string = 'businessService') => {
    // switch (global.env) {
    //     case 'dev':
    //         return devService[serviceName]
    //     case 'test':
    //         return testService[serviceName]
    //     case 'prod':
    //         return proService[serviceName]
    // }
    return devService[serviceName]
}

type options = {
    contentType?: string,
    method?: string,
    params?: FormData | string | null | ArrayBuffer | object,
    serviceName?: string
}

export type successResponse = {
    data: Record<string, any>,
    success: boolean,
    message: string
}
/**
 * 请求
 * @param url
 * @param options
 */

const request = (url: string, options: options) => {

    const headers = {
        'Content-Type': options.contentType ||
            ((options.method === 'POST' || options.method === 'PUT')
                ?
                'application/json; charset=utf-8'
                : 'application/x-www-form-urlencoded'),
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    };
    // if (global.token) {
    //     Object.assign(headers, {
    //         Authorization: `Bearer ${global.token}`
    //     })
    // }

    return new Promise(((resolve, reject) => {
        const initial = {
            headers,
            method: options.method,
        }
        if (options.method === "POST" || options.method === "PUT") {
            initial.body = options.params
        }
        if (options.method === 'GET') {
            if (typeof options.params === 'object') {
                url = `${url}?${stringify(options.params)}`
            }
        }
        fetch(`${getService(options.serviceName)}${url}`, initial).then(response => response.json()).then(responseJson => {
            const {data, success} = responseJson;
            if (success !== undefined) {
                if (success) {
                    resolve(data);
                } else {
                    reject(responseJson);
                }
            } else {
                resolve(responseJson);
            }
        }).catch(e => {
            reject(e);
        });
    }));


};

export const get = (url: string, options?: options) => {
    return request(url, {...options, method: 'GET'})
}

export const post = (url: string, options: options) => {
    return request(url, {...options, method: 'POST'})
}
export const put = (url: string, options: options) => {
    return request(url, {...options, method: 'PUT'})
}
export const del = (url: string, options: options) => {
    return request(url, {...options, method: 'DELETE'})
}

