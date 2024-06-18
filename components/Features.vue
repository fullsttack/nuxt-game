<template>
  <div class="features__container" style="margin-top: 20px;">
    <div class="feature">
      <div class="image">
        <nuxt-img loading="lazy" src="/svg/feature_orders.svg" alt="feature orders icon"/>
      </div>
      <div class="description">
        <b>{{ $t('features.1.value') }}</b>
        <span>{{ $t('features.1.text') }}</span>
      </div>
    </div>
    <div class="feature">
      <div class="image">
        <nuxt-img loading="lazy" src="/svg/feature_exp.svg" alt="feature exp icon" />
      </div>
      <div class="description">
        <b>{{ $t('features.2.value') }}</b>
        <span>{{ $t('features.2.text') }}</span>
      </div>
    </div>
    <div class="feature">
      <div class="image">
        <nuxt-img loading="lazy" src="/svg/feature_customer.svg" alt="feature customer icon" />
      </div>
      <div class="description">
        <b>{{ $t('features.3.value') }}</b>
        <span>{{ $t('features.3.text') }}</span>
      </div>
    </div>
    <div class="feature">
      <div class="image">
        <nuxt-img loading="lazy" src="/svg/feature_trustmi.svg" alt="feature trustmi icon" />
      </div>
      <div class="description">
        <b>{{ $t('features.4.value') }}</b>
        <span>{{ $t('features.4.text') }}</span>
      </div>
    </div>
  </div>
</template>

<script>

</script>
<style scoped>
@import "@/public/css/pages/index.css";
</style>
