import { create } from 'zustand'
import { supabase, signIn, signUp, signOut } from '@/lib/supabase'

const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  /** Initialise auth state from Supabase session */
  init: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ user: session?.user ?? null, session, loading: false })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, session })
    })
  },

  login: async (email, password) => {
    set({ error: null, loading: true })
    const { data, error } = await signIn(email, password)
    if (error) { set({ error: error.message, loading: false }); return false }
    set({ user: data.user, session: data.session, loading: false })
    return true
  },

  register: async (email, password, fullName) => {
    set({ error: null, loading: true })
    const { data, error } = await signUp(email, password, { full_name: fullName })
    if (error) { set({ error: error.message, loading: false }); return false }
    set({ user: data.user, loading: false })
    return true
  },

  logout: async () => {
    await signOut()
    set({ user: null, session: null })
  },

  clearError: () => set({ error: null }),
}))

export default useAuthStore
