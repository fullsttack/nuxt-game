<template>
  <TitleHeaderFootball>
    {{ $t('fifa.categories.title_' + platform.name)}}
  </TitleHeaderFootball>
  <div class="container coin-table__container" style="margin-top: 20px !important;">
    <ClientOnly>
      <CoinPriceTable :platform_name="platform.name" :platform_changable="false"/>
    </ClientOnly>
  </div>
  <div class="bottom__container">
    <div class="container">
      <Platforms></Platforms>
    </div>
  </div>


</template>

<script>
import TitleHeaderFootball from "../../../../components/blocks/TitleHeaderFootball.vue";
import CoinPriceTable from "../../../../components/CoinPriceTable.vue";
import Platforms from "../../../../components/Platforms.vue";
import BlogSwiper from "../../../../components/BlogSwiper.vue";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
import {SSRRequest} from "../../../../composables/SSRRequest";
import UseUtils, {removeStyleAttribute} from "../../../../composables/useUtils";
import useRating from "../../../../composables/useRating";
import {onMounted} from "vue";
export default {
  components: {BlogSwiper, Platforms, CoinPriceTable, TitleHeaderFootball},

  setup() {
    const {removeHtml,removeStyleAttribute} = UseUtils();
    definePageMeta({
      middleware: [
        (to, from) => {
          if (!['ps4', 'xbox', 'pc', 'ps5'].includes(to.params.platform)) {
            return abortNavigation()
          }
        },
      ]
    })
    const route = useRoute();
    const rating = useRating();
    const { t } = useI18n({ useScope: 'global' })
    let platform_name = useRoute().params.platform
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.buy_coins_' + platform_name)},
    ])
    useHead(makeMeta(route.path,t(`fifa.categories.${platform_name}.title`), t(`fifa.categories.${platform_name}.description`)))

    onMounted(()=>{
      useHead(makeMeta(route.path,t(`fifa.categories.${platform_name}.title`), t(`fifa.categories.${platform_name}.description`)))
    })
    const platforms = rating.getRatingByLang();
    const platform = platforms.find(i => {return i.name === platform_name})

    // const  [{data:min_max_comfort_prices_in_eur}] = await Promise.all([
    //   SSRRequest.get(`platforms/${platform_name}/get_min_max_comfort_prices_in_eur`),
    // ])

    Promise.all([
      SSRRequest.get(`platforms/${platform_name}/get_min_max_comfort_prices_in_eur`)
    ]).then(function(response) {
      const [{data: min_max_comfort_prices_in_eur}] = response;
      platform.schema_org_data.offers.lowPrice = String(min_max_comfort_prices_in_eur.min)
      platform.schema_org_data.offers.highPrice = String(min_max_comfort_prices_in_eur.max)
    })

    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
        rating.genScriptJson(platform.schema_org_data)
      ]
    })

    return {
      platform,
      removeHtml,
      removeStyleAttribute
    }
  },
}
</script>


<style scoped>
@import "@/public/css/pages/buycoins.css";
</style>