import { LEGAL_DOCS } from './generate_data'
import { scoreDoc } from './generate_helpers'
import { formatDocResults } from './generate_lib'

const search_LegalDocs = async (query: string) => {
  const queryLower = query.toLowerCase()

  const scored = LEGAL_DOCS.map(doc => ({
    doc,
    score: scoreDoc(doc, queryLower)
  }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)

  const matched = scored.length > 0 ? scored.map(item => item.doc) : LEGAL_DOCS
  const data = formatDocResults(matched)

  const meta = { page: 1, limit: 10, totalData: data.length, totalPage: 1 }

  return { data, meta }
}

export const GenerateServices = {
  search_LegalDocs
}
