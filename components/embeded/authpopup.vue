<template>
  <li class="nav-account__item" >
    <transition name="fade" v-if="!reauth">
      <div style="padding: 10px;max-width: 40px;width: 40px;min-height: 43px">
        <img
            v-if="!authMenu"
            @click="authMenu = true"
            src="/images/index24/login.svg"
            alt="user icon auth popup"
            class="login_ico"
            width="24"
            height="24"
        />
      </div>
    </transition>

    <transition name="list" >
      <div v-if="authMenu" :class="{onreAuth:reauth}" class="auth_popup" id="popup_authenticate">
        <div class="auth_popup-p">
          <div class="title one-line-wide">
            {{ $t('auth.my_account') }}
            <img v-if="!reauth"
                style="cursor: pointer;"
                @click="authMenu = !authMenu"
                src="/svg/cancle_circle2.svg"
                alt="cancel icon circle"
            />
          </div>
          <div class="c-hr"/>
          <div class="input-container">
            <nuxt-img loading="lazy" class="icon" src="/svg/user_ico.svg" alt="user ico"/>
            <input type="email" name="email" class="email-input" v-model.trim="input_email" :placeholder="$t('buybox.auth.email_placeholder')"/>
          </div>
<!--          <div class="input-container">-->
<!--            <nuxt-img alt="user password icon" loading="lazy" class="icon" src="/svg/user_pass.svg"/>-->
<!--            <input type="password" name="password" class="email-input" v-model="input_password" :placeholder="$t('buybox.auth.password_placeholder')"/>-->
<!--          </div>-->
          <x-password :placeholder="$t('buybox.auth.password_placeholder')" v-model:model-value="input_password"/>
          <label class="checkbox-container" style="cursor: pointer;">
            <input type="checkbox">
            <span class="checkmark"></span>

          </label>
          <span class="title-11">{{ $t('auth.remain_signed') }}</span>
          <div>
            <button class="btn btn-login" @click="signIn">
              <nuxt-img alt="loading user auth icon" loading="lazy" v-if="loading" src="/loading_btn.svg" />
              <template v-else>{{ $t('auth.login_button') }}</template>
            </button>
            <span v-if="login_error != ''" class="mt-2 mb-2 err-txt">{{login_error}}</span>
            <nuxt-link :to="getLocaleRoutePath('password/reset')" class="title-11 text-center mt-2 mb-2" style="display: block;">{{ $t('auth.password_forgotten') }}</nuxt-link>
          </div>
        </div>
        <div class="graybox fss" @click="gotoRegister" >
          <a>
            <nuxt-img alt="signup user icon" loading="lazy" src="/svg/signupuser_icon.svg"/>
            <span class="title-11" style="font-size: 12px;">{{$t('auth.title')}}</span>
          </a>
        </div>
        <div class="graybox" @click="regGuest">
          <a>
            <nuxt-img alt="user icon" loading="lazy" src="/svg/user_ico.svg"/>
            <span class="title-11" style="font-size: 12px;" >{{ $t('auth.guest.title') }}</span>
          </a>
        </div>
<!--        <div class="graybox" style="border:0;">-->
<!--          <a style="padding-top: 12px;">-->
<!--            <span class="title-11" style="font-size: 12px;padding-left: 0px;">{{ $t('auth.connect_via') }}</span>-->
<!--            <div class="socialbox">-->
<!--              <a class="social-item google" href="https://api.whatsgaming.net/login/google"></a>-->
<!--&lt;!&ndash;              <a class="social-item linkdin"></a>&ndash;&gt;-->
<!--&lt;!&ndash;              <a class="social-item twitter"></a>&ndash;&gt;-->
<!--            </div>-->
<!--          </a>-->
<!--        </div>-->
      </div>
    </transition>
  </li>
</template>

<script>
import useUtils from "~/composables/useUtils";
import {useAuth} from "~/composables/auth";
import {getLocaleRoutePath} from "~/plugins/i18n";
import {ref, watch} from "vue";
import {useRouter} from "#app";
import {getLocale,t} from "../../plugins/i18n";
import {useCommonStore} from "../../stores/commonStore";
import XPassword from "./el/x-password";

export default {
  name: "authpopup",
  components: {XPassword},
  props:{
    reauth:{
      default:false,
      type:Boolean
    }
  },
  async setup(props){
    const {isValidEmail} = useUtils();
    const {login, registerGuest} = useAuth();
    const authMenu = ref(false)
    const loading = ref(false)
    const login_error = ref('')
    const input_email = ref('')
    const input_password = ref('')
    const router = useRouter();
    const cmonStore = useCommonStore();
    const signIn = async () => {
      login_error.value = ''
      login_error.value = await login(input_email.value, input_password.value, loading)
      if (!login_error.value) {
        authMenu.value = false;
        useNuxtApp().$toast.success(t('auth.success'));
      }
    }
    const gotoRegister = ()=>{
      authMenu.value=false
      router.push({
        path:getLocaleRoutePath('login')
      })
    }
    const regGuest = async () => {
      await registerGuest('ps4')
      useNuxtApp().$toast.success(t('auth.success_guest'));
    }
    onMounted(()=>{
      if(props.reauth){
        authMenu.value = true;
      }else{
        $(document).mouseup((e)=> {
          var container = $("#popup_authenticate");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            // Clicked outside of the div
            authMenu.value = false;
          }
        });
      }
    })
    watch(()=>authMenu.value,(n)=>{
      if(n===false){
        cmonStore.hideAuthpopup();
        if(props.reauth){
          location.reload();
        }
      }
    })
    return {
      getLocaleRoutePath,
      isValidEmail,
      signIn,
      regGuest,
      loading,
      authMenu,
      login_error,
      input_email,
      input_password,
      gotoRegister
    }
  },
  methods:{
    signin(){
      this.login_error = '';
      if(this.input_email !== '' && this.input_password !== '') {
        if (this.isValidEmail(this.input_email)) {
          this.loading = true;
          setTimeout(()=>{{
            this.loading = false;
            this.login_error = "Login Failed";
          }},3000);
        } else {
          this.login_error = "Email Address Is Not Valid";
        }
      }
    },
    tttt(){
      alert(1);
    }
  },
  mounted() {
    // $(document).mouseup((e)=> {
    //   var container = $(".dropdown");
    //   if (!container.is(e.target) && container.has(e.target).length === 0) {
    //     // $(".dropdown__select").css('display','none');
    //   }
    // });
  }
}
</script>

<style scoped>
@import "@/public/css/components/authpopup.css";
.fss{
  margin-top: 20px;
}
.graybox:last-child{
  border:none;
}
.login_ico{
  cursor: pointer;
}
.login_ico:hover{
  filter: invert(20%) grayscale(0);
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
.onreAuth{
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>