<template>
  <div class="info__container">
    <div class="circle">
      <img
        v-if="userData.console.img == 'ps'"
        src="/svg/ps_icon.svg"
        class="console"
      />
      <img
        v-else-if="userData.console.img == 'xbox'"
        src="/svg/xbox_icon.svg"
        class="console"
      />
      <img
        v-else-if="userData.console.img == 'stadia'"
        src="/svg/stadia_icon.svg"
        class="console"
      />
      <img
        v-else-if="userData.console.img == 'pc'"
        src="/svg/pc_icon.svg"
        class="console"
      />
    </div>
    <div class="circle">
      <img
        v-if="userData.method.name.includes('comfort')"
        src="/svg/icon-comfort-trade-blue.svg"
      /><img v-else src="/svg/icon-player-blue.svg" />
    </div>

    <div class="circle">
      <span class="amount">
        {{ getCoinAmount() }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.info__container {
  position: absolute;
  margin-left: 42.5px;
  margin-top: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.info__container .circle {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border: 1.5px solid #201d56;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.info__container .circle:nth-child(2) {
  left: -10px;
}

.info__container .circle:nth-child(3) {
  left: -20px;
}

.info__container img {
  width: 12px;
  height: 12px;
}

.info__container img:last-of-type {
  width: 20px;
  max-height: 25px;
}

.info__container span {
  font-weight: 700;
  font-size: var(--font-size-10px);
  margin-left: 2px;
  z-index: 2;
}

.info__container span::before {
  content: url("/svg/icon-awesome-coins-gold.svg");
  opacity: 0.25;
  position: absolute;
  fill: red;
  z-index: 1;
  margin-top: -3px;
}

@media (min-width: 768px) {
  .info__container {
    margin-top: -6px  !important;
  }

  .circle {
    width: 38px  !important;
    height: 38px  !important;
  }

  .circle img {
    width: 17px  !important;
    height: 17px !important;
  }
}
</style>

<script>
export default {
  name:'BuyGroupBuyGroup',
  props: {
    userData: Object,
  },

  methods: {
    getCoinAmount: function () {
      if (this.userData.coin.amount < 1000000) {
        return this.userData.coin.amount / 1000 + "K";
      } else {
        return this.userData.coin.amount / 1000000 + "M";
      }
    },

    getPaymentImage: function () {
      if (this.userData.payment) {
        if (this.userData.payment.includes("visa")) {
          return `/src/assets/svg/icon-visa.svg`;
        }

        if (this.userData.payment.includes("skrill")) {
          return `/src/assets/svg/payment-skrill.svg`;
        }

        return `/src/assets/svg/payment-${this.userData.payment}.svg`;
      }
    },
  },
};
</script>
