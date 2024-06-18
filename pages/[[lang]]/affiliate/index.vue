<template>
  <TitleHeaderFootball>
    <div class="smallhead">
      {{ $t('affiliate.login.title_part_1') }} {{ $t('affiliate.login.title_part_2') }}
    </div>
  </TitleHeaderFootball>
  <ClientOnly>
    <div class="container">
      <div class="description">
        <h1>{{ $t('affiliate.login.article_title') }}</h1>
        <div v-html="t('affiliate.login.article_text')"></div>
      </div>

      <div class="become__partner">
        <b>{{ $t('affiliate.login.steps.title_2') }}</b>

        <div class="partner__reqs">
          <div v-for="i in 3" class="parntner__reqs--item">
            <div class="parntner__reqs--item-left">
              <b>{{i}}. {{ $t(`affiliate.login.steps.text_${i}`) }}</b>
              <img
                  width="355"
                  height="199"
                  :src="`/images/affiliate/afpg/parter_img${i}.webp`"
                  :alt="`partner pooster ${i}`"
              />
              <div class="partnerbody" v-html="$t(`affiliate.login.steps.text_${i}_desc`).replaceAll('font-size: 16px','')"></div>
            </div>
            <div class="parntner__reqs--item-right">
              <img
                  :width="i===2?345:370"
                  :height="i===1?140:199"
                  :src="`/images/affiliate/afpg/parter_img${i}.webp`"
                  :alt="`partner pooster ${i}`"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="register__container">
        <div class="top__container">
          <span>{{$t('affiliate.login.steps.title')}}</span>
        </div>

        <div class="partner-form__container">
          <div class="form__container">
            <div class="input-field radio">
              <div class="genders">
                <span>{{ $t('affiliate.register.form.gender_label') }}</span>
                <input type="radio" id="man" name="gender" value="1" @click="onChangeGender(1)" checked/>
                <label for="man">{{ $t('affiliate.register.form.gender_man') }}</label>
                <input type="radio" id="woman" name="gender" value="2" @click="onChangeGender(2)"/>
                <label for="Woman">{{ $t('affiliate.register.form.gender_woman') }}</label>
              </div>
            </div>
            <custom-drop-down-language
                :name="$t('affiliate.register.form.language_label').toUpperCase()"
                :options="langs"
                @selected="onChangeLanguage"
            ></custom-drop-down-language>

            <div>
              <div class="input-field" :class="{errorfield:validcation_errors_srv['first_name']!==undefined}">
                <input type="text" placeholder="" required spellcheck="false" v-model="form.first_name"/>
                <label>{{ $t('affiliate.register.form.first_name_label') }}</label>
              </div>
              <div class="error_txt" v-if="validcation_errors_srv['first_name']!==undefined">{{ validcation_errors_srv['first_name'] }}</div>
            </div>

            <div>
              <div class="input-field" :class="{errorfield:validation_errors_email!=='' || validcation_errors_srv['email']!==undefined}">
                <input type="email" placeholder="" required spellcheck="false" v-model.trim="form.email"/>
                <label>{{ $t('affiliate.register.form.email_label') }}</label>
              </div>
              <div class="error_txt" v-if="validation_errors_email!==''">{{ validation_errors_email }}</div>
              <div class="error_txt" v-if="validcation_errors_srv['email']!==undefined">{{ validcation_errors_srv['email'] }}</div>
            </div>

            <div >
              <div class="input-field" :class="[{errorfield:validation_errors_password!==''},{errorfield:validcation_errors_srv['password']!==undefined}]">
                <input
                    type="password"
                    placeholder=""
                    required
                    spellcheck="false"
                    v-model="form.password"
                />
                <label>{{ $t('affiliate.login.form.password_label') }}</label>
              </div>
              <div class="error_txt" v-if="validation_errors_password!==''">{{validation_errors_password}}</div>
              <div class="error_txt" v-else-if="validcation_errors_srv['password']!==undefined">{{validcation_errors_srv['password']}}</div>
            </div>

            <div class="input-field" :class="[{passconfirm:form.password!=='' && form.password === form.password_confirm},{errorfield:validation_errors_password!==''}]">
              <input type="password" required spellcheck="false" v-model="form.password_confirm"/>
              <label>{{ $t('affiliate.register.form.confirm_password_label') }}</label>
            </div>
            <div v-if="!isPhone">
              <custom-drop-down-adv :class="{moreadv:num !== 1}" v-for="num in form.advertising.length" :key="num" :num="num" :name="$t('affiliate.register.form.adv_space_label') + ' ' + num" name="ADD ADV SPACE" :options="spaces" :form.sync="form" v-model:errorz="validcation_errors_srv"></custom-drop-down-adv>
            </div>
            <div class="adv-phone" v-if="isPhone" style="padding: 0;margin-bottom: 15px;">
              <!--              <custom-drop-down-aff-desc-->
              <!--                name="Add Adv Space"-->
              <!--                :options="spaces"-->
              <!--              ></custom-drop-down-aff-desc>-->
              <custom-drop-down-adv :class="{moreadv:num !== 1}" v-for="num in form.advertising.length" :key="num" :num="num" :name="$t('affiliate.register.form.adv_space_label') + ' ' + num" name="ADD ADV SPACE" :options="spaces" :form.sync="form" v-model:errorz="validcation_errors_srv"></custom-drop-down-adv>
              <div class="button border addmorebtn" @click="addAdv">
                <nuxt-img loading="lazy" alt="add more" src="/images/affiliate/add_more.svg"/>
                <span>{{ $t('affiliate.register.form.btn_add_more') }}</span>
              </div>
            </div>
            <custom-drop-down-aff
                :name="$t('affiliate.register.form.payment_label')"
                :options="pay_systems"
                @selected="onChangePayment"></custom-drop-down-aff>

            <div>
              <div class="button" @click="register">
                <nuxt-img loading="lazy" alt="loading icon btn" v-if="loading_register" src="/loading_btn.svg" />
                <template v-else>{{ $t('auth.continue') }}</template>
              </div>
              <div class="terms">
                <input type="checkbox" name="" id="" v-model="termModal" />
                <div :class="{errterms:termAccepted===false}">{{ $t('affiliate.login.form.confirm_text') }}</div>
              </div>
            </div>

            <div class="button border addmorebtn" @click="addAdv" :style="'margin-top:'+advpos+'px;'">
              <nuxt-img loading="lazy" alt="add more" src="/images/affiliate/add_more.svg"/>
              <span>{{ $t('affiliate.register.form.btn_add_more') }}</span>
            </div>


          </div>
        </div>
      </div>

      <div class="login__container">
        <div class="top__container">
          <span>{{ $t('affiliate.login.form.title') }}</span>
        </div>

        <div class="form__container">
          <div class="input-field">
            <input type="text" required spellcheck="false" v-model.trim="login_form.email"/>
            <label>{{ $t('auth.email') }}</label>
          </div>
          <div class="input-field">
            <input type="password" required spellcheck="false" v-model="login_form.password" />
            <label>{{ $t('auth.password') }}</label>
          </div>
          <div class="loginbtn-container">
            <div class="button__container button loginbtn" @click="login">
              <nuxt-img loading="lazy" alt="loading icon btn" v-if="loading_login" src="/loading_btn.svg" />
              <div v-else>{{ $t('auth.login_button') }}</div>
            </div>
            <nuxt-link style="margin-top: 5px;" :to="getLocaleRoutePath('password/reset_affiliate')" class="forget-password">{{ $t('auth.password_forgotten') }}</nuxt-link>
          </div>
        </div>
        <div class="alert alert-danger" v-if="error_login_msg !==''">
          {{error_login_msg}}
        </div>
      </div>
    </div>
  </ClientOnly>
 <div class="container faq-affiliate">
   <div class="faq-affiliate-title">
     <nuxt-img loading="lazy" src="/svg/FAQ.svg" class="mr-2" alt="FAQ" width="42" height="42"/>
     <h2 class="text-color d-inline-block font-weight-bold mb-4 faq-title">
       {{ $t('faq_affiliate.title') }}
     </h2>
   </div>
   <Questions :category="'affiliate'"/>
 </div>
