import {Ref} from "vue";
import {api} from "~/composables/api"
import {api_affiliate} from "~/composables/api_affiliate";
import {useAffiliateStore} from "~/stores/affiliateStore";
import useUtils from "~/composables/useUtils";
import {t} from "~/plugins/i18n";
import {getLocaleRoutePath} from "~/plugins/i18n";
import {useRouter} from "#app";

export function useAuthAffiliate() {
    const affiliate = useAffiliateStore()
    const {isValidEmail} = useUtils();

    const loginAffiliate = async (email: string, password: string, processing: Ref|null = null) :Promise<string> => {
        return await api_affiliate.post('affiliate/login', {body_params: {email, password}, progress_ref: processing}).then(async (res) => {
            affiliate.setAccessToken(res.data.token)
            return await getMeAffiliate()
        }).catch(e => {
            return e.description
        })
    }

    const sendResetLinkAffiliate = async (email: string, processing: Ref|null = null) :Promise<string> => {
        if (!isValidEmail(email)) {
            return t('validation.email', {attribute: 'email'})
        }
        return await api.post('affiliate/password/forgot-password', {body_params: {email},progress_ref: processing}).then(async (res) => {
            return res.data.message;
        }).catch(e => {
            return e.description
        })
    }
    const resetPasswordAffiliate = async (email: string, password: string, token: string, processing: Ref|null = null) :Promise<string> => {
        return await api.post('affiliate/password/reset', {body_params: {email,password,token},progress_ref: processing}).then(async (res) => {
            return res.data.message;
        }).catch(e => {
            return e.description
        })
    }

    const logoutAffiliate = async () => {
        await api_affiliate.post('affiliate/logout')
        affiliate.remove()
        affiliate.removeAccessToken()
        const router = useRouter()
        router.push(getLocaleRoutePath('affiliate'))
    }

    const getMeAffiliate = async () => {
        return await api_affiliate.get('affiliate/me').then(res => {
            affiliate.set(res.data)
            return ''
        }).catch(e => {
            affiliate.removeAccessToken()
            return e.description
        })
    }

    const registerAffiliate = async (form: object, processing: Ref|null = null) :Promise<string> => {
        if (!isValidEmail(form.email)) {
            return t('validation.email', {attribute: 'email'})
        }
        return await api.post('affiliate/register', {
            body_params: form,
            progress_ref: processing
        }).then(async (res) =>  {
            affiliate.setAccessToken(res.data.token)
            return await getMeAffiliate()
        }).catch(e => {
            affiliate.removeAccessToken()
            return e;
        })
    }

    return {loginAffiliate, registerAffiliate, logoutAffiliate, sendResetLinkAffiliate, resetPasswordAffiliate}
}