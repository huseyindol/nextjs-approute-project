import { ComponentSummary } from '@/types/BaseResponse'
import { useMemo, useState } from 'react'
import { Icons } from './Icons'

interface DualListboxProps {
  available: ComponentSummary[]
  selected: ComponentSummary[]
  onChange: (selected: ComponentSummary[]) => void
  label?: string
}

export function DualListbox({
  available,
  selected,
  onChange,
  label,
}: DualListboxProps) {
  const [leftSearch, setLeftSearch] = useState('')
  const [rightSearch, setRightSearch] = useState('')

  const leftList = useMemo(() => {
    const selectedIds = new Set(selected.map(item => item.id))
    return available.filter(item => !selectedIds.has(item.id))
  }, [available, selected])

  const filteredLeft = leftList.filter(item =>
    item.name.toLowerCase().includes(leftSearch.toLowerCase()),
  )

  const filteredRight = selected.filter(item =>
    item.name.toLowerCase().includes(rightSearch.toLowerCase()),
  )

  const moveRight = (item: ComponentSummary) => {
    const newSelected = [...selected, item]
    onChange(newSelected)
  }

  const moveLeft = (item: ComponentSummary) => {
    const newSelected = selected.filter(i => i.id !== item.id)
    onChange(newSelected)
  }

  const moveAllRight = () => {
    const newSelected = [...selected, ...filteredLeft]
    onChange(newSelected)
  }

  const moveAllLeft = () => {
    const selectedIdsToRemove = new Set(filteredRight.map(i => i.id))
    const newSelected = selected.filter(i => !selectedIdsToRemove.has(i.id))
    onChange(newSelected)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="grid grid-cols-[1fr,auto,1fr] gap-4">
        {/* Left List (Available) */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium text-gray-500 dark:text-slate-400">
            Mevcut ({filteredLeft.length})
          </div>
          <input
            type="text"
            value={leftSearch}
            onChange={e => setLeftSearch(e.target.value)}
            placeholder="Ara..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <div className="flex h-64 flex-col gap-1 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800">
            {filteredLeft.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => moveRight(item)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <span>{item.name}</span>
                <span className="text-xs text-gray-400">{item.type}</span>
              </button>
            ))}
            {filteredLeft.length === 0 && (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                Veri bulunamadı
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-2">
          <button
            type="button"
            onClick={moveAllRight}
            disabled={filteredLeft.length === 0}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-700"
            title="Hepsini ekle"
          >
            <Icons.ChevronsRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={moveAllLeft}
            disabled={filteredRight.length === 0}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-700"
            title="Hepsini çıkar"
          >
            <Icons.ChevronsLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Right List (Selected) */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium text-gray-500 dark:text-slate-400">
            Seçili ({filteredRight.length})
          </div>
          <input
            type="text"
            value={rightSearch}
            onChange={e => setRightSearch(e.target.value)}
            placeholder="Ara..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <div className="flex h-64 flex-col gap-1 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800">
            {filteredRight.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => moveLeft(item)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-gray-900 hover:bg-rose-50 dark:text-slate-300 dark:hover:bg-rose-900/20 dark:hover:text-rose-300"
              >
                <span>{item.name}</span>
                <span className="text-xs text-gray-400">{item.type}</span>
              </button>
            ))}
            {filteredRight.length === 0 && (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                Seçim yapılmadı
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
