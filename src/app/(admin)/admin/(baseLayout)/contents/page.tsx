'use client'

import {
  Column,
  ConfirmDialog,
  DataTable,
  SearchInput,
  StatusBadge,
} from '@/app/(admin)/admin/_components'
import { useAdminTheme, useDebounce } from '@/app/(admin)/admin/_hooks'
import {
  deleteContentService,
  getContentsListService,
} from '@/app/(admin)/admin/_services/contents.services'
import { dynamicSchemas, type ContentType } from '@/schemas/dynamic'
import { ContentItem } from '@/types/content'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ContentsListPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isDarkMode } = useAdminTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<ContentItem | null>(null)
  const [selectedContentType, setSelectedContentType] = useState<
    ContentType | 'all'
  >('all')

  // Fetch all contents
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['contents'],
    queryFn: () => getContentsListService(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteContentService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] })
      setDeleteTarget(null)
    },
    onError: error => {
      console.error('Delete error:', error)
    },
  })

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Filter contents
  const filteredContents =
    data?.data
      ?.filter(content => {
        const searchLower = debouncedSearch.toLowerCase()
        const matchesSearch =
          content.title.toLowerCase().includes(searchLower) ||
          content.sectionKey.toLowerCase().includes(searchLower) ||
          (content.description?.toLowerCase().includes(searchLower) ?? false)
        const matchesType =
          selectedContentType === 'all' ||
          content.contentType === selectedContentType
        return matchesSearch && matchesType
      })
      .sort((a, b) => a.sortOrder - b.sortOrder) || []

  // Get content type label
  const getContentTypeLabel = (contentType: string): string => {
    const schema = dynamicSchemas[contentType as ContentType]
    return schema?.label || contentType
  }

  const columns: Column<ContentItem>[] = [
    {
      key: 'title',
      header: 'Başlık',
      render: content => (
        <div className="max-w-xs">
          <p
            className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {content.title}
          </p>
          {content.description && (
            <p
              className={`truncate text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}
              title={content.description}
            >
              {content.description}
            </p>
          )}
          <p
            className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}
          >
            {content.sectionKey}
          </p>
        </div>
      ),
    },
    {
      key: 'contentType',
      header: 'İçerik Tipi',
      render: content => (
        <span
          className={`rounded-md px-2 py-1 text-xs font-medium ${
            isDarkMode
              ? 'bg-violet-500/20 text-violet-300'
              : 'bg-violet-100 text-violet-700'
          }`}
        >
          {getContentTypeLabel(content.contentType)}
        </span>
      ),
    },
    {
      key: 'sortOrder',
      header: 'Sıra',
      render: content => (
        <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
          {content.sortOrder}
        </span>
      ),
    },
    {
      key: 'isActive',
      header: 'Durum',
      render: content => <StatusBadge status={content.isActive} />,
    },
    {
      key: 'updatedAt',
      header: 'Güncelleme',
      render: content => (
        <span
          className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}
        >
          {new Date(content.updatedAt).toLocaleDateString('tr-TR')}
        </span>
      ),
    },
  ]

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteMutation.mutate(deleteTarget.id)
  }

  // Content type filter options
  const contentTypeOptions = Object.entries(dynamicSchemas).map(
    ([key, value]) => ({
      value: key as ContentType,
      label: value.label,
    }),
  )

  return (
    <>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              İçerikler
            </h1>
            <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
              Dinamik CMS içeriklerini yönetin
            </p>
          </div>

          <Link
            href="/admin/contents/new"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40"
          >
            <span className="text-lg">+</span>
            <span>Yeni İçerik</span>
          </Link>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="İçerik ara..."
          />
        </div>

        {/* Content Type Filter */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedContentType('all')}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              selectedContentType === 'all'
                ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25 ring-2 ring-violet-500/20'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            Tümü
          </button>

          {contentTypeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedContentType(option.value)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                selectedContentType === option.value
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25 ring-2 ring-violet-500/20'
                  : isDarkMode
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Data Table */}
        {isError ? (
          <div
            className={`rounded-xl p-4 ${
              isDarkMode
                ? 'bg-rose-500/20 text-rose-300'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            Hata: {error?.message || 'İçerikler yüklenirken bir hata oluştu'}
          </div>
        ) : (
          <DataTable
            data={filteredContents}
            columns={columns}
            isLoading={isLoading}
            keyExtractor={content => content.id}
            emptyMessage={
              selectedContentType !== 'all'
                ? `"${getContentTypeLabel(selectedContentType)}" tipinde içerik bulunamadı`
                : 'Henüz hiç içerik eklenmemiş'
            }
            actions={{
              onEdit: content =>
                router.push(`/admin/contents/${content.id}/edit`),
              onDelete: content => setDeleteTarget(content),
            }}
          />
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="İçeriği Sil"
        message={`"${deleteTarget?.title}" içeriğini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Sil"
        cancelText="İptal"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}
