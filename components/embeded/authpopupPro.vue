<template>
  <div v-if="globalAuthPopupStatus" class="auth_popup_container">
    <div class="auth_popup" id="popup_authenticate">

      <div class="header">
        <span>{{ $t('auth.my_account') }}</span>
        <img style="cursor: pointer;" @click="setGlobalAuthPopupStatus(false);" src="/images/account/close_auth_pro.svg"
          alt="close icon circle" />
      </div>

      <transition-group name="list">
        <div class="auth_popup-p" v-if="currentViewMode === viewModes.login">
          <div class="title one-line-wide title-one-line">
            <img src="/images/account/user_ico.svg" />
            {{ $t('title.login') }}
          </div>
          <div class="c-hr" />
          <div class="input-container">
            <nuxt-img loading="lazy" class="icon" src="/images/account/user_ico_gray.svg" alt="user ico" />
            <input type="email" name="email" class="email-input" v-model.trim="loginInput.email"
              :placeholder="$t('buybox.auth.email_placeholder')" />
          </div>
<!--          <div class="input-container">-->
<!--            <nuxt-img alt="user password icon" loading="lazy" class="icon" src="/images/account/pass_ico_gray.svg" />-->
<!--            <input type="password" name="password" class="email-input" v-model="loginInput.password"-->
<!--              :placeholder="$t('buybox.auth.password_placeholder')" />-->
<!--          </div>-->
          <x-passwordpro  :placeholder="$t('buybox.auth.password_placeholder')" v-model:model-value="loginInput.password"/>
          <div class="d-flex align-items-center">
            <label class="checkbox-container" style="cursor: pointer;">
              <input type="checkbox">
              <span class="checkmark"></span>
            </label>
            <div class="title-11 mt-5px">{{ $t('auth.remain_signed') }}</div>
          </div>
          <div>
            <button class="btn btn-login" @click="signIn">
              <nuxt-img alt="loading user auth icon" loading="lazy" v-if="loading" src="/loading_btn.svg" />
              <template v-else>{{ $t('auth.login_button') }}</template>
            </button>
            <span v-if="auth_error != ''" class="mt-2 mb-2 err-txt">{{ auth_error }}</span>
            <nuxt-link :to="getLocaleRoutePath('password/reset')" class="title-11-small text-center mt-2 mb-2"
              style="display: block;">{{ $t('auth.password_forgotten') }}</nuxt-link>
          </div>
        </div>

        <div class="auth_popup-p" v-else>
          <div class="title one-line-wide title-one-line">
            <img src="/images/account/register_ico.svg" />
            {{ $t('auth.title') }}
          </div>
          <div class="c-hr" />
          <div class="input-container">
            <nuxt-img loading="lazy" class="icon" src="/images/account/user_ico_gray.svg" alt="user ico" />
            <input type="email" class="email-input" v-model="registerInput.email"
              :placeholder="$t('buybox.auth.email_placeholder')" />
          </div>
<!--          <div class="input-container">-->
<!--            <nuxt-img loading="lazy" class="icon" src="/images/account/user_ico_gray.svg" alt="user ico" />-->
<!--            <input type="password" class="email-input" v-model="registerInput.password"-->
<!--              :placeholder="$t('auth.password')" />-->
<!--          </div>-->
          <x-passwordpro :placeholder="$t('auth.password')" v-model:model-value="registerInput.password"/>
