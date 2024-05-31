import axios, {Method} from 'axios'
import {getResultFromErrorRequest, applyQueryParams, ApiResponse, ApiOptions} from "~/composables/request_helpers";
import {useUserStore} from "~/stores/userStore";
import {useCommonStore} from "~/stores/commonStore";

const setLocale = (value: string | null) => {
    if (!(value)) {
        return
    }
    axios.defaults.headers['locale'] = value;
}

axios.defaults.baseURL = 'https://api.whatsgaming.net/api/'
// axios.defaults.baseURL = 'http://api.fifa.loc/api/'

axios.defaults.headers['Authorization'] = 'Bearer '
axios.defaults.headers['locale'] ='en'
axios.defaults.headers['Accept'] ='application/json'
axios.defaults.headers['Content-Type'] ='application/json;charset=utf-8'

const request = (method: Method, url: string, options: ApiOptions): Promise<ApiResponse> => {
    //const cookie = useCookie('access_token')
    const userStore = useUserStore()
    const commonStore = useCommonStore()
    axios.defaults.headers['currency'] = commonStore.selectedCurrency;
    axios.defaults.headers['Authorization'] = 'Bearer ' + userStore.access_token;

    return new Promise((resolve, reject) => {
        if (typeof options.progress_obj === 'object') {
            options.progress_obj.progress = true
        }
        if (options.progress_ref && typeof options.progress_ref === 'object') {
            options.progress_ref.value = true
        }
        url = applyQueryParams(url, options.query_params)

        axios.request({
            url,
            method,
            data: options.body_params
        }).then(response => {
            resolve(response.data);
        }).catch(e => {
            let error = getResultFromErrorRequest(e)
            if (error.status === 401) {
                commonStore.showAuthpopup();
                // const user = useUserStore()
                // user.remove()
                // user.removeAccessToken()
                // cookie.value = ''
            }
            reject(error)
        }).finally(() => {
            if (typeof options.progress_obj === 'object') {
                options.progress_obj.progress = false
            }
            if (options.progress_ref && typeof options.progress_ref === 'object') {
                options.progress_ref.value = false
            }
        })
    })
}



export const api = {
    get: async (url: string, options?: ApiOptions): Promise<ApiResponse> => {return request('get', url, options || {})},
    post: async (url: string, options?: ApiOptions): Promise<ApiResponse> => {return request('post', url, options || {})},
    put: async (url: string, options?: ApiOptions): Promise<ApiResponse> => {return request('put', url, options || {})},
    patch: async (url: string, options?: ApiOptions): Promise<ApiResponse> => {return request('patch', url, options || {})},
    delete: async (url: string, options?: ApiOptions): Promise<ApiResponse> => {return request('delete', url, options || {})},

    setLocale,
}

