<template>
<!--  <teleport to="#modal_place">-->
    <div class="rich-err-popup" v-if="show">
      <div>
        <div class="header">
          <img src="/images/comfort/box/warning.svg"/>
          <div>{{ $t(`comfort.popup_error.${error.reason}.title`) }}</div>
        </div>
        <div class="section1">
          <div>{{ $t(`comfort.popup_error.${error.reason}.title_1`) }}</div>
          <div v-html="$t(`comfort.popup_error.${error.reason}.desc_1`)"></div>
        </div>
        <div class="divider-rich-popup"/>
        <div class="section2">
          <div>{{ $t(`comfort.popup_error.${error.reason}.title_2`) }}</div>
          <div v-html="$t(`comfort.popup_error.${error.reason}.desc_2`)"></div>
        </div>
        <div class="divider-rich-popup"/>
        <div class="richpopup-footer-container">
          <div class="terms"  id="btnclosecofirmtext">
            <input type="checkbox" v-model="confirmed"/>
            <div >{{ $t('comfort.popup_error.terms') }}</div>
          </div>
          <button class="btn" @click="closePopup()">{{ $t('comfort.popup_error.btn_confirm') }}</button>
        </div>
      </div>
    </div>
<!--  </teleport>-->
</template>

<script>
import {ref, watch} from 'vue';
export default {
  props: {
    error:{
      type:Object
    }
  },
  name: "comfortTradeRichPopup",
  setup(props,{emit}){
    const show = ref(false);
    const confirmed = ref(false);
    watch(props.error, (first, second) => {
      if(second.reason !== ''){
        show.value = true;
      }
    });
    const closePopup = ()=>{
      if(confirmed.value){
        props.error.reason='';
        show.value = false;
        emit('close');
      }else{
        document.querySelector("#btnclosecofirmtext").classList.add('shaketxt');
      }
    }
    return {show,confirmed,closePopup}
  },
}
</script>

<style scoped>
.rich-err-popup{
  width: 100%;
  height: 100vh;
  opacity: 1;
  background: #f5f5f59c;
  z-index: 40000;
  top: 0;
  left: 0;
  overflow: hidden;
  animation-name: fadeIn_Container-69e9542a;
  animation-duration: 0.5s;
  display: block;
  position: absolute;
}
.rich-err-popup > div{
  filter: drop-shadow(0 0 19px rgba(0,0,0,16%));
  -webkit-filter: drop-shadow(0 0 19px rgba(0,0,0,16%));
  width: 880px;
  height: 730px;
  min-height: auto;
  background-color: white;
  margin: 0 auto;
  margin-top: 90px;
  border-radius: 12px;
  transform: scale(0.9);
}
.header{
  background-color: #DB392D;
  height: 100px;
  width: 100%;
  font-size: var(--font-size-23px);
  font-weight: 600;
  color:white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}
.section1{
  margin-top: 5px;
  padding-bottom: 0 !important;
}
.section2{
  margin-top: 0px;
}
.section1,.section2{
  text-align: center !important;
  padding: 25px;
  padding-top: 20px;
}
.section1 > div:first-child,.section2 > div:first-child{
  font-size: var(--font-size-21px);
  font-weight: bold;
}
.section1 > div:last-child{
  padding-top: 15px;
  font-size: var(--font-size-18px);
  font-weight: normal;
  background: url(/_nuxt/images/comfort/box/warning_bg.svg) no-repeat;
  min-height: 110px;
  background-position: center -15px;
}
.section2 > div:last-child{
  padding-top: 15px;
  font-size: var(--font-size-18px);
  font-weight: normal;
}
.divider-rich-popup{
  width: 98%;
  margin:0 auto;
  height: 2px;
  background-color: #D8D8D8;
}
.richpopup-footer-container{
  width: 350px;
  height: 102px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.richpopup-footer-container > .terms{
  display: flex;
  justify-content: center;
  gap: 5px;
}
.richpopup-footer-container > .terms > input{
  transform: scale(1.3);
  cursor: pointer;
}
.richpopup-footer-container > .terms > div{
  color:#201D57;
  text-decoration: underline;
  font-size: var(--font-size-16px);
  font-weight: 600;
}
.richpopup-footer-container > button{
  margin: 0 auto;
  width: 90%;
  height: 60px;
  font-weight: bold;
  font-size: 20px;
  background-color: #35BBB8;
  color:white;
  margin-top: 10px !important;
}
.richpopup-footer-container > button:hover{
  background-color: #2ca19f !important;
}
@keyframes fadeIn_Container {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@media(max-width: 800px){
  .rich-err-popup{
    background-color: #f5f5f5d1;
  }
  .rich-err-popup > div{
    width: 90%;
    margin: 0 auto;
    margin-top: 160px;
    transform: scale(1);
    height: auto;
  }
  .header{
    height: 40px;
    font-size: var(--font-size-14px);
  }
  .header img{
    width: 22.5px;
  }
  .section1{
    margin-bottom: -10px;
  }
  .section1,.section2{
    padding: 10px;
  }
  .section1 > div:first-child, .section2 > div:first-child {
    font-size: var(--font-size-15px);
    font-weight: bold;
  }
  .section1 > div:last-child{
    font-size: var(--font-size-12px);
    background-size: 60px 60px;
    background-position: center 1px;
    min-height: 75px;
  }
  .section2{
    padding-bottom: 0;
  }
  .section2 > div:last-child{
    font-size: var(--font-size-12px);
  }
  .richpopup-footer-container > .terms > div{
    font-size: var(--font-size-12px);
  }
  .richpopup-footer-container{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: 80px;
  }
  .richpopup-footer-container > button{
    width: 140px;
    height: 40px;
    font-size: var(--font-size-13px);
    margin: 0 auto;
    padding-top: 7.5px;
  }
  .richpopup-footer-container > .terms > input{
    transform: scale(1.1);
  }
}

</style>