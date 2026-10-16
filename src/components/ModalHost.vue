<script setup>
import { computed } from 'vue'
import ModalShell from './ModalShell.vue'
import StoryModal from './StoryModal.vue'
import InviteModal from './InviteModal.vue'
import HostResultsModal from './HostResultsModal.vue'
import { OB, SCENES, objectOf } from '../data/scenes'
import { ui, H, closeModal, placeChosen, toHider, pick, newGame, title, clickObject, hostResults, mineList } from '../game'

const m = computed(() => ui.modal)
const props = computed(() => (m.value ? m.value.props : {}))
const obj = computed(() => (props.value.id ? objectOf(props.value.id) : null))
const sceneName = computed(() => (SCENES[H.scene] ? SCENES[H.scene].name.toLowerCase() : 'place'))

function seekPick(id) {
  closeModal()
  pick(id)
}
function fromList(k) {
  closeModal()
  clickObject(k)
}
const mine = computed(() => (m.value && m.value.type === 'mine' ? mineList() : []))
</script>

<template>
  <template v-if="m">
    <StoryModal v-if="m.type === 'story'" />
    <InviteModal v-else-if="m.type === 'invite'" :token="props.token" />
    <HostResultsModal v-else-if="m.type === 'hostResults'" :token="props.token" :d="props.d" />

    <!-- choose a place -->
    <ModalShell v-else-if="m.type === 'place'" title="Choose a place" no-close>
      <p>Where will your mystery happen?</p>
      <div class="items">
        <button v-for="(s, k) in SCENES" :key="k" :data-k="k" @click="placeChosen(k)"><span>{{ s.emoji }}</span>{{ s.name }}</button>
      </div>
    </ModalShell>

    <ModalShell v-else-if="m.type === 'intro'" :title="'Player 1: look around the ' + sceneName" no-close>
      <p>Click any object to inspect it. When you find the one you want, choose it and tell a story about it, without ever naming it.</p>
      <template #actions><button class="primary" @click="closeModal">Look around</button></template>
    </ModalShell>

    <!-- inspect an object -->
    <ModalShell v-else-if="m.type === 'inspect'" :title="obj.name">
      <p>{{ obj.desc }}</p>
      <p v-if="props.mode === 'seek'" class="empty">Is this the object the story is about?</p>
      <template #actions>
        <button v-if="props.mode === 'seek'" class="primary" @click="seekPick(props.id)">The clue is about this</button>
        <button v-else-if="props.mode === 'study'" class="primary" @click="toHider(props.id)">Tell a story about this</button>
      </template>
    </ModalShell>

    <ModalShell v-else-if="m.type === 'pass'" title="Pass the device" no-close>
      <p>Your story is locked in. Hand the device to Player 2.</p>
      <p>
        Listen to the recording or read the story, then pick the object the story is about. You get {{ H.max }} wrong picks.<template v-if="H.stake"> Stake: {{ H.stake }} coins, deducted if you lose.</template>
      </p>
      <template #actions><button class="primary" @click="closeModal">I am Player 2</button></template>
    </ModalShell>

    <ModalShell v-else-if="m.type === 'joinIntro'" :title="'A mystery from ' + props.host" no-close>
      <p>
        Listen to the recording or read the story, then pick the object it is about. You get {{ props.guesses }} {{ props.guesses > 1 ? 'guesses' : 'guess' }}.<template v-if="props.stake"> Stake: {{ props.stake }} coins, lost if you fail.</template>
      </p>
      <template #actions><button class="primary" @click="closeModal">Start</button></template>
    </ModalShell>

    <ModalShell v-else-if="m.type === 'read'" title="The story">
      <div class="note">{{ H.story }}</div>
    </ModalShell>

    <!-- result -->
    <ModalShell v-else-if="m.type === 'result'" :title="props.found ? 'You got it!' : 'Out of picks'" no-close>
      <p>The clue was about the {{ objectOf(H.clue).icon }} <b>{{ objectOf(H.clue).name.toLowerCase() }}</b>.</p>
      <p class="big">{{ props.sc }}/100</p>
      <p>{{ props.tier }}</p>
      <p class="empty">Wrong picks: {{ H.wrong }}.</p>
      <p v-if="props.coin && props.coin.kind === 'kept'" style="color: #8fc58a">You kept your {{ props.coin.n }} coins.</p>
      <p v-else-if="props.coin && props.coin.kind === 'lost'" style="color: var(--bad)">You lost {{ props.coin.n }} coins.</p>
      <template #actions>
        <template v-if="H.remote">
          <button class="primary" @click="title">Back to lobby</button>
        </template>
        <template v-else>
          <button class="primary" @click="newGame(false)">Swap roles and play again</button>
          <button @click="title">Leave game</button>
        </template>
      </template>
    </ModalShell>

    <!-- all objects in this place -->
    <ModalShell v-else-if="m.type === 'list'" title="All objects">
      <p class="empty">Tap an object to inspect it.</p>
      <div class="items">
        <button v-for="k in SCENES[ui.scene].items" :key="k" :data-k="k" @click="fromList(k)"><span>{{ OB[k].icon }}</span>{{ OB[k].name }}</button>
      </div>
    </ModalShell>

    <ModalShell v-else-if="m.type === 'leave'" title="Leave this game?">
      <p>{{ H.token && !H.remote ? 'Your invite stays active. Find it under My mysteries.' : 'The story, recording and clue will be lost.' }}</p>
      <template #actions><button class="primary" @click="title">Leave game</button></template>
    </ModalShell>

    <ModalShell v-else-if="m.type === 'mine'" title="My mysteries">
      <template v-if="mine.length">
        <div v-for="x in mine" :key="x.t" class="rrow">
          <span>{{ OB[x.c] ? OB[x.c].icon : '' }} <b>{{ x.t }}</b></span>
          <button @click="hostResults(x.t)">Results</button>
        </div>
      </template>
      <p v-else class="empty">You have not created a mystery on this device yet.</p>
    </ModalShell>
  </template>
</template>
