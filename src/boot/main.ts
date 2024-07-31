import { authValidator } from 'src/utils/proccessor';
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  router.beforeResolve((to, from) => {
    authValidator({ to, from }, router)
  })
})
