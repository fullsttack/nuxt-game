<template>
  <div class="auction-header" id="auction-header">
    <div>
      <div class="left-side">
        <div>
          <img class="d-view" src="/images/auction/trade/balance.svg">
          <img class="r-view" src="/images/auction/trade/balance_mobile.svg">
          <span>
            {{ $t('auction.balance') }} :
          </span>
          <span >
            {{ balanceShort }}K
          </span>
        </div>
        <div>
          <img class="d-view" src="/images/auction/trade/transfer.svg">
          <img class="r-view" src="/images/auction/trade/transfer_mobile.svg">
          <span style="text-transform: capitalize;">
            {{ $t('auction.transferred_coins').toLowerCase() }} :
          </span>
          <span>
            {{ boughtShort }}K
          </span>
        </div>
      </div>
      <div class="right-side">
        <span>
          0K
        </span>
        <img class="t_coin" src="/images/auction/trade/coin.svg" />
        <div class="range-slider">
          <div :style="'margin-left: '+getLeftBar"> {{ boughtShort }}K</div>
          <input type="range" min="0" :max="getmax" :value="boughtSumComputed" disabled/>
          <client-only>
            <div class="range-linear" :style="'width:'+getLeftBarRange "/>
          </client-only>
        </div>
        <img class="t_coins" src="/images/auction/trade/coins.svg" />
        <span>
          {{ getmaxShort }}K
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "auctionHeader",
  props:{
    balance:{
      default:0,
      type:Number
    },
    pending_sum:{
      type:Number,
      default:0,
    },
    bought_sum:{
      type:Number,
      default:0,
    }
  },

  computed:{
    balanceShort(){
      return this.balance / 1000;
    },
    boughtSumComputed(){
      return this.bought_sum
    },
    getmax(){
      return (this.bought_sum + this.balance);
    },
    getmaxShort(){
      return this.getmax / 1000;
    },
    boughtShort(){//this.bought_sum
      return this.bought_sum / 1000;
    },
    getLeftBar() {
      if(this.getmax === 0){
        return 0;
      }
      const thumbSize = 24;
      const ratio = this.bought_sum / this.getmax;
      return `calc(${thumbSize / 10}px + ${ratio * 100}% - ${ratio} * ${thumbSize}px)`;
    },
    getLeftBarRange() {
      if(this.getmax === 0){
        return 0;
      }
      let thumbSize = 24;
      if(window.innerWidth < 800){
        thumbSize = 15;
      }
      const ratio = this.bought_sum / this.getmax;
      return `calc(${thumbSize / 10}px + ${ratio * 100}% - ${ratio} * ${thumbSize}px - 0.7px)`;
    },
  }
}
</script>

<style scoped>
@import "@/public/css/components/auction_trade/auction_header.css";
</style>