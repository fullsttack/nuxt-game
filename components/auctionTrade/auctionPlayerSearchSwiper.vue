<template>
  <div  class="swip-container">
      <img
          src="/images/auction/trade/left-swip.svg"
          alt="player swip right icon"
          @click="swiper.slidePrev();"
          :class="{disnav:swiper.isBeginning}"
          class="d-view"
      />
      <img
          src="/images/auction/trade/left-swip-l.svg"
          alt="player swip right icon"
          @click="swiper.slidePrev();"
          :class="{disnav:swiper.isBeginning}"
          class="r-view"
      />
      <div>
        <swiper
            :slidesPerView="3"
            :pagination="{clickable: false}"
            class="mySwiper"
            :centeredSlidesBounds="true"
            :centeredSlides="isPhone"
            @swiper="onSwiper"
            :breakpoints="swiperOptions.breakpoints"
            @slideChange="onSlideChange"
        >
          <swiper-slide v-for="(player,index) in players" :class="{swiperslideselected:player.id===selectedPlayer.id}" :key="player.id" @click="onPlayerClick(player,index)">
            <img :src="player.img" :class="{bought:player.transfer}"/>
            <div class="bought_info" v-if="player.transfer" :class="{
              pending:['wait', 'pending'].includes(player.transfer.status),
              bought:['bought'].includes(player.transfer.status),
              canceled:['canceled'].includes(player.transfer.status)
            }">
              <div v-if="['wait', 'pending'].includes(player.transfer.status)" class="pending">
                {{ $t('auction.player_pending_status') }}
              </div>
              <div v-else-if="['bought'].includes(player.transfer.status)" class="bought">
                {{ $t('auction.player_bought_status') }}
              </div>
              <div v-else-if="['canceled'].includes(player.transfer.status)" class="canceled">
                {{ $t('auction.player_cancelled_status') }}
              </div>
            </div>
            <div v-else-if="isPhone" class="not_bought_info">
              {{player.price.format(0, 3, '.')}}
              <img class="coin" src="/images/auction/trade/coins.svg" />
            </div>
            <div v-else-if="!isPhone && player.transfer === null" class="bought_info not_bought_info_desktop">
              {{player.price.format(0, 3, '.')}}
              <img class="coin" src="/images/auction/trade/coins.svg" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    <img
        src="/images/auction/trade/right-swip.svg"
        alt="player swip right icon"
        @click="swiper.slideNext();"
        :class="{disnav:swiper.isEnd}"
        class="d-view"
    />
    <img
        src="/images/auction/trade/right-swip-l.svg"
        alt="player swip right icon"
        @click="swiper.slideNext();"
        :class="{disnav:swiper.isEnd}"
        class="r-view"
    />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import 'swiper/css/pagination';
