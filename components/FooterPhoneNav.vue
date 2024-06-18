<template>
  <ul class="phone-nav">
    <li :class="{active : $route.name === 'index' || $route.name === 'lang'}">
      <nuxt-link no-prefetch :to="urlwithLocal('')" class="sticky-a" @click="unLoginedHighlight('')">
        <nuxt-img loading="lazy" v-if="$route.name === 'index' || $route.name === 'lang'" src="/svg/nav_home_white.svg" width="18" height="17" alt="footer nav home icon white" />
        <nuxt-img loading="lazy" v-else  src="/svg/nav_home.svg" alt="footer nav home icon" width="18" height="17"  />
        <span>{{ $t('home.navigation.mobile.home') }}</span>
      </nuxt-link>
    </li>
    <li :class="{active : $route.name === 'lang-fc-coins-fc-24-coins'}">
      <nuxt-link no-prefetch :to="urlwithLocal('fc-coins/fc-24-coins')" class="sticky-a" @click="unLoginedHighlight('')">
        <nuxt-img alt="footer fifa coin" loading="lazy" v-if="$route.name !== 'lang-fc-coins-fc-24-coins'" src="/svg/nav_coin.svg" width="17" height="20"/>
        <nuxt-img alt="footer fifa coin white" loading="lazy" v-else src="/svg/nav_coin_white.svg" width="17" height="20"/>
        <span>{{ $t('home.navigation.mobile.buy_coins') }}</span>
      </nuxt-link>
    </li>
    <li :class="{active : $route.name === 'lang-auction-view' || unLoginedClicked === 'auction'}">
      <nuxt-link no-prefetch class="sticky-a" v-if="userStore.isUserLogined"  :to="urlwithLocal('auction/index')">
        <nuxt-img alt="footer icon player black" loading="lazy" v-if="$route.name !== 'lang-auction-view'" src="/svg/icon-player-black.svg" width="17" height="17"/>
        <nuxt-img alt="footer icon player white" loading="lazy" v-else src="/svg/icon-player-white.svg" width="17" height="17"/>
        <span>{{ $t('home.navigation.mobile.auction') }}</span>
      </nuxt-link>
      <nuxt-link no-prefetch class="sticky-a" v-else :to="urlwithLocal('login')" @click="unLoginedHighlight('auction')">
        <nuxt-img alt="footer icon player black" loading="lazy" src="/svg/icon-player-black.svg"  width="17" height="17" />
        <span>{{ $t('home.navigation.mobile.auction') }}</span>
      </nuxt-link>
    </li>
    <li :class="{active : $route.name === 'lang-comfort' || unLoginedClicked === 'comfort'}">
      <nuxt-link no-prefetch :to="urlwithLocal('comfort')" class="sticky-a" v-if="userStore.isUserLogined" >
        <nuxt-img alt="footer icon comfort black" loading="lazy" src="/svg/icon-comfort-trade-white.svg" v-if="$route.name === 'lang-comfort'" width="15" height="17"/>
        <nuxt-img alt="footer icon comfort black" loading="lazy" src="/svg/icon-comfort-trade-black.svg" v-else width="15" height="17"/>
        <span>{{ $t('home.navigation.mobile.comfort') }}</span>
      </nuxt-link>
      <nuxt-link no-prefetch class="sticky-a" v-else :to="urlwithLocal('login')" @click="unLoginedHighlight('comfort')">
        <nuxt-img alt="footer icon comport trade black" loading="lazy" src="/svg/icon-comfort-trade-black.svg" width="15" height="17"/>
        <span>{{ $t('home.navigation.mobile.comfort') }}</span>
      </nuxt-link>
    </li>
    <li>
      <div class="sticky-a" @click="onSupportModalShow=true">
        <nuxt-img alt="footer country icons" loading="lazy" src="/svg/nav_countries.svg"  width="25" height="18"/>
        <span>{{ $t('home.navigation.mobile.support') }}</span>
      </div>
    </li>
  </ul>
  <support-modal v-model:show="onSupportModalShow" @close="onCloseModal"/>
</template>

<script>
import {useCommonStore} from "../stores/commonStore";
import {useUserStore} from "../stores/userStore";
import useUtils, {urlwithLocal} from "../composables/useUtils";
import {getLocaleRoutePath} from '~/plugins/i18n'
import SupportModal from "./embeded/supportModal";
import {ref} from "vue";
export default {
  name: "FooterPhoneNav",
  components: {SupportModal},
  setup(){
    const userStore = useUserStore();
    const {getWGSupportMsg,urlwithLocal} = useUtils();
    const unLoginedClicked = ref('');
    const unLoginedHighlight = (inp)=>{
      unLoginedClicked.value = inp;
    }
    return {userStore,getWGSupportMsg,urlwithLocal,unLoginedHighlight,unLoginedClicked};
  },
  data: () => {
    return {
      getLocaleRoutePath,
      commonStore:useCommonStore(),
      onSupportModalShow:false
    };
  },
  methods:{
    onCloseModal(){
      this.onSupportModalShow = false;
    }
  }
}
</script>

<style scoped>
@import "@/public/css/components/footer.css";
.useful-links div a {
  color:white;
  text-decoration: none;
}
.useful-links div a:hover{
  color: gray;
}
.sticky-a{
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}
li.active .sticky-a{
  color:white !important;;
}
</style>