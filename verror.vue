<template>
  <TitleHeaderFootball>
    {{ error.statusCode }}
  </TitleHeaderFootball>
  <div class="minibox__container">
      <b>
        {{error.message}}
      </b>
  </div>
</template>

<script setup>
import TitleHeaderFootball from "~/components/blocks/TitleHeaderFootball";
  const props = defineProps({
    error: Object,
  });

</script>

<style scoped>

</style>