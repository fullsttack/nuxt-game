export const useAlertStore = defineStore('alert_store', {
    state() {
        return {
        hidded_alerts: [],
        }
    },
    persist: {
        enabled: true,
        // Exclude the functions from persistence
        exclude: ['add2Hide'],
    },
    getters: {
        getHidedStores(state) {
            return state.hidded_alerts;
        }
    },
    actions: {
        add2Hide(a) {
            this.hidded_alerts.push(a);
        },
    },
});