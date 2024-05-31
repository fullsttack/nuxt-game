<template>
  <div class="containermodal" v-if="show" @click.self="onCloseModal">
    <div class="modal-voucher">
      <div>
        <div class="close_support" @click="onCloseModal">&times;</div>
        <div class="voucher-body" :class="{susbox:voucherSuccess}">
          <p v-if="!voucherSuccess">
            {{ $t('account.promo_code.title')}}
          </p>
          <p v-if="!voucherSuccess">
            Please enter your code to redeem it
          </p>
          <div class="redeem-box" v-if="!voucherSuccess">
            <input type="text" maxlength="16" v-model="voucherCode"/>
            <button class="btn btn-primary btn-redeem" @click="submitRedeem">
              <nuxt-img loading="lazy" alt="voucher loading" v-if="loading" src="/loading_btn.svg"  />
              <template v-else>{{ $t('account.promo_code.submit') }}</template>
            </button>
          </div>
          <span class="err-txtvoucher" v-if="error!==''">{{ error }}</span>
          <button class="btn btn-primary btn-redeem" v-if="voucherSuccess" @click="onCloseModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from "../../composables/api";

export default {
  props:{
    show:{
      default:false,
      type:Boolean
    }
  },

  name: "vouchercard",
  data(){
    return {
      voucherCode:'',
      error:'',
      loading:false,
      voucherSuccess:false
    }
  },
  methods:{
    onCloseModal(){
      this.voucherCode = '';
      this.error = '';
      this.voucherSuccess = false;
      this.$emit("close");
    },
    submitRedeem(){
      if(this.voucherCode !== ''  && !this.loading){
        this.loading = true;
        var pcode = this.voucherCode.replaceAll(" ","");
        api.post('promo_codes/enter', {body_params: {promo_code: pcode}}).then(res => {
          if(res.data.errors === undefined){
            this.voucherSuccess = true;
            this.error = res.data.message;
          }else{
            this.error = res.data.errors.promo_code;
          }
        }).catch(e => {
          this.error = e.message;
          this.loading = false;
        }).finally(() => {
          this.loading = false;
        })
      }
    }
  },
}
</script>

<style scoped>
.containermodal{
  width: 100%;
  height: 100vh;
  opacity: 1;
  background: rgba(32, 29, 86, 0.55);
  z-index: 40000;
  top:0;
  left: 0;
  overflow: hidden;
  animation-name: fadeIn_Container;
  animation-duration: 1s;
  display: block;
  position: fixed;
}
.modal-voucher{
  border-radius: 15px;
  animation-name: fadeIn_Modal;
  animation-duration: 0.8s;
  width: 665px;
  height: 220px;
  background-color: white;
  position: absolute;
  display: block;
  left: 50%;
  top: 45%;
  transform: translateX(-50%);
  padding: 15px;
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.161));
}
.modal-voucher > div{
  min-height: auto;
  border-radius: 15px;
  background-color: #FFFFFF;
  padding-top: 35px;
  text-align: center;
}
.voucher-body{
  text-align: left;
  width: 80%;
  margin: 0 auto;
}
.voucher-body p{
  margin: 0;
  color:#201D56;
  font-size: var(--font-size-17px);
}
.voucher-body p:first-child{
  font-weight: 600;
}
.redeem-box{
  display: flex;
  justify-content:flex-start;
  gap: 10px;
  margin-top: 20px;
}
.redeem-box input{
  outline: none;
  width: 370px;
  height: 48px;
  border: 0;
  background-color: #e7e6e6;
  padding-left: 10px;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 500;
}
.redeem-box .btn-redeem{
  width: 163px;
  height: 48px;
  background-color: #201D56;
  border-radius: 8px;
}
.err-txtvoucher{
  padding-right: 12px;
  font-size: 15px;
  -webkit-text-stroke: 0.2px;
  color: red;
  margin-top: 10px;
  margin-bottom: -15px;
}
.close_support{
  position: absolute;
  right: 25px;
  top: 25px;
  transform: scale(2.2);
  cursor: pointer;
}
.susbox{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.susbox span{
  font-size: 18px;
}
@media(max-width: 800px){
  .modal-voucher{
    width: 90%;
    top: 25%;
  }
  .redeem-box{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
  }
  .redeem-box input{
    width: 100%;
  }
  .modal-voucher > div{
    padding-top: 0;
  }
}
</style>