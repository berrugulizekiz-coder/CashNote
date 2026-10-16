import type { Transaction } from '../interfaces/Transaction'
import { formatTL } from '../utils/format'

interface Props {
  liste: Transaction[]
}

export default function SummaryCards({ liste }: Props) {
  const gelir = liste.filter((t) => t.type === 'gelir').reduce((a, t) => a + t.amount, 0)
  const gider = liste.filter((t) => t.type === 'gider').reduce((a, t) => a + t.amount, 0)
  const net = gelir - gider
  const oran = gelir > 0 ? Math.max(0, Math.min(100, Math.round((net / gelir) * 100))) : 0

  const kart = 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm'
  const baslik = 'text-[11px] font-semibold uppercase tracking-wide text-slate-500'

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className={kart}>
        <p className={baslik}>Toplam Gelir</p>
        <p className="mt-1 text-2xl font-extrabold text-emerald-600">{formatTL(gelir)}</p>
        <p className="mt-1 text-xs text-slate-400">+ Gelir kayıtları aktif</p>
      </div>

      <div className={kart}>
        <p className={baslik}>Toplam Gider</p>
        <p className="mt-1 text-2xl font-extrabold text-red-600">{formatTL(gider)}</p>
        <p className="mt-1 text-xs text-slate-400">- Harcama kayıtları</p>
      </div>

      <div className={kart}>
        <p className={baslik}>Net Bakiye</p>
        <p className="mt-1 text-2xl font-extrabold text-slate-800">{formatTL(net)}</p>
        <p className={`mt-1 text-xs ${net >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {net >= 0 ? 'Bütçe artıda (Pozitif)' : 'Bütçe ekside (Negatif)'}
        </p>
      </div>

      <div className={kart}>
        <p className={baslik}>Tasarruf Oranı</p>
        <p className="mt-1 text-2xl font-extrabold text-amber-600">%{oran}</p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-700"
            style={{ width: `${oran}%` }}
          />
        </div>
      </div>
    </div>
  )
}
