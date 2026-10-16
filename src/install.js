import { ref } from 'vue'

// Captures the browser's install prompt (Chrome/Edge/Android) so the lobby can show an Install button.
export const canInstall = ref(false)
export const isStandalone =
  typeof window !== 'undefined' &&
  (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true)
export const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)

let deferred = null

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e
    canInstall.value = true
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    canInstall.value = false
  })
}

export async function promptInstall() {
  if (!deferred) return
  deferred.prompt()
  await deferred.userChoice
  deferred = null
  canInstall.value = false
}
