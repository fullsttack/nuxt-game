<template>
    <div class="buyBox_stepper_console nn-mx-auto nn-width-340 nn-width-md-542">
        <div class="nn-row nn-gap-4 nn-gap-md-8">
            <div v-for="(platform, index) in platformList" :key="index" class="nn-col-6 nn-col-md-6">
                <div @click="selectPlatform(platform)" :class="`nn-bg-${platform.name}`"
                    class="buyBox_stepper_console_box nn-cursor-pointer nn-row nn-align-center nn-justify-center nn-mb-2 nn-width-166 nn-height-118 nn-width-md-262 nn-height-md-164 nn-rounded-7">
                    <div class="nn-text-center nn-mb-7" :class="platform.name === 'xbox' ? 'nn-mb-md-8' : 'nn-mb-md-10'">
                        <div>
                            <img :src="platform.img" :alt="`${platform.name} icon`" width="45" height="45"
                                class="nn-width-md-58 nn-height-md-58">
                        </div>
                        <div :class="platform.name === 'xbox' ? 'nn-mt-1-5 nn-mt-md-2-5' : 'nn-mt-1 nn-mt-md-2'">
                            <img :src="platform.img2" :alt="`${platform.name} icon name`" 
                            :width="platform.name == 'ps4' ? 105 : platform.name == 'xbox' ? 82 : platform.name == 'pc' ? 28 : 59"
                            :height="platform.name == 'ps4' ? 16 : platform.name == 'xbox' ? 26 : platform.name == 'pc' ? 16 : 11"
                            >
                        </div>
                    </div>
                    <div class="buyBox_stepper_console_box_badge nn-rounded-3 nn-d-flex nn-justify-center nn-align-center">
                        <IconCoinGold class="nn-pe-1-5" :width="isBreakPointSm ? '22' : '27'" :height="isBreakPointSm ? '22' : '27'" />
                        <span class="nn-pe-1">{{ platform?.cheapest_comfort_packet.data.coins/1000 }}K {{ $t('buybox.stages_1_from') }} </span>
                        <span class="badgePrice">
                             {{ platform?.cheapest_comfort_packet.data.price_with_bonus}}{{ platform?.cheapest_comfort_packet.data.currency_symbol }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';

const props = defineProps({
    platformList: Array,
});

const isBreakPointSm = ref(true);
const setBreakPoint= () => {
    isBreakPointSm.value = window.innerWidth < 768;
}

const buyBoxStore = useBuyBoxStore();
const { setCurrentStep, setSelectedPlatform } = buyBoxStore;

const selectPlatform = (platform:object) => {
    setSelectedPlatform(platform);
    setCurrentStep({id:2, name:"method"});
};

onMounted(() => {
    setBreakPoint();
})
</script>