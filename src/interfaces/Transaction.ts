export type TransactionType = 'gelir' | 'gider'
export type FilterType = 'tum' | 'bugun' | 'hafta' | 'ay'

export interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  date: string // YYYY-MM-DD
  type: TransactionType
}