<template>

</template>

<script setup>
import {getLocaleRoutePath} from "~/plugins/i18n";
import {useUserStore} from "~/stores/userStore";
import {useAuth} from "~/composables/auth";
import {makeMeta} from "~/composables/useUtils";

const route = useRoute();
const router = useRouter();

useHead(makeMeta(route.path,'Auth', 'Auth', '', true))
definePageMeta({
  middleware: [
    (to, from) => {
      const user = useUserStore()
      if (user.email) {
        return getLocaleRoutePath('/')
      }
    },
  ]
})

const setTokens = () => {
  const token = route.query.token
  const ca_session = route.query.ca_session
  if (!token) {
    router.push({path: getLocaleRoutePath('/')})
    return
  }
  const {setCookies} = useAuth();
  setCookies(token, ca_session)
  const user = useUserStore()
  user.setAccessToken(token)
  router.push({path: getLocaleRoutePath('/')})
}
onMounted(()=>{
  setTokens()
})
</script>
