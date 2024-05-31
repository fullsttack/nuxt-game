import {getLocaleRoutePath} from "~/plugins/i18n";
import {SSRRequest} from "~/composables/SSRRequest";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const route = to;//useRoute();
    if (!['lang-payment-fail-id', 'lang-payment-success-id'].includes(String(route.name))) {
        return
    }
    let res = await SSRRequest.get(`invoices/find/${route.params.id}`)
    if (!res) {
        throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }
    if (!res.data.viewed_on_success_page_at) {
        return
    }
    // const redirect_to = 'https://whatsgaming.net/' + (res.data.type === 'Comfort Trade' ? 'comfort' : 'auction/panel')
    // //return navigateTo(redirect_to, { external: true })
    // return getLocaleRoutePath((res.data.type === 'Comfort Trade' ? 'comfort' : 'auction/panel'));
})