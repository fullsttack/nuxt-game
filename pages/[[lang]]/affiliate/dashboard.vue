<template>
  <TitleHeaderFootball>
    <div class="smallhead">
      {{ $t('affiliate.login.title_part_1') }} {{ $t('affiliate.login.title_part_2') }}
    </div>
  </TitleHeaderFootball>
  <div>
    <affiliate-dialog v-if="affiliateDialog" :type="affiliate.approve_status" @onConfirmClicked="handleStatusDialog"></affiliate-dialog>
    <div v-else class="container container-affiliate" >
<!--      <span class="description" >-->
<!--        {{$t('affiliate.info.description') }}-->
<!--      </span>-->
      <div class="affillate_header">
        <div>
          <span class="title-1">{{ $t('affiliate.info.title') }} !</span>
          <span class="title-1" style="color:#35BBB8;margin-left: 5px;">{{  affiliate.name }}</span>
        </div>
        <div>
          <button class="btn btn-teal" @click="logoutAffiliate">
            <nuxt-img loading="lazy" src="/images/affiliate/logout.svg" alt="logout icon"/>
            <span>{{ $t('home.navigation.logout') }}</span>
          </button>
        </div>
      </div>
      <div class="bg-content">
        <div class="taraz banner-responsive">
          <nuxt-img loading="lazy" src="/images/affiliate/a_details.svg" alt="affiliate details"/>
          <span class="title-2">{{ $t('affiliate.info.details.title') }}</span>
        </div>
        <div class="col-md-12 row taraz2 col-mob-fix">
          <div class="col-5">
            <label class="title-light">
              {{ $t('affiliate.info.details.link_label') }}
            </label>
            <div class="input-container">
