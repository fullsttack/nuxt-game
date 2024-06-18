import {LOCALES_AVAILABLE, DEFAULT_LOCALE, loadLocaleMessages, getLocaleRoutePath} from '~/plugins/i18n'
import {useCommonStore} from "~/stores/commonStore";
import {pick} from "accept-language-parser";
import {useNuxtApp, useRequestEvent, useRequestHeaders} from "nuxt/app";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const commonStore = useCommonStore()
    commonStore.blogLocalizationPaths = {}
    const locale = to.params.lang?.toString() || ''
    if (locale) {
        if (!LOCALES_AVAILABLE.includes(locale)) {
            return false
        }
        await loadLocaleMessages(locale)
        return
    }

    const user = useUserStore()
    if (user.locale === DEFAULT_LOCALE) {
        await loadLocaleMessages(DEFAULT_LOCALE)
        return
    }
    let navigator_locale = ''
    if (process.server) {
        const headers = useRequestHeaders()
        navigator_locale = pick(LOCALES_AVAILABLE, headers['accept-language']);
    }
    let preferred_locale =  user.locale || navigator_locale;
    if(commonStore.islanguageChanged){
        preferred_locale = commonStore.selected_language;
    }

    if(to.name !== 'lang-blog-title') {
        if (preferred_locale !== DEFAULT_LOCALE && LOCALES_AVAILABLE.includes(preferred_locale)) {

            // if(user.email && (to.path === "/" || commonStore.CChanged)){
            //     user.ch_locale("en");
            //     return {path: to.path, query: to.query}
            // }
            return {path: getLocaleRoutePath(to.path, preferred_locale), query: to.query}
        }
    }
    await loadLocaleMessages(DEFAULT_LOCALE)
})