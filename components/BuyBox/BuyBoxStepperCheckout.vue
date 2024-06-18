<template>
    <div class="buyBox_stepper_checkout nn-mb-1 nn-mx-auto">
        <!-- mobile version  -->
        <div v-if="isBreakPointSm">
            <!-- payment method  -->
            <div class="nn-accordion nn-bg-blur-3 nn-mb-1 nn-rounded-7">
                <div class="nn-accordion_title nn-rounded-7 nn-cursor-pointer nn-hover120"
                     @click="changeOpenedAccordion(2)">
                    <div class="nn-height-full nn-d-flex nn-align-center"
                        v-if="openedAccordion > 2 && !selectedPayMethod?.id">
                        <IconAlert width="18" height="18" class="nn-me-1" />
                        <div>
                            <div class="title">{{ $t('buybox.stages_4_pay_method_required') }}</div>
                        </div>
                    </div>
                    <div class="nn-my-n1-5 nn-height-full nn-d-flex nn-align-center"
                        v-else-if="openedAccordion !== 2 && selectedPayMethod?.id">
                        <div class="title nn-me-2-5">{{ selectedPayMethod?.title_text }}</div>
                        <div class="subTitle">{{ selectedPayMethod?.fee_percent }} % {{ $t('buybox.summary_fee') }}
                        </div>
                    </div>
                    <span v-else>2. {{ $t('buybox.stages_4_title') }}</span>
                    <div class="nn-d-flex nn-align-center">
                        <div class="titleImg nn-me-1" v-if="openedAccordion !== 2 && selectedPayMethod?.id">
                            <img :src="selectedPayMethod.img_url" :alt="selectedPayMethod?.name">
                        </div>
                        <img src="@/assets/images/icons/icon-arrow-down.svg" alt="arrow icon" class="nn-cursor-pointer"
                            :class="{ 'rotate-180': openedAccordion === 2 }">
                    </div>
                </div>
                <div class="nn-accordion_content paymentContent nn-px-4" v-if="openedAccordion === 2">
                    <BuyBoxStepperCheckoutPayMethod />
                </div>
            </div>
            <!-- order details  -->
            <div class="nn-accordion nn-bg-blur-3 nn-mb-1 nn-rounded-7">
                <div class="nn-accordion_title nn-rounded-7 nn-cursor-pointer nn-hover120"
                    @click="changeOpenedAccordion(3)">
                    <span>3. {{ $t('buybox.summary_title') }}</span>
                    <img src="@/assets/images/icons/icon-arrow-down.svg" alt="arrow icon" class="nn-cursor-pointer"
                        :class="{ 'rotate-180': openedAccordion === 3 }">
                </div>
                <div class="nn-accordion_content orderDetailContent nn-pb-1 nn-pb-md-2 nn-px-1-5" v-if="openedAccordion === 3">
                    <BuyBoxStepperCheckoutOrderDetails />
                </div>
            </div>
        </div>
        <!-- desktop version  -->
        <div v-else>
            <!-- payment method  -->
            <div class="nn-accordion nn-bg-blur-3 nn-mb-1 nn-mb-md-1-5 nn-rounded-7" v-if="openedAccordion !== 3">
                <div class="nn-accordion_title nn-rounded-7 nn-cursor-pointer nn-hover120"
                    @click="changeOpenedAccordion(2)">
                    <div class="nn-height-full nn-d-flex nn-align-center"
                        v-if="openedAccordion > 2 && !selectedPayMethod?.id">
                        <IconAlert width="18" height="18" class="nn-me-1" />
                        <div>
                            <div class="title">{{ $t('buybox.stages_4_pay_method_required') }}</div>
                        </div>
                    </div>
                    <div class="nn-my-n1-5 nn-height-full nn-d-flex nn-align-center"
                        v-else-if="openedAccordion !== 2 && selectedPayMethod?.id">
                        <div class="title nn-me-2-5">{{ selectedPayMethod?.title_text }}</div>
                        <div class="subTitle">{{ selectedPayMethod?.fee_percent }} % {{ $t('buybox.summary_fee') }}
                        </div>
                    </div>
                    <span v-else>2. {{ $t('buybox.stages_4_title') }}</span>
                    <div class="nn-d-flex nn-align-center">
                        <div class="titleImg nn-me-1" v-if="openedAccordion !== 2 && selectedPayMethod?.id">
                            <img :src="selectedPayMethod.img_url" :alt="selectedPayMethod?.name">
                        </div>
                        <img src="@/assets/images/icons/icon-arrow-down.svg" alt="arrow icon" class="nn-cursor-pointer"
                            :class="{ 'rotate-180': openedAccordion === 2 }">
                    </div>
                </div>
                <div class="nn-ms-4 nn-me-6 nn-mt-n1 nn-mb-2" v-if="openedAccordion === 2">
                    <div class="nn-width-full nn-height-2 nn-bg-white-3 nn-rounded-2"></div>
                </div>
                <div class="nn-accordion_content paymentContent nn-px-4" v-if="openedAccordion === 2">
                    <BuyBoxStepperCheckoutPayMethod />
                </div>
            </div>
            <!-- order details  -->
            <div class="nn-accordion nn-bg-blur-3 nn-mb-1 nn-rounded-7">
                <div class="nn-accordion_title nn-rounded-7 nn-cursor-pointer nn-hover120"
                    @click="changeOpenedAccordion(3)">
                    <div>
                        <span v-if="openedAccordion === 3">
                            <IconArrowLeft height="12" class="nn-me-md-2" :class="{ 'rotate-180': isRtl() }" />
                            <span class="summaryBack">{{ $t('buybox.auth.back') }}</span>
                        </span>
                        <span v-else>3. </span>
                        <span>{{ $t('buybox.summary_title') }}</span>
                    </div>
                    <img src="@/assets/images/icons/icon-arrow-down.svg" alt="arrow icon" class="nn-cursor-pointer"
                        :class="{ 'rotate-180': openedAccordion === 3 }" v-if="openedAccordion !== 3">
                </div>
                <div class="nn-ms-4 nn-me-6 nn-mt-n1-5" v-if="openedAccordion === 3">
                    <div class="nn-width-full nn-height-2 nn-bg-white-3 nn-rounded-2"></div>
                </div>
                <div class="nn-accordion_content orderDetailContent nn-pb-1 nn-px-1-5"
                    v-if="openedAccordion === 3">
                    <BuyBoxStepperCheckoutOrderDetails />
                </div>
            </div>
        </div>

        <BuyBoxStepperButton :loading="loadingCheckout" :text="selectedPayMethod=== null ? $t('buybox.stages_3_chekout') : $t('buybox.stages_3_chekout_2')"
            @button-clicked="submitCheckout" />
        <div class="termsCheckBox nn-d-flex nn-justify-center">
            <div @click="changeCheckboxStatus">
                <IconCheckBox color="black" :width="isBreakPointSm ? '13' : '17'" :height="isBreakPointSm ? '13' : '17'"
                    class="nn-me-1-5 nn-me-md-2-5" v-if="termsCheckbox" />
                <div class="termsCheckBox_box" :class="{ 'nn-text-primary1': termsCheckboxAlert }" v-else></div>
            </div>
            <div class="termsCheckBox_label" :class="{ 'nn-text-primary1': termsCheckboxAlert }">
                <NuxtLink to="/pages/conditions" target="_blank">
                    <span :class="termsCheckboxAlert ? 'nn-text-primary1' : 'nn-text-blackColor'">{{
                        $t('buybox.stages_4_conditions') }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
    <!-- this this part is form previous implementation of buybox  -->
    <visa-payment :open="showCardForm" :payerror="paymentApiError" v-model="savedCard" @close="closePopup"
        @buy="submitVisaPayment"></visa-payment>
    <!--  -->
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
import { useCheckOutCardStore } from '@/stores/checkOutCard';
import { storeToRefs } from 'pinia';
import { t } from "~/plugins/i18n";
import {useRouter} from "nuxt/app";
import {onMounted} from "vue";
import {useBuyBoxState} from "@/stores/BuyboxState";
const router = useRouter();
const { isRtl } = useUtils();
const buyBoxStore = useBuyBoxStore();
const { setCurrentStep, setPayMethods, setSubmittedDiscountCode , setSelectedPayMethod } = buyBoxStore;
const { selectedPayMethod, orderDetails, selectedCoinPacket, submittedDiscountCode } = storeToRefs(buyBoxStore)

const checkOutCardStore = useCheckOutCardStore();
// const { setOpenedAccordion, setAccordionDataFromLocalStorage, setGlobalAuthPopupStatus } = checkOutCardStore;
const { setOpenedAccordion, setGlobalAuthPopupStatus } = checkOutCardStore;
const { openedAccordion } = storeToRefs(checkOutCardStore);

const authUserStore = useUserStore();
const { email } = storeToRefs(authUserStore);

const termsCheckbox = ref(true);
const termsCheckboxAlert = ref(false);

const {productId} = storeToRefs(useBuyBoxState());
const changeCheckboxStatus = () => {
    termsCheckbox.value = !termsCheckbox.value;
    termsCheckboxAlert.value = false;
}
//  this this part till loading checkout is form previous implementation of buybox (not implemented by me)
const showCardForm = ref(false);
const paymentApiError = ref('');
const VisaPaymentSet = ref(false);
const closePopup = () => {
    showCardForm.value = false;
};
const savedCard = ref({
    number: '',
    expired_month_year: '',
    cvv: '',
    holder: '',
    save_card: true,
    //todo temp fix for v-model in visa
    total_price_text: ''
});
const submitVisaPayment = () => {
    VisaPaymentSet.value = true;
    savedCard.value.total_price_text = orderDetails.value?.convert_total + ' ' + orderDetails.value?.symbol
    showCardForm.value = false;
}
////////////////
const loadingCheckout = ref(false);
const submitCheckout = () => {
    setGlobalAuthPopupStatus(false)
    if (termsCheckbox.value) {
        if (email.value) {
            if (selectedPayMethod.value?.id) {
                productId.value = selectedCoinPacket.value.id;
                // setCurrentStep({ id: 5, name: "delivery" });
                loadingCheckout.value = true;
                const params = {
                    payment_id: selectedPayMethod.value.id,
                    product_id: selectedCoinPacket.value.id,
                }
                  if (submittedDiscountCode.value) {
                    params.discount_code = submittedDiscountCode.value;
                  } 
                if (selectedPayMethod.value?.required_card_data) {
                    if (VisaPaymentSet.value) {
                        params.number = savedCard.value.number.replace(/ /g, '').slice(0, 16)
                        params.expired = savedCard.value.expired_month_year
                        params.cvv = savedCard.value.cvv
                        params.holder = savedCard.value.holder
                        params.save_card = savedCard.value.save_card

                    } else {
                        showCardForm.value = true;
                        return;
                    }
                }

                const secure = {
                    user_agent: navigator.userAgent,
                    accept_language: navigator.language,
                    accept: 'application/json,text/plain,text/html,*/*',
                    color_depth: screen.colorDepth,
                    screen_height: screen.height,
                    screen_width: screen.width,
                    time_zone_offset: (new Date()).getTimezoneOffset(),
                    java_enabled: navigator.javaEnabled()
                }
                params.hkk = btoa(JSON.stringify(secure));
                // try{
                //   await router.push({name:'lang-fc-coins-fc-24-coins',query:{product_id: selectedCoinPacket.value.id},replace: true});
                // }
                // catch (e) {}
                api.post('buy_coins', { body_params: params }).then(res => {
                    window.location.href = res.data.url
                }).catch(e => {
                    alert("pay error " + e.description);
                    // paymentApiError.value = e.description;
                }).finally(() => {
                    loadingCheckout.value = false;
                    setSubmittedDiscountCode('');
                })
            } else {
                setOpenedAccordion(2);
            }
        } else {
            setGlobalAuthPopupStatus(true);
        }
    } else {
        termsCheckboxAlert.value = true;
    }
}

const changeOpenedAccordion = (id: number) => {
    if (id !== openedAccordion.value) {
        setOpenedAccordion(id);
    } else {
        id === 1 ? setOpenedAccordion(2) : id === 2 ? setOpenedAccordion(3) : setOpenedAccordion(2);
    }
}
// get pay methods 
const getPayMethods = async () => {
    await api.get('pay_systems').then((res) => {
        setPayMethods(res.data);
        setSelectedPayMethod(res.data[0]);
    });
};

const isBreakPointSm = ref(true);
const setBreakPoint = () => {
    isBreakPointSm.value = window.innerWidth < 768;
}
onMounted(() => {
    // setAccordionDataFromLocalStorage();
    setBreakPoint();
    getPayMethods();
    email.value ? setGlobalAuthPopupStatus(false) : setGlobalAuthPopupStatus(true);
})
</script>