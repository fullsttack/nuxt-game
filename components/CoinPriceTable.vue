<template>
  <div>
    <IndependentCoinPriceTable :platform_name="platform_name" :platform_changable="platform_changable" :allow_buy="allow_buy"/>
  </div>
</template>

<script>
import IndependentCoinPriceTable from "./IndependentCoinPriceTable";
export default {
  components: {IndependentCoinPriceTable},
  props: {
    platform_name: {
      type: String,
      default: 'ps4'
    },
    platform_changable: {
      type: Boolean,
      default: true
    },
    allow_buy: {
      type: Boolean,
      default: true
    },
  }
};
</script>

<style scoped>

</style>