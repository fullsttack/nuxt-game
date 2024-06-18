<template>
  <div>
    <div class="contact_support" @click="showModal=true;">
      <div class="support_tooltip">
        Do you have a question? Contact us now!
      </div>
      Support
    </div>
  </div>
  <support-modal v-model:show="showModal" @close="onCloseModal"/>
</template>

<script>
import useUtils from "../../composables/useUtils";
import SupportModal from "./supportModal";

export default {
  name: "contactSupport",
  components: {SupportModal},
  data(){
    return {
      showModal:false
    }
  },
  methods:{
    onCloseModal(){
      this.showModal = false;
    }
  }
}
</script>

<style scoped>
.contact_support{
  width: 60px;
  height: 65px;
  color: #fff;
  text-align: center;
  padding: 40px 0 0 0;
  background: url(/images/contact_support.png) center 10px no-repeat #18c75d;
  background-size: auto;
  background-size: 30px;
  -webkit-border-top-left-radius: 4px;
  -moz-border-radius-topleft: 4px;
  border-top-left-radius: 4px;
  -webkit-border-bottom-left-radius: 4px;
  -moz-border-radius-bottomleft: 4px;
  border-bottom-left-radius: 4px;
  font-family: rubikmedium,arial,tahoma;
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
  -webkit-box-shadow: 0 2px 4.8px .2px rgba(31,43,51,.2);
  -moz-box-shadow: 0 2px 4.8px .2px rgba(31,43,51,.2);
  box-shadow: 0 2px 4.8px .2px rgba(31,43,51,.2);
  position: fixed;
  bottom: 90px;
  right: 0;
  z-index: 8000;
  cursor: pointer;
}
.support_tooltip{
  font-size: 16px;
  width: max-content;
  max-width: 270px;
  height: 50px;
  border-radius: 5px;
  background-color: gray;
  position: fixed;
  right: 10px;
  bottom: 170px;
  color:white;
  text-align: left;
  padding: 5px;
  font-weight: 500;
  line-height: 20px;
  padding-left: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.support_tooltip:after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  border: 10px solid;
  border-color: gray transparent transparent transparent;
  bottom: -19px;
  right: 10px;
}
.contact_support:hover .support_tooltip{
  opacity: 1;
}

@media screen and (max-width: 768px){
  .contact_support{
    display: none;
  }
}
</style>