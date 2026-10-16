import { useState } from 'react'
import type { Transaction } from '../interfaces/Transaction'
import { formatTL } from '../utils/format'

interface Props {
  liste: Transaction[]
  onDuzenle: (t: Transaction) => void
  onSil: (t: Transaction) => void
}

export default function TransactionList({ liste, onDuzenle, onSil }: Props) {
  const [arama, setArama] = useState('')

  const sonuc = liste
    .filter((t) => (t.title + ' ' + t.category).toLowerCase().includes(arama.toLowerCase()))
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-800">İşlem Geçmişi (CRUD Listesi)</h2>
        <input
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          placeholder="Ara..."
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-emerald-500"
        />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-slate-400">
              <th className="py-2">İşlem Başlığı</th>
              <th>Kategori</th>
              <th>Tarih</th>
              <th>Tutar</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {sonuc.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  Kayıt bulunamadı.
                </td>
              </tr>
            )}
            {sonuc.map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="py-3 font-semibold text-slate-800">{t.title}</td>
                <td>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{t.category}</span>
                </td>
                <td className="text-slate-500">{t.date}</td>
                <td className={`font-bold ${t.type === 'gelir' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {t.type === 'gelir' ? '+' : '-'} {formatTL(t.amount)}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => onDuzenle(t)}
                    className="mr-2 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => onSil(t)}
                    className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
