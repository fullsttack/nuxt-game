<template>
  <section class="heroSection nn-mb-8 nn-mb-md-0" loading="lazy">
    <div class="nn-row nn-justify-center">
      <div class="nn-mt-17-5 nn-mt-md-30 nn-text-whiteColor">
        <template v-if="showFontDesign">
          <h1 class="heroSection_title">
            <span>{{ $t('home.title_1') }}</span>
            <div class="heroSection_subtitle nn-mb-31 nn-mb-md-2 nn-d-flex nn-align-center">
              <IconHeroArrowRight class="nn-me-2-5 nn-me-md-2" :class="{ 'rotate-180': isRtl() }"
                                  :width="isBreakPointSm ? '40' : '56'" :height="isBreakPointSm ? '26' : '38'" />
              <span>&nbsp;{{ $t('home.title_2') }}</span>
            </div>
          </h1>
        </template>
        <template v-else>
          <h1>{{ $t('home.title_1') }} {{ $t('home.title_2') }}</h1>
        </template>
        <div class="heroSection_trust nn-mb-md-4-5" v-if="!isBreakPointSm">
          <NuxtLink to="https://www.trustami.com/review/whatsgaming-net-rating" target="_blank"
                    class="nn-text-whiteColor">
            <div>
              <IconTrustami />
            </div>
            <div>
              <IconRateStars />
            </div>
            <div>
              75,519 Reviews - 99.90% Positive
            </div>
          </NuxtLink>
        </div>
        <div class="nn-row nn-justify-center">
          <div class="heroSection_button">
            <div class="nn-d-flex nn-justify-center">
              <div class="heroSection_button_info nn-mb-3-5 nn-mb-md-7 nn-width-min">
                <IconCurvyArrow class="heroSection_button_info_icon" :width="isBreakPointSm ? '67' : '85'"
                                :height="isBreakPointSm ? '49' : '62'" />
                <button @click="faqBtn"
                        class="nn-bg-neutral0 nn-width-196 nn-width-md-236 nn-height-42 nn-height-md-56 nn-hover120">
                  <!-- {{ $t('fifa.how_it_works') }} -->
                  {{ $t('faq.title') }}
                </button>
              </div>
            </div>
            <div class="heroSection_button_buy">
              <NuxtLink no-prefetch :to="urlwithLocal('fc-coins/fc-24-coins')">
                <button
                    class="nn-bg-primary1 nn-width-360 nn-width-md-476 nn-height-46 nn-height-md-62 nn-hover110">
                  <span class="nn-me-4">{{ $t('messages.buy_coins') }}</span>
                  <IconCoinGold />
                </button>

              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- hero trustami banner  -->
    <BuyBoxBanner />
  </section>
</template>

<script setup lang="ts">
import useUtils, { urlwithLocal } from "~/composables/useUtils";
import useDiscountHandler from "~/composables/useDiscountHandler";
import IconHeroArrowRight from "~/components/Icon/IconHeroArrowRight.vue";
import {nextTick, ref} from "vue";
const { isRtl } = useUtils();
const {handleDiscount} = useDiscountHandler();
const showFontDesign = ref(false);
const emit = defineEmits(['goTo-faq'])
const faqBtn = () => {
  emit('goTo-faq');
}

const isBreakPointSm = ref(true);
const setBreakPoint = () => {
  isBreakPointSm.value = window.innerWidth < 768;
}
onMounted(() => {
  setBreakPoint();
  handleDiscount();
  nextTick(()=>{
    showFontDesign.value = true;
  })
})
</script>
<style scoped>
/*@media(max-width: 900px){*/
/*  .heroSection_title{*/
/*    padding-left: 8%;*/
/*  }*/
/*  .heroSection_subtitle{*/
/*    padding-left: 8%;*/
/*  }*/
/*}*/
</style>