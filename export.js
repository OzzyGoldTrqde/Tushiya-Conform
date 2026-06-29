import { Router } from 'express'
import { requireAuth, optionalAuth } from '../middleware/auth.js'
import { exportLimiter } from '../middleware/rateLimit.js'
import { generateRiskAssessmentDocx } from '../services/docxService.js'

const router = Router()

// POST /api/export/docx/risk-assessment — Word export (Pro plan)
router.post('/docx/risk-assessment', requireAuth, exportLimiter, async (req, res, next) => {
  try {
    const { data: ra } = req.body
    if (!ra) return res.status(400).json({ error: 'Risk assessment data required' })

    const buffer = await generateRiskAssessmentDocx(ra)

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    res.setHeader('Content-Disposition', `attachment; filename="RiskAssessment_TushiyaConform.docx"`)
    res.send(buffer)
  } catch (err) { next(err) }
})

export default router
