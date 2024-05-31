import {useRoute} from "#app";
import {useDiscountHandlerStore} from "~/stores/useDiscountHandlerStore";
import {storeToRefs} from "pinia";
import {api} from "~/composables/api";

const handleDiscount = ()=>{
    const storage = useDiscountHandlerStore();
    const route = useRoute();
    const savedCode = storage.getDiscount();
    const code = route.query.aff_code;
    if(code !== undefined && (savedCode === null || savedCode !== code)){
        storage.setDiscount(code);
    }
}

const getDiscountCode = () => {
    const storage = useDiscountHandlerStore();
    const savedCode = storage.getDiscount();
    if(savedCode !== null) {
        api.post('affiliate/link_visit/' + savedCode, {})
    }
    return savedCode;
}

export default useDiscountHandler => ({
    handleDiscount,
    getDiscountCode
})