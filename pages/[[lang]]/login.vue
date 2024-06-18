<template>
  <div>
    <TitleHeaderFootball>
      {{ $t('title.login') }}
    </TitleHeaderFootball>
    <div class="container">
      <div class="top__container">
        <ul>
          <li :class="{ active: page == 1 }" @click="page = 1">
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  v-if="page == 1"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.88609 0H14.9254C17.445 0 19.5 2 19.5 4.44V15.56C19.5 18.01 17.445 20 14.9047 20H9.87576C7.35611 20 5.29083 18.01 5.29083 15.57V10.77H11.6932L10.041 12.37C9.73119 12.67 9.73119 13.16 10.041 13.46C10.1959 13.61 10.4024 13.68 10.6089 13.68C10.8051 13.68 11.0117 13.61 11.1666 13.46L14.1819 10.55C14.3368 10.41 14.4194 10.21 14.4194 10C14.4194 9.8 14.3368 9.6 14.1819 9.46L11.1666 6.55C10.8568 6.25 10.3508 6.25 10.041 6.55C9.73119 6.85 9.73119 7.34 10.041 7.64L11.6932 9.23H5.29083V4.45C5.29083 2 7.35611 0 9.88609 0ZM0.5 9.9999C0.5 9.5799 0.855229 9.2299 1.2815 9.2299H5.29052V10.7699H1.2815C0.855229 10.7699 0.5 10.4299 0.5 9.9999Z"
                  fill="#201D56"
              />
              <path
                  v-else
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.88609 0H14.9254C17.445 0 19.5 2 19.5 4.44V15.56C19.5 18.01 17.445 20 14.9047 20H9.87576C7.35611 20 5.29083 18.01 5.29083 15.57V10.77H11.6932L10.041 12.37C9.73119 12.67 9.73119 13.16 10.041 13.46C10.1959 13.61 10.4024 13.68 10.6089 13.68C10.8051 13.68 11.0117 13.61 11.1666 13.46L14.1819 10.55C14.3368 10.41 14.4194 10.21 14.4194 10C14.4194 9.8 14.3368 9.6 14.1819 9.46L11.1666 6.55C10.8568 6.25 10.3508 6.25 10.041 6.55C9.73119 6.85 9.73119 7.34 10.041 7.64L11.6932 9.23H5.29083V4.45C5.29083 2 7.35611 0 9.88609 0ZM0.5 9.9999C0.5 9.5799 0.855229 9.2299 1.2815 9.2299H5.29052V10.7699H1.2815C0.855229 10.7699 0.5 10.4299 0.5 9.9999Z"
                  fill="#AAAAAA"
              />
            </svg>

            <span>{{ $t('account.login') }}</span>
          </li>

          <li :class="{ active: page == 2 }" @click="page = 2">
            <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  v-if="page == 2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.41016 10.5537C11.1647 10.5537 13.3728 8.31705 13.3728 5.52684C13.3728 2.73663 11.1647 0.5 8.41016 0.5C5.65559 0.5 3.44752 2.73663 3.44752 5.52684C3.44752 8.31705 5.65559 10.5537 8.41016 10.5537ZM8.41016 13.0152C4.36438 13.0152 0.910156 13.6621 0.910156 16.2464C0.910156 18.8298 4.34336 19.5 8.41016 19.5C12.4549 19.5 15.9102 18.8531 15.9102 16.2687C15.9102 13.6844 12.477 13.0152 8.41016 13.0152ZM18.8081 7.58786H20.0112C20.5064 7.58786 20.9102 7.99731 20.9102 8.49948C20.9102 9.00165 20.5064 9.4111 20.0112 9.4111H18.8081V10.5884C18.8081 11.0906 18.4054 11.5 17.9091 11.5C17.4139 11.5 17.0102 11.0906 17.0102 10.5884V9.4111H15.8091C15.3129 9.4111 14.9102 9.00165 14.9102 8.49948C14.9102 7.99731 15.3129 7.58786 15.8091 7.58786H17.0102V6.41162C17.0102 5.90945 17.4139 5.5 17.9091 5.5C18.4054 5.5 18.8081 5.90945 18.8081 6.41162V7.58786Z"
                  fill="#201D56"
              />
              <path
                  v-else
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.41016 10.5537C11.1647 10.5537 13.3728 8.31705 13.3728 5.52684C13.3728 2.73663 11.1647 0.5 8.41016 0.5C5.65559 0.5 3.44752 2.73663 3.44752 5.52684C3.44752 8.31705 5.65559 10.5537 8.41016 10.5537ZM8.41016 13.0152C4.36438 13.0152 0.910156 13.6621 0.910156 16.2464C0.910156 18.8298 4.34336 19.5 8.41016 19.5C12.4549 19.5 15.9102 18.8531 15.9102 16.2687C15.9102 13.6844 12.477 13.0152 8.41016 13.0152ZM18.8081 7.58786H20.0112C20.5064 7.58786 20.9102 7.99731 20.9102 8.49948C20.9102 9.00165 20.5064 9.4111 20.0112 9.4111H18.8081V10.5884C18.8081 11.0906 18.4054 11.5 17.9091 11.5C17.4139 11.5 17.0102 11.0906 17.0102 10.5884V9.4111H15.8091C15.3129 9.4111 14.9102 9.00165 14.9102 8.49948C14.9102 7.99731 15.3129 7.58786 15.8091 7.58786H17.0102V6.41162C17.0102 5.90945 17.4139 5.5 17.9091 5.5C18.4054 5.5 18.8081 5.90945 18.8081 6.41162V7.58786Z"
                  fill="#AAAAAA"
              />
            </svg>

            <span>{{ $t('account.register') }}</span>
          </li>

