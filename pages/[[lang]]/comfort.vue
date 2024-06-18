<template>
  <div>
    <TitleHeaderFootball :small="true" icon="rocket">
      {{ $t('comfort.title_part_1') }} {{ $t('comfort.title_part_2') }}
    </TitleHeaderFootball>
    <br/><br/>
    <div class="comfort-container">
      <div class="comfort-box-container">
        <div class="comforttrade-content" :class="{'onProcessing' : onProcessing}">
          <div>
            <ul class="stages">
              <li v-for="s in steps">
                <div :class="{complete: s.number < step.number || show_bought_modal, active: s.number === step.number}">
                  <img :src="s.number <= step.number ? s.img_1 : s.img_2"/>
                  <div>{{s.title}}</div>
                </div>
              </li>
            </ul>
            <div class="statusbox">
              <div>
                <img src="/images/comfort/box/balance.svg" />
                <span>{{ $t('comfort.balance') }}:</span>
                <span style="white-space: pre;"> {{(user.coins < 1000 ? user.coins : (user.coins / 1000).format(0, 3, '.') + ' K')}}</span>
              </div>
              <div>
                <img src="/images/comfort/box/transfer_icon.svg" />
                <span style="white-space: pre;">{{ $t('comfort.transferred_coins') }}:</span>
                <span v-if="transfer.id">{{ Math.ceil(transfer.coins_sent / 1000 ) + "K" }}</span>
                <span v-else>0</span>
              </div>
            </div>
            <div class="hrline"></div>
          </div>
          <div class="comforttrade-body">
            <div v-if="!loading">
              <div class="taraz col-flex">
                <comfortTradeInput v-model:model-value="form.ea_email" :error="errorMail" :wd=" (isPhone ? 100 : 50 )+ '%'" :title="$t('comfort.buy.email') + '*'" :placeholder="$t('comfort.buy.email')" />
                <comfortTradeInput :error="errorPass" :wd=" (isPhone ? 100 : 50 )+ '%'" v-model:model-value="form.ea_password" :ispassword="true" :title="$t('comfort.buy.password') + '*'" :placeholder="$t('comfort.buy.password')" :tooltip="$t('comfort.buy.password_hint')"/>
              </div>
              <div class="taraz divider mf-gap" >
                <comfortTradeInput inputmode="code" wd="50%" v-model:model-value="form.code_1" :error="errorCode1" :title="$t('comfort.buy.back_code') + ' 1*'" :placeholder="$t('comfort.codes.old.desc')"/>
                <comfortTradeInput inputmode="code" wd="50%" v-model:model-value="form.code_2" :error="errorCode2" :title="$t('comfort.buy.back_code') + ' 2*'" :placeholder="$t('comfort.codes.old.desc')"/>
              </div>
              <div class="taraz divider center-flex formcontroll chk-res chk-save">
                <div>
                  <input type="checkbox" v-model="form.save_credentials">
                  <span>{{ $t('comfort.buy.save_codes') }}</span>
                </div>
                <div @click="resetAll">{{ $t('comfort.buy.reset_all') }}</div>
              </div>
              <div class="divider flex-center">
                <button class="btn btn-transfer" @click="createTransfer" :disabled="transfer.id">
                  <template v-if="!loadingbtn">{{ $t('comfort.buy.submit') }}</template>
                  <img v-else src="/loading_btn.svg" alt="loading icon" />
                </button>
              </div>
              <div class="flex-center">
                <!--                  <span style="color:red;font-weight: bold">{{ errorTotal }}</span>-->
              </div>
            </div>
            <div v-else>
              <div class="d-flex justify-content-center mt-5">
                <img src="/loading_btn.svg" width="35" height="35"/>
              </div>
            </div>
          </div>
          <div class="comforttrade-popup" v-if="onProcessing">
            <div  v-if="!excess_limit">
              <transition-group>
                <comfortTradeProgressBar v-if="step.number === 4" :min="0" :max="transfer.coins" v-model:funds="transfer.coins_sent"/>
                <div class="popup-status all-center-flex">
                  <div><img src="/loading_btn.svg"/></div>
                  <div v-html="transfer.message"></div>
                </div>
              </transition-group>
            </div>
            <div v-else>
              <comfort-tradeexcess-limit v-model:counter="excess_limit_timer" />
            </div>
          </div>
          <comfortTradePopup ref="popupErrEl" :error="popupErr" @close="closeErrorModal"/>
          <noCoinsPopup v-if="show_no_coins_popup" @close="closeErrorModal"/>
          <comfortTradeReport v-if="show_bought_modal" :box_number="transfer.success_box_number" @markAsFinished="markAsFinished"></comfortTradeReport>

        </div>
      </div>
      <div class="guide__container" id="guide__container">
        <img src="/images/comfort/box/guideico.svg" height="31" width="31"/>
        <div v-html="$t('comfort.info_2.desc')"></div>
      </div>

      <div class="rich-err-popup" v-if="cancelErr">
        <div>
          <div class="header">
            <img src="/images/comfort/box/warning.svg"/>
            <div>{{ $t(`comfort.popup_error.${cancelErr}.title`) }}</div>
          </div>
          <div class="scll">
            <div class="section1">
              <div>{{ $t(`comfort.popup_error.${cancelErr}.title_1`) }}</div>
              <div v-html="$t(`comfort.popup_error.${cancelErr}.desc_1`)"></div>
            </div>
            <div class="divider-rich-popup"/>
            <div class="section2">
              <div>{{ $t(`comfort.popup_error.${cancelErr}.title_2`) }}</div>
              <div v-html="$t(`comfort.popup_error.${cancelErr}.desc_2`)"></div>
            </div>
            <div class="divider-rich-popup"/>
            <div class="richpopup-footer-container">
              <div class="terms">
                <input type="checkbox" id="checkboxconfirm" v-model="confirmed"/>
                <div>{{ $t('comfort.popup_error.terms') }}</div>
              </div>
              <button class="btn"  @click="closePopup">{{ $t('comfort.popup_error.btn_confirm') }}</button>
            </div>
          </div>
        </div>
      </div>


      <div class="rich-err-popup security_alert" v-if="security_alert">
        <div>
          <div class="header">
            <img src="/images/comfort/box/warning.svg"/>
            <div>{{ security_alert_alias.title }} </div>
          </div>
         <div class="scll">
           <div class="section1 section1-alert" v-html="security_alert_alias.content"></div>
           <div class="divider-rich-popup"/>
           <div class="section2 section2-alert ">
             <div> {{ $t("payment_confirm.about_email") }}</div>
             <div>
               <img src="/svg/icon-ionic-md-mail_blue.svg" width="26" height="20" alt="icon email support" loading="lazy">
               Support@whatsgaming.net
             </div>
             <div> {{ $t("payment_confirm.apologize") }}</div>
             <div> {{ $t("payment_confirm.regards") }}</div>
             <div> {{ $t("payment_confirm.team") }}</div>
           </div>
           <div class="richpopup-footer-container">
             <button class="btn"  @click="onSecurityAlertconfirm" :disabled="loadingbtn_alert">
               <img src="/loading_btn.svg" alt="loading icon" v-if="loadingbtn_alert" />
               <span v-else>{{ $t('comfort.popup_error.btn_confirm') }}</span>
             </button>
           </div>
         </div>
        </div>
      </div>
    </div>
    <auth-verification v-if="user.has_unconfirmed_invoice"/>
  </div>
