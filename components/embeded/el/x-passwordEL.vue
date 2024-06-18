<template>
  <div class="input-field">
    <input :type="showPass ? 'text':'password'" required spellcheck="false" v-model="value"/>
    <label>{{ title }}</label>
    <nuxt-img v-if="!showPass" loading="lazy" alt="show password" src="/icons/eye.svg" class="showPass" @click="showPass=true;"/>
    <nuxt-img v-else loading="lazy" alt="show password" src="/icons/hiddenEye.svg" class="showPass" @click="showPass=false;"/>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "x-passwordEL",
  setup(){
    const showPass = ref(false);

    return {
      showPass
    }
  },
  props:{
    title:{
      type:String
    },
    modelValue:{
      type:Object
    },
  },
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
}
</script>

<style scoped>
@import "@/public/css/pages/login.css";
.showPass{
  position: absolute;
  right: 10px;
  top: 18px;
  opacity: 0.4;
  cursor: pointer;
  transition: 1s ease;
  width: 22px;
}
.showPass:hover{
  opacity: 1;
}
</style>