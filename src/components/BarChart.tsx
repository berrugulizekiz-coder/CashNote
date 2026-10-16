import { useEffect, useState } from 'react'
import type { Transaction } from '../interfaces/Transaction'
import { formatTL } from '../utils/format'

export default function BarChart({ liste }: { liste: Transaction[] }) {
  const [hazir, setHazir] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHazir(true), 100)
    return () => clearTimeout(t)
  }, [])

  const gelir = liste.filter((t) => t.type === 'gelir').reduce((a, t) => a + t.amount, 0)
  const gider = liste.filter((t) => t.type === 'gider').reduce((a, t) => a + t.amount, 0)
  const maks = Math.max(gelir, gider, 1)
  const yukseklik = (v: number) => (hazir ? Math.round((v / maks) * 140) : 0)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-800">Gelir & Gider Dengesi</h2>
      <p className="text-xs text-slate-400">Animasyonlu Çubuk Grafik Analizi</p>

      <div className="mt-4 flex h-52 items-end justify-center gap-12">
        <div className="flex flex-col items-center">
          <span className="mb-1 text-sm font-bold text-emerald-600">{formatTL(gelir)}</span>
          <div
            className="w-16 rounded-t-lg bg-emerald-600 transition-all duration-700"
            style={{ height: yukseklik(gelir) }}
          />
          <span className="mt-2 text-sm font-semibold text-slate-700">Gelir (+)</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="mb-1 text-sm font-bold text-red-600">{formatTL(gider)}</span>
          <div
            className="w-16 rounded-t-lg bg-red-600 transition-all duration-700"
            style={{ height: yukseklik(gider) }}
          />
          <span className="mt-2 text-sm font-semibold text-slate-700">Gider (-)</span>
        </div>
      </div>
    </div>
  )
}
