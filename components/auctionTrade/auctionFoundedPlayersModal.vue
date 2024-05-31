<template>
  <div class="containermodal">
    <div class="auction-popup" role="dialog">
      <img src="/images/auction/trade/close2.svg" class="close-btn" @click="closeModal" />

      <div class="modal-content" :class="{selectedMode:isItemSelected}">
        <div>
          <div>
            <img
                src="/images/auction/trade/wired.svg"
                width="30"
            />
            <span>{{$t('messages.found_many_players.title')}}</span>

          </div>
          <div v-if="!isItemSelected" v-html="$t('messages.found_many_players.message').replace(':n',founded_players.length)"></div>
          <div v-else v-html="$t('messages.found_many_players.message_confirm').replace(':n',selectedPlayerKey)"></div>
        </div>
        <div v-if="!isItemSelected">
          <img
              src="/images/auction/trade/left-swip.svg"
              alt="player swip right icon"
              @click="swiper.slidePrev();"
              class="s-prev"
              width="30"
              :class="{disnav:founded_players.length === 1 || swiper.isBeginning}"
          />
          <div class="swiper-container">
            <swiper

                :pagination="true"
                class="mySwiper"
                :class="{oneItem:founded_players.length === 1 }"
                :shortSwipes="true"
                :centeredSlides="false"
                @swiper="onSwiper"
                :breakpoints="swiperOptions.breakpoints"
            >
              <swiper-slide v-for="(item, key) in founded_players"  :key="item.id">
                <auctionfunds-player-item :item="item" :packet="packet" @onSelect="onSelectPlayer" :select-key="key"/>
              </swiper-slide>
            </swiper>
          </div>
          <img
              src="/images/auction/trade/right-swip.svg"
              alt="player swip right icon"
              @click="swiper.slideNext();"
              width="30"
              class="s-next"
              :class="{disnav:founded_players.length === 1 || swiper.isEnd}"
          />
        </div>
        <div v-else class="d-block m-auto w-100">
          <div class="m-auto d-flex justify-content-center mob-confirm-container">
            <auctionfunds-player-item :item="selectedPlayer" :packet="packet" :show-select="false"/>
          </div>
          <div class="confirm-btn-box">
            <button class="btn btn-confirm" @click="confirmtoBuy">{{ $t('messages.found_many_players.message_confirm_yes') }}</button>
            <button class="btn btn-confirm" @click="rejectBuy">{{ $t('messages.found_many_players.message_confirm_no') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import 'swiper/css/pagination';
import {computed, ref} from "vue";
import AuctionfundsPlayerItem from "./auctionfundsPlayerItem";
export default {
  name: "auctionFoundedPlayersModal",
  components: {
    AuctionfundsPlayerItem,
    Swiper,
    SwiperSlide,
  },
  props:{
    packet:{
      type:Object,
      default:{}
    },
    founded_players:{
      default: []
    }
  },
  setup(props, { emit }){
    const swiper = ref('');
    const selectedPlayer = ref(null);
    const selectedPlayerKey = ref(-1);
    const swiperOptions = {
      loop: false,
      centeredSlides: true,
      breakpoints: {
        390: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
        950: {
          slidesPerView: 1,
          spaceBetween: 60,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      }
    };
    const buyevt = (k) => {
        emit('on_buy',k);
    }
    const onSwiper = (k) => {
      swiper.value = k;
    }
    const closeModal= () => {
      emit('close');
    }
    const onSelectPlayer = (key,item)=>{
      selectedPlayer.value = item;
      selectedPlayerKey.value = key;
    }
    const isItemSelected = computed(()=>{
      return selectedPlayer.value !== null;
    });
    const confirmtoBuy = () => {
      buyevt(selectedPlayerKey.value);
    }
    const rejectBuy = ()=>{
      selectedPlayer.value = null;
      selectedPlayerKey.value = -1;
      if(props.founded_players.length === 1){
        closeModal();
      }
    }
    return {buyevt,swiper,onSwiper,swiperOptions,closeModal,onSelectPlayer,isItemSelected,confirmtoBuy,rejectBuy,selectedPlayer,selectedPlayerKey}
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
.auction-popup{
  width: 1250px;
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.65);
  border-radius: 10px;
}
.modal-content > div:first-child{
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
  margin-bottom: -40px;
}
.modal-content > div:first-child img{
  margin-right: 1%;
  margin-top:-2px;
}
.modal-content > div:first-child p{
  font-size:18px;
  font-weight: 600;
  width: 80%;
  margin: 0 auto;
}
.modal-content > div:first-child p br{
  display: none;
}
.modal-content > div:last-child{
  height: 730px;
  padding-top: 70px;
  padding-bottom: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;

}

.swiper-container{
  width: 77%;
  margin: 0 auto;
}
.s-next:hover,.s-prev:hover{
  cursor: pointer;
}
.s-prev{
  margin-left: 30px;
}
.s-next{
  margin-right: 30px;
}
.modal-content > img:hover,.close-btn:hover{
  filter:brightness(3);
  cursor: pointer;
}
.disnav{
  /*cursor: initial !important;*/
  /*filter: invert(50%) grayscale(1);*/
  visibility: hidden;
}
.close-btn{
  position: absolute;
  top: 12px;
  right: 20px;
  z-index: 9;
}
.btn-confirm{
  min-width: 25%;
  width: max-content;
  font-size: var(--font-size-19px);
  font-weight: 600;
  margin-top: 25px;
  height:53px;
  background-color: #201D56;
  color:white;
}
.btn-confirm:hover{
  color:white;
  background-color: #5f5be1;
}
.confirm-btn-box{
  display: flex;
  justify-content: center;
  gap:10px;
}
@media(max-width: 1800px){
  .auction-popup {
    width: 1250px;
    position: fixed;
    border-radius: 10px;
  }
  .modal-content > div:first-child{
    font-size: 21px;
    padding:5px;
  }
}
@media(max-width: 800px){
  .coins{
    width: 15px;
    height: 13px;
  }
  .modal-content{
    border-radius: 10px;
  }
  .auction-popup {
    width: 94%;
    transform: translate(-50%, -50%);
  }
  .auction-popup .close-btn{
    width: 20px;
    height: 20px;
    right: 10px;
  }
  .modal-content > div > div:first-child{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
  }
  .modal-content > div:first-child{
    gap: 10px;
    margin-top:20px;
    margin-bottom: -55px;
  }
  .modal-content > div:first-child img{
    width: 42px;
    height: 42px;
  }
  .modal-content > div > div:last-child > p{
    font-size: 11px;
  }
  .modal-content > div:last-child{
    height: 505px;
    padding-top: 150px;
    padding-bottom: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .s-next,.s-prev {
    width: 20px;
    height: 20px;
    margin: 10px;
  }
  .swiper-container{
    width: 77%;
  }
  .modal-content > div:first-child {
    font-size: 13.5px;
    padding: 5px;
  }
  .mob-confirm-container{
    width: 75%;
  }
  .selectedMode{
    display: flex !important;
  }
  .selectedMode> div:last-child{
    padding-top: 15px !important;
  }
  .selectedMode> div{
    margin-bottom: 0 !important;
  }
  .btn-confirm{
    height: 36px;
    font-size: 12px;
  }
  .confirm-btn-box{
    margin-top: -20px;
  }
}
</style>
<style>
@media(min-width: 900px){
  .oneItem > .swiper-wrapper{
    justify-content: center !important;
  }
}
.modal-content > div:first-child p{
  font-weight: 500 !important;
}
@media (max-width: 330px) {
  .auction-popup {
    width: 400px !important;
    transform: translate(-50%, -51%) scale(0.7) !important;
  }
}
@media  (min-width: 350px) and (max-width: 395px) {
  .auction-popup {
    width: 100% !important;
    transform: translate(-50%, -51%) scale(0.9) !important;
  }
}
</style>