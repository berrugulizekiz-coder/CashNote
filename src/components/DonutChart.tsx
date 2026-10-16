import type { Transaction } from '../interfaces/Transaction'
import { KATEGORI_RENKLERI } from '../utils/constants'
import { formatTLKisa } from '../utils/format'

export default function DonutChart({ liste }: { liste: Transaction[] }) {
  const giderler = liste.filter((t) => t.type === 'gider')
  const toplam = giderler.reduce((a, t) => a + t.amount, 0)

  const kategoriler = Object.entries(
    giderler.reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
  )

  const r = 60
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-800">Gider Dağılımı (Kategori Bazlı)</h2>
      <p className="text-xs text-slate-400">Donut Grafik - Harcama Ağırlıkları</p>

      <div className="mt-4 flex flex-wrap items-center gap-6">
        <div className="relative h-40 w-40">
          <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
            <circle cx="80" cy="80" r={r} fill="none" stroke="#f1f5f9" strokeWidth="22" />
            {toplam > 0 &&
              kategoriler.map(([kat, tutar]) => {
                const uzunluk = (tutar / toplam) * c
                const el = (
                  <circle
                    key={kat}
                    cx="80"
                    cy="80"
                    r={r}
                    fill="none"
                    stroke={KATEGORI_RENKLERI[kat] ?? '#94a3b8'}
                    strokeWidth="22"
                    strokeDasharray={`${uzunluk} ${c - uzunluk}`}
                    strokeDashoffset={-offset}
                  />
                )
                offset += uzunluk
                return el
              })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-700">
            Gider
          </div>
        </div>

        <ul className="flex flex-1 flex-col gap-2">
          {kategoriler.length === 0 && <li className="text-sm text-slate-400">Bu aralıkta gider yok.</li>}
          {kategoriler.map(([kat, tutar]) => (
            <li key={kat} className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span
                  className="inline-block h-3 w-3 rounded-sm"
                  style={{ background: KATEGORI_RENKLERI[kat] ?? '#94a3b8' }}
                />
                {kat}
              </span>
              <span className="font-bold text-slate-800">{formatTLKisa(tutar)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
