<!-- pouya please check this old index component and bring every things that is necessary to new one (indexMain.vue) -->

<template>
    <div>
      <SSRAlerts/>
      <!-- <div class="hero-unit fx-m festival" style="min-height: 660px">
        <div class="container hero-unit__container">
          <BaseH1 :isindex="true"/>
          <BuyHeader v-show="buyboxloadUp" ref="buyHeaderbox" id="buy-header" @loaded="onBuyBoxLoaded"></BuyHeader>
        </div>
      </div> -->
  <!--    <VideoComponent></VideoComponent>-->
      <VideoSwiper/>
  
      <Features  id="scroll-query-flag"></Features>
      <div class="container faq-mob" >
        <div class="section_title text-center mb-4 mt-md-4">
          <div class="faq_title">
            <nuxt-img loading="lazy" src="/svg/FAQ.svg" class="mr-2" alt="FAQ" width="42" height="42"/>
            <h2 class="text-color d-inline-block font-weight-bold mb-4 faq-title">
              {{ $t('faq.title') }}
            </h2>
          </div>
          <div
              class="desktop-view"
              style="height: 1.5px; width: 100%; background-color: #dedede"
          ></div>
        </div>
      </div>
      <div class="container" >
        <Questions :category="'home'"></Questions>
      </div>
      <Features id="scroll-query-flag"></Features>
      <div class="bg-gray">
        <div class="container-index">
          <div class="changes24">
            <p class="headtitle">What Changes in FIFA 24</p>
  
            <div class="changes_item col-md-12 row changes_item_first">
              <div class="col-md-9">
                <p>
                  1. Registration
                </p>
                <p>
                  Time is precious! Therefore, we have designed our affiliate program as easy as possible. You can adapt your personal affiliate link to every MMOGA page and every product on MMOGA within seconds and our tutorials will help you to find quickly the optimal placement strategy.
                </p>
              </div>
              <div class="col-md-3 changes_item_firstpic">
                <nuxt-img loading="lazy" alt="changes image 1" src="/images/index24/testimg.svg" width="355" height="199" />
              </div>
            </div>
            <!--        <div class="changes_item_firstpic">-->
  
            <!--        </div>-->
            <div class="changes_item col-md-12 row">
              <div class="col-md-9">
                <p>
                  2. Spear Our Brand
                </p>
                <p>
                  The MMOGA Affiliate Program is an additional source of income for those who manage a website or a social media channel, whether YouTube, Facebook, Twitter, Instagram, Twitch, Hitbox, etc.
                  <br/>Our commission model:<br/>
                  10% for digital goods (gamekeys, gamecards and software]<br/>
                  15% for virtual goods (gold, coins and items)
                </p>
              </div>
              <div class="col-md-3">
                <nuxt-img loading="lazy" alt="changes image 2" src="/images/index24/testimg.svg" width="355" height="199" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-index">
        <div class="changes24">
          <p class="headtitle">{{ $t('home.reviews_title') }}</p>
        </div>
      </div>
      <div>
        <ReviewSwiper/>
      </div>
      <div>
        <BlogSwiper/>
      </div>
    </div>
    <fifa24-modal v-model:show="show_fifa_24_modal"  />
  </template>
  
  <script>
  import Questions from "./Questions";
  import Features from "~/components/Features.vue";
  import {SSRRequest} from "../composables/SSRRequest";
  import UseUtils from "../composables/useUtils";
  // import BaseH1 from "./blocks/BaseH1";
  import CoinPriceTable from "./CoinPriceTable";
  import Modalalert from "./modalalert";
  import WhatsappAlert from "./whatsappAlert";
  import VideoSwiper from "./VideoSwiper";
  import {useUserStore} from "~/stores/userStore";
  import {getLocaleRoutePath} from '~/plugins/i18n'
  import SSRAlerts from "./blocks/SSRAlerts";
  import fifa24Modal from "./embeded/fifa24Modal";
  export default {
    components: {
      SSRAlerts,
      VideoSwiper,
      WhatsappAlert,
      Modalalert,
      CoinPriceTable,
      // BaseH1,
      Questions,
      // BuyHeader,
      BlogSwiper,
      Platforms,
      Features,
      fifa24Modal
    },
    async setup(){
      const show_fifa_24_modal = false
      const {removeHtml} = UseUtils();
      const [{data:article_1},{data:article_2}] = await Promise.all([
        SSRRequest.get(`articles/find/1669355043858`),
        SSRRequest.get(`articles/find/1669355997719`),
      ])
      const user = useUserStore()
      if (process.client && user.id) {
        window.Echo.channel('user_events_' + user.id).listen('SuccessPay', ({data}) => {
          const router = useRouter()
          router.push({path: getLocaleRoutePath('payment/success/' + data.invoice_id)})
        }).listen('FailedPay', ({data}) => {
          const router = useRouter()
          router.push({path: getLocaleRoutePath('payment/fail/' + data.invoice_id)})
        })
      }
      return {
        article_1,
        article_2,
        removeHtml,
        show_fifa_24_modal,
      }
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
  
    },
    watch:{
      '$route.hash':function (n){
        this.goToFaq();
      }
    }
  }
  </script>
  
  <style scoped>
  .bg-gray{
    background-color: #F1F1F1;
    padding-top: 0px;
    padding-bottom: 50px;
  }
  .faq_title{
    display: flex;
    justify-content: center;
  }
  .faq_title h2{
    font-size: 21px !important;
    padding-top: 6px !important;
  }
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
  .changes24{
    padding-top: 35px;
  }
  .changes_item{
    align-items: center;
    margin-top: 50px;
    padding: 0;
  }
  .changes_item > div:first-child{
  
    padding-right: 40px;
  }
  .changes_item > div:first-child > p:first-child{
    font-size: 18px;
    font-weight: bold;
  }
  .changes_item > div:first-child > p:last-child{
    font-size: 16px;
    font-weight: 500  ;
  }
  .changes_item img{
    margin-left: -25px;
  }
  .changes_item_firstpic:after{
    content: '';
    background: url("/images/index24/arrow_down.svg");
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: right center;
    width: 40px;
    height: 40px;
    position: absolute;
    right: 50%;
    transform: translateX(50%);
  }
  .changes_item_first{
    margin-top: 25px;
  }
  @media (max-width: 800px) {
    .headtitle{
      font-size: 19px;
    }
    .headtitle:after{
      margin-top: 12px;
    }
    .changes_item > div:first-child > p:first-child{
      font-size: 16px;
    }
    .changes_item > div:first-child > p:last-child{
      font-size: 13px;
    }
    .changes_item > div:first-child{
      padding-right: 0;
    }
    .changes_item img{
      margin-left: 0;
    }
    .changes_item_firstpic:after{
      bottom: -60px;
    }
    .changes_item{
      margin-top: 75px;
    }
    .changes_item_first{
      margin-top: 25px !important;
    }
  }
  @media(min-width: 1900px){
    .faqfix{
      margin-top: -100px;
      z-index: 9999;
      position: relative;
    }
  }
  </style>
  
  
  
  