<!--          <li :class="{ active: page == 3 }" @click="page = 3">-->
<!--            <svg-->
<!--                width="21"-->
<!--                height="20"-->
<!--                viewBox="0 0 21 20"-->
<!--                fill="none"-->
<!--                xmlns="http://www.w3.org/2000/svg"-->
<!--            >-->
<!--              <path-->
<!--                  v-if="page == 3"-->
<!--                  d="M20.1424 0.581983C19.6422 0.0685981 18.9019 -0.122663 18.2116 0.0786645L2.11503 4.75952C1.38673 4.96186 0.870518 5.54269 0.731461 6.28055C0.589403 7.0315 1.08561 7.98479 1.73387 8.38342L6.76693 11.4768C7.28314 11.7939 7.94942 11.7144 8.37659 11.2835L14.14 5.4843C14.4301 5.18231 14.9103 5.18231 15.2004 5.4843C15.4905 5.77623 15.4905 6.24935 15.2004 6.55134L9.42702 12.3516C8.99885 12.7814 8.91881 13.4508 9.23394 13.9702L12.3092 19.0538C12.6693 19.6577 13.2896 20 13.9699 20C14.0499 20 14.14 20 14.22 19.9899C15.0003 19.8893 15.6206 19.3558 15.8507 18.6008L20.6226 2.52479C20.8327 1.84028 20.6426 1.09537 20.1424 0.581983Z"-->
<!--                  fill="#201D56"-->
<!--              />-->
<!--              <path-->
<!--                  v-else-->
<!--                  d="M20.1424 0.581983C19.6422 0.0685981 18.9019 -0.122663 18.2116 0.0786645L2.11503 4.75952C1.38673 4.96186 0.870518 5.54269 0.731461 6.28055C0.589403 7.0315 1.08561 7.98479 1.73387 8.38342L6.76693 11.4768C7.28314 11.7939 7.94942 11.7144 8.37659 11.2835L14.14 5.4843C14.4301 5.18231 14.9103 5.18231 15.2004 5.4843C15.4905 5.77623 15.4905 6.24935 15.2004 6.55134L9.42702 12.3516C8.99885 12.7814 8.91881 13.4508 9.23394 13.9702L12.3092 19.0538C12.6693 19.6577 13.2896 20 13.9699 20C14.0499 20 14.14 20 14.22 19.9899C15.0003 19.8893 15.6206 19.3558 15.8507 18.6008L20.6226 2.52479C20.8327 1.84028 20.6426 1.09537 20.1424 0.581983Z"-->
<!--                  fill="#AAAAAA"-->
<!--              />-->
<!--            </svg>-->

<!--            <span>{{ $t('account.connect_via') }}</span>-->
<!--          </li>-->
        </ul>
      </div>

      <div v-if="page === 1" class="form__container">
        <div class="input-field">
          <input type="email" required spellcheck="false" v-model.trim="input_email" style="margin-bottom: 15px;"/>
          <label>{{ $t('auth.email') }}</label>
          <nuxt-link :to="getLocaleRoutePath('password/reset')" style="font-weight: 500;">{{ $t('auth.password_forgotten') }}</nuxt-link>
        </div>
