export const formatTL = (n: number): string =>
  'TL ' +
  n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const formatTLKisa = (n: number): string =>
  'TL ' + n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })

// Bugünün tarihi: YYYY-MM-DD (yerel saat)
export const bugunStr = (): string => {
  const d = new Date()
  const ay = String(d.getMonth() + 1).padStart(2, '0')
  const gun = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${ay}-${gun}`
}
