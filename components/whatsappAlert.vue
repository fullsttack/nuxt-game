<template>
  <div>
    <div class="containermodal" id="wa_alert_container" v-if="isOpened">
      <div id="alert_modal" class="modal fade" role="dialog">
        <div class="modal-dialog modal-xs">
          <div  class="modal-content">
            <div class="modal-body" style="padding:20px;">
              <button type="button" class="closewa" @click="closeDialog">&times;</button>
              <div class="slot" style="font-size: 15px;text-align: center;">
                <img src="/images/wa.png" width="85"/>
                <br>
                Unfortunately, we are not allowed to offer WhatsApp support at this time. <b>We therefore ask you to contact us in other ways that you can find under "Support" - such as Telegram or eMail.</b>
                <br>
                <br>
                We are currently in contact with Meta to offer you support via WhatsApp again soon.
                <br>
                <br>
                <b>We ask for your understanding.</b>
                <br>
                <button class="btn btn-primary btn-gotit" @click="closeDialog">Got it !</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IMask from "imask";
import {api} from "../composables/api";

export default {
  name: "whatsappAlert",
  props:['open'],
  data(){
    return{
      isOpened:false
    }
  },
  methods:{
    toggle(){
      if (process.client && localStorage.getItem('whatsapp_alert_accepted') === 'true') {
        return
      }

      this.isOpened = true;
        //$('#alert_modal').modal({backdrop: 'static', keyboard: false})
      setTimeout(()=>{
        $(".containermodal").css("display","block");
        $('#alert_modal').css("display","block").css('opacity','1');
        $("#wa_alert_container").css('position','fixed');
      },5000);
    },
    closeDialog(){
      //$('#alert_modal').modal('toggle');
      $(".containermodal").css("display","none");
      $('#alert_modal').css("display","none").css('opacity','0');
      $("#wa_alert_container").css('position','relative');
      this.$emit('close');
      this.isOpened = false;

      if (process.client) {
        localStorage.setItem('whatsapp_alert_accepted', 'true');
      }
    }
  },
  watch:{
    open(o,n){
      if(o) {
        this.toggle();
      }
    }
  }
}
</script>

<style scoped>
@import "@/public/css/components/puremodal.css";
#alert_modal{
  z-index: 999999999;
  margin-top: 15%;
}
.btn-close{
  background: #008080ad;
  color: white;
  text-decoration: none;
  border-radius: 50%;
  font-family: 'Montserrat';
  float:right;
  height: 34px;
  padding-top: 4px;
}
.slot{
  margin-top: 5px;
  font-size: 18px;
  font-weight: 500;
}
.btn-gotit{
  border-radius: 50px;
  line-height: 25px;
  margin-top: 15px;
}
.closewa{
  transform: scale(2);
  float: right;
  background: transparent;
  border: 0;
}

@media (max-width: 800px) {
  .closewa{
    margin-top: 15px;
  }
}
</style>