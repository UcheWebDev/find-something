import { reactive } from 'vue'
import { OB, SCENES, sceneOrDefault, objectOf } from './data/scenes'
import { sb, LS, PID, genToken, inviteUrl } from './supabase'
import { snd } from './sound'

/* ---------- shared reactive state ---------- */
export const ui = reactive({ modal: null, flash: '', toast: '', toastShow: false, lobbyOpen: false, nameOpen: false, scene: 'room' })
export const lobby = reactive({ name: '', code: '', status: '', bad: false, pending: false })
export const W = reactive({ coins: 100, loaded: false })
export const H = reactive({ phase: 'title' }) // the current game
export const rec = reactive({ on: false, msg: '' })
export const storyStatus = reactive({ text: '', bad: false })

// phases: title -> study -> hider -> (seek | host) -> guess -> done
export function setH(o) {
  Object.keys(H).forEach((k) => delete H[k])
  Object.assign(H, o)
}

let tt = null
let hostPoll = null
let mr = null
let chunks = []

/* ---------- toast and modal ---------- */
export function toast(m) {
  ui.toast = m
  ui.toastShow = true
  clearTimeout(tt)
  tt = setTimeout(() => (ui.toastShow = false), 3400)
}
export function flash(m) {
  toast(m)
  if (ui.modal) {
    ui.flash = m
    setTimeout(() => (ui.flash = ''), 1500)
  }
}
export function openModal(type, props = {}) {
  ui.flash = ''
  ui.modal = { type, props }
}
export function closeModal() {
  ui.modal = null
}

/* ---------- attributes for a clickable object in a scene ---------- */
export function hot(id) {
  return {
    id,
    class: 'hot',
    tabindex: 0,
    role: 'button',
    'aria-label': OB[id].name,
    onClick: (ev) => {
      ev.stopPropagation()
      clickObject(id)
    },
    onKeydown: (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault()
        clickObject(id)
      }
    },
  }
}

/* ---------- title, lobby ---------- */
function stopHostPoll() {
  clearInterval(hostPoll)
  hostPoll = null
}
export function title() {
  stopHostPoll()
  stopRec()
  setH({ phase: 'title' })
  closeModal()
  showLobby()
}
export function lbStatus(m, bad) {
  lobby.status = m
  lobby.bad = !!bad
}
export function showLobby() {
  lobby.name = (LS('ihs_name') || '').trim()
  // No saved name yet: the first screen asks for it, before the lobby.
  if (lobby.name.length < 2) {
    ui.lobbyOpen = false
    ui.nameOpen = true
    return
  }
  ui.nameOpen = false
  refreshWallet()
  ui.lobbyOpen = true
  lbStatus(sb ? '' : 'Online invites are off: add your Supabase URL and anon key to the .env file. You can still pass the device.', !sb)
}
export function askName() {
  ui.lobbyOpen = false
  ui.nameOpen = true
}
// Returns an error message, or '' when the name was accepted.
export function submitName(raw) {
  const n = (raw || '').trim().slice(0, 14)
  if (n.length < 2) return 'Enter your name (2 to 14 characters).'
  LS('ihs_name', n)
  lobby.name = n
  ui.nameOpen = false
  showLobby()
  if (lobby.pending) {
    // They arrived through an invite link: join it now that we know who they are.
    lobby.pending = false
    if (sb) lbJoin(lobby.code)
  }
  return ''
}
function needName() {
  const n = (lobby.name || '').trim().slice(0, 14)
  if (n.length < 2) {
    askName()
    return false
  }
  LS('ihs_name', n)
  return true
}
export function lobbyLocal() {
  ui.lobbyOpen = false
  newGame(false)
}
export function lobbyCreate() {
  if (sb && needName()) {
    ui.lobbyOpen = false
    newGame(true)
  }
}
export function showMine() {
  openModal('mine')
}
export function boot() {
  title()
  const urlM = (new URLSearchParams(location.search).get('m') || '').toUpperCase()
  if (!urlM) return
  lobby.code = urlM
  if ((LS('ihs_name') || '').trim().length >= 2) {
    if (sb) lbJoin(urlM)
  } else {
    lobby.pending = true // joined automatically after the name screen
  }
}

/* ---------- Player 1: pick a place, choose an object, tell the story ---------- */
export function newGame(on) {
  stopHostPoll()
  stopRec()
  rec.msg = ''
  storyStatus.text = ''
  setH({ phase: 'study', story: '', audio: null, audioBlob: null, clue: null, wrong: 0, max: 3, online: on === true, maxP: 0, maxG: 3, stake: 0, scene: 'room' })
  openModal('place')
}
export function placeChosen(k) {
  H.scene = k
  ui.scene = k
  openModal('intro')
}
export function toHider(id) {
  H.clue = id
  H.phase = 'hider'
  storyStatus.text = ''
  openModal('story')
}
export function openStory() {
  if (H.phase !== 'hider') return
  storyStatus.text = ''
  openModal('story')
}
export function chooseDifferent() {
  stopRec()
  H.phase = 'study'
  closeModal()
}

