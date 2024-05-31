<template>
  <section class="achievement">
    <div class="container">

      <div class="row">
        <div class="col-12 col-lg-4">
          <h2>{{ $t('account.discount.title')}}</h2>
          <div class="row align-items-center rtl-opt">
            <div class="col-5">
              <div class="level">
                {{ $t('account.discount.level_cur') }}
              </div>
            </div>
            <div class="col-7">
              <div class="row align-items-center">
                <div class="col-5 col-lg-12">
                  <div class="label mb-0 mb-lg-1">
                    {{ currentLv.name === 'None' ? 'Basic' : currentLv.name }}
                  </div>
                </div>
                <div class="col-7 col-lg-12">
                  <div class="discount">
                    {{ currentLv.percent }}% Discount
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-4 rtl-opt">
            <div class="col-5 ">
              <div class="level">
                {{ $t('account.discount.level_next') }}
              </div>
            </div>
            <div class="col-7 ">
              <div class="row align-items-center">
                <div class="col-5 col-lg-12">
                  <div class="label bronze mb-0 mb-lg-1">
                    {{ nextLv.name}}
                  </div>
                </div>
                <div class="col-7 col-lg-12">
                  <div class="discount">
                    {{ nextLv.percent }}% Discount
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8 rangeSliderArea">
          <div class="rangeSliderWrapper mt-4 mt-lg-0">
            <div v-if="currentLv.name==='None'" class="">
              <div class="svg-item">
                <svg width="100%" height="100%" viewBox="0 0 40 40" class="donut">
                  <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="transparent"></circle>
                  <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent"
                          stroke-width="4"></circle>
                  <circle class="donut-segment donut-segment-2" cx="20" cy="20" r="15.91549430918954" fill="transparent"
                          stroke-width="4" stroke-dasharray="0 100" stroke-dashoffset="25"></circle>
                  <g class="donut-text donut-text-1">

                    <text y="50%" transform="translate(0, 2)">
                      <tspan x="50%" text-anchor="middle" class="donut-percent">{{ currentLv.percent }}%</tspan>
                    </text>
                  </g>
                </svg>
              </div>

            </div>

            <div v-else class="text-center d-flex justify-content-end">
              <div class="position-relative furtherLevelPercentage">
                <nuxt-img loading="lazy" :src="'/images/account/medals/'+currentLv.icon" class="w-100 sc-1-3"/>
                <span :style="'color:' + currentLv.color +';!important'">{{ currentLv.percent }}%</span>
              </div>

            </div>

            <div class="align-self-center">
              <div class="rangeSlider">
                <div class="bg"></div>
                <div class="filled" :style="'width:'+getFilledslider+'%;'"></div>
                <div
                    class="sliderAmount">
                  <span class="fromToPrice">{{ user.tbc / 1000}}K</span> <nuxt-img loading="lazy" src="/images/account/coin.svg"/>
                </div>
                <input
                    type="range"
                    min="1"
                    max="100"
                    v-model="rangeSlider"
                    step="1"
                    disabled
                />
              </div>

              <div class="d-flex fromToPriceArea">
                <div class="w-50">
                  <div>
                    <span class="fromToPrice">{{currentLv.name === 'None' ? 0 : parseInt(currentLv.coins) / 1000000}}M</span> <nuxt-img loading="lazy" src="/images/account/coin.svg"/>
                  </div>
                </div>
                <div class="text-right w-50">
                  <div>
                    <span class="fromToPrice">{{parseInt(nextLv.coins) / 1000000}}M</span> <nuxt-img loading="lazy" src="/images/account/coin.svg"/>
                  </div>
                </div>
              </div>

            </div>

            <div class="text-center d-flex justify-content-end">
              <div class="position-relative furtherLevelPercentage">
                <nuxt-img loading="lazy" :src="'/images/account/medals/'+nextLv.icon" class="w-100 sc-1-3"/>
                <span :style="'color:' + nextLv.color +';!important'">{{ nextLv.percent }}%</span>
              </div>
            </div>

          </div>
          <div class="rangeSliderWrapper mt-3">
            <div class="d-flex" :class="[{'justify-content-start':currentLv.name === 'None','justify-content-end':currentLv.name !== 'None'}]">
              <div class="text-center">
                <div class="label">
                  {{ currentLv.name === 'None' ? 'Basic ' : currentLv.name }}
                </div>
                <div class="level">
                  {{ $t('account.discount.level_cur') }}
                </div>
              </div>
            </div>
            <div></div>
            <div class="text-center furtherLevelPercentage">
              <div class="label bronze">
                {{ nextLv.name}}
              </div>
              <div class="level">
                {{ $t('account.discount.level_next') }}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.svg-item {
  max-width: 100px;
  margin-left: 10px;
}
.sc-1-3{
  transform: scale(1.15);
  margin-top: 5px;
}
.donut-ring {
  stroke: #000;
}

.donut-segment {
  transform-origin: center;
  stroke: #EBEBEB;
}

.donut-segment-2 {
  stroke: #EBEBEB;
}


.donut-text-1 {
  fill: #000000;
  transform: translateY(0.08rem);
}

.donut-percent {
  font-weight: 800;
  font-size: 10px;
}

.achievement {
  background-color: #F7F7F7;
  padding: 53px 0 43px;
}

