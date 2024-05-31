<template>
  <div class="bg-gray">
    <div class="container-index">
      <div class="changes24">
        <h2 class="headtitle">{{ $t('home.fifa_24_title') }}</h2>

        <div class="changes_item col-md-12 row changes_item_first">
          <div class="col-md-9">
            <h3>{{ $t('home.fifa_24_1_title') }}</h3>
            <div v-html="$t('home.fifa_24_1_text')"></div>
          </div>
          <div class="col-md-3 ">
            <nuxt-img loading="lazy" class="desktop-view" alt="changes image 1" src="/images/index24/Evelotion_Desktop.webp" densities="x1 x2" width="355" height="230" />
            <nuxt-img loading="lazy" class="responsive-view" style="max-inline-size: 100%;" densities="x1 x2" alt="changes image 1" src="/images/index24/Evelotion_Mobile.webp" width="355" height="230"/>
          </div>
        </div>
        <div class="changes_item col-md-12 row">
          <div class="col-md-9">
            <h3>{{ $t('home.fifa_24_2_title') }}</h3>
            <div v-html="$t('home.fifa_24_2_text')"></div>
          </div>
          <div class="col-md-3">
            <nuxt-img loading="lazy" class="desktop-view" densities="x1 x2" alt="changes image 2" src="/images/index24/Women_Desktop.webp" width="355" height="230" />
            <nuxt-img loading="lazy" class="responsive-view" densities="x1 x2" alt="changes image 2" src="/images/index24/Women_Mobile.webp" width="355" height="230" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "evolationold"
}
</script>

<style scoped>
.bg-gray{
  background-color: #F1F1F1;
  padding-top: 0px;
  padding-bottom: 50px;
}

.headtitle{
  margin: 0 auto;
  color:#201D57;
  font-weight: bold;
  font-size: 21px;
  text-align: center;
}
.headtitle:after{
  content: '';
  height: 4px;
  width: 55px;
  background-color: #201D57;
  border-radius: 1px;
  margin: 0 auto;
  display: block;
  margin-top: 7px;
}
.changes24{
  padding-top: 35px;
}
.changes_item{
  align-items: center;
  margin-top: 50px;
}
.changes_item > div:first-child{

  padding-right: 40px;
}
.changes_item > div:first-child > h3{
  font-size: 18px;
  font-weight: bold;
}
.changes_item > div:first-child > p:last-child{
  font-size: 16px;
  font-weight: 500  ;
}

.changes_item_firstpic:after{
  content: '';
  background: url("/images/index24/arrow_down.svg");
  background-repeat: no-repeat;
  background-size: 40px 40px;
  background-position: right center;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
}
.changes_item_first{
  margin-top: 25px;
}
@media (min-width: 800px) {
  .changes_item{
    padding: 0;
  }
  .changes_item img{
    margin-left: -25px;
  }
}
@media (max-width: 800px) {
  .headtitle{
    font-size: 18px;
  }
  .headtitle:after{
    margin-top: 12px;
  }
  .changes_item > div:first-child > h3  {
    font-size: 16px;
  }
  .changes_item > div:first-child > p:last-child{
    font-size: 13px;
  }
  .changes_item > div:first-child{
    padding-right: 0;
  }
  .changes_item img{
    margin-left: 0;
    width: 100%;
  }
  .changes_item_firstpic:after{
    bottom: -60px;
  }
  .changes_item{
    margin-top: 75px;
    margin-left: 0;
  }
  .changes_item_first{
    margin-top: 25px !important;
  }
  .changes_item img{
    width: inherit !important;
    height: initial;

  }
}
@media (max-width: 912px) {
  .changes_item img{
    width: inherit !important;
    height: initial;

  }
}
</style>