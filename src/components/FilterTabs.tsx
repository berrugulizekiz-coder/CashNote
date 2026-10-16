import type { FilterType } from '../interfaces/Transaction'

interface Props {
  aktif: FilterType
  onDegis: (f: FilterType) => void
}

const SEKMELER: { id: FilterType; etiket: string }[] = [
  { id: 'tum', etiket: 'Tümü' },
  { id: 'bugun', etiket: 'Bugün (Günlük)' },
  { id: 'hafta', etiket: 'Bu Hafta' },
  { id: 'ay', etiket: 'Bu Ay' },
]

export default function FilterTabs({ aktif, onDegis }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <span className="px-2 text-sm font-semibold text-slate-600">Görünüm Aralığı:</span>
      {SEKMELER.map((s) => (
        <button
          key={s.id}
          onClick={() => onDegis(s.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            aktif === s.id
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          {s.etiket}
        </button>
      ))}
    </div>
  )
}
