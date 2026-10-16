<script setup>
import ModalShell from './ModalShell.vue'
import { H, rec, storyStatus, startRec, stopRec, lockIn, chooseDifferent } from '../game'
import { objectOf } from '../data/scenes'
</script>

<template>
  <ModalShell title="Player 1: tell your story">
    <p>Your object: <b>{{ objectOf(H.clue).icon }} {{ objectOf(H.clue).name }}</b></p>
    <p>
      <b>Write or record a story about it</b><br />
      <span class="empty">Paste or type a paragraph or speech, or record it with the microphone. Use either, or both. Do not name the object.</span>
    </p>
    <textarea v-model="H.story" rows="6" placeholder="Paste or type your story here..."></textarea>
    <div class="row" style="margin-top: 8px">
      <button id="rec" :disabled="rec.on" @click="startRec">🎙️ Record</button>
      <button id="stp" :disabled="!rec.on" @click="stopRec">Stop</button>
      <span class="empty">{{ rec.msg }}</span>
    </div>
    <div v-if="H.audio"><audio controls :src="H.audio" style="width: 100%"></audio></div>

    <div class="row">
      <label>Coins at stake
        <select v-model.number="H.stake">
          <option :value="0">None</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </label>
    </div>
    <div v-if="H.online" class="row">
      <label>Who can join
        <select v-model.number="H.maxP">
          <option :value="0">Anyone with the link</option>
          <option :value="1">One person</option>
          <option :value="5">Up to 5</option>
          <option :value="10">Up to 10</option>
        </select>
      </label>
      <label>Guesses each
        <select v-model.number="H.maxG">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="5">5</option>
        </select>
      </label>
    </div>
    <p id="err" :style="{ color: storyStatus.bad ? 'var(--bad)' : 'var(--dim)', marginTop: '8px' }">{{ storyStatus.text }}</p>

    <template #actions>
      <button class="primary" @click="lockIn">{{ H.online ? 'Create invite link' : 'Lock in my story' }}</button>
      <button @click="chooseDifferent">Choose a different object</button>
    </template>
  </ModalShell>
</template>