</template>

<script>
import {api} from '~/composables/api'
import {onMounted, reactive, ref, watch} from "vue";
import {getLocaleRoutePath} from "../../plugins/i18n";
import {t} from "~/plugins/i18n";

import TitleHeaderFootball from "~/components/blocks/TitleHeaderFootball";
import comfortTradeInput from "~/components/comfortTrade/comfortTradeInput";
import noCoinsPopup from "~/components/comfortTrade/noCoinsPopup";
import comfortTradePopup from "~/components/comfortTrade/comfortTradePopup";
import comfortTradeReport from "~/components/comfortTrade/comfortTradeReport";
import comfortTradeProgressBar from "~/components/comfortTrade/comfortTradeProgressBar";
import ComfortTradeRichPopup from "../../components/comfortTrade/comfortTradeRichPopup";
import ComfortTradeexcessLimit from "../../components/comfortTrade/comfortTradeexcessLimit";
import {useTimer} from "vue-timer-hook";
import AuthVerification from "../../components/embeded/AuthVerification";

export default {

  components: {
    AuthVerification,
    ComfortTradeexcessLimit,
    ComfortTradeRichPopup, noCoinsPopup, TitleHeaderFootball, comfortTradeInput, comfortTradePopup, comfortTradeReport, comfortTradeProgressBar},
  setup() {
    const route = useRoute();
    const router = useRouter();
    useHead(makeMeta(route.path,'Comfort', 'Comfort'))
    definePageMeta({
      middleware: 'auth'
    })

    const popupErrEl = ref();
    const user = useUserStore()
    const form = ref({
      ea_email: '',
      ea_password: '',
      code_1: '',
      code_2: '',
      save_credentials: false,
    })

    const errorMail = ref('');
    const errorPass = ref('');
    const errorCode1 = ref('');
    const errorCode2 = ref('');
    const loadingbtn = ref(false);
    const loadingbtn_alert = ref(false);
    const cancelErr = ref('')
    const popupErr = reactive({title:'',content:'',show_close:true})
    const show_no_coins_popup = ref(false)
    const excess_limit = ref(false);
    const excess_limit_timer = ref(null);
    const security_alert = ref(false);
    const security_alert_alias = ref({});
    const refreshOnCancel = ref(false);
    const steps = ref([
      {
        number: 1,
        title: t('comfort.steps.step_1_short'),
        img_1: '/images/comfort/box/stage1_white.svg',
        img_2: '/images/comfort/box/stage1_white.svg',
      },
      {
        number: 2,
        title: t('comfort.steps.step_2_short'),
        img_1: '/images/comfort/box/stage2_white.svg',
        img_2: '/images/comfort/box/stage2.svg',
      },
      {
        number: 3,
        title: t('comfort.steps.step_3_short'),
        img_1: '/images/comfort/box/stage3_white.svg',
        img_2: '/images/comfort/box/stage3.svg',
      },
      {
        number: 4,
        title: t('comfort.steps.step_4_short'),
        img_1: '/images/comfort/box/stage4_white.svg',
        img_2: '/images/comfort/box/stage4.svg',
      },
    ])
    const step = ref(steps.value[0])
    const loading = ref(true)
    const onProcessing = ref(false);
    const show_bought_modal = ref(false)
    const info = ref({})
    const transfer = ref({})

    const setStep = (number) => {
      if (!steps.value[number - 1]) {
        return
      }
      step.value = steps.value[number - 1]
    }
    const getComfortInfo =  () => {
      return new Promise(resolve => {
        api.get('comfort/info').then(async res => {
          info.value = res.data
          form.value.ea_email = res.data.ea_email
          form.value.ea_password = res.data.ea_password
          form.value.save_credentials = !!res.data.save_credentials
          form.value.code_1 = res.data.codes[0] || ''
          form.value.code_2 = res.data.codes[1] || ''
          excess_limit.value = res.data.excess_limit;
          if(res.data.security_alert){
            security_alert_alias.value = await api.get('alerts/messages/alias/comfort_additional').then((res)=>{
              return res.data;
            });
            security_alert.value = res.data.security_alert;
          }
          if(excess_limit.value){
            onProcessing.value = true;
            // const time = new Date();//res.data.limit_reset_timestamp
            // time.setSeconds(time.getSeconds() + 3); // 10 minutes timer
            excess_limit_timer.value = useTimer(res.data.limit_reset_timestamp * 1000);
            watch(()=>excess_limit_timer.value.isExpired,(n)=>{
              onProcessing.value = false;
              excess_limit.value = false;
            })
          }
          resolve()
        })
      })
    }
    const getTransfer = () => {
      return new Promise(resolve => {
        api.get('comfort/open_transfer').then(res => {
          handleNewTransferData(res.data)
        }).catch(() => {}).finally(() => {
          resolve()
        })
      })

    }
    const createTransfer = () => {
      let isFormValidated = true;
      if (transfer.value.id) {
        return
      }
      errorMail.value = '';
      errorCode1.value = '';
      errorCode2.value = '';
      errorPass.value = '';
      if(form.value.ea_password === ''){
        errorPass.value = t('validation.required', {attribute: 'password'});
        isFormValidated = false;
      }
      if(form.value.code_1 === '' || form.value.code_1.length !== 8){
        errorCode1.value = t('validation.size.numeric', {attribute: 'backup code', size: 8});
        isFormValidated = false;
      }
      if(form.value.code_2 === '' || form.value.code_2.length !== 8){
        errorCode2.value = t('validation.size.numeric', {attribute: 'backup code', size: 8});
        isFormValidated = false;
      }
      if (form.value.ea_password.length < 8){
        errorPass.value = t('validation.min.string', {attribute: 'password', min: 8});
        isFormValidated = false;
      }
      var numPattern = /^\d+\.?\d*$/;
      if(!numPattern.test(form.value.code_1)){
        errorCode1.value = t('validation.numeric', {attribute: 'backup code'});
        isFormValidated = false;
      }
      if(!numPattern.test(form.value.code_2)){
        errorCode2.value = t('validation.numeric', {attribute: 'backup code'});
        isFormValidated = false;
      }
      if(!isValidEmail(form.value.ea_email)) {
        errorMail.value = t('validation.email', {attribute: 'email'});
        isFormValidated = false;
      }
      if(isFormValidated) {
        loadingbtn.value = true;
        api.post('comfort/create_transfer', {body_params: form.value}).then(res => {
          handleNewTransferData(res.data)
        }).catch(e => {
          loadingbtn.value = false;
          popupErr.title = e.key !== 'security' ? t('comfort.create_error_title') : t('comfort.security_error_title')
          popupErr.content = e.description
          popupErr.show_close = e.key !== 'security'
        })
      }
    }
    const resetAll = () => {
      if (transfer.value.id) {
        return
      }
      api.post('comfort/remove_credentials')
      for (let i in form.value) {
        if (i === 'save_credentials') {
          form.value[i] = false
          continue
        }
        form.value[i] = ''
      }
    }
    const handleNewTransferData = (data) => {
      transfer.value = data
      transfer.value.message = t(data.message_1_key);
      if(data.message_2_key !== ""){
        transfer.value.message += "<br/>" + t(data.message_2_key);
      }
      onProcessing.value = true
      setStep(transfer.value.step)

      if (transfer.value.status === 'bought') {
        show_bought_modal.value = true
      }
      if (transfer.value.status === 'canceled') {
        cancelErr.value = transfer.value.cancel_reason_name
      }
      if (transfer.value.awaiting_logout) {
        cancelErr.value = 'customer_online'
      }
      if (transfer.value.status === 'blocked') {
        popupErr.title = t('comfort.security_error_title')
        popupErr.content = t('comfort.security_error_text')
        popupErr.show_close = false
      }
      else{
        try{
          popupErrEl.value.closePopup();
        }catch (e) {

        }
      }
    }
    const closeErrorModal = () => {
      if (!transfer.value.id) {
        return
      }
      if (transfer.value.awaiting_logout) {
        confirmEaLogout()
        return
      }
      if (transfer.value.status === 'canceled') {
        refreshOnCancel.value = true;
        markAsFinished("no_refresh")
      }
    }
    const markAsFinished = (to_home = false) => {
      onProcessing.value = false
      api.post('comfort/mark_as_finished').then(() => {
        if (to_home === 'home') {
          return navigateTo(getLocaleRoutePath(''), { external: false })
        }
        if (to_home === 'buymore') {
          return navigateTo(getLocaleRoutePath('fc-coins/fc-24-coins'), { external: false })
        }
        if(to_home !== 'no_refresh'){
          window.location.reload()
        }
        //
      })

    }
    const confirmEaLogout = () => {
      api.post('comfort/confirm_ea_logout').then(() => {
        transfer.value.awaiting_logout = 0
      })
    }
    const isPhone = () =>{
      return window.innerWidth < 800;
    }

    const confirmed = ref(false);
    const closePopup = ()=>{
          if(confirmed.value) {
            closeErrorModal()
            cancelErr.value = ''
            if(refreshOnCancel.value){
              window.location.reload();
            }
          }else{
            document.querySelector("#checkboxconfirm").classList.add("shakecheckbox");
          }

    }
    const onSecurityAlertconfirm = async () =>{
      loadingbtn_alert.value = true;
      api.post('/comfort/confirm_security').then(() => {
        security_alert.value = false;
      })
    }
    if (process.client) {
      window.Echo.channel('comfort_transfers_' + user.id).listen('ComfortNotify', ({data}) => {
        handleNewTransferData(data)
      })
    }
    Promise.all([
      getComfortInfo(),
      getTransfer()
    ]).then(() => {
      loading.value = false
      if (user.coins === 0 && !transfer.value.id) {
        show_no_coins_popup.value = true
      }
    })
    //cancelErr.value = 'cancel_wrong_code'
    return {
      loading,
      onProcessing,
      user,
      form,
      show_no_coins_popup,
      popupErr,
      cancelErr,
      errorMail,
      errorPass,
      errorCode1,
      errorCode2,
      loadingbtn,
      transfer,
      steps,
      step,
      show_bought_modal,
      createTransfer,
      resetAll,
      confirmEaLogout,
      closeErrorModal,
      markAsFinished,
      isPhone,
      confirmed,
      closePopup,
      excess_limit,
      excess_limit_timer,
      security_alert,
      security_alert_alias,
      loadingbtn_alert,
      onSecurityAlertconfirm,
      popupErrEl
    }
  },
}
</script>

