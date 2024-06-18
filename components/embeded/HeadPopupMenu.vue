<template>
  <transition name="fade" >
    <div style="padding: 10px;">
      <img
          v-if="!userInfoMenu"
          @click="userInfoMenu = true"
          src="/svg/icon-person.svg"
          alt="user icon"
          width="23" height="23"
      />
      <img
          alt="close user popup icon"
          v-else
          @click="userInfoMenu = false"
          src="/svg/cancel-circle.svg"
          width="20" height="20"
      />
    </div>
  </transition>
  <transition name="list" >
    <div v-if="userInfoMenu" class="userinfo-menu" id="user_nav_popup">
      <div>
        {{ $t('home.greeting') }} ! <b>{{ user.email }}</b>
      </div>
      <div style="margin-top: -10px;" v-if="user.isGuestUser">
        {{$t('auth.password')}} :  <b>{{ user.password_uncoded }}</b>
      </div>
      <div class="divider"></div>
      <div>
        <div class="acc-info-popup">
          <div>
            <p>{{ $t('account.your_balance') }}</p>
            <div class="balance-info">
              <img src="/images/account/coin.svg"/>
              <b v-if="user.coins === 0">0</b>
              <b v-else><nuxt-link style="color:white;" :to="getLocaleRoutePath('comfort')">{{ parseFloat(user.coins).toLocaleString() }}</nuxt-link> </b>
            </div>
          </div>
          <div>
            <p>{{ $t('account.discount.level_cur') }}</p>
            <div class="current-user-lv" @click="openAchivment">
              <nuxt-img loading="lazy" :src="'/images/account/medals/'+currentLv.icon" />
              <div>
                <div>
                  {{ currentLv.name === 'None' ? 'Basic' : currentLv.name }}
                </div>
                <div>
                  {{ currentLv.percent }} %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="userinfo-menu--item">
        <nuxt-img alt="shopping icon" loading="lazy" src="/svg/shopping-icon.svg" />
        <nuxt-link :to="getLocaleRoutePath('account/settings')">{{ $t('home.navigation.show_orders') }}</nuxt-link>
      </div>
      <div class="userinfo-menu--item">
        <nuxt-img alt="settings icon" loading="lazy" src="/svg/pencil.svg" />
        <nuxt-link :to="getLocaleRoutePath('account/settings')">{{ $t('home.navigation.edit_account') }}</nuxt-link>
      </div>
      <div class="userinfo-menu--item">
        <nuxt-img alt="settings icon" loading="lazy" src="/svg/key-icon.svg" />
        <nuxt-link :to="getLocaleRoutePath('account/settings')">{{ $t('home.navigation.change_password') }}</nuxt-link>
      </div>
<!--      <div class="userinfo-menu&#45;&#45;item">-->
<!--        <nuxt-img alt="discount icon" loading="lazy" src="/svg/discount.svg" />-->
<!--        <nuxt-link :to="getLocaleRoutePath('loyalty')">{{ $t('home.navigation.treuerabatt') }}</nuxt-link>-->
<!--      </div>-->
      <div class="userinfo-menu--item">
        <nuxt-img alt="voucher icon" loading="lazy" src="/svg/voucher.svg" style="cursor: pointer;"/>
        <span @click="openVoucherPopup = true;userInfoMenu=false;" style="cursor: pointer;">{{ $t('home.navigation.vouchers') }}</span>
<!--        <Voucher :open.sync="openVoucherPopup" @close="closeVoucher"></Voucher>-->

      </div>
      <div class="userinfo-menu--item">
        <nuxt-img alt="comfort trade icon" loading="lazy" src="/svg/icon-comfort-trade.svg" />
        <nuxt-link :to="getLocaleRoutePath('comfort')" >{{ $t('home.navigation.comfort_trade') }}</nuxt-link>
      </div>

      <div class="userinfo-menu--item">
        <nuxt-img alt="icon player icon" loading="lazy" src="/svg/icon-player.svg" />
