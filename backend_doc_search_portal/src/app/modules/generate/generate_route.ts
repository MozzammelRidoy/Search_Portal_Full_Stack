import { Router } from 'express'
import { GenerateControllers } from './generate_controller'
import validateRequest from '../../middlewares/validateRequest'
import { generateQuerySchema } from './generate_validationZodSchema'

const router: Router = Router()

// Generate Data Route
router.post(
  '/',
  validateRequest(generateQuerySchema),
  GenerateControllers.generate
)

export const GenerateRoutes = router
