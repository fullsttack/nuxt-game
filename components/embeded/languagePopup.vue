<template>
  <li class="nav-account__item">
    <transition name="fade" >
      <div @mouseover="onMouseEvt" @click="langpopup = true;" class="selected-lang" id="selected_lang" >
        <span>{{ $t('home.language') }}</span>
        <span class="icon-flag"><i class="fi fib" :class="'fi-'+selected_language"></i></span>
        <nuxt-img loading="lazy" alt="forward icon 2" class="icon_forward" src="/svg/icon-ios-arrow-forward.svg" width="11" height="6" />
      </div>
    </transition>

    <transition name="list" >
      <div v-if="langpopup" class="lang_popup" id="lang_pop_section" @mouseleave="langpopup = false;">
        <template  v-for="(lang,index) in topLanguages" :key="lang.id">
          <div class="d-flex justify-content-between align-items-center" v-if="index % 2 === 0 || topLanguages.length < 2">
            <div class="lang-item" v-if="index + 1 !== topLanguages.length || topLanguages.length < 2">
              <div class="d-flex justify-content-start align-items-center" @click="changeLanguage(lang.locale)">
                <span class="icon-flag"><i class="fi fib" :class="'fi-'+lang.locale"></i></span>
                <span class="mx-2">{{ lang.name }}</span>
              </div>
            </div>
            <div class="lang-item" v-if="index + 1 < topLanguages.length">
              <div class="d-flex justify-content-start align-items-center" @click="changeLanguage(topLanguages[index+1].locale)">
                <span class="icon-flag"><i class="fi fib" :class="'fi-'+topLanguages[index+1].locale"></i></span>
                <span class="mx-2">{{ topLanguages[index+1].name }}</span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center" v-if="topLanguages.length % 2 !== 0 && index === topLanguages.length-1">
            <div class="lang-item" >
              <div class="d-flex justify-content-start align-items-center" @click="changeLanguage(lang.locale)">
                <span class="icon-flag"><i class="fi fib" :class="'fi-'+lang.locale"></i></span>
                <span class="mx-2">{{ lang.name }}</span>
              </div>
            </div>
          </div>
        </template>
        <div class="hr"></div>
        <template  v-for="(lang,index) in otherLanguages" :key="lang.id">
          <div class="d-flex justify-content-between align-items-center" v-if="index % 2 === 0">
            <div class="lang-item" v-if="index + 1 !== otherLanguages.length">
              <div class="d-flex justify-content-start align-items-center" @click="changeLanguage(lang.locale)">
                <span class="icon-flag"><i class="fi fib" :class="'fi-'+lang.locale"></i></span>
                <span class="mx-2">{{ lang.name }}</span>
              </div>
            </div>
            <div class="lang-item" v-if="index + 1 < otherLanguages.length">
              <div class="d-flex justify-content-start align-items-center" @click="changeLanguage(otherLanguages[index+1].locale)">
                <span class="icon-flag"><i class="fi fib" :class="'fi-'+otherLanguages[index+1].locale"></i></span>
                <span class="mx-2">{{ otherLanguages[index+1].name }}</span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center" v-if="otherLanguages.length % 2 !== 0 && index === otherLanguages.length-1">
            <div class="lang-item" >
              <div class="d-flex justify-content-start align-items-center" @click="changeLanguage(lang.locale)">
                <span class="icon-flag"><i class="fi fib" :class="'fi-'+lang.locale"></i></span>
                <span class="mx-2">{{ lang.name }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </transition>
  </li>
</template>


<script>
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import {useCommonStore} from "../../stores/commonStore";
import i18n, {
  getLocale,
  getLocaleRoutePath,
  LANGUAGES,
  selectableLanguages,
  supportedLanguages
} from "../../plugins/i18n";
import {api} from "../../composables/api";
import {useUserStore} from "../../stores/userStore";
import {storeToRefs} from "pinia";

export default {
  name: "languagePopup",
  setup(){
    const commonStore = useCommonStore();
    const {selected_language} = storeToRefs(commonStore);
    const langpopup = ref(false);
    const router = useRouter();
    const user = useUserStore();
    const route = useRoute();
    const changableLanguages = supportedLanguages();
    const topLanguages = ref([]);
    const otherLanguages = ref([]);
    watch(()=>selected_language.value,(n)=>{
      topLanguages.value = changableLanguages.filter((l)=>{
        return l.id <= 10 && l.locale !== selected_language.value.toLowerCase();
      });
      otherLanguages.value = changableLanguages.filter((l)=>{
        return l.id > 10 && l.locale !== selected_language.value.toLowerCase();
      })
    },{immediate:true,deep:true})
    const changeLanguage = (locale) => {
      const blog_path = commonStore.blogLocalizationPaths[locale]
      const path = blog_path || route.fullPath
      if (user.email) {
        api.post(`account/change_locale/${locale}`)
      }
      $(".main-nav__sub__phone").hide();
      var redirect_path = (path.length === 3 ? '/' + (locale === 'en' ? '' : locale) : getLocaleRoutePath(path, locale));
      if (redirect_path.length !== 1) {
        if (redirect_path.substring(redirect_path.length - 1, redirect_path.length) === '/') {
          redirect_path = redirect_path.substring(0, redirect_path.length - 1);
        }
        if (redirect_path.length === 6 && !redirect_path.endsWith("login")) {
          redirect_path = redirect_path.substring(0, redirect_path.length - 3);
        }
      }
      commonStore.setLanguageChanged(locale);
      langpopup.value = false;
      nextTick(()=>{
        router.push({ path: redirect_path })
      })
    }
    const onMouseEvt = ()=>{
      if(window.innerWidth > 800){
        langpopup.value = true;
      }
    }
    const onMouseEvtHeader = (e)=>{
      console.log(e);
    }
    onMounted(()=>{
      $(document).mouseup((e)=> {
        var container = $("#lang_pop_section");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          langpopup.value = false
        }
      });
      $('.nav-account').mouseover((e)=>{
        if(e.target.offsetParent.classList.contains('desktop_currency')){
          langpopup.value = false
        }
      })
      selected_language.value = route.params?.lang || 'en';
    })
    return{
      langpopup,
      commonStore,
      changableLanguages,
      topLanguages,
      otherLanguages,
      changeLanguage,
      selected_language,
      onMouseEvt,
      onMouseEvtHeader
    }
  }
}
</script>

<style scoped>
@import "@/public/css/components/langpopup.css";
</style>