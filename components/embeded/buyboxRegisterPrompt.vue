<template>
  <div class="containermodal" v-if="show" @click.self="onCloseModal">
    <div class="modal-buybox-reg">
      <div>
<!--        <div class="close_box" @click="onCloseModal">&times;</div>-->
        <div>
          <p>
            {{ $t('email_verify.title') }}
          </p>
          <div class="input-field-groups">
            <input v-if="!loading" v-for="(input, index) in inputs" :key="index" ref="inputs" v-model.number="input.value" @paste="onPaste2Inputs" @keyup="handleKeyDown(index, $event)" maxlength="1">
            <img v-else src="/loading_btn.svg" alt="loading icon" height="40" width="40"/>
          </div>
          <p class="error-txt" v-if="errorText !== ''">
            {{ errorText }}
          </p>
          <div class="endbox">
            <p>
              {{ $t('email_verify.wrong_email') }}
              <button class="btn" @click="wrongMailClose">{{ $t('email_verify.click_here') }}</button>
            </p>
            <p v-if="counter===0">
              <div v-if="resendEmail">New Email Sent</div>
              <button v-else class="btn" @click="resendEmailFunc">{{$t('email_verify.resend_code')}}</button>
            </p>
            <p v-else v-html="t('email_verify.request_new_code',{seconds :counterHtml})"></p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {t} from "~/plugins/i18n";
import {api} from "../../composables/api";
import {useUserStore} from "../../stores/userStore";
export default {
  props:{
    show:{
      default:false,
      type:Boolean
    }
  },
  name: "buyboxRegisterPrompt",
  setup(){
    return {t}
  },
  data(){
    return {
      inputs: [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
      ],
      counter:30,
      loading:false,
      errorText:'',
      resendEmail:false,
      authUser:useUserStore()
    }
  },
  methods:{
    wrongMailClose(){
        this.authUser.removeAccessToken();
        this.authUser.remove();
        this.onCloseModal();
    },
    onCloseModal(){
      this.$emit('close');
    },
    async onPaste2Inputs(evt){
      var onpasteTxt = evt.clipboardData.getData('text');
      var arrTxt = onpasteTxt.trim().split('');
      for(var i=0;i<=arrTxt.length-1;i++){
        if(typeof arrTxt[i] === 'number'){
          this.inputs[i].value = arrTxt[i];
        }
      }
    },
    handleKeyDown(index, event) {
      if (event.key === 'Backspace' && index > 0) {
        this.$refs.inputs[index - 1].focus();
      } else if (event.key.match(/[0-9]/) && index < this.inputs.length - 1) {
        this.$refs.inputs[index + 1].focus();
      }
    },
    resendCounter(){
      setInterval(() => {
        if (this.counter > 0) {
          this.counter -= 1;
        }
      }, 1000);
    },
    resendEmailFunc(){
      this.resendEmail = true;
      // Api for resend Email here
      api.post('email/verification-notification', {body_params: {}}).then(res => {
        console.log(res.data);
      }).catch(e => {
        this.errorText = e.message;
      }).finally(() => {
        setTimeout(()=>{
          this.counter = 60;
          this.resendEmail = false;
        },3000);
      })

    }
  },
  mounted() {
    this.resendCounter();
    this.inputs = [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
    ]
  },
  computed:{
      counterHtml(){
        return "<span style='color: red;'>" + this.counter + "</span>";
      }
  },
  watch:{
    inputs:{
      handler(o,n){
        if(!this.loading) {
          if (n[n.length - 1].value !== '') { //call API here
            this.loading = true;
            this.errorText = '';
            const confirmCode = n.map(i => {
              return i.value;
            }).join("");
            console.log("code => " + confirmCode);
            console.log(n);
            api.post('email/verify', {body_params: {code: confirmCode}}).then(res => {
              this.authUser.emailVerified();
              this.$emit('verified');
            }).catch(e => {
              this.errorText = e.message;
            }).finally(() => {
              this.loading = false;
            })
          }
        }
      },
      deep:true
    }
  }
}
</script>

<style scoped>
.containermodal{
  width: 100%;
  height: 100vh;
  opacity: 1;
  background: #22222269;
  z-index: 40000;
  top:0;
  left: 0;
  overflow: hidden;
  animation-name: fadeIn_Container;
  animation-duration: 1s;
  display: block;
  position: fixed;
}
.modal-buybox-reg{
  border-radius: 15px;
  animation-name: fadeIn_Modal;
  animation-duration: 0.8s;
  width: 450px;
  height: 250px;
  background-color: white;
  position: absolute;
  display: block;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
  padding: 15px;
}
.modal-buybox-reg > div{
  min-height: 220px;
  border-radius: 15px;
  background-color: #FFFFFF;
  padding-top: 30px;
  text-align: center;
}
.close_box{
  position: absolute;
  right: 25px;
  top: 25px;
  transform: scale(2.2);
  cursor: pointer;
}
.input-field-groups{
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
  margin-bottom: 5px;
}
.input-field-groups > input{
  width: 45px;
  border-radius: 8px;
  height: 50px;
  outline: none;
  font-size: 25px;
  text-align: center;
  font-weight: bold;
  font-family: 'Montserrat';
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.161));
  border:1px solid gray;
}
.modal-buybox-reg p{
  font-weight: 600;
  font-size: 15px;
}
.modal-buybox-reg p button{
  padding: 0;
  margin-top: -5px;
  font-weight: 600;
  color: blue;
}
.modal-buybox-reg p:last-child{
  margin-top: -15px;
}
.modal-buybox-reg p span{
  color:red !important;
}
.endbox{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
.error-txt{
  text-align: center;
  color:red;
  font-weight: 500;
}
@media(max-width: 800px){
  .modal-buybox-reg{
    width: 400px !important;
  }
}
</style>