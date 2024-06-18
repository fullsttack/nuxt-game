<template>
  <div class="excess-limit">
    <div>
      <p>
        {{$t('comfort.messages.excess_limit')}}
      </p>
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
</template>

<script>
import {useTimer} from "vue-timer-hook";

export default {
  props:{
      counter:{
        type:Object,
        default:useTimer
      }
  },
  name: "comfortTradeexcessLimit"
}
</script>

<style scoped>
.excess-limit{
  width: 340px;
  height: 140px;
  margin: 0 auto;
  padding-top: 35px;
}
.excess-limit p{
  text-align: center;
  font-weight: bold;
  font-size: 23px;
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
  .excess-limit p{
    font-size: 18px;
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