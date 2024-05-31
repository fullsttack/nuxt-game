<template>
  <TitleHeaderFootball>
    {{ page.title }}
  </TitleHeaderFootball>
  <div style="direction: ltr;" class="col-md-12 center-column i__container" id="content" v-html="page.content"></div>
</template>

<script>
import TitleHeaderFootball from "../../../components/blocks/TitleHeaderFootball";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
import {SSRRequest} from "~/composables/SSRRequest";
import {useHead} from "unhead";
import {reactive} from "vue";
export default {
  components: {TitleHeaderFootball},
  async setup(){
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' })
    let page = reactive({});
    try {
      page = (await SSRRequest.get('page/imprint'))?.data || []
    }catch (e) {
      page.title = "IMPRINT";
      page.name = "imprint"
      page.meta_title = "WhatsGaming FIFA Coins - Imprint";
      page.meta_keywords = "IMPRINT";
      page.meta_description = "Contact Information, Phone number, company registration no of WhatsGaming FIFA Coins. Have a look at the WhatsGaming's details to prove its legitimacy.";
      page.content = '<p><strong>UNITED TECHNOLOGY NETWORK LTD</strong></p>\n' +
          '\n' +
          '<p>(82 Lewis Rd, Llandough, Penarth, United Kingdom, CF64 2LX)</p>\n' +
          '\n' +
          '<p><strong>Authorized representative: („Executive Director“) </strong><br />\n' +
          'Yang Liu</p>\n' +
          '\n' +
          '<p><strong>Contact:</strong><br />\n' +
          'Phone: 00852-21376113 (NO SUPPORT)<br />\n' +
          'E-Mail: info@whatsgaming.net</p>\n' +
          '\n' +
          '<p>Telegram Customer service (external service): +<b data-v-a3bd5f94="">447360279243</b></p>';
    }
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.imprint')},
    ])
    useHead(makeMeta(route.path, page.meta_title, page.meta_description))
    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
      ],
    })
    return {
      page
    }
  },
}
</script>

<style scoped>
img{
  width: 25px;
  margin-top: -8px;
}
.i__container {
  position: relative;
  top: -56px;
  margin: auto;
  width: 100%;
  max-width: 776px;
  padding: 17px 42px;
  background: white;
  filter: drop-shadow(0px 0px 14px rgba(0, 0, 0, 0.161));
  border-radius: 10px;
}

.center-column {
  padding-top: 60px;
  position: relative;
  margin-bottom: -20px;
}
</style>