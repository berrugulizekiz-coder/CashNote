export default function Toast({ mesaj }: { mesaj: string | null }) {
  if (!mesaj) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
      ✓ {mesaj}
    </div>
  )
}
