import useWGCurrency from "../composables/useWGCurrency";
export default defineNuxtPlugin(async(nuxtApp) => {
    try {
        if(process.client){
            // const wgc = useWGCurrency();
            // wgc.autoDetect();
        }
    }catch (e) {
        console.log("IPPlugin" + e);
    }
});