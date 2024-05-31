<template>
  <div>
    <TitleHeaderFootball>
      {{$t('invoices.order.cancel.title')}}
    </TitleHeaderFootball>
    <div class="payment__container">
      <div class="top">
        <div class="title">
          <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M18.7959 10.7959L18.7959 10.7959C18.9004 10.6914 18.9833 10.5673 19.0399 10.4307C19.0964 10.2942 19.1256 10.1478 19.1256 10C19.1256 9.85219 19.0964 9.70583 19.0399 9.56927C18.9833 9.43271 18.9004 9.30863 18.7959 9.20411C18.6914 9.09959 18.5673 9.01669 18.4307 8.96012C18.2942 8.90356 18.1478 8.87444 18 8.87444C17.8522 8.87444 17.7058 8.90356 17.5693 8.96012C17.4327 9.01669 17.3086 9.09959 17.2041 9.20411L17.2041 9.20413L14 12.4094L10.7959 9.20413L10.7959 9.20411C10.5848 8.99303 10.2985 8.87444 10 8.87444C9.70149 8.87444 9.4152 8.99303 9.20412 9.20411C8.99303 9.41519 8.87445 9.70148 8.87445 10C8.87445 10.2985 8.99303 10.5848 9.20412 10.7959L9.20413 10.7959L12.4094 14L9.20413 17.2041L9.20412 17.2041C9.0996 17.3086 9.01669 17.4327 8.96013 17.5693C8.90356 17.7058 8.87445 17.8522 8.87445 18C8.87445 18.1478 8.90356 18.2942 8.96013 18.4307C9.01669 18.5673 9.0996 18.6914 9.20412 18.7959C9.30863 18.9004 9.43272 18.9833 9.56927 19.0399C9.70583 19.0964 9.85219 19.1256 10 19.1256C10.1478 19.1256 10.2942 19.0964 10.4307 19.0399C10.5673 18.9833 10.6914 18.9004 10.7959 18.7959L10.7959 18.7959L14 15.5906L17.2041 18.7959L17.2041 18.7959C17.3086 18.9004 17.4327 18.9833 17.5693 19.0399C17.7058 19.0964 17.8522 19.1256 18 19.1256C18.1478 19.1256 18.2942 19.0964 18.4307 19.0399C18.5673 18.9833 18.6914 18.9004 18.7959 18.7959C18.9004 18.6914 18.9833 18.5673 19.0399 18.4307C19.0964 18.2942 19.1256 18.1478 19.1256 18C19.1256 17.8522 19.0964 17.7058 19.0399 17.5693C18.9833 17.4327 18.9004 17.3086 18.7959 17.2041L18.7959 17.2041L15.5906 14L18.7959 10.7959ZM27.125 14V13.9999C27.1213 10.5201 25.7374 7.18384 23.2768 4.72324C20.8162 2.26265 17.4799 0.878675 14.0001 0.875H14C11.4041 0.875 8.86654 1.64477 6.70815 3.08696C4.54975 4.52915 2.86749 6.579 1.87409 8.97728C0.880687 11.3756 0.620768 14.0146 1.1272 16.5606C1.63363 19.1066 2.88367 21.4452 4.71923 23.2808C6.55479 25.1163 8.89344 26.3664 11.4394 26.8728C13.9854 27.3792 16.6244 27.1193 19.0227 26.1259C21.421 25.1325 23.4708 23.4503 24.913 21.2919C26.3552 19.1335 27.125 16.5959 27.125 14ZM23.0422 7.95817C24.2372 9.74652 24.875 11.849 24.875 13.9999C24.8717 16.8831 23.7249 19.6474 21.6861 21.6861C19.6474 23.7249 16.8831 24.8717 13.9999 24.875C11.849 24.875 9.74652 24.2372 7.95818 23.0422C6.16979 21.8473 4.77592 20.1488 3.95282 18.1617C3.12971 16.1745 2.91435 13.9879 3.33397 11.8784C3.75358 9.76885 4.78932 7.83111 6.31022 6.31021C7.83112 4.78932 9.76886 3.75357 11.8784 3.33396C13.9879 2.91435 16.1745 3.12971 18.1617 3.95281C20.1488 4.77591 21.8473 6.16979 23.0422 7.95817Z"
                fill="#201D56"
                stroke="#201D56"
                stroke-width="0.25"
            />
          </svg>
          <div v-html="$t('invoices.order.cancel.notice')"></div>
        </div>

        <div class="description"></div>
      </div>
      <div class="payment-info" v-if="loading">
        <div class="m-auto w-100 d-flex justify-content-center p-3">
          <img src="/loading_btn.svg" width="35" height="35"/>
        </div>
      </div>
      <div class="payment-info" v-else>
        <InvoiceInfo :invoice="invoice"></InvoiceInfo>
        <div class="back-button" @click="toHomePage" style="cursor: pointer">{{$t('payment.all.back')}}</div>
      </div>
    </div>

    <div class="bottom__container">
      <div class="help-box__container">
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.48875 0H11.3525C14.0363 0 15.8334 1.88417 15.8334 4.68667V11.1554C15.8334 13.95 14.0363 15.8333 11.3525 15.8333H4.48875C1.805 15.8333 0 13.95 0 11.1554V4.68667C0 1.88417 1.805 0 4.48875 0ZM7.90877 5.58996C7.53668 5.58996 7.22793 5.28042 7.22793 4.90121C7.22793 4.51329 7.53668 4.20454 7.9246 4.20454C8.3046 4.20454 8.61335 4.51329 8.61335 4.90121C8.61335 5.28042 8.3046 5.58996 7.90877 5.58996ZM8.60543 10.91C8.60543 11.29 8.29668 11.5987 7.90877 11.5987C7.52877 11.5987 7.22002 11.29 7.22002 10.91V7.41078C7.22002 7.02999 7.52877 6.71412 7.90877 6.71412C8.29668 6.71412 8.60543 7.02999 8.60543 7.41078V10.91Z"
              fill="#201D56"
          />
        </svg>

        <div v-html="t('invoices.order.cancel.offer')"></div>
      </div>

      <div class="transfer-button" @click="toHomePage">{{ $t('invoices.order.cancel.another_method_btn') }}</div>
    </div>
  </div>
