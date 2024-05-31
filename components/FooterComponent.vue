<template>
 <div :class="{'footerhighres':['lang-loyalty','lang-comfort'].includes($route.name)}">
   <img alt="footer website icon" loading="lazy" src="/svg/logo-inner.png"  width="255" height="55" class="bottom--item"/>
   <footer >
     <div class="content">
       <div class="useful-links">
         <b>{{ $t('footer.quick_links') }}</b>
         <div class="links desktop">
           <nuxt-link :to="urlwithLocal('')">{{ $t('home.home') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fc-coins/fc-24-coins')">{{ $t('home.navigation.fc_coins') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/ps4')">{{ $t('home.navigation.buy_coins_ps4') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/ps5')">{{ $t('home.navigation.buy_coins_ps5') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/xbox')">{{ $t('home.navigation.buy_coins_xbox') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/pc')">{{ $t('home.navigation.buy_coins_pc') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('sell-coins')">{{ $t('home.navigation.sell_coins') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('why-we')">{{ $t('home.navigation.why_we') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('pages/imprint')">{{ $t('home.navigation.imprint') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('loyalty')">{{ $t('home.navigation.treuerabatt') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('affiliate')">{{ $t('home.navigation.affiliate') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('pages/conditions')">{{ $t('home.navigation.conditions') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('sell-accounts')" style="display:none;">{{ $t('home.navigation.earn_coins') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('pages/privacy')">{{ $t('home.navigation.data_protection') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('blog')">{{ $t('home.navigation.blog') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('loyalty')">{{ $t('home.navigation.treuerabatt') }}</nuxt-link>
         </div>

         <div class="links phone">
           <nuxt-link :to="urlwithLocal('')">{{ $t('home.home') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fc-coins/fc-24-coins')">{{ $t('home.navigation.fc_coins') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/ps4')">{{ $t('home.navigation.buy_coins_ps4') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/ps5')">{{ $t('home.navigation.buy_coins_ps5') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/xbox')">{{ $t('home.navigation.buy_coins_xbox') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('fifa-coins/pc')">{{ $t('home.navigation.buy_coins_pc') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('sell-coins')">{{ $t('home.navigation.sell_coins') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('why-we')">{{ $t('home.navigation.why_we') }}</nuxt-link>
           <nuxt-link no-prefetch :to="urlwithLocal('blog')">{{ $t('home.navigation.blog') }}</nuxt-link>
         </div>
       </div>
       <div class="contact-us">
         <b>{{ $t('footer.contact_us') }}</b>

         <div class="contant--item">
           <nuxt-img loading="lazy" src="/svg/icon-ionic-md-mail.svg" alt="icon email support" width="26" height="20" />
           <span><a style="color:white;" href="mailto:support@whatsgaming.net">support@whatsgaming.net</a></span>
         </div>
         <div class="footer-social-media">
<!--           <a target="_blank" :href="'https://wa.me/+989999797725?text='+getWGSupportMsg()">-->
<!--             <nuxt-img loading="lazy" src="/svg/footer_whatsapp.svg" alt="icon footer whatsapp" width="37" height="37"/>-->
<!--           </a>-->
           <a target="_blank" :href="'https://t.me/whatsgamingsupport'">
             <nuxt-img loading="lazy" src="/svg/tlg_footer.svg" alt="icon footer tlg" width="37" height="37"/>
           </a>
           <a target="_blank" href="https://www.instagram.com/whatsgaming">
             <nuxt-img loading="lazy" src="/svg/footer_insta.svg" alt="icon footer insta" width="37" height="37"/>
           </a>
           <a target="_blank" href="https://facebook.com/myWhatsGaming">
             <nuxt-img loading="lazy" src="/svg/footer_fb.svg" alt="icon footer fb" width="37" height="37"/>
           </a>
           <a target="_blank" href="https://discord.gg/akPEx7Hq">
             <nuxt-img loading="lazy" src="/svg/discord_footer.svg" alt="icon footer fb" width="37" height="37"/>
           </a>
         </div>
       </div>
       <div class="news-letter">
         <b>{{ $t('footer.newsletter.title') }}</b>
         <span>{{$t('footer.newsletter.desc')}}</span>
         <div style="max-width: 320px !important" class="input-group">
           <input :placeholder="$t('footer.newsletter.email')" type="text" />
           <div class="send">
             <nuxt-img loading="lazy" src="/svg/icon-material-send.svg" alt="icon send newsletters" width="23" height="19" />
           </div>
         </div>
       </div>

       <div class="contact-news">
         <div class="contact-us">
           <b>{{ $t('footer.contact_us') }}</b>
           <div class="footer-social-media res-only">
             <!--       <a target="_blank" :href="'https://wa.me/+989999797725?text='+getWGSupportMsg()">-->
             <!--         <nuxt-img loading="lazy" src="/svg/footer_whatsapp.svg" alt="icon footer whatsapp" width="37" height="37"/>-->
             <!--       </a>-->
             <a target="_blank" :href="'https://t.me/whatsgamingsupport'">
               <nuxt-img loading="lazy" src="/svg/tlg_footer.svg" alt="icon footer tlg" width="37" height="37"/>
             </a>
             <a target="_blank" href="https://www.instagram.com/whatsgaming">
               <nuxt-img loading="lazy" src="/svg/footer_insta.svg" alt="icon footer insta" width="37" height="37"/>
             </a>
             <a target="_blank" href="https://facebook.com/myWhatsGaming">
               <nuxt-img loading="lazy" src="/svg/footer_fb.svg" alt="icon footer fb" width="37" height="37"/>
             </a>
             <a target="_blank" href="https://discord.gg/akPEx7Hq">
               <nuxt-img loading="lazy" src="/svg/discord_footer.svg" alt="icon footer fb" width="37" height="37"/>
             </a>
           </div>
           <div class="contant--item">
             <nuxt-img loading="lazy" src="/svg/icon-ionic-md-mail.svg" alt="icon support" width="26" height="21"/>
             <span><a style="color:white;" href="mailto:support@whatsgaming.net">support@whatsgaming.net</a></span>
           </div>
         </div>

         <div class="news-letter">
           <b>{{ $t('footer.newsletter.title') }}</b>
           <div class="input-group">
             <input :placeholder="$t('footer.newsletter.email')" type="text" />
             <div class="send">
               <nuxt-img loading="lazy" src="/svg/icon-material-send.svg" width="22" height="19" alt="icon send newsletters" />
             </div>
           </div>
         </div>
       </div>
     </div>

     <div style="width: 85%" class="desktop-view">
       <nuxt-img alt="footer paymethods icon desktop" width="100" height="45" loading="lazy" class="payment-methods" src="/svg/pay-methods_new.svg" />
     </div>


     <nuxt-img
         class="payment-methods phone"
         src="/svg/pay-methods_new.svg"
         alt="footer paymethods icon mobile"
         height="100" width="100"
         loading="lazy"
     />
     <div class="copy-right">{{ $t('footer.all_right_reserved') }}</div>
   </footer>
 </div>
</template>

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
</style>

<script>
import {useCommonStore} from "../stores/commonStore";
import {urlwithLocal} from "../composables/useUtils";
export default  {
  setup(){
    const userStore = useUserStore();
    const {getWGSupportMsg} = useUtils();
    return {userStore,getWGSupportMsg,urlwithLocal};
  },
  data: () => {
    return {
      urlwithLocal,
      commonStore:useCommonStore(),
    };
  },
  methods: {
    to(path) {
      return this.$router.push(urlwithLocal(path))
    },

  }
}
</script>
