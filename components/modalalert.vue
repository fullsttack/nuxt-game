<template>
  <Teleport to="#modal_place">
    <div class="containermodal" id="alert_modal_container" v-if="isOpened">
      <div id="alert_modal" class="modal fade" role="dialog">
        <div class="modal-dialog modal-xs">
          <div  class="modal-content">
            <div class="modal-body" style="padding:20px;">
              <button type="button" class="btn btn-close" @click="closeDialog" >
                <div style="transform: scale(2);">&times;</div>
              </button>
              <div class="slot">
                <slot></slot>
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
  name: "modalalert",
  props:['open'],
  data(){
    return{
      isOpened:false
    }
  },
  methods:{
    toggle(){
      this.isOpened = true;
        //$('#alert_modal').modal({backdrop: 'static', keyboard: false})
      this.$nextTick(()=>{
        $(".containermodal").css("display","block");
        $('#alert_modal').css("display","block").css('opacity','1');
        $("#alert_modal_container").css('position','fixed');
      });
    },
    closeDialog(){
      //$('#alert_modal').modal('toggle');
      $(".containermodal").css("display","none");
      $('#alert_modal').css("display","none").css('opacity','0');
      $("#alert_modal_container").css('position','relative');
      this.$emit('close');
      this.isOpened = false;
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
  text-transform: capitalize;
  font-weight: 500;
}
.rtl_class .modal-body{
  text-align: right;
}
</style>