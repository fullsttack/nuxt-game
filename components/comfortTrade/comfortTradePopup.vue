<template>
  <div class="err-popup" v-if="show">
    <div>
      <div>
        <div class="header">{{ error.title }}</div>
        <div class="content">{{error.content}}</div>
        <div v-if="error.show_close">
          <button class="btn btn-primary" @click="closePopup">{{ $t('comfort.btn_close') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue';
export default {
  props: {
    error:{
      type:Object
    }
  },
  name: "comfortTradePopup",
  setup(props,{emit,expose}){
    const show = ref(false);
    watch(props.error, (first, second) => {
      if(second.title !== ''){
        show.value = true;
      }
    });
    const closePopup = ()=>{
      props.error.title='';
      show.value = false;
      emit('close');
    }
    expose({closePopup});
    return {show,closePopup}
  },
}
</script>

<style scoped>
@import "@/public/css/components/comfort_trade/simplepopup.css";
</style>