import { Router } from 'express'
import { requireAuth, adminSupabase } from '../middleware/auth.js'

const router = Router()

// GET /api/documents — list user's documents
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { data, error } = await adminSupabase
      .from('documents')
      .select('id, type, title, status, created_at, updated_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ documents: data })
  } catch (err) { next(err) }
})

// GET /api/documents/:id — get single document
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const { data, error } = await adminSupabase
      .from('documents')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single()

    if (error || !data) return res.status(404).json({ error: 'Document not found' })
    res.json({ document: data })
  } catch (err) { next(err) }
})

// POST /api/documents — save new document
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { type, title, data } = req.body
    if (!type || !title) return res.status(400).json({ error: 'type and title are required' })

    const { data: doc, error } = await adminSupabase
      .from('documents')
      .insert({ user_id: req.user.id, type, title, data, status: 'draft' })
      .select()
      .single()

    if (error) throw error
    res.status(201).json({ document: doc })
  } catch (err) { next(err) }
})

// PATCH /api/documents/:id — update document
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const allowed = ['title', 'data', 'status', 'review_date']
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    )

    const { data, error } = await adminSupabase
      .from('documents')
      .update(updates)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single()

    if (error) throw error
    res.json({ document: data })
  } catch (err) { next(err) }
})

// DELETE /api/documents/:id
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { error } = await adminSupabase
      .from('documents')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)

    if (error) throw error
    res.status(204).send()
  } catch (err) { next(err) }
})

export default router
