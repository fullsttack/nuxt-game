<template>
  <div class="formbox">
    <h2>{{$t('account.settings.detail_title')}}</h2>
    <div class="divider"></div>
    <div class="current_mail_container">
      <label>{{ $t('account.settings.current_email') }}</label>
      <span>{{ user.email }}</span>
    </div>
    <div class="graybox">
      <div class="taraz">
        <nuxt-img loading="lazy" src="/images/account/ico_mail.svg"/>
        <span class="title">{{ $t('account.settings.email_confirm') }}</span>
      </div>
      <div ref="mailform">
        <div class="input_field_container">
          <label>{{ $t('account.settings.new_email') }}</label>
          <input type="email" v-model="new_email"/>
        </div>
        <div class="input_field_container">
          <label>{{$t('account.settings.confirm_email')}}</label>
          <input type="email" v-model="new_email_confirm" />
        </div>
        <div style="margin-top: 30px;"/>
        <button class="btn btn-blackpurple" @click="changeEmail">
          <template v-if="!changeMail_loading">{{ $t('account.settings.email_confirm') }}</template>
          <nuxt-img loading="lazy" v-else src="/loading_btn.svg" alt="" />
        </button>
      </div>
      <span class="errspan" v-if="new_email_error">
        {{ new_email_error }}
      </span>
    </div>

    <div class="graybox">
        <div class="taraz">
          <nuxt-img loading="lazy" src="/images/account/ico_chpass.svg"/>
          <span class="title">Change Your Password</span>
        </div>
        <div ref="passform">
          <div class="input_field_container">
            <label>{{ $t('account.password_settings.placeholder.password_cur') }}</label>
            <input type="password" v-model="cur_password"/>
          </div>
          <div class="input_field_container">
            <label>{{ $t('account.password_settings.password') }}</label>
            <input type="password" v-model="new_password"/>
          </div>
          <div class="input_field_container">
            <label>{{$t('account.password_settings.password_confirm')}}</label>
            <input type="password" v-model="new_password_confirm"/>
          </div>
          <div style="margin-top: 30px;"/>
          <button class="btn btn-blackpurple" @click="changePassword">
            <template v-if="!changPass_loading">{{ $t('title.account.password.form') }}</template>
            <nuxt-img loading="lazy" v-else src="/loading_btn.svg" alt="" />
          </button>
        </div>
        <span class="errspan" v-if="new_password_error">
          {{ new_password_error }}
        </span>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useI18n} from "vue-i18n";

export default {
  setup(){

    const user = useUserStore()
    const {isValidEmail} = useUtils();
    const { t } = useI18n({ useScope: 'global' });
    const new_email = ref('')
    const new_email_confirm = ref('')
    const new_email_error = ref('')

    const new_password = ref('')
    const new_password_confirm = ref('')
    const cur_password = ref('')
    const new_password_error = ref('')
    const changeMail_loading = ref(false);
    const changPass_loading = ref(false);
    const mailform = ref(null);
    const passform = ref(null);
    const changeEmail = () => {
      new_email_error.value = ''
      if (!isValidEmail(new_email.value)) {
        new_email_error.value = t('validation.email', {attribute: 'email'})
        return
      }
      if (new_email.value !== new_email_confirm.value) {
        new_email_error.value = t('validation.confirmed', {attribute: 'email'})
        return
      }
      api.post('account/change_email', {body_params: {email_current: user.email, email: new_email.value}, progress_ref: changeMail_loading}).then(res => {
        user.email = new_email.value
        new_email.value = ''
        new_email_confirm.value = ''
        new_email_error.value = t('ea.form.success');
        mailform.value.style.display = 'none';
      }).catch(e => {
        new_email_error.value = e.description
      })
    }

    const changePassword = () => {
      new_password_error.value = ''
      if(new_password.value === '' || (new_password.value !== new_password_confirm.value)){
        new_password_error.value = 'password_not_match';
        return;
      }else {
        api.post('account/change_password', {
          body_params: {
            password_current: cur_password.value,
            password: new_password.value
          },
          progress_ref: changPass_loading
        }).then(res => {
          new_password.value = ''
          cur_password.value = ''
          new_password_error.value = 'Success'
          passform.value.style.display = 'none';
        }).catch(e => {
          new_password_error.value = e.description
        })
      }
    }
    return {
      user,
      new_email,
      new_email_confirm,
      new_email_error,
      new_password,
      cur_password,
      new_password_error,
      changeEmail,
      changePassword,
      changeMail_loading,
      changPass_loading,
      mailform,
      passform,
      new_password_confirm
    }
  }
}
</script>

<style scoped>
@import "@/public/css/components/change_info.css";
.errspan{
  font-size: 14px;
  font-weight: 500;
  color: darkred;
}
.rtl_class .errspan{
  float:right;
}
</style>