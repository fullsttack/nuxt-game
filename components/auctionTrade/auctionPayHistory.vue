<template>
  <div class="min-h">
    <div v-if="loading" class="loading_auction">
      <img src="/loading_btn.svg"/>
    </div>
    <div v-else class="history-container">
      <p class="transfer_overview">
        {{$t('auction.transfer_title')}}
      </p>
      <div v-if="items.length !== 0">
        <img class="nav-img nav-left" src="/images/auction/trade/history_prev.svg" :class="{hidenav:!active_prev_btn}"  @click="renderHistory(currentPage - 1)"/>

        <div class="items-container">
          <div v-for="(item,index) in items" :key="item.id" class="item">
            <!--          {{item.player_name}} | {{item.id}}-->
            <div>
              <img :src="item.img"/>
            </div>
            <div>
              <div class="p-name">
                {{item.player_name}}
              </div>
              <div class="bin">
                {{ $t('auction.player_purchase_price_title_mobile') }}
              </div>
              <div class="price">
                {{item.price.format(0, 3, '.')}}K
                <img
                    src="/images/auction/trade/coins_info.svg"
                />
              </div>
              <div class="date">
                {{ $t('auction.transfer_player_date') }}
              </div>
              <div class="date-value">
                {{ toFormattedDate(item.created_at) }}
              </div>
              <div class="status" :class="{
              pending:['wait', 'pending'].includes(item.status),
              bought:['bought'].includes(item.status),
              canceled:['canceled'].includes(item.status)
            }">
                <div v-if="['wait', 'pending'].includes(item.status)">
                  {{ $t('auction.player_pending_status') }}
                </div>
                <div v-else-if="['bought'].includes(item.status)">
                  {{ $t('auction.player_bought_status') }}
                </div>
                <div v-else-if="['canceled'].includes(item.status)">
                  {{ $t('auction.player_cancelled_status') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img class="nav-img nav-right" src="/images/auction/trade/history_next.svg" :class="{hidenav:!active_next_btn}" @click="renderHistory(currentPage + 1)"/>
      </div>
      <div v-else class="d-flex align-items-center justify-content-center">
        <div style="font-size: 19px;">Nothing Found</div>
      </div>
    </div>

  </div>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {api} from "../../composables/api";
import moment from "moment";
export default {
  name: "auctionPayHistory",
  setup(props, { emit }) {
    const items = ref([]);
    const loading = ref(true);
    const itemsCount = ref(0);
    const currentPage = ref(0);
    const isPhone = computed(()=>{
      return window.innerWidth < 800;
    });
    const eachSwipsize = computed(()=>{
      if(isPhone.value){
          return 2;
      }else{
         return 9;
      }
    })
    const getPayHistory = (take,skip) => {
      loading.value = true;
      api.get(`player_auction/my_transfers?take=${take}&skip=${skip}`).then(res => {
        itemsCount.value = res.meta.total;
        items.value = res.data;
        loading.value = false;
      })
    }

    const renderHistory = (page) =>{
        currentPage.value = page;
        getPayHistory(eachSwipsize.value, (currentPage.value * eachSwipsize.value))
    }

    const active_prev_btn = computed(()=>{
      return !(currentPage.value === 0);
    })
    const active_next_btn = computed(()=>{
      console.log(">"+Math.floor(itemsCount.value / 2));
      if(Math.floor(itemsCount.value / eachSwipsize.value) <= currentPage.value){
        return false;
      }else{
        return true;
      }
    })
    const toFormattedDate = ((date) =>{
        return moment(date).format('DD.MM.YYYY (hh:mm:ss)');
    });
    onMounted(()=>{
      getPayHistory(eachSwipsize.value,currentPage.value);
    })
    return {isPhone,eachSwipsize,loading,items,renderHistory,active_prev_btn,active_next_btn,currentPage,toFormattedDate}
  }

}
</script>

<style scoped>
.history-container{
  padding: 15px;
}
.history-container > div{
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 550px;
}
.items-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}
.item{
  width: 295px;
  height: 170px;
  border: 1px solid #201D56;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
}
.item > div:first-child{
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item > div:first-child img{
  width: 90%;
}
.item > div:last-child{
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 25px 0px 0px 5px;
}
.p-name{
  color:#02B4B5;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 1px;
}
.bin,.date{
  color:#757575;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: -3px;
}
.price{
  color:#201D56;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.price img{
  margin-left: 3px;
}
.date-value{
  color:#201D56;
  font-size: 12px;
  font-weight: 700;
}
.status{
  width: 70px;
  height: 21px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-align: center;
  line-height: 22px;
  text-transform: capitalize;
  margin-top: 2px;
}
.status.bought{
  padding-right: 6%;
  text-align: right !important;
  background-image: url("/images/auction/trade/buy_ok.svg");
  background-repeat: no-repeat;
  background-position: 10% center;
  background-color: #35BB4A;
}
.status.pending{
  background-color: #FF7A00;
}
.status.canceled{
  background-color: #DE1D1D;
}
.nav-img:hover{
  cursor: pointer;
  filter: invert(50%) grayscale(1);
}
/*.nav-left{*/
/*  position: absolute;*/
/*  left: 10px;*/
/*  top: 50%;*/
/*}*/
/*.nav-right{*/
/*  position: absolute;*/
/*  right: 10px;*/
/*  top: 55%;*/
/*}*/
.transfer_overview{
  text-decoration: underline;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
}
.hidenav{
  visibility: hidden;
}
.min-h{
  min-height: 700px;
}
@media (max-width: 800px) {
  .history-container{
    padding: 0;
    padding-top: 15px;
  }
  .history-container > div{
    min-height: 100px !important;
  }
  .min-h{
    min-height: 430px;
  }
}
.loading_auction img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) scale(2.5);

}
@media (min-width: 920px) and (max-width: 1080px){
  .history-container{
    padding-left: 0;
    padding-right: 0;
  }
  .items-container{
    gap: 0;
  }
}
</style>