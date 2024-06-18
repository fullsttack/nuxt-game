<template>
  <teleport to="body">
    <div class="loading-main">
      <nuxt-img loading="lazy" alt="router loading" src="/loading.gif"/>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "wgloading",
  mounted() {
    $("#__nuxt").addClass('blur-main');
  },
  unmounted() {
    $("#__nuxt").removeClass('blur-main');
  }
}
</script>

<style scoped>
.loading-main{
  position: fixed;
  background-color: transparent !important;
  width: 300px;
  height: 100px;
  z-index: 9999999999999;
  left: 38%;
  right: 50%;
  top: 30%;
  bottom: 50%;
}
@media (max-width: 768px){
  .loading-main{
    left: 30% !important;
    top: 25%;
  }
  .loading-main img{
    width: 50%;
  }
}
</style>