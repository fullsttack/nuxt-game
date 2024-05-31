export const useBuyboxHolder = defineStore('buybox_holder', {
    state: () => {
        return {
            payment_id: '',
            product_id: ''
        }
    },
    persist: true,
    getters: {
        getPaymentId: (state) => state.payment_id,
        getProductId: (state) => state.product_id
    },
    actions: {
        setPaymentId(e){
            this.payment_id = e;
        },
        setProductId(e){
            this.product_id = e;
        }
    }
});