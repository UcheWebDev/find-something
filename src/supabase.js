import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null when the env vars are missing: the game still works in "pass the device" mode.
export const sb = url && key && /^https?:\/\//.test(url) && !/your-/i.test(url + key) ? createClient(url, key) : null

export const LS = (k, v) => {
  try {
    if (v === undefined) return localStorage.getItem(k)
    localStorage.setItem(k, v)
  } catch (e) {}
  return null
}

let pid = LS('ihs_pid')
if (!pid) {
  pid = crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()
  LS('ihs_pid', pid)
}
export const PID = pid

export function genToken() {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let t = ''
  crypto.getRandomValues(new Uint8Array(8)).forEach((x) => (t += a[x % a.length]))
  return t
}

export const inviteUrl = (t) => location.href.split(/[?#]/)[0] + '?m=' + t
