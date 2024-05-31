<template>

  <div class="independent-table-container">
    <div class="mobile-menu" v-if="isPhone">
      <select aria-label="Select Platform" :disabled="!platform_changable" class="select-tbl" v-model="platform" @change="getCoinPackets(platform.name, buy_type.name)">
        <option v-for="platform in platforms" :value="platform">{{ platform.title}}</option>
      </select>
      <select aria-label="Select Buy Type" class="select-tbl" v-model="buy_type" @change="getCoinPackets(platform.name, buy_type.name)">
        <option v-for="buy_type in buy_types" :value="buy_type">{{ buy_type.title }}</option>
      </select>
    </div>
    <div>
      <div class="loadingdt" v-if="loading">
        <img src="/loading_btn.svg"/>
      </div>
      <table class="tableArea" cellspacing="0" cellpadding="0">
        <thead>
        <tr>
          <th v-if="!isPhone">
            <select :disabled="!platform_changable" class="select-tbl" v-model="platform" @change="getCoinPackets(platform.name, buy_type.name)">
              <option v-for="platform in platforms" :value="platform">{{ platform.title}}</option>
            </select>
          </th>
          <th v-else>
            Category<br />Method
          </th>
          <th v-if="!isPhone">
            <select class="select-tbl" v-model="buy_type" @change="getCoinPackets(platform.name, buy_type.name)">
              <option v-for="buy_type in buy_types" :value="buy_type">{{ buy_type.title }}</option>
            </select>
          </th>

          <th>{{ $t('fifa.categories.table.article') }}</th>
          <th>{{ $t('fifa.categories.table.coins') }}</th>
          <th>{{ $t('fifa.categories.table.price') }}</th>
          <th>{{ $t('fifa.categories.table.reviews') }}</th>
          <th></th>
        </tr>
        </thead>
        <tbody v-if="!loading">
          <tr v-for="(item, index) in paginateCoinPackets" :key="item.id">
            <td v-if="!isPhone">
              <div>
                <nuxt-img loading="lazy" :src="platform.img_icon" alt="platform icon" class="tbl-ico" :class="platform.title" width="13" height="15"/>
                <div class="column desktop-only" v-if='platform.title === "PS4"'><span>PS4</span><span>PS5</span></div>
                <div class="column desktop-only" v-else>
                  <span>
                    {{platform.title}}
                  </span>
                </div>
              </div>
            </td>
            <td v-if="!isPhone">
              <div>
                <nuxt-img loading="lazy" :src="buy_type.icon" alt="buy type icon" class="tbl-ico" width="13" height="15"/>
                <span>{{ buy_type.title }}</span>
              </div>
            </td>
            <td v-if="isPhone">
              <div>
                <nuxt-img loading="lazy" :src="platform.img_icon" alt="platform icon" class="tbl-ico" :class="platform.title" width="13" height="15"/>
                <nuxt-img loading="lazy" :src="buy_type.icon" alt="buy type icon" class="tbl-ico" width="13" height="15"/>
              </div>
            </td>
            <td v-if="isPhone">FIFA 24 Coins</td>
            <td v-else>{{ item.name }}</td>
            <td>
              <div>
                <nuxt-img loading="lazy" src="/svg/icon_awesome-coins.svg" alt="coins icon" class="desktop-only" width="15" height="15"/>
                <div>{{ item.coins / 1000 }}K</div>
              </div>
            </td>
            <td>
              <div class="column">
                <span>{{ item.price_with_bonus+' ' + item.currency_symbol }}</span>
                <span>{{ item.price+' ' + item.currency_symbol }}</span>
              </div>
            </td>
            <td class="stars desktop" v-if="!isPhone">
              <img v-for="r in Math.ceil(item.rating)" src="/svg/icon-feather-star-gold.svg" alt="rating icon" height="16" width="17">
              <img v-for="r2 in Math.max(0, 5-Math.ceil(item.rating))" src="/svg/icon-feather-star.svg" alt="rating icon uncomplete" height="16" width="17">
            </td>
            <td v-else>
              <nuxt-img loading="lazy" src="/svg/icon-feather-star-gold.svg" alt="phone rating icon" height="16" width="17"/><span class="psdt">{{Math.ceil(item.rating)}} / 5</span>
            </td>
            <td>
              <div class="column buy-btn" @click="buyButtonClicked(item.id)">
                <span>Buy</span>
                <nuxt-img loading="lazy" src="/svg/ionic-ios-arrow-right-blue.svg" alt="buy arrow icon" height="14" width="14" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination" v-if="pages_total > 0 && !loading">
        <button @click="switchPage('-')" :disabled="page === 1" aria-label="Prev DataTable Page" title="Prev">
          <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-top: -1px;    margin-left: -1px;">
            <path
                d="M7.092 0.883089C6.91887 0.712096 6.68533 0.616211 6.442 0.616211C6.19866 0.616211 5.96513 0.712096 5.792 0.883089L1.235 5.45209C1.06781 5.61945 0.971522 5.84478 0.966121 6.08128C0.960721 6.31778 1.04663 6.54727 1.206 6.72209L5.693 11.2221C5.77702 11.3132 5.87859 11.3865 5.99162 11.4374C6.10465 11.4883 6.2268 11.5158 6.35074 11.5184C6.47469 11.5209 6.59786 11.4983 6.71286 11.4521C6.82787 11.4058 6.93234 11.3367 7.02 11.2491C7.10765 11.1614 7.17669 11.057 7.22296 10.942C7.26923 10.8269 7.29179 10.7038 7.28927 10.5798C7.28674 10.4559 7.2592 10.3337 7.20829 10.2207C7.15738 10.1077 7.08415 10.0061 6.993 9.92209L3.179 6.05009L7.089 2.17809C7.17479 2.09357 7.24297 1.99289 7.2896 1.88185C7.33624 1.77082 7.36039 1.65164 7.36067 1.53121C7.36095 1.41079 7.33735 1.2915 7.29123 1.18025C7.24511 1.069 7.1774 0.968001 7.092 0.883089Z"
                fill="currentColor"/>
          </svg>
        </button>

        <button v-for="item in pagination_pages" @click="changePage(item)" :class="{ active: page === item}">{{ item }}</button>

        <button @click="switchPage('+')" :disabled="page === pages_total" aria-label="Next DataTable Page" title="Next">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-top: -1px;">
            <path
                d="M0.769694 0.883089C0.942823 0.712096 1.17636 0.616211 1.41969 0.616211C1.66303 0.616211 1.89656 0.712096 2.06969 0.883089L6.62369 5.45209C6.79088 5.61945 6.88717 5.84478 6.89257 6.08128C6.89797 6.31778 6.81207 6.54727 6.65269 6.72209L2.16569 11.2221C2.08168 11.3132 1.9801 11.3865 1.86707 11.4374C1.75404 11.4883 1.63189 11.5158 1.50795 11.5184C1.38401 11.5209 1.26084 11.4983 1.14583 11.4521C1.03082 11.4058 0.926355 11.3367 0.838698 11.2491C0.751041 11.1614 0.682003 11.057 0.63573 10.942C0.589458 10.8269 0.566906 10.7038 0.569427 10.5798C0.571948 10.4559 0.599492 10.3337 0.650404 10.2207C0.701315 10.1077 0.774544 10.0061 0.865694 9.92209L4.68369 6.05309L0.773694 2.18109C0.687383 2.09659 0.618737 1.99577 0.571751 1.88449C0.524765 1.77322 0.500377 1.65371 0.500004 1.53293C0.499632 1.41214 0.523284 1.29248 0.569583 1.18092C0.615883 1.06936 0.683905 0.968119 0.769694 0.883089Z"
                fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "./blocks/TitleHeaderFootball";
