<template>
  <TitleHeaderFootball>
    {{ $t('account.settings.title_1') }} {{ $t('account.settings.title_2') }}
  </TitleHeaderFootball>
  <Achievement :user="user" style="margin-top: -25px;direction: ltr;"/>
  <div class="infow">
    <div class="taraz">
      <ChangeInfo/>
      <Orders/>
    </div>
  </div>

</template>

<script>
import {useUserStore} from "~/stores/userStore";
import {makeMeta} from "~/composables/useUtils";
import TitleHeaderFootball from "../../../components/blocks/TitleHeaderFootball";
import Achievement from "../../../components/account/Achievement";
import Orders from "../../../components/account/Orders";
import ChangeInfo from "../../../components/account/changeInfo";

export default {
  components: {ChangeInfo, Orders, Achievement, TitleHeaderFootball},
  setup() {
    const route = useRoute();
    useHead(makeMeta(route.path,'Personal Info', 'Personal Info'))
    definePageMeta({
      middleware: 'auth'
    })
    const user = useUserStore()
    return {
      user,
    }
  }
}
</script>

<style scoped>
.infow{
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
}
.taraz{
  display: flex;
  justify-content: space-evenly;
}
@media (max-width: 900px){
  .taraz{
    display: flex;
    flex-direction: column;
  }
  .infow{
    width: 95%;
  }
}
</style>