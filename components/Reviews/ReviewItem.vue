<template>
  <div class="review-item">
    <div class="header">
      {{ hidedEmail }}
    </div>
    <div class="content">
      <div>
        <div class="date">
          {{ getDate }}
        </div>
        <div class="block-bottom">
          <nuxt-img loading="lazy" :src="'/images/index24/'+item.console.toUpperCase()+'.svg'" :class="item.console.toUpperCase()" alt="review console icon" height="30" width="50"/>
          <div>
            <img :src="'/images/index24/'+item.buytype+'.svg'" alt="buy type coin icon" height="20" width="20"/>
            <div v-if="item.buytype==='auction'" style="margin-top: 1px;">{{ $t('home.player_auction.title_part_2') }}</div>
            <div v-else style="margin-top: 1px;">{{ $t('home.comfort_trade.title_part_2') }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <nuxt-img loading="lazy" src="/images/index24/five_start.svg" width="120" height="21" alt="start logo"/>
        <div>
          <nuxt-img loading="lazy" src="/images/index24/bwcoin.svg" width="25" height="25" alt="blackwhite coin icon"/>
          {{ item.coins }}K
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props:{
      item:{
        type:Object
      }
  },
  name: "ReviewItem",
  computed:{
    hidedEmail() {
      const [username, domain] = this.item.email.split("@");
      const hiddenUsername = username.slice(0, Math.floor(username.length / 2)) + "*".repeat(username.length - Math.floor(username.length / 2));
      const [domainName, extension] = domain.split(".");
      //const hiddenDomain = domainName.slice(0, Math.floor(domainName.length / 2)) + "*".repeat(domainName.length - Math.floor(domainName.length / 2)) + "." + "*".repeat(extension.length);
      return `${hiddenUsername}@${domainName}.${extension}`;
    },
    getDate(){
      let time = new Date();
      if(this.item.id > 4){
        time.setHours(-24);
      }
      return moment(time.getTime()).format('YYYY - MM - DD');
    }
  },

}
</script>

<style scoped>
.review-item{
  width: 320px;
  height: 180px;
  /*padding: 0 5px 5px;*/
  -webkit-box-shadow: 0px 0px 4px 2px #DBDBDB;
  box-shadow: 0px 0px 4px 2px #DBDBDB;
  margin: 0 auto;
}
.review-item .header{
  width: 100%;
  height: 44px;
  font-weight: bold;
  font-size: 13px;
  text-align: start;
  background-color: #04B3B8;
  color:white;
  line-height: 35px;
  padding: 5px;
  padding-left: 25px;
}
.review-item .content{
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.review-item .content .date{
  font-size: 13px;
  font-weight: 500;
}
.block-bottom{
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  align-items: flex-start;
}
.block-bottom > img {
  margin-left: -5px;
  width: max-content;
}
.block-bottom > div{
  display: flex;
  font-size: 12px;
  font-weight: bold;
  gap: 10px;
  align-items: center;
}
.content .right{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  font-size: 15px;
  font-weight: bold;
}
.content .right > div{
  height: 45px;
  background: #F9F9F9;
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: center;
  padding-top: 3px;
  gap:2px;
}
</style>