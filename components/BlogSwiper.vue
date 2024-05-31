<template>
  <div class="blog__container">
    <div class="top bd-bottom pb-3">
      <p class="center" style="font-size: 21px;font-weight: bold;margin: 0;">{{ $t('home.blog.title') }}</p>
      <nuxt-link :to="urlwithLocal('blog')" class="m-more-blogs">
        <span class="right">
          {{ $t('home.blog.read_all') }}
          <nuxt-img loading="lazy" src="/svg/ionic-ios-arrow-round-forward.svg" alt="read more blogs ico" width="20" height="13"/>
        </span>
      </nuxt-link>
    </div>
    <hr class="liner"/>
    <div class="post__container">
      <nuxt-img loading="lazy"
        src="/svg/ionic-md-arrow-dropleft-circle.svg"
        alt="blog swip right icon"
        @click="prevSlide()"
        width="38" height="38"
      />

      <swiper
          class="container-index"
        :loop="false"
        :modules="modules"
        :slides-per-view="1"
        :space-between="100"
        :pagination="{ clickable: true }"
        :breakpoints="swiperOptions.breakpoints"
        @swiper="onSwiper"
      >
        <swiper-slide class="post--item" v-for="news in last_news.data.blogs.data" style="min-height: 330px;">
          <NuxtLink :to="urlwithLocal('blog/'+news.bd_subject_link)">
            <nuxt-img alt="blog image" loading="lazy" :src="getBlogImage(news)" width="100" height="170"/>
          </NuxtLink>
          <NuxtLink class="content" :to="urlwithLocal('blog/'+news.bd_subject_link)">
            <span class="date">{{ getSubmiitedDate(news) }}</span>
            <b class="title">{{news.bd_subject}}</b>
            <span class="description">.</span>
            <div class="read-more">
              {{ $t('home.blog.read_more') }}
              <nuxt-img alt="blog read more icon" loading="lazy" width="20" height="13" src="/svg/ionic-ios-arrow-round-forward.svg" />
            </div>
          </NuxtLink>
        </swiper-slide>
      </swiper>

      <nuxt-img loading="lazy"
        src="/svg/ionic-md-arrow-dropright-circle.svg"
        alt="blog swip left icon"
        @click="nextSlide()"
        width="38" height="38"
      />
    </div>
  </div>
</template>

<style scoped>
@import "@/public/css/components/blogSwiper.css";
.read-more{
  text-decoration: none;
}
.line{
  width: 100%;
  height: 1px;
  color:#C3C3C3;
}

</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useSwiper } from "swiper/vue";
import {getLocaleRoutePath} from "~/plugins/i18n";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {blogapi} from "../composables/blogapi";
import moment from "moment";
import useUtils from "../composables/useUtils";

export default {
  name:'BlogSwiper',
  async setup(){
    const {urlwithLocal} = useUtils();
    async function getLastNews(){
      var payload = {
        'page': 0,
        'filter_author':'0',
        'filter_order':'desc',
        'filter_filterby':'0',
        'filter_category':'0',
      }
      return await blogapi.post('/index',payload);
    }
    const last_news = await getLastNews();

    return {last_news,urlwithLocal}
  },
  data: () => {
    return {
      getLocaleRoutePath,
      modules: [Pagination],
      swiper: "",
      swiperOptions: {
        loop: false,
        breakpoints: {
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      },
    };
  },

  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
    },

    nextSlide: function () {
      this.swiper.slideNext();
    },

    prevSlide: function () {
      this.swiper.slidePrev();
    },
    getSubmiitedDate(blog) {
      return moment(blog.blog_submitteddate * 1000).format("DD.MM.Y");
    },
    getBlogImage(blog){
      return 'https://blogadmin.whatsgaming.net/uploads/blogs/thumb_'+blog.blog_picture;
    },
  },

  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style>
.swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction{
  bottom: 0 !important;
}
.rtl_class .post__container .swiper-slide{
  min-width: 290px;
  direction: rtl;
}
.rtl_class .post__container .swiper-slide a{
  text-align: right;
}
.rtl_class .read-more img{
  transform: rotate(180deg);
}
</style>