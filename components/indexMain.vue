<template>
  <div>

    <LazyHeroSection  @goTo-faq="scrollToTargetAdjusted('faq-section')" />
        <div class="container faq-mob faqfix" id="faq-section">
    <!-- <div class="container faq-mob" > -->
      <div class="section_title text-center mb-4 mt-md-4">
        <div class="faq_title">
          <nuxt-img loading="lazy" src="/svg/FAQ.svg" class="mr-2" alt="FAQ" width="42" height="42"/>
          <div class="text-color d-inline-block font-weight-bold mb-4 faq-title title">
            {{ $t('faq.title') }}
          </div>
        </div>
        <div
            class="desktop-view"
            style="height: 1.5px; width: 100%; background-color: #dedede"
        ></div>
      </div>
    </div>
    <div class="container" >
      <LazyQuestions :category="'home'"></LazyQuestions>
    </div>
    <LazyFeatures id="scroll-query-flag"></LazyFeatures>
    <evolation-new nuxt-client />

<!--    <evolationold/>-->
    <div class="container-index mt-2">
      <div class="changes24">
        <p class="headtitle">{{ $t("home.reviews_title") }}</p>
      </div>
    </div>
    <div>
      <LazyReviewSwiper/>
    </div>
    <div>
      <LazyBlogSwiper/>
    </div>
  </div>
</template>

<script>
//import { defineAsyncComponent } from 'vue'
import HeroSection from "./HeroSection";
import {
  hydrateWhenIdle,
  hydrateWhenVisible,
} from 'vue-lazy-hydration';
// import Questions from "./Questions";
// import ReviewItem from "./Reviews/ReviewItem";
 import ReviewSwiper from "./Reviews/ReviewSwiper";
// import BlogSwiper from "./BlogSwiper";
// import Evolationold from "./index/evolationold";
 import EvolationNew from "./index/evolationNew";
//import {onLCP, onFID, onCLS} from 'web-vitals';
export default {
  name: "IndexMain24",
  //components: {LazyHydrate,EvolationNew, Evolationold, HeroSection,BlogSwiper, ReviewSwiper, ReviewItem, Questions},
  components:{
    HeroSection :hydrateWhenIdle(() => import('./HeroSection')),
    BlogSwiper:hydrateWhenVisible(() => import('./BlogSwiper')),
    Questions:hydrateWhenIdle(() => import('./Questions')),
    ReviewSwiper,
    EvolationNew
  },
  data(){
    return{
      buyboxloadUp:false
    }
  },
  methods:{
    goToFaq(){
      if(this.$route.hash !== ''){
        document.querySelector("#scroll-query-flag").scrollIntoView()
      }
    },
    scrollToTargetAdjusted(id){
      var element = document.getElementById(id);
      var headerOffset = 45;
      var elementPosition = element.getBoundingClientRect().top - (window.innerWidth < 800 ? 1 : 120);
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    },
    onBuyBoxLoaded(){
      this.buyboxloadUp = true;
      //$("#onload-display").fadeOut(1500);
      $("#onload-display").hide();
    }
  },
  mounted() {
    this.onBuyBoxLoaded();
    setTimeout(()=>{
      this.goToFaq();
      this.onBuyBoxLoaded()
    },100);

    // onCLS(console.log, {reportAllChanges: true});
    // new PerformanceObserver((entryList) => {
    //   for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
    //     console.log('FCP candidate:', entry.startTime, entry);
    //   }
    // }).observe({type: 'paint', buffered: true});

  },
  watch:{
    '$route.hash':function (n){
      this.goToFaq();
    }
  }
}
</script>

<style scoped>
.headtitle{
  margin: 0 auto;
  color:#201D57;
  font-weight: bold;
  font-size: 21px;
  text-align: center;
}
.headtitle:after{
  content: '';
  height: 4px;
  width: 55px;
  background-color: #201D57;
  border-radius: 1px;
  margin: 0 auto;
  display: block;
  margin-top: 7px;
}
.faq_title{
  display: flex;
  justify-content: center;
}
.faq_title .title{
  font-size: 21px !important;
  padding-top: 6px !important;
  margin-bottom: 15px !important;
}
@media (max-width: 800px) {
  .headtitle {
    font-size: 18px;
  }

  .headtitle:after {
    margin-top: 12px;
  }
}
</style>
