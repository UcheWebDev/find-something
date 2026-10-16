<script setup>
import { computed } from 'vue'
import { H, W, hint, askLeave, openList } from '../game'

const inGame = computed(() => H.phase !== 'title')
</script>

<template>
  <header>
    <h1>I Hid Something</h1>
    <div class="bar">
      <span id="coins" style="color: var(--brass); font-weight: 600">🪙 {{ W.loaded ? W.coins : '…' }}</span>
      <button id="hint" aria-label="Hint" @click="hint">💡<span class="lbl"> Hint</span></button>
      <button v-if="inGame" id="leave" aria-label="Leave game" @click="askLeave">🚪<span class="lbl"> Leave game</span></button>
    </div>
  </header>
</template>