</template>

<script>
import {api} from "~/composables/api"
import TitleHeaderFootball from "~/components/blocks/TitleHeaderFootball";
import InvoiceInfo from "~/components/InvoiceInfo";
import {getLocaleRoutePath} from "~/plugins/i18n";
import {useI18n} from "vue-i18n";
import {makeMeta} from "~/composables/useUtils";
import {t} from "~/plugins/i18n";
import {getLocale, getLocalePrefix} from "../../../../../plugins/i18n";
export default {
  setup(){
    const route = useRoute();
    useHead(makeMeta(route.path,t('invoices.cancel.meta.title'), t('invoices.cancel.meta.description'), '', true))
    definePageMeta({
      middleware: 'pay-status-middleware'
    })
    return {
      t
    }
  },

  name: "index",
  components: {TitleHeaderFootball, InvoiceInfo},
  data() {
    return {
      invoice: {},
      getLocaleRoutePath,
      loading:true
    }
  },
  methods: {
    getInvoice() {
      api.get(`invoices/find/${this.$route.params.id}`).then(res => {
        this.loading = false;
        this.invoice = res.data
        //if success
        if (this.invoice.status === 2) {
          this.$router.push({path: this.$route.fullPath.replace('fail', 'success')})
          return
        }
      }).catch(e => {
        this.toHomePage()
      })
    },
    toHomePage() {
      var lang =  getLocale();
      this.$router.push({
        path: lang === 'en' ? '/fc-coins/fc-24-coins' : "/" + lang + "/fc-coins/fc-24-coins",
        query: {
          product_id: this.invoice.coin_packet_id,
        },
      });
    }
  },
  mounted() {
    this.getInvoice()
  }
}
</script>

<style scoped>
@import "~/public/css/pages/payment_result.css";
.rtl_class .title svg{
  position: absolute;
  right: 10px;
}
.rtl_class .payment__container .payment-info .payment-info__item .payment-info__item--title{
  text-align: right;
}

</style>