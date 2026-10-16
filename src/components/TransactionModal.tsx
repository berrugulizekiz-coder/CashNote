import { useState } from 'react'
import type { Transaction, TransactionType } from '../interfaces/Transaction'
import { GELIR_KATEGORILERI, GIDER_KATEGORILERI } from '../utils/constants'
import { bugunStr } from '../utils/format'

export type IslemVerisi = Omit<Transaction, 'id'>

interface Props {
  duzenlenen: Transaction | null
  onKapat: () => void
  onKaydet: (veri: IslemVerisi, id?: string) => void
}

export default function TransactionModal({ duzenlenen, onKapat, onKaydet }: Props) {
  const [tur, setTur] = useState<TransactionType>(duzenlenen?.type ?? 'gider')
  const [baslik, setBaslik] = useState(duzenlenen?.title ?? '')
  const [tutar, setTutar] = useState(duzenlenen ? String(duzenlenen.amount) : '')
  const [kategori, setKategori] = useState(duzenlenen?.category ?? GIDER_KATEGORILERI[0])
  const [tarih, setTarih] = useState(duzenlenen?.date ?? bugunStr())
  const [hata, setHata] = useState('')

  const kategoriler = tur === 'gider' ? GIDER_KATEGORILERI : GELIR_KATEGORILERI

  const turDegistir = (t: TransactionType) => {
    setTur(t)
    setKategori((t === 'gider' ? GIDER_KATEGORILERI : GELIR_KATEGORILERI)[0])
  }

  const kaydet = () => {
    const sayi = parseFloat(tutar.replace(',', '.'))
    if (!baslik.trim() || !sayi || sayi <= 0 || !tarih) {
      setHata('Lütfen başlık, geçerli bir tutar ve tarih gir.')
      return
    }
    onKaydet({ title: baslik.trim(), amount: sayi, category: kategori, date: tarih, type: tur }, duzenlenen?.id)
  }

  const alan = 'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500'
  const etiket = 'mb-1 block text-xs font-medium text-slate-500'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onKapat}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-extrabold text-slate-800">
          {duzenlenen ? 'İşlemi Güncelle' : 'Yeni İşlem Ekle'}
        </h2>
        <p className="mb-4 text-xs text-slate-400">Tür, Tutar, Kategori ve Tarih Seçimi</p>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => turDegistir('gider')}
            className={`rounded-lg border py-2 text-sm font-semibold ${
              tur === 'gider' ? 'border-red-400 bg-red-50 text-red-600' : 'border-slate-200 text-slate-400'
            }`}
          >
            Gider (-)
          </button>
          <button
            onClick={() => turDegistir('gelir')}
            className={`rounded-lg border py-2 text-sm font-semibold ${
              tur === 'gelir' ? 'border-emerald-400 bg-emerald-50 text-emerald-600' : 'border-slate-200 text-slate-400'
            }`}
          >
            Gelir (+)
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className={etiket}>İşlem Başlığı</label>
            <input className={alan} value={baslik} onChange={(e) => setBaslik(e.target.value)} placeholder="Market Alışverişi" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={etiket}>Tutar (TL)</label>
              <input className={alan} value={tutar} onChange={(e) => setTutar(e.target.value)} inputMode="decimal" placeholder="850.50" />
            </div>
            <div>
              <label className={etiket}>Kategori</label>
              <select className={alan} value={kategori} onChange={(e) => setKategori(e.target.value)}>
                {kategoriler.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={etiket}>Tarih</label>
            <input type="date" className={alan} value={tarih} onChange={(e) => setTarih(e.target.value)} />
          </div>
        </div>

        {hata && <p className="mt-3 text-sm text-red-600">{hata}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onKapat} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">
            Vazgeç
          </button>
          <button onClick={kaydet} className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            {duzenlenen ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  )
}
