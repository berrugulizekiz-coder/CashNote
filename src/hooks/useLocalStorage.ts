import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, baslangic: T) {
  const [deger, setDeger] = useState<T>(() => {
    try {
      const kayitli = localStorage.getItem(key)
      return kayitli ? (JSON.parse(kayitli) as T) : baslangic
    } catch {
      return baslangic
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(deger))
  }, [key, deger])

  return [deger, setDeger] as const
}
