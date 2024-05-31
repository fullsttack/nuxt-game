
export const useCheckOutCardStore = defineStore('checkOutCardStore', () => {

    // states
    const openedAccordion = ref(2);
    const globalAuthPopupStatus = ref(false);

    // actions
    function setOpenedAccordion(id:number) {
        openedAccordion.value = id;
        // localStorage.setItem('openedAccordion', JSON.stringify(openedAccordion.value));
    }
    function setAccordionDataFromLocalStorage() {
        // openedAccordion.value = JSON.parse(localStorage.getItem('openedAccordion')) || openedAccordion.value;
    };
    function setGlobalAuthPopupStatus(status:boolean) {
        globalAuthPopupStatus.value = status;
    }

    return { openedAccordion, globalAuthPopupStatus,
        setOpenedAccordion,setAccordionDataFromLocalStorage, setGlobalAuthPopupStatus
    }
}, 
// in persist mood there was some bug for saving state for buyBox 
// { persist: true }
);
