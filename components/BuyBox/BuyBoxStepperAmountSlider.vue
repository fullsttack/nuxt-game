<template>
    <div class="buyBox_stepper_amount_slider nn-mb-11 nn-mb-md-6">
        <!-- slider input  -->
        <div class="buyBox_stepper_amount_slider_input nn-mb-8 nn-mb-md-4-5">
            <output for="amountSlider" :value="useCommaMask(selectedCoinPacket?.coins)" :style="`${isRtl() ? 'right' : 'left'}:${calculateOutputLeft}px`"></output>
            <input id="amountSlider" type="range" v-model="selectedCoinPacket.index" :step="amountSliderInfo.step"
                :min="amountSliderInfo.min" :max="amountSliderInfo.max"
                @input="setAmountSliderChanges"
                >
                <div class="sliderStep nn-d-flex nn-justify-space-between nn-mt-1 nn-mx-2">
                    <div class="sliderStep_bar safari_only">
                    </div>
                    <div v-for="(coinPacket, index) in coinPackets" :key="index" @click="setSelectedCoinPacket(index, coinPacket)">
                        <div v-if="showSliderStepValue(coinPacket)" class="sliderStep_spotStep">
                            <!-- discount ticket  -->
                            <div class="sliderStep_spotStep_discount" v-if="coinPacket.coins == 1000000">
                                <img src="@/assets/images/icons/icon-discount-2.svg" alt="discount ticket icon" width="43" height="42">
                            </div>
                            <div class="sliderStep_spotStep_discount" v-if="coinPacket.coins == 2000000">
                                <img src="@/assets/images/icons/icon-discount-4.svg" alt="discount ticket icon" width="43" height="43">
                            </div>
                            <!-- input details  -->
                            <div class="sliderStep_spotStep_spot" :class="[{'activeStep': index<= selectedCoinPacket.index}, {'currentSpot': index == selectedCoinPacket.index}]">
                            </div>
                            <div class="sliderStep_line sliderStep_longLine" :class="{'activeStep': index<= selectedCoinPacket.index}"></div>
                            <div class="sliderStep_spotStep_value">{{ formatNumber(coinPacket.coins) }}</div>
                        </div>
                        <div class="sliderStep_line" :class="{'activeStep': index<= selectedCoinPacket.index}" v-else></div>
                        <div class="discountBar"
                            :class="{'discountBar_red': coinPacket.coins >= 2000000 && index< coinPackets.length-1}"
                            :style="`width:${discountBarWidth}px`"
                            v-if="coinPacket.coins >= 1000000 && index< coinPackets.length-1" ></div>
                    </div>
                </div>
        </div>
        <!-- slider button  -->
        <div class="buyBox_stepper_amount_slider_btn nn-d-flex nn-justify-space-between nn-align-center nn-mx-3-5 nn-mx-md-5 nn-px-2-5 nn-height-36 nn-height-md-50 nn-bg-neutral1">
            <div class="btnMinus nn-d-flex nn-align-center nn-cursor-pointer" @click="decrementSlider">
                <div class="nn-d-flex">
                    <img src="@/assets/images/icons/icon-amount-slider-btn-minus.svg" alt="minus icon" width="18" height="3">
                </div>
                <div class="buyBox_stepper_amount_slider_btn_line"></div>
            </div>
            <div class="buyBox_stepper_amount_slider_btn_text">{{ useCommaMask(selectedCoinPacket?.coins) }}</div>
            <div class="btnPlus nn-d-flex nn-align-center nn-cursor-pointer" @click="incrementSlider">
                <div class="buyBox_stepper_amount_slider_btn_line"></div>
                <div class="nn-d-flex">
                    <img src="@/assets/images/icons/icon-amount-slider-btn-plus.svg" alt="plus icon" width="15" height="15">
                </div>     
            </div>
            
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue'; 

const { isRtl } = useUtils();

const buyBoxStore = useBuyBoxStore();
const { setSelectedCoinPacket } = buyBoxStore;
const { coinPackets, selectedCoinPacket } = storeToRefs(buyBoxStore);

const amountSliderInfo = ref({
    min: 0,
    max: coinPackets.value.length-1,
    step: 1
});

// const spotStep = (index:number) => {
//    return index===0 || index === coinPackets.value.length -1;
// }

const formatNumber = (value:number) => {
    if (value >= 1000000) {
       return (value/1000000) + "M";
    } else {
        return (value/1000) + "k";
    }
};

const setAmountSliderChanges= (e:object) => {
    setSelectedCoinPacket(parseInt(e.target.value), coinPackets.value[parseInt(e.target.value)]);
};

const decrementSlider = () => {
    if(selectedCoinPacket?.value.index > 0) {
        const newCoinPacketIndex= selectedCoinPacket?.value.index-1
        setSelectedCoinPacket(newCoinPacketIndex, coinPackets.value[newCoinPacketIndex]);
    }  
};
const incrementSlider = () => {
    if(selectedCoinPacket?.value.index < coinPackets?.value.length-1) {
        const newCoinPacketIndex= selectedCoinPacket?.value.index+1
        setSelectedCoinPacket(newCoinPacketIndex, coinPackets.value[newCoinPacketIndex]);
    }  
}

// computed
const calculateOutputLeft = computed(() => {
    const sliderWidth = ref(parseFloat(document.getElementById('amountSlider')?.clientWidth));
    const outputLeft = ref(parseFloat(selectedCoinPacket?.value.index * sliderWidth?.value /  amountSliderInfo.value.max));
    if(outputLeft?.value > (sliderWidth?.value)-40) {
        return sliderWidth?.value-80;
    } else if (outputLeft?.value <= 40) {
        return 0;
    } else {
        return outputLeft.value-40;
    }
});

const showSliderStepValue = (coinPacket: object) => {
    return isBreakPointSm.value ? coinPacket?.show_point_mobile : coinPacket?.show_point_desktop;
};

const discountBarWidth = ref(0);
const calcDiscountBarWidth = () => {
    const sliderWidth2 = ref(parseFloat(document.getElementById('amountSlider')?.clientWidth));
    discountBarWidth.value= sliderWidth2?.value / coinPackets.value.length;
}
const isBreakPointSm = ref(true);
const setBreakPoint= () => {
    isBreakPointSm.value = window.innerWidth < 768;
}
onMounted(() => {
    calcDiscountBarWidth();
    setBreakPoint();
})



</script>
<style></style>