export default {
  name: "auctionPlayerSearchSwiper",
  props:{
    players:{
      default:[],
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data: () => {
    return {
      swiper: "",
      selectedPlayer:'',
      swiperOptions: {
        loop: false,
        breakpoints: {
          500: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1080:{
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 18,
          },
        },
      },
    };
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
      this.selectedPlayer = this.players[0];
      this.$emit('init',swiper);
    },
    onPlayerClick(player,index){
      this.selectedPlayer = player;
      this.swiper.slideTo(index);
      this.$emit('player_selected',player);
    },
    onSlideChange(){
      if(this.swiper.activeIndex !== undefined){
        const player = this.players[this.swiper.activeIndex];
        this.selectedPlayer = player;
        this.$emit('player_selected',player);
      }
    },
  },
  computed:{
    isPhone(){
      return window.innerWidth < 800;
    }
  }
}
</script>


<style scoped>
.swiper{
  padding-left: 10px;
  padding-right: 10px;
}
.swiper-slide{
  /*width: 155px !important;*/
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.6;
  flex-direction: column;
  margin-top: 5px;
}
.swiper-slide img:not(.coin) {
  width: 88%;
  /*margin-top: 3px;*/
  margin-top: -2px;
  margin-bottom: 3px;
}
.swiperslideselected{
  border: 2px solid #201D56;
  border-radius: 11px;
  opacity: 1;

  box-shadow: 0px 0px 10px 0.5px  rgba(32, 29, 86, 0.8);
  -webkit-box-shadow: 0px 0px 10px 0.5px  rgba(32, 29, 86, 0.8);
}

.swip-container{
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin: auto;
  gap: 35px;
  margin-top: 25px;
  /* width: 90%; */
  justify-content: center;
  padding-left: 10px;
  margin-top:-5px;
  padding-right: 10px;
}
.swip-container > div{
  width: 80%;
  margin-top: -5px;
}
.swip-container > img{
  margin-top: -20px;
  cursor: pointer;
}
.swip-container > img:hover{
  filter:brightness(3);
}
.swip-container > img.disnav{
  /*cursor: initial !important;*/
  /*filter: invert(50%) grayscale(1);*/
  visibility: hidden;
}
.not_bought_info{
  display: none;
}
.bought_info{
  line-height: 12px;
  color: white;
  font-size: var(--font-size-12px);
  position: absolute;
  bottom: -15px;
  min-width: 116px;
  padding: 6px;
  width: -moz-max-content;
  width: max-content;
  border-radius: 18px;
  font-weight: bold;
  padding-top: 7px;
  background: red;
  text-align: center;
}
.bought_info.pending{
  background-color: #FF7A00;
}
.bought_info.bought{
  background-color: #05A11E;
}
.bought_info.canceled{
  background-color: #DE1D1D;
}
.not_bought_info_desktop{
  background-color: white;
  color:#201D56;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.swiperslideselected > .not_bought_info_desktop{
  background-color: #201D56 !important;
  color:white;
}
.not_bought_info_desktop img{
  width: 15px;
  height: 15px;
}
@media (max-width: 768px) {
  .swip-container > div{
    margin-top: 0;
  }
  .swiperslideselected{
    border: none;
    box-shadow: none;
    -webkit-box-shadow: none;
  }
  .swiper-slide:not(.swiperslideselected){
    opacity: 0.5;
    /*transform: scale(0.9);*/
  }
  .swiper-slide{
    /*width: 85px !important;*/
    height: 135px;
    padding-top: 10px;
    margin-top:inherit;
  }
  .swiper-slide img:not(.coin){
    width: 65%;
    margin-top:-10px;
  }
  .swip-container{
    padding: 0;
    gap:20px;
    margin-top: -22px;
  }
  .swip-container > img{
    margin-top: -40px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .swiperslideselected img:not(.coin){
    /*transform: scale(1.2);*/
    width: 90%;
  }
  .swiper-slide:not(.swiperslideselected) .bought_info{
    transform: scale(0.7);
    bottom: 0px !important;

  }
  .swiper-slide.swiperslideselected .not_bought_info{
    /*margin-top: 9px;*/
    margin-bottom: -4px;
  }
  .not_bought_info{
    font-size: 11px;
    font-weight: bold;
    display: flex;
    gap: 4px;
    align-items: center;
    /*margin-top: 6px;*/
  }
  .bought_info{
    min-width: 80px;
    bottom: 0px;
    height: 21px;
    padding-top: 4.5px;
    font-size: 10px;
    transform: scale(0.85);
  }
  .coin{
    width: 15px;
    height: 12px;
    margin-top: -1px;
  }
  .disnav{
    visibility: hidden;
  }
  .swiper-slide .bought_info{
    position: relative;
  }
  .swiperslideselected .bought_info{
    position: absolute;
  }
}
@media (min-width: 768px) and (max-width: 900px){
  .swip-container {
    height: auto;
    padding-top:25px;
    margin-bottom: -40px;
  }
  .swiper-slide{
    height: auto;
  }
  .not_bought_info{
    font-size: initial;
  }
  .bought_info{
    bottom: -10px;
    transform: none;
  }
  .swiper{
    padding: 0 !important;
  }
}
</style>