export async function startRec() {
  try {
    if (!navigator.mediaDevices || !window.MediaRecorder) throw 0
    const st = await navigator.mediaDevices.getUserMedia({ audio: true })
    chunks = []
    mr = new MediaRecorder(st)
    mr.ondataavailable = (e) => chunks.push(e.data)
    mr.onstop = () => {
      st.getTracks().forEach((t) => t.stop())
      rec.on = false
      if (!chunks.length) return
      if (H.audio) URL.revokeObjectURL(H.audio)
      H.audioBlob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' })
      H.audio = URL.createObjectURL(H.audioBlob)
      rec.msg = 'Saved. Play it back, or record again.'
    }
    mr.start()
    rec.on = true
    rec.msg = 'Recording... press Stop when you are done.'
  } catch (e) {
    rec.msg = 'The microphone is not available here. Allow access in your browser, or paste your story instead.'
  }
}
export function stopRec() {
  if (mr && mr.state === 'recording') mr.stop()
}

export async function lockIn() {
  storyStatus.bad = true
  storyStatus.text = ''
  if (rec.on) {
    storyStatus.text = 'Press Stop before you continue.'
    return
  }
  if (!H.story.trim() && !H.audio) {
    storyStatus.text = 'Add a story or record one, so Player 2 has something to follow.'
    snd('bad')
    return
  }
  if (H.online) return createOnline()
  H.stake = Math.min(H.stake, W.coins)
  H.phase = 'seek'
  H.wrong = 0
  snd('open')
  openModal('pass')
}

/* ---------- Player 2 ---------- */
export function clickObject(id) {
  if (!H || H.phase === 'title' || H.phase === 'guess' || H.phase === 'done') return
  if (H.phase === 'seek') {
    openModal('inspect', { id, mode: 'seek' })
    return
  }
  snd('click')
  if (H.phase === 'study') {
    openModal('inspect', { id, mode: 'study' })
    return
  }
  openModal('inspect', { id, mode: 'view' })
}

export async function pick(id) {
  snd('click')
  if (H.remote) {
    if (H.busy) return
    H.busy = true
    try {
      const r = await sb.rpc('submit_guess', { p_token: H.token, p_player: PID, p_name: LS('ihs_name') || 'Player', p_guess: id })
      if (r.error) throw r.error
      const d = r.data
      H.wrong = d.attempts_used - (d.correct ? 1 : 0)
      if (d.finished) {
        H.phase = 'guess'
        H.clue = d.answer
        H.lost = d.lost || 0
        if (d.coins != null) W.coins = d.coins
        result(d.correct)
      } else {
        snd('bad')
        toast('Not the ' + OB[id].name.toLowerCase() + '. ' + d.attempts_left + ' picks left.')
      }
    } catch (err) {
      toast('Could not send your pick: ' + (err.message || 'offline'))
    } finally {
      H.busy = false
    }
    return
  }
  if (id === H.clue) {
    H.phase = 'guess'
    result(true)
    return
  }
  H.wrong++
  snd('bad')
  toast('Not the ' + OB[id].name.toLowerCase() + '. ' + (H.max - H.wrong) + ' picks left.')
  if (H.wrong >= H.max) {
    H.phase = 'guess'
    result(false)
  }
}

function coinLine(found) {
  if (!H.stake) return null
  if (found) return { kind: 'kept', n: H.stake }
  const lost = H.remote ? H.lost || 0 : Math.min(H.stake, W.coins)
  if (!H.remote && lost > 0 && !H.paid) {
    H.paid = 1
    setCoins(W.coins - lost)
  }
  return lost ? { kind: 'lost', n: lost } : null
}

function result(found) {
  H.phase = 'done'
  const sc = found ? Math.round(100 - (H.wrong * 100) / (H.max + 1)) : 0
  snd(found ? 'win' : 'bad')
  const tier = !found ? 'That clue was well disguised.' : sc === 100 ? 'You know your friend inside out.' : sc >= 75 ? 'Sharp listener.' : 'You got there in the end.'
  openModal('result', { found, sc, tier, coin: coinLine(found) })
}

export function hint() {
  if (!H || H.phase === 'title') return
  toast(
    H.phase === 'study'
      ? 'Hint: pick an object you can describe well, then click it and choose it.'
      : H.phase === 'hider'
        ? 'Hint: describe the object through a story, without naming it.'
        : H.phase === 'seek'
          ? 'Hint: listen for colours, shapes or uses in the story, then find the object that matches.'
          : 'Hint: think about what the story said.',
  )
}
export function askLeave() {
  openModal('leave')
}
export function openList() {
  if (!H || H.phase === 'title' || H.phase === 'done' || H.phase === 'guess') return
  openModal('list')
}

