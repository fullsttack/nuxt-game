import {getLocaleRoutePath} from "~/plugins/i18n";

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserStore()
    if (!user.email) {
        return {path: getLocaleRoutePath('login')}
    }
    
})