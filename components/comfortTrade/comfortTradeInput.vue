<template>
  <div class="comfort-input" :class="{shakeinput:error!==''}">
    <label>
      {{ title }}
    </label>
    <input autocomplete="nope123" :type="ispassword && !showPass ? 'password':'text'" v-model="value" :placeholder="placeholder" :pattern="inputmode==='code' ? '[0-9]*':''" :inputmode="inputmode==='code' ? 'numeric':''" :maxlength="inputmode==='code' ? 8:''" @keypress="onlyNumber">
    <nuxt-img v-if="!showPass && ispassword" loading="lazy" alt="show password" src="/icons/eye.svg" class="showPass" @click="showPass=true;"/>
    <nuxt-img v-else-if="showPass && ispassword" loading="lazy" alt="show password" src="/icons/hiddenEye.svg" class="showPass" @click="showPass=false;"/>
    <span>{{error}}</span>
    <div class="comfort-input-tooltip" v-if="tooltip" @click="onToolTipScroll">
      <img src="/images/comfort/box/hint.svg" />
      <div class="comfort-input-tooltip-body">
        {{tooltip}}
      </div>
    </div>
  </div>

</template>

<script>
import {ref} from "vue";

export default {
  //props:['title','modalInput','wd','placeholder','error','tooltip','ispassword'],
  props:{
    title:{
      type:String
    },
    modelValue:{
      type:Object
    },
    wd:{
      type:String
    },
    placeholder:{
      type:String
    },
    error:{},
    tooltip:{},
    ispassword:{
      type:Boolean,
      default:false
    },
    inputmode:{
      type:String,
      default: 'normal'
    },
    invalid:{
      type:Boolean,
      default:false
    }
  },
  setup(){
    const showPass = ref(false);

    return {
      showPass
    }
  },
  name: "comfortTradeInput",
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value.toString())
      }
    }
  },
  methods: {
    onlyNumber ($event) {
      if(this.inputmode === 'code'){
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
        }
      }
    },
    onToolTipScroll(){
      if(this.ispassword && window.innerWidth < 800){
        document.querySelector("#guide__container").scrollIntoView({
          block:"nearest"
        })
      }
    }
  }
}
</script>

<style scoped>
.comfort-input{
  display: flex;
  flex-direction: column;
  width: v-bind('wd');
  position: relative;
}
.comfort-input label{
  font-size: var(--font-size-15px);
  font-weight: 600;
  margin: 0;
  margin-bottom: 5px;
}
.comfort-input input{
  height: 50px;
  border-radius: 8px;
  background-color: #EFEFEF;
  border:0;
  padding-inline-start: 10px;
  font-size: var(--font-size-14px);
  font-weight: 500;
}
.comfort-input input:focus{
  outline: none !important;
  border: 1px solid gray;
}
.comfort-input input::placeholder{
  font-size: var(--font-size-14px);
  font-weight: 400;
}
.comfort-input span{
  color:red;
  font-weight: 600;
  font-size: var(--font-size-13px);
  padding-left: 5px;
}
.comfort-input-tooltip{
  position: absolute;
  right: 0;
  top: -2px;
  cursor: pointer;
}
.comfort-input-tooltip img{
  width: 19px;
}
.comfort-input-tooltip-body{
  background-color: #150b53ad;
  padding: 5px;
  color:white;
  border-radius: 10px;
  position: absolute;
  right: 10%;
  display: none;
  font-size: var(--font-size-13px);
  width: max-content;
}
.comfort-input-tooltip:hover .comfort-input-tooltip-body{
  display: block;
  transition: all 0.3s ease-in-out;
}
.showPass{
  position: absolute;
  right: 10px;
  top: 43px;
  opacity: 0.4;
  cursor: pointer;
  transition: 1s ease;
  width: 22px;
}
.showPass:hover{
  opacity: 1;
}
@media (max-width: 800px) {
  .showPass{
    top: 38px;
  }
  .comfort-input label{
    margin-left: 10px;
  }
  .comfort-input-tooltip{
    margin-right: 10px;
    top: -5px;
  }
  .comfort-input-tooltip img{
    height: 18px;width: 18px;
  }
}
.shakeinput {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  perspective: 1000px;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
}
.shakeinput input{
  border: 1px solid red;
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
.rtl_class label{
  text-align: right !important;
}
.rtl_class .comfort-input-tooltip{
  right: inherit !important;
  left: 4px  !important;
}
.rtl_class .comfort-input-tooltip:hover .comfort-input-tooltip-body{
  right: inherit !important;
  left: 10% !important;
}

</style>