export const useAffiliateStore = defineStore('affiliate', {
    state: () => ({
        id: '',
        name: '',
        email: '',
        gender: '',
        link: '',
        phone: '',
        discount_active: '',
        discount_code: '',
        balance: 0,
        percent: '',

        locale: '',
        currency: '',
        access_token: '',
        approve_status:'',
        approve_status_viewed:'',
    }),
    actions: {
        set(item) {
            this.id = item.id
            this.name = item.name
            this.email = item.email
            this.gender = item.gender
            this.link = item.link
            this.phone = item.phone
            this.discount_active = item.discount_active
            this.discount_code = item.discount_code
            this.balance = item.balance
            this.percent = item.percent
            this.approve_status = item.approve_status;
            this.approve_status_viewed = item.approve_status_viewed;
        },
        remove() {
            this.id = ''
            this.name = ''
            this.email = ''
            this.gender = ''
            this.link = ''
            this.phone = ''
            this.discount_active = ''
            this.discount_code = ''
            this.balance = 0
            this.percent = ''
            this.approve_status = '';
            this.approve_status_viewed = '';
        },
        setAccessToken(token){
            this.access_token = token;
            const cookie = useCookie('access_token_affiliate')
            cookie.value = token
        },
        removeAccessToken(){
            this.access_token = '';
            const cookie = useCookie('access_token_affiliate')
            cookie.value = ''
        },
    }
});