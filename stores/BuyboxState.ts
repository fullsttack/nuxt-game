import {ref} from "vue";
import {defineStore} from "pinia";

export const useBuyBoxState = defineStore('buyBoxState', () => {
    const productId = ref(0);

    return {
        productId
    }
},{
    persist: {
        enabled: true
    }
});