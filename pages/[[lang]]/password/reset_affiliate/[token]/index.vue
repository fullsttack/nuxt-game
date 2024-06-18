<template>
  <TitleHeaderFootball>
    {{ $t("auth.password_reset") }}
  </TitleHeaderFootball>
  <div class="minibox__container">
    <p>{{$t("newPsw_mydgn.header")}}</p>
    <div class="alert alert-success" v-if="password_changed">
      {{msg}}
    </div>
    <div class="alert alert-danger" v-if="msg !== '' && password_changed === false">
      {{msg}}
    </div>
    <div v-if="!password_changed">
      <div class="input-container" >
        <nuxt-img loading="lazy" class="icon" src="/svg/user_pass.svg" alt="" />
        <input type="password"  :placeholder="$t('newPsw_mydgn.label_1')" v-model="password"/>
      </div>
      <br>
      <div class="input-container">
        <nuxt-img loading="lazy" class="icon" src="/svg/user_pass.svg" alt="" />
        <input type="password"  :placeholder="$t('newPsw_mydgn.label_2')" v-model="password_confirm"/>
      </div>
      <br>
      <div class="btnbox">
        <a class="btn btn-primary" @click="doReset" style="background-color: #201D56;font-size: 14px;">
          <nuxt-img loading="lazy" v-if="loading" src="/loading_btn.svg" alt="" />
          <span v-else>{{$t('newPsw_mydgn.password_reset')}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "~/components/blocks/TitleHeaderFootball";
import {useRoute} from "#app";
import {getLocaleRoutePath} from "~/plugins/i18n";
import {makeMeta} from "~/composables/useUtils";
import {ref} from "vue";
import {t} from "~/plugins/i18n";
export default {
  name: "index",
  components: {TitleHeaderFootball},
  async setup() {
    const route = useRoute();
    useHead(makeMeta(route.path, 'Reset Password', 'Reset Password',false,true))

    const token = route.params.token;
    const email = route.query.email;
    const loading = ref(false)
    const msg = ref('')
    const password = ref('')
    const password_confirm = ref('')
    const password_changed = ref(false)

    const {resetPasswordAffiliate} = useAuthAffiliate();
    const doReset = async () => {
      if (password.value !== password_confirm.value) {
        msg.value = t('validation.confirmed', {attribute: 'password'})
        return
      }
      msg.value = await resetPasswordAffiliate(email, password.value, token, loading)
      if (msg.value.includes('successfully')) {
        password_changed.value = true
        const router = useRouter();
        router.push(getLocaleRoutePath('/'))
      }
    }
    return {
      token,
      email,
      loading,
      msg,
      password,
      password_confirm,
      password_changed,
      doReset,
    };
  },
}
</script>

<style scoped>
@import "@/public/css/pages/resetpassword.css";
.btnbox{
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: flex-end;
}
</style>