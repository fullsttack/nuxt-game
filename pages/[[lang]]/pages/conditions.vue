<template>
  <TitleHeaderFootball>
    {{ $t('conditions.meta.title') }}
  </TitleHeaderFootball>
  <div class="container">
    <div class="accordion" id="accordionExample">
      <div class="card no-border" v-for="(item, key) in items">
        <div class="card-header" :id="'heading_'+key">
          <h2 class="mb-0"  data-toggle="collapse" :data-target="'#collapse_'+key" aria-expanded="true" :aria-controls="'collapse_'+key">
            {{key+1}}. {{ item.title }}
          </h2>
        </div>
        <div :id="'collapse_'+key" class="collapse" :aria-labelledby="'heading_'+key" data-parent="#accordionExample">
          <div class="card-body">
            <div class="panel-body" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../../components/blocks/TitleHeaderFootball";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
export default {
  components: {TitleHeaderFootball},
  async setup(){
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' })
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.conditions')},
    ])
    useHead(makeMeta(route.path,t('conditions.meta.title'), t('conditions.meta.description')))
    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
        { src:'/vendor/bootstrap/js/bootstrap.bundle.js', defer:true},
      ],
    })
    const items = (await SSRRequest.get('conditions'))?.data || []

    return {
      items
    }
  },
}
</script>

<style scoped>
@import "@/public/css/pages/condition.css";
</style>