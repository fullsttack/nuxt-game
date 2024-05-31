<template>
  <div class="payment-info__item">
    <div class="payment-info__item--title">{{$t('payment.order_id')}}</div>
    <div class="payment-info__item--value">{{ invoice.id }}</div>
  </div>
  <div class="payment-info__item">
      <div class="payment-info__item--title">{{$t('payment.method')}}</div>
    <div class="payment-info__item--value" v-html="invoice.pay_system_title"></div>
  </div>
  <div class="payment-info__item">
    <div class="payment-info__item--title">{{$t('payment.reference')}}</div>
    <div class="payment-info__item--value trasncation">{{ invoice.transaction_id }}</div>
  </div>
  <div class="payment-info__item">
    <div class="payment-info__item--title">{{$t('payment.payment_date')}}</div>
    <div class="payment-info__item--value">{{  invoice.created_at_format }}</div>
  </div>
  <div class="payment-info__item">
    <div class="payment-info__item--title">{{$t('payment.articul')}}</div>
    <div class="payment-info__item--value">{{  invoice.title }}</div>
  </div>
  <div class="payment-info__item">
    <div class="payment-info__item--title">{{$t('payment.type')}}</div>
    <div class="payment-info__item--value">{{  invoice.type }}</div>
  </div>
  <div class="payment-info__item">
    <div class="payment-info__item--title">{{$t('payment.coins')}}</div>
    <div class="payment-info__item--value">{{  invoice.coins_text }}</div>
  </div>
  <!--        <div class="payment-info__item">
            <div class="payment-info__item&#45;&#45;title">Price</div>
            <div class="payment-info__item&#45;&#45;value price">
              <span>€7.77</span> <span>€ 6.99</span>
            </div>
          </div>
          <div class="payment-info__item">
            <div class="payment-info__item&#45;&#45;title">Level</div>
            <div class="payment-info__item&#45;&#45;value">Silver - 4%</div>
          </div>-->
  <div class="payment-info__item">
    <div class="payment-info__item--title">{{$t('payment.total')}}</div>
    <div class="payment-info__item--value">{{ invoice.price_in_currency + ' ' + invoice.currency_code }}</div>
  </div>
</template>

<script>
export default {
  props: {
    invoice: Object,
  },
}
</script>

<style scoped>
@import "~/public/css/pages/payment_result.css";
</style>