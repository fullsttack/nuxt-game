<template>
    <div class="nn-pb-md-1">
        <div class="orderDetails nn-px-3 nn-py-1-5 nn-py-md-3 nn-height-265 nn-height-md-242 nn-rounded-4">
            <div class="nn-row nn-px-md-2">
                <div class="nn-col-12">
                    <div class="nn-mb-2 nn-d-flex">
                        <div class="orderDetails_title">{{ $t('buybox.summary_platform') }}</div>
                        <div class="orderDetails_value d-flex align-items-center">
                           <span v-if="orderDetails?.product">{{ orderDetails.product.coins / 1000 }}k</span>
                          <span class="mx-1">-</span>
                            <img :src="orderDetails.platform_img3" alt="platform icon" 
                            :width="isBreakPointSm ? 16 : 23" :height="isBreakPointSm ? 16 : 23"
                            class="nn-me-1-5">
<!--                            <span>{{ orderDetails?.product?.platform_name.toString().toUpperCase() }}</span>-->


                        </div>
                    </div>
<!--                    <div class="nn-mb-2 nn-d-flex">-->
<!--                        <div class="orderDetails_title">{{ $t('buybox.summary_coins') }}</div>-->
<!--                        <div class="orderDetails_value"><span v-if="orderDetails?.product">{{ orderDetails.product.coins /-->
<!--                            1000 }}k</span></div>-->
<!--                    </div>-->
                    <div class="nn-mb-2 nn-d-flex">
                        <div class="orderDetails_title">{{ $t('buybox.summary_seller') }}</div>
                        <div class="orderDetails_value">{{ orderDetails?.seller }}</div>
                    </div>
                    <div class="nn-mb-2 nn-d-flex">
                        <!-- <div class="orderDetails_title">{{ $t('buybox.summary_article') }}</div>
                        <div class="orderDetails_value">{{ orderDetails?.product?.name }}</div> -->
                        <div class="orderDetails_title">{{ $t('buybox.summary_price') }}</div>
                        <div class="orderDetails_value">
                            <span class="nn-me-0-5">{{ orderDetails?.convert_standart_price }} </span>
                            <span> {{ orderDetails?.symbol }}</span>
                        </div>
                    </div>
                </div>
                <div class="nn-col-12">
                    <div class="nn-mb-2 nn-d-flex">
                        <div class="orderDetails_title">{{ $t('buybox.stages_4_title') }}</div>
                        <div class="orderDetails_value">
                            <span v-if="isBreakPointSm">{{ orderDetails?.pay_system?.title_text}}</span>
                            <span v-else-if="orderDetails?.pay_system">{{ orderDetails?.pay_system?.title_text}}</span>
                            <span v-else>{{ $t('buybox.stages_4_pay_method_required') }}</span>
                        </div>
                    </div>
                </div>
                <div class="nn-col-12 nn-col-md-6">
                    <div class="nn-mb-2 nn-d-flex">
                        <div class="orderDetails_title nn-me-0-5">
                            {{ $t('buybox.summary_fee') }}
                            <span v-if="orderDetails?.pay_system?.fee_percent">({{ orderDetails?.pay_system?.fee_percent }}%)</span>
                        </div>
                        <div class="orderDetails_value" v-if="orderDetails?.pay_system">
                            <span>
                                <span class="nn-me-0-5">{{ parseFloat(orderDetails?.convert_pay_system_fee).toFixed(2) }}</span>
                                <span> {{ orderDetails?.symbol }}</span>
                            </span>
                        </div>
                    </div>
                  <div class="nn-mb-2 nn-d-flex" >
                    <div class="orderDetails_title nn-me-0-5">
                      {{ $t('buybox.summary_service_fee') }}
                    </div>
                    <div class="orderDetails_value" >
                            <span>
                                <span class="nn-me-0-5">{{ orderDetails?.convert_service_fee }}</span>
                                <span> {{ orderDetails?.symbol }}</span>
                            </span>
                    </div>
                  </div>
                    <div class="nn-mb-2 nn-d-flex">
                        <div class="orderDetails_title">{{ $t('buybox.stages_3_discount') }} (-
                            <span>{{ orderDetails?.product?.discount_percentage+orderDetails?.discount_code_percent }}</span>
                            <!-- <span>{{ orderDetails?.discount_code_percent }}</span> -->
                            %)
                        </div>
                        <div class="orderDetails_value">
                            -<span class="nn-me-0-5">{{ (orderDetails?.product?.bonus+orderDetails?.discount_code_value).toFixed(2) }}</span>
                            <!-- -<span class="nn-me-0-5">{{ orderDetails?.convert_discount_code_value }}</span> -->
                            <span> {{ orderDetails?.symbol }}</span>
                        </div>
                    </div>
                    <div class="nn-mb-1-5 nn-mb-md-0 nn-d-flex">
                        <div class="orderDetails_title nn-text-orange1" 
                        :class="{'nn-text-transparent': !email || orderDetails?.convert_loyalty_discount_value == 0}">
                            <span>{{ orderDetails?.loyalty_discount?.title }}</span>
                            (-
                            <span>{{ orderDetails?.loyalty_discount?.percent }}</span> %)</div>
                        <div class="orderDetails_value" :class="{'nn-text-transparent': !email || orderDetails?.convert_loyalty_discount_value == 0}">
                            <span>-
                                <span>{{ orderDetails?.convert_loyalty_discount_value }}</span> 
                                {{ orderDetails?.symbol }}</span>
                        </div>
                    </div>
                </div>
                <div class="nn-col-6 nn-pb-2 nn-d-flex nn-justify-md-space-around nn-align-end" v-if="!isBreakPointSm">
                    <IconTrustPilot :width="isBreakPointSm ? '75' : '118'" :height="isBreakPointSm ? '24' : '36'" />
                    <IconPci :width="isBreakPointSm ? '83' : '137'" :height="isBreakPointSm ? '24' : '46'" />
                </div>
            </div>
            <!-- bottom section mobile  -->
            <div class="orderDetails_bottom" v-if="isBreakPointSm">
                <div class="nn-mb-1 nn-mb-md-1-5 nn-width-full nn-height-2 nn-height-md-4 nn-bg-white-3 nn-rounded-2"></div>
                <div class="nn-mb-1 nn-mb-md-2 nn-row nn-px-md-2 nn-justify-md-end">
                    <div class="nn-col-12 nn-col-md-5">
                        <div class="orderDetails_total nn-d-flex nn-justify-md-space-between">
                            <div class="orderDetails_title totalTitle">{{ $t('buybox.summary_total') }}</div>
                            <div>
                                <span class="nn-me-0-5">{{ orderDetails?.convert_total }}</span>
                                <span> {{ orderDetails?.symbol }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nn-row nn-gap-4 nn-gap-md-8">
                    <div class="nn-col-6">
                        <div
                            class="orderDetails_discountCode nn-p-1 nn-ps-1-5 nn-ps-md-2 nn-d-flex nn-align-center nn-rounded-3 nn-bg-white-2">
                            <div class="orderDetails_discountCode_placeHolder">
                                <div class="nn-d-flex" v-if="discountCode == ''">
                                    {{ discountCodePlaceHolder }}
                                </div>
                            </div>
                            <input type="text" class="nn-bg-transparent nn-text-whiteColor" v-model="discountCode">
                            <button class="nn-text-whiteColor"
                                :class="discountCodeApplied ? 'nn-bg-green1' : 'nn-bg-neutral1'" @click="Redeem">
                                <span v-if="discountCodeApplied">
                                    <IconTick width="13" class="nn-me-1" />
                                    <span>{{ $t('buybox.discount_code.applied') }} !</span>
                                </span>
                                <span v-else>{{ $t('buybox.discount_code.submit') }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="nn-col-6 nn-col-md-5 nn-d-flex nn-justify-md-space-around">
                        <IconPci :width="isBreakPointSm ? '83' : '92'" :height="isBreakPointSm ? '24' : '30'" />
                        <IconTrustPilot :width="isBreakPointSm ? '75' : '83'" :height="isBreakPointSm ? '24' : '30'" />
                    </div>

                </div>
            </div>
            <!-- bottom section desktop  -->
            <div class="orderDetails_bottom" v-else>
                <div class="nn-row nn-justify-space-between nn-align-center">
                    <div class="nn-col-6">
                        <div
                            class="orderDetails_total totalMd nn-px-3-5 nn-rounded-4 nn-d-flex nn-justify-md-space-between nn-align-center">
                            <div class="orderDetails_title">{{ $t('buybox.summary_total') }}</div>
                            <div>
                                <span class="nn-me-0-5">{{ orderDetails?.convert_total }}</span>
                                <span> {{ orderDetails?.symbol }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="nn-col-6 nn-d-flex nn-justify-end">
                        <div
                            class="orderDetails_discountCode nn-me-4 nn-p-1 nn-ps-1-5 nn-ps-md-2 nn-d-flex nn-align-center nn-rounded-3 nn-bg-white-2">
                            <div class="orderDetails_discountCode_placeHolder">
                                <div class="nn-d-flex" v-if="discountCode == ''">
                                    {{ discountCodePlaceHolder }}
                                </div>
                            </div>
                            <input type="text" class="nn-bg-transparent nn-text-whiteColor" v-model="discountCode">
                            <button class="nn-text-whiteColor"
                                :class="discountCodeApplied ? 'nn-bg-green1' : 'nn-bg-neutral1'" @click="Redeem">
                                <span v-if="discountCodeApplied">
                                    <IconTick width="13" class="nn-me-1" />
                                    <span>{{ $t('buybox.discount_code.applied') }} !</span>
                                </span>
                                <span v-else>{{ $t('buybox.discount_code.submit') }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
import { storeToRefs } from 'pinia';
import { t } from "~/plugins/i18n";
import useDiscountHandler from "~/composables/useDiscountHandler";
import {useUserStore} from "~/stores/userStore";

const authUserStore = useUserStore();
const { email } = storeToRefs(authUserStore);
const {getDiscountCode} = useDiscountHandler();
const buyBoxStore = useBuyBoxStore();
const { setSelectedPayMethod, setOrderDetails, setSubmittedDiscountCode } = buyBoxStore;
const { payMethods, selectedPayMethod, selectedCoinPacket, orderDetails } = storeToRefs(buyBoxStore);

const discountCodePlaceHolder = ref(t('buybox.discount_code.placeholder'));
const discountCode = ref('');
const discountCodeRequested = ref(false);
const discountCodeApplied = ref(false);
const Redeem = () => {
    if (discountCode.value) {
        discountCodeRequested.value = true;
        getOrderDetails();
    }
}

const isBreakPointSm = ref(true);
const setBreakPoint = () => {
    isBreakPointSm.value = window.innerWidth < 768;
}

const getOrderDetails = async () => {
    const queryParams = { 'payment_id': selectedPayMethod.value?.id, 'product_id': selectedCoinPacket.value?.id };
    if (discountCode.value) {
        queryParams.discount_code = discountCode.value;
    }
    await api.get('buy_coins/pay_info', { query_params: queryParams }).then((res) => {
        setOrderDetails(res.data);
        if (discountCodeRequested.value) {
            discountCodeRequested.value = false;
            if (res.data.discount_code === null) {
                // discountCodePlaceHolder.value= res.data.discount_code_error;
                useNuxtApp().$toast.error(res.data.discount_code_error);
                discountCodeApplied.value = false;
            } else {
                discountCodeApplied.value = true;
                setSubmittedDiscountCode(discountCode.value);
            }
        }
    });
}
const savedDiscount = getDiscountCode();
onMounted(() => {
    setBreakPoint();

    if(savedDiscount !== null){
      discountCode.value = savedDiscount;
      Redeem();
    }else{
      getOrderDetails();
    }
})
</script>