<template>
  <div class="post-grid__item advertisement" style="height: 100%">
    <div class="posts__item--card" style="min-height: initial">
      <div v-if="GetScreenWidth > 992" class="posts__item posts__item--quote">
        <div class="title">Advertisement</div>
        <div class="card__content">
          <nuxt-img loading="lazy" src="/images/promotion/banner.webp" alt="promotion picture" width="340" height="285" />
        </div>
      </div>

      <div class="post-grid__item promotion">
        <div class="posts__item--card">
          <div class="posts__item posts__item--quote" style="height: 100%">
            <div class="title">Promotion</div>
            <div class="card__content">
              <nuxt-link no-prefetch :to="urlwithLocal('fc-coins/fc-24-coins')" >
                <nuxt-img loading="lazy" src="/images/promotion/banner.webp" alt="promotion picture" width="340" height="285" />
              </nuxt-link>
              <nuxt-link class="buy-btn fc-animation-bounce" style="text-decoration: none;gap: 10px;" :to="urlwithLocal('fc-coins/fc-24-coins')" >
                <nuxt-img src="/svg/coins.svg" width="20" height="20" alt="coin icon" loading="lazy" style="width: initial" />
                <div>Buy Coins Now</div>
              </nuxt-link>
              <div  v-if="promotion.showTimer" class="promotion">
                <div class="promotion&#45;&#45;title"></div>
<!--                <div class="promotion&#45;&#45;title">Promotion Ends</div>-->
<!--                <div class="timer">-->
<!--                  <div class="time">-->
<!--                    <b>00</b>-->
<!--                    <span>Days</span>-->
<!--                  </div>-->
<!--                  <span>:</span>-->
<!--                  <div class="time">-->
<!--                    <b>20</b>-->
<!--                    <span>Hours</span>-->
<!--                  </div>-->
<!--                  <span>:</span>-->
<!--                  <div class="time">-->
<!--                    <b>00</b>-->
<!--                    <span>Minutes</span>-->
<!--                  </div>-->
<!--                  <span>:</span>-->
<!--                  <div class="time">-->
<!--                    <b>00</b>-->
<!--                    <span>Seconds</span>-->
<!--                  </div>-->
<!--                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="https://www.instagram.com/whatsgaming/" target="_blank" class="social-media instagram" v-if="!promotion.showTimer" style="text-decoration: none">
        <nuxt-img loading="lazy" src="/images/instagram.png" alt="instagram logo" height="40" width="40" />
        <div class="content">
          <b>Like Our Instagram page</b>
          <span>Likes</span>
        </div>
        <nuxt-img loading="lazy" src="/images/icon_feather-plus-circle.png" alt="share to insta icon" height="28" width="28" />
      </a>
    </div>
  </div>
</template>

<style scoped>
 
.posts__item--card {
  height: max-content;
  /*min-height: 508px;*/
}

.posts__item--card{
  margin-bottom: 15px;
}

.posts__item--quote {
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  min-width: 304px;
}

.posts__item--quote .title {
  display: flex;
  align-items: center;
  padding-inline-start: 26px;
  font-weight: 700;
  font-size: 16px;
  height: 72px;
  color: #000000;
  height: 72px;
  border-left: 6px solid #34307c;
  border-bottom: 1px solid #ececec;
  width: 100%;
}

.posts__item--quote .card__content {
  padding: 11px 36px;
}

.posts__item--quote .card__content img {
  width: 100%;
}

.posts__item--quote .card__content .buy-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #DB025D;
  color: white;
  font-weight: 700;
  font-size: 11px;
  width: 100%;
  height: 44px;
  margin: 15px auto;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

.posts__item--quote .card__content .buy-btn:hover {
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.post-grid__item.promotion {
  margin-top: 15px;
}

.posts__item--quote .card__content .promotion .promotion--title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 125%;
  height: 39px;
  left: -11.5%;
  background: #e6e6e6;
  font-weight: 700;
  font-size: 11px;
  color: #201d56;
}

.posts__item--quote .card__content .promotion .timer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 11px 0;
  padding-bottom: 0;
}

.posts__item--quote .card__content .promotion .timer .time {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.posts__item--quote .card__content .promotion .timer .time b {
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  color: #201d56;
}

.posts__item--quote .card__content .promotion .timer .time span {
  font-weight: 600;
  font-size: 10px;
  color: rgba(32, 29, 86, 0.56);
}

@media (min-width: 992px) {
  .posts__item--quote {
    height: 354px;
  }
}
@media (min-width: 1199px) {
  .posts__item--quote {
    height: 354px;
  }
}
.posts__item--quote::before {
  content: "“";
  display: block;
  position: absolute;
  left: -0.09em;
  top: -0.18em;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  opacity: 0.1;
  font-size: 300px;
  line-height: 1em;
  pointer-events: none;
}
@media (min-width: 992px) {
  .posts__item--quote::before {
    font-size: 600px;
  }
}
@media (min-width: 1199px) {
  .posts__item--quote::before {
    font-size: 700px;
  }
}
.posts__item {
  margin-bottom: 1em;
}


/* Ads */
.social-media {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 8px;
  width: 100%;
  height: 93px;
  background: linear-gradient(275.11deg, #dc3970 25.4%, #f98d21 103.03%);
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

.social-media:hover {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.social-media .content {
  display: flex;
  flex-direction: column;
  color: white;
}

.social-media .content b {
  font-weight: 700;
  font-size: 13px;
  line-height: 12px;
}

.social-media .content span {
  font-weight: 400;
  font-size: 10px;
}
.posts__item--quote .card__content .promotion{
  direction: ltr !important;
}
.social-media.instagram {
  background: linear-gradient(275.11deg, #dc3970 25.4%, #f98d21 103.03%);
}

</style>

<script>
import useUtils from "../../composables/useUtils";

export default {
  name:'BlogPostAds',
  props: {
    promotion: Object,
  },
  async setup() {
    const {urlwithLocal} = useUtils();
    return {urlwithLocal};
  },
  computed: {
    GetScreenWidth: function () {
      return 100;//window.innerWidth;
    },
  },
};
</script>
