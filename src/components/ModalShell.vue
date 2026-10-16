<script setup>
import { ui, closeModal } from '../game'

defineProps({
  title: { type: String, default: '' },
  noClose: Boolean, // hide the default Close button
})
</script>

<template>
  <div class="ov open">
    <div class="card" role="dialog" aria-modal="true" aria-labelledby="mt">
      <h2 id="mt">{{ ui.flash || title }}</h2>
      <div id="mb"><slot /></div>
      <div id="ma" class="acts">
        <slot name="actions" />
        <button v-if="!noClose" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>
