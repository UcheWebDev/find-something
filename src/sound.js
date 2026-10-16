let AC = null

const TONES = {
  click: [[420, 0], [260, 0.05]],
  bad: [[160, 0], [110, 0.14]],
  open: [[300, 0], [500, 0.1], [800, 0.2]],
  win: [[523, 0], [659, 0.15], [784, 0.3], [1047, 0.45]],
}

export function snd(t) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)()
    const o = AC.createOscillator()
    const g = AC.createGain()
    const n = AC.currentTime
    o.connect(g)
    g.connect(AC.destination)
    const q = TONES[t]
    o.type = t === 'bad' ? 'sawtooth' : 'triangle'
    q.forEach(([f, d]) => o.frequency.setValueAtTime(f, n + d))
    const l = q[q.length - 1][1] + 0.25
    g.gain.setValueAtTime(0.12, n)
    g.gain.exponentialRampToValueAtTime(0.001, n + l)
    o.start(n)
    o.stop(n + l)
  } catch (e) {}
}