<!--        <div class="input-field">-->
<!--          <input type="password" required spellcheck="false" v-model="input_password"/>-->
<!--          <label>{{ $t('auth.password') }}</label>-->
<!--        </div>-->
        <x-password-e-l :title="$t('auth.password')" v-model:model-value="input_password" />
        <div class="button__container">
          <div @click="signIn" class="button cancel">
            <nuxt-img loading="lazy" alt="loading icon btn" v-if="loading" src="/loading_btn.svg" />
            <template v-else>{{ $t('auth.login_button') }}</template>
          </div>

        </div>

      </div>

      <div v-else-if="page === 2" >
        <div class="form__container">
          <div class="input-field">
            <input type="email" required spellcheck="false" v-model="input_email_register"/>
            <label>{{ $t('auth.email') }}</label>
          </div>
<!--          <div class="input-field">-->
<!--            <input type="password" required spellcheck="false" v-model="input_password_register"/>-->
<!--            <label>{{ $t('auth.password') }}</label>-->
<!--          </div>-->
<!--          <div class="input-field">-->
<!--            <input type="password" required spellcheck="false" v-model="input_password_confirm_register"/>-->
<!--            <label>{{ $t('auth.password_confirm') }}</label>-->
<!--          </div>-->
          <x-password-e-l :title="$t('auth.password')" v-model:model-value="input_password_register" />
          <x-password-e-l :title="$t('auth.password_confirm')" v-model:model-value="input_password_confirm_register" />
          <div v-if="isPhone">
              <span class="conditions" id="conditiondiv">
              <div class="round">
                <input type="checkbox" id="checkbox" v-model="acceptTerms" />
                <label for="checkbox"></label>
              </div>
              <span>
                I accept
                <nuxt-link :to="urlwithLocal('pages/conditions')" target="_blank">Terms and conditions</nuxt-link>
                And
                <nuxt-link :to="urlwithLocal('pages/privacy')" target="_blank">Privacy Notice</nuxt-link>
              </span>
            </span>
          </div>
          <div class="button__container">
            <div @click="reg" class="button cancel">
              <nuxt-img loading="lazy" alt="loading icon btn" v-if="loading" src="/loading_btn.svg" />
              <template v-else>{{ $t('auth.register_button') }}</template>
            </div>
          </div>

        </div>
        <div v-if="!isPhone">
          <span class="conditions" id="conditiondiv">
          <div class="round">
            <input type="checkbox" id="checkbox" v-model="acceptTerms" />
            <label for="checkbox"></label>
          </div>
          <span>
            I accept
            <nuxt-link :to="urlwithLocal('pages/conditions')" target="_blank">Terms and conditions</nuxt-link>
            And
            <nuxt-link :to="urlwithLocal('pages/privacy')" target="_blank">Privacy Notice</nuxt-link>
          </span>
        </span>
        </div>
      </div>

<!--      <div v-else-if="page === 3" class="form__container">-->
<!--        <div class="social__container">-->
<!--          <a href="https://api.whatsgaming.net/login/google">-->
<!--            <svg-->
<!--                width="50"-->
<!--                height="50"-->
<!--                viewBox="0 0 50 50"-->
<!--                fill="none"-->
<!--                xmlns="http://www.w3.org/2000/svg"-->
<!--                xmlns:xlink="http://www.w3.org/1999/xlink"-->
<!--            >-->
<!--              <rect width="50" height="50" fill="url(#pattern0)" />-->
<!--              <defs>-->
<!--                <pattern-->
<!--                    id="pattern0"-->
<!--                    patternContentUnits="objectBoundingBox"-->
<!--                    width="1"-->
<!--                    height="1"-->
<!--                >-->
<!--                  <use-->
<!--                      xlink:href="#image0_1843_1634"-->
<!--                      transform="scale(0.00195312)"-->
<!--                  />-->
<!--                </pattern>-->
<!--                <image-->
<!--                    id="image0_1843_1634"-->
<!--                    width="512"-->
<!--                    height="512"-->
<!--                    xlink:href="data:image/png;base64,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"-->
<!--                />-->
<!--              </defs>-->
<!--            </svg>-->
<!--          </a>-->

