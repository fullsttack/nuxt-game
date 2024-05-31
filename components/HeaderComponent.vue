<template>
  <div class="header-container">
    <header class="header header--layout-1">
      <!-- Header Top Bar -->
      <div class="header__top-bar clearfix">
        <div class="container header__con">
          <div class="header__top-bar-inner">
            <!-- Account Navigation -->
            <ul class="nav-account">
              <li v-if="user.isUserLogined" class="nav-account__item nav-account__item--user plus-nine">
                <span>{{ $t('account.your_balance') }}:</span><img src="/images/account/coin.svg"
                  style="width: 20px;height: 20px;" width="20" height="20" /><b>{{ parseFloat(user.coins).toLocaleString()
                  }}</b>
              </li>
              <li v-if="user.isUserLogined" class="nav-account__item nav-account__item--user plus-nine">
                <nuxt-img loading="lazy" style="max-height: 13px" src="/svg/mail-icon.svg" alt="mail icon" />
                <span>{{ user.email }}</span>
              </li>
              <li v-if="user.isGuestUser" class="nav-account__item nav-account__item--user plus-nine">
                <nuxt-img loading="lazy" style="max-height: 13px" src="/svg/key-icon.svg" alt="password icon" />
                <span>{{ user.password_uncoded }}</span>
              </li>
              <li :class="{ active: selected.menu == 1 }" @click="selected.menu = 1" @mouseleave="selected.menu = 0"
                class="nav-account__item has-children desktop desktop_currency" >
                <div class="header-section" style="cursor:pointer;"><span>{{ $t('home.currency') }}</span><span
                    class="highlight">{{ commonStore.selectedCurrency }} </span><span style="margin-inline-start: 5px;"
                    v-html="currencySymbolSelected"></span>
                  <!--                  <span class="sprite " :class="'spritewhite-currency-'+commonStore.selectedCurrency.toLowerCase()"></span>-->
                  <nuxt-img loading="lazy" alt="forward icon" class="icon_forward" src="/svg/icon-ios-arrow-forward.svg"
                    width="11" height="6" />
                </div>
                <ul class="main-nav__sub currency-popup">
                  <li v-for="currency in selectableCurrencies" @click.stop.prevent="changeCurrency(currency)"
                    style="cursor: pointer;">
                    <div>
                      <div>
                        <div class="aaa" href="#"><span>{{ currency }}</span><span style="margin-left: 5px;"
                            v-html="wgc.getSymbolByCurrency(currency)"></span></div>
                      </div>
                      <div class="fi" :class="wgc.getCurrencyFlag(currency)"></div>
                    </div>
                  </li>
                </ul>
              </li>

              <li style="left: 5px;" :class="{ active: selected.menu == 1 }" @click="selected.menu = 1"
                @mouseleave="selected.menu = 0" class="nav-account__item has-children phone">
                <div class="header-section" @click="showPhoneCurrency = !showPhoneCurrency">
                  <span class="highlight">{{ commonStore.selectedCurrency }} <span
                      v-html="currencySymbolSelected"></span> </span>
                  <nuxt-img loading="lazy" alt="forward icon 3" class="icon_forward" src="/svg/icon-ios-arrow-forward.svg"
                    width="11" height="6" />
                </div>
                <ul style="margin-right: 30px" class="main-nav__sub currency-popup" v-show="showPhoneCurrency">
                  <li v-for="currency in selectableCurrencies" @click.stop.prevent="changeCurrency(currency)">
                    <!--                    <a class="sprite dropdowncurrency" :class="'sprite-currency-'+currency.toString().toLowerCase()">{{ currency }}</a>-->
                    <div>
                      <div>
                        <div class=""><span>{{ currency }}</span><span style="margin-left: 5px;"
                            v-html="wgc.getSymbolByCurrency(currency)"></span></div>
                      </div>
                      <div class="fi" :class="wgc.getCurrencyFlag(currency)"></div>
                    </div>
                  </li>
                </ul>
              </li>
              <language-popup/>
              <li class="nav-account__item nav-account__item--userinfo">
                <head-popup-menu v-if="user.isUserLogined" @logout="logout"
                  @open_voucher="open_voucher"></head-popup-menu>
              </li>
              <authpopup v-if="!user.isUserLogined"></authpopup>