</template>
<script>
import TitleHeaderFootball from "../../../components/blocks/TitleHeaderFootball";
import CustomDropDownAff from "../../../components/affiliate/CustomDropDownAff";
import useUtils, {makeMeta} from "../../../composables/useUtils";
import {getLocaleRoutePath, supportedLanguages} from "../../../plugins/i18n";
import {reactive, ref,computed,onMounted} from "vue";
import {useAuthAffiliate} from "../../../composables/auth_affiliate";
import {SSRRequest} from "../../../composables/SSRRequest";
import CustomDropDownLanguage from "../../../components/affiliate/CustomDropDownLanguage";
import {t} from "~/plugins/i18n";
import CustomDropDownAdv from "../../../components/affiliate/CustomDropDownAdv";
import {useAffiliateStore} from "../../../stores/affiliateStore";
import Questions from "../../../components/Questions";
export default {
  async setup(){
    const route = useRoute();
    const isPhone = ref(false);
    const termAccepted = ref(true);
    const termModal = ref(false)
    useHead(makeMeta(route.path,t('affiliate.meta.title'), t('affiliate.meta.description')))
    definePageMeta({
      middleware: [
        (to, from) => {
          const affiliate = useAffiliateStore()
          if (affiliate.id) {
            return getLocaleRoutePath('affiliate/dashboard')
          }
        },
      ]
    })
    const {isValidEmail,removeHtml} = useUtils();
    const spaces = [
      {
        name: "Website",
        value: 1,
      },
      {
        name: "YouTube",
        value: 2,
      },
      {
        name: "FaceBook",
        value: 3,
      },
      {
        name: "Instagram",
        value: 4,
      },
      {
        name: "Twitter",
        value: 5,
      },
      {
        name: "Twitch",
        value: 6,
      }
      ,{
        name: "TikTok",
        value: 7,
      }
    ]

    const langs = supportedLanguages()
    const form = reactive({
      password: '',
      password_confirm: '',
      email: '',
      language_id: 1,
      payment_id: 1,
      phone: '',
      first_name: '',
      gender_id: 1,
      advertising: [],
    })
    const loading_register = ref(false)

    const pay_systems = ref([])
    const pay_system = ref({})
    const register_error = ref('')
    const validation_errors_email = ref('')
    const validation_errors_password = ref('')
    const validcation_errors_srv = ref('');
    const {loginAffiliate, registerAffiliate} = useAuthAffiliate();
    const getPaySystems = () => {
      api_affiliate.get('affiliate/pay_systems').then(res => {
        pay_systems.value = res.data
        pay_system.value = pay_systems.value[0]
      })
    }

    const onChangePayment = (val) => {
      form.payment_id = val;
    }
    const onChangeLanguage = (val) => {
      form.language_id = val.id;
    }
    const onChangeGender = (val) => {
      form.gender_id = val;
    }
    const addAdv = () => {
      form.advertising.push({space_id:0,link:''});
    }
    addAdv()
    const register = async () => {
      validation_errors_email.value = ''
      validation_errors_password.value = ''
      termAccepted.value = true;
      if(termModal.value === false){
        termAccepted.value = false;
        return;
      }
      if(form.password === ""){
        validation_errors_password.value= 'Password Required';
        return;
      }
      if (form.password !== form.password_confirm) {
        validation_errors_password.value = t('validation.confirmed', {attribute: 'password'})
        return;
      }
      if (!isValidEmail(form.email)) {
        validation_errors_email.value = t('validation.email', {attribute: 'email'})
        return
      }
      form.phone = "123456789";
      loading_register.value = true;
      register_error.value = await registerAffiliate(form);

      loading_register.value = false;
      if (!register_error.value) {
        validcation_errors_srv.value = [];
        const router = useRouter();
        router.push(getLocaleRoutePath('affiliate/dashboard'))
      }else{
        validcation_errors_srv.value =  register_error.value.errorz;
      }
    }

    const loading_login = ref(false)
    const error_login_msg = ref('')
    const login_form = reactive({
      email: '',
      password: '',
    })
    const login = async () => {
      error_login_msg.value = ''
      if (!isValidEmail(login_form.email)) {
        error_login_msg.value = t('validation.email', {attribute: 'email'})
        return
      }
      error_login_msg.value = await loginAffiliate(login_form.email, login_form.password, loading_login)
      if (!error_login_msg.value) {
        const router = useRouter();
        router.push(getLocaleRoutePath('affiliate/dashboard'))
      }
    }
    getPaySystems()
    const advpos = computed(()=>{
      if(form.advertising.length === 1){
        return 0;
      }
      return ((form.advertising.length - 1) * (58 + 50));
    })
    return {
      getLocaleRoutePath,
      spaces,
      langs,
      form,
      loading_register,
      pay_systems,
      pay_system,
      onChangePayment,
      onChangeLanguage,
      onChangeGender,
      addAdv,
      register,
      register_error,
      validation_errors_email,
      validation_errors_password,
      validcation_errors_srv,
      loading_login,
      error_login_msg,
      login_form,
      login,
      removeHtml,
      advpos,
      isPhone,
      termAccepted,
      termModal,
      t
    };
  },
  mounted() {
    this.isPhone = window.innerWidth < 800;
  },
  computed: {
    getSectionMargin: function () {
      return this.sectionMargin;
    },

    getScreenWidth: function () {
      var screenWidth = window.innerWidth;
      return screenWidth;
    },
  },

  components: {
    Questions,
    CustomDropDownAdv,
    CustomDropDownLanguage,
    CustomDropDownAff,
    TitleHeaderFootball
  },
};
</script>
<style scoped>
@import "@/public/css/pages/affiliate_login_new.css";
</style>
<style>
.error_txt{
  font-size:12px !important;
  font-weight: 600  !important;
  color:red !important;
}
.errorfield{
  border: 2px solid red;
}
.rtl_class .error_txt{
  text-align: right;
}
@media(max-width: 800px){
  .errorfield{
    margin-bottom: 10px;
  }
  .error_txt{
    margin-top: 5px;
  }
}
</style>