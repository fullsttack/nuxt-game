import {Ref} from "vue";
import {api} from "~/composables/api"
import {useUserStore} from "~/stores/userStore";
import useUtils from "~/composables/useUtils";
import {t} from "~/plugins/i18n";
import {getLocaleRoutePath} from "~/plugins/i18n";
import {useRouter} from "#app";
import {useCommonStore} from "~/stores/commonStore";


export function useAuth() {
    const user = useUserStore()
    const commonStore = useCommonStore();
    const {isValidEmail} = useUtils();

    const login = async (email: string, password: string, processing: Ref|null = null) :Promise<string> => {
        // if (!isValidEmail(email)) {
        //     return t('validation.email', {attribute: 'email'})
        // }
        return await api.post('login', {body_params: {email, password}, progress_ref: processing}).then(async (res) => {
            setCookies(res.data.token, res.data.ca_session)
            user.setAccessToken(res.data.token)
            commonStore.resetLanguageChanged();
            return await getMe()

        }).catch(e => {
            return e.description
        })
    }

    const sendResetLink = async (email: string, processing: Ref|null = null) :Promise<string> => {
        if (!isValidEmail(email)) {
            return t('validation.email', {attribute: 'email'})
        }
        return await api.post('password/forgot-password', {body_params: {email},progress_ref: processing}).then(async (res) => {
            return res.data.message;
        }).catch(e => {
            return e.description
        })
    }
    const resetPassword = async (email: string, password: string, token: string, processing: Ref|null = null) :Promise<string> => {
        return await api.post('password/reset', {body_params: {email,password,token},progress_ref: processing}).then(async (res) => {
            return res.data.message;
        }).catch(e => {
            return e.description
        })
    }

    const logout = async () => {
        await api.post('logout')
        user.removeAccessToken()
        user.remove()
        const router = useRouter()
        router.push(getLocaleRoutePath(''))
    }

    const getMe = async () => {
        return await api.get('me').then(res => {
            if(res.data.blocked_at !== null) {
                api.post('logout')
                user.removeAccessToken()
                user.remove()
                const router = useRouter()
                router.push({path: getLocaleRoutePath('login'),query:{blocked:1}})
            }else{
                user.set(res.data)
                return ''
            }

        }).catch(e => {
            user.removeAccessToken()
            return e.description
        })
    }

    //todo check referal_site, ref_code
    const register = async (email: string, password: string, platform_name: string, processing: Ref|null = null) :Promise<string> => {
        if (!isValidEmail(email)) {
            return t('validation.email', {attribute: 'email'})
        }
        return await api.post('register', {
            body_params: {
                email,
                password,
                platform_name,
                referal_site: 'https://www.google.com',
                /*ref_code: ''*/
            },
            progress_ref: processing
        }).then(async (res) =>  {
            setCookies(res.data.token, res.data.ca_session)
            user.setAccessToken(res.data.token)
            // var u = await getMe()
            // if(user.isUserLogined && user.email_verified_at === null){
            //     await api.post('email/verification-notification', {
            //         body_params: {},
            //         progress_ref: processing
            //     })
            // }
            // return u;
            return await getMe();
        }).catch(e => {
            user.removeAccessToken()
            return e.description
        })
    }

    const registerGuest = async (platform_name: string, processing: Ref|null = null) :Promise<string> => {
        return await api.post('register_guest', {
            body_params: {
                platform_name,
                referal_site: 'https://www.google.com',
                /*ref_code: ''*/
            },
            progress_ref: processing
        }).then(async (res) =>  {
            setCookies(res.data.token, res.data.ca_session)
            user.setAccessToken(res.data.token)
            user.guest_password = res.data.password
            return await getMe()
        }).catch(e => {
            user.removeAccessToken()
            return e.description
        })
    }


    const setCookies = (token: string, ca_session: string) => {
        if (!process.client) {
            return
        }
        // if (ca_session) {
        //     document.cookie = 'ca_session=' + ca_session + ';domain=.whatsgaming.net;SameSite=Strict;Path=/;'
        // }
        document.cookie = 'awg_token=' + token + ';domain=.whatsgaming.net;SameSite=Strict;Path=/;'
    }

    return {login, logout, register, registerGuest,sendResetLink, resetPassword, setCookies}
}