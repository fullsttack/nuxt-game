<template>
    <div>
        <div
            class="buyBox_stepper_amount nn-mx-auto nn-bg-stepper-content nn-rounded-7 nn-mt-0-5 nn-mb-2 nn-pt-2 nn-pt-md-2-5 nn-pb-2-5 nn-px-2-5 nn-px-md-11 nn-text-whiteColor">
            <!-- top label  -->
            <div class="buyBox_stepper_amount_topLabel nn-d-flex nn-justify-space-between nn-align-center nn-rounded-5">
                <div>
                    <IconGuarantee class="nn-me-2" />
                    <span>{{ $t('buybox.stages_3_days_guarantee') }} </span>
                </div>
                <div>
                    <IconPerCent class="nn-me-2" />
                    <span>{{ $t('buybox.stages_3_tax_covered') }}</span>
                </div>
            </div>
            <!-- top info  -->
            <div class="buyBox_stepper_amount_topInfo  nn-mb-7-5 nn-mb-md-5 nn-d-flex nn-justify-space-around">
                <!-- discount -->
                <div class="nn-width-95 nn-minWidth-maxContent">
                    <div class="buyBox_stepper_amount_topInfo_title nn-mb-0-5">
                        <img src="@/assets/images/icons/icon-amount-discount.svg" alt="discount icon" width="16" height="16"
                            class="nn-me-1 nn-me-md-2 discountTicket">
                        <span>{{ $t('buybox.stages_3_discount') }}</span>
                    </div>
                    <div class="buyBox_stepper_amount_topInfo_discount nn-ms-6">
                        <div class="discountSave">{{ $t('buybox.stages_3_discount_save') }}</div>
                        <div><span class="nn-me-1">{{ discountPercentage(selectedCoinPacket) }}</span>%</div>
                    </div>
                </div>
                <!-- coin -->
                <div class="nn-width-110 nn-minWidth-maxContent">
                    <div class="buyBox_stepper_amount_topInfo_titleCoin nn-mb-1 nn-mb-md-2-5">
                        <img src="@/assets/images/icons/icon-amount-coin.svg" alt="coin icon" width="34" height="34"
                            class="nn-me-1 nn-me-md-2">
                        <span>{{ $t('buybox.stages_3_coins') }}</span>
                    </div>
                    <div class="buyBox_stepper_amount_topInfo_coin">
                        {{ formatNumber(selectedCoinPacket?.coins) }}
                    </div>
                </div>
                <!-- delivery -->
                <div class="nn-width-110 nn-width-md-149 nn-minWidth-maxContent">
                    <div class="buyBox_stepper_amount_topInfo_title nn-mb-0-5">
                        <IconDelivery class="nn-me-1 nn-me-md-2" />
                        <span>{{ $t('buybox.stages_5_mob_tab') }}</span>
                    </div>
                    <div class="buyBox_stepper_amount_topInfo_discount nn-ms-6">
                        <div class="discountSave">{{ $t('buybox.stages_3_delivery_about') }}</div>
                        <div>
                            <span>{{ selectedCoinPacket?.delivery_time }}</span>
                        </div>
                    </div>
                </div>
                <!-- price -->
                <!-- <div class="nn-width-95 nn-minWidth-maxContent">
                    <div class="buyBox_stepper_amount_topInfo_title nn-mb-0-5">
                        <img src="@/assets/images/icons/icon-amount-price.svg" alt="price icon" width="20" height="12"
                            class="nn-me-1 nn-me-md-2">
                        <span>{{ $t('buybox.stages_3_price') }}</span>
                    </div>
                    <div class="buyBox_stepper_amount_topInfo_price nn-text-gray3 ">
                        <span>{{ selectedCoinPacket?.price }} {{ selectedCoinPacket?.currency_symbol }}</span>
                    </div>
                </div> -->
            </div>
            <!-- range slider  -->
            <BuyBoxStepperAmountSlider />
            <!-- bottom info  -->
            <!-- <div class="buyBox_stepper_amount_bottomInfo nn-d-flex nn-justify-center nn-align-center">
                <img src="@/assets/images/icons/icon-amount-pig.svg" alt="save price icon" width="26" height="22"
                    class="nn-me-2-5">
                <div class="nn-me-2">{{ $t('buybox.stages_3_save') }}</div>
                <div class="savePrice nn-px-2 nn-py-0-5 nn-bg-whiteColor nn-text-green1 nn-rounded-md-7">{{
                    selectedCoinPacket?.bonus }} {{ selectedCoinPacket?.currency_symbol }} </div>
            </div> -->
            <!-- stepper button  -->
            <BuyBoxStepperButton :text="$t('buybox.stages_3_chekout')" @button-clicked="selectAmount" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
import { storeToRefs } from 'pinia';

const buyBoxStore = useBuyBoxStore();
const { setSelectedCoinPacket, setCurrentStep, setSelectedAmount } = buyBoxStore;
const { coinPackets, selectedCoinPacket } = storeToRefs(buyBoxStore);

const selectAmount = () => {
    setSelectedAmount();
    setCurrentStep({ id: 4, name: "checkout" });
};

const formatNumber = (value: number) => {
    if (value >= 1000000) {
        return (value / 1000000) + "M";
    } else {
        return (value / 1000) + "k";
    }
};

const discountPercentage = (selectedCoinPacket: object) => {
    return Math.round(selectedCoinPacket?.bonus / selectedCoinPacket?.price * 100);
};

const isBreakPointSm = ref(true);
const setBreakPoint = () => {
    isBreakPointSm.value = window.innerWidth < 768;
}
onMounted(() => {
    setBreakPoint();
})

</script>
<style lang="">
    
</style>