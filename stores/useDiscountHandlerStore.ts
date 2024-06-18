import {defineStore} from "pinia";
import {ref} from "vue";
interface dicountVal {
    code:string,
    expire:number
}

export const useDiscountHandlerStore = defineStore('DiscountHandlerStore', () => {
    const discount = ref<dicountVal>({
        code:'',
        expire:0
    });
    const setDiscount = (code:string) => {
        const time = new Date();
        time.setHours(time.getHours() + 24);
        discount.value = {
            code:code,
            expire:time.getTime()
        }
    }
    const getDiscount = () => {
        if(discount.value.expire === 0){
            return null;
        }else{
            const currentts = new Date().getTime();
            if(discount.value.expire < currentts){
                discount.value = {
                    code:'',
                    expire:0
                }
                return null;
            }else{
                return discount.value.code;
            }
        }
    }
    return {
        discount,
        getDiscount,
        setDiscount
    }
},{persist:true});