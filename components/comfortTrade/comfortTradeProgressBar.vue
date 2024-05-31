<template>
  <div class="comfort-progress-bar">
    {{numtoK}}K
    <div class="range-container">
      <input type="range" id="myinput" :min="min" :max="max" v-model="fundsValue"/>
      <div class="left">
        <div>
          <img src="/images/comfort/box/singleCoin.svg" />
          <div>0K</div>
        </div>
      </div>
      <div class="right">
        <div>
          <img src="/images/comfort/box/doubleCoin.svg" />
          <div>{{ maxtoK }}K</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['funds','min','max'],
  name: "comfortTradeProgressBar",
  computed: {
    fundsValue: {
      get() {
        return this.funds
      },
      set(value) {
        this.renderSlider(value);
        this.$emit('update:modelValue', value)
      }
    },
    numtoK(){
      return parseInt(this.funds/1000);
    },
    maxtoK(){
      return parseInt(this.max/1000);
    }
  },
  methods:{
      renderSlider(value){
        var sliderRangeValue = (value-this.min)/(this.max-this.min)*100;
        document.getElementById("myinput").style.background = 'linear-gradient(to right, #35BBB8 0%, #35BBB8 ' + sliderRangeValue + '%, #fff ' + sliderRangeValue + '%, white 100%)'
      },

  },
  watch:{
    fundsValue:function(n){
      this.renderSlider(n);
    }
  },
  mounted() {
    document.getElementById("myinput").oninput = function() {
      var value = (this.value-this.min)/(this.max-this.min)*100
      this.style.background = 'linear-gradient(to right, #35BBB8 0%, #35BBB8 ' + value + '%, #fff ' + value + '%, white 100%)'
    };
  }
}
</script>

<style scoped>
.comfort-progress-bar{
  width: 75%;
  /*margin:0 auto;*/
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 100px;
}
.range-container input{
  width: 100%;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  z-index: 5;
  height: 8px;

  background: linear-gradient(to right, #fff 0%, #fff 50%, #fff 50%, #fff 100%);
  border: solid 1px #82CFD0;
  border-radius: 8px;
  outline: none;
  transition: background 450ms ease-in;
  -webkit-appearance: none;
}
.range-container input:before{
  content: '';
  width: 24px;
  display: flex;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: -4px;
  top: -8px;
  z-index: 1;
}
.range-container input:after{
  content: '';
  width: 24px;
  display: flex;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  right:-4px;
  top: -8px;
}
.range-container{

}
.range-container > .left{
  float:left;
}
.range-container > .left  img{
  width: 24px;
}
.range-container > .right  img{
  width: 30px;
  margin-left: 10px;
}
.range-container > .right{
  float:right;
  margin-right: -15px;
}
.range-container input::-webkit-slider-thumb {
  /*-webkit-appearance: none;*/
  appearance: none;
  width: 23px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background-image: url('/images/comfort/box/slider_m.svg');
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  accent-color:teal;
  /*display: block;*/
  /*position: relative;*/
  /*z-index: 2;*/
}

.range-container input::-moz-range-thumb {
  width: 23px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background-image: url('/images/comfort/box/slider_m.svg');
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
}
@media (max-width: 800px) {
  .comfort-progress-bar {
    width: 100%;
    /* margin: 0 auto; */
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scale(0.7);
    top: -90px;
  }

}
</style>
<style>
.range-container input[type="range"]::-moz-range-progress {
  background-color: #43e5f7;
}
.range-container input[type="range"]::-moz-range-track {
  background-color: #9a905d;
}
/* IE*/
.range-container input[type="range"]::-ms-fill-lower {
  background-color: #43e5f7;
}
.range-container input[type="range"]::-ms-fill-upper {
  background-color: #9a905d;
}
</style>