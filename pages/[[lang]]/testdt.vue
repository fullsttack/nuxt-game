<template>
  <TitleHeaderFootball>
    test
  </TitleHeaderFootball>
  <div class="container">
    <IndependentCoinPriceTable :platform_changable="true" platform_name="xbox"/>
    <div class="container">
      <div class="step_guide">
        <div class="guide">
          <div>
            <div class="guide-left">
              <b >1. Choose your method and coin amount</b>
              <div class="partnerbody">
                <nuxt-img loading="lazy" class="res-img" src="/images/consoles/s1_pic.webp" width="275" height="130"/>
                <p>
                  Time is precious! Therefore, we have designed our affiliate program as easy as possible. You can adapt your personal affiliate link to every MMOGA page and every product on MMOGA within seconds and our tutorials will help you to find quickly the optimal placement strategy.
                </p>
              </div>
            </div>
          </div>
          <div class="guide-right">
            <nuxt-img loading="lazy" src="/images/consoles/s1_pic.webp" width="366" height="175"/>
          </div>
        </div>

        <div class="guide">
          <div>
            <div class="guide-left">
              <b >2. Checkout</b>
              <div class="partnerbody">
                <nuxt-img loading="lazy" class="res-img"  src="/images/consoles/s2_pic.webp" width="280" height="230"/>
                <p>
                  The MMOGA Affiliate Program is an additional source of income for those whc manage a website or a social media channel, whether YouTube, Facebook, Twitter, Instagram, Twitch, Hitbox, etc.
                  <br><br>
                  <b>Our commission model:</b><br>
                  10% for digital goods (gamekeys, gamecards and software)<br>
                  15% for virtual goods (gold, coins and items)<br>
                </p>
              </div>
            </div>
          </div>
          <div class="guide-right">
            <nuxt-img loading="lazy" src="/images/consoles/s2_pic.webp" width="360" height="295"/>
          </div>
        </div>

        <div class="guide lastguide">
          <div>
            <div class="guide-left">
              <b >3. Coin Transfer</b>
              <div class="partnerbody">
                <nuxt-img loading="lazy" class="res-img"  src="/images/consoles/s3_pic.webp" width="265" height="170"/>
                <p>
                  With more than 8 ears of experience and over one million of satisfied customers, MMOGA is the european market leading platform for virtual and digital goods.
                </p>
              </div>
            </div>
          </div>
          <div class="guide-right">
            <nuxt-img loading="lazy" src="/images/consoles/s3_pic.webp" width="360" height="295"/>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../components/blocks/TitleHeaderFootball";
import IndependentCoinPriceTable from "../../components/IndependentCoinPriceTable";
import {makeMeta} from "../../composables/useUtils";
export default {
  name: "testdt",
  components: {IndependentCoinPriceTable, TitleHeaderFootball},
  setup(){
    useHead(makeMeta("testdt","test","","",true));
  }
}
</script>

<style scoped>
@import "@/public/css/pages/consoles.css";
</style>