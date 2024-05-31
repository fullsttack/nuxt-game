
import {useCommonStore} from "../stores/commonStore";
import {api} from "../composables/api";
import {useUserStore} from "../stores/userStore";

export const currencies = ['USD', 'EUR', 'GBP', 'TRY','AED','IDR'];
export function getSelectedCurrencySymbol(){
    const commonStore = useCommonStore();
    return this.getSymbolByCurrency(commonStore.selectedCurrency);
}
export function getSymbolByCurrency(c){
    switch (c){
        case "USD":
            return '&dollar;';
        case "EUR":
            return '&euro;';
        case "GBP":
            return '&pound;';
        case "TRY":
            return "&#8378;";
        case "AED":
            return "<b>د.إ</b>";
        case "IDR":
            return "<small>Rp</small>";
        default:
            return "";
    }
}
export function getCurrencyFlag(c){
    switch (c){
        case "USD":
            return 'fi-us';
        case "EUR":
            return 'fi-eu';
        case "GBP":
            return 'fi-gb';
        case "TRY":
            return "fi-tr";
        case "AED":
            return "fi-ae";
        case "IDR":
            return "fi-id2";
        default:
            return "";
    }
}

export function autoDetect (){
    const commonStore= useCommonStore();
    const user = useUserStore()
    let detected_currency = 'USD';
    try{
        if(!commonStore.CChanged) {
            api.get('/geolocation').then((res) => {
                //console.log(res.data);
                if (currencies.includes(res.data.currency)) {
                    detected_currency = res.data.currency;
                }
                commonStore.setCurrency(detected_currency);
                commonStore.$persist()
                if (user.email) {
                    api.post(`account/change_currency/${detected_currency}`)
                }
            });
        }
    }catch (e){

    }

}
export default useWGCurrency => ({
    currencies,getSelectedCurrencySymbol,getSymbolByCurrency,getCurrencyFlag,autoDetect
});