<script setup>
import ModalShell from './ModalShell.vue'
import { inviteUrl } from '../supabase'
import { shareLink, copyLink, hostResults } from '../game'

defineProps({ token: String })
</script>

<template>
  <ModalShell title="Invite ready">
    <p>Send this link or code to one person or many. Anyone who opens it can listen to your story and guess the object.</p>
    <input id="lk" class="lk" readonly :value="inviteUrl(token)" />
    <p class="big" style="margin-top: 10px; text-align: center">{{ token }}</p>
    <template #actions>
      <button class="primary" @click="shareLink(token)">Share</button>
      <button @click="copyLink(token)">Copy link</button>
      <button @click="hostResults(token)">Results</button>
    </template>
  </ModalShell>
</template>
