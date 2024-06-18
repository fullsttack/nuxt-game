<template>
  <div class="err-popup">
    <div>
      <div>
        <div class="coinlogo">
          <img src="/images/comfort/box/coins_popup.svg" height="35" width="35"/>
        </div>
        <div class="content">{{ $t('messages.no_coins.desc') }}</div>
        <div class="button-box">
          <button class="btn btn-coin button-box btn-red" @click="closePopup">
            <img src="/images/comfort/box/coins_popup.svg" height="20" width="20"/>
            <div>{{ $t('comfort.finish_modal.buy_more') }}</div>
          </button>
          <button class="btn btn-primary btn-coin btn-gray" @click="closePopup">{{ $t('comfort.finish_modal.to_home') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getLocaleRoutePath} from "~/plugins/i18n";

export default {
  setup(){
    const closePopup = ()=>{
      return navigateTo(getLocaleRoutePath('fc-coins/fc-24-coins'), { external: false })
    }
    return {closePopup}
  },
}
</script>

<style scoped>
@import "@/public/css/components/comfort_trade/simplepopup.css";
.coinlogo{
  border: 2px solid lightslategray;
  padding-top: 10px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  filter:grayscale(90);
}
.btn-coin{
  border-radius: 25px;
}
.btn-red{
  background-color: #DB025D;
  color:White;
}
.btn-red:hover{
  background-color: red;
}
.btn-gray{
  background-color: gray;
  color:white;
  border: 1px solid gray;
}
.btn-gray:hover{
  background-color: lightslategray;
}
.button-box{
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}
.content{
  margin: 10px;
}
</style>