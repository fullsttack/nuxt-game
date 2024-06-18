<template>
    <div class="buyBox_stepper_checkout_pay">
        <div class="payMethod">
            <div v-for="(payMethod, index) in payMethods" :key="index">
                <div 
                class="payMethod_card nn-d-flex nn-justify-space-between nn-align-center nn-cursor-pointer nn-hover110"
                :class="{'payMethod_card_active': selectedPayMethod?.id === payMethod?.id}"
                @click="selectPayMethod(payMethod)">
                    <div class="nn-d-flex">
                        <div class="nn-me-2-5 nn-me-md-4 nn-d-flex nn-align-center">
                            <div class="customRadioButton">
                                <div class="customRadioButton_active" v-if="selectedPayMethod?.id === payMethod?.id"></div>
                            </div>
                        </div>
                        <div class="payMethod_card_titleContainer nn-row nn-align-center nn-text-start">
                            <div class="payMethod_card_title nn-col-12 nn-col-md-6">
                                {{ payMethod?.title_text }}
                            </div>
                            <div class="payMethod_card_subtitle nn-col-12 nn-col-md-6">
                                {{ payMethod?.fee_percent }} % {{ $t('buybox.stages_4_fee') }}
                            </div>
                        </div>
                    </div>
                    <div class="payMethod_card_img">
                        <img :src="payMethod?.img_url" :alt="payMethod?.name">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
import { useCheckOutCardStore } from '@/stores/checkOutCard';
import { storeToRefs } from 'pinia';

const buyBoxStore = useBuyBoxStore();
const { setSelectedPayMethod } = buyBoxStore;
const { payMethods, selectedPayMethod } = storeToRefs(buyBoxStore);

const checkOutCardStore = useCheckOutCardStore();
const { setOpenedAccordion } = checkOutCardStore;

const selectPayMethod = (payMethod:object) => {
    setSelectedPayMethod(payMethod);
    setOpenedAccordion(3);
}
</script>