<template>
  <div class="review-container">
    <nuxt-img loading="lazy"
        src="/images/index24/review_nav_left.svg"
        alt="review swip left icon"
        @click="swiper.slidePrev();"
        :class="{disnav:swiper.isBeginning}"
    />
    <div class="swiper-container">
      <swiper
          :pagination="{clickable: false}"
          class="mySwiper"
          @swiper="onSwiper"
          :breakpoints="swiperOptions.breakpoints"
          @slideChange="onSlideChange"
      >
        <swiper-slide v-for="item in reviewData" :key="item.id">
          <ReviewItem :item="item"/>
        </swiper-slide>
      </swiper>
    </div>
    <nuxt-img loading="lazy"
        src="/images/index24/review_nav_right.svg"
        alt="review swip right icon"
        @click="swiper.slideNext();"
        :class="{disnav:swiper.isEnd}"
    />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
/*! purgecss start ignore */
import "swiper/css";
import "swiper/css/navigation";
/*! purgecss end ignore */
import ReviewItem from "./ReviewItem";
import {ref} from "vue";
export default {
  name: "ReviewSwiper",
  components: {
    ReviewItem,
    Swiper,
    SwiperSlide,
  },
  setup(){

    const reviewData = ref([
      {
        id:1,
        email:'davidbration@gmail.com',
        console:'ps',
        buytype:'auction',
        coins:'700'
      },
      {
        id:2,
        email:'oliver_oewsell94@yahoo.com',
        console:'pc',
        buytype:'auction',
        coins:'2000'
      },
      {
        id:3,
        email:'hannah1647546@gmail.com',
        console:'ps',
        buytype:'comfort',
        coins:'500'
      },
      {
        id:4,
        email:'lukas.mohammadi88@gmail.com',
        console:'xbox',
        buytype:'comfort',
        coins:'1000'
      },
      {
        id:5,
        email:'juan.usa35659@gmail.com',
        console:'xbox',
        buytype:'auction',
        coins:'100'
      },
      {
        id:6,
        email:'ricardo_lunicano97@yahoo.com',
        console:'ps',
        buytype:'comfort',
        coins:'1000'
      },
      {
        id:7,
        email:'shi_jan_hova25@yahoo.com',
        console:'ps',
        buytype:'comfort',
        coins:'1000'
      }
    ]);
    return {reviewData}
  },
  data: () => {
    return {
      swiper: "",
      selectedPlayer:'',
      swiperOptions: {
        loop: false,
        breakpoints: {
          500: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          700: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          1900: {
            slidesPerView: 4,
            spaceBetween: 9,
          },
        },
      },
    };
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
    },
    onSlideChange() {

    },
  }
}
</script>

<style scoped>
.review-container{
  display: flex;
  justify-content: center;
  gap: 3%;
}
.review-container > img:hover{
  filter:brightness(3);
  cursor: pointer;
}
.swiper-container{
  width: 1315px;
  max-width: 1315px;
  position: relative;
  padding: 0;
  margin-top: 25px;
}
.disnav{
  visibility: hidden;
}
@media (max-width: 1600px) {
  .review-container{
    width: 95%;
    margin: 0 auto;
    align-items: center;
    gap: 1.5%;
  }
  .review-container > img{
    width: 9px;
    height: 16px;
  }
  .swiper-container{
    width: 90%;
  }
}
</style>