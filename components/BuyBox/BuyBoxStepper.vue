<template>
    <div>
        <!-- stepper tabs -->
        <BuyBoxStepperTabs />
        <!-- stepper content -->
        <Transition name="list" v-if="currentStep.name == 'console'">
            <BuyBoxStepperConsole :platformList="platformsList" />
        </Transition>
        <Transition name="list" v-else-if="currentStep.name == 'method'">
            <BuyBoxStepperMethod />
        </Transition>
        <Transition name="list" v-else-if="currentStep.name == 'amount'">
            <BuyBoxStepperAmount />
        </Transition>
        <Transition name="list" v-else-if="currentStep.name == 'checkout'">
            <div>
                <BuyBoxStepperCheckout />
            </div>
        </Transition>

        <!-- <component :is="contentComponent" /> -->
    </div>
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
import { storeToRefs } from 'pinia';

const platformsList = ref([])
const getPlatformList = async () => {
    await api.get('platforms', { query_params: { 'include': 'cheapest_comfort_packet', 'with_stadia': 1 } }).then((res) => {
        platformsList.value = res.data;
        if(document.getElementById('loading-modal')) {
            document.getElementById('loading-modal').style.display="none";
        }
    });
}
const buyBoxStore = useBuyBoxStore();
const { currentStep } = storeToRefs(buyBoxStore);
onMounted(() => {
    getPlatformList();
})
// const contentComponent = resolveComponent(`BuyBoxStepper${step.value}`);
</script>