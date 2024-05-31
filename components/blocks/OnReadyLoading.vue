<template>
  <div id="loading-modal" class="onloadDisplay"  v-if="$route.name=='index'||$route.name=='lang' ||$route.name =='lang-fc-coins-fc-24-coins'">
    <nuxt-img loading="lazy" alt="onpageload website icon" width="1000" height="500" src="/images/logo_4.png"/>
  </div>
</template>

<script>
import {useNuxtApp} from "nuxt/app";

export default {
  name: "OnReadyLoading",
  mounted() {
    useNuxtApp().hook("page:start", ()=>{
      $("#onload-display").remove();
    });
  }
}
</script>

<style scoped>
.onloadDisplay{
  z-index: 999999;
  position: fixed;
  background: white;
  width: 100%;
  height: 100%;
}
.onloadDisplay img{
  z-index: 999999;
  position: fixed;
  width: 200px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: invert(100%) grayscale(1);
}
</style>