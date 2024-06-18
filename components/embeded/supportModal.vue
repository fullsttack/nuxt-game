<template>
  <div class="containermodal" v-if="show" @click.self="onCloseModal">
    <div class="modal-support">
      <div>
        <div class="close_support" @click="onCloseModal">&times;</div>
        <p class="p1">
          You Need Help?
        </p>
        <p class="p2">Just contact us wherever you like</p>
        <div class="support-ways"  target="_blank">

          <a href="mailto:support@whatsgaming.net?subject=Support">
            <img src="/images/support/email.svg"/>
          </a>
          <a href="https://t.me/whatsgamingsupport" target="_blank">
            <img src="/images/support/tlg.svg"/>
          </a>
          <a href="https://discord.gg/akPEx7Hq" target="_blank">
            <img src="/images/support/discord.svg"/>
          </a>
<!--          <a :href="'https://wa.me/+989999797725?text='+getWGSupportMsg()" target="_blank">-->
<!--            <img src="/images/support/wa.svg"/>-->
<!--          </a>-->
        </div>
        <p class="p3">
          We Will Help Immediately !
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import useUtils from "../../composables/useUtils";

export default {
  name: "supportModal",
  props:{
      show:{
        default:false,
        type:Boolean
      }
  },
  setup(){
    const {getWGSupportMsg} = useUtils();
    return {getWGSupportMsg}
  },
  methods:{
    onCloseModal(){
      this.$emit("close");
    }
  }
}
</script>

<style scoped>
.containermodal{
  width: 100%;
  height: 100vh;
  opacity: 1;
  background: #22222269;
  z-index: 40000;
  top:0;
  left: 0;
  overflow: hidden;
  animation-name: fadeIn_Container;
  animation-duration: 1s;
  display: block;
  position: fixed;
}
.modal-support{
  border-radius: 15px;
  animation-name: fadeIn_Modal;
  animation-duration: 0.8s;
  width: 450px;
  height: 250px;
  background-color: white;
  position: absolute;
  display: block;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  padding: 15px;
}
.modal-support > div{
  border: 2px solid #201D56;
  min-height: 220px;
  border-radius: 15px;
  background-color: #FFFFFF;
  padding-top: 30px;
  text-align: center;
}
.p1{
  font-weight: bolder;
  font-size: 18px;
  margin:0;
}
.p2{
  font-weight: 500;
  font-size: 16px;
}
.p3{
  font-weight: 500;
  font-size: 15px;
  font-style: italic;
}
.support-ways{
  display: flex;
  justify-content: center;
  gap: 5%;
  margin-bottom: 25px;
  padding-top: 10px;
}
.support-ways img{
  width: 40px;
  height: 40px;
}
.support-ways img:hover{
  filter: brightness(0.7);
  cursor: pointer;
}
.close_support{
  position: absolute;
  right: 25px;
  top: 25px;
  transform: scale(2.2);
  cursor: pointer;
}
@keyframes fadeIn_Modal {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

@media (max-width: 800px) {
  .modal-support{
    transform: scale(0.90);
    left: 0;
    width: 100%;
  }
  .containermodal{
    position: fixed;
  }
}
</style>