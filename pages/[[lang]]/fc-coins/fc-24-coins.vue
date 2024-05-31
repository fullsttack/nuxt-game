<template>
  <div>
    <BuyBox type="fifa24" />
    <div id="howitworks-section">
      <VideoSwiper />
    </div>
    <Features></Features>

    <div class="container faq-mob" id="faq-section">
      <div class="section_title text-center mb-4 mt-md-4">
        <nuxt-img loading="lazy" src="/svg/FAQ.svg" class="mr-2" alt="FAQ" width="42" height="42" />
        <h2 class="text-color d-inline-block font-weight-bold mb-4 faq-title">
          {{ $t('faq_fc_coins.title') }}
        </h2>
        <div class="desktop-view" style="height: 1.5px; width: 100%; background-color: #dedede"></div>
      </div>
    </div>
    <div class="container">
      <Questions :category="'fc_coins'"></Questions>
    </div>

    <div class="container">
      <div class="row question__container m100up">
        <div class="col-lg-6">
          <h2>{{ article_1.title }}</h2>
          <div v-html="(article_1.content)" style="margin-top: 15px;"></div>
        </div>
        <div class="col-lg-6">
          <h2>{{ article_2.title }}</h2>
          <div v-html="(article_2.content)" style="margin-top: 15px;"></div>
        </div>
      </div>
    </div>

    <div class="bottom__container">
      <div class="container">
        <Platforms></Platforms>
      </div>
    </div>

    <div id="modal_place"></div>
  </div>
</template>

<script>
import Questions from "~/components/Questions";
import CoinPriceTable from "../../../components/CoinPriceTable.vue";
import Platforms from "../../../components/Platforms.vue";
import Features from "~/components/Features.vue";
import { useI18n } from "vue-i18n";
import { makeMeta } from "~/composables/useUtils";
import { SSRRequest } from "../../../composables/SSRRequest";
import UseUtils from "../../../composables/useUtils";
import useRating from "../../../composables/useRating";
import VideoSwiper from "../../../components/VideoSwiper";
import {onMounted} from "vue";
import {useRouter} from "nuxt/app";
export default {
  name: 'IndexMain',
  scrollToTop: true,
  components: {
    VideoSwiper,
    Questions,
    Platforms,
    CoinPriceTable,
    Features
  },
  async setup() {
    const route = useRoute();
    const { removeHtml } = UseUtils();
    const rating = useRating();
    const router = useRouter();
    const { t } = useI18n({ useScope: 'global' })
    useHead(makeMeta(route.path, t('fifa.meta.title'), t('fifa.meta.description')))

    useHead({
      script: [rating.genScriptJson(rating.getBuyCoins24RatingByLang())]
    })

    const [{ data: article_1 }, { data: article_2 }] = await Promise.all([
      SSRRequest.get(`articles/find/1686830208196`),
      SSRRequest.get(`articles/find/1686830234656`),
    ])

    return {
      article_1,
      article_2,
      removeHtml
    }
  },
  methods: {
    scrollToTargetAdjusted(id) {
      var element = document.getElementById(id);
      var headerOffset = 45;
      var elementPosition = element.getBoundingClientRect().top - (window.innerWidth < 800 ? 1 : 120);
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    },
    goToFaq(){
      if(this.$route.hash !== ''){
        this.scrollToTargetAdjusted("faq-section");
      }
    },
  },
  watch:{
    '$route.hash':function (n){
      this.goToFaq();
    }
  },
  mounted() {
    console.log(this.$route.hash);
    setTimeout(()=>{
      this.goToFaq();
    },100);

  },
}
</script>
<style scoped>
@import "~/public/css/infoBlock.css";
@import '~/public/css/home.css';
@import "@/public/css/pages/index.css";

.imgfc24 {
  position: relative !important;
  margin: 0 auto;
  margin-top: -75px !important;
}

.fc24 {
  background: url("/images/fc24/bgall.webp");
  background-size: 100%;
  background-repeat: no-repeat;
  min-height: 720px;
}

.imgpc {
  display: block;
}

