<template>
  <div class="container">
    <div class="text-title-how">
      <h2 class="text-color font-weight-bold mb-4 f24 h2size">
<!--        How to Buy FIFA Coins-->
        {{ $t('home.player_auction.advantages.title')}}
      </h2>
      <ul class="h-list bd-bottom d-flex justify-content-center align-items-center">
        <li v-for="type in buy_types" @click="selectBuyType(type)" class="list_item noselect" style="cursor: pointer">
          <span :class="{ 'list_link-active': type === buy_type }" class="list_link">
            <nuxt-img loading="lazy" :src="'/images/'+type+'/icon'+(type === buy_type ? '_active' : '')+'.svg'" width="18" height="20" class="mr-2" alt="chair"/>
            <span>{{ $t('home.navigation.' + getBuyTypeInTranslates(type)) }}</span>
          </span>
        </li>
      </ul>
<!--      <div style="margin: 0 auto">-->
<!--        <div class="featured-text__container row my-3 px-3">-->
<!--          <div v-for="i in 3" class="featured-text desktop font-weight-bold">-->
<!--            <nuxt-img loading="lazy" :src="'/images/'+buy_type+'/advantages/'+i+'.svg'" class="mr-2" alt="" />-->
<!--            <span> {{ $t('home.'+buyTypeInTranslates+'.advantages.items.'+i) }}</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="phone">-->
<!--        &lt;!&ndash;            <nuxt-img loading="lazy" :src="'/images/'+buy_type+'/'+($i18n.locale==='de'?'de':'en')+'/Step_'+newsSliderSlide+'_sm.png'" style="max-width: 253px" class="featured-text phone" :key="'advantages_img'"/>&ndash;&gt;-->
<!--        <img v-if="newsSliderSlide==1" loading="lazy" src="/images/screenshots/buybox.png" style="max-width: 253px;margin: 0 auto;margin-top: -15px;" class="featured-text phone" :key="'advantages_img'"/>-->
<!--        <div class="vplayer video_mobile" v-else>-->
<!--          <div class="btn-video-group">-->
<!--            <div class="btn-video play-video" @click="playVideo">-->
<!--              <img v-if="loadingVideo" src="/images/loading.gif" style="width: 100%;" alt="loading gif"/>-->
<!--              <img v-else src="/images/vplayer/play-button.png" style="width: 100%;" alt="video player play icon"/>-->
<!--            </div>-->
<!--            <div class="btn-video play-pause" @click="pauseVideo">-->
<!--              <img src="/images/vplayer/icon-pause.svg" alt="video player pause icon"/>-->
<!--            </div>-->
<!--          </div>-->
<!--          <video v-if="newsSliderSlide===2" :id="'videoplayer_mob-'+buy_type+'-2'" width="100%" height="1282px" playsinline>-->
<!--            <source type="video/mp4">-->
<!--            Your browser does not support the video tag.-->
<!--          </video>-->
<!--          <video v-if="newsSliderSlide===3" :id="'videoplayer_mob-'+buy_type+'-3'" width="100%" height="1282px" playsinline>-->
<!--            <source type="video/mp4">-->
<!--            Your browser does not support the video tag.-->
<!--          </video>-->
<!--        </div>-->
<!--      </div>-->

    </div>


    <div class="row">
      <div class="col-md-6 col-5"></div>
      <div class="col-md-6 col-lg-4 col-6 nav-arrow desktop">
        <span class="slider-counter">1/3</span>
        <div class="arrows" style="margin-right: -15px">
          <img
            @click="newsSlider.trigger('prev.owl.carousel')"
            src="/svg/icon-feather-arrow-left-circle.svg"
            alt="carousel left icon"

          />
          <img
            @click="newsSlider.trigger('next.owl.carousel')"
            src="/svg/icon-feather-arrow-right-circle.svg"
            alt="carousel right icon"
          />
        </div>
      </div>
    </div>

    <div class="nav-arrow phone" style="margin-bottom: 10px;">
      <img
          style="width: 28px;"
          @mousedown="newsSlider.trigger('prev.owl.carousel')"
          src="/svg/icon-feather-arrow-left-circle.svg"
          alt="carousel left icon"
          width="28" height="28"
      />
      <span class="slider-counter">1/3</span>
      <img
          style="width: 28px;"
          @mousedown="newsSlider.trigger('next.owl.carousel')"
          src="/svg/icon-feather-arrow-right-circle.svg"
          alt="carousel right icon"
          width="28" height="28"
      />
    </div>

    <div class="owl-carousel">

      <div class="row mb-2" v-for="i in 3" :key="i">

        <div class="col-md-6 order-md-2 news ">
          <div class="only-phone">
            <!--            <nuxt-img loading="lazy" :src="'/images/'+buy_type+'/'+($i18n.locale==='de'?'de':'en')+'/Step_'+newsSliderSlide+'_sm.png'" style="max-width: 253px" class="featured-text phone" :key="'advantages_img'"/>-->
            <nuxt-img loading="lazy" v-if="newsSliderSlide==1" src="/images/webp/buybox.webp" width="265" height="100" style="width: 265px;margin: 0 auto;margin-top: -15px;" class="featured-text phone" :key="'advantages_img'" alt="buybox img phone"/>

            <div class="vplayer video_mobile" v-else>
              <div class="btn-video-group">
                <div class="btn-video play-video mobile-play-video" @click="playVideo" :key="newsSliderSlide">
                  <img v-if="loadingVideo" src="/images/loading.gif" style="width: 100%;" class="v-icon" alt="video player loading icon"/>
                  <nuxt-img quality="90" format="webp" v-else src="/images/vplayer/play-button.png" style="width: 100%;" class="v-icon" alt="video player play icon"/>
                </div>
              </div>
              <video :id="'videoplayer_mob-'+buy_type+'-'+i" :key="newsSliderSlide" width="100%" height="1282px" playsinline>
                <source type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div class="news-title">
            {{ $t('home.'+buyTypeInTranslates+'.how_it_works.items.'+i) }}
          </div>
          <p class="lead text-color video-des">
            {{ $t('home.'+buyTypeInTranslates+'.how_it_works.items.'+i+'_desc') }}
          </p>
        </div>
        <div class="col-md-6 order-md-1 player-image desktop" :class="newsSliderSlide !== 1 ? 'video_desktop_container':''">
          <nuxt-img loading="lazy" v-if="newsSliderSlide===1"
            src="/images/webp/buybox_ss.webp"
            class="img-fluid mx-auto"
            width="551"
            height="351"
            style="margin-right: 15px !important"
            alt="player image"
          />
          <div class="vplayer" v-else>
            <div class="btn-video-group">
              <div class="btn-video play-video" @click="playVideo">
                <img v-if="loadingVideo" src="/images/loading.gif" style="width: 100%;" class="v-icon" alt="video player loading icon"/>
                <nuxt-img quality="80" format="webp" v-else src="/images/vplayer/play-button.png" style="width: 100%;" class="v-icon" alt="video player play icon"/>
              </div>
              <div class="btn-video play-pause" @click="pauseVideo">
                <img src="/images/vplayer/icon-pause.svg" class="v-icon" alt="video player pause icon"/>
              </div>
            </div>
            <video :id="'videoplayer_dsk-'+buy_type+'-'+i" ref="videoplayer_dsk2" :key="newsSliderSlide" style="margin-right: 15px !important;">
              <source type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
    <div class="showline">
      <hr class=" liner fixliner"/>
    </div>
  </div>
