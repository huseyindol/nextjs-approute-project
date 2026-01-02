'use client'

import { ReactNode, useMemo } from 'react'
import { useAdminTheme } from '../_hooks'
import { Icons } from './Icons'
import { StatusBadge } from './StatusBadge'

export interface Column<T> {
  key: string
  header: string
  render?: (item: T, index: number) => ReactNode
  sortable?: boolean
  width?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  isLoading?: boolean
  emptyMessage?: string
  onRowClick?: (item: T) => void
  keyExtractor: (item: T) => string
  // Actions
  actions?: {
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    onView?: (item: T) => void
  }
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'Kayıt bulunamadı',
  onRowClick,
  keyExtractor,
  actions,
}: DataTableProps<T>) {
  const { isDarkMode } = useAdminTheme()

  // Memoize rendering for performance
  const tableRows = useMemo(() => {
    return data.map((item, rowIndex) => (
      <tr
        key={keyExtractor(item)}
        onClick={() => onRowClick?.(item)}
        className={`transition-colors ${
          onRowClick ? 'cursor-pointer' : ''
        } ${isDarkMode ? 'hover:bg-slate-800/30' : 'hover:bg-gray-50'}`}
      >
        {columns.map(column => (
          <td
            key={column.key}
            className={`px-6 py-4 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}
            style={{ width: column.width }}
          >
            {column.render
              ? column.render(item, rowIndex)
              : ((item as Record<string, unknown>)[column.key]?.toString() ??
                '-')}
          </td>
        ))}
        {actions && (
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              {actions.onView && (
                <button
                  onClick={e => {
                    e.stopPropagation()
                    actions.onView?.(item)
                  }}
                  className={`rounded-lg p-2 transition-colors ${
                    isDarkMode
                      ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title="Görüntüle"
                >
                  <Icons.Eye />
                </button>
              )}
              {actions.onEdit && (
                <button
                  onClick={e => {
                    e.stopPropagation()
                    actions.onEdit?.(item)
                  }}
                  className={`rounded-lg p-2 transition-colors ${
                    isDarkMode
                      ? 'text-slate-400 hover:bg-slate-700 hover:text-violet-400'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-violet-600'
                  }`}
                  title="Düzenle"
                >
                  <Icons.Settings />
                </button>
              )}
              {actions.onDelete && (
                <button
                  onClick={e => {
                    e.stopPropagation()
                    actions.onDelete?.(item)
                  }}
                  className={`rounded-lg p-2 transition-colors ${
                    isDarkMode
                      ? 'text-slate-400 hover:bg-rose-500/20 hover:text-rose-400'
                      : 'text-gray-500 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                  title="Sil"
                >
                  <Icons.X />
                </button>
              )}
            </div>
          </td>
        )}
      </tr>
    ))
  }, [data, columns, isDarkMode, onRowClick, keyExtractor, actions])

  if (isLoading) {
    return (
      <div
        className={`flex h-64 items-center justify-center rounded-2xl ${
          isDarkMode
            ? 'border border-slate-800/50 bg-slate-900/60'
            : 'border border-gray-200 bg-white'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="border-3 h-8 w-8 animate-spin rounded-full border-violet-500 border-t-transparent" />
          <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
            Yükleniyor...
          </span>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div
        className={`flex h-64 items-center justify-center rounded-2xl ${
          isDarkMode
            ? 'border border-slate-800/50 bg-slate-900/60'
            : 'border border-gray-200 bg-white'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl">📭</span>
          <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
            {emptyMessage}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl ${
        isDarkMode
          ? 'border border-slate-800/50 bg-slate-900/60'
          : 'border border-gray-200 bg-white'
      } backdrop-blur-sm`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`text-left text-sm ${
                isDarkMode
                  ? 'border-b border-slate-800/50 text-slate-400'
                  : 'border-b border-gray-200 text-gray-500'
              }`}
            >
              {columns.map(column => (
                <th
                  key={column.key}
                  className="px-6 py-4 font-medium"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th
                  className="px-6 py-4 font-medium"
                  style={{ width: '120px' }}
                >
                  İşlemler
                </th>
              )}
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  )
}

// Re-export StatusBadge for convenience
export { StatusBadge }
