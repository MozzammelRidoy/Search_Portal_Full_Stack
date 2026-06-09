import { Request, Response } from 'express'
import { GenerateServices } from './generate_service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { GENERATE_CONSTANTS } from './generate_constant'

const generate = catchAsync(async (req: Request, res: Response) => {
  const { query } = req.body
  const result = await GenerateServices.search_LegalDocs(query.trim())

  sendResponse(res, {
    status: 200,
    success: true,
    message: GENERATE_CONSTANTS.SUCCESS_MESSAGES.SEARCH_COMPLETE,
    data: result.data,
    meta: result.meta
  })
})

export const GenerateControllers = {
  generate
}