<!--          <a v-if="0" href="https://api.whatsgaming.net/login/linkedin">-->
<!--            <svg-->
<!--                width="50"-->
<!--                height="50"-->
<!--                viewBox="0 0 50 50"-->
<!--                fill="none"-->
<!--                xmlns="http://www.w3.org/2000/svg"-->
<!--            >-->
<!--              <path-->
<!--                  d="M42.6023 42.6031H35.1939V31.0009C35.1939 28.2343 35.1445 24.6728 31.3408 24.6728C27.4822 24.6728 26.8918 27.6872 26.8918 30.7995V42.6023H19.4836V18.7437H26.5955V22.0042H26.6951C27.4069 20.7872 28.4353 19.7861 29.6711 19.1074C30.9068 18.4287 32.3034 18.0978 33.7123 18.1501C41.2211 18.1501 42.6055 23.0892 42.6055 29.5146L42.6023 42.6031ZM11.1242 15.4825C8.74981 15.4829 6.82461 13.5583 6.82422 11.1839C6.82383 8.8095 8.74824 6.8843 11.1227 6.88391C13.4971 6.88333 15.4223 8.80794 15.4227 11.1824C15.4229 12.3226 14.9701 13.4162 14.164 14.2227C13.3579 15.0291 12.2645 15.4823 11.1242 15.4825ZM14.8285 42.6032H7.4123V18.7437H14.8283V42.6031L14.8285 42.6032ZM46.2957 0.00363904H3.68965C1.67598 -0.0190172 0.0246094 1.59407 0 3.60774V46.3915C0.0238281 48.4062 1.675 50.0208 3.68945 49.9997H46.2957C48.3145 50.0247 49.9721 48.4101 50 46.3915V3.60442C49.9713 1.58684 48.3135 -0.0260485 46.2957 0.000318729"-->
<!--                  fill="#0A66C2"-->
<!--              />-->
<!--            </svg>-->
<!--          </a>-->

<!--          <a v-if="0" href="https://api.whatsgaming.net/login/twitter">-->
<!--            <svg-->
<!--                width="52"-->
<!--                height="52"-->
<!--                viewBox="0 0 52 52"-->
<!--                fill="none"-->
<!--                xmlns="http://www.w3.org/2000/svg"-->
<!--                xmlns:xlink="http://www.w3.org/1999/xlink"-->
<!--            >-->
<!--              <rect width="52" height="52" fill="url(#pattern1)" />-->
<!--              <defs>-->
<!--                <pattern-->
<!--                    id="pattern1"-->
<!--                    patternContentUnits="objectBoundingBox"-->
<!--                    width="1"-->
<!--                    height="1"-->
<!--                >-->
<!--                  <use-->
<!--                      xlink:href="#image0_1843_1635"-->
<!--                      transform="scale(0.00195312)"-->
<!--                  />-->
<!--                </pattern>-->
<!--                <image-->
<!--                    id="image0_1843_1635"-->
<!--                    width="512"-->
<!--                    height="512"-->
<!--                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARBSURBVHgB7ZlbbFRFGMf/57bZbUultFZKkLYiRNCa8IASwUuiKZdo1PBA+kDqLT4YTdBE44UYwYQEn0ATjfH2IlFIMCU+GR6klhrBKCool2K7uwECpd3Ssu3u2XMZvjl9gMBCZ+Z0YXezv+Qku5s5c+Z/vm++y6wGIvpdpsXR3G3QtBX0tR4lBUuBocdi5oZsRyyuTYrx9kFDM0oZDQnT99t1x/C2lrwYDkOzqxlbdfr4OMoG9rBOykpsz9yQeh1lRkVQsVMRVOxUBBU7Jm4BMy0Nz841sLxBR2NUw5AN/HTWRfegj7NZlnf8BYcJza0ZO9NiI4lFtRqOjgkPz8vL8y1sud8KFnk18XEf20+4+KTPCb7XRbRgfEMEePPvnND8UoKST1XRxDZ2Jj2o8P69EbqsKcd1nXIRNTQ82qhj3AUe3JtBYkJsmcIut3K2gTkxDd88EKVaNovvJUV1zDOFxHCemXt5WS8csAMxC2o09Am8e+GgMDs26SIRuuPbZVFsXByBDJva5MZzdpOl1swxcO7pKvD+QATloPDBfRbaZup46y97SndYcbuBu6rFFnQla8lSfObnyEp9aV/oHmELpXL5Hmjgj5UxvLPIQlP0+guuj8iL4fDItq43ix0JV/geYUHdg17e0Mmj1YfkTr8+EcXnSyN4qMG4ZswseW8LeJsi2w+n5faqsMuNkZhPKZy+e529c2eVjhdb+WVhgNzjYMrHnyMe/hllmKHo2CoJQupRHx1zsbrJxJK6Gxu2tUYPrnXzwuXtway8JGGX62wxsX2Jhc9OOugfD5dcRRlz5J8j/Ao9mruT3KmzFTeN5EQBLfTjGU+4npoOjl/0MTBeQEGjJOarfvHwGZZDI2J552qk2oct/zk4OKz2IFl2xNVenpQgbqUne7LYc7qwluJV98+DagWwdIOXyjGs7bWx/jeb9lVhhH3xv4OsoiMoJYojq6pwT61aOTMVyQkfX/arWYej1IK/d9hGodh23MFwTj2aKgnaQ/XV5iNiHaQM+897+LgvnBsr1yabKeLZ5OevLqBKOxbe/c5RmbP+QHjLS7Xg+Wiu1tF+hx7UeI9Qy5zvrGAqRih6Lt+bxYl0+JQQ+hgrQSF29ykPGZ8pieH7ZfW+6RHDCVUO86butYUWXrnbRI0pL4bnm1XdNk6mpy9ZCwlaOsvAQgrTvHXTaN1tt+lY00S/zVA38NcDLt44lEPand76UEjQ7ykPi2tNbKRjqNbqcAGAd76b/s3hl/OFKaGkgwK3zEvzTSwjqzVGxcSdyTB0Ubm0K+li/1Bha0HlKEfngMFRbgt1pm21emA5fjiYo+AwQikqmfFxjE5ZD496OEpt+M1qPEKH7WKj8ndKsVMRVOxUBBU7ZSloGOXDEAnSelAuMNarexO51xlDAiUO1+Axd4OO5+viPnMeo5JxF1VcJed+k2tmXT78dnTUxS8BsrqOcUgtHCgAAAAASUVORK5CYII="-->
<!--                />-->
<!--              </defs>-->
<!--            </svg>-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->

      <div v-if="error" class="err">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "~/components/blocks/TitleHeaderFootball.vue";
