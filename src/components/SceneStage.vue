<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ui } from '../game'
import { SCENES } from '../data/scenes'
import { SCENE_COMPONENTS } from '../scenes'

const stage = ref(null)
const svg = ref(null)
let Z = 1
let ro = null

// Fit the 1000x600 scene to the screen, then let the player zoom in (never out past "fit").
function layout(fit) {
  const st = stage.value
  const sv = svg.value
  if (!st || !sv || !st.clientWidth) return
  const w = st.clientWidth - 16
  const h = st.clientHeight - 16
  const base = Math.min(w / 1000, h / 600)
  if (fit) Z = 1
  const sc = Math.max(base, base * Z)
  sv.style.width = 1000 * sc + 'px'
  sv.style.height = 600 * sc + 'px'
  if (fit) st.scrollLeft = (st.scrollWidth - st.clientWidth) / 2
}
const zoomIn = () => {
  Z = Math.min(2.4, Z * 1.25)
  layout()
}
const zoomOut = () => {
  Z = Math.max(0.4, Z / 1.25)
  layout()
}

onMounted(() => {
  ro = new ResizeObserver(() => layout())
  ro.observe(stage.value)
  layout(true)
})
onBeforeUnmount(() => ro && ro.disconnect())
</script>

<template>
  <div id="stage" ref="stage">
    <svg id="room" ref="svg" viewBox="0 0 1000 600" role="img" :aria-label="SCENES[ui.scene].label">
      <component :is="SCENE_COMPONENTS[ui.scene]" />
    </svg>
  </div>
  <div id="zoom" role="group" aria-label="Zoom">
    <button id="zo" aria-label="Zoom out" @click="zoomOut">−</button>
    <button id="zf" aria-label="Fit room to screen" @click="layout(true)">⤢</button>
    <button id="zi" aria-label="Zoom in" @click="zoomIn">+</button>
  </div>
</template>
