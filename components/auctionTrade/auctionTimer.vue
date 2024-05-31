<template>
  <div class="timer-box" v-if="showTimer">
    <div>
      <div class="excess-limit">
        <div>
          <h3>{{$t('comfort.messages.excess_limit')}}</h3>
        </div>
        <div class="timer">
          <div>
            <div v-if="counter.days === 0">{{ counter.hours }}</div>
            <div v-else>{{ (counter.days * 24) + counter.hours }}</div>
            <div>{{ $t('messages.timer.hours') }}</div>
          </div>
          <div class="tq">:</div>
          <div>
            <div>{{ counter.minutes }}</div>
            <div>{{ $t('messages.timer.minutes') }}</div>
          </div>
          <div class="tq">:</div>
          <div>
            <div>{{ counter.seconds }}</div>
            <div>{{ $t('messages.timer.seconds') }}</div>
          </div>
        </div>

      </div>
      <div class="desbox" v-html="$t('messages.buy_block.desc')"></div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import {useTimer} from "vue-timer-hook";

export default {
  name: "auctionTimer",
  props:{
    data:{
      default:{}
    }
  },
  setup(props){
    const showTimer = ref(props.data.status)
    const counter = ref();
    counter.value = useTimer(props.data.timestamp * 1000,true);
    counter.value.start();
    watch(()=> counter.value.isExpired,(n)=>{
      showTimer.value = false;
    })
    return {
      counter,
      showTimer
    }
  }
}
</script>

<style scoped>
.timer-box{
  width: 50%;
  margin: 0 auto;
}
.timer-box:before{
  display: block;
  content: '';
  background-color: #0A0239;
  opacity: 0.88;
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
  z-index: 99;
}
.timer-box > div{
  z-index: 999;
  position: absolute;
  /* bottom: 5%; */
  width: 50%;
  left: 50%;
  transform: translate(-50%);
  height: 310px;
  border-radius: 8px;
  top: 35%;
  color:white;
  text-align: center;
}
.excess-limit{
  width: 70%;
  height: 140px;
  margin: 0 auto;
  padding-top: 35px;
  margin-bottom: 10%;
}
.excess-limit p{
  text-align: center;
  font-weight: bold;
  font-size: 23px;
}
.timer-box > div h3{
  font-size:  var(--font-size-23px);
}
.timer{
  display: flex;
  text-align: center;
  justify-content: space-around;
}
.timer div > div:first-child,.tq{
  font-size: 45px;
  font-weight: bold;
}
.timer div > div:last-child{
  font-size: 20px;
  font-weight: 400;
}
@media(max-width: 800px){
  .desbox{
    width: 90%;
    margin: 0 auto;
  }
  .timer-box > div{
    width: 100%;
  }
  .excess-limit p{
    font-size: 18px;
    width: 100%;
  }
  .timer div > div:first-child,.tq{
    font-size: 41px;
  }
  .timer div > div:last-child{
    font-size: 17px;
  }
  .excess-limit{
    padding-top: 0;
  }
}
</style>