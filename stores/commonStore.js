export const useCommonStore = defineStore('common_store', {
    state() {
        return {
            selectedCurrency: 'EUR',
            selected_language:'',
            islanguageChanged:false,
            blogLocalizationPaths: {},
            CChanged:false,
            authpopup:false
        }
    },
    persist: {
        enabled: true,
        // Exclude the functions from persistence
        exclude: ['setCurrency','setLanguageChanged','resetLanguageChanged'],
    },
    actions:{
        setCurrency(C){
            this.selectedCurrency = C.toUpperCase();
            this.CChanged = true;
        },
        setLanguageChanged(locale){
            this.selected_language = locale;
            this.islanguageChanged = true;
        },
        resetLanguageChanged(){
            this.islanguageChanged = false;
        },
        showAuthpopup(){
            this.authpopup  = true;
        },
        hideAuthpopup(){
            this.authpopup  = false;
        }
    }

})