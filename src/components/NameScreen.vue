<script setup>
import { ref, onMounted } from 'vue'
import { lobby, submitName } from '../game'
import { LS } from '../supabase'

const name = ref(LS('ihs_name') || '')
const err = ref('')
const input = ref(null)

function go() {
  err.value = submitName(name.value)
}

onMounted(() => input.value && input.value.focus())
</script>

<template>
  <div id="namescreen" class="open">
    <form class="lb" @submit.prevent="go">
      <h2>I Hid Something</h2>
      <p v-if="lobby.pending">You have been invited to a mystery. Tell us your name to join.</p>
      <p v-else>Pick a place, tell a story about an object in it, and friends guess which one.</p>
      <label for="ns-name" style="text-align: center; font-size: 22px; color: var(--ink)">What is your name?</label>
      <input
        id="ns-name"
        ref="input"
        v-model="name"
        maxlength="14"
        placeholder="Your name"
        autocomplete="nickname"
        aria-label="Your name"
      />
      <button class="primary" type="submit">Continue</button>
      <p :style="{ color: 'var(--bad)', minHeight: '1.4em' }">{{ err }}</p>
    </form>
  </div>
</template> 