<template>
  <div>
    <TitleHeaderFootball>
      {{ $t('loyalty.header.name_part_1') + ' ' + $t('loyalty.header.name_part_2') }}
    </TitleHeaderFootball>
    <div class="container-md text-center fa-align-center" style="margin-top: 50px">
      <h2 class="title-h2">{{ $t('loyalty.title') }}</h2>
      <br/>
      <p class="p-des">{{ $t('loyalty.description') }}</p>
    </div>
    <br>
    <div class="col-sm-12 box-container row justify-content-center">

      <div v-for="level in levels" :class="['medal-box', 'col-2', 'medal-box-' + level.name.toLowerCase()]">
        <div :class="['hold-image-' + level.name.toLowerCase()]">
          <span class="text-percent">{{ level.percent }}%</span>
          <span class="title-percent">{{ level.name }}</span>
        </div>
        <div class="title1">{{ $t('loyalty.coins_before') }}</div>
        <div class="title2" :style="{color: level.color}">{{ level.coins }}</div>
        <div class="title1">{{ $t('loyalty.coins_after') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../components/blocks/TitleHeaderFootball";
import {SSRRequest} from "~/composables/SSRRequest";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
export default {
  components: {TitleHeaderFootball},
  async setup() {
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' })
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.treuerabatt')},
    ])
    useHead(makeMeta(route.path,t('loyalty.meta.title'), t('loyalty.meta.description')))
    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
      ],
    })

    let levels = [
      {name: 'Bronze', color: '#a3684d'},
      {name: 'Silver', color: '#a6a9ab'},
      {name: 'Gold', color: '#ffcc02'},
      {name: 'Platin', color: '#201d56'},
      {name: 'Diamond', color: '#28b5f5'},
    ]
    try {
      let levels_data = (await SSRRequest.get('loyalty'))?.data || [];
      levels = levels.map(i => {
        let level = levels_data.find(j => j.name === i.name)
        if (!level) {
          return i
        }
        i.coins = level.coins.format(0, 3, '.', ',')
        i.percent = level.percent
        return i
      })
    } catch (e) {
      console.log("err");
      console.log(e);
    }
    return {levels}
  },
}
</script>

<style scoped>
@import "@/public/css/pages/loyalty.css";
</style>