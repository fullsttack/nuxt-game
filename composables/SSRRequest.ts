import {useRoute, useRuntimeConfig} from "#app";
import {useUserStore} from "~/stores/userStore";
import {useAffiliateStore} from "~/stores/affiliateStore";
import {getResultFromErrorRequest, ApiResponse} from "~/composables/request_helpers";


export const SSRRequest = {
    get: async (url: string, use_affiliate = false) :Promise<ApiResponse|null> => {
        const headers = useRequestHeaders()
        //console.log('SSR', url, use_affiliate, headers['x-real-ip'])

        var lang_code =  useRoute().params.lang;
        lang_code = lang_code == '' || lang_code == undefined ? 'EN' : lang_code.toString().toUpperCase();
        lang_code = lang_code.toLowerCase();
        const userStore = use_affiliate ? useAffiliateStore() : useUserStore()
        var Options = {
            method: "GET",
            baseURL: useRuntimeConfig().public.API_URL + 'api',
            server:true,
            immediate:true,
            headers:{
                'X-Real-IP': headers['x-real-ip'],
                'X-Forwarded-For': headers['x-forwarded-for'],
                'locale': lang_code,
                'currency':userStore.currency,
                'Authorization': 'Bearer ' + userStore.access_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            onResponseError({ request, response, options }) {
                // { status: 401, message: 401, description: 'Unauthorized' }
                const error_res = getResultFromErrorRequest({response})
                if (![401].includes(error_res.status)) {
                    console.log('SSR error', url, error_res)
                }
            },
        };

        var {data , pending, error} = await useFetch(url,Options);
        if (error.value) {
            if (error.value?.statusCode === 401) {
                return null
            }
            if (error.value?.statusCode === 404) {
                throw createError({ statusCode: 404, statusMessage: 'Not found' })
            }
            throw createError({ statusCode: 500, statusMessage: 'Server error' + error.value?.statusCode })
        }
        return data.value;
    },
}



