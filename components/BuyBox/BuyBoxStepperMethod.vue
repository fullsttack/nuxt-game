<template>
    <div class="nn-mt-2-5 nn-text-whiteColor">
        <div class="buyBox_stepper_method nn-mb-3 nn-d-flex nn-bg-stepper-content" @click="selectMethod('comfort')"
            v-if="selectedPlatform?.enabled_comfort_buy_coins">
            <div class="buyBox_stepper_method_badge">
                <img src="~/assets/images/badge-recommended.svg" alt="recommended badge" width="82" height="82">
            </div>
            <div class="buyBox_stepper_method_badgeText">{{ $t('buybox.recommended') }}</div>
            <div class="buyBox_stepper_method_icon">
                <img src="~/assets/images/icons/icon-method-comfort-trade-black.svg" alt="comfort trad method icon"
                    width="21" height="21">
            </div>
            <div class="nn-text-start">
                <h4>{{ $t('buybox.stages_1_comfort_title') }}</h4>
                <div class="buyBox_stepper_method_caption nn-mb-0-5 nn-mb-md-2-5">{{ $t('buybox.stages_1_comfort_desc') }}</div>
                <div class="buyBox_stepper_method_caption">
                    {{ $t('buybox.stages_2_title') }} 
                    <IconArrowRight width="6" :class="{'rotate-180': isRtl()}" />
                </div>
            </div>
        </div>
        <div class="buyBox_stepper_method nn-bg-stepper-content" @click="selectMethod('auction')"
            v-if="selectedPlatform?.enabled_auction_buy_coins">
            <div class="buyBox_stepper_method_icon">
                <img src="~/assets/images/icons/icon-method-player-auction-black.svg" alt="comfort trad method icon"
                    width="21" height="21">
            </div>
            <div class="nn-text-start">
                <h4>{{ $t('buybox.stages_1_auction_title') }}</h4>
                <div class="buyBox_stepper_method_caption nn-mb-0-5 nn-mb-md-2-5">{{ $t('buybox.stages_1_auction_desc') }}</div>
                <div class="buyBox_stepper_method_caption">
                    {{ $t('buybox.stages_2_title') }} 
                    <IconArrowRight width="6" :class="{'rotate-180': isRtl()}" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
const buyBoxStore = useBuyBoxStore();
const { selectedPlatform, setCoinPackets, setSelectedMethod, setCurrentStep } = buyBoxStore;

const { isRtl } = useUtils();
const selectMethod = async (type: string) => {
    const platform_name = selectedPlatform.name ==='stadia' ? 'ps4' : selectedPlatform.name;
    await api.get('buy_coins/get_coin_packets', { query_params: { platform_name, type } }).then((res) => {
        setCoinPackets(res.data);
        setSelectedMethod(type);
        setCurrentStep({ id: 3, name: "amount" });
    });
}


</script>
<style lang="scss"></style>