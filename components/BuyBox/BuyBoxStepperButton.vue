<template>
    <div class="buyBox_stepper_button nn-rounded-7" @click="submit">
        <div class="buyBox_stepper_button_total nn-rounded-5 nn-d-flex nn-align-center">
            <div class="buyBox_stepper_button_total_text nn-pe-2-5 nn-pe-md-5">{{ $t('buybox.stages_3_total') }}</div>
            <div class="buyBox_stepper_button_total_price">
                <span>{{ checkoutButtonPrices?.totalPrice }}</span>
                <span>{{ checkoutButtonPrices?.currencySymbol }}</span>
            </div>
            <div class="buyBox_stepper_button_total_finalPrice">
                <span>{{ checkoutButtonPrices?.finalPrice }}</span>
                <span>{{ checkoutButtonPrices?.currencySymbol }}</span>
            </div>

        </div>
        <IconLoading width="45" height="45" v-if="loading" />
        <div v-else>
            <span class="nn-me-2-5">{{ text }}</span>
            <img src="@/assets/images/icons/icon-stepper-button.svg"
            alt="arrow icon" width="16" height="14"
            :class="{'rotate-180':isRtl()}">
        </div>

    </div>
</template>

<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
import { storeToRefs } from 'pinia';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        default : false
    }
})

const { isRtl } = useUtils();
const buyBoxStore = useBuyBoxStore();
const { checkoutButtonPrices } = storeToRefs(buyBoxStore);

const emit = defineEmits(['button-clicked'])
const submit = () => {
  if(!props.loading) {
    emit('button-clicked');
  }
}


</script>
