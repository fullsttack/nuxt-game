<template>
  <div class="hero-unit" :class="{bigheader:icon==='rocket'}">
    <img src="/images/comfort/rocket.svg" class="head-icon" v-if="icon==='rocket'"/>
    <h1 class="page-title" :class="{minimize_content:small}">
      <slot/>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    small:{
      default:false,
      type:Boolean
    },
    icon:{
      default: 'N/A'
    }
  },
  name: "TitleHeaderFootball",
  mounted() {

  }
}
</script>

<style scoped>
.hero-unit{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  overflow: hidden;
  height: 110px;
  background: rgba(32, 29, 86, 0.6);
  background-image: url(/images/header_bg_new.webp);
  margin-top: -25px;
}
.hero-unit::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(32, 29, 86, 0.5);
}
.hero-unit .page-title{
  font-weight: 700;
  font-size: 29px;
  line-height: 35px;
  color: #ffffff;
  z-index: 99;
  position: relative;
  margin:0;
  padding-top: 5px;
}
.hero-unit .page-title::before {
  content: "";
  position: absolute;
  max-width: 65px;
  height: 6px;
  margin: auto auto;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: -15px;
  border-radius: 10px;
  background: #ffffff;
}
.bigheader{
  height: 150px !important;
  margin-bottom: 35px;
}
@media (max-width: 768px) {
  .hero-unit .page-title{
    font-size: 18px;
    line-height: 10px;
    margin-top: -5px;
    padding: 0;
  }
  .hero-unit{
    height: 70px;
    padding: 0;
  }
  .bigheader{
    height: 90px !important;
  }
}
@media only screen and (max-width: 500px) {
  .hero-unit {
    margin-bottom: 0px;
    height: 70px;
    background-size: cover;
    margin-top: 0px;
  }

  .hero-unit .page-title {
    font-size: 18px !important;
  }

  .hero-unit .page-title::before {
    height: 3px;
    width: 43px;

    /*margin-bottom: -5px;*/
  }

  .desktop-view {
    display: none;
  }
  .head-icon{
    width: 21px;
    height: 21px;
  }
}
.minimize_content{
  font-size: var(--font-size-28px) !important;
  text-transform: lowercase;
}
.minimize_content:first-line{
  text-transform: capitalize;
}
.minimize_content::before{
  margin-bottom: -15px !important;
}
.head-icon{
  filter: brightness(1);
  margin-inline-end: 10px;
}
</style>