<template>

</template>

<script>
import {useRouter} from "nuxt/app";

export default {
  name: "index",
   setup(){
     definePageMeta({
       middleware: 'auth'
     })
    const router = useRouter();
    router.push({name:'lang-auction-view',params:{view:'index'}});
  }
}
</script>

<style scoped>

</style>