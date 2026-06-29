import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { adminSupabase } from '../middleware/auth.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// POST /api/signatures/share — generate share link for a document
router.post('/share', requireAuth, async (req, res, next) => {
  try {
    const { documentId, expiryDays = 14 } = req.body
    const shareToken = uuidv4()
    const expiresAt = new Date(Date.now() + expiryDays * 86400 * 1000).toISOString()

    const { data, error } = await adminSupabase
      .from('share_links')
      .insert({ document_id: documentId, token: shareToken, expires_at: expiresAt })
      .select()
      .single()

    if (error) throw error

    res.json({
      shareUrl: `${process.env.FRONTEND_URL}/sign/${shareToken}`,
      expiresAt,
    })
  } catch (err) { next(err) }
})

// GET /api/signatures/:token — get document by share token (public)
router.get('/:token', async (req, res, next) => {
  try {
    const { data: link, error: linkErr } = await adminSupabase
      .from('share_links')
      .select('*, documents(*)')
      .eq('token', req.params.token)
      .single()

    if (linkErr || !link) return res.status(404).json({ error: 'Share link not found' })
    if (new Date(link.expires_at) < new Date()) return res.status(410).json({ error: 'Share link has expired' })

    res.json({ document: link.documents })
  } catch (err) { next(err) }
})

// POST /api/signatures/:token/sign — submit a signature
router.post('/:token/sign', async (req, res, next) => {
  try {
    const { signerName, signatureData } = req.body

    const { data: link } = await adminSupabase
      .from('share_links')
      .select('id, document_id, expires_at')
      .eq('token', req.params.token)
      .single()

    if (!link || new Date(link.expires_at) < new Date()) {
      return res.status(410).json({ error: 'Link expired or invalid' })
    }

    const { data, error } = await adminSupabase
      .from('signatures')
      .insert({
        document_id: link.document_id,
        share_link_id: link.id,
        signer_name: signerName,
        signature_data: signatureData,
        signed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    res.status(201).json({ signature: data, message: 'Signature recorded successfully' })
  } catch (err) { next(err) }
})

// GET /api/signatures/report/:documentId — sign-off report (authenticated)
router.get('/report/:documentId', requireAuth, async (req, res, next) => {
  try {
    const { data, error } = await adminSupabase
      .from('signatures')
      .select('signer_name, signed_at, id')
      .eq('document_id', req.params.documentId)
      .order('signed_at', { ascending: true })

    if (error) throw error
    res.json({ signatures: data, count: data.length })
  } catch (err) { next(err) }
})

export default router
