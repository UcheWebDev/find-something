<script setup>
import { H, openModal, openStory, showInviteFor, hostResults } from '../game'

function readStory() {
  openModal('read')
}
</script>

<template>
  <footer id="foot">
    <!-- title -->
    <span v-if="H.phase === 'title'" class="empty">Welcome</span>

    <!-- Player 1 is choosing an object -->
    <span v-else-if="H.phase === 'study'" class="empty">Player 1: tap an object (or ☰ for the list), then choose it for your story.</span>

    <!-- Player 1 is writing the story -->
    <template v-else-if="H.phase === 'hider'">
      <button id="setup" class="primary" @click="openStory">Open story setup</button>
      <span class="empty">Player 1 is writing the story. You can still inspect objects.</span>
    </template>

    <!-- the host of an online mystery -->
    <template v-else-if="H.phase === 'host'">
      <span>Code <b>{{ H.token }}</b></span>
      <span class="empty">👥 {{ H.res ? H.res.players_count : 0 }} joined · ✅ {{ H.res ? H.res.solved_count : 0 }} solved</span>
      <button id="hres" @click="hostResults(H.token)">Results</button>
      <button id="hshr" @click="showInviteFor(H.token)">Invite</button>
    </template>

    <!-- Player 2 (also stays after the result) -->
    <template v-else>
      <audio v-if="H.audio" controls :src="H.audio"></audio>
      <button v-if="H.story && H.story.trim()" id="rd" @click="readStory">📖 Read the story</button>
      <span class="empty">Wrong picks: {{ H.wrong }}/{{ H.max }}</span>
    </template>
  </footer>
</template>
