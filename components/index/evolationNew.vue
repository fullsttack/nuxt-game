<template>
  <div class="mb-5">
    <div class="compontent-content bg-gray pt-4 con">
      <div class="container">
        <h2 class="headtitle"> {{ article_1.title }}</h2>
        <div class="mt-4" v-html="fixContentLinks(article_1.content)"></div>
      </div>
    </div>
    <div class="container col-edit mt-4">
      <div class="compontent-content col-md-12 row c-row equal-height">
        <div class="col-md-6 p-block column1">
          <h3>{{ colArticleLeft[0].title }}</h3>
          <div class="p" id="leftblock1" v-html="fixContentLinks(colArticleLeft[0].content)"></div>
          <nuxt-img loading="lazy" alt="statistics 1" src="/images/evolationnew/st1.webp" style="width: 100%;" width="auto" height="auto"/>
          <div class="p" v-html="fixContentLinks(colArticleLeft[0].content_1)"></div>
        </div>
        <div class="col-md-6 p-block mx-2 column2">
          <h3>{{ colArticleRight[0].title }}</h3>
          <div class="p" id="rightblock1" v-html="fixContentLinks(colArticleRight[0].content)"></div>
          <nuxt-img loading="lazy" alt="statistics 1" src="/images/evolationnew/st2.webp" style="width: 100%;" width="auto" height="auto"/>
          <div class="p" v-html="fixContentLinks(colArticleRight[0].content_1)"></div>
        </div>
      </div>
    </div>
    <div class="compontent-content bg-gray pt-3 con" style="padding: 0">
      <div class="container">
        <h2 class="headtitle">{{ fazit.title }}</h2>
        <div class="mt-3" v-html="fixContentLinks(fazit.content)"></div>
        <div class="d-flex justify-content-center align-items-center" style="margin-top: -10px;">
          <nuxt-img class="tripleicons" alt="triple fazit icon" loading="lazy" width="275" height="auto" src="/images/evolationnew/3icons.webp"/>
        </div>
      </div>
    </div>
    <div class="container compontent-content mt-4">
      <h2 class="headtitle">{{ safeBuyArticle.title }}</h2>
      <div class="mt-3" v-html="fixContentLinks(safeBuyArticle.content)"></div>
    </div>
    <div class="container compontent-content mt-5 fixmt-5">
      <h2 class="headtitle mb20">{{ $t('home.best_futcoinshop.title') }}</h2>
      <div class="futcoin-features mt-2 pt-5">
          <p class="text-center mt-2 m-auto" style="font-weight: 500;width: 90%;">{{$t('home.best_futcoinshop.desc')}}</p>
          <div class="items-container">
            <div v-for="i in 10" :key="i" class="item d-flex align-items-start">
              <nuxt-img loading="lazy" width="auto" height="auto" src="/images/evolationnew/item.svg" alt="green coin item icon"/>
              <span>{{ $t('home.best_futcoinshop.items_'+i) }}</span>
            </div>

          </div>
        <div class="num1">
          <nuxt-img loading="lazy" width="auto" height="auto" src="/images/evolationnew/num1.webp" alt="futcoinshop num1"/>
        </div>
      </div>
      <div>
        <div class="d-flex align-items-center justify-content-center mt-5 mb-4 titleicon" style="gap: 10px;">
          <nuxt-img loading="lazy" width="auto" height="auto" src="/images/evolationnew/ico1.svg" class="ico1" alt="fifa coin head icon"/>
          <h2 class="headtitle headtitleicon" style="margin: initial;"> {{where2BuyArticle.title }}</h2>
        </div>
        <div v-html="fixContentLinks(where2BuyArticle.content)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {SSRRequest} from "../../composables/SSRRequest";
import {onMounted} from "vue";
import useUtils from "../../composables/useUtils";
const {isDesktop} = useDevice();
const {fixContentLinks} = useUtils();
const [{ data: article_1 }, { data: colArticleLeft },{ data: colArticleRight },{ data: fazit },{ data: safeBuyArticle },{ data: where2BuyArticle }] = await Promise.all([
  SSRRequest.get(`articles/find/1712047714407`),
  SSRRequest.get(`articles?take=8&skip=0&aliases%5B0%5D=1712047828857`),
  SSRRequest.get(`articles?take=8&skip=0&aliases%5B0%5D=1712048026166`),
  SSRRequest.get(`articles/find/1712048168942`),
  SSRRequest.get(`articles/find/1712048211716`),
  SSRRequest.get(`articles/find/1712048245328`),
])
onMounted(()=>{
  if(isDesktop){
    let leftBlock = document.getElementById("leftblock1");
    let rightBlock = document.getElementById("rightblock1");
    leftBlock.style.minHeight = rightBlock.offsetHeight + 18 + "px";
  }
})
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
.headtitle2{
  color:#201D57;
  font-weight: bold;
  font-size: 21px;
  text-align: center;
}
.headtitle_line:after{
  content: '';
  height: 2px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.30);
  border-radius: 1px;
  margin: 0 auto;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.compontent-content{
  font-size: 16px;
  font-family: 'Montserrat';
  -webkit-text-stroke: 0.13px;
  text-align: justify;
}
.col-edit .col-md-12{
  padding: 0 !important;
}

