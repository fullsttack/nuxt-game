import {useUserStore} from "~/stores/userStore";
import {useAffiliateStore} from "~/stores/affiliateStore";
import {MiddleWareSSRRequest} from "~/composables/MiddleWareSSRRequest";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // console.log('10.load_user.global.js', to.name)
    if (!to.name) {
        return false
    }
    if(to.fullPath !== '/') {
        if (to.fullPath.substring(to.fullPath.length - 1, to.fullPath.length) === '/') {
            return {path: to.fullPath.substring(0, to.fullPath.length - 1)}
        }
    }

    const use_affiliate_requests = ['lang-affiliate-login', 'lang-affiliate-dashboard'].includes(String(to.name))
    const user = use_affiliate_requests ? useAffiliateStore() : useUserStore()
    const cookie = useCookie(use_affiliate_requests ? 'access_token_affiliate' : 'access_token')
    if(cookie.value !== '' || !cookie.value) {
        user.setAccessToken(cookie.value)
    }
    //console.log('01.load_affiliate.global.js', user.id, cookie.value)

    if (user.email || !cookie.value) {
        return
    }
    //console.log("-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-")
    let res = await MiddleWareSSRRequest.get(use_affiliate_requests ? 'affiliate/me' : 'me', use_affiliate_requests)
    if (!res) {
        //user.remove()
        //user.removeAccessToken()
        return
    }
    user.set(res.data)


})