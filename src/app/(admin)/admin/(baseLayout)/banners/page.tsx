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
  deleteBannerService,
  getBannerService,
} from '@/app/(admin)/admin/_services/banners.services'
import { Banner } from '@/types/BaseResponse'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function BannersListPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isDarkMode } = useAdminTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null)

  // Fetch banners - 5 dakika cache
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: () => getBannerService(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBannerService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] })
      setDeleteTarget(null)
    },
    onError: error => {
      console.error('Delete error:', error)
    },
  })

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Filter banners based on search
  const filteredBanners =
    data?.data?.filter(
      banner =>
        banner.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        banner.altText?.toLowerCase().includes(debouncedSearch.toLowerCase()),
    ) || []

  const columns: Column<Banner>[] = [
    {
      key: 'image',
      header: 'Görsel',
      render: banner => (
        <div className="relative h-12 w-20 overflow-hidden rounded-lg">
          {banner.image ? (
            <Image
              src={banner.image}
              alt={banner.altText || banner.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
              }`}
            >
              <span className="text-xs text-slate-400">Yok</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Başlık',
      render: banner => (
        <div>
          <p
            className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {banner.title}
          </p>
          <p
            className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}
          >
            {banner.altText || '-'}
          </p>
        </div>
      ),
    },
    {
      key: 'link',
      header: 'Link',
      render: banner => (
        <div className="max-w-[200px] truncate">
          <span
            className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}
          >
            {banner.link || '-'}
          </span>
          {banner.target && (
            <span
              className={`ml-2 rounded px-1.5 py-0.5 text-xs ${
                isDarkMode
                  ? 'bg-slate-700 text-slate-400'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {banner.target}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'orderIndex',
      header: 'Sıra',
      render: banner => (
        <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
          {banner.orderIndex}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Durum',
      render: banner => <StatusBadge status={banner.status} />,
    },
  ]

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteMutation.mutate(deleteTarget.id)
  }

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
              Bannerlar
            </h1>
            <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
              Tüm bannerları yönetin
            </p>
          </div>

          <Link
            href="/admin/banners/new"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40"
          >
            <span className="text-lg">+</span>
            Yeni Banner
          </Link>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Banner ara..."
          />
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
            Hata: {error?.message || 'Bannerlar yüklenirken bir hata oluştu'}
          </div>
        ) : (
          <DataTable
            data={filteredBanners as Banner[]}
            columns={columns}
            isLoading={isLoading}
            keyExtractor={banner => banner.id}
            emptyMessage="Banner bulunamadı"
            actions={{
              onEdit: banner => router.push(`/admin/banners/${banner.id}/edit`),
              onDelete: banner => setDeleteTarget(banner),
            }}
          />
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Banner'ı Sil"
        message={`"${deleteTarget?.title}" banner'ını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Sil"
        cancelText="İptal"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}
