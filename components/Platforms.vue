<template>
  <div style="width: 100%;" class="platform-box">
    <b>{{$t('fifa.where_start')}}</b>
    <div class="console-list mobile-console">
      <NuxtLink :to="urlwithLocal('fifa-coins/' + platform.name)" v-for="platform in platforms" class="console" :style="'background-color: ' + platform.bg">
        <div class="logo">
          <img :src="platform.img_icon" :alt="platform.name + ' console icon'" width="35" height="35"/>
        </div>
        <nuxt-img loading="lazy" :class="{fixpc:platform.name==='pc',fixconsole:platform.name!=='pc'}" :style="{transform: 'translateY('+platform.translateY+'px)'}" :width="platform.w" :height="platform.h" :src="platform.img_name" :alt="platform.name + ' text icon'"/>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import {getLocaleRoutePath} from "~/plugins/i18n";
import {urlwithLocal} from "../composables/useUtils";
export default {
  setup(){
    const {urlwithLocal} = useUtils();
    return {urlwithLocal};
  },
  data: () => {
    return {
      getLocaleRoutePath,
      platforms:[
        {name:'ps4', img_name:'/images/platforms/ps4_txt.svg', img_icon:'/images/platforms/ps4.svg', translateY: -3 ,w:60,h:13,bg:'#1349C3'},
        {name:'xbox', img_name:'/images/platforms/xbox_txt.svg', img_icon:'/images/platforms/xbox.svg', translateY: -3  ,w:160,h:15,bg:'#107C10'},
        {name:'ps5', img_name:'/images/platforms/ps5_txt.svg', img_icon:'/images/platforms/ps4.svg', translateY: -3  ,w:60,h:13,bg:'#1349C3'},
        {name:'pc', img_name:'/images/platforms/pc_txt.svg', img_icon:'/images/platforms/pc.svg', translateY: 0,w:25,h:25,bg:'#E16C00'},
      ],
    };
  },
}
</script>

<style scoped>
.platform-box{
  width: 100%;
  text-align: center;
}
.platform-box b{
  font-size: 21px;
}
.bottom__container .console-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  gap: 25px;
}

.bottom__container .console-list .console {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  background: #201d56;
  max-width: 290px;
  width: 100%;
  height: 130px;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

.bottom__container .console-list .console:hover {
  background: #3b3792;
}

.bottom__container .console-list .console .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 60px;
  height: 60px;
  background: #ffffff52;
  padding: 13px;
  border-radius: 100%;
}

.bottom__container .console-list .console > img {
  position: absolute;
  bottom: 15px;
}
.console:hover{
  filter: brightness(0.8);
}

@media (max-width: 768px) {
  .bottom__container .console-list .console .logo{
    width: 54px;
    height: 54px;
  }
  .bottom__container .console-list .console > img {
    bottom: 12px;

  }
  .bottom__container .console-list .console {
    height: 120px; /* !important; */
  }
  .fixpc{
    transform: scale(0.85) translateY(5px) !important;
  }
  .fixconsole{
    transform: scale(0.85) !important;
  }
}

@media (min-width: 100px) and (max-width: 635px) {
  .bottom__container .console-list {
    flex-wrap: wrap;
  }

  .bottom__container .console-list .console {
    flex: 1 0 40%;
  }
}
</style>
