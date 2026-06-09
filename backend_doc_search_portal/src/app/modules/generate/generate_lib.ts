import { TLegalDoc, TDocResult } from './generate_interface'

export const formatDocResult = (doc: TLegalDoc): TDocResult => ({
  id: doc.id,
  title: doc.title,
  summary: doc.content
})

export const formatDocResults = (docs: TLegalDoc[]): TDocResult[] =>
  docs.map(formatDocResult)