.achievement h2 {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 29px;
  color: #201D56;
  margin-bottom: 37px;
}

.achievement .level {
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 22px;
  color: #201D56;
}

.achievement .label {
  font-weight: 700;
  line-height: 22px;
  font-size: 1.125rem;
  color: #000000;
}

.achievement .discount {
  font-style: italic;
  font-weight: 600;
  font-size: 0.938rem;
  line-height: 18px;
  color: #201D56;
}

.achievement .label.bronze {

  color: #D26500;
}

.achievement .rangeSliderArea .label {
  font-size: 1.313rem;
  line-height: 26px;
}

.achievement .rangeSliderArea .level {
  font-weight: 500;
}

.achievement .rangeSliderWrapper {
  display: flex;
}

.achievement .rangeSliderWrapper > div:nth-child(2) {
  flex: 1 1 auto;
}

.achievement .rangeSliderWrapper > div:first-child, .achievement .rangeSliderWrapper > div:last-child {
  flex: 0 0 150px;
}

.achievement .rangeSliderWrapper .rangeSlider input[type=range] {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%;
  height: 7px;
  position: relative;
  z-index: 9;
  outline: none;
  border-radius: 999px;
  background: transparent;
}

.achievement .rangeSliderWrapper .fromToPriceArea {
  margin: -6px -8px 0;
}

.achievement .rangeSlider .bg {
  width: 100%;
  height: 7px;
  background-color: #D0D0D0;
  border-radius: 999px;
  position: absolute;
  z-index: 1;
  top: 10px;
}

.achievement .rangeSlider .sliderAmount {
  position: absolute;
  top: -25px;
  left: 50px;
}

.achievement .rangeSlider .filled {
  background: #201d56;
  height: 7px;
  position: absolute;
  top: 10px;
  z-index: 2;
  border-radius: 999px;
}

.achievement .rangeSliderWrapper .rangeSlider {
  position: relative;
  z-index: 2;
}

.achievement .rangeSliderWrapper .rangeSlider input[type=range]::-moz-range-thumb {
  display: block;
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  border: 6px solid #201D56;
  cursor: pointer;
  z-index: 999999;
}

.achievement .rangeSliderWrapper .rangeSlider input[type=range]::-webkit-slider-thumb {
  display: block;
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
  border: 6px solid #201D56;
  cursor: pointer;
  z-index: 999999;

}

.achievement .rangeSliderWrapper .fromToPrice {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  display: inline-block;
  vertical-align: middle;
  color: #201D56;
  margin-top: 5px;
}

.achievement .furtherLevelPercentage {
  max-width: 122px;
}

.achievement .furtherLevelPercentage span {
  font-weight: 800;
  font-size: 30px;
  line-height: 37px;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
}

@media screen and (max-width: 576px) {
  .achievement .rangeSliderWrapper > div:first-child, .achievement .rangeSliderWrapper > div:last-child {
    flex: 0 0 110px;
  }

  .achievement .rangeSliderWrapper > div:first-child {
    padding-right: 10px;
  }

  .achievement .rangeSliderWrapper > div:last-child {
    padding-left: 10px;
  }

  .achievement .furtherLevelPercentage span {
    font-size: 22px;
    top: 21px;
  }
  .achievement .rangeSliderArea .label {
    font-size: 1rem;
  }
  .achievement .rangeSliderArea .level {
    font-size: .8rem;
  }
}
@media screen and (max-width: 576px) {
  .achievement .rangeSliderWrapper > div:first-child, .achievement .rangeSliderWrapper > div:last-child {
    flex: 0 0 80px;
  }

  .achievement .rangeSliderWrapper > div:first-child {
    padding-right: 10px;
  }

  .achievement .rangeSliderWrapper > div:last-child {
    padding-left: 10px;
  }

  .achievement .furtherLevelPercentage span {
    font-size: 17px;
    top: 10px;
  }
}
.rtl_class .rtl-opt .col-5{
  order: 2;
}
.rtl_class .achievement h2{
  text-align: right;
}
</style>

<script>

export default {
  name:'Achievement',
  props:['user'],
  setup() {

  },

  data: () => {
    return {
      rangeSlider: 1,
      levels :[
        {name :'None',color:'#000000'},
        {name: 'Bronze', color: '#a3684d'},
        {name: 'Silver', color: '#a6a9ab'},
        {name: 'Gold', color: '#ffcc02'},
        {name: 'Platin', color: '#201d56'},
        {name: 'Diamond', color: '#28b5f5'},
      ],
      currentLv: {},
      nextLv: {}
    };
  },

  mounted() {
    this.currentLv = this.currentLevelData;
    this.nextLv = this.nextLevelData;
  },
  methods: {
    processLevel(data) {
      if (data.name === '') {
        data.name = 'None';
      }
      const lv = this.levels.find(i => i.name === data.name);
      if (lv) {
        data.color = lv.color;
        data.icon = lv.name + ".svg";
      }
      return data;
    }
},

  watch: {},

  computed: {
    currentLevelData(){
      return this.processLevel(this.user.loyalty_discount_current.data);
    },
    nextLevelData(){
      return this.processLevel(this.user.loyalty_discount_next.data);
    },
    getFilledslider(){
      var percent = (this.user.tbc / this.nextLv.coins) * 100;
      this.rangeSlider = percent;
      return percent;
    }
  },

  components: {},
};
</script>
