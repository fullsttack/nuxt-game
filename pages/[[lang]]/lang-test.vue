<template>
  <div>
    <div>
      {{api_test}}
      <br><br>
    </div>
  </div>
</template>

<script>
import {SSRRequest} from "../../composables/SSRRequest";
import {ref} from "vue";
import {makeMeta} from "~/composables/useUtils";
export default {

  name: "testpage",
  async setup() {
    const route = useRoute();
    useHead(makeMeta(route.path,'test', 'test', '', 1))

    var api_test = ref(null);
    api_test.value = (await SSRRequest.get('/platforms')).data;
    return {api_test};
  },
  async mounted() {

  }
}
</script>

<style scoped>

</style>
