<template>
  <div style="padding:40px; display: flex;">
    <div v-if="loading" style="margin: auto;font-size: 40px;"><strong>Loading</strong></div>
    <div v-else style="margin: auto;text-align: center;display: flex;width: 100%;">
      <div v-if="!buy_type" style="margin: auto;">
        <p>How much coins do you have on your fifa account right now?</p>
        <button @click="changeBuyType('gold')" :disabled="!can_buy_in_gold_mode" style="margin: 0 20px">less than 60,000</button>
        <button @click="changeBuyType('special')" :disabled="!can_buy_in_special_mode" style="margin: 0 20px">more than 60,000</button>
      </div>
      <template v-else >
        <div style="width: 30%;">
          <button @click="toChangeBuyType">Change buy type</button>
          <div v-if="finish_all_transfers_timer.isExpired === false && (finish_all_transfers_timer.hours || finish_all_transfers_timer.minutes || finish_all_transfers_timer.seconds)">
            {{ $t('auction.timer.finish_all') }} <span>{{finish_all_transfers_timer.hours}}</span>:<span>{{finish_all_transfers_timer.minutes}}</span>:<span>{{finish_all_transfers_timer.seconds}}</span>
          </div>
          <div>
            <img :src="packet.img" :alt="packet.player_name" style="width: 200px;">
            <div>
              <a :href="packet.futbin_ink" target="_blank">{{ $t('auction.player_futbin_link') }}</a>
              <div v-if="packet.transfer">
                <span v-if="['wait', 'pending'].includes(packet.transfer.status)">{{ $t('auction.player_pending_status') }}</span>
                <span v-else-if="['bought'].includes(packet.transfer.status)">{{ $t('auction.player_bought_status') }}</span>
                <span v-else-if="['canceled'].includes(packet.transfer.status)">{{ $t('auction.player_cancelled_status') }}</span>

                <div v-if="packet.transfer.wait_timer.isExpired === false">
                  <span>{{packet.transfer.wait_timer.hours}}</span>:<span>{{packet.transfer.wait_timer.minutes}}</span>:<span>{{packet.transfer.wait_timer.seconds}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 70%;">
          <ul style="width: 100%;display: flex;overflow-x: auto;">
            <li v-for="item in packets" :class="{packet_active: item.id === packet.id}" style="cursor: pointer; list-style-type: none;text-align: center" @click="selectPacket(item)">
              <img :src="item.img" :alt="item.player_name" style="width: 150px;">
              <div>{{ item.price.format(0, 3, '.') }}</div>

              <div v-if="item.transfer">
                <span v-if="['wait', 'pending'].includes(item.transfer.status)">{{ $t('auction.player_pending_status') }}</span>
                <span v-else-if="['bought'].includes(item.transfer.status)">{{ $t('auction.player_bought_status') }}</span>
                <span v-else-if="['canceled'].includes(item.transfer.status)">{{ $t('auction.player_cancelled_status') }}</span>

                <div v-if="item.transfer.wait_timer.isExpired === false">
                  <span>{{item.transfer.wait_timer.hours}}</span>:<span>{{item.transfer.wait_timer.minutes}}</span>:<span>{{item.transfer.wait_timer.seconds}}</span>

                </div>
              </div>
            </li>
          </ul>

          <div style="margin-top: 30px;">
            <div style="margin-bottom: 30px;">
              <strong>1. Buy The Player</strong>
              <div>Player - {{ packet.player_name }}</div>
              <div>Max Buy Price - {{ packet.avg_price.format(0, 3, '.') }}</div>
            </div>
            <div style="margin-bottom: 30px;">
              <strong>2. Put The Player On The Transfermarket</strong>
              <div>Starting Price - {{ packet.start_price.format(0, 3, '.') }}</div>
              <div>Buy Now Price - {{ packet.end_price.format(0, 3, '.') }}</div>
              <div>Duration - {{ packet.duration }} Hours</div>
            </div>
            <div>
              <strong>3. Serach For Player</strong>
            </div>
            <button @click="searchPlayer">Search</button>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!--  modals-->
  <Teleport to="#modal_place">
    <div class="containermodal" v-if="show_search_modal">
      <div class="modal" role="dialog">
        <div class="modal-dialog modal-xs">
          <div class="modal-content">
            <strong>{{ $t('messages.spinner.search') }}</strong>
            <strong>{{ $t('messages.spinner.before') }} {{ $t('messages.spinner.time') }}</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="containermodal" v-if="show_error_modal">
      <div class="modal" role="dialog">
        <div class="modal-dialog modal-xs">
          <div class="modal-content">
            <div v-html="search_error_text"></div>
            <button @click="hideSearchErrorModal">X</button>
          </div>
        </div>
      </div>
    </div>

    <div class="containermodal" v-if="show_founded_players_modal">
      <div class="modal" role="dialog">
        <div class="modal-dialog modal-xs">
          <div class="modal-content">
            <ul style="display: flex;width: 100%;overflow-x: auto;list-style-type: none;padding: 20px;">
              <li v-for="(item, key) in founded_players">
                <img :src="packet.img" alt="">
                <strong>{{ packet.player_name }}</strong>
                <p>{{ $t('account.buy.start_price')}}: <span>{{ item.start_price }}</span></p>
                <p>{{ $t('account.buy.sofort_price')}}: <span>{{ item.end_price }}</span></p>
                <p>{{ $t('account.buy.look_exp')}}: <span>{{item.expire_timer.hours}}</span>:<span>{{item.expire_timer.minutes}}</span>:<span>{{item.expire_timer.seconds}}</span></p>
                <p>{{ $t('account.buy.chemistry_style')}}: <span>{{ item.chemistry_style }}</span></p>
                <p>{{ $t('account.buy.owners')}}: <span>{{ item.owners }}</span></p>
                <p>{{ $t('account.buy.contracts')}}: <span>{{ item.contracts }}</span></p>
                <button @click="buyPlayer(key)">{{ $t('account.buy.buy') }}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </Teleport>
</template>

<script>
import {api} from '~/composables/api'
import {ref} from "vue";
import {t} from "~/plugins/i18n";
import { useTimer } from 'vue-timer-hook';
export default {
  setup() {
    const route = useRoute();
    useHead(makeMeta(route.path,'Auction', 'Auction'))
    definePageMeta({
      // middleware: 'auth'
      middleware: [
        (to, from) => {
          return navigateTo('https://whatsgaming.net/auction/panel', { external: true })
        },
      ]
    })

    const user = useUserStore()
    const loading = ref(true)
    const packets = ref([])
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
    const show_error_modal = ref(false)
    const show_founded_players_modal = ref(false)
    const search_error_text = ref('')
    const founded_players = ref([])
    const founded_transfer_id = ref(0)
    let finish_all_transfers_timer = ref({})
    const finish_all_transfers_timestamp = ref(1)

    const getAuctionInfo = () => {
      api.get('player_auction/info').then(res => {
        need_confirm_search.value = res.data.need_confirm_search
        can_buy_in_gold_mode.value = res.data.can_buy_in_gold_mode
        can_buy_in_special_mode.value = res.data.can_buy_in_special_mode

        if (!(can_buy_in_gold_mode.value || can_buy_in_special_mode.value)) {
          loading.value = false
          return
        }

        if (res.data.buy_type) {
          changeBuyType(res.data.buy_type, false)
          return
        }
        loading.value = false
      })
    }
    const toChangeBuyType = () => {
      loading.value = true
      api.get('player_auction/info').then(res => {
        need_confirm_search.value = res.data.need_confirm_search
        can_buy_in_gold_mode.value = res.data.can_buy_in_gold_mode
        can_buy_in_special_mode.value = res.data.can_buy_in_special_mode
        buy_type.value = null
        loading.value = false
      })
    }
    const changeBuyType = (type, change_on_server = true) => {
      loading.value = true
      buy_type.value = type
      getPackets()
      if (change_on_server) {
        api.post(`player_auction/change_buy_type/${buy_type.value}`)
      }
    }
    const getPackets = () => {
      loading.value = true
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
        packet.value = packets.value[0]
        finish_all_transfers_timer.value = useTimer(finish_all_transfers_timestamp.value * 1000)
        loading.value = false
      })
    }
    const selectPacket = (item) => {
      packet.value = item
    }

    const showErrorModal = (msg) => {
      show_search_modal.value = false
      search_error_text.value = msg
      show_error_modal.value = true
    }
    const hideSearchErrorModal = () => {
      search_error_text.value = ''
      show_error_modal.value = false
    }
    const searchPlayer = () => {
      api.post('player_auction/set_search', {
        body_params: {
          packet_id: packet.value.id,
          start_price: packet.value.start_price,
          end_price: packet.value.end_price,
        }
      }).then(res => {
        show_search_modal.value = true
        setTimeout(() => {
          if (show_search_modal.value) {
            showErrorModal(t('messages.api_search_no_players.desc'))
          }
        }, 90 * 1000)
      }).catch(e => {
        showErrorModal(e.description)
      })
    }
    const buyPlayer = (player_key) => {
      const id = founded_transfer_id.value
      closeFoundedPlayersModal()
      api.post(`player_auction/buy/${id}/player_key/${player_key}/test`).then(res => {
        handleTransferStatus(res.data)
      }).catch(e => {
        showErrorModal(e.description)
      })
    }
    const closeFoundedPlayersModal = () => {
      show_founded_players_modal.value = false
      founded_players.value = []
      founded_transfer_id.value = 0
    }
    const handleTransferStatus = (data) => {
      if (data.status === 'found') {
        founded_transfer_id.value = data.id
        handleFoundedPlayers(data.founded_players)
        return
      }
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
      show_founded_players_modal.value = true
    }

    getAuctionInfo()



    if (process.client) {
      window.Echo.channel('auctions_' + user.id).listen('TransferStatus', ({data}) => {
        handleTransferStatus(data)
      })
    }


    return {
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
      selectPacket,
      searchPlayer,
      buyPlayer,
      hideSearchErrorModal,
    }
  },
}
</script>

<style scoped>
@import "@/public/css/pages/login.css";
.form__container {
  flex-direction: column;
}

.active {
  background-color: #00aaaa;
}
.modal {
  display: flex;
}
.modal-dialog {
  margin: auto;
  max-width: 600px;
}
.modal-content {
  padding: 50px;
}
.packet_active {
  border: 2px solid #00aaaa;
}

</style>