</template>

<script>
import Wgloading from "./blocks/wgloading";
import { getCurrentInstance } from 'vue';
export default {
  components: {Wgloading},
  data: () => {
    return {
      buy_types: ['comfort', 'auction'],
      buy_type: 'comfort',
      newsSlider: "",
      newsSliderSlide: 1,
      videoSrc:'',
      loadingVideo:true
    };
  },
  computed: {
    comfortSelected() {
      return this.buy_type === 'comfort'
    },
    buyTypeInTranslates() {
      return this.comfortSelected ? 'comfort_trade' : 'player_auction'
    },
  },

  methods: {
    selectBuyType(type) {
      this.newsSlider.trigger('to.owl.carousel', [0, 200, true]);
      this.buy_type = type;
    },
    getBuyTypeInTranslates(type) {
      return type === 'comfort' ? 'comfort_trade' : 'player_auction'
    },
    counter: function (event) {
      if (!event.namespace) {
        return;
      }
      var slides = event.relatedTarget;
      this.newsSliderSlide = slides.current() + 1;

      $(".slider-counter").text(
        slides.relative(slides.current()) + 1 + "/" + slides.items().length
      );
    },
    playVideo(){

      this.getVideoPlayer().play();
      $(".play-video").hide();
      $(".play-replay").hide();
      $(".play-pause").show();
    },
    pauseVideo(){
      this.getVideoPlayer().pause();
      $(".play-video").show();
      $(".play-replay").show();
      $(".play-pause").hide();
    },
    repeatVideo(){
      this.getVideoPlayer().pause();
      this.getVideoPlayer().currentTime = 0;
      $(".play-video").show();
      $(".play-replay").show();
      $(".play-pause").hide();
    },
    fullScreenVideo(){
      var elem = this.getVideoPlayer();
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    },
    isPhone(){
      return window.innerWidth < 830;
    },
    getVideoPlayer(){
      if(this.isPhone()){
        return document.getElementById('videoplayer_mob-' + this.buy_type + '-' + this.newsSliderSlide);
      }else{
        return document.getElementById('videoplayer_dsk-' + this.buy_type + '-' + this.newsSliderSlide);
      }
    },
    getDesktopVideoPlayer(){
      return 'videoplayer_dsk-' + this.buy_type + '-' + this.newsSliderSlide;
    },
    getMobileVideoPlayer(){
      return 'videoplayer_mob-' + this.buy_type + '-' + this.newsSliderSlide;
    }
  },

  mounted: function () {
    this.newsSlider = $(".owl-carousel").owlCarousel({
      items: 1,
      center: true,
      onInitialized: this.counter,
      onChanged: this.counter,
    });



  },
  watch:{
    newsSliderSlide:function (n){
      if(n !== 1){

        this.$nextTick(()=>{
          this.loadingVideo = true;
          if(this.isPhone()){
            $('video').attr('width','100%').attr('height','400px');
            this.getVideoPlayer().onloadeddata = null;
            $("#"+this.getMobileVideoPlayer()+" source").removeAttr('src');
            //$("#"+this.getMobileVideoPlayer()).removeAttr('poster');
            if(this.buy_type === 'auction'){
              if(n === 2){
                $("#"+this.getMobileVideoPlayer()).attr('poster','/videos/pa2_pooster.png');
                $("#"+this.getMobileVideoPlayer()+" source").attr('src','/videos/FUT_Player_Auction_1.mp4');
              }else{
                $("#"+this.getMobileVideoPlayer()).attr('poster','/videos/pa3_pooster.png');
                $("#"+this.getMobileVideoPlayer()+" source").attr('src','/videos/FUT_Player_Auction_2.mp4');
              }
            }else{

              if(n === 2){

                //$("#"+this.getMobileVideoPlayer()).attr('poster','/videos/ct2_pooster.png');
                $("#"+this.getMobileVideoPlayer()+" source").attr('src','/videos/FUT_Comfort_Trade_v1_new.mp4');
              }else{
                //$("#"+this.getMobileVideoPlayer()).attr('poster','/videos/ct3_pooster.png');
                $("#"+this.getMobileVideoPlayer()+" source").attr('src','/videos/FUT_Comfort_Trade_v2.mp4');
              }
            }
            if (/iPad|iPhone|iPod/.test(navigator.userAgent))
              this.getVideoPlayer().autoplay = true;

          }else {
              $('video').attr('width','100%').attr('height','320px');
              if(this.buy_type === 'auction'){
                if(n === 2){
                  $("#"+this.getDesktopVideoPlayer()+" source").attr('src','/videos/FUT_Player_Auction_full1.mp4');
                }else{
                  $("#"+this.getDesktopVideoPlayer()+" source").attr('src','/videos/FUT_Player_Auction_full2.mp4');
                }
              }else{
                if(n === 2){
                  $("#"+this.getDesktopVideoPlayer()+" source").attr('src','/videos/FUT_Comfort_Trade_full1_new.mp4');
                 // this.getVideoPlayer().src = '/videos/FUT_Comfort_Trade_full1.mp4';
                }else{
                  $("#"+this.getDesktopVideoPlayer()+" source").attr('src','/videos/FUT_Comfort_Trade_full2_new.mp4');
                }
              }
            }
            var $t = this;

            this.getVideoPlayer().onloadeddata = () => {
              this.loadingVideo = false;
            };

            this.getVideoPlayer().addEventListener('loadeddata', function() {
              $t.loadingVideo = false;
            }, false);
            this.getVideoPlayer().oncanplay = () => {
              this.loadingVideo = false;
            };
            $(".mobile-play-video").on('touchstart',function (){
              $t.playVideo();
            });
            this.repeatVideo();
            this.$forceUpdate();

        });

      }
    }
  }
};
</script>

<style scoped>
@import "@/public/css/components/videoComponent.css";

@media (max-width: 768px){
  .h-list{
    padding:0;
    padding-bottom: 10px;
  }
}
</style>