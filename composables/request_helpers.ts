import type { Ref } from 'vue'
export type ApiResponse = {
    data: any;
    meta: object;
}
export type ApiResponseError = {
    key: string;
    status: number|null;
    message: string;
    description: string;
}
export type ObjWithProgress = {
    progress: boolean
}
export type ApiOptions = {
    query_params?: {[x: string]: number|string|boolean}
    body_params?: {[x: string]: number|string|boolean|object}
    progress_obj?: ObjWithProgress,
    progress_ref?: Ref|null,
}

export const getResultFromErrorRequest = (e: any): ApiResponseError => {
    let res = {
        key: 'error',
        status: null,
        message: e.message,
        description: '',
        errorz:[]
    }
    if (e.response) {
        res.status = e.response.status
        res.message = e.response.status
    }
    if (e.response && e.response.data) {
        if (e.response.data.message) {
            res.message += ' ' + e.response.data.message
        }
        if (e.response.data.errors && !Array.isArray(e.response.data.errors) && typeof 'object') {
            res.key = Object.keys(e.response.data.errors)[0]
            res.description = Object.values(e.response.data.errors).map(i => {
                return (Array.isArray(i) ? i.join(' ') : i)
            }).join(' ')
            Object.entries(e.response.data.errors).map(([key, value]) => {
                if(res.errorz[key] === undefined){
                    res.errorz[key] = value[0];
                }
            });
        }
    }
    if (!res.description) {
        try {
            res.description = e.response.statusText
        }catch (e){
            res.description = "ERR";
        }
    }
    return res
}

export const applyQueryParams = (url: string, query_params?: {[x: string]: number|string|boolean}) => {
    if (url[url.length - 1] === '/') {
        url = url.substring(0, url.length - 1)
    }
    let params = [];
    for (let key in query_params) {
        if (query_params[key] !== undefined) {
            params.push(key + '=' + query_params[key])
        }
    }
    if (params.length) {
        url += '?' + params.join('&')
    }
    return url
}
