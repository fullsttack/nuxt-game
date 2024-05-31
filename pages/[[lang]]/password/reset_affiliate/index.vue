<template>
  <TitleHeaderFootball>
    {{ $t("auth.password_reset") }}
  </TitleHeaderFootball>
  <div class="minibox__container">
    <p>{{$t('resetPsw_mydgn.header')}}</p>
    <div class="input-container" v-if="showInputContainer">
      <nuxt-img loading="lazy" class="icon" alt="password reset" src="/svg/icon-ionic-md-mail_dark.svg"  />
      <input type="email" name="email" class="email-input" placeholder="Enter Email Address" v-model="email_address"/>
      <a class="resetbtn" @click="SendResetLink" ref="resetbtn">
        <nuxt-img loading="lazy" alt="password reset loading" v-if="loading" src="/loading_btn.svg"  />
        <span v-else>Send</span>
      </a>
    </div>
    <div class="err-txt" v-if="msg !==''">
      {{msg}}
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../../../components/blocks/TitleHeaderFootball";
import {makeMeta} from "~/composables/useUtils";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
export default {
  name: "index",
  setup(){
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' })
    useHead(makeMeta(route.path,'Email Password', 'Email Password',false,true))

    const {sendResetLinkAffiliate} = useAuthAffiliate();
    const loading = ref(false)
    const showInputContainer = ref(true)
    const msg = ref('')
    const email_address = ref('')

    const SendResetLink = async () => {
      msg.value = await sendResetLinkAffiliate(email_address.value, loading)
      if (msg.value.includes('successfully')) {
        showInputContainer.value = false
      }
    }

    return {
      loading,
      showInputContainer,
      msg,
      email_address,
      SendResetLink,
    };
  },
  components: {TitleHeaderFootball},
}
</script>

<style scoped>
@import "@/public/css/pages/resetpassword.css";
</style>