import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Tushiya Conform] Supabase env vars not set — auth and document saving will not work.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
)

/** Auth helpers */
export async function signUp(email, password, metadata = {}) {
  return supabase.auth.signUp({ email, password, options: { data: metadata } })
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getSession() {
  return supabase.auth.getSession()
}

/** Document helpers */
export async function saveDocument(userId, payload) {
  return supabase.from('documents').insert({
    user_id: userId,
    type: payload.type,
    title: payload.title,
    data: payload.data,
    status: 'draft',
  }).select().single()
}

export async function getUserDocuments(userId) {
  return supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export async function getDocument(id) {
  return supabase.from('documents').select('*').eq('id', id).single()
}

export async function updateDocument(id, updates) {
  return supabase.from('documents').update(updates).eq('id', id).select().single()
}
