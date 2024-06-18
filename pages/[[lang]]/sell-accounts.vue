<template>
  <div>
    <TitleHeaderFootball>
      {{ $t('sell_account.title_part_1') + ' ' + $t('sell_account.title_part_2') }}
    </TitleHeaderFootball>
    <div class="container" style="min-height: 550px;">
      <div class="section__container">
        <div
            class="section"
            :style="{ 'margin-left': getSectionMargin + '%' }"
            :class="{ active: page == 1 }"
        >
          <div class="section--title">
            <div class="section--title_number">1</div>
            <span>{{ $t('sell_account.tab1.title') }}</span>
          </div>

          <div class="section--description">
            {{ $t('sell_account.tab1.desc') }}
          </div>
        </div>

        <div class="section" :class="{ active: page == 2 }">
          <div class="section--title">
            <div class="section--title_number">2</div>
            <span>{{ $t('sell_account.tab2.form.title') }}</span>
          </div>

          <div class="section--description">{{ $t('sell_account.tab2.desc') }}</div>
        </div>

        <div class="section" :class="{ active: page == 3 }">
          <div class="section--title">
            <div class="section--title_number">3</div>
            <span>{{ $t('sell_account.tab3.form.title') }}</span>
          </div>

          <div class="section--description">
            {{ $t('sell_account.tab3.desc') }}
          </div>
        </div>

        <div class="section" :class="{ active: page == 4 }">
          <div class="section--title">
            <div class="section--title_number">4</div>
            <span>{{ $t('sell_account.tab4.form.title') }}</span>
          </div>

          <div class="section--description">
            {{ $t('sell_account.tab4.desc') }}
          </div>
        </div>
      </div>

      <div v-if="page == 1" class="row">
        <div class="col-md-6 left__container">
          <div class="title">{{ $t('sell_account.tab1.form.title') }}</div>
          <div class="content">
            <form>
              <sellcoin-err-view :errors.sync="errors"></sellcoin-err-view>
              <div class="input-field">
                <input type="text" v-model.trim="accountInfo.email_contact" required spellcheck="false" />
                <label style="font-size: 17px">{{ $t('sell_account.tab1.form.email') }}*</label>
              </div>

              <CustomDropDown :options="pay_options" @selected="changePayMethod"></CustomDropDown>

              <div class="input-field select">
                <input type="text" v-model.trim="accountInfo.payment_email" required spellcheck="false" />
                <label style="font-size: 17px">{{ $t('sell_account.tab1.form.pay_email') }}</label>
              </div>

              <div class="button__container">
                <div @click="nextPage" class="button">{{ $t('sell_account.tab1.form.btn_next') }}</div>
              </div>

            </form>
          </div>
        </div>
        <div class="col-md-6 right__container">
          <div class="information">
            <h2 class="information--title">{{ $t('sell_account.tab1.how_sell.title') }}</h2>

            <div class="information--content">
              <div class="info">
                <span class="text">
                  <span class="number" style="float:left;">1</span>
                  <span  v-html="$t('sell_account.tab1.how_sell.text_1')"></span>
                </span>
              </div>

              <div class="info">
                <span class="text">
                  <span class="number" style="float:left;">2</span>
                  <span v-html="$t('sell_account.tab1.how_sell.text_2')"></span>
                </span>
              </div>

              <div class="info">
                <span class="text">
                  <span class="number" style="float:left;">3</span>
                   <span v-html="$t('sell_account.tab1.how_sell.text_3')"></span>
                </span>
              </div>
            </div>
          </div>

          <div class="information">
            <div class="information--title">
              {{ $t('sell_account.tab1.how_unlock.title') }}
            </div>

            <div class="information--content">
              <div class="info">
                <span class="text" style="color:black;float:left;" v-html="$t('sell_account.tab1.how_unlock.text_1')">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="page == 2" class="row">
        <div class="col-lg-6 left__container">
          <h2 class="title">{{ $t('sell_account.tab2.form.title') }}</h2>
          <div class="content">
            <form>
              <sellcoin-err-view :errors.sync="errors"></sellcoin-err-view>
              <div class="input-field">
                <input type="text" v-model="accountInfo.email" required spellcheck="false" />
                <label>{{ $t('sell_account.tab2.form.ea_email') }}</label>
              </div>

              <div class="input-field">
                <input type="password" v-model="accountInfo.password" required spellcheck="false" />
                <label>{{ $t('sell_account.tab2.form.ea_password') }}</label>
              </div>

              <div class="input-click">
                <b>{{ $t('ea.form.platform') }}</b>
                <div class="platform__container">
                  <div :class="{platform:1, active: item.name === this.accountInfo.platform_name}" v-for="item in platforms" :key="item.name" @click="changePlatform(item)">
                    <nuxt-img loading="lazy" :src="item.icon" alt="platform icon" />
                  </div>
                </div>
              </div>

              <div class="double-input">
                <div class="input-click">
                  <b>{{ $t('sell_account.tab2.form.value') }}</b>
                  <div class="input-field">
                    <nuxt-img loading="lazy" src="/svg/icon-awesome-coins-gold.svg" alt="gold icon"/>
                    <input type="text" v-model="accountInfo.coins" required spellcheck="false" @keypress="onlyNumbers" @input="onlyNumbers"/>
                  </div>
                </div>

                <div class="input-click">
                  <b>Estimated money</b>
                  <div class="input-field">
                    <nuxt-img loading="lazy" src="/svg/icon-awesome-money-bill-wave-alt.svg" alt=""/>
                    <span class="abs">$</span>
                    <input type="text" :value="amount" disabled spellcheck="false" />
                  </div>
                </div>
              </div>

              <div class="button__container">
                <div @click="prevPage" class="button cancel">{{ $t('sell_account.tab1.form.btn_back') }}</div>
                <div @click="nextPage" class="button">{{ $t('sell_account.tab1.form.btn_next') }}</div>
              </div>
            </form>
          </div>
        </div>
        <div v-if="getScreenWidth > 500" class="col-lg-6 right__container">
          <div class="information">
            <div class="information--title">{{ $t('sell_account.tab2.important_note.title') }}</div>

            <div class="information--content">
              <div class="info">
                <span class="text" v-html="$t('sell_account.tab2.important_note.text_1')">
                </span>
              </div>

            </div>
          </div>
        </div>

        <div v-else class="col-lg-6 right__container">
          <div class="information">
            <div class="information--content">
              <div class="info">
                <span style="font-weight: bold" class="text">
                  <span style="color: #35bbb8">Untradeable Players</span> are
                  unfortunately worthless for us, cause we can’t sell them.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="page == 3" class="row">
        <div class="col-lg-6 left__container">
          <div class="title">{{ $t('sell_account.tab3.form.title') }}</div>
          <div class="content">
            <form>
              <sellcoin-err-view :errors.sync="errors"></sellcoin-err-view>
              <div class="input-field" v-for="i in 4" @key="i">
                <input
                    maxlength="8"
                    v-model="accountInfo['code_'+i]"
                    @keypress="checkBackupCode"
                    @input="checkBackupCode"
                    style="text-transform: uppercase; font-size: 12px"
                    type="text"
                    required
                    spellcheck="false"
                />
                <label style="font-size: 17px">{{ $t('sell_account.tab3.form.backup_code_'+i) }}*</label>
              </div>

              <div class="button__container">
                <div @click="prevPage" class="button cancel">{{ $t('sell_account.tab1.form.btn_back') }}</div>
                <div @click="nextPage" class="button">{{ $t('sell_account.tab1.form.btn_next') }}</div>
              </div>
            </form>
          </div>
        </div>
        <div v-if="getScreenWidth > 500" class="col-lg-6 right__container">
          <div class="information">
            <div class="information--title">
              {{ $t('ea.steps_header') }}
            </div>

            <div class="information--content steps">
              <div class="information--step">
                <nuxt-img loading="lazy" src="/svg/step_1.svg" alt="step 1 icon " />
                <span class="text">{{ $t('ea.steps.1.title') }}</span>
              </div>

              <div class="information--step">
                <nuxt-img loading="lazy" src="/svg/sell_acc_new_img.svg" alt="step 2 icon" />
                <span class="text">{{ $t('ea.steps.11.title') }}</span>
              </div>

              <div class="information--step">
                <nuxt-img loading="lazy" src="/svg/step_3.svg" alt="step 3 icon" />
                <span class="text">{{ $t('ea.steps.12.title') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="col-lg-6 right__container">
          <div class="information">
            <div class="information--content">
              <span
              >Don’t enter already used
                <span style="color: #35bbb8">Backup code?</span></span
              >
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="page == 4" class="row">
        <div class="col-lg-6 left__container">
          <div class="title">Console Data</div>
          <div class="content">
            <form v-if="success_msg === ''">
              <sellcoin-err-view :errors.sync="errors"></sellcoin-err-view>
              <div class="input-field">
                <input
                    style="text-transform: uppercase; font-size: 12px"
                    type="text"
                    v-model="accountInfo.psn_email"
                    spellcheck="false"
                />
                <label style="font-size: 17px">{{ $t('sell_account.tab4.form.psn_email') }}</label>
              </div>

              <div class="input-field">
                <input
                    style="text-transform: uppercase; font-size: 12px"
                    type="password"
                    v-model="accountInfo.psn_password"
                    spellcheck="false"
                />
                <label style="font-size: 17px">{{ $t('sell_account.tab4.form.psn_password') }}</label>
              </div>

              <div class="button__container">
                <div @click="prevPage" class="button cancel">{{ $t('sell_account.tab1.form.btn_back') }}</div>
                <div @click="sellAccount" class="button">
                  <nuxt-img loading="lazy" v-if="loading" src="/loading_btn.svg" alt="loading gif" />
                  <span v-else>{{ $t('sell_account.tab4.form.sell_btn') }}</span>
                </div>
              </div>

            </form>
            <div style="margin-top: 25px;" class="alert alert-success col-md-10" v-else>
              {{success_msg}}
            </div>
          </div>
        </div>
        <div v-if="getScreenWidth > 500" class="col-md-6 right__container">
          <div class="information">
            <div class="information--title">{{ $t('ea.additional_header') }}</div>

            <div class="information--content">
              <div class="info">
                <span class="text" v-html="$t('ea.additional_text')">
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="col-md-6 right__container">
          <div class="information">
            <div class="information--content">
              <div class="info">
                <span class="text" v-html="$t('ea.additional_text')">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../components/blocks/TitleHeaderFootball.vue";
import CustomDropDown from "../../components/CustomDropDown.vue";
import {api} from "../../composables/api"
import SellcoinErrView from "../../components/embeded/sellcoinErrView";
import {useI18n} from "vue-i18n";
import {makeMeta, urlwithLocal, makeBreadcrumbsSchemaOrgData} from "~/composables/useUtils";
export default {
  setup(){
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' })
    const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
      {path: urlwithLocal(''), title: 'Whatsgaming'},
      {path: route.path, title: t('home.navigation.earn_coins')},
    ])
    useHead(makeMeta(route.path,t('sell_account.meta.title'), t('sell_account.meta.description')))
    useHead({
      script: [
        { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
      ],
    })
  },

  name: "sellfutaccount",
  components: {SellcoinErrView, CustomDropDown, TitleHeaderFootball},
  data: () => {
    return {
      pay_options: [
        {
          name: "PayPal",
          value: "paypal",
        },
      ],
      platforms:[
        {name:'ps4', icon:'svg/ps_icon.svg'},
        {name:'xbox', icon:'svg/xbox_icon.svg'},
        {name:'pc', icon:'svg/pc_icon.svg'},
      ],
      platform: {
        ea_config: {}
      },
      payment_method: '',
      accountInfo: {
        email_contact: '',
        payment_email: '',
        email: '',
        password: '',
        platform_name: '',
        coins: '',
        code_1: '',
        code_2: '',
        code_3: '',
        code_4: '',
        psn_email: '',
        psn_password: ''
      },
      page: 1,
      sectionMargin: 0,
      errors:[],
      success_msg:'',
      loading:false
    };
  },
  computed: {
    getSectionMargin: function () {
      return this.sectionMargin;
    },
    getScreenWidth: function () {
      var screenWidth = window.innerWidth;
      return screenWidth;
    },
    amount() {
      if (!this.accountInfo.coins) {
        return 0
      }
      return (parseFloat(this.platform.ea_config.account_price_usd) + parseFloat(this.accountInfo.coins) * parseFloat(this.platform.ea_config.ppm_usd) /1000000).format(2, 3, '.', ',')
    },
  },
  methods: {
    addErr(err){
        this.errors.push(err);
    },
    clearErr(){
        this.errors = [];
    },
    getPlatforms() {
      return new Promise(resolve => {
        api.get('platforms', {query_params: {include:'ea_config'}}).then(res => {
          this.platforms.map(i => {
            let data = res.data.find(j => { return j.name === i.name })
            if (data) {
              i.id = data.id
              i.ea_config = data.ea_config.data
            }
          })
          this.changePlatform(this.platforms[0])
          resolve()
        })
      })
    },
    changePlatform(platform) {
      this.platform = platform
      this.accountInfo.platform_name = this.platform.name;
    },
    nextPage() {
      this.clearErr();
      if (this.page === 1) {
        if (this.accountInfo.email_contact==="" || this.accountInfo.payment_email ==="" || this.payment_method==="") {
          this.addErr(this.$t("sell_account.tab1.form.btn_error"));
        }
        if(!this.validateEmail(this.accountInfo.email_contact) || !this.validateEmail(this.accountInfo.payment_email)){
          this.addErr(this.$t('enter_valid_email'));
        }
      }
      if (this.page === 2) {
        if (this.accountInfo.email === "" || this.accountInfo.password === "" || this.accountInfo.platform_name === "" ) {
          this.addErr(this.$t("sell_account.tab1.form.btn_error"));
        }
        if(!this.validateEmail(this.accountInfo.email)){
          this.addErr(this.$t('enter_valid_email'));
        }
        if(this.accountInfo.coins === '' || this.accountInfo.coins === 0){
          this.addErr("Fill " + this.$t('sell_coins.header.name_part_2'));
        }
      }
      if (this.page === 3) {
        for (let i = 1; i <= 4; i++) {
          if (this.accountInfo['code_'+i].length !== 8) {
            this.addErr(this.$t("sell_account.tab1.form.btn_error"));
            return
          }
        }
      }
      if(this.errors.length === 0) {
        this.page++
      }
    },
    prevPage() {
      this.page --
    },
    changePayMethod(val) {
      this.payment_method = val.value
    },
    validateEmail(value){
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    },
    onlyNumbers(evt) {
      evt = (evt) ? evt : window.event;
      evt.target.value = evt.target.value.replace(/[^\d\,]/g, "")
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true;
      }
    },
    validateMaxLength(evt, length) {
      if (evt.target.value.length > length) {
        evt.target.value = evt.target.value.slice(0,length)
        evt.preventDefault()
      }
    },
    checkBackupCode(evt) {
      this.onlyNumbers(evt)
      this.validateMaxLength(evt, 8)
    },
    sellAccount() {
      this.clearErr();
      if (this.accountInfo.psn_email.length === 0 || this.accountInfo.psn_password.length === 0) {
        this.addErr(this.$t("sell_account.tab1.form.btn_error"));

      }
      if(!this.validateEmail(this.accountInfo.psn_email)){
        this.addErr(this.$t("enter_valid_email"));
      }
      if(this.errors.length === 0 && this.loading === false){
        this.loading = true;
        $("input").attr('disabled','disabled');
        api.post('sell_accounts/sell', {body_params: this.accountInfo}).then(res => {
          this.success_msg = 'success'; //aleksey => success msg is here
        }).catch(e => {
          this.addErr(e.description);
        }).finally(()=>{
          this.loading = false;
          $("input").removeAttr('disabled');
        })
      }
    },
  },
  watch: {
    page: function () {
      if (this.page == 1) {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1200 && screenWidth > 990) {
          this.sectionMargin = this.page * -5;
        } else if (screenWidth <= 990 && screenWidth > 768) {
          this.sectionMargin = this.page * -7;
        } else if (screenWidth <= 768 && screenWidth > 400) {
          this.sectionMargin = this.page * -10;
        } else if (screenWidth <= 400) {
          this.sectionMargin = this.page * -20;
        }

        return;
      }
      const screenWidth = window.innerWidth;
      if (screenWidth < 1200 && screenWidth > 990) {
        this.sectionMargin = this.page * -10;
      } else if (screenWidth <= 990 && screenWidth > 768) {
        this.sectionMargin = this.page * -27;
      } else if (screenWidth <= 768 && screenWidth > 400) {
        this.sectionMargin = this.page * -25;
      } else if (screenWidth <= 400) {
        this.sectionMargin = this.page * -42;
      }
    },
  },

  mounted: function () {
    this.getPlatforms()
    const screenWidth = window.innerWidth;
    if (screenWidth < 1200 && screenWidth > 990) {
      this.sectionMargin = this.page * -5;
    } else if (screenWidth <= 990 && screenWidth > 768) {
      this.sectionMargin = this.page * -7;
    } else if (screenWidth <= 768 && screenWidth > 400) {
      this.sectionMargin = this.page * -10;
    } else if (screenWidth <= 400) {
      this.sectionMargin = this.page * -20;
    }
  },
}
</script>

<style scoped>
@import "@/public/css/pages/sellfutcoin.css";
</style>