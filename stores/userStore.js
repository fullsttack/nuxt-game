export const useUserStore = defineStore('user', {
    // persist: {
    //     enabled: true
    // },
    state() {
        return {
        id: '',
        email: '',
        guest_password: '',
        platform_name: '',
        coins: 0,
        tbc: 0, //total bought coins
        locale: '',
        currency: '',
        country: '',
        disabled: 0,
        has_unconfirmed_invoice:false,
        loyalty_discount_current: {
            name: '',
            percent: 0,
            coins: 0,
        },
            loyalty_discount_next: {
            name: '',
            percent: 0,
            coins: 0,
        },
        access_token: '',
        email_verified_at:'',
        password_uncoded:null,
        blocked_at:null,
        auc_blocked_at:null
        }
        },

    getters: {
        isUserLogined(state) {
            return state.email !== '';
        },
        getEmail(state) {
            return state.email;
        },
        isGuestUser(state) {
            return state.email !== '' && state.password_uncoded !== null;
        },
        isUserVerified(state) {
            if (state.email !== '') {
                return state.email_verified_at !== null;
            } else {
                return true;
            }
        },
    },

    actions: {
        ch_locale(l){
            this.locale = l;
        },
        setCoin(c){
            this.coins = c;
        },
        set(user) {
            this.id = user.id
            this.email = user.email
            this.platform_name = user.platform_name
            this.coins = user.coins
            this.tbc = user.tbc
            this.locale = user.locale
            this.currency = user.currency
            this.country = user.country
            this.disabled = user.disabled
            this.loyalty_discount_current = user.loyalty_discount_current
            this.loyalty_discount_next = user.loyalty_discount_next
            this.email_verified_at = user.email_verified_at;
            this.password_uncoded = user.password_uncoded;
            this.blocked_at = user.blocked_at;
            this.auc_blocked_at = user.auc_blocked_at;
            this.has_unconfirmed_invoice = user.has_unconfirmed_invoice;
        },
        remove() {
            this.id = ''
            this.email = ''
            this.platform_name = ''
            this.coins = 0
            this.tbc = 0
            this.locale = ''
            this.currency = ''
            this.country = ''
            this.disabled = 0
            this.has_unconfirmed_invoice = false
            this.loyalty_discount_current = {
                name: '',
                percent: 0,
                coins: 0,
            }
            this.loyalty_discount_next = {
                name: '',
                percent: 0,
                coins: 0,
            }
            this.email_verified_at = '';
            this.password_uncoded = null;
            this.blocked_at = null;
            this.auc_blocked_at = null;
        },
        setAccessToken(token){
            this.access_token = token;
            const cookie = useCookie('access_token',{
                path: '/',
                secure:true,
                sameSite:'none',
                maxAge: 60 * 60 * 24 * 365 * 10 // 10 years
            })
            cookie.value = token
        },
        removeAccessToken(){
            this.access_token = '';
            const cookie = useCookie('access_token')
            cookie.value = ''
        },
        emailVerified(){
            this.email_verified_at = new Date().getTime();
        },

    }
});