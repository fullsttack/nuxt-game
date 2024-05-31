import {useRoute, useRuntimeConfig,} from "#app";
import {getResultFromErrorRequest} from "~/composables/request_helpers";

async function do_request(method: string, url: string, postData: {}) {
    // console.log('SSR blog', method, url)
    var _baseurl = useRuntimeConfig().public.BLOG_BASE_URL + 'api';
    var lang_code =  useRoute().params.lang;
    lang_code = lang_code == '' || lang_code == undefined ? 'EN' : lang_code.toString().toUpperCase();
    lang_code = lang_code == 'EN' ? 'EN-US' : lang_code;
    lang_code = lang_code == 'PT' ? 'PT-PT' : lang_code;
    var Options = {
        method: method,
        baseURL: _baseurl,
        server:true,
        immediate:true,
        transform: function (DataT){
            return DataT;
        },
        headers:{
            lang: lang_code
        },
        onResponseError({ request, response, options }) {
            // { status: 401, message: 401, description: 'Unauthorized' }
            const error_res = getResultFromErrorRequest({response})
            console.log('SSR blog error', url, error_res)
        },
    };
    if(method === 'POST'){
        Options = {...Options,body:postData}
    }
    // console.log(_baseurl + url);
    return await useFetch(url,Options);
}
export const blogapi = {
    get: async (url: string) => {
        var {data, pending, error} = await do_request('GET',url,{});
        if(error.value) {
            throw createError({ statusCode: 500, statusMessage: 'Server error' })
        }
        return data.value;
    },
    post: async (url: string,pdata:{}) => {
        var {data, pending, error} = await do_request('POST',url,pdata);
        if(error.value) {
            throw createError({ statusCode: 500, statusMessage: 'Server error' })
        }
        return data.value;
    }
}