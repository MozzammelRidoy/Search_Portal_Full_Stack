import { z } from 'zod'
import { GENERATE_CONSTANTS } from './generate_constant'

export const generateQuerySchema = z.object({
  body: z.object({
    query: z
      .string({ required_error: GENERATE_CONSTANTS.ERROR_MESSAGES.EMPTY_QUERY })
      .min(
        GENERATE_CONSTANTS.VALIDATION_LIMITS.QUERY_MIN_LENGTH,
        GENERATE_CONSTANTS.ERROR_MESSAGES.EMPTY_QUERY
      )
      .max(
        GENERATE_CONSTANTS.VALIDATION_LIMITS.QUERY_MAX_LENGTH,
        'Query cannot exceed 500 characters'
      )
      .refine(
        val => val.trim().length > 0,
        GENERATE_CONSTANTS.ERROR_MESSAGES.EMPTY_QUERY
      )
  })
})

export type TGenerateQuery = z.infer<typeof generateQuerySchema>
