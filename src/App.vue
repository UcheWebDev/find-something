<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import SceneStage from './components/SceneStage.vue'
import LobbyScreen from './components/LobbyScreen.vue'
import NameScreen from './components/NameScreen.vue'
import ModalHost from './components/ModalHost.vue'
import { ui, H, boot, closeModal } from './game'

function onKey(e) {
  if (e.key === 'Escape' && H.phase !== 'title' && H.phase !== 'guess') closeModal()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  boot()
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <AppHeader />
  <main id="main">
    <SceneStage />
    <div id="toast" :class="{ show: ui.toastShow }" role="status">{{ ui.toast }}</div>
  </main>
  <AppFooter />
  <NameScreen v-if="ui.nameOpen" />
  <LobbyScreen />
  <ModalHost />
</template>