<!--              <authpopup v-else-if="user.isUserLogined && commonStore.authpopup" :reauth="commonStore.authpopup"></authpopup>-->
            </ul>
            <!-- Account Navigation / End -->
          </div>
        </div>
      </div>
      <!-- Header Top Bar / End -->

      <!-- Header Secondary -->
      <div class="header__secondary">
        <div class="container header__con">
          <ul class="info-block info-block--header">
            <li class="info-block__item info-block__item">
              <a href="https://www.trustami.com/review/whatsgaming-net-rating" target="_blank"><nuxt-img loading="lazy"
                  style="max-width: 150px" src="/svg/review_two.svg" alt="review icon" width="150" height="42" /></a>
            </li>
            <li class="info-block__item info-block__item">
              <nuxt-img loading="lazy" alt="delivery icon" src="/svg/icon_delivery.svg" width="34" height="23" />
              <span>{{ $t('home.blue_block.for_gamers') }}</span>
            </li>
            <li class="info-block__item info-block__item">
              <nuxt-img loading="lazy" alt="sheild icon" src="/svg/icon_shield.svg" width="19" height="24" />
              <span>{{ $t('home.blue_block.transfer_safety') }}</span>
            </li>
            <li class="info-block__item info-block__item">

              <nuxt-img loading="lazy" alt="contact us icon" src="/svg/tlg_header.svg" width="25" height="25"
                style="margin-top: 2px;transform: scale(1.1);" />
              <span><a target="_blank" :href="'https://t.me/whatsgamingsupport'">{{ $t('home.blue_block.customer_service')
              }}</a></span>
            </li>

            <li
                :class="{hideredbtn:$route.name==='lang-fc-coins-fc-24-coins'}"
                style="width: max-content;padding: 5px !important;margin: 5px !important;"
                class="info-block__item info-block__item info-block__button fc-animation-bounce">
              <nuxt-link no-prefetch class="bcoin" :to="getLocaleRoutePath('fc-coins/fc-24-coins')">
                <nuxt-img alt="coin icon" loading="lazy" src="/svg/coins.svg" width="28" height="28"/>
                <span>{{ $t('home.navigation.buy_coins_btn') }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- Header Secondary / End -->

      <!-- Header Primary -->
      <div class="header__primary">
        <div class="container header__con">
          <div class="header__primary-inner">
            <!-- Header Logo -->
            <div class="header-logo">
              <a id="header-mobile__toggle" class="burger-menu-icon"><span style="width: 17px"
                  class="burger-menu-icon__line"></span></a>
              <a :href="urlwithLocal('')">
                <nuxt-img loading="lazy" width="auto" height="auto" src="/images/logo_4.png" alt="Alchemists" class="header-logo__img" />
                <!--                <span>Noting Else Matters!</span>-->
              </a>
            </div>
            <!-- Header Logo / End -->

            <!-- Main Navigation -->
            <nav class="main-nav clearfix">
              <a id="header-mobile__toggle" class="main-nav-burger burger-menu-icon"><span style="width: 17px"
                  class="burger-menu-icon__line"></span></a>

              <!-- drower layout user information -->
              <div v-if="!user.isUserLogined">
                <ul class="auth-nav" style="display: none;">
                  <li v-if="!user.isUserLogined" class="auth-li auth-li-login"><nuxt-link
                      :to="urlwithLocal('login')">Login</nuxt-link></li>
                  <li v-if="!user.isUserLogined" class="auth-li auth-li-register"><nuxt-link
                      :to="urlwithLocal('login')">Signup</nuxt-link></li>
                </ul>
              </div>
              <div class="account-managment">
                <div style="margin: 0 auto;">{{ $t('faq.left_section_name') }}</div>
              </div>
              <!-- end of drower layout user information -->
              <ul class="main-nav__list">
                <li class="active only-desktop">
                  <nuxt-link :to="urlwithLocal('')">{{ $t('home.home') }}</nuxt-link>
                </li>
                <li class="only-desktop">
                  <nuxt-link no-prefetch :to="urlwithLocal('fc-coins/fc-24-coins')">{{ $t('home.navigation.fc_coins') }}</nuxt-link>
                </li>
                <li class="only-desktop">
                  <nuxt-link no-prefetch :to="urlwithLocal('sell-accounts')" style="display: none">{{
                    $t('home.navigation.earn_coins') }}</nuxt-link>
                </li>
                <li class="only-desktop">
                  <nuxt-link no-prefetch :to="urlwithLocal('sell-coins')">{{ $t('home.navigation.sell_coins')
                  }}</nuxt-link>
                </li>
                <li class="only-desktop">
                  <nuxt-link no-prefetch :to="urlwithLocalhash('fc-coins/fc-24-coins#faq')">{{ $t('home.navigation.faq') }}</nuxt-link>
                </li>
                <li class="only-desktop">
                  <nuxt-link :to="urlwithLocal('affiliate')">{{ $t('home.navigation.affiliate') }}</nuxt-link>
                </li>
<!--                <li class="only-desktop">-->
<!--                  <nuxt-link no-prefetch :to="urlwithLocal('loyalty')">{{ $t('home.navigation.treuerabatt') }}</nuxt-link>-->
<!--                </li>-->
                <li class="only-desktop" v-if="jobOfferVisible">
                  <nuxt-link :to="urlwithLocal('jobs')">Job Offers</nuxt-link>
                </li>
                <li class="active only-phone">
                  <nuxt-link :to="urlwithLocal('')" style="font-weight: bold;font-size: 13px;margin-top: 5px;">{{
                    $t('home.home') }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('why-we')">{{ $t('home.navigation.why_we') }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('affiliate')">{{ $t('home.navigation.affiliate') }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('loyalty')">{{ $t('home.navigation.treuerabatt') }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('sell-coins')">{{ $t('home.navigation.sell_coins')
                  }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('blog')">{{ $t('home.navigation.blog') }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('pages/conditions')">{{ $t('home.navigation.conditions')
                  }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('pages/imprint')">{{ $t('home.navigation.imprint') }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('affiliate')">{{ $t('home.navigation.affiliate') }}</nuxt-link>
                </li>
                <li>
                  <nuxt-link no-prefetch :to="urlwithLocal('account/leaderboard')">Leaderboard</nuxt-link>
                </li>
                <li class="only-phone" v-if="jobOfferVisible">
                  <nuxt-link no-prefetch :to="urlwithLocal('jobs')">Job Offers</nuxt-link>
                </li>
              </ul>
              <div class="account-managment only-phone" style="margin-top: 10px;">
                <div style="margin: 0 auto;">{{ $t('home.title') }}</div>
              </div>
              <ul class="main-nav__list only-phone min-h">
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('fc-coins/fc-24-coins')">{{ $t('home.navigation.fc_coins') }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/ps4')">{{ $t('home.navigation.buy_coins_ps4')
                  }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/ps5')">{{ $t('home.navigation.buy_coins_ps5')
                  }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/xbox')">{{ $t('home.navigation.buy_coins_xbox')
                  }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/pc')">{{ $t('home.navigation.buy_coins_pc')
                  }}</nuxt-link>
                </li>
                <li class="only-phone">
                  <hr data-v-f8c5b8f8="" style="background: gray; width: 90%;">
                </li>
                <li class="only-phone">
                  <div class="ahref" style="margin-bottom: 10px;"><b
                      style="font-size: 14px;margin-bottom: 10px;color: white;">{{ $t('footer.contact_us') }}</b></div>
                </li>
                <li class="only-phone">
                  <div class="nav-contant--item">
                    <nuxt-img loading="lazy" src="/svg/icon-ionic-md-mail.svg" alt="icon email support" width="15"
                      height="15" />
                    <span>support@whatsgaming.net</span>
                  </div>
                </li>
                <li class="only-phone">
                  <div class="nav-social-list">
<!--                    <a target="_blank" :href="'https://wa.me/+989999797725?text=' + getWGSupportMsg()">-->
<!--                      <nuxt-img loading="lazy" src="/svg/footer_whatsapp.svg" alt="icon footer whatsapp" width="25" height="25"/>-->
<!--                    </a>-->
                    <a target="_blank" :href="'https://t.me/whatsgamingsupport'">
                      <nuxt-img loading="lazy" src="/svg/tlg_footer.svg" alt="icon footer whatsapp" width="25"
                        height="25" />
                    </a>
                    <a target="_blank" href="https://www.instagram.com/whatsgaming">
                      <nuxt-img loading="lazy" src="/svg/footer_insta.svg" alt="icon footer insta" width="25"
                        height="25" />
                    </a>
                    <a target="_blank" href="https://facebook.com/myWhatsGaming">
                      <nuxt-img loading="lazy" src="/svg/footer_fb.svg" alt="icon footer fb" width="25" height="25" />
                    </a>
                    <a target="_blank" href="https://discord.gg/akPEx7Hq">
                      <nuxt-img loading="lazy" src="/svg/discord_footer.svg" alt="icon footer fb" width="25"
                        height="25" />
                    </a>
                  </div>
                </li>
                <!--                <li class="only-phone"><hr style="background: gray; width: 90%;"></li>-->
              </ul>
              <!-- Pushy Panel Toggle -->
              <div class="pushy-panel__toggle">
                <span class="pushy-panel__line"></span>
              </div>
              <!-- Pushy Panel Toggle / Eng -->
            </nav>
            <!-- Main Navigation / End -->
          </div>
        </div>
      </div>

      <!-- Header Primary / End -->
    </header>
    <authpopup-pro v-if="globalAuthPopupStatus" />
  </div>
</template>
<!-- Header / End -->

<style scoped>
@import "@/public/css/header.css";
@import "@/public/css/infoBlock.css";
@import "@/public/css/components/header.css";

.info-block__item a {
  color: white;
}
</style>

<script>
import { useCommonStore } from "~/stores/commonStore";
import { useUserStore } from "~/stores/userStore";
import { selectableLanguages, getLocaleRoutePath } from "../plugins/i18n";
import { api } from '~/composables/api'
import Authpopup from "./embeded/authpopup";
import { useAuth } from "~/composables/auth";
import HeadPopupMenu from "./embeded/HeadPopupMenu";
import { urlwithLocal, urlwithLocalhash, getWGSupportMsg } from "~/composables/useUtils";
import { useNuxtApp } from "nuxt/app";
import useWGCurrency from "../composables/useWGCurrency";
import {computed, ref, watch} from "vue";
import AuthpopupPro from "./embeded/authpopupPro";

import { storeToRefs } from 'pinia';
import { useCheckOutCardStore } from '@/stores/checkOutCard';
import LanguagePopup from "./embeded/languagePopup";

export default {
  name: 'HeaderComponent',
  components: {LanguagePopup, AuthpopupPro, HeadPopupMenu, Authpopup },
  setup() {
    const checkOutCardStore = useCheckOutCardStore();
    const { globalAuthPopupStatus } = storeToRefs(checkOutCardStore);

    const route = useRoute();
    const router = useRouter();
    const { logout } = useAuth();

    const commonStore = useCommonStore()
    const user = useUserStore()
    const wgc = useWGCurrency();
    const currencySymbolSelected = ref();

    const selectableCurrencies = computed(() => {
      return wgc.currencies.filter(i => i !== commonStore.selectedCurrency);
    });
    watch(()=>commonStore.selectedCurrency,(n)=>{
      setTimeout(()=>{
        currencySymbolSelected.value = wgc.getSymbolByCurrency(n);
        //console.log("===========>"+n + " - " + currencySymbolSelected.value);
      },10);
    },{immediate:true})
    return {
      currencySymbolSelected,
      logout,
      getWGSupportMsg,
      urlwithLocal,
      urlwithLocalhash,
      user,
      selectableCurrencies,
      wgc,
      globalAuthPopupStatus,
      commonStore
    }
  },
  data: () => {
    return {
      selected: {
        how: 1,
        menu: 0,
      },
      langLocale: 'en',
      showPhoneLanguage: false,
      showPhoneCurrency: false,
      user: useUserStore(),
      commonStore: useCommonStore(),
      userInfoMenu: false,
      authenticateMenu: false,
      getLocaleRoutePath
    };
  },
  methods: {
    changeCurrency(currency) {
      if (this.user.email) {
        api.post(`account/change_currency/${currency}`)
      }
      this.commonStore.setCurrency(currency);
      if (['lang-fc-coins-fc-24-coins','index','lang'].includes(this.$route.name)) {
        this.$router.go(0);
      } else {
        this.$router.push({ path: getLocaleRoutePath('/') })
      }
    },
    showphonenav() {
      $(".main-nav__sub__phone").show();
    },
    handleBlogUrl() {
      var url = '/' + this.$i18n.locale + '/blog';
      window.open(url, '_self');
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    jobOfferVisible(){
      return false;//['en','de'].includes(this.$i18n.locale);
    },
  },
  mounted: function () {

    this.langLocale = this.$route.params.lang === undefined || this.$route.params.lang === '' ? 'en' : this.$route.params.lang;
    var $wrapper = $(".site-wrapper");
    $(".site-overlay, .main-nav__back").on("click", function () {
      $wrapper.toggleClass("site-wrapper--has-overlay");
    });

    $(".burger-menu-icon").on("click", function () {
      $wrapper.toggleClass("site-wrapper--has-overlay");
    });
  },
};
</script>
<style>
@import "@/public/css/flags/css/flag-icons.css";


.sprite-currency-usd {
  width: 21px;
  background-image: url("/svg/c_dollar.svg");
  background-size: 35px !important;
  background-position: 4px !important;
}

.sprite-currency-eur {
  width: 21px;
  background-image: url("/svg/e_euro.svg");
}

.sprite-currency-gbp {
  width: 21px;
  background-image: url("/svg/c_gbp.svg");
}

.sprite-currency-try {
  width: 15px;
  background-image: url("/svg/c_try.svg");
}

.spritewhite-currency-usd {
  width: 21px;
  background-image: url("/svg/c_dollar_white.svg");
  background-size: 35px !important;
  background-position: 4px !important;
  height: 21px;
  ;
}

.spritewhite-currency-eur {
  width: 21px;
  background-image: url("/svg/e_euro_white.svg");
  height: 21px;
  ;
}

.spritewhite-currency-gbp {
  width: 21px;
  background-image: url("/svg/c_gbp_white.svg");
  height: 21px;
  ;
}

.spritewhite-currency-try {
  width: 15px;
  background-image: url("/svg/c_try_white.svg");
  height: 21px;
  ;
}

.sprit-fix {
  background-size: 21px 17px !important;
  background-position: center !important;
}

.sprit-fix-usd {
  background-size: 25px 25px !important;
  background-position: center !important;
}



.dropdownflag {
  background-repeat: no-repeat;
  padding-left: 60px !important;
  background-position: left;
  margin-bottom: 5px;
  margin-top: 5px;
}

.dropdowncurrency {
  background-repeat: no-repeat;
  padding-left: 45px !important;
  background-position: 10px;
  margin-bottom: 10px;
  background-size: 25px;
}
.currency-popup {
  min-width: 150px !important;
  background-color: white !important;
  color: black !important;
  border: none !important;
}

.currency-popup li:first-child {
  margin-top: -10px;
}

.currency-popup li>div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid gray;
}

.currency-popup li:last-child>div {
  border-bottom: none;
}

.currency-popup li div .aaa {
  color: black !important;
  font-weight: 500 !important;
  padding: 0 !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  border-bottom: 2px solid white;
  font-size: var(--font-size-15px) !important;
  padding-left: 5px !important;
}

.currency-popup .fi {
  margin-right: 3px !important;
}

.currency-popup li div .aaa:hover {
  text-decoration: none;
  color: teal !important;
}

@media (max-width: 768px) {
  .currency-popup li>div {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  #language_popup {
    margin-top: 0px;
    padding-top: 15px !important;
    margin-right: 50%;
  }

  .dropdownflag {
    background-size: 25px;
    padding: 0;
    margin: 0;
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 15px;
  }

  .main-nav__sub li a {
    border: 0 !important;
  }

  .dropdowncurrency {
    background-repeat: no-repeat;
    padding-left: 35px !important;
    background-position: 10px;
    margin-bottom: 10px;
    background-size: 15px;
    line-height: 0px !important;
  }

  .sprite-currency-usd {
    background-size: 25px !important;
    background-position: 4px !important;
  }

  .currency-popup li:first-child {
    margin-top: 0px !important;
  }

  .currency-popup {
    border: solid 1px #e4e7ed !important;
  }

  .currency-popup li div .aaa {
    font-size: var(--font-size-14px) !important;
  }

  .selected_flag {
    background-position: center center;
  }
}
.bcoin {
  text-decoration: none;
  color: white;
  cursor: pointer;
  display: flex;
  width: max-content;
  gap: 2px;
}

.bcoin span {
  font-weight: 600 !important;
}

.currency-popup>li .aaa small {
  font-weight: 600;
}
.header-logo{
  width: max-content !important;
}
.hideredbtn{
  visibility: hidden;
}
</style>