<script setup>
import { hot } from '../game'
</script>

<template>
  <g id="sc-parlour">
    <rect width="1000" height="450" fill="#3a2230" />
    <rect y="330" width="1000" height="120" fill="#2e1a27" />
    <rect y="450" width="1000" height="150" fill="#3b2614" />
    <rect y="444" width="1000" height="10" fill="#150c08" />

    <g v-bind="hot('p_rug')"><ellipse cx="520" cy="545" rx="330" ry="40" fill="#1f4a5a" /><ellipse cx="520" cy="545" rx="306" ry="32" fill="none" stroke="#d9a441" stroke-opacity=".35" stroke-dasharray="7 5" /></g>

    <g v-bind="hot('p_fire')"><rect x="740" y="240" width="170" height="210" fill="#6b4a3a" stroke="#2a1a12" stroke-width="3" /><rect x="725" y="226" width="200" height="22" fill="#8a6a50" /><rect x="765" y="320" width="120" height="130" fill="#120a06" /><path d="M800 450Q790 400 820 370Q822 410 850 392Q862 430 845 450Z" fill="#f59e0b" /></g>
    <g v-bind="hot('p_photo')"><rect x="759" y="104" width="132" height="102" fill="#5b3a14" /><rect x="765" y="110" width="120" height="90" fill="#b9c4b0" /><circle cx="810" cy="148" r="14" fill="#e8c9a0" /><circle cx="845" cy="152" r="11" fill="#e8c9a0" /><path d="M790 200Q810 170 830 200ZM827 200Q845 176 863 200Z" fill="#33263a" /></g>
    <g v-bind="hot('p_tv')"><rect x="100" y="390" width="220" height="60" fill="#4d311a" stroke="#1d1109" stroke-width="3" /><rect x="70" y="215" width="280" height="170" rx="8" fill="#101010" stroke="#2a2a2a" stroke-width="6" /><rect x="82" y="227" width="256" height="146" fill="#1c4f8a" /><path d="M82 330L150 290 200 320 270 260 338 310V373H82Z" fill="#2a7a5a" /><circle cx="290" cy="262" r="14" fill="#f5e08a" /><path d="M180 215L150 170M240 215L270 170" stroke="#888" stroke-width="3" /></g>
    <g v-bind="hot('p_lamp')"><rect x="372" y="195" width="80" height="260" fill="#000" opacity=".01" /><path d="M412 260V450" stroke="#8a7a62" stroke-width="6" /><path d="M377 262H447L432 200H392Z" fill="#e8c36a" /><ellipse cx="412" cy="452" rx="26" ry="6" fill="#2a1807" /></g>
    <g v-bind="hot('p_sofa')"><rect x="490" y="320" width="220" height="60" rx="14" fill="#7a2a3a" stroke="#2a0d14" stroke-width="3" /><rect x="500" y="360" width="200" height="90" rx="12" fill="#8f3345" stroke="#2a0d14" stroke-width="3" /><rect x="480" y="350" width="30" height="100" rx="12" fill="#7a2a3a" stroke="#2a0d14" stroke-width="3" /><rect x="690" y="350" width="30" height="100" rx="12" fill="#7a2a3a" stroke="#2a0d14" stroke-width="3" /></g>
    <g v-bind="hot('p_table')"><rect x="180" y="500" width="160" height="14" fill="#6b4a2a" stroke="#1d1109" stroke-width="2" /><rect x="190" y="514" width="10" height="36" fill="#4d311a" /><rect x="320" y="514" width="10" height="36" fill="#4d311a" /></g>
    <g v-bind="hot('p_vase')"><path d="M240 498Q226 480 236 462H264Q274 480 260 498Z" fill="#2d6fb0" /><path d="M250 462V440M244 462L232 444M256 462L270 446" stroke="#3c8f5a" stroke-width="3" /><circle cx="250" cy="436" r="6" fill="#ff7a9a" /><circle cx="230" cy="442" r="5" fill="#ffd166" /><circle cx="270" cy="444" r="5" fill="#c084fc" /></g>

    <!-- window, curtained, on the wall above the sofa -->
    <g v-bind="hot('p_window')" transform="translate(470,40)">
      <rect x="-6" y="-6" width="172" height="172" fill="#5b3a14" stroke="#2a1807" stroke-width="3" rx="3" />
      <rect width="160" height="160" fill="#16213d" />
      <g fill="#f1ead0"><circle cx="45" cy="30" r="2.5" /><circle cx="112" cy="44" r="3" /><circle cx="70" cy="110" r="2" /><circle cx="124" cy="116" r="2.5" /></g>
      <path d="M80 0V160M0 80H160" stroke="#5b3a14" stroke-width="5" />
      <path d="M0 0H36Q28 80 40 160H0Z" fill="#1f5a3a" /><path d="M160 0H124Q132 80 120 160H160Z" fill="#1f5a3a" />
    </g>

    <!-- round wall clock showing three o'clock -->
    <g v-bind="hot('p_clock')" transform="translate(690,90)">
      <circle r="32" fill="#2a2a2a" stroke="#0e0e0e" stroke-width="3" /><circle r="27" fill="#f4f0e4" />
      <path d="M0 -22v5M0 17v5M-22 0h5M17 0h5" stroke="#2a2a2a" stroke-width="2.5" />
      <line x1="0" y1="0" x2="14" y2="0" stroke="#222" stroke-width="3.5" stroke-linecap="round" />
      <line x1="0" y1="0" x2="0" y2="-20" stroke="#222" stroke-width="2.5" stroke-linecap="round" />
      <circle r="3" fill="#222" />
    </g>

    <!-- shelf above the TV -->
    <g v-bind="hot('p_shelf')">
      <rect x="90" y="44" width="240" height="86" fill="#000" opacity=".01" />
      <path d="M110 110V128M310 110V128" stroke="#4d311a" stroke-width="5" />
      <rect x="90" y="100" width="240" height="10" fill="#6b4a2a" stroke="#1d1109" stroke-width="2" />
      <path d="M112 100L168 100 158 88 122 88Z" fill="#7a4a22" /><path d="M140 88V56" stroke="#3a2210" stroke-width="3" />
      <path d="M142 58V84H164Z" fill="#efe3cf" /><path d="M138 62V84H120Z" fill="#e8d8b0" />
      <path d="M200 100L204 82H224L228 100Z" fill="#b8643a" />
      <path d="M214 82Q196 68 200 52Q214 62 214 82Z" fill="#3c8f5a" /><path d="M214 82Q234 66 230 50Q216 60 214 82Z" fill="#2f7a4d" />
      <rect x="262" y="66" width="14" height="34" fill="#a62b2b" /><rect x="278" y="62" width="14" height="38" fill="#2d52a8" /><rect x="296" y="70" width="14" height="30" fill="#c1912b" transform="rotate(12 303 100)" />
    </g>

    <!-- cushion on the sofa -->
    <g v-bind="hot('p_cushion')" transform="translate(655,372) rotate(-12)">
      <rect x="-28" y="-28" width="56" height="56" fill="#000" opacity=".01" />
      <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#d9a441" stroke="#6b4a10" stroke-width="2.5" />
      <rect x="-16" y="-16" width="32" height="32" rx="5" fill="none" stroke="#7a1f2a" stroke-width="2" stroke-dasharray="4 3" />
    </g>

    <!-- teapot on the coffee table -->
    <g v-bind="hot('p_teapot')" transform="translate(306,500) scale(.85)">
      <rect x="-36" y="-46" width="76" height="48" fill="#000" opacity=".01" />
      <ellipse cx="0" cy="-16" rx="22" ry="16" fill="#efe6d2" stroke="#8a7a5a" stroke-width="2" />
      <path d="M-20 -22L-34 -32L-30 -36L-18 -28Z" fill="#efe6d2" stroke="#8a7a5a" stroke-width="2" />
      <path d="M20 -22Q36 -26 34 -12Q32 -4 22 -8" fill="none" stroke="#8a7a5a" stroke-width="3" />
      <path d="M-21 -14H21" stroke="#2d6fb0" stroke-width="4" />
      <ellipse cx="0" cy="-31" rx="12" ry="4" fill="#d9a441" /><circle cx="0" cy="-37" r="3" fill="#d9a441" />
    </g>

    <!-- dog asleep on the rug -->
    <g v-bind="hot('p_dog')" transform="translate(600,556)">
      <rect x="-64" y="-30" width="128" height="52" fill="#000" opacity=".01" />
      <path d="M36 2Q58 -2 52 -18" fill="none" stroke="#8a5a2a" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="0" cy="0" rx="40" ry="16" fill="#8a5a2a" />
      <circle cx="-38" cy="-3" r="14" fill="#8a5a2a" />
      <ellipse cx="-50" cy="2" rx="8" ry="6" fill="#a8723a" /><circle cx="-56" cy="0" r="3" fill="#1a1008" />
      <path d="M-30 -14Q-22 -6 -28 6Q-38 -2 -30 -14Z" fill="#5a3a1a" />
      <path d="M-44 -6Q-41 -3 -38 -6" stroke="#1a1008" stroke-width="2" fill="none" stroke-linecap="round" />
      <ellipse cx="-26" cy="14" rx="10" ry="5" fill="#a8723a" />
    </g>

    <!-- armchair, front right -->
    <g v-bind="hot('p_armchair')" transform="translate(805,462)">
      <rect x="-4" y="-4" width="140" height="140" fill="#000" opacity=".01" />
      <rect x="12" y="0" width="108" height="84" rx="14" fill="#c9962b" stroke="#4a3208" stroke-width="3" />
      <rect x="0" y="36" width="30" height="82" rx="12" fill="#b3841f" stroke="#4a3208" stroke-width="3" />
      <rect x="102" y="36" width="30" height="82" rx="12" fill="#b3841f" stroke="#4a3208" stroke-width="3" />
      <rect x="22" y="58" width="88" height="58" rx="10" fill="#dba93a" stroke="#4a3208" stroke-width="3" />
      <path d="M10 118V130M122 118V130" stroke="#2a1a08" stroke-width="7" stroke-linecap="round" />
    </g>

    <!-- tall plant beside the fireplace -->
    <g v-bind="hot('p_plant')" transform="translate(966,450)">
      <rect x="-34" y="-130" width="68" height="132" fill="#000" opacity=".01" />
      <path d="M-18 -30H18L13 2H-13Z" fill="#e8e2d4" stroke="#8a8272" stroke-width="2" /><rect x="-20" y="-36" width="40" height="8" rx="3" fill="#f4efe4" stroke="#8a8272" stroke-width="2" />
      <path d="M0 -34Q-34 -60 -26 -112Q-6 -86 0 -34Z" fill="#2f7a4d" /><path d="M0 -34Q32 -58 28 -108Q8 -84 0 -34Z" fill="#3c8f5a" />
      <path d="M0 -34Q-20 -50 -34 -76Q-12 -66 0 -34Z" fill="#3c8f5a" /><path d="M0 -34Q-6 -80 0 -124Q10 -80 0 -34Z" fill="#256a42" />
    </g>
  </g>
</template>
