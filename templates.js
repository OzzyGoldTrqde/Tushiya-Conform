import { Router } from 'express'

const router = Router()

// GET /api/templates — list available templates
// Templates are currently served from the frontend data layer.
// This route exists for future server-side template management.
router.get('/', (_req, res) => {
  res.json({
    message: 'Templates are served from the frontend data layer. See /frontend/src/data/',
    categories: [
      'Mining & Quarrying',
      'Rail Construction',
      'Construction & Civil Works',
      'Oil, Gas & Energy',
      'Ports & Logistics',
      'Manufacturing & Processing',
      'Desalination & Water Treatment',
      'Facilities & Maintenance',
    ],
  })
})

export default router
