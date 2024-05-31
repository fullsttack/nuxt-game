<template>
  <div class="alerts-container">
    <template v-for="alert in data" :key="alert.id">
      <div class="alert"  :class="alert.type" v-if="hasHided(alert.id)">
        <div class="title" >{{ alert.title }}</div>
        <div class="body">
          {{ alert.desc }}
        </div>
        <div class="closable" @click="hideAlert(alert.id)" :class="{fixClosable:alert.type==='info'}" v-if="alert.closable">
          &#10006;
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {ref} from "vue";
import {SSRRequest} from "../../composables/SSRRequest";
import {useAlertStore} from "../../stores/alertStore";

export default {
  name: "SSRAlerts",
  async setup(){
    const data = (await SSRRequest.get('alerts'))?.data || []
    const AlertStore = useAlertStore();
    const hideAlert = (alert_id)=>{
      AlertStore.add2Hide(alert_id);
    }
    const hasHided = (alert_id)=>{
      return !AlertStore.hidded_alerts.includes(alert_id);
    }
    return {data,hideAlert,AlertStore,hasHided}
  }
}
</script>

<style scoped>
.alert{
  width: 100%;
  min-height: 30px;
  height: auto;
  text-align: justify;
  font-size: 18px;
  color:white;
  margin: 0;
  padding: 6px;
  border-radius: 0;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 40px 40px;
  padding-left: 60px;
}
.alert .title{
  font-weight: bold;
  font-size: 18px;
}
.warning{
  background-color: #E6A23C;
  background-image: url("/images/alert/warning.svg");
}
.success{
  background-color: #13CE66;
  background-image: url("/images/alert/success.svg");
}
.info{
  background-color: #909399;
  background-image: url("/images/alert/info.svg");
}
.alert .closable{
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
}
.alert .closable:hover{
  filter: invert(50%) grayscale(1);
}
.fixClosable{
  top: 7px !important;
}

@media (max-width: 1600px) {
  .alert:first-child{
    margin-top: 10px;
  }
}
@media (max-width: 800px) {
  .alert:first-child{
    margin-top: 0;
  }
  .alerts-container{
    margin-top: -30px;
  }
  .alert .title,.alert{
    font-size: 15px;
  }
  .alert .closable{
    top: 5px;
    right: 10px;
  }
  .alert .body{
    padding-top: 5px;
  }
}
</style>