<!--        <nuxt-link :to="getLocaleRoutePath('auction')" >{{ $t('home.navigation.player_auction') }}</nuxt-link>-->
        <nuxt-link :to="getLocaleRoutePath('auction/index')" >{{ $t('home.navigation.player_auction') }}</nuxt-link>
      </div>
      <div class="userinfo-menu--item">
        <nuxt-img alt="icon player icon" loading="lazy" src="/icons/card.svg" style="height: 20px;margin-left: -1px;" />
        <nuxt-link :to="getLocaleRoutePath('auction/history')" >{{ $t('home.navigation.show_orders') }}</nuxt-link>
      </div>

      <div class="btn btn-danger log-out" @click="logout">
        <span>{{ $t('home.navigation.logout') }}</span>
      </div>
    </div>
  </transition>
  <vouchercard v-model:show="openVoucherPopup" @close="openVoucherPopup=false;"/>
</template>

<script>
import {getLocaleRoutePath} from "../../plugins/i18n";
import {useUserStore} from "../../stores/userStore";
import Vouchercard from "./vouchercard";

export default {
  name: "HeadPopupMenu",
  components: {Vouchercard},
  data(){
    return{
      userInfoMenu:false,
      openVoucherPopup:false,
      getLocaleRoutePath,
      user: useUserStore(),
      currentLv: {},
      levels :[
        {name :'None',color:'#000000'},
        {name: 'Bronze', color: '#a3684d'},
        {name: 'Silver', color: '#a6a9ab'},
        {name: 'Gold', color: '#ffcc02'},
        {name: 'Platin', color: '#201d56'},
        {name: 'Diamond', color: '#28b5f5'},
      ],

    }
  },
  methods:{
    logout(){
        this.$emit('logout');
    },
    openVoucher(){
        this.$emit('open_voucher')
    },
    closeVoucher(){
      this.openVoucherPopup = false;
    },
    currentLevelData(data){
      if (data.name === '') {
        data.name = 'None';
      }
      const lv = this.levels.find(i => i.name === data.name);
      if (lv) {
        data.color = lv.color;
        data.icon = lv.name + ".svg";
      }
      return data;
    },
    openAchivment(){
      this.$router.push({path:getLocaleRoutePath('account/settings')});
    }
  },
  mounted() {
    $(document).mouseup((e)=> {
      var container = $("#user_nav_popup");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        // Clicked outside of the div
        if(!this.openVoucherPopup){
          this.userInfoMenu = false
        }
      }
    });
    this.currentLv = this.currentLevelData(this.user.loyalty_discount_current.data);
  }//235

}
</script>

<style scoped>

.userinfo-menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  padding-inline-start: 15px;
  position: absolute;
  top: 40px;
  right: -6px;
  min-width: 250px;
  background: #201d56;
  color: white;
  z-index: 9999999999;
  cursor: initial !important;
}

.userinfo-menu .userinfo-menu--item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 11px;
  font-weight: 500;
  font-size: var(--font-size-13px);
  white-space: nowrap;
  cursor: initial;
}

.userinfo-menu .userinfo-menu--item img {
  height: 13px;
}

.log-out {
  margin-inline-end: 15px;
  font-size: 12px;
  font-family: 'Montserrat';
}
.userinfo-menu--item a{
  color:white !important;
}
.userinfo-menu--item span:hover{
  text-decoration: underline;
}
.divider{
  width: 95%;
  height: 0.5px;
  background-color:white;
  margin-top: -5px;
  margin-bottom: -5px;
  opacity: 0.8;
}
.acc-info-popup{
  display: flex;
  justify-content: space-around;
  width: 95%;
  cursor: initial;
}
.acc-info-popup p{
  margin-bottom: 8px;
}
.balance-info{
  display: flex;
  align-items: center;
  gap: 5px;
}
.balance-info img{
  width: 15px;
}
.current-user-lv{
  display: flex;
  gap: 5px;
}
.current-user-lv img{
  width: 35px;
  margin-left: -2px;
}
@media (max-width: 800px){
  .userinfo-menu{
    min-width: 225px;
  }
}
.acc-info-popup > div:last-child > div:hover{
  cursor: pointer;
  opacity: 0.5;
  transition: 0.2s ease;
}
</style>