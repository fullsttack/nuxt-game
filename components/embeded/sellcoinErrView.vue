<template>
  <div class="alert alert-danger col-md-10" v-if="errors.length !== 0">
    <ul>
      <li v-for="err in errors">{{err}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sellcoinErrView",
  props:['errors']
}
</script>

<style scoped>
ul{
  margin: 0;
}
</style>