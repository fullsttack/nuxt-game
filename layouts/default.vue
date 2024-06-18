<template>
  <div @click="bodyClicked" @scroll="handleScroll" class="site-wrapper">
    <div style="margin: 0 auto;" id="onload-display">
      <on-ready-loading/>
    </div>
    <LazyHeaderComponent/>
    <div>
      <slot />
    </div>
    <NuxtLazyHydrate when-visible>

    <LazyFooterComponent/>
    <LazyFooterPhoneNav/>
<!--    <a class="wa_support" target="_blank" :href="'https://t.me/whatsgamingsupport'">-->
<!--      <nuxt-img loading="lazy" alt="contact support fixed icon" src="/svg/wa.svg"/>-->
<!--    </a>-->
    <contact-support/>
    </NuxtLazyHydrate>
    <div v-if="cookie_accept_show" class="d-flex container mt-5" style="position: fixed;bottom: 3%;z-index: 99;">
      <div class="row">
        <div class="col-md-10">
          <div class="d-flex flex-row justify-content-between align-items-center card cookie p-3">
            <div class="d-flex flex-row align-items-center"><img src="/images/cookie.png" width="40">
              <div class="ml-2 mr-2"><span>We use third party cookies to personalize content, ads and&nbsp; analyze site traffic.<br></span></div>
            </div>
            <div><button class="btn btn-dark" type="button" @click="acceptCookie">Okay</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HeaderComponent from "../components/HeaderComponent.vue";
import UseUtils from "../composables/useUtils";
// import OnReadyLoading from "../components/blocks/OnReadyLoading";
// import {bootstrap} from 'vue-gtag';
import {useUserStore} from "~/stores/userStore";
import {api} from "../composables/api";
import {getLocaleRoutePath} from "~/plugins/i18n";
import ContactSupport from "../components/embeded/contactSupport";
export default {
  name: "default",
  scrollToTop: false,
  setup(){
    const {getWGSupportMsg} = UseUtils();
    const router = useRouter();
    const route = useRoute();
    const cookie_accept_show = ref(false)
    // if (process.client && localStorage.getItem('GDPR:accepted') !== 'true') {
    //   cookie_accept_show.value = true;
    // }

    const acceptCookie = () => {
      if (process.client) {
        bootstrap().then(gtag => {
          cookie_accept_show.value = false;
          localStorage.setItem('GDPR:accepted', 'true');
          location.reload();
        })
      }
    }

    const user = useUserStore()
    if (process.client && user.id && !['lang-payment-fail-id', 'lang-payment-success-id'].includes(String(route.name))) {
      api.get('invoices/get_last_paid_invoice').then(res => {
        //todo send gtag
        if (res.data.viewed_on_success_page_at) {
          return
        }
        router.push({path: getLocaleRoutePath('payment/success/' + res.data.id)})
      }).catch(() => {})
    }

    return {
      getWGSupportMsg,
      cookie_accept_show,
      acceptCookie,
    };
  },
  components: {
    ContactSupport,
    // OnReadyLoading,
    HeaderComponent},
  created() {

  },
  methods:{
    bodyClicked: function (e) {
      try{
        var $wrapper = $(".site-wrapper");
        if (!e.target.className.includes("burger-menu-icon")) {
          if ($wrapper.hasClass("site-wrapper--has-overlay")) {
            $wrapper.toggleClass("site-wrapper--has-overlay");
          }
        }
      }catch (e){}

    },
    handleScroll: function (event) {
      var scroll = event.target.scrollTop;
      if (scroll > 44) {
        this.stickyNav = true;
      } else {
        this.stickyNav = false;
      }
    },
  },
}
</script>

<style scoped>
.wa_support{
  position: fixed;
  right: 5%;
  bottom: 5%;
  transform: scale(1.5);
  z-index: 99;
}
@media screen and (max-width: 768px){
  .wa_support{
    display: none;
  }
}
</style>