.imgmob {
  display: none;
}

@media (max-width: 1600px) {
  .imgfc24 {
    margin-top: -10px !important;
    transform: scale(1.2);
  }
}

.container.hero-unit__container {
  transform: scale(1) !important;
}

@media (max-width: 800px) {
  .imgpc {
    display: none;
  }

  .imgmob {
    display: block;
  }

  .imgfc24 {
    margin-top: 0 !important;
  }

  .fc24 {
    background: url("/images/fc24/Back_Mobile.webp") !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    margin-top: -75px;
  }

  .imgfc24 {
    width: 100% !important;
    margin-top: 45px !important;
    left: 0%;
    right: inherit !important;
  }
}

@media (min-width: 810px) and (max-width: 900px) {
  .imgfc24 {
    margin-top: 0 !important;
  }

  .imgpc {
    display: none;
  }

  .imgmob {
    display: block;
  }

  .fc24 {
    background: url("/images/fc24/bg_res.webp") !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;

  }

  .imgfc24 {
    width: 100% !important;
    margin-top: 130px !important;

  }
}

.disabled-buybox {
  margin: 0 auto;
  width: 540px;
  height: 420px;
  position: relative;
}

.disabled-buybox>div:nth-child(2) img {
  width: 540px;
  height: 420px;
  transform: scale(1.5)
}

.disabled-buybox>div:last-child {
  position: relative;
  ;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.disabled-buybox>div:last-child>img:first-child {
  width: 450px;
  position: relative;
  left: initial;
  margin-top: 170px;
}

.disabled-buybox>div:last-child>img:last-child {
  width: 110px;
  height: 100px;
  position: relative;
  left: initial;
  margin: 0;
}

.fc24-buybox {
  background: url("/images/fc24/Buy_1.svg");
  background-repeat: no-repeat !important;
  width: 540px;
  height: 420px;
  background-position: center center;
  margin: 50px auto;
  position: absolute;
  left: 50%;
  transform: translatex(-50%);
  filter: blur(4px) brightness(0.55);
  opacity: 0.8;
}

.btn-d-c {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  align-items: center;
}

.btn-d-c>a {
  min-width: 240px;
  width: max-content;
  height: 50px;
  background-color: #201D56;
  color: white;
  font-weight: bolder;
  font-style: italic;
  font-size: var(--font-size-21px);
  padding-top: 7px;
}

.btn-d-c>a:last-child img {
  width: 28px;
  height: 22px;
  position: relative;
  margin: 0;
}

.btn-d-c>a:last-child>div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
}

.btn-d-c>a:hover {
  background-color: #403c86;
}

@media (max-width: 800px) {
  .fc24-buybox {
    background: url("/images/fc24/Buy_mob.svg") !important;

  }

  .fc24-buybox,
  .disabled-buybox>div:nth-child(2) img,
  .disabled-buybox {
    width: 350px;
    height: 300px;
    margin-top: 75px;
  }

  .disabled-buybox>div:last-child>img:first-child {
    width: 280px;
  }

  .disabled-buybox>div:last-child {
    gap: 15px;
  }

  .disabled-buybox>div:last-child>img:last-child {
    width: 75px;
    height: 70px;
  }

  .disabled-buybox>div:last-child>img:first-child {
    margin-top: 150px;
  }

  .btn-d-c {
    margin-top: 5px;

  }

  .btn-d-c a {
    height: 45px;
    min-width: 195px;
    font-size: var(--font-size-15px);
    line-height: 28px;
  }
}

@media (min-width: 810px) and (max-width: 900px) {
  .disabled-buybox {
    margin-top: 210px;
  }

  .container.hero-unit__container {
    min-height: 1300px;
  }
}

@media (min-width: 1530px) and (max-width: 1900px) {
  .fc24 {
    background-size: contain;
  }

  .disabled-buybox {
    margin-top: 70px;
  }

  .btn-d-c a {
    line-height: 35px;
  }
}</style>
<style>
.question__container h4{
  font-size: var(--font-size-20px);
}
</style>

