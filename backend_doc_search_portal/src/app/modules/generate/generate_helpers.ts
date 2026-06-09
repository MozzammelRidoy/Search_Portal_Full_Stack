import { TLegalDoc } from './generate_interface'

/**
 * Score a doc by counting keyword hits in the query.
 */
export const scoreDoc = (doc: TLegalDoc, queryLower: string): number => {
  return doc.keywords.reduce(
    (score, kw) => score + (queryLower.includes(kw) ? 1 : 0),
    0
  )
}
