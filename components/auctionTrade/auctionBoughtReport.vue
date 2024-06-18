<template>
  <div class="report-popup">
    <div>
      <div class="report-header">
        <img src="/images/comfort/box/final_white_ico.svg" width="30"/>
        <span v-if="box_number===1">{{ $t('completed_order.modal_1.title') }}</span>
        <span v-else-if="box_number===2">{{ $t('completed_order.modal_2.title') }}</span>
        <span v-else-if="box_number===3">{{ $t('completed_order.modal_3.title') }}</span>
      </div>
      <div>
        <p class="finish-text" v-if="box_number===1">{{$t('completed_order.modal_1.text')}}</p>
        <p class="finish-text" v-else-if="box_number===2">{{$t('completed_order.modal_2.text')}}</p>
        <p class="finish-text" v-else-if="box_number===3">{{$t('completed_order.modal_3.text')}}</p>
        <div v-if="[1,2].includes(box_number)" class="center-content">
          <div >
            <button @click="markAsFinished('buymore')" class="btn btns btns-red" :disabled="loading">
              <div v-if="!loading">
                <img src="/images/comfort/box/buyborebtnicon.svg" width="30"/>
                <div v-if="box_number===1">{{ $t('completed_order.modal_1.buy_more') }}</div>
                <div v-else>{{ $t('completed_order.modal_2.buy_more') }}</div>
              </div>
              <img v-else src="/loading_btn.svg" alt="loading icon" />
            </button>
            <button @click="markAsFinished('home')" class="btn btns">
              <template v-if="box_number===1">
                {{ $t('completed_order.modal_1.to_home') }}
              </template>
              <template v-else>
                {{ $t('completed_order.modal_2.to_home') }}
              </template>
            </button>
          </div>
        </div>
        <div  v-if="[2].includes(box_number)" class="thxblock num2thxbox">
          <p>{{ $t('completed_order.modal_2.thanks_text') }}</p>
          <p>{{ $t('completed_order.modal_2.whatsgaming_team') }}</p>
        </div>

        <div v-if="[1].includes(box_number)" class="center-content">
          <div class="discoutbox">
            <div>{{ $t('completed_order.modal_1.discount') }}</div>
            <div >
              <div>
                {{ $t('completed_order.modal_1.discount_code') }}
              </div>
              <img src="/images/comfort/box/copy_ico.svg" @click="copy2clipBoard($event,$t('completed_order.modal_1.discount_code'))"/>
            </div>
          </div>
        </div>
        <div v-if="[3].includes(box_number)">

          <div  class="center-content step3">
            <img src="/images/comfort/box/trustami.png" class="trustami"/>
            <div class="btn-box">
              <button @click="markAsFinished('home')" class="btn btns">{{ $t('completed_order.modal_3.to_home') }}</button>
              <button @click="openTrustMe" class="btn btns btns-red" :disabled="loading">
                <div v-if="!loading">
                  <img src="/images/comfort/box/rateus.svg" />
                  <div>{{ $t('completed_order.modal_3.rate_us') }}</div>
                </div>
                <img v-else src="/loading_btn.svg" alt="loading icon" />
              </button>
            </div>
          </div>
          <div class="thxblock">
            <p>{{ $t('completed_order.modal_3.thanks_text') }}</p>
            <p>{{ $t('completed_order.modal_3.whatsgaming_team') }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  props: {
    box_number:{
      type:Number
    }
  },
  name: "auctionBoughtReport",
  setup(props,{emit}){
    const loading = ref(false);
    const markAsFinished = (to_home = false) => {
      loading.value = true
      emit('markAsFinished', to_home);
    }
    const openTrustMe = () =>{
      window.open("https://www.trustpilot.com/review/www.whatsgaming.net?stars=5","_blank");
    }
    const copy2clipBoard = ($event,text) =>{

      navigator.clipboard.writeText(text).then(function() {
        $event.target.parentElement.innerHTML = "Copied";
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
    return {
      loading,
      markAsFinished,
      openTrustMe,
      copy2clipBoard
    };
  },
}
</script>

<style scoped>
.report-popup{
  width: 30%;
  margin: 0 auto;
}
.report-popup:before{
  display: block;
  content: '';
  background-color: #000;
  opacity: 0.6;
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
}
.report-popup > div{
  background: white;
  z-index: 1;
  position: absolute;
  /* bottom: 5%; */
  width: 575px;
  left: 50%;
  transform: translate(-50%);
  height: 310px;
  border-radius: 8px;
  top: 25%;
}
.report-popup > div > div:not(.report-header){
  position: relative;
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.header{
  font-weight: bold;
  font-size: 18px;
  color: red;
  margin-bottom: 15px;
}
.content{
  font-size: 18px;
  font-weight: 500;
}
.center-content{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.btns{
  background-color: #F0F0F0;
  width: 203px;
  font-weight: bold;
  font-size: var(--font-size-15px);
  text-decoration: underline;
  color: black;
  padding: 15px;
  cursor: pointer;
}
.btns-red{
  background-color: #DB025D;
  color:white;
  margin-right: 15px;
}
.btns-red:hover{
  background-color: rgba(220, 3, 94, 0.59) !important;
}
.btns-red > div{
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-left: -10px;
  align-items: center;
}
.btns:hover{
  background-color: rgba(134, 133, 133, 0.59);
}
button{
  margin-top: 10px;
}
.discoutbox{
  border:2px solid #E4E4E4;
  border-radius: 8px;
  width: 100%;
  height: 50px;
  background: url("/images/comfort/box/discounttag.svg");
  background-repeat: no-repeat;
  background-position: 10px 13px;
  font-size: var(--font-size-15px);
  font-weight: 600;
  text-align: left;
  padding-left: 40px;
  padding-right: 2px;
  line-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  direction: ltr;
}
.discoutbox div:first-child{
  font-weight: 600;
}
.discoutbox div:last-child{
  background-color: #EDEDED;
  padding: 10px;
  padding-top: 0;
  text-align: center;
  height: 42px;
  line-height: 42px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-top: 12px;
}
.discoutbox div:last-child img{
  cursor: pointer;
}
.report-header{
  background-color: #18A085;
  height: 55px;
  width: 100%;
  margin: 0;
  font-size: var(--font-size-19px);
  font-weight: 600;
  color:#FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
.finish-text{
  margin: 0;
  font-size: var(--font-size-14px);
  font-weight: 700;
  text-align: left;
}
.thxblock{
  margin-top: 30px;
}
.thxblock > p{
  margin: 0;
  text-align: left;
  font-size: var(--font-size-14px);
}
.thxblock > p:first-child{
  font-weight: 600;
}
.thxblock > p:last-child{
  font-weight:  bold;
}
.btn-box{
  display: flex;
}
.trustami{
  width: 140px;
  height: 58px;
  margin-right: 25px;
}
.step3 > div > button:last-child{
  width: 145px;
  margin-left: 10px;
}
.step3 > div > button:first-child{
  width: 170px;
}
.num2thxbox{
  margin-top: 0;
}
@media (max-width: 800px) {
  .report-popup:before{
    border-radius: 0px;

  }
  .report-popup > div{
    width: 90%;
    top: 25%;
  }
  .discoutbox{
    line-height: 15px;
  }
  .btn-box{
    flex-direction: column-reverse;
  }
  .trustami{
    width: 130px;
    height: 60px;
    margin-right: 5px;
  }
  .btns{
    height: 33px;
    padding: 0;
    font-size: 11px;
    text-decoration: none;
  }
  .btns-red > div > img{
    width: 15px;
  }
  .discoutbox{
    margin-top: -10px;
  }
}
.rtl_class .thxblock > p,.rtl_class .finish-text{
  text-align: right;
}
</style>