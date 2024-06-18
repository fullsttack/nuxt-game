<template>
    <section class="buyBox nn-mb-8 nn-mb-md-0">
        <div class="nn-row nn-justify-center">
            <div class="nn-mt-5 nn-mt-md-15">
                <!-- buybox Heading -->
                <BuyBoxHeading :coin="type" />
                <!-- buybox Stepper -->
                <BuyBoxStepper />
            </div>
        </div>
         <!-- buybox trustami banner  -->
         <BuyBoxBanner />
    </section>
</template>

<script setup lang="ts">
import {watch} from "vue";
import {useRoute} from "#app";
import {useBuyBoxStore} from "~/stores/buyBox";
import {api} from "~/composables/api";
import {storeToRefs} from "pinia";
import useDiscountHandler from "~/composables/useDiscountHandler";
import {useBuyBoxState} from "~/stores/BuyboxState";
const route = useRoute();
const buyBoxStore = useBuyBoxStore();
const {handleDiscount} = useDiscountHandler();
const { resetNextSteps ,setSelectedPlatform, setCoinPackets, setSelectedMethod, setActiveStep ,setSelectedAmount , setCurrentStep, setSelectedCoinPacket} = buyBoxStore;
const {currentStep} = storeToRefs(useBuyBoxStore());
const {productId} = storeToRefs(useBuyBoxState());
export interface Props {
  type?: string
};
const props = withDefaults(defineProps<Props>(), {
  type: 'home',
});

// import { useBuyBoxStore } from '@/stores/buyBox';
// const buyBoxStore = useBuyBoxStore();
// const { setDataFromLocalStorage } = buyBoxStore;

onMounted(() => {
  // setDataFromLocalStorage();
  handleDiscount();
  if(route.query.product_id  === undefined && productId.value !== 0){
    onPreSelectedProduct(productId.value);

  }
})
const onPreSelectedProduct = async (product_id:number)=>{
  api.get(`buy_coins/get_coin_packet/${product_id}`).then(async (res) => {
    const selected_coin_packet = res.data;
    const platform_name = selected_coin_packet.platform_name;
    const type = selected_coin_packet.type;
    let selected_packet_index = 0;
    await api.get('platforms', { query_params: { 'include': 'cheapest_comfort_packet', 'with_stadia': 1 } }).then((res) => {
      setSelectedPlatform(res.data.find((i:any) => {return i.name === platform_name}));
    });
    await api.get('buy_coins/get_coin_packets', { query_params: { platform_name, type } }).then((res)=>{
      setCoinPackets(res.data);
      for(let i=0;i<=res.data.length-1;i++){
        if(res.data[i].id === selected_coin_packet.id){
          selected_packet_index = i;
          break;
        }
      }
      setSelectedCoinPacket(selected_packet_index,selected_coin_packet);
    });
    setSelectedMethod(type);
    setSelectedAmount();
    setCurrentStep({
      id:4,
      name:'checkout'
    });
    setActiveStep({ index: 4 });
    productId.value = 0;
  });
}
watch( ()=> route.query, (n) => {
  if(n.product_id !== undefined){
    let product_id = parseInt(n.product_id);
    onPreSelectedProduct(product_id);
  }else{
    setCurrentStep({
      id: 1,
      name: 'console'
    });
    setActiveStep({ index: 0 });
    resetNextSteps({
      id: 1,
      name: 'console',
      active:true
    })
  }
},{immediate:true});

</script>
