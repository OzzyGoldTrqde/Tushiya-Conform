import { create } from 'zustand'
import { getUserDocuments, saveDocument, updateDocument } from '@/lib/supabase'

const useDocumentStore = create((set, get) => ({
  documents: [],
  current: null,
  loading: false,
  error: null,

  fetchDocuments: async (userId) => {
    set({ loading: true, error: null })
    const { data, error } = await getUserDocuments(userId)
    if (error) { set({ error: error.message, loading: false }); return }
    set({ documents: data || [], loading: false })
  },

  save: async (userId, payload) => {
    set({ loading: true, error: null })
    const { data, error } = await saveDocument(userId, payload)
    if (error) { set({ error: error.message, loading: false }); return null }
    set(s => ({ documents: [data, ...s.documents], loading: false }))
    return data
  },

  update: async (id, updates) => {
    const { data, error } = await updateDocument(id, updates)
    if (error) { set({ error: error.message }); return }
    set(s => ({
      documents: s.documents.map(d => d.id === id ? data : d),
      current: s.current?.id === id ? data : s.current,
    }))
  },

  setCurrent: (doc) => set({ current: doc }),
  clearError: () => set({ error: null }),
}))

export default useDocumentStore
