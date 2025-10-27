export default defineNuxtPlugin(() => {
  const router = useRouter()
  
  // Ensure the URL updates on route changes
  router.afterEach((to, from) => {
    // Force update the browser URL if it doesn't match
    if (window.location.pathname !== to.path) {
      window.history.replaceState(window.history.state, '', to.fullPath)
    }
  })
})
