<template>
  <NuxtLayout  id="nuxtlayout" :class="{rtl_class:currentLocale==='ar'}">
    <NuxtLoadingIndicator />
    <NuxtPage/>
    <div id="modal_place"></div>
  </NuxtLayout>
</template>

<script>
import Wgloading from "./components/blocks/wgloading";
import {useNuxtApp} from "nuxt/app";
import {useI18n} from "vue-i18n";
import useWGCurrency from "./composables/useWGCurrency";
import {onMounted} from "vue";
export default {
  components: {Wgloading},
  data(){
    return{
      loading:false
    }
  },
  async setup() {
    const route = useRoute();


    const i18n = useI18n()
    const user = useUserStore()

    watch(route, value => {
      if (value.params.lang) {
        i18n.locale.value = value.params.lang
      }
      useHead({
        htmlAttrs: {
          'lang': i18n.locale.value,
          'dir':(i18n.locale.value === 'ar' ? 'RTL': 'LTR')
        },
      });
    }, {deep: true, immediate: true})

    watch(()=>i18n.locale.value,(n,o)=>{
      if(n === 'ar' || o === 'ar'){
        useHead({
          htmlAttrs: {
            'lang': i18n.locale.value,
            'dir':(i18n.locale.value === 'ar' ? 'RTL': 'LTR')
          },
        });
      }
    })
    if (process.client && user.id) {
      window.Echo.channel('user_balance_' + user.id).listen('UserBalance', ({data}) => {
        user.coins = data.coins
      })
    }
    onMounted(async ()=>{
      await import('~/public/vendor/bootstrap/css/bootstrap.css');
      await import('~/assets/style/main.scss');
      await import('~/public/css/main.css');
      await import('~/public/css/rtl.css');


      const vkey = 'APP_VERSION';
      const vvalue = localStorage.getItem(vkey);
      $fetch('/api/version').then((res)=>{
        if(vvalue === null){
          localStorage.setItem(vkey,res.version);
        }else if (parseInt(vvalue) !== parseInt(res.version)){
          localStorage.setItem(vkey,res.version);
          window.location.reload(true);
        }
      })
    })
    return {i18n}
  },
  created() {

  },
  computed:{
    currentLocale() {
      return this.$i18n.locale;
    }
  },
  mounted() {

    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", ()=>{
      this.loading = true;

    });
    nuxtApp.hook("page:finish",()=>{
      this.loading = false;
      const wgc = useWGCurrency();
      wgc.autoDetect();
      setTimeout(()=>{
        if(this.$t('home.home') === 'home.home'){
          location.reload();
        }
      },3000);

    });
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.document.addEventListener('touchmove', e => {
        if(e.scale !== 1) {
          e.preventDefault();
        }
      }, {passive: false});
    }

    jQuery.event.special.touchstart = {
      setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
      }
    };
    jQuery.event.special.touchmove = {
      setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
      }
    };
    jQuery.event.special.wheel = {
      setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
      }
    };
    jQuery.event.special.mousewheel = {
      setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
      }
    };

  },
}

</script>
