<template>
  <div>
    <TitleHeaderFootball>
      {{ $t('sell_coins.header.name_part_1') + ' ' + $t('sell_coins.header.name_part_2') }}
    </TitleHeaderFootball>
    <div class="container sellcoin-container">
      <div style="display: flex;">
        <nuxt-img loading="lazy" alt="sell coins" class="hold-img" src="/images/webp/sellcoin.webp"/>
      </div>
      <div class="text-discount" v-html="$t('sell_coins.page_description')"></div>
      <br><br>
    </div>
    <div class="graybox">
      <div class="container sellcoin-container">
        <h2 class="title-h2-1">{{ $t('sell_coins.where_sell.title') }}</h2>
        <div class="text-discount" v-html="$t('sell_coins.where_sell.desc')"></div>
      </div>
    </div>
    <div class="box-start-selling">
      <div class="col-60">
        <div class="hold-slogan">
          <h2>{{ $t('sell_coins.start_selling.title') }}</h2>
          <div class="hold-btn hold-btn-sell" style="text-align: center;">
            <a href="https://www.mydgn.com" class="btn btn-sell">{{ $t('sell_coins.start_selling.btn') }}</a>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="container">
      <div style="margin:0 auto;text-align: center;">
        <h2 class="title-h2-2">{{ $t('sell_coins.how_sell.title') }}</h2>
      </div>
      <br><br>
      <div class="col-md-12 row rtl-flex">
        <div class="col-md-6">
          <nuxt-img loading="lazy" alt="how to sell icon" class="hold-img howsell-img" src="/images/webp/howsell1.webp"/>
        </div>
        <div class="col-md-6">
          <div class="hold-text">
            <h3 class="title-h2-1">{{ $t('sell_coins.how_sell.panel.title') }}</h3>
            <div v-html="$t('sell_coins.how_sell.panel.desc')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="graybox">
      <div class="container">
        <br><br>
        <div class="col-md-12 row rtl-flex">
          <div class="col-md-6">
            <nuxt-img loading="lazy" alt="how to sell icon 2" class="hold-img howsell-img" src="/images/webp/howsell2.webp"/>
          </div>
          <div class="col-md-6">
            <div class="hold-text">
              <h3  class="title-h2-1">{{ $t('sell_coins.how_sell.player.title') }}</h3>
              <div v-html="$t('sell_coins.how_sell.player.desc')"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../components/blocks/TitleHeaderFootball";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
export default {
  setup(){
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' })
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.sell_coins')},
    ])
    useHead(makeMeta(route.path,t('sell_coins.meta.title'), t('sell_coins.meta.description')))
    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
      ],
    })
  },
  components: {TitleHeaderFootball}
}
</script>

<style scoped>
.sellcoin-container{
  width: 60% !important;
}
.text-discount {
  text-align: justify;
  position: relative;
  /*padding: 0 50px 10px;*/
  margin: 0 0 32px;
  line-height: 24px;
  font-size: 14px;
  color: #5e5c5c;
  font-weight: 400;
}
.hold-img {
  -webkit-box-shadow: 0 5px 30px 0 rgba(117,117,117,.3);
  box-shadow: 0 5px 30px 0 rgba(117,117,117,.3);
  width: 70%;
  margin: 0 auto;
  margin-bottom: 50px;
  margin-top: 50px;
}
.title-h2-1 {
  font-size: 25px;
  line-height: 30px;
  margin: 0 0 37px;
  color: #201d56;
  font-weight: bold;
}
.title-h2-2 {
  font-size: 30px;
  line-height: 30px;
  margin: 0 0 37px;
  color: #201d56;
  font-weight: bold;
}
.box-start-selling {
  padding: 54px 0 44px;
  background: url(/images/sellcoins/bg-start-selling.png) 50% 50% no-repeat;
  background-size: auto;
  background-size: cover;
  min-height: 230px;
}
.box-start-selling .hold-slogan h2 {
  color: #fff;
  font-size: 30px;
  line-height: 42px;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 37px;
  font-weight: 600;
}
.box-start-selling .col-60{
  width: 50%;
  margin:0 auto;
}
.box-start-selling .hold-slogan .hold-btn .btn {
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
  display: inline-block;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  padding: 18px 50px;
  min-width: 220px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  color: #fff;
  background: #e90052;
  -webkit-box-shadow: 0 5px 15px rgba(233,0,82,.3);
  box-shadow: 0 5px 15px rgba(233,0,82,.3);
  border-radius: 50px;
  -webkit-transition: opacity .2s ease-in-out;
  -o-transition: opacity .2s ease-in-out;
  transition: opacity .2s ease-in-out;
}
.box-start-selling .hold-slogan .hold-btn .btn:hover{
  background: #ee346d;
  transition: opacity .2s ease-in-out;
}
.howsell-img{
  width: 90% !important;
  margin-top:0px;
}
.hold-text p{
  text-align: justify;
  font-size: 14px;
}
.graybox{
  background: #f9f9f9;padding: 25px;color:black;
}
@media (max-width: 800px) {
  .sellcoin-container,.hold-img,.box-start-selling .col-60{
    width: 100% !important;
  }
  ol{
    padding:0;
    margin:20px;
  }
  .graybox{
    padding:0;
  }
  .title-h2-2,.title-h2-1{
    font-size: 24px;
    text-align: center;
  }
}
</style>