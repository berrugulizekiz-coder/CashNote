import { useEffect, useState } from 'react'
import type { FilterType, Transaction } from '../interfaces/Transaction'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ORNEK_VERILER, STORAGE_KEY } from '../utils/constants'
import { filtrele } from '../utils/filter'
import Header from '../components/Header'
import FilterTabs from '../components/FilterTabs'
import SummaryCards from '../components/SummaryCards'
import DonutChart from '../components/DonutChart'
import BarChart from '../components/BarChart'
import TransactionList from '../components/TransactionList'
import TransactionModal from '../components/TransactionModal'
import type { IslemVerisi } from '../components/TransactionModal'
import Toast from '../components/Toast'

export default function Dashboard() {
  const [islemler, setIslemler] = useLocalStorage<Transaction[]>(STORAGE_KEY, ORNEK_VERILER)
  const [filtre, setFiltre] = useState<FilterType>('tum')
  const [modalAcik, setModalAcik] = useState(false)
  const [duzenlenen, setDuzenlenen] = useState<Transaction | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const gorunen = filtrele(islemler, filtre)

  const yeniAc = () => {
    setDuzenlenen(null)
    setModalAcik(true)
  }

  const duzenleAc = (t: Transaction) => {
    setDuzenlenen(t)
    setModalAcik(true)
  }

  const kaydet = (veri: IslemVerisi, id?: string) => {
    if (id) {
      setIslemler((onceki) => onceki.map((t) => (t.id === id ? { ...veri, id } : t)))
      setToast('İşlem başarıyla güncellendi!')
    } else {
      setIslemler((onceki) => [{ ...veri, id: crypto.randomUUID() }, ...onceki])
      setToast('Yeni işlem başarıyla kaydedildi!')
    }
    setModalAcik(false)
  }

  const sil = (t: Transaction) => {
    if (!window.confirm(`"${t.title}" silinsin mi?`)) return
    setIslemler((onceki) => onceki.filter((x) => x.id !== t.id))
    setToast('İşlem silindi.')
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Header onYeniIslem={yeniAc} />
        <FilterTabs aktif={filtre} onDegis={setFiltre} />
        <SummaryCards liste={gorunen} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DonutChart liste={gorunen} />
          <BarChart liste={gorunen} />
        </div>
        <TransactionList liste={gorunen} onDuzenle={duzenleAc} onSil={sil} />
      </div>

      {modalAcik && (
        <TransactionModal
          key={duzenlenen?.id ?? 'yeni'}
          duzenlenen={duzenlenen}
          onKapat={() => setModalAcik(false)}
          onKaydet={kaydet}
        />
      )}
      <Toast mesaj={toast} />
    </div>
  )
}