<style scoped>
@import "@/public/css/components/comfort_trade/comfort_index.css";
</style>
<style >
.comfort-box-container{
  width: 776px;
  margin-top: -105px;
  display: flex;
  gap: 30px;
  position: relative;
}
.onProcessing .comforttrade-body input{
  background-color: #403a6b;
}
.onProcessing .comforttrade-body input[type=checkbox]{
  display: none;
}
.onProcessing .comforttrade-body input::placeholder{
  color:var(--comfort-purple);
}
.onProcessing .comforttrade-body .btn-transfer{
  background-color: #490415;
  color: #403a6b;
}
.onProcessing .hrline{
  visibility: hidden;
}
@media (max-width: 800px) {
  .comfort-box-container {
    width: 100% !important;
    margin: -50px 0 !important;
    position: relative;
    height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

}
</style>
<style scoped>
.taraz{
  display: flex;
  gap: 15px;
}
.divider{
  margin-top: 15px;
}
.center-flex{
  justify-content: center;
}
.formcontroll{
  text-decoration: underline;
  font-weight: 600;
  font-size: var(--font-size-15px);
  color:var(--comfort-purple)
}
.formcontroll div:first-child,{
  display: flex;
  align-items: center;
}
.flex-center{
  display: flex;
  justify-content: center;
}
.formcontroll div:last-child{
  cursor: pointer;
}
input[type=checkbox]{
  transform: scale(1.3);
  margin-inline-end: 10px;

  /*outline: 1px solid var(--comfort-purple);*/
  cursor: pointer;
}
.btn-transfer{
  width: 80%;
  height: 48px;
  font-size: var(--font-size-16px);
  color:white;
  font-weight: bold;
  background-color: #F70D4D;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-transfer:hover:not(:disabled){
  background-color: #F70D4D;
}
@media (max-width: 800px){
  .col-flex{
    flex-direction: column;
  }
  .chk-res{
    justify-content: space-between !important;
    width: 95%;
    margin: 0 auto;
    margin-top: 15px;
  }
  .btn-transfer{
    width: 100%;
  }
}
/*@media(min-width: 1920px){*/
/*  .comfort-container{*/
/*    justify-content: center !important;*/
/*    margin: 0 !important;*/
/*  }*/
/*}*/
.comfort-container{
  display: flex;
  justify-content: center;
  gap: 1%;
  /*margin-inline-start: 20%;*/
}
</style>
<style scoped>
.rich-err-popup{
  width: 100%;
  /*height: 100vh;*/
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
  background: url(/images/comfort/box/warning_bg.svg) no-repeat;
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
  transform: scale(1.25);
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #000; /* Default border color */
  width: 20px;
  height: 20px;
  border-radius: 3px;
  outline: none;
}
.richpopup-footer-container > .terms > input:checked {
  border-color: #f00; /* Change the border color when checked */
  -webkit-appearance: checkbox;
  -moz-appearance: checkbox;
  appearance: checkbox;
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
.chk-res > div{
  display: flex;
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
    height: 100vh;
  }
  .rich-err-popup > div{
    width: 90%;
    margin: 0 auto;
    margin-top: 9%;
    height: auto;
    position: fixed;
    left: 50%;
    transform: translate(-50%) scale(1);

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
  .section2-alert > div:nth-child(2){
    padding-top: 10px;
  }
}
.shakecheckbox{
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  perspective: 1000px;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  border: 2px solid red !important;
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
.rich-err-popup > div{
  overflow-y: auto;
}
.section2-alert,.section1-alert{
  text-align: left !important;
}
.section1-alert{
  font-size: var(--font-size-17px) !important;
}
.section2-alert > div:first-child,.section2-alert > div:nth-child(3){
  font-weight: 500 !important;
  font-size: var(--font-size-17px) !important;
}
.section2-alert > div:nth-child(2){
  color:#201D57;
  font-size: var(--font-size-18px) !important;
  font-weight: bold;
}
.section2-alert > div:nth-child(3){
  padding-top: 10px;
}
.section2-alert > div:nth-child(4){
  padding-top: 15px;
}
.section2-alert > div:nth-child(5){
  padding: 0;
  font-size: var(--font-size-17px) !important;
}
.security_alert > div{
  min-height: 550px;
  height: auto;
}
.scll{
  overflow-y: auto;
  height: 70vh;
  -webkit-overflow-scrolling: auto;
  overscroll-behavior: none !important;

}
</style>