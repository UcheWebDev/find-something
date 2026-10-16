<script setup>
import { computed } from 'vue'
import ModalShell from './ModalShell.vue'
import { objectOf } from '../data/scenes'
import { showInviteFor, closeMystery } from '../game'

const props = defineProps({ token: String, d: Object })
const o = computed(() => objectOf(props.d.clue))

function status(p) {
  if (p.solved) return '✅ solved in ' + p.attempts
  if (p.attempts >= props.d.max_guesses) return '❌ out of guesses'
  return '… ' + p.attempts + '/' + props.d.max_guesses + ' tries'
}
</script>

<template>
  <ModalShell :title="'Results · ' + token">
    <p>
      Your object: <b>{{ o.icon }} {{ o.name }}</b><br />{{ d.players_count }} joined, {{ d.solved_count }} solved
    </p>
    <div v-for="(p, i) in d.players" :key="i" class="rrow">
      <b>{{ p.name }}</b><span>{{ status(p) }}</span>
    </div>
    <p v-if="!d.players.length" class="empty">Nobody has joined yet.</p>
    <template #actions>
      <button class="primary" @click="showInviteFor(token)">Invite</button>
      <button v-if="d.status === 'open'" @click="closeMystery(token)">Close mystery</button>
    </template>
  </ModalShell>
</template>
