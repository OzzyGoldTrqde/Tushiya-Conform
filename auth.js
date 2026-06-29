import { Router } from 'express'
import { authLimiter } from '../middleware/rateLimit.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/auth/me — return current user info
router.get('/me', requireAuth, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.user_metadata?.full_name,
    plan: req.user.user_metadata?.plan || 'free',
  })
})

// POST /api/auth/logout — server-side session cleanup (Supabase handles client logout)
router.post('/logout', requireAuth, (_req, res) => {
  res.json({ message: 'Logged out successfully' })
})

export default router
