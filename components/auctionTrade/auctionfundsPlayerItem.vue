<template>
  <div>
    <div class="select-key" v-if="showSelect">{{viewableKey}}</div>
    <div class="s-item">
      <div>
        <img :src="packet.img" alt="" height="190" width="135">
        <div>
          {{packet.player_name}}
        </div>
      </div>
      <div>
        <div>
          <div>
            {{ $t('account.buy.start_price')}}
          </div>
          <div>
            {{ item.start_price }}
            <img class="coins" src="/images/auction/trade/coins.svg" />
          </div>
        </div>

        <div>
          <div>
            {{ $t('account.buy.sofort_price')}}
          </div>
          <div>
            {{ item.end_price }}
            <img class="coins" src="/images/auction/trade/coins.svg" />
          </div>
        </div>

        <div>
          <div>
            {{ $t('account.buy.look_exp')}}
          </div>
          <div>
            <span>{{item.expire_timer.hours}}</span>:<span>{{item.expire_timer.minutes}}</span>:<span>{{item.expire_timer.seconds}}</span>
          </div>
        </div>

        <div>
          <div>
            {{ $t('account.buy.owners') }}
          </div>
          <div>
            {{ item.owners }}
          </div>
        </div>

        <div>
          <div>
            {{ $t('account.buy.contracts') }}
          </div>
          <div>
            {{ item.contracts }}
          </div>
        </div>

        <div>
          <div>
            {{ $t('account.buy.chemistry_style')  }}
          </div>
          <div>
            {{ item.chemistry_style }}
          </div>
        </div>

        <div v-if="showSelect">
          <button  class="btn buy-btn" @click="selectPlayer(item)">{{ $t('account.buy.buy') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  props:{
    selectKey:{},
    item:{
      type:Object
    },
    packet:{
      type:Object
    },
    showSelect:{
      type:Boolean,
      default:true
    }
  },
  name: "auctionfundsPlayerItem",
  setup(props,{emit}){
    const selectPlayer = (item) =>{
      emit('onSelect',props.selectKey,item);
    }
    const heightbox = computed(()=>{
      return props.showSelect ? '590px' : '550px';
    })
    const viewableKey = computed(()=>{
      return props.selectKey + 1;
    })
    return {
      selectPlayer,
      heightbox,
      viewableKey
    }
  }
}
</script>

<style scoped>
.s-item{
  width: 460px;
  height: 100%;
  min-height: v-bind(heightbox);
  background-color: #EBEBEB;
  padding:25px;
  padding-top: 30px;
  border-radius: 7px;
}
.s-item > div:first-child{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 50%;
  transform: translateX(-50%);
}
.s-item > div:first-child > div{
  font-size:var(--font-size-24px);
  font-weight: bold;
  word-spacing: 100vw;
}
.s-item > div:last-child > div{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  font-size:var(--font-size-17px);
  font-weight: 600;
}
.s-item > div:last-child > div{
  margin-top: 25px;
}
.s-item > div:last-child > div > div:first-child{
  text-align: start;
}
.s-item > div:last-child > div > div:last-child{
  text-align: end;
  color:#201D56;
  display: flex;
  align-items: center;
  gap: 5px;
}
.buy-btn{
  width: 100%;
  margin: 0 auto;
  height: 53px;
  background-color: #201D56;
  font-size: var(--font-size-19px);
  font-weight: bold;
  color:white;
  text-align: center;
  border-radius: 10px;
  margin-top: 2px;
}
.buy-btn:hover{
  color:gray;
}
.coins{
  width: 25px;
  height: 22px;
}
.select-key{
  position: absolute;
  left: 15px;
  top: 15px;
  font-size: 24px;
  font-weight: bold;
  border: 2px solid;
  border-radius: 50%;
  padding: 10px;
  height: 45px;
  width: 45px;
  padding-top: 5px;
  text-align: center;
}
@media(max-width: 800px){
  .select-key{
    left: 10px;
    top: 10px;
    font-size: 17px;
    padding: 10px;
    height: 35px;
    width: 35px;
    padding-top: 4px;
    text-align: center;
    transform: scale(0.8);
  }
  .coins{
    width: 15px;
    height: 13px;
  }
  .s-item{
    width: 100%;
    height: 390px !important;
    min-height: 0;
  }
  .s-item > div:first-child > div{
    font-size: 17px;
  }
  .s-item > div:last-child > div{
    font-size: 12px;
  }
  .s-item > div:last-child > div{
    margin-top: 15px;
  }
  .buy-btn{
    height: 36px;
    font-size: 12px;
  }
  .s-item > div:last-child > div{
    padding-left: 1%;
    padding-right: 1%;
  }
  .s-item > div:first-child{
    margin-bottom: 25px;
  }
  .s-item{
    padding-top: 20px;
  }
  .s-item > div:nth-child(1) > img{
    width: 75px;
    height: auto;
  }
}
@media(max-width: 330px){
  .select-key{
    top: 5px;
    left: 5px;
    transform: scale(0.75);
  }
}
</style>