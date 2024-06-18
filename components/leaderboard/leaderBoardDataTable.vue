<template>
  <div>
    <div class="text-center title">
      <span v-if="mode===leaderboardModes.Weekly">Weekly</span>
      <span v-else>Monthly</span>
      <span class="mx-1">Leaderboard</span>
    </div>
    <div class="date-line d-flex justify-content-between align-items-center pt-4">
      <div class="d-flex justify-content-between align-items-center" @click="prevDate">
        <img src="/images/lb/tarrow-left.svg"/>
        <span class="date mx-1"><span v-if="mode===leaderboardModes.Weekly">Week</span> {{ prevDateView }}</span>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <img src="/images/lb/calender.svg"/>
        <span class="calender mx-1">{{ currentDate }}</span>
      </div>
      <div class="d-flex justify-content-between align-items-center" @click="nextDate">
        <span class="date"> <span v-if="mode===leaderboardModes.Weekly">Week</span> {{ nextDateView }}</span>
        <img src="/images/lb/tarrow-right.svg"/>
      </div>
    </div>
    <div class="mt-2" >
      <table class="tableArea" cellspacing="0" cellpadding="0" :class="{skeletonloading:pendingReg}">
        <thead>
          <th>Rank</th>
          <th>User</th>
          <th>Registered</th>
          <th>Discount Leval</th>
          <th>Purchases Coins</th>
          <th>Prize</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="/images/lb/rank1.svg"/>
            </td>
            <td v-if="device.isMobile">
              {{ shortenEmail('poya.p1994@gmail.com') }}
            </td>
            <td v-else>
              {{ 'poya.p1994@gmail.com' }}
            </td>
            <td class="fw-m">
              6
            </td>
            <td class="fw-m">
              4
            </td>
            <td>
              <div class="td-coins">
                <img src="/images/lb/coin.svg"/>
                <span>20,923,543</span>
              </div>
            </td>
            <td class="td-price fw-m">
              651.982 €
            </td>
          </tr>
          <tr>
            <td>
              <img src="/images/lb/rank2.svg"/>
            </td>
            <td>
              dankir@ahi....
            </td>
            <td class="fw-m">
              6
            </td>
            <td class="fw-m">
              4
            </td>
            <td>
              <div class="td-coins">
                <img src="/images/lb/coin.svg"/>
                <span>20,923,543</span>
              </div>
            </td>
            <td class="td-price fw-m">
              651.982 €
            </td>
          </tr>
          <tr>
            <td>
              <img src="/images/lb/rank3.svg"/>
            </td>
            <td>
              dankir@ahi....
            </td>
            <td class="fw-m">
              6
            </td>
            <td class="fw-m">
              4
            </td>
            <td>
              <div class="td-coins">
                <img src="/images/lb/coin.svg"/>
                <span>20,923,543</span>
              </div>
            </td>
            <td class="td-price fw-m">
              651.982 €
            </td>
          </tr>
          <tr>
            <td class="fw-m fs-12">
              <div>
                #4
              </div>
            </td>
            <td>
              dankir@ahi....
            </td>
            <td class="fw-m">
              6
            </td>
            <td class="fw-m">
              4
            </td>
            <td>
              <div class="td-coins">
                <img src="/images/lb/coin.svg"/>
                <span>20,923,543</span>
              </div>
            </td>
            <td class="td-price fw-m">
              651.982 €
            </td>
          </tr>
        </tbody>
      </table>
      <span class="loadingtxt" v-if="pendingReg">loading....</span>
      <div class="last-update fs-12">
        <span>Last Update :</span>
        <span class="mx-1 fw-m">twefwef</span>
      </div>
      <div class="pagination" >
        <button  aria-label="Prev DataTable Page" title="Prev">
          <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-top: -1px;    margin-left: -1px;">
            <path
                d="M7.092 0.883089C6.91887 0.712096 6.68533 0.616211 6.442 0.616211C6.19866 0.616211 5.96513 0.712096 5.792 0.883089L1.235 5.45209C1.06781 5.61945 0.971522 5.84478 0.966121 6.08128C0.960721 6.31778 1.04663 6.54727 1.206 6.72209L5.693 11.2221C5.77702 11.3132 5.87859 11.3865 5.99162 11.4374C6.10465 11.4883 6.2268 11.5158 6.35074 11.5184C6.47469 11.5209 6.59786 11.4983 6.71286 11.4521C6.82787 11.4058 6.93234 11.3367 7.02 11.2491C7.10765 11.1614 7.17669 11.057 7.22296 10.942C7.26923 10.8269 7.29179 10.7038 7.28927 10.5798C7.28674 10.4559 7.2592 10.3337 7.20829 10.2207C7.15738 10.1077 7.08415 10.0061 6.993 9.92209L3.179 6.05009L7.089 2.17809C7.17479 2.09357 7.24297 1.99289 7.2896 1.88185C7.33624 1.77082 7.36039 1.65164 7.36067 1.53121C7.36095 1.41079 7.33735 1.2915 7.29123 1.18025C7.24511 1.069 7.1774 0.968001 7.092 0.883089Z"
                fill="currentColor"/>
          </svg>
        </button>
        <button @click="fetchData">1</button>
        <button>2</button>
        <button>3</button>
        <button aria-label="Next DataTable Page" title="Next">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-top: -1px;">
            <path
                d="M0.769694 0.883089C0.942823 0.712096 1.17636 0.616211 1.41969 0.616211C1.66303 0.616211 1.89656 0.712096 2.06969 0.883089L6.62369 5.45209C6.79088 5.61945 6.88717 5.84478 6.89257 6.08128C6.89797 6.31778 6.81207 6.54727 6.65269 6.72209L2.16569 11.2221C2.08168 11.3132 1.9801 11.3865 1.86707 11.4374C1.75404 11.4883 1.63189 11.5158 1.50795 11.5184C1.38401 11.5209 1.26084 11.4983 1.14583 11.4521C1.03082 11.4058 0.926355 11.3367 0.838698 11.2491C0.751041 11.1614 0.682003 11.057 0.63573 10.942C0.589458 10.8269 0.566906 10.7038 0.569427 10.5798C0.571948 10.4559 0.599492 10.3337 0.650404 10.2207C0.701315 10.1077 0.774544 10.0061 0.865694 9.92209L4.68369 6.05309L0.773694 2.18109C0.687383 2.09659 0.618737 1.99577 0.571751 1.88449C0.524765 1.77322 0.500377 1.65371 0.500004 1.53293C0.499632 1.41214 0.523284 1.29248 0.569583 1.18092C0.615883 1.06936 0.683905 0.968119 0.769694 0.883089Z"
                fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>

