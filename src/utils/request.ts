import axios from 'axios'
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
} from 'axios'

import jsonpAdapter from 'axios-jsonp';

// import { useUserInfoStore } from '~/stores'

type SimpleType = string | number | boolean;
type JSONObject = { [index: string]: SimpleType };

export interface ResponseData<T = JSONObject | Array<SimpleType>> {
    succ: boolean;
    msg?: string;
    result: T;
}

class Request {

    private baseConfig: CreateAxiosDefaults;

    private instance: AxiosInstance;

    // 存放取消请求控制器Map
    private abortControllerMap: Map<string, AbortController>;

    // 存放防止重复提交的地址map
    private lockControllerMap: Map<string, boolean>;

    constructor(baseConfig: CreateAxiosDefaults) {
        this.instance = axios.create(baseConfig);

        this.abortControllerMap = new Map();
        this.lockControllerMap = new Map();

        this.baseConfig = baseConfig;

        // 请求拦截器
        this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {

            // if (config.url !== '/login') {
            //     const token = useUserInfoStore.getState().userInfo?.token
            //     if (token) config.headers!['x-token'] = token
            // }

            // 是jsonp
            if (this.baseConfig.adapter) {
                config.url = (this.baseConfig.baseURL || '') + config.url;
            }

            if (this.lockControllerMap.get(config.url as string)) {
                // throw `${config.url} 请求还未返回`;

                throw Object.assign(
                    new Error(`${config.url} 请求还未返回`),
                    { succ: false }
                );
            }

            // ajax操作才有防止重复提交和阻拦请求
            if (!this.baseConfig.adapter) {
                const controller = new AbortController();
                const url = config.url || '';
                config.signal = controller.signal;
                this.abortControllerMap.set(url, controller);

                this.lockControllerMap.set(config.url as string, true);
            }

            return config;
        }, Promise.reject);

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {

                const data = response.data as ResponseData;

                if (!this.baseConfig.adapter) {
                    const url = response.config.url || '';

                    this.abortControllerMap.delete(url);
                    this.lockControllerMap.delete(url);
                }

                if (!data.succ) {
                    return Promise.reject(response);
                }

                return response;
            },
            (err) => {

                console.log(err.stack);

                return {
                    data: {
                        succ: false,
                        msg: err.message,
                        result: {}
                    }
                };
            }
        )
    }

    // 取消全部请求
    cancelAllRequest() {

        this.abortControllerMap.forEach((controller) => {
            controller.abort()
        });

        this.abortControllerMap.clear()
    }

    // 取消指定的请求
    cancelRequest(url: string | string[]) {

        const urlList = Array.isArray(url) ? url : [url]

        urlList.forEach((urlItem) => {
            this.abortControllerMap.get(urlItem)?.abort();
            this.abortControllerMap.delete(urlItem);
        });

        // for (const _url of urlList) {
        //     this.abortControllerMap.get(_url)?.abort()
        //     this.abortControllerMap.delete(_url)
        // }
    }

    request<T>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config)
    }

    async get<T>(url: string, data?: JSONObject, config?: AxiosRequestConfig): Promise<ResponseData<T>> {

        if (data) {

            const param: string[] = [];

            url += '?';

            Object.keys(data).forEach((key) => {
                param.push(`${key}=${data[key]}`);
            });

            url += param.join('&');
        }

        const ret = await this.instance.get<ResponseData<T>>(url, config);

        return ret.data;

        // return this.instance.get(url, config)
    }

    async post<T>(url: string, data?: JSONObject, config?: AxiosRequestConfig): Promise<ResponseData<T>> {

        const ret = await this.instance.post(url, data, config);

        return ret.data;
    }
}

console.log(__DEBUG, __CDN_PATH);

export const ajaxClient = new Request({
    timeout: 20 * 1000,
    baseURL: 'https://a.game.163.com'
})

export const jsonpClient = new Request({
    timeout: 20 * 1000,
    baseURL: 'https://sixhorse.game.163.com',
    adapter: jsonpAdapter
});