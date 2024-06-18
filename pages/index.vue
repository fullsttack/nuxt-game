<template>
 <div>
   <IndexMain/>
 </div>
</template>

<script>
import IndexMain from "../components/indexMain";
import {useI18n} from "vue-i18n";
import {makeMeta, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
import useRating from "../composables/useRating";
export default {
  components: {IndexMain},
  setup(){
    const route = useRoute();
    const rating = useRating();
    const { t } = useI18n({ useScope: 'global' })
    const schema_org_data =  {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Whatsgaming",
      "alternateName": "Whatsgaming Fut Coins",
      "url": "https://whatsgaming.net/",
      // "logo": "https://whatsgaming.net/_ipx/_/images/logo_4.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+989999797725",
        "contactType": "customer service",
        "areaServed": ["GB","US","DE","ES","IT","TR","FR"],
        "availableLanguage": ["en","German"]
      },
      "sameAs": [
        "https://www.instagram.com/whatsgaming/",
        "https://www.facebook.com/myWhatsGaming",
        "https://www.youtube.com/channel/UC8Fu821K4MTQR3AM4xRR3gQ"
      ]
    }

    useHead(makeMeta(route.path,t('home.meta.title'), t('home.meta.description')))
    useHead({
      script: [
        { innerHTML: JSON.stringify(schema_org_data), type: 'application/ld+json' },
        rating.genScriptJson(rating.getHomeRatingByLang())
      ]
    })
  },

}
</script>

<style scoped>

</style>
