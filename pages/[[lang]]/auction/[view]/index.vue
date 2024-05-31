<template>
  <TitleHeaderFootball>
    Auction Trade
  </TitleHeaderFootball>
  <div class="container auction_container" :class="{actionFilter:isModalShown,orderFinished:show_order_finished_modal}">
    <auction-header v-if="!show_auc_blocked_modal" v-model:balance="user.coins" v-model:pending_sum="pending_transfers_price_sum" v-model:bought_sum="bought_transfers_price_sum"/>
    <div v-if="loading && !show_auc_blocked_modal" class="loading_auction" style="margin: auto;font-size: 40px;">
      <img src="/loading_btn.svg"/>
    </div>
    <div v-else-if="!loading && !show_auc_blocked_modal && !showHistory" class="auction-content">
      <div class="buy-type border-box-a" v-if="!buy_type">
        <p style="text-transform: capitalize;">
          {{ $t('auction.title_type').toLowerCase() }}?
        </p>
        <div>
          <button class="btn btn-gray" @click="changeBuyType('gold')" :disabled="!can_buy_in_gold_mode">
            {{ $t('auction.less_than_text') }} <b>60,000</b>
            <img src="/images/auction/trade/coins.svg" />
          </button>
          <div class="btn-w-err">
            <button class="btn btn-gray" @click="changeBuyType('special')" :disabled="!can_buy_in_special_mode && isGoldModePendingReached">
              {{ $t('auction.more_than_text') }} <b>60,000</b>
              <img src="/images/auction/trade/coins.svg" />
            </button>
            <span class="alert alert-danger red-text" v-if="show_special_buy_error" v-html="$t('messages.all_gold_players.wait')"></span>
          </div>
        </div>

      </div>
      <div v-else class="player-search">
        <div class="border-box-a">
          <div >
            <!--            <a class="futbin_a futbin_ch" @click="toChangeBuyType">-->
            <!--              Change buy type-->
            <!--            </a>-->
            <nuxt-img loading="lazy" :src="packet.img"/>
            <a target="_blank" class="futbin_a" :href="packet.futbin_ink">
              {{ $t('auction.player_futbin_link') }}
            </a>
          </div>
        </div>
        <div>
          <div class="chose-player border-box-a">
            <p>
              {{ $t('auction.players_title_box').toLowerCase() }}
            </p>
            <div>
              <auction-player-search-swiper v-model:players="packets" @init="initSwiper" @player_selected="onPlayerSelected"/>
            </div>
          </div>
          <div class="border-box-a selected-player-info" >
            <div class="mob-info">
              <nuxt-img loading="lazy" :src="packet.img"/>
              <a target="_blank" class="futbin_a" :href="packet.futbin_ink">
                {{ $t('auction.player_futbin_link') }}
              </a>
            </div>
            <div>
              <div class="section">
                <p>
                  {{ $t('auction.player_step1_title').toLowerCase() }}
                </p>
                <div class="p-info">
                  <div>
                    <div>
                      {{ $t('auction.player_name_title').toLowerCase() }}
                    </div>
                    <div>
                      {{packet.player_name}}
                    </div>
                  </div>
                  <div>
                    <div>
                      {{ $t('auction.player_transfer_rarity') }}
                    </div>
                    <div>
                      {{ getROrQ }}
                    </div>
                  </div>
                  <div>
                    <div>
                      {{ $t('auction.player_price_title')}}
                    </div>
                    <div>
                      {{ packet.avg_price.format(0, 3, '.') }}
                      <img
                          src="/images/auction/trade/coins_info.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="section">
                <p class="d-view">
                  {{ $t('auction.player_step2_title').toLowerCase() }}
                </p>
                <p class="r-view">
                  {{ $t('auction.player_step2_title_mobile').toLowerCase() }}
                </p>
                <div class="p-info">
                  <div>
                    <div>
                      {{ $t('auction.player_start_price_title').toLowerCase() }}
                    </div>
                    <div>
                      {{ packet.start_price.format(0, 3, '.') }}
                      <img
                          src="/images/auction/trade/coins_info.svg"
                      />
                    </div>

                  </div>
                  <div>
                    <div>
                      {{ $t('auction.player_purchase_price_title').toLowerCase() }}
                    </div>
                    <div>
                      {{ packet.end_price.format(0, 3, '.') }}
                      <img
                          src="/images/auction/trade/coins_info.svg"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      {{ $t('auction.player_transfer_title').toLowerCase() }}
                    </div>
                    <div>
                      {{ packet.duration }}
                      {{ $t('auction.timer_hrs') }}
                      <img class="clock"
                           src="/images/auction/trade/clock.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="section"  v-if="!packet.transfer">
                <div class="p-search">
                  <p class="d-view">
                    {{ $t('auction.player_step3_title').toLowerCase() }}
                  </p>
                  <p class="r-view">
                    {{ $t('auction.player_step3_title_mobile').toLowerCase() }}
                  </p>
                  <button class="btn search-button" @click="searchPlayer" :disabled="isModalShown">{{ $t('auction.player_btn_search') }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <auctionno-coins-popup v-if="show_buy_coins_modal"/>

    </div>
    <div v-else-if="showHistory && !loading">
      <auction-pay-history/>
    </div>
    <auction-bought-report v-if="!isPhone && show_order_finished_modal" :box_number="show_order_finished_modal_number" @markAsFinished="onBoughtModalEvt"/>
    <auction-timer v-if="$route.params.view === 'panel' && packets.length !== 0" v-model:data="excess_limit"/>
  </div>
  <auction-bought-report v-if="isPhone && show_order_finished_modal" :box_number="show_order_finished_modal_number" @markAsFinished="onBoughtModalEvt"/>
  <auction-founded-players-modal
      v-if="show_founded_players_modal"
      v-model:packet="packet"
      v-model:founded_players="founded_players"
      @close="closeFoundedPlayersModal"
      @on_buy="buyPlayer"
  ></auction-founded-players-modal>
  <auction-modal v-if="show_auc_blocked_modal">
    <div class="error-modal enc_blocked">
      <p>{{$t('messages.blocked_auction.title')}}</p>
      <div v-html="t('messages.blocked_auction.desc')"></div>
    </div>
  </auction-modal>
  <auction-modal  v-if="show_search_modal">
    <div class="text-center error-modal s-modal">
      <p>
        <img
            src="/images/auction/trade/cam_search.svg"
        />
        {{ $t('messages.spinner.search') }}</p>
      <p>
        <img
            src="/images/auction/trade/loading.svg"
        />
        {{ $t('messages.spinner.before') }} {{ $t('messages.spinner.time') }}
      </p>
    </div>
  </auction-modal>
  <auction-modal v-if="show_error_modal">
    <div class="error-modal">
      <div v-html="search_error_text"></div>
      <button class="btn modal-close" @click="hideSearchErrorModal">X</button>
    </div>
  </auction-modal>
  <auction-modal v-if="show_error_modal">
    <div class="error-modal s-modal">
      <p>
        <img v-if="show_search_modal_2"
             src="/images/auction/trade/not_found.svg"
        />
      <div v-html="search_error_text"></div>
      </p>
      <button class="btn btn-primary btn-ok" v-if="changableBuyType" @click="toChangeBuyType">OK</button>
      <button class="btn modal-close" @click="hideSearchErrorModal">X</button>
      <button class="btn btn-primary m-auto d-flex justify-content-center" style="min-width: 70px;" v-if="!changableBuyType" @click="hideSearchErrorModal">OK</button>
    </div>
  </auction-modal>
  <auction-modal v-if="show_first_player_confirm_value !== -1">
    <div class="error-modal fpc-modal">
      <div>
        <p>
          {{$t('messages.search_confirm.desc')}}
        </p>
      </div>
      <div class="m-auto">
        <button class="btn yes" @click="searchPlayer">
          {{$t('messages.search_confirm.yes')}}
        </button>

        <button class="btn no" @click="show_first_player_confirm_value=-1">
          {{$t('messages.search_confirm.no')}}
        </button>
      </div>
    </div>
  </auction-modal>

  <auction-modal v-if="IsPreventTransferInGoldMode">
    <div class="text-center error-modal s-modal">
      <div v-html="t('messages.all_gold_players.desc',{x:open_transfers_in_gold_mode - bought_transfers_in_gold_mode})"></div>
    </div>
  </auction-modal>

  <auth-verification v-if="user.has_unconfirmed_invoice"/>
</template>

<script>
import TitleHeaderFootball from "../../../../components/blocks/TitleHeaderFootball";
import AuctionHeader from "../../../../components/auctionTrade/auctionHeader";
import {useUserStore} from "../../../../stores/userStore";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {api} from "../../../../composables/api";
import {useTimer} from "vue-timer-hook";
import AuctionPlayerSearchSwiper from "../../../../components/auctionTrade/auctionPlayerSearchSwiper";
import AuctionModal from "../../../../components/auctionTrade/auctionModal";
import AuctionFoundedPlayersModal from "../../../../components/auctionTrade/auctionFoundedPlayersModal";
import {getLocaleRoutePath, t} from "../../../../plugins/i18n";
import AuctionPayHistory from "../../../../components/auctionTrade/auctionPayHistory";
import AuctionnoCoinsPopup from "../../../../components/auctionTrade/auctionnoCoinsPopup";
import AuctionBoughtReport from "../../../../components/auctionTrade/auctionBoughtReport";
import AuctionTimer from "../../../../components/auctionTrade/auctionTimer";
import AuthVerification from "../../../../components/embeded/AuthVerification";
export default {
  name: "auction",
  components: {
    AuthVerification,
    AuctionTimer,
    AuctionBoughtReport,
    AuctionnoCoinsPopup,
    AuctionPayHistory,
    AuctionFoundedPlayersModal, AuctionModal, AuctionPlayerSearchSwiper, AuctionHeader, TitleHeaderFootball},
  setup(){
    definePageMeta({
      middleware: 'auth'
    })
    const user = useUserStore();
    const loading = ref(true)
    const packets = ref([])
    const playerSwiper = ref(null);
    const packet = ref({
      avg_price:0,
      start_price:0,
      end_price:0,
    })
    const buy_type = ref(null)
    const can_buy_in_gold_mode = ref(false)
    const can_buy_in_special_mode = ref(false)
    const need_confirm_search = ref(true)
    const show_search_modal = ref(false)
    const show_search_modal_2 = ref(false)
    const show_error_modal = ref(false)
    const show_founded_players_modal = ref(false)
    const search_error_text = ref()
    const show_first_player_confirm = ref(false);
    const show_first_player_confirm_value = ref(-1);
    const founded_players = ref();
    const founded_transfer_id = ref(0)
    let finish_all_transfers_timer = ref({})
    const finish_all_transfers_timestamp = ref(1);
    const pending_transfers_price_sum = ref(0);
    const bought_transfers_price_sum = ref(0);
    const show_auc_blocked_modal = ref(false);
    const showHistory = ref(false);
    const changableBuyType = ref(false);
    const show_buy_coins_modal = ref(false);
    const open_transfers_in_gold_mode = ref(0);
    const bought_transfers_in_gold_mode = ref(0);
    const open_transfers_in_gold_mode_modal_flag = ref(0);
    const show_special_buy_error = ref(false);
    const isPhone = ref(false);
    const show_order_finished_modal = ref(false);
    const show_order_finished_modal_number = ref(1);
    const excess_limit = ref({
      status:false,
      timestamp:0
    });
    const httpConInterval = ref(null);
    const route = useRoute();
    const router = useRouter();
    if(user.coins === 0){
      show_buy_coins_modal.value = true;
    }
    const getAuctionInfo = (ch_type = true) => {
      api.get('player_auction/info').then(res => {
        need_confirm_search.value = res.data.need_confirm_search
        can_buy_in_gold_mode.value = res.data.can_buy_in_gold_mode
        can_buy_in_special_mode.value = res.data.can_buy_in_special_mode
        pending_transfers_price_sum.value = res.data.pending_transfers_price_sum;
        bought_transfers_price_sum.value = parseInt(res.data.bought_transfers_price_sum);//parseInt();
        show_first_player_confirm.value = (res.data.need_confirm_search === 1);
        open_transfers_in_gold_mode.value = res.data.open_transfers_in_gold_mode;
        bought_transfers_in_gold_mode.value = res.data.bought_transfers_in_gold_mode;
        excess_limit.value.status = res.data.excess_limit;
        excess_limit.value.timestamp = res.data.limit_reset_timestamp;
        if(isGoldModePendingReached.value ){
          open_transfers_in_gold_mode_modal_flag.value = true;

          if(route.params.view === 'panel') {
            router.push({params: {view: 'index'}})
            return
          }
        }else{
          open_transfers_in_gold_mode_modal_flag.value = false;
        }
        if (ch_type && res.data.buy_type) {
          changeBuyType(res.data.buy_type, false)
          return
        }

        loading.value = false
      })
    }
    const toChangeBuyType = () => {
      loading.value = true;
      show_error_modal.value = false;
      api.get('player_auction/info').then(res => {
        need_confirm_search.value = res.data.need_confirm_search
        can_buy_in_gold_mode.value = res.data.can_buy_in_gold_mode
        can_buy_in_special_mode.value = res.data.can_buy_in_special_mode
        open_transfers_in_gold_mode.value = res.data.open_transfers_in_gold_mode;
        buy_type.value = null
        loading.value = false
      })
    }
    const changeBuyType = (type, change_on_server = true) => {
      if (type==='special' && open_transfers_in_gold_mode.value) {
        show_special_buy_error.value = true;
        return
      }
      if(isGoldModePendingReached.value){
        if(type !== 'gold'){
        }
        else{
          open_transfers_in_gold_mode_modal_flag.value = true;
          router.push({params: {view: 'index'}})
        }
      }
      else {
        if(route.params.view === 'index'){
          router.push({params: {view: 'panel'}})
          loading.value = true
        }
        //loading.value = true
        buy_type.value = type
        getPackets(false)
        if (change_on_server) {
          api.post(`player_auction/change_buy_type/${buy_type.value}`)
        }
      }
    }
    const getPackets = (loader=true) => {
      if(loader) {
        loading.value = true
      }
      api.get(`player_auction/get_packets/${buy_type.value}`).then(res => {
        packets.value = res.data.map(packet => {
          if (packet.transfer) {
            packet.transfer.wait_timer = useTimer(packet.transfer.buy_at_timestamp * 1000);
            if (packet.transfer.buy_at_timestamp > finish_all_transfers_timestamp.value) {
              finish_all_transfers_timestamp.value = packet.transfer.buy_at_timestamp
            }
          }
          return packet
        })
        if(packets.value.length === 0){
          show_error_modal.value = true;
          search_error_text.value = t('messages.pa_no_players_available');
          changableBuyType.value = true;
        }else {
          changableBuyType.value = false;
          packet.value = packets.value[0]
          finish_all_transfers_timer.value = useTimer(finish_all_transfers_timestamp.value * 1000)
          loading.value = false;
        }

      })
    }
    const initSwiper = (s) => {
      playerSwiper.value = s;
    }
    const onPlayerSelected = (s) => {
      packet.value = s;
    }

    const hideSearchErrorModal = () => {
      search_error_text.value = ''
      show_error_modal.value = false
      show_founded_players_modal.value=false;
    }
    const searchPlayer = () => {
      if(show_first_player_confirm.value && show_first_player_confirm_value.value === -1){
        show_first_player_confirm_value.value = 1;
        return;
      }
      show_first_player_confirm_value.value = -1;
      api.post('player_auction/set_search', {
        body_params: {
          packet_id: packet.value.id,
          start_price: packet.value.start_price,
          end_price: packet.value.end_price,
        }
      }).then(res => {
        show_search_modal.value = true
        show_search_modal_2.value = true;
        setTimeout(() => {
          if (show_search_modal.value) {
            showErrorModal(t('messages.api_search_no_players.desc'))
            clearInterval(httpConInterval.value);
            httpConInterval.value = null;
          }
        }, 90 * 1000)
        if(!isSocketConnected()){
          console.log("switch wss to http");
          httpConInterval.value = setInterval(()=>{
            httpLiveUpdate(res.data.id);
          },5000);
          httpLiveUpdate(res.data.id);
        }
      }).catch(e => {
        showErrorModal(e.description)
      })
    }
    const httpLiveUpdate = (transfer_id)=>{
      api.get(`player_auction/get_transfer/${transfer_id}`).then((tr_res)=>{
        if(tr_res.data.status === 'found'){
          clearInterval(httpConInterval.value);
          founded_transfer_id.value = tr_res.data.id;
          handleFoundedPlayers(tr_res.data.founded_players)
        }
      })
    }
    const buyPlayer = (player_key) => {
      const id = founded_transfer_id.value;
      api.post(`player_auction/buy/${id}/player_key/${player_key}`).then(res => {
        handleTransferStatus(res.data);
        getAuctionInfo();
      }).catch(e => {
        showErrorModal(e.description)
      })
      show_first_player_confirm_value.value = -1;
      closeFoundedPlayersModal()
    }
    const closeFoundedPlayersModal = () => {
      show_founded_players_modal.value = false
      founded_players.value = [];
      if(show_first_player_confirm_value.value === -1){
        founded_transfer_id.value = 0
      }
    }
    const showErrorModal = (msg) => {
      show_search_modal.value = false
      search_error_text.value = msg
      show_error_modal.value = true
    }
    const getSelectedPlayer = computed(()=>{
      return packet.value;
    })
    const handleTransferStatus = (data) => {
      console.log(data);
      if (data.status === 'found') {
        if(getSelectedPlayer.value.id === data.packet_id) {
          founded_transfer_id.value = data.id;
          handleFoundedPlayers(data.founded_players)
        }
        return
      }
      //'canceled',
      if(['bought'].includes(data.status)){
        show_order_finished_modal_number.value = data.success_box_number;
        if(user.coins === 0){
          show_order_finished_modal.value = true;
        }
        getAuctionInfo();
      }
      // if(['bought','canceled'].includes(data.status)){
      //   getPackets(true);
      // }
      let packet = packets.value.find(i => i.id === data.packet_id)
      if (!packet.transfer) {
        packet.transfer = {wait_timer: {}}
      }
      packet.transfer.status = data.status
      packet.transfer.buy_at_timestamp = data.buy_at_timestamp
      if (packet.transfer.status === 'wait') {
        packet.transfer.wait_timer = useTimer(packet.transfer.buy_at_timestamp * 1000);
        if (packet.transfer.buy_at_timestamp > finish_all_transfers_timestamp.value) {
          finish_all_transfers_timestamp.value = packet.transfer.buy_at_timestamp
        }
        finish_all_transfers_timer.value = useTimer(finish_all_transfers_timestamp.value * 1000)
      }
    }
    const handleFoundedPlayers = (players) => {
      if (!players.length) {
        showErrorModal(t('messages.api_search_no_players.desc'))
        return
      }
      founded_players.value = players.map(i => {
        i.expire_timer = useTimer(i.availabilityTime * 1000);
        return i
      })
      show_search_modal.value = false
      show_search_modal_2.value = true;
      show_founded_players_modal.value = true
    }
    const showHistorySection = () =>{
      show_auc_blocked_modal.value = false;
      showHistory.value = true;
      loading.value = false;
    }
    const getROrQ = computed(()=>{
      if(packet.value.id){
        if(packet.value.revision === null || packet.value.revision === undefined || packet.value.revision === ""){
          return packet.value.quality;
        }else{
          return packet.value.revision;
        }
      }else{
        return '';
      }
    });
    const isModalShown = computed(()=>{
      return show_search_modal.value || show_error_modal.value || show_founded_players_modal.value || show_auc_blocked_modal.value;
    });

    const init = (()=>{
      showHistory.value = false;
      if(user.auc_blocked_at !== null){
        show_auc_blocked_modal.value = true;
      }else {
        getAuctionInfo();
        if (process.client) {
          window.Echo.channel('auctions_' + user.id).listen('TransferStatus', ({data}) => {
            handleTransferStatus(data)
          })
        }
      }
    });

    if(route.params.view === 'index'){
      if (process.client) {
        window.Echo.channel('auctions_' + user.id).listen('TransferStatus', ({data}) => {
          handleTransferStatus(data)
        })

      }
      toChangeBuyType();
      getAuctionInfo(false);
    }
    else if(route.params.view === 'history'){
      showHistorySection();
    }
    else {
      init();
    }
    const isGoldModePendingReached = computed(()=>{
      return open_transfers_in_gold_mode.value === 5;
    })
    const IsPreventTransferInGoldMode = computed(()=>{//
      return isGoldModePendingReached && open_transfers_in_gold_mode_modal_flag.value;
    });

    const closeOpenTransferInGoldModeErr = ()=>{
      open_transfers_in_gold_mode_modal_flag.value = false;
    }
    onMounted(()=>{
      isPhone.value = window.innerWidth < 768;

    })
    const onBoughtModalEvt = (view)=>{
      show_order_finished_modal.value = false;
      if(view === 'home') {
        return navigateTo(getLocaleRoutePath(''), {external: false})
      }
    }
    watch(()=>user.coins,(n)=>{
      if(n === 0){
        show_order_finished_modal.value = true;
      }
    })
    const isSocketConnected = ()=>{
      if(window.Echo.socketId() === undefined){
        return false;
      }else{
        return true;
      }
    }
    onUnmounted(()=>{
      if(httpConInterval.value !== null){
        clearInterval(httpConInterval.value);
      }
    })
    return {
      t,
      onBoughtModalEvt,
      isPhone,
      loading,
      user,
      packets,
      packet,
      buy_type,
      founded_players,
      can_buy_in_gold_mode,
      can_buy_in_special_mode,
      show_search_modal,
      show_error_modal,
      show_founded_players_modal,
      search_error_text,
      finish_all_transfers_timestamp,
      finish_all_transfers_timer,
      toChangeBuyType,
      changeBuyType,
      playerSwiper,
      initSwiper,
      onPlayerSelected,
      hideSearchErrorModal,
      searchPlayer,
      buyPlayer,
      bought_transfers_price_sum,
      pending_transfers_price_sum,
      closeFoundedPlayersModal,
      show_auc_blocked_modal,
      isModalShown,
      show_search_modal_2,
      show_first_player_confirm_value,
      showHistory,
      changableBuyType,
      getROrQ,
      show_buy_coins_modal,
      show_first_player_confirm,
      IsPreventTransferInGoldMode,
      open_transfers_in_gold_mode_modal_flag,
      closeOpenTransferInGoldModeErr,
      show_special_buy_error,
      open_transfers_in_gold_mode,
      bought_transfers_in_gold_mode,
      isGoldModePendingReached,
      show_order_finished_modal,
      show_order_finished_modal_number,
      excess_limit
    };
  }
}
</script>

<style scoped>
@import "@/public/css/components/auction_trade/auction_index.css";

</style>
<style>
.d-view{

}
.r-view{
  display: none;
}
@media(max-width: 800px) {
  .d-view {
    display: none !important;
  }

  .r-view {
    display: block;
  }
}
</style>
<style>
.red-text p{
  margin: 0 !important;
}
.orderFinished .not_bought_info_desktop{
  background-color: gray;
}
</style>