<template>
  <div class="containermodal">
    <div class="auth-popup" role="dialog">
      <div class="modal-content">
        <div class="circular-cutout">
          <img src="/icons/tinyico.png" alt="Image">
        </div>
        <div class="auth-header">
          {{ $t('payment_confirm.title') }}
        </div>
        <div class="content-style pt-2">
          <p class="text-center">
            {{$t('payment_confirm.desc')}}
          </p>
          <p class="m-auto w-btn">
            <button class="btn" @click="showSupport = true;">{{$t('payment_confirm.contact_us')}}</button>
          </p>
          <div class="pt-5">
            <p>
              {{$t('payment_confirm.regards')}}
            </p>
            <p>
              {{$t('payment_confirm.team')}}
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
  <support-modal :show="showSupport" @close="showSupport=false" />
</template>

<script>
import SupportModal from "./supportModal";
import {ref} from "vue";
export default {
name: "AuthVerification",
  components: {SupportModal},
  setup(){
    const showSupport = ref(false);
    return {
      showSupport
    }
  }
}
</script>

<style scoped>
.containermodal{
  display: block;
  position: fixed;
  z-index: 9999;
  background-color: rgba(32, 29, 86,0.6);
  width: 100%;
  height: 100vh;
  top: 0;
  border-radius: 10px;
  transition: 0.3s ease;

  left: 0;
}
.auth-popup{
  width: max-content;
  min-width: 25%;
  max-width: 45%;
  top: 30%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.modal-content{
  min-height: 250px;
  padding: 25px;
  padding-top:70px;
  border-radius: 10px;
  background: radial-gradient(circle at 50% 0, transparent 9%, white 9.3%);
  background: radial-gradient(circle at 50% 0, transparent 9%, white 9.3%);
  border: none;
}
.auth-header{
  text-align: center;
  font-size:var(--font-size-29px);
  color:#526C83;
  font-weight: bold;
}
.content-style{
  width: 80%;
  margin: 0 auto;
  font-size: 19px;
  font-size: var(--font-size-18px);
  font-weight: bold;
}
.content-style div p{
  line-height: 12px;
  font-size: var(--font-size-16px);
  text-align: center;
}
.w-btn{
  width: max-content;
}
.w-btn button{
  color: white;
  font-weight: 600;
  background-color: #36AD72;
}
.w-btn button:hover{
  background-color: #0b8147;
}
.circular-cutout {

  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  /* -webkit-clip-path: circle(50% at 50% 0); */
  /* clip-path: circle(50% at 50% 0); */
  border-radius: 50%;
  background-color: white;
}

.circular-cutout img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  object-fit: cover;
  /*border-radius: 50%;*/
  /*background-color: white;*/
  padding: 6px;
  padding-left: 10px;
  padding-top: 3px;
}
@media(max-width: 820px){
  .auth-popup{
    width: 85%;
    top: 15%;
    width: 90% !important;
    max-width: 90% !important;
  }
  .modal-content{
    min-height: 190px;
    padding: 3.5%;
    padding-top: 50px;

  }
  .auth-header{
    font-size: var(--font-size-24px);
  }
  .content-style{
    width: 100%;
  }
  .circular-cutout {
    width: 62px;
    height: 62px;
    top: -32px;
  }
  .circular-cutout img {
    width: 65px;
    height: 65px;
    padding-top: 5px;
  }
  .auth-popup{
    top: 28%;
  }
}
@media(max-width: 320px){
  .circular-cutout {
    width: 75px;
    height: 75px;
    top: -40px;
  }
  .circular-cutout img {
    width: 65px;
    height: 65px;
    padding-top: 5px;
  }
}
</style>