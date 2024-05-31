<template>
  <title-header-football>
    {{ $t('why_we.header.name_part_1') + ' ' + $t('why_we.header.name_part_2') }}
  </title-header-football>
  <div class="hold-advantages">
    <div class="card-edge" v-for="(article, key) in articles">
      <div class="container-edge">
        <div class="hold-image">
          <nuxt-img loading="lazy" :src="article.img" alt="article image"/>
        </div>
        <div class="hold-text">
          <h2>{{ key+1 }}. {{ article.title }}</h2>
          <div v-html="article.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../components/blocks/TitleHeaderFootball";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
import {SSRRequest} from "~/composables/SSRRequest";
export default {
  async setup(){
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' })
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.why_we')},
    ])
    useHead(makeMeta(route.path,t('why_we.meta.title'), t('why_we.meta.description')))
    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
      ],
    })
    const images = [
        '/images/whywe/play.png',
        '/images/whywe/whatsapp.png',
        '/images/whywe/safety.png',
        '/images/whywe/cashback.png',
    ]
    const articles = (await Promise.all([
      SSRRequest.get(`articles/find/1600708520080`),
      SSRRequest.get(`articles/find/1600708532404`),
      SSRRequest.get(`articles/find/1600708538393`),
      SSRRequest.get(`articles/find/1662496045456`),
    ])).map((article, key) => {
      return {
        img: images[key],
        title: article.data.title,
        content: article.data.content,
      }
    })

    return {
      articles
    }
  },
  components: {TitleHeaderFootball}
}
</script>

<style scoped>
@import "@/public/css/pages/whywe.css";
</style>