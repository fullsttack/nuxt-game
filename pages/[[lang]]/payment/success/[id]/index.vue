<template>
  <div>
    <TitleHeaderFootball>
      {{$t('payment.payment_details')}}
    </TitleHeaderFootball>
    <div class="payment__container">
      <div class="top">
        <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M18.8692 10.5616L12.4231 17.0089L10.0424 14.8037C9.84755 14.6089 9.58327 14.4994 9.3077 14.4994C9.03213 14.4994 8.76784 14.6089 8.57298 14.8037C8.37813 14.9986 8.26866 15.2629 8.26866 15.5385C8.26866 15.814 8.37813 16.0783 8.57298 16.2732L11.6884 19.3886C11.7848 19.4851 11.8993 19.5617 12.0254 19.614C12.1515 19.6662 12.2866 19.6931 12.4231 19.6931C12.5596 19.6931 12.6947 19.6662 12.8207 19.614C12.9468 19.5617 13.0613 19.4851 13.1578 19.3886L20.427 12.1193C20.5236 12.0229 20.6002 11.9083 20.6524 11.7823C20.7047 11.6562 20.7316 11.5211 20.7316 11.3846C20.7316 11.2481 20.7047 11.113 20.6524 10.9869C20.6002 10.8609 20.5236 10.7463 20.427 10.6499L20.5155 10.5616C20.5154 10.5615 20.5154 10.5615 20.5154 10.5615C20.4073 10.4533 20.279 10.3676 20.1378 10.309C19.9966 10.2505 19.8452 10.2203 19.6923 10.2203C19.5394 10.2203 19.388 10.2505 19.2468 10.309C19.1055 10.3676 18.9772 10.4534 18.8692 10.5616ZM28.125 14.5V14.4999C28.1212 10.8875 26.6845 7.42418 24.1302 4.86984C21.5758 2.31551 18.1125 0.878815 14.5001 0.875H14.5C11.8052 0.875 9.17098 1.67409 6.93036 3.17123C4.68974 4.66836 2.94339 6.79629 1.91215 9.28594C0.880903 11.7756 0.611083 14.5151 1.13681 17.1581C1.66253 19.8011 2.96019 22.2288 4.86568 24.1343C6.77117 26.0398 9.19891 27.3375 11.8419 27.8632C14.4849 28.3889 17.2244 28.1191 19.7141 27.0879C22.2037 26.0566 24.3316 24.3103 25.8288 22.0696C27.3259 19.829 28.125 17.1948 28.125 14.5ZM23.894 8.22312C25.1354 10.081 25.798 12.2654 25.7981 14.4999C25.7947 17.4953 24.6032 20.3671 22.4852 22.4851C20.3671 24.6032 17.4953 25.7947 14.4999 25.7981C12.2654 25.798 10.081 25.1354 8.22313 23.894C6.36517 22.6526 4.91707 20.888 4.06194 18.8236C3.20682 16.7591 2.98308 14.4875 3.41902 12.2959C3.85496 10.1042 4.93099 8.09112 6.51106 6.51105C8.09112 4.93099 10.1042 3.85495 12.2959 3.41901C14.4875 2.98307 16.7591 3.20681 18.8236 4.06194C20.888 4.91706 22.6526 6.36516 23.894 8.22312Z"
              fill="#201D57"
              stroke="#201D56"
              stroke-width="0.25"
          />
        </svg>

        <b>{{ $t('payment_confirm.title_part_1')}}</b>
      </div>
      <div class="payment-info" v-if="loading">
        <div class="m-auto w-100 d-flex justify-content-center p-3">
          <img src="/loading_btn.svg" width="35" height="35"/>
        </div>
      </div>
      <div class="payment-info" v-else>
        <InvoiceInfo :invoice="invoice"></InvoiceInfo>
      </div>
      <nuxt-img loading="lazy" v-if="invoice.platform_name && !loading" class="console" :src="'/images/platform_articles/'+invoice.platform_name+'.png'" alt="payment ok console" />
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

        <span>{{ t('payment.order_description') }}.</span>
      </div>

      <nuxt-link :to="urlwithLocal('comfort')" class="transfer-button">{{ $t('payment.button.to_transfer') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "~/components/blocks/TitleHeaderFootball";
import InvoiceInfo from "~/components/InvoiceInfo";
import {api} from "~/composables/api";
import {getLocaleRoutePath} from "~/plugins/i18n";
import {useI18n} from "vue-i18n";
import {makeMeta} from "~/composables/useUtils";
import {t} from "~/plugins/i18n";
import {useUserStore} from "../../../../../stores/userStore";
import {nextTick} from "vue";
import {getLocale} from "../../../../../plugins/i18n";
export default {
  name: "index",
  components: {TitleHeaderFootball, InvoiceInfo},

  setup(){
    const route = useRoute();
    useHead(makeMeta(route.path,t('payment.payment_details'), t('payment_confirm.success.meta.description'), '', true))
    // definePageMeta({
    //   middleware: 'pay-status-middleware'
    // })
    return {
      t
    }
  },

  data() {
    return {
      invoice: {},
      getLocaleRoutePath,
      userStore:useUserStore(),
      loading:true
    }
  },
  methods: {
    getInvoice() {
      api.get(`invoices/find/${this.$route.params.id}`).then(res => {
        this.invoice = res.data;
        //if not success
        if (this.invoice.status === 3) {
          this.$router.push({path: this.$route.fullPath.replace('success', 'fail')})
          return
        }
        if (!this.invoice.viewed_on_success_page_at) {
          api.post(`invoices/set_invoice_viewed_on_success_page/${this.$route.params.id}`)
        }
        api.get("/me").then((res)=>{
          this.userStore.setCoin(res.data.coins);
          this.loading = false;
          nextTick(()=>{
            setTimeout(()=>{
              if(this.invoice.type_const === 'comfort') {
                this.$router.push({name: 'lang-comfort',params:{lang:getLocale()}});
              }else{
                this.$router.push({name: 'lang-auction-view',params:{view:'index',lang:getLocale()}});
              }
            },5000);
          })
        })
      }).catch(e => {
        this.toHomePage()
      })
    },
    toHomePage() {
      this.$router.push({
        path: getLocaleRoutePath(''),
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
</style>