import {ref,onMounted} from "vue";
import {api} from "../composables/api";
import {getLocale, getLocaleRoutePath} from "../plugins/i18n";
import {useCommonStore} from "../stores/commonStore";
export default {
  props: {
    platform_name: {
      type: String,
      default: 'ps4'
    },
    platform_changable: {
      type: Boolean,
      default: true
    },
    allow_buy: {
      type: Boolean,
      default: true
    },
  },
  name: "IndependentCoinPriceTable",
  components: {TitleHeaderFootball},
  setup(props){
    const isPhone = ref(false);
    const loading = ref(false);
    const commnStore = useCommonStore();
    const platforms = reactive([
      {name:'ps4', title:'PS4', img_icon:'/svg/ps_icon_white.svg', id:null, enabled:0, enabled_auction:0, enabled_auction_buy_coins:0, enabled_comfort:0, enabled_comfort_buy_coins:0,},
      {name:'xbox', title:'XBOX', img_icon:'/svg/xbox-white.svg', id:null, enabled:0, enabled_auction:0, enabled_auction_buy_coins:0, enabled_comfort:0, enabled_comfort_buy_coins:0,},
      {name:'ps4', title:'STADIA', img_icon:'/svg/stadia-white.svg', id:null, enabled:0, enabled_auction:0, enabled_auction_buy_coins:0, enabled_comfort:0, enabled_comfort_buy_coins:0,},
      {name:'pc', title:'PC', img_icon:'/svg/pc-white.svg', id:null, enabled:0, enabled_auction:0, enabled_auction_buy_coins:0, enabled_comfort:0, enabled_comfort_buy_coins:0,},
    ])
    var platform = ref({});
    const buy_types = reactive([
      {name: 'comfort', 'title': 'Comfort Trade', icon: '/svg/comfort_trade_white.svg'},
      {name: 'auction', 'title': 'Player Auction', icon: '/svg/icon-player.svg'}
    ]);
    var coin_packets = ref([]);
    var paginateCoinPackets = ref([]);
    const buy_type = ref(null);

    const pagination_pages = ref([])
    const pages_total = ref(0)
    const page = ref(1);
    const take = 10;
    //-----------------
    const getPlatforms = () => {
      api.get('platforms').then(res => {
        platforms.map(i => {
          let data = res.data.find(j => {return j.name === i.name || (j.name === 'ps4' && i.title === 'STADIA')})
          if (data) {
            i.id = data.id
            i.enabled = data.enabled
            i.enabled_auction = data.enabled_auction
            i.enabled_auction_buy_coins = data.enabled_auction_buy_coins
            i.enabled_comfort = data.enabled_comfort
            i.enabled_comfort_buy_coins = data.enabled_comfort_buy_coins
          }
        })
      })
    }
    const getCoinPackets = (platform_name, type) => {
      loading.value = true;
      api.get('buy_coins/get_coin_packets', {query_params:{platform_name, type}}).then(res => {
        coin_packets.value = res.data;
        pages_total.value = Math.round(coin_packets.value.length / take);
        pagination_pages.value = [];
        makePaginationPagesArray();
        if(paginateCoinPackets.value.length === 0){
            changePage(1);
        }
        loading.value = false;
      })
    }
    //---------------------


    const makePaginationPagesArray = () => {
      if (!pagination_pages.value.includes(page.value)) {
        let pagesTemp = []
        for (let i = page.value; i <= page.value + 2; i++) {
          if (i <= pages_total.value) {
            pagesTemp.push(i)
          }
        }
        pagination_pages.value = pagesTemp;
      } else if (pagination_pages.value.indexOf(page.value) === 2) {
        let pagesTemp = []
        for (let i = (page.value === pages_total.value ? page.value - 2 : page.value - 1); i <= page.value + 1; i++) {
          if (i <= pages_total.value) {
            pagesTemp.push(i)
          }
        }
        pagination_pages.value = pagesTemp;
      } else if (pagination_pages.value.indexOf(page.value) === 0 && page.value !== 1) {
        let pagesTemp = []
        for (let i = page.value - 1; i <= page.value + 1; i++) {
          if (i <= pages_total.value) {
            pagesTemp.push(i)
          }
        }
        pagination_pages.value = pagesTemp;
      }
    }
    const changePage = (pageNum) => {

     // pageNum = pageNum - 1;
      page.value = pageNum;
      paginateCoinPackets.value = coin_packets.value.slice((pageNum-1) * take, ((pageNum-1) * take) + take);
      makePaginationPagesArray();
    }
    const switchPage = (np_num) => {
      if(np_num === '+'){
        changePage(page.value + 1);
      }else{
        changePage(page.value - 1);
      }
    }
    //---------------------
    const buyButtonClicked = (product_id) => {
      if(props.allow_buy) {
        var lang =  getLocale();
        const router = useRouter();
        router.push({
          path: lang === 'en' ? '/fc-coins/fc-24-coins' : "/" + lang + "/fc-coins/fc-24-coins",
          query: {
            product_id,
          },
        });
      }
    }
    onMounted(()=>{
      isPhone.value = window.innerWidth < 800;
      platform.value = platforms.find(i => i.name === props.platform_name) || platforms[0]
      buy_type.value = buy_types[0]
      getPlatforms()
      getCoinPackets(platform.value.name, buy_type.value.name);

    })
    return {
      isPhone,
      platforms,
      platform,
      buy_type,
      buy_types,
      getCoinPackets,
      coin_packets,
      take,
      page,
      pages_total,
      pagination_pages,
      changePage,
      switchPage,
      paginateCoinPackets,
      loading,
      buyButtonClicked
    }
  }
}
</script>

<style scoped>
@import "@/public/css/components/itable.css";
</style>