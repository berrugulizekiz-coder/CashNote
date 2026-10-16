import type { FilterType, Transaction } from '../interfaces/Transaction'

export function filtrele(liste: Transaction[], filtre: FilterType): Transaction[] {
  if (filtre === 'tum') return liste

  const simdi = new Date()
  const bugun = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate())

  return liste.filter((t) => {
    const [y, m, g] = t.date.split('-').map(Number)
    const tarih = new Date(y, m - 1, g)

    if (filtre === 'bugun') return tarih.getTime() === bugun.getTime()

    if (filtre === 'hafta') {
      const gunNo = (bugun.getDay() + 6) % 7 // Pazartesi = 0
      const haftaBasi = new Date(bugun)
      haftaBasi.setDate(bugun.getDate() - gunNo)
      return tarih >= haftaBasi && tarih <= bugun
    }

    // ay
    return tarih.getFullYear() === bugun.getFullYear() && tarih.getMonth() === bugun.getMonth()
  })
}