<!--              <input type="url" v-model="affiliate.link" disabled/>-->
              <div class="inpt">
                {{affiliate.link}}
              </div>
              <a class="copybtn" @click="copy2clipBoard($event,affiliate.link)">
                <nuxt-img loading="lazy" src="/images/affiliate/copy.svg" alt="copy link icon"/>
                <span>{{ $t('affiliate.info.details.copy_link') }}</span>
              </a>
            </div>
          </div>

          <div class="col-3">
            <label class="title-light">
              {{ $t('affiliate.info.details.discount_code') }}
            </label>
            <div class="input-container">
              <input type="text" v-model="affiliate.discount_code" disabled/>
              <a class="copybtn " @click="copy2clipBoard($event,affiliate.discount_code)">
                <nuxt-img loading="lazy" src="/images/affiliate/copy.svg" alt="copy link icon"/>
                <span>{{ $t('affiliate.info.details.copy_code') }}</span>
              </a>
            </div>
          </div>

          <div class="col-2">
            <label class="title-light">
              {{ $t('affiliate.info.details.provision') }}
            </label>
            <div class="input-container">
              <input type="text" v-model="affiliate.percent" disabled/>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-content" style="margin-top: 15px;">
          <div class="taraz3 taraz3-responsive">
          <div class="taraz banner-responsive">
            <nuxt-img loading="lazy" src="/images/affiliate/a_sales.svg" alt="sales icon"/>
            <span class="title-2">{{ $t('affiliate.info.sales.title') }}</span>
          </div>
          <div class="taraz datebox">
            <div class="taraz ">
              <label class="title-light" style="font-size: 17px;">{{ $t('affiliate.info.datepicker.from') }}</label>
              <div class="input-container sml-9">
                <input class="date-input" :class="{resDateInput:sales_date_from!==''}" type="date" placeholder="mm/dd/yyyy" v-model="sales_date_from" @change="getSales"/>
              </div>
            </div>
            <div  class="taraz">
              <label class="title-light" style="font-size: 17px;">{{ $t('affiliate.info.datepicker.to') }}</label>
              <div class="input-container sml-9">
                <input class="date-input" :class="{resDateInput:sales_date_to!==''}" type="date" placeholder="mm/dd/yyyy" v-model="sales_date_to" @change="getSales"/>
              </div>
            </div>
          </div>
        </div>
        <br>
          <div>
            <table class="custom-tbl-responsive table1-res">
              <thead>
              <th>
                {{$t('affiliate.info.details.amount')}}
              </th>
              <th>
                {{$t('affiliate.info.details.summer')}}
              </th>
              <th>
                {{$t('affiliate.info.details.provision')}}
              </th>
              <th>
                {{$t('affiliate.info.details.provision_sum')}}
              </th>
              </thead>
              <tbody class="scroll">
              <tr v-for="item in sales">
                <td>{{ item.count }}</td>
                <td>{{ item.price_sum  }}</td>
                <td>{{ item.percent }}</td>
                <td>{{ item.pay_sum }}</td>
              </tr>
              <tr class="scroll-res">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>

      <div class="bg-content" style="margin-top: 15px;">
        <div class="taraz banner-responsive">
          <nuxt-img loading="lazy" src="/images/affiliate/a_wd.svg" alt="withdraw icon" />
          <span class="title-2">{{ $t('affiliate.info.withdraw.title') }}</span>
        </div>

        <div class="taraz3" style="margin-top: 15px;">
          <div class="blnce">
            <p class="title-2">
              {{ $t('affiliate.info.withdraw.balance') }}
            </p>
            <p>
              {{ affiliate.balance.format(2, 3, '.', ',') }} €
            </p>
          </div>
          <div class="taraz paywdfix only-desktop">

            <label class="title-light">
              {{ $t('affiliate.info.withdraw.address') }}
            </label>
            <div class="input-container">
              <input type="text" v-model="pay_system.pay_address"/>
            </div>
            <div class="taraz res-fix" v-if="!isPhone">
              <custom-drop-down-aff

                  :compact="true"
                  :options="pay_systems"
                  @selected="changePaySystem"
              ></custom-drop-down-aff>
            </div>
            <div  class="taraz">
              <button class="btn btn-teal btn-wd" @click="makeWithdraw">
                <nuxt-img loading="lazy" alt="loading icon btn" v-if="wdLoading" src="/loading_btn.svg" />
                <span v-else>{{ $t('affiliate.info.withdraw.button') }}</span>
              </button>
            </div>

          </div>
          <div class="only-phone">
            <div class="res-addr-input">
              <label class="title-light">
                {{ $t('affiliate.info.withdraw.address') }}
              </label>
              <div class="input-container">
                <input type="text" v-model="pay_system.pay_address"/>
              </div>
            </div>
          </div>
        </div>
        <div class="only-phone" v-if="isPhone">
          <div class="paymethod-res-box">
            <custom-drop-down-aff
                :compact="true"
                :options="pay_systems"
                @selected="changePaySystem"
            ></custom-drop-down-aff>
            <button class="btn btn-teal btn-wd" @click="makeWithdraw">
              <nuxt-img loading="lazy" alt="loading icon btn" v-if="wdLoading" src="/loading_btn.svg" />
              <span v-else>{{ $t('affiliate.info.withdraw.button') }}</span>
            </button>
          </div>
        </div>
        <div class="title-light" style="margin-top: 20px;font-weight: 700;">
          {{ $t('affiliate.info.table.title') }}
        </div>
        <table class="custom-tbl-responsive payment-details-tbl" style="margin-top: 15px;">
          <thead>
          <th>
            {{$t('affiliate.info.table.date')}}
          </th>
          <th>
            {{ $t('affiliate.info.table.amount') }}
          </th>
          <th>
            {{ $t('affiliate.info.table.payment') }}
          </th>
          <th>
            {{ $t('invoices.statuses.pending') }}
          </th>
          </thead>
          <tbody class="payment-tbl">
          <tr v-for="item in withdraws">
            <td >{{ item.created_at_f }}</td>
            <td>{{ item.amount_eur }} €</td>
            <td>{{ item.payment_name }}</td>
            <td >
              <div class="flx">
                <nuxt-img loading="lazy" src="/images/affiliate/ico_pending.svg" alt="pending status icon"/>
                {{ item.status }}
              </div>
            </td>
          </tr>
          <tr class="scroll-res">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../../components/blocks/TitleHeaderFootball";
