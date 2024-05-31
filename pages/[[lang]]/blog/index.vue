<template>
  <TitleHeaderNews>
    <strong><span style="color:#59b9b7;">{{ $t('news.title_part_1') }}</span></strong> <strong><span>{{ $t('news.title_part_2') }}</span></strong>
  </TitleHeaderNews>
  <BlogMain/>
</template>

<script>
import TitleHeaderNews from "../../../components/blocks/TitleHeaderNews.vue";
import BlogMain from "../../../components/blog/BlogMain";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";

export default {
  components: {BlogMain, TitleHeaderNews},
  setup() {
    const route = useRoute();
    const {t} = useI18n({useScope: 'global'})
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.blog')},
    ])
    useHead(makeMeta(route.path, t('news.meta.title'), t('news.meta.description'), 'Whatsgaming Blog', true))
    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
      ],
    })
  }
}
</script>