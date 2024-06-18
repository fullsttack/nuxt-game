<template>
  <div class="input-container">
    <nuxt-img alt="user password icon" loading="lazy" class="icon" src="/images/account/pass_ico_gray.svg" />
    <input :type="showPass ? 'text':'password'" name="password" class="email-input" v-model="value" :placeholder="placeholder"/>
    <nuxt-img v-if="!showPass" loading="lazy" alt="show password" src="/icons/eye.svg" class="showPass" @click="showPass=true;"/>
    <nuxt-img v-else loading="lazy" alt="show password" src="/icons/hiddenEye.svg" class="showPass" @click="showPass=false;"/>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "x-passwordpro",
  setup(){
    const showPass = ref(false);

    return {
      showPass
    }
  },
  props:{
    placeholder:{
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
@import "@/public/css/components/authpopup_new.css";
.showPass{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
  cursor: pointer;
  transition: 1s ease;
}
.showPass:hover{
  opacity: 1;
}
</style>