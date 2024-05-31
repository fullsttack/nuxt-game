<template>
    <div>
      <TitleHeaderNews>
        <strong><span style="color:#59b9b7;">{{ $t('news.title_part_1') }}</span></strong> <strong><span>{{ $t('news.title_part_2') }}</span></strong>
      </TitleHeaderNews>
      <BlogMain/>
    </div>
  </template>
  
  <script>
  import TitleHeaderNews from "../../../../../../../../../components/blocks/TitleHeaderNews.vue";
  import BlogMain from "../../../../../../../../../components/blog/BlogMain";
  import {makeMeta} from "~/composables/useUtils";
  export default {
    components: {BlogMain, TitleHeaderNews},
    setup() {
      const route = useRoute();
      useHead(makeMeta(route.path, 'Blog', 'Blog', '', true))
    },
  }
  </script>