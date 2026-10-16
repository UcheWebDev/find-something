<script setup>
import { hot } from '../game'
</script>

<template>
  <g id="sc-room">
    <defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2018" /><stop offset="1" stop-color="#181109" /></linearGradient></defs>
    <rect width="1000" height="450" fill="url(#wall)" />
    <rect y="450" width="1000" height="150" fill="#24170d" />
    <rect y="444" width="1000" height="10" fill="#0e0905" />

    <g v-bind="hot('rug')"><ellipse cx="480" cy="540" rx="300" ry="42" fill="#5a1d24" /><ellipse cx="480" cy="540" rx="276" ry="34" fill="none" stroke="#d9a441" stroke-opacity=".4" stroke-dasharray="7 5" /></g>

    <g v-bind="hot('window')" transform="translate(780,70)">
      <rect x="-6" y="-6" width="162" height="182" fill="#5b3a14" stroke="#2a1807" stroke-width="3" rx="3" />
      <rect width="150" height="170" fill="#16213d" /><circle cx="105" cy="45" r="20" fill="#f1ead0" /><circle cx="113" cy="40" r="17" fill="#16213d" />
      <g fill="#f1ead0"><circle cx="30" cy="30" r="2" /><circle cx="60" cy="70" r="2" /><circle cx="120" cy="110" r="2" /><circle cx="40" cy="120" r="2" /></g>
      <path d="M75 0V170M0 85H150" stroke="#5b3a14" stroke-width="5" />
      <path d="M0 0H34Q26 85 38 170H0Z" fill="#7a1f2a" /><path d="M150 0H116Q124 85 112 170H150Z" fill="#7a1f2a" />
    </g>

    <g v-bind="hot('mirror')" transform="translate(560,150)">
      <ellipse rx="34" ry="52" fill="#5b3a14" stroke="#2a1807" stroke-width="3" /><ellipse rx="28" ry="46" fill="#aab8c2" /><path d="M-14 -30Q-4 -36 6 -28" stroke="#fff" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round" />
    </g>

    <g v-bind="hot('globe')" transform="translate(100,490)">
      <ellipse cx="0" cy="84" rx="32" ry="8" fill="#2a1807" /><path d="M0 62V84" stroke="#8a7a62" stroke-width="5" />
      <circle cx="0" cy="30" r="36" fill="#2d6a9f" stroke="#d9a441" stroke-width="3" />
      <path d="M-22 14Q-8 4 4 14Q10 26 -4 32Q-16 34 -22 26Z M10 34Q22 34 24 46Q16 56 8 48Z" fill="#4f8a4a" />
      <ellipse cx="0" cy="30" rx="14" ry="36" fill="none" stroke="#d9a441" stroke-opacity=".5" />
    </g>

    <g v-bind="hot('plant')" transform="translate(222,500)">
      <path d="M-26 40H26L18 90H-18Z" fill="#a4532b" stroke="#5a2a14" stroke-width="2" /><rect x="-28" y="34" width="56" height="10" rx="3" fill="#b8643a" />
      <path d="M0 36Q-34 10 -30 -24Q-8 -6 0 36Z" fill="#2f7a4d" /><path d="M0 36Q34 6 32 -30Q8 -10 0 36Z" fill="#3c8f5a" /><path d="M0 36Q-4 -10 0 -38Q8 -8 0 36Z" fill="#256a42" />
    </g>

    <g v-bind="hot('books')" transform="translate(50,70)">
      <rect width="230" height="390" fill="#3a2515" stroke="#150c06" stroke-width="4" rx="4" />
      <rect x="10" y="10" width="210" height="370" fill="#22140a" />
      <rect x="10" y="125" width="210" height="9" fill="#52361f" /><rect x="10" y="250" width="210" height="9" fill="#52361f" />
      <g stroke="#0004">
        <rect x="22" y="48" width="31" height="77" rx="2" fill="#a62b2b" /><rect x="60" y="58" width="31" height="67" rx="2" fill="#2f7a4d" /><rect x="98" y="42" width="31" height="83" rx="2" fill="#2d52a8" /><rect x="136" y="52" width="31" height="73" rx="2" fill="#c1912b" /><rect x="174" y="46" width="31" height="79" rx="2" fill="#6d3a9c" />
        <rect x="22" y="168" width="40" height="82" rx="2" fill="#5a4a38" /><rect x="66" y="180" width="30" height="70" rx="2" fill="#7a2420" /><rect x="100" y="172" width="44" height="78" rx="2" fill="#3d5a52" /><rect x="150" y="190" width="30" height="60" rx="2" fill="#8a6a2a" />
        <rect x="22" y="296" width="60" height="82" rx="2" fill="#3d4a52" /><rect x="90" y="310" width="90" height="68" rx="2" fill="#5a3a52" />
      </g>
    </g>

    <g v-bind="hot('painting')" transform="translate(340,80)">
      <rect x="-10" y="-10" width="180" height="140" fill="#451a03" stroke="#78350f" stroke-width="4" rx="4" />
      <rect width="160" height="120" fill="#e2e8f0" />
      <path d="M0 90L40 50 80 78 120 38 160 88V120H0Z" fill="#15803d" /><circle cx="118" cy="30" r="14" fill="#fbbf24" />
      <path d="M0 104H160V120H0Z" fill="#166534" />
    </g>

    <g v-bind="hot('clock')" transform="translate(620,70)">
      <circle cx="50" cy="50" r="50" fill="#5b3a14" stroke="#2a1807" stroke-width="3" /><circle cx="50" cy="50" r="42" fill="#efe3cf" />
      <path d="M50 12v8M50 80v8M12 50h8M80 50h8" stroke="#2a1807" stroke-width="3" />
      <line x1="50" y1="50" x2="50" y2="28" stroke="#2a1807" stroke-width="5" stroke-linecap="round" transform="rotate(300 50 50)" />
      <line x1="50" y1="50" x2="50" y2="20" stroke="#8a2a1c" stroke-width="3" stroke-linecap="round" transform="rotate(60 50 50)" />
      <circle cx="50" cy="50" r="4" fill="#2a1807" />
    </g>

    <!-- desk -->
    <g transform="translate(730,300)">
      <rect x="0" y="40" width="240" height="30" fill="#4d311a" stroke="#1d1109" stroke-width="3" />
      <rect x="12" y="70" width="216" height="140" fill="#33200f" stroke="#1d1109" stroke-width="3" />
      <g v-bind="hot('drawer')"><rect x="24" y="82" width="192" height="50" fill="#3f2914" stroke="#1d1109" stroke-width="2" /><rect x="108" y="100" width="24" height="9" rx="3" fill="#d9a441" /></g>
      <rect x="24" y="142" width="192" height="50" fill="#3a2512" stroke="#1d1109" stroke-width="2" />
      <g v-bind="hot('journal')"><rect x="40" y="16" width="64" height="26" fill="#7a2420" stroke="#2b0d0b" stroke-width="2" rx="2" /><line x1="72" y1="16" x2="72" y2="42" stroke="#d9a441" stroke-width="2" /></g>
      <g v-bind="hot('lamp')"><rect x="132" y="-26" width="80" height="72" fill="#000" opacity=".01" /><path d="M200 40Q200 -10 160 -6" fill="none" stroke="#8a7a62" stroke-width="5" /><path d="M144 -2L178 -2 184 -20 138 -20Z" fill="#d9a441" /></g>
    </g>

    <!-- side table (the safe that used to stand here has been removed) -->
    <g transform="translate(330,360)">
      <rect x="0" y="50" width="330" height="40" fill="#4d311a" stroke="#1d1109" stroke-width="3" />
      <rect x="14" y="90" width="302" height="90" fill="#33200f" stroke="#1d1109" stroke-width="3" />
    </g>

    <g v-bind="hot('candle')" transform="translate(362,0)">
      <rect x="-6" y="340" width="40" height="72" fill="#000" opacity=".01" />
      <rect x="0" y="400" width="28" height="10" rx="2" fill="#d9a441" /><rect x="8" y="364" width="12" height="36" fill="#efe3cf" />
      <path d="M14 346Q6 358 14 366Q22 358 14 346Z" fill="#f59e0b" />
    </g>

    <g v-bind="hot('chair')" transform="translate(672,400)">
      <rect x="-4" y="-4" width="58" height="134" fill="#000" opacity=".01" />
      <g fill="#4d311a" stroke="#1d1109" stroke-width="2"><rect x="34" y="0" width="12" height="72" rx="2" /><rect x="0" y="70" width="46" height="10" rx="2" /><rect x="2" y="80" width="6" height="46" /><rect x="38" y="80" width="6" height="46" /></g>
    </g>

    <g v-bind="hot('teacup')" transform="translate(618,396)">
      <rect x="0" y="-30" width="48" height="50" fill="#000" opacity=".01" />
      <ellipse cx="22" cy="14" rx="22" ry="5" fill="#e8dfcf" />
      <path d="M8 -4H36Q36 14 22 14Q8 14 8 -4Z" fill="#efe3cf" stroke="#b9a98a" /><ellipse cx="22" cy="-4" rx="14" ry="3" fill="#6b3b1a" />
      <path d="M36 0Q48 0 46 8Q44 12 35 10" fill="none" stroke="#b9a98a" stroke-width="3" />
      <path d="M18 -10Q14 -18 20 -24M26 -10Q30 -18 24 -24" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2" />
    </g>

    <g v-bind="hot('trophy')" transform="translate(165,70)">
      <rect x="-36" y="-68" width="72" height="70" fill="#000" opacity=".01" />
      <rect x="-18" y="-8" width="36" height="8" fill="#6b4a1a" /><rect x="-4" y="-24" width="8" height="16" fill="#d9a441" />
      <path d="M-18 -64H18Q18 -26 0 -24Q-18 -26 -18 -64Z" fill="#e8b94a" stroke="#8a6a1a" stroke-width="2" />
      <path d="M-18 -58Q-34 -56 -26 -40M18 -58Q34 -56 26 -40" fill="none" stroke="#d9a441" stroke-width="4" />
    </g>

    <g v-bind="hot('suitcase')" transform="translate(790,530)">
      <rect x="-4" y="-10" width="118" height="80" fill="#000" opacity=".01" />
      <path d="M38 10V2Q55 -6 72 2V10" fill="none" stroke="#2a1807" stroke-width="5" />
      <rect x="0" y="10" width="110" height="56" rx="6" fill="#7a4a22" stroke="#3a2210" stroke-width="3" />
      <path d="M0 38H110" stroke="#3a2210" stroke-width="2" /><rect x="20" y="30" width="10" height="14" rx="2" fill="#d9a441" /><rect x="80" y="30" width="10" height="14" rx="2" fill="#d9a441" />
    </g>

    <g v-bind="hot('cat')" transform="translate(300,572)">
      <rect x="-52" y="-30" width="112" height="50" fill="#000" opacity=".01" />
      <path d="M32 4Q60 2 54 -14" fill="none" stroke="#4a4a55" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="0" cy="0" rx="36" ry="17" fill="#4a4a55" /><circle cx="-34" cy="-4" r="13" fill="#4a4a55" />
      <path d="M-44 -14L-42 -28L-34 -16ZM-30 -16L-24 -28L-22 -12Z" fill="#4a4a55" />
      <path d="M-40 -4Q-37 -1 -34 -4M-32 -4Q-29 -1 -26 -4" fill="none" stroke="#e8c36a" stroke-width="2" stroke-linecap="round" />
    </g>
  </g>
</template>