<!--          <div class="input-container">-->
<!--            <nuxt-img loading="lazy" class="icon" src="/images/account/user_ico_gray.svg" alt="user ico" />-->
<!--            <input type="password" class="email-input" v-model="registerInput.confirmPassword"-->
<!--              :placeholder="$t('auth.password_confirm')" />-->
<!--          </div>-->
          <x-passwordpro :placeholder="$t('auth.password_confirm')" v-model:model-value="registerInput.confirmPassword"/>
          <div>
            <button class="btn btn-login" @click="registerUser">
              <nuxt-img alt="loading user auth icon" loading="lazy" v-if="loading" src="/loading_btn.svg" />
              <template v-else>{{ $t('auth.register_button') }}</template>
            </button>
            <span v-if="auth_error != ''" class="mt-2 mb-2 err-txt">{{ auth_error }}</span>
          </div>
        </div>
      </transition-group>

      <div class="graybox fss" @click="switchMode">
        <a  v-if="currentViewMode === viewModes.login">
          <nuxt-img alt="signup user icon" loading="lazy" src="/images/account/register_ico.svg" />
          <span class="title-11" style="font-size: 15px;">{{ $t('auth.title') }}</span>
        </a>
        <a v-else>
          <nuxt-img alt="login user icon" loading="lazy" src="/images/account/log_gray_ico.svg" />
          <span class="title-11" style="font-size: 15px;">{{ $t('title.login') }}</span>
        </a>
      </div>
      <div class="graybox" @click="regGuest">
        <a>
          <nuxt-img alt="user icon" loading="lazy" src="/images/account/guest_ico.svg" />
          <span class="title-11" style="font-size: 15px;" >{{ $t('auth.guest.title') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useUtils from "~/composables/useUtils";
import { useAuth } from "~/composables/auth";
import {getLocale, getLocaleRoutePath} from "~/plugins/i18n";
import { ref } from "vue";
import { t } from "~/plugins/i18n";

import { storeToRefs } from 'pinia';
import { useCheckOutCardStore } from '@/stores/checkOutCard';
import XPassword from "~/components/embeded/el/x-password.vue";
import XPasswordpro from "~/components/embeded/el/x-passwordpro.vue";

export default {
  name: "authpopupPro",
  components: {XPasswordpro, XPassword},
  async setup() {
    const checkOutCardStore = useCheckOutCardStore();
    const { setGlobalAuthPopupStatus } = checkOutCardStore;
    const { globalAuthPopupStatus } = storeToRefs(checkOutCardStore);

    const viewModes = {
      login: 0,
      register: 1
    }
    const currentViewMode = ref(viewModes.login);
    const { isValidEmail } = useUtils();
    const { login, registerGuest, register } = useAuth();
    // const authMenu = ref(true)
    const loading = ref(false)
    const auth_error = ref('')
    const loginInput = ref({
      email: '',
      password: ''
    });
    const registerInput = ref({
      email: '',
      password: '',
      confirmPassword: ''
    });
    const signIn = async () => {
      auth_error.value = ''
      auth_error.value = await login(loginInput.value.email, loginInput.value.password, loading)
      if (!auth_error.value) {
        // authMenu.value = false
        setGlobalAuthPopupStatus(false);
        useNuxtApp().$toast.success(t('auth.success'));
      }
    }
    const registerUser = async () => {
      if (registerInput.value.password !== "" && (registerInput.value.password !== registerInput.value.confirmPassword)) {
        auth_error.value = t('validation.confirmed', { attribute: 'password' });
      } else {
        auth_error.value = ''
        auth_error.value = await register(registerInput.value.email, registerInput.value.password, 'ps4', loading)
        if (!auth_error.value) {
          // authMenu.value = false
          setGlobalAuthPopupStatus(false);
        }
      }
    }
    const regGuest = async () => {
      await registerGuest('ps4')

      useNuxtApp().$toast.success(t('auth.success_guest'));
      setGlobalAuthPopupStatus(false);
    }
    const switchMode = async () => {
      if (!loading.value) {
        auth_error.value = '';
        if (currentViewMode.value === viewModes.login) {
          currentViewMode.value = viewModes.register;
        } else {
          currentViewMode.value = viewModes.login;
        }
      }
    }
    return {
      getLocaleRoutePath,
      isValidEmail,
      signIn,
      regGuest,
      loading,
      // authMenu,
      auth_error,
      loginInput,
      switchMode,
      currentViewMode,
      viewModes,
      registerInput,
      registerUser,
      globalAuthPopupStatus,
      setGlobalAuthPopupStatus
    }
  },
}
</script>

<style scoped>
@import "@/public/css/components/authpopup_new.css";

.fss {
  margin-top: 12px;
}
.graybox{
  cursor: pointer;
}
.graybox:hover a{
  text-decoration: underline;
}
.graybox:last-child {
  border: none;
}
</style>