.p-block h3{
  font-size:  var(--font-size-21px);
  font-weight: bold;
}
h2{
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
.p-block h3:after{
  content: '';
  height: 1px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.50);
  border-radius: 1px;
  margin: 0 auto;
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
}

.fazit{
  text-align: center;
  font-size:  var(--font-size-21px);
  font-weight: bold;
  margin-bottom: 10px;
}
.futcoin-features {
  width: 100%;
  min-height: 650px;
  height: auto;
  position: relative;
}
.futcoin-features::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/evolationnew/bg.svg");
  background-repeat: no-repeat;

  z-index: -1;
}
.rtl_class .futcoin-features::before{
  transform: scaleX(-1);
  filter: FlipH; /* For older browser support */
}
.items-container {
  max-height: 550px;
  width: 98%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1px;
  padding: 25px;
  padding-top: 0;
}
.futcoin-features p{
  margin-bottom: 20px !important;
}
.item {
  padding: 10px;
  gap: 8px;
  width: 520px;
  box-sizing: border-box;
  flex-basis: calc(50% - 10px);
}
.num1{
  position: absolute;
  right: 20%;
  bottom: 10%;
}
.num1 img{
  width: 233px;
  height: 155px;
}
.rtl_class .num1{
  right: initial !important;
  left: 20%;
}
@media screen and (min-width: 800px) {
  .c-row > div:first-child{
    padding-inline-start: 0px !important;
    padding-inline-end: 25px;
  }
  #leftblock1{
    min-height: 500px;
  }

  .c-row > div:last-child{
    padding-inline-end: 0px !important;
    padding-inline-start: 25px;
  }
}
.headtitleicon:after{
  transform: translateX(-50%) !important;
}
.rtl_class .headtitleicon:after{
  transform: translateX(45%) !important;
}
.ico1{
  margin-top: -8px
}
@media (max-width: 800px) {
  .ico1{
    margin-top: -15px
  }
  .headtitle {
    font-size: 17px;
  }

  .headtitle:after {
    margin-top: 12px;
  }
  .titleicon img{
    width: 30px !important;
    height: 30px !important;
    margin-top: -10px;
  }
  .futcoin-features{
    background-color: #FFF7DE;
    border-radius: 82px;
  }
  .futcoin-features::before{
    display: none;
  }
  .items-container{
    flex-wrap: nowrap;
    max-height: max-content;
  }
  .num1{
    position: relative;
    left: 50%;
    width: 50%;
    transform: translatex(-50%);
  }
  .rtl_class .num1{
    transform: translatex(-80%) !important;
  }
  .items-container{
    padding: 2px;
  }
  .items-container .item{
    width: 100%;
    gap: 5px;
    flex-basis: 100%;
    font-weight: 600;
    font-size: 12px;
  }
  .items-container .item img{
    width: 14px;
    height: 14px;
    margin-top: 10px;
  }
  .futcoin-features p{
    font-size: 13px;
    margin-bottom: 10px !important;
  }
  .num1 img{
    width: 196px;
    height: 131px;
  }
  /*.container{*/
  /*  padding: 15px !important;*/
  /*}*/
  .p-block h3{
    font-size: var(--font-size-17px);;
    margin-top: 10px;
    text-align: left !important;
    margin-bottom: -10px;
  }
  .fazit{
    font-size: 16px;
    margin-bottom: 10px;
  }
  .headtitle2{
    font-size: 16px;
    text-align: left;
  }
  .mb20{
    margin-bottom: 20px;
  }
  .p-block .p{
    min-height: auto;
  }
  .col-edit .col-md-12{
    padding: 0 !important;
    margin: 0 !important;
  }
  .fixmt-5{
    margin-top: 35px !important;
  }
  .mx-2{
    margin: 0 !important;
  }
  p,.p,.p *{
    font-size: var(--font-size-17px);
  }
  .titleicon{
    margin-left: -30px;
  }
  .tripleicons{
    width: 190px;
    height: auto;
  }
  .fix-sba{
    margin-top: 15px !important;
  }
}
</style>
<style>
.p picture img{
  width: 100% !important;
}
.p-block li{
  margin-inline-start: -15px !important;
}
@media (max-width: 800px) {
  .p-block li{
    margin-inline-start: -25px !important;
  }
}
</style>
