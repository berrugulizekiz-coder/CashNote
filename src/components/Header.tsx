interface Props {
  onYeniIslem: () => void
}

export default function Header({ onYeniIslem }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white shadow">
          TL
        </div>
        <div>
          <h1 className="text-2xl font-extrabold leading-tight text-slate-800">CashNote</h1>
          <p className="text-xs text-slate-500">Akıllı Gelir ve Gider Takipçisi</p>
        </div>
      </div>
      <button
        onClick={onYeniIslem}
        className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 active:scale-95"
      >
        + Yeni İşlem Ekle
      </button>
    </header>
  )
}
