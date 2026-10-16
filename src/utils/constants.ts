import type { Transaction } from '../interfaces/Transaction'

export const GIDER_KATEGORILERI = [
  'Kira & Konut',
  'Gıda & Market',
  'Faturalar',
  'Ulaşım & Diğer',
]

export const GELIR_KATEGORILERI = ['Maaş', 'Serbest Çalışma', 'Diğer Gelir']

export const KATEGORI_RENKLERI: Record<string, string> = {
  'Kira & Konut': '#6366f1',
  'Gıda & Market': '#f97316',
  'Faturalar': '#eab308',
  'Ulaşım & Diğer': '#3b82f6',
}

export const STORAGE_KEY = 'finansakis-islemler'

export const ORNEK_VERILER: Transaction[] = [
  { id: '1', title: 'Aylık Şirket Maaşı', amount: 48500, category: 'Maaş', date: '2026-10-01', type: 'gelir' },
  { id: '2', title: 'Ev Kirası ve Aidat', amount: 16500, category: 'Kira & Konut', date: '2026-10-02', type: 'gider' },
  { id: '3', title: 'Freelance Proje Ödemesi', amount: 12000, category: 'Serbest Çalışma', date: '2026-10-12', type: 'gelir' },
  { id: '4', title: 'Haftalık Süpermarket', amount: 2450, category: 'Gıda & Market', date: '2026-10-14', type: 'gider' },
  { id: '5', title: 'Elektrik ve Doğalgaz', amount: 1850, category: 'Faturalar', date: '2026-10-15', type: 'gider' },
  { id: '6', title: 'Benzin ve Otoyol', amount: 1350, category: 'Ulaşım & Diğer', date: '2026-10-16', type: 'gider' },
  { id: '7', title: 'Manav ve Kasap', amount: 620, category: 'Gıda & Market', date: '2026-10-13', type: 'gider' },
  { id: '8', title: 'Toplu Taşıma Kartı', amount: 900, category: 'Ulaşım & Diğer', date: '2026-10-10', type: 'gider' },
]