import CustomDropDownAff from "../../../components/affiliate/CustomDropDownAff";
import {useAffiliateStore} from "~/stores/affiliateStore";
import {getLocaleRoutePath} from "~/plugins/i18n";
import {ref, onMounted, computed} from "vue";
import {useI18n} from "vue-i18n";
import {makeMeta} from "~/composables/useUtils";
import {useAuthAffiliate} from "~/composables/auth_affiliate";
import {api_affiliate} from "~/composables/api_affiliate";
import AffiliateDialog from "../../../components/affiliate/AffiliateDialog";
export default {
  components: {AffiliateDialog, CustomDropDownAff, TitleHeaderFootball},
  setup() {
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' })
    useHead(makeMeta(route.path,t('affiliate.meta.title'), t('affiliate.meta.description')))

    const affiliate = useAffiliateStore()
    const {logoutAffiliate} = useAuthAffiliate();
    const affiliateDialog = ref(false);
    definePageMeta({
      middleware: [
        (to, from) => {
          const affiliate = useAffiliateStore()
          if (!affiliate.id) {
            return getLocaleRoutePath('affiliate')
          }
        },
      ]
    })

    const sales = ref([])
    const withdraws = ref([])
    const pay_systems = ref([])
    const pay_system = ref({})
    const sales_date_from = ref('')
    const sales_date_to = ref('')
    const withdraws_date_from = ref('')
    const withdraws_date_to = ref('')
    const wdLoading = ref(false);
    const isPhone = ref(false);
    const getSales = () => {
      api_affiliate.get('affiliate/sales', { query_params: {date_from: sales_date_from.value, date_to: sales_date_to.value}}).then(res => {
        sales.value = res.data
      })
    }

    const getWithdraws = () => {
      api_affiliate.get('affiliate/withdraws', { query_params: {date_from: withdraws_date_from.value, date_to: withdraws_date_to.value}}).then(res => {
        withdraws.value = res.data
      })
    }
    const getPaySystems = () => {
      api_affiliate.get('affiliate/pay_systems').then(res => {
        pay_systems.value = res.data
        pay_system.value = pay_systems.value[0]
      })
    }
    const makeWithdraw = () => {
      wdLoading.value = true;
      api_affiliate.post('affiliate/withdraws/create', { body_params: {payment_id: pay_system.value.id, pay_address: pay_system.value.pay_address}}).then(res => {
        affiliate.balance = 0
        getWithdraws()
      }).catch(res => {
        //todo handle errors
        alert(res.description)
      }).finally(()=>{
        wdLoading.value = false;
      })
    }
    const changePaySystem = (val) => {
      pay_system.value = pay_systems.value.find(i => i.id === val)
    }

    getPaySystems()
    getSales()
    getWithdraws()
    if(parseInt(affiliate.approve_status_viewed) !== 1){
      affiliateDialog.value = true;
    }
    const handleStatusDialog = ()=>{
      if(affiliate.approve_status === 'approved'){
        api_affiliate.post('affiliate/set_approve_status_viewed', { body_params: {t: 1}}).then(res => {
            affiliateDialog.value = false;
        }).catch(res => {
          affiliateDialog.value = false;
        })
      }else{
          logoutAffiliate();
      }
    }
    const copy2clipBoard = ($event,text) =>{

      navigator.clipboard.writeText(text).then(function() {
        $event.target.innerHTML = "Copied";
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
    onMounted(()=>{
      isPhone.value = (window.innerWidth < 800 ? true:false);
    })
    const baseAffiliateUrl = (computed(()=>{
      try{
        return affiliate.link.replaceAll(affiliate.discount_code,"");
      }catch (e){
        return "";
      }
    }))
    return {
      affiliate,
      sales,
      withdraws,
      pay_systems,
      pay_system,
      changePaySystem,
      getSales,
      getWithdraws,
      makeWithdraw,
      logoutAffiliate,
      sales_date_from,
      sales_date_to,
      withdraws_date_from,
      withdraws_date_to,
      affiliateDialog,
      handleStatusDialog,
      wdLoading,
      isPhone,
      copy2clipBoard,
      baseAffiliateUrl
    }
  }
}
</script>

<style scoped>
@import "@/public/css/pages/affiliate_index.css";
</style>
<style>
@media (max-width: 800px) {
  .paymethod-res-box button,.paymethod-res-box .dropdown__filter-compact{
    height: 40px !important;
  }
  .paymethod-res-box .dropdown__filter-compact{
    border-radius: 8px !important;
    height: 40px !important;
  }
  .paymethod-res-box .dropdown svg.drop_down{
    top: 17px;
  }
}
</style>