import {useI18n} from "vue-i18n";
import {makeMeta,urlwithLocal} from "~/composables/useUtils";
import {getLocaleRoutePath} from "~/plugins/i18n";
import {useAuth} from "~/composables/auth";
import {computed, ref} from "vue";
import {t} from "~/plugins/i18n";
import {getLocale} from "../../plugins/i18n";
import XPasswordEL from "../../components/embeded/el/x-passwordEL";
export default {
  components: {XPasswordEL, TitleHeaderFootball},

  async setup(){
    const route = useRoute();

    useHead(makeMeta(route.path,t('title.login'), t('meta-description.login'),false,true))

    definePageMeta({
      middleware: [
        (to, from) => {
          const user = useUserStore()
          if (user.email) {
            return getLocaleRoutePath('')
          }
        },
      ]
    })

    const {login, register} = useAuth();
    const router = useRouter()

    const input_email = ref('')
    const input_password = ref('')
    const input_email_register = ref('')
    const input_password_register = ref('')
    const input_password_confirm_register = ref('')
    const error = ref('')
    const loading = ref(false)

    const acceptTerms = ref(false);
    const signIn = async () => {
      loading.value = true;
      error.value = await login(input_email.value, input_password.value, loading)
      if (!error.value) {
        useNuxtApp().$toast.success("You are successfully logged in");
        var lang =  getLocale();
        router.push({path: lang === 'en' ? '/' : '/' + lang});
      }
      loading.value = false;
    }

    const reg = async () => {
      if(acceptTerms.value) {
        if (input_password_register.value !== input_password_confirm_register.value) {
          error.value = t('validation.confirmed', {attribute: 'password'});
          return;
        }
        loading.value = true;
        error.value = await register(input_email_register.value, input_password_register.value, 'ps4', loading)
        if (!error.value) {
          var lang =  getLocale();
          router.push({path: lang === 'en' ? '/' : '/' + lang});
        }
        loading.value = false;
      }else{
        document.getElementById('conditiondiv').classList.add('shakeazz');
        setTimeout(()=>{
          document.getElementById('conditiondiv').classList.remove('shakeazz');
        },1500);
      }
    }
    const isPhone = computed(()=>{
      return window.innerWidth < 800;
    })
    return {
      getLocaleRoutePath,
      input_email,
      input_password,
      input_email_register,
      input_password_register,
      input_password_confirm_register,
      error,
      loading,
      signIn,
      reg,
      urlwithLocal,
      acceptTerms,
      isPhone
    }
  },

  data: () => {
    return {
      page: 1,
    };
  },
  watch:{
    page:function (n){
      this.error = '';
    }
  }
}
</script>

<style scoped>
@import "@/public/css/pages/login.css";
.err{
  padding-left: 40px;
  color: red;
  font-weight: 500;
}
.form__container .button__container .button:hover{
  background-color: #219b98;
  transition: 0.3s ease;
}
@media (max-width: 768px){
  .err{
    padding: 0;
  }
}
</style>