import leaderboardModes from "./leaderboardModes";
import {computed, onMounted, ref} from "vue";
const props = defineProps({
  mode:{
    default:'week',
    type:String
  }
})
function shortenEmail(email) {
  return email.replace(/(?<=.{2}).(?=[^@]*$)/g, '') + "...";
}
//--------------------------------------
let calender = new Date();
const selectedDate = ref(calender.getTime());
let nDate = new Date(selectedDate.value);
let pDate = new Date(selectedDate.value);
let lazyRequest = false;
const pendingReg = ref(false);
const device = useDevice();
onMounted(()=>{
  //alert(calender.getDate());
  lazyRequest = true;
})
const nextDate = ()=>{
  if(props.mode === leaderboardModes.Weekly){
    calender.setHours(24 * 7);
  }else{
    calender.setHours(24 * 30);
  }
  selectedDate.value = calender.getTime();
  nDate.setTime(selectedDate.value);
  pDate.setTime(selectedDate.value);
}
const prevDate = () => {
  if (props.mode === leaderboardModes.Weekly) {
    calender.setDate(calender.getDate() - 7);
  } else {
    calender.setMonth(calender.getMonth() - 1);
  }
  selectedDate.value = calender.getTime();
  nDate.setTime(selectedDate.value);
  pDate.setTime(selectedDate.value);
};
const currentDate = computed(()=>{
  calender.setTime(selectedDate.value);
  if (props.mode === leaderboardModes.Weekly) {
    return calender.getDate() + "/" + calender.getFullYear();
  }else{
    return calender.toLocaleString('default', { month: 'long' });
  }
})
const nextDateView = computed(()=>{
  nDate.setTime(selectedDate.value);
  if (props.mode === leaderboardModes.Weekly) {
    nDate.setHours(24 * 7);
    return nDate.getDate() + "/" + nDate.getFullYear();
  }else{
    nDate.setHours(24 * 30);
    return nDate.toLocaleString('default', { month: 'long' });
  }
})
const prevDateView = computed(()=>{
  pDate.setTime(selectedDate.value);
  if (props.mode === leaderboardModes.Weekly) {
    pDate.setDate(pDate.getDate() - 7);
    return pDate.getDate() + "/" + pDate.getFullYear();
  }else{
    pDate.setMonth(pDate.getMonth() - 1);
    return pDate.toLocaleString('default', { month: 'long' });
  }
})
const fetchData = async ()=>{
  pendingReg.value = true;
  const {data: dataapi} = await useFetch('https://fakestoreapi.com/products', {
    lazy: lazyRequest
  });
  pendingReg.value = false;
  return dataapi;
}
const apidata = await fetchData();
console.log(apidata);
</script>

<style scoped>
@import '~/public/css/components/leaderboardDT.css';
</style>