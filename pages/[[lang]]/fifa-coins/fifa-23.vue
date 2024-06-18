<template>
  <div>
    <BuyBox type="fifa" />
    <VideoSwiper />
    <Features></Features>

    <div class="container" style="margin-top: 50px;">
      <div class="row question__container center">
        <div class="col-12 last-paraph" style="margin-bottom: 20px">
          <h2>{{ article_3.title}}</h2>
          <div v-html="(article_3.content)" style="margin-top: 15px;"></div>
        </div>
      </div>
    </div>

    <div class="bottom__container">
      <div class="container">
        <Platforms></Platforms>
        <BlogSwiper></BlogSwiper>
      </div>
    </div>

    <div class="container">
      <div class="row question__container m100up">
        <div class="col-lg-6">
          <h2>{{ article_1.title}}</h2>
          <div v-html="(article_1.content)" style="margin-top: 15px;"></div>
        </div>
        <div class="col-lg-6">
          <h2>{{ article_2.title}}</h2>
          <div v-html="(article_2.content)" style="margin-top: 15px;"></div>
        </div>
      </div>
    </div>

    <div id="modal_place"></div>
  </div>
</template>

<script>
import CoinPriceTable from "../../../components/CoinPriceTable.vue";
import Platforms from "../../../components/Platforms.vue";
import BlogSwiper from "../../../components/BlogSwiper.vue";
import Features from "~/components/Features.vue";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
import {SSRRequest} from "../../../composables/SSRRequest";
import UseUtils from "../../../composables/useUtils";
import useRating from "../../../composables/useRating";
import VideoSwiper from "../../../components/VideoSwiper";
import { onMounted } from "vue";
export default {
  name: 'IndexMain',
  scrollToTop: true,
  components: {
    VideoSwiper,
    BlogSwiper,
    Platforms,
    CoinPriceTable,
    Features
  },
  async setup(){
    const route = useRoute();
    const {removeHtml} = UseUtils();
    const rating = useRating();
    const { t } = useI18n({ useScope: 'global' })
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.buy_coins')},
    ])
    useHead(makeMeta(route.path,t('fifa.meta.title'), t('fifa.meta.description')))

    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
          rating.genScriptJson(rating.getBuyCoinsRatingByLang())
      ]
    })


    const [{data:article_1},{data:article_2},{data:article_3}] = await Promise.all([
      SSRRequest.get(`articles/find/1665956991969`),
      SSRRequest.get(`articles/find/1665958619609`),
      SSRRequest.get(`articles/find/1667246985709`),
    ])

    return {
      article_1,
      article_2,
      article_3,
      removeHtml
    }
  },
}
</script>
<style scoped>
@import "~/public/css/infoBlock.css";
@import '~/public/css/home.css';
@import "@/public/css/pages/index.css";

</style>



