export type TLegalDoc = {
  id: number
  title: string
  keywords: string[]
  content: string
}

export type TDocResult = {
  id: number
  title: string
  summary: string
}

export type TGenerateRequest = {
  query: string
}
