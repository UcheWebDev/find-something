<script setup>
import { ui, lobby, W, lobbyCreate, lobbyLocal, lbJoin, showMine, askName } from '../game'
import { sb } from '../supabase'
import { canInstall, isIOS, isStandalone, promptInstall } from '../install'
</script>

<template>
  <div v-if="ui.lobbyOpen" id="lobby" class="open">
    <div class="lb">
      <h2>I Hid Something</h2>
      <p>Pick a place, tell a story about an object in it, and friends guess which one. Lose a round and you lose coins.</p>
      <p id="lb-who" style="color: var(--ink); font-size: 18px">Playing as <b style="color: var(--brass)">{{ lobby.name }}</b></p>
      <p id="lb-bal" style="color: var(--brass); font-size: 20px">{{ W.loaded ? '🪙 ' + W.coins + ' coins' : '' }}</p>
      <button id="lb-create" class="primary" :disabled="!sb" @click="lobbyCreate">🔗 Invite friends</button>
      <div class="jr">
        <input id="lb-code" v-model="lobby.code" maxlength="8" placeholder="INVITE CODE" autocomplete="off" aria-label="Invite code" @keydown.enter="lbJoin(lobby.code)" />
        <button id="lb-join" :disabled="!sb" @click="lbJoin(lobby.code)">Join</button>
      </div>
      <button id="lb-local" @click="lobbyLocal">🎲 Pass the device</button>
      <button id="lb-mine" @click="showMine">📋 My mysteries</button>
      <button id="lb-rename" @click="askName">✏️ Change name</button>
      <button v-if="canInstall" id="lb-install" @click="promptInstall">📲 Install app</button>
      <p v-else-if="isIOS && !isStandalone">To install: tap Share, then Add to Home Screen.</p>
      <p id="lb-status" :style="{ color: lobby.bad ? 'var(--bad)' : 'var(--dim)' }">{{ lobby.status }}</p>
    </div>
  </div>
</template>