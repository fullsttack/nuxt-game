<template>
  <Teleport to="#modal_place">
    <div class="containermodal" id="voucher_modal_container">
      <div id="voucher_modal" class="modal fade" role="dialog" data-backdrop="true">
        <div class="modal-dialog modal-xs">
          <div  class="modal-content">

            <div class="modal-body">
              <button type="button" class="close" @click="closeDialog" style="transform: scale(1.5);">&times;</button>
              <h6 style="margin-top: 5px;">{{ $t('account.promo_code.title')}}</h6>
              <div class="voucher-container" v-if="!voucherSuccess">
                <input type="text" ref="txt_input" v-model="voucherCode" maxlength="19"/>
                <br/>
                <button class="btn btn-redeem" @click="submitRedeem">
                  <nuxt-img loading="lazy" alt="voucher loading" v-if="loading" src="/loading_btn.svg"  />
                  <span v-else>{{ $t('account.promo_code.submit') }}</span>
                </button>
                <span class="err-txtvoucher" v-if="error!==''">{{ error }}</span>
              </div>
              <div v-else>
                <span class="err-txtvoucher" style="color:green;text-align: center;font-size: 16px;">{{ error }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import IMask from "imask";
import {api} from "../composables/api";

export default {
  name: "voucher",
  props:['open'],
  data(){
    return{
      voucherCode:'',
      error:'',
      loading:false,
      voucherSuccess:false
    }
  },
  methods:{
    toggle(){
      //$('#voucher_modal').modal({backdrop: 'static', keyboard: false})
      $(".containermodal").css("display","block");
      $('#voucher_modal').css("display","block").css('opacity','1');
    },
    closeDialog(){
      //$('#voucher_modal').modal('toggle');
      $(".containermodal").css("display","none");
      $('#voucher_modal').css("display","none").css('opacity','0');
      this.$emit('close');
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
  watch:{
    open(o,n){
      if(o) {
        this.toggle();
      }
    }
  },
  mounted() {
    if (!navigator.userAgent.indexOf("Firefox") === -1) {
      new IMask(this.$refs.txt_input, {
        mask:'0000 0000 0000 0000',
        pattern: '\\d+',
      });
    }

  }
}
</script>

<style scoped>
@import "@/public/css/components/puremodal.css";
#voucher_modal{
  z-index: 999999999999;
}
.voucher-container{
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color:black;
  border-radius: 12px;
  width: 100%;
  height: 40px;
}
.btn-redeem{
  background: #008080ad;
  color: white;
  text-decoration: none;
  width: 100px;
  border-radius: 15px;
  font-family: 'Montserrat';
  margin-top: 10px;
}
.err-txtvoucher{
  padding-right: 12px;
  font-size: 15px;
  -webkit-text-stroke: 0.2px;
  color: red;
  margin-top: 10px;
  margin-bottom: -15px;
}
</style>