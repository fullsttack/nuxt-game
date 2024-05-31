<template>
    <div class="nn-d-flex nn-justify-center">
        <div
            class="buyBox_stepper_tabs nn-d-flex nn-justify-space-around nn-align-center nn-mb-1-5 nn-mb-md-2 nn-bg-neutral1 nn-rounded-6">
            <div v-for="(step, index) in steps" :key="index"
                @click="callResetNextSteps({ id: step.id, name: step.name, active: step.active })"
                :class="[currentStep.id === step.id && step.id !== 4 ? 'nn-bg-selectedTab nn-text-whiteColor' : step.active ? `${step.activeColor} ${step.activeBgColor} nn-tab-active` : 'nn-bg-none']"
                class="buyBox_stepper_tabs_tab nn-pt-1-5 nn-pt-md-1 nn-width-64 nn-height-44 nn-width-md-100 nn-height-md-58 nn-rounded-6 nn-text-whiteColor">
                <div :class="{ 'active-console-tab': step.active && step.id === 1 }"
                    class="nn-d-flex nn-justify-center nn-align-center nn-mb-0-5 nn-mb-md-1 nn-height-18 nn-height-md-30">
                    <span v-if="currentStep.id === step.id">
                        <img :src="step.imgUrl" alt="payment method icons" 
                        class="buyBox_stepper_tabs_tab_imgUrl nn-mb-n0-5 nn-mb-md-n1" v-if="currentStep.id === 4 && step.active">
                        <img :src="`/icons/icon-step-${step.icon}-selected.svg`" alt="stepper icons" width="30" height="18"
                        class="nn-width-md-44 nn-height-md-30" v-else>

                    </span>
                    <img :src="`/icons/icon-step-${step.icon}.svg`" alt="stepper icons" width="30" height="18 "
                        class="nn-width-md-44 nn-height-md-30" v-else>
                    <span v-if="step.id === 3 && step.active && !(currentStep.id === step.id)" class="nn-mt-2">{{
                        formatNumber(selectedCoinPacket.coins) }}</span>
                </div>
                <div class="nn-text-center" v-if="step.name === 'console'">{{ t('buybox.stages_1_mob_tab') }}</div>
                <div class="nn-text-center" v-else-if="step.name === 'method'">{{ t('buybox.stages_2_mob_tab') }}</div>
                <div class="nn-text-center" v-else-if="step.name === 'amount'">{{ t('buybox.stages_3_mob_tab') }}</div>
                <div class="nn-text-center" v-else-if="step.name === 'checkout'">{{ t('buybox.stages_4_mob_tab') }}</div>
                <div class="nn-text-center" v-else-if="step.name === 'delivery'">{{ t('buybox.stages_5_mob_tab') }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { t } from "~/plugins/i18n";
import { useBuyBoxStore } from '@/stores/buyBox';
import { storeToRefs } from "pinia";

import { useCheckOutCardStore } from '@/stores/checkOutCard';
const checkOutCardStore = useCheckOutCardStore();
const { setOpenedAccordion } = checkOutCardStore;

const buyBoxStore = useBuyBoxStore();

const { steps, currentStep, selectedCoinPacket } = storeToRefs(buyBoxStore);
const { resetNextSteps } = buyBoxStore;

const callResetNextSteps= (stepInformation: object) => {
    resetNextSteps(stepInformation);
    if(stepInformation.id <= 4) {
        // for step4 (checkout) reset open accordion as well
        setOpenedAccordion(2);
    }
};

const formatNumber = (value: number) => {
    if (value >= 1000000) {
        return (value / 1000000) + "M";
    } else {
        return (value / 1000) + "k";
    }
};

</script>