/* ---------- online invites ---------- */
export async function lbJoin(code) {
  code = String(code || '').trim().toUpperCase()
  if (!sb || !needName()) return
  if (code.length < 4) {
    lbStatus('Enter the invite code.', true)
    return
  }
  lbStatus('Looking for that mystery…')
  const r = await sb.rpc('join_mystery', { p_token: code, p_player: PID, p_name: LS('ihs_name') })
  if (r.error) {
    lbStatus('Could not reach the server: ' + r.error.message, true)
    return
  }
  const d = r.data
  if (!d) {
    lbStatus('No mystery found with that code.', true)
    return
  }
  if (d.status === 'closed' && !d.answer) {
    lbStatus('The host has closed this mystery.', true)
    return
  }
  if (d.status === 'poor') {
    lbStatus('You need ' + d.need + ' coins to join this one. You have ' + W.coins + '.', true)
    return
  }
  if (d.full) {
    lbStatus('This mystery already has all its players.', true)
    return
  }
  ui.lobbyOpen = false
  const audio = d.audio_path ? sb.storage.from('mystery-audio').getPublicUrl(d.audio_path).data.publicUrl : null
  const scene = sceneOrDefault(d.scene)
  setH({ phase: 'seek', story: d.story || '', audio, audioBlob: null, clue: null, wrong: d.attempts_used, max: d.max_guesses, online: true, remote: true, token: code, scene, stake: d.stake || 0 })
  ui.scene = scene
  history.replaceState(null, '', location.pathname)
  if (d.finished) {
    H.phase = 'guess'
    H.clue = d.answer
    H.wrong = d.attempts_used - (d.solved ? 1 : 0)
    result(d.solved)
    return
  }
  openModal('joinIntro', { host: d.host_name, guesses: d.max_guesses, stake: d.stake })
}

async function createOnline() {
  if (H.busy) return
  H.busy = true
  storyStatus.bad = false
  storyStatus.text = 'Creating your invite…'
  try {
    const token = genToken()
    let path = null
    if (H.audioBlob) {
      const t = (H.audioBlob.type || 'audio/webm').split(';')[0]
      path = token + (/mp4|aac/.test(t) ? '.m4a' : /ogg/.test(t) ? '.ogg' : /mpeg/.test(t) ? '.mp3' : '.webm')
      const up = await sb.storage.from('mystery-audio').upload(path, H.audioBlob, { contentType: t })
      if (up.error) throw up.error
    }
    const r = await sb.rpc('create_mystery', {
      p_token: token,
      p_host: PID,
      p_host_name: LS('ihs_name') || 'Host',
      p_story: H.story.trim(),
      p_audio_path: path,
      p_clue: H.clue,
      p_max_guesses: H.maxG,
      p_max_players: H.maxP || null,
      p_stake: H.stake,
      p_scene: H.scene,
    })
    if (r.error) throw r.error
    const l = mineList().filter((x) => x.t !== token)
    l.unshift({ t: token, c: H.clue })
    LS('ihs_mine', JSON.stringify(l.slice(0, 20)))
    H.token = token
    H.phase = 'host'
    H.res = null
    hostRefresh()
    hostPoll = setInterval(hostRefresh, 5000)
    snd('win')
    openModal('invite', { token })
  } catch (err) {
    storyStatus.bad = true
    storyStatus.text = 'Could not create the invite: ' + (err.message || err)
    snd('bad')
  } finally {
    H.busy = false
  }
}

export function showInviteFor(t) {
  openModal('invite', { token: t })
}
export function shareLink(t) {
  const u = inviteUrl(t)
  if (navigator.share) navigator.share({ title: 'I Hid Something', text: 'Which object is my story about? Join my mystery.', url: u }).catch(() => {})
  else copyLink(t)
}
export function copyLink(t) {
  ;(navigator.clipboard ? navigator.clipboard.writeText(inviteUrl(t)) : Promise.reject()).then(
    () => flash('Link copied'),
    () => {
      const i = document.getElementById('lk')
      if (i) {
        i.focus()
        i.select()
      }
      flash('Press and hold the link to copy')
    },
  )
}

async function hostRefresh() {
  if (!H || H.phase !== 'host') return
  try {
    const r = await sb.rpc('get_results', { p_token: H.token, p_host: PID })
    if (r.data) {
      H.res = r.data
      refreshWallet()
    }
  } catch (e) {}
}
export async function hostResults(t) {
  if (!sb) {
    flash('Online is not set up')
    return
  }
  const r = await sb.rpc('get_results', { p_token: t, p_host: PID })
  if (r.error || !r.data) {
    flash('Could not load results')
    return
  }
  openModal('hostResults', { token: t, d: r.data })
}
export async function closeMystery(t) {
  const r = await sb.rpc('close_mystery', { p_token: t, p_host: PID })
  flash(r.error ? 'Could not close it' : 'Mystery closed')
  if (!r.error) hostResults(t)
}
export function mineList() {
  try {
    return JSON.parse(LS('ihs_mine') || '[]')
  } catch (e) {
    return []
  }
}

/* ---------- coins ---------- */
export function setCoins(n) {
  W.coins = Math.max(0, n)
  if (!sb) LS('ihs_coins', String(W.coins))
}
export async function refreshWallet() {
  if (sb) {
    try {
      const r = await sb.rpc('get_wallet', { p_player: PID, p_name: LS('ihs_name') || 'Player' })
      if (r.data) {
        W.coins = r.data.coins
      }
    } catch (e) {}
  } else {
    W.coins = +(LS('ihs_coins') || 100)
  }
  W.loaded = true
}
export { objectOf }