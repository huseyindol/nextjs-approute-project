'use client'

import { Icons } from '@/app/(admin)/admin/_components'
import { useAdminTheme } from '@/app/(admin)/admin/_hooks'
import {
  getBannerByIdService,
  updateBannerService,
} from '@/app/(admin)/admin/_services/banners.services'
import { getImageUrl } from '@/app/(admin)/admin/_utils/urlUtils'
import { UpdateBannerInput, UpdateBannerSchema } from '@/schemas/banner.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function EditBannerPage() {
  const params = useParams()
  const bannerId = params.id as string
  const queryClient = useQueryClient()
  const { isDarkMode } = useAdminTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)

  // Fetch banner data
  const {
    data: bannerData,
    isLoading: isBannerLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['banner', bannerId],
    queryFn: () => getBannerByIdService(bannerId),
    enabled: !!bannerId,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateBannerInput>({
    resolver: zodResolver(UpdateBannerSchema),
    defaultValues: {
      title: '',
      altText: '',
      link: '',
      target: '_blank',
      type: '',
      orderIndex: 0,
      status: true,
    },
  })

  // Populate form when data is loaded
  useEffect(() => {
    if (bannerData?.data) {
      const banner = bannerData.data
      reset({
        title: banner.title,
        altText: banner.altText || '',
        link: banner.link || '',
        target: (banner.target as '_blank' | '_self') || '_blank',
        type: banner.type || '',
        orderIndex: banner.orderIndex,
        status: banner.status,
      })
      // Set existing image as preview
      if (banner.images?.desktop) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setImagePreview(getImageUrl(banner.images.desktop))
      }
    }
  }, [bannerData, reset])

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setImageError('Lütfen geçerli bir görsel dosyası seçin')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Dosya boyutu 5MB'dan küçük olmalıdır")
        return
      }
      setSelectedImage(file)
      setImageError(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateBannerInput) =>
      updateBannerService(bannerId, data, selectedImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] })
      queryClient.invalidateQueries({ queryKey: ['banner', bannerId] })
      toast.success('Banner başarıyla güncellendi')
    },
    onError: error => {
      console.error('Update error:', error)
      toast.error('Güncelleme sırasında bir hata oluştu')
    },
  })

  const onSubmit = (data: UpdateBannerInput) => {
    // Check if form is dirty or if a new image is selected
    if (!isDirty && !selectedImage) {
      toast.info('Herhangi bir değişiklik yapılmadı')
      return
    }
    updateMutation.mutate(data)
  }

  const inputClass = `w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
    isDarkMode
      ? 'border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-violet-500'
      : 'border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-violet-500'
  }`

  const labelClass = `block text-sm font-medium mb-2 ${
    isDarkMode ? 'text-slate-300' : 'text-gray-700'
  }`

  const errorClass = 'mt-1 text-xs text-rose-400'

  // Loading state
  if (isBannerLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
            Banner yükleniyor...
          </span>
        </div>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 p-6">
        <div
          className={`rounded-xl p-4 ${
            isDarkMode
              ? 'bg-rose-500/20 text-rose-300'
              : 'bg-rose-100 text-rose-700'
          }`}
        >
          Hata: {error?.message || 'Banner yüklenirken bir hata oluştu'}
        </div>
        <Link
          href="/admin/banners"
          className={`inline-flex items-center gap-2 text-sm ${
            isDarkMode ? 'text-violet-400' : 'text-violet-600'
          }`}
        >
          ← Bannerlara Dön
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/admin/banners"
          className={`transition-colors hover:text-violet-400 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}
        >
          Bannerlar
        </Link>
        <span className={isDarkMode ? 'text-slate-600' : 'text-gray-400'}>
          /
        </span>
        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
          Düzenle: {bannerData?.data?.title}
        </span>
      </div>

      {/* Page Header */}
      <div>
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Banner Düzenle
        </h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
          Banner bilgilerini güncelleyin
        </p>
      </div>

      {/* Error Message */}
      {updateMutation.isError && (
        <div
          className={`rounded-xl p-4 ${
            isDarkMode
              ? 'bg-rose-500/20 text-rose-300'
              : 'bg-rose-100 text-rose-700'
          }`}
        >
          Hata:{' '}
          {updateMutation.error?.message ||
            'Banner güncellenirken bir hata oluştu'}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload */}
        <div
          className={`rounded-2xl p-6 ${
            isDarkMode
              ? 'border border-slate-800/50 bg-slate-900/60'
              : 'border border-gray-200 bg-white'
          } backdrop-blur-sm`}
        >
          <h2
            className={`mb-4 text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Banner Görseli
          </h2>

          <div className="space-y-4">
            {imagePreview ? (
              <div className="relative">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null)
                    setImagePreview(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="absolute right-2 top-2 rounded-full bg-rose-500 p-1.5 text-white hover:bg-rose-600"
                >
                  <Icons.X />
                </button>
                <p
                  className={`mt-2 text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}
                >
                  {selectedImage ? 'Yeni görsel seçildi' : 'Mevcut görsel'}
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Görsel yüklemek için tıklayın"
                className={`flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
                  isDarkMode
                    ? 'border-slate-700 hover:border-violet-500'
                    : 'border-gray-300 hover:border-violet-500'
                }`}
              >
                <span className="text-4xl">📸</span>
                <p
                  className={`mt-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}
                >
                  Görsel yüklemek için tıklayın
                </p>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {imageError && <p className={errorClass}>{imageError}</p>}

            {imagePreview && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`text-sm ${
                  isDarkMode ? 'text-violet-400' : 'text-violet-600'
                }`}
              >
                Görseli Değiştir
              </button>
            )}
          </div>
        </div>

        {/* Banner Info */}
        <div
          className={`rounded-2xl p-6 ${
            isDarkMode
              ? 'border border-slate-800/50 bg-slate-900/60'
              : 'border border-gray-200 bg-white'
          } backdrop-blur-sm`}
        >
          <h2
            className={`mb-4 text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Banner Bilgileri
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className={labelClass}>
                Başlık *
              </label>
              <input
                id="title"
                type="text"
                {...register('title')}
                className={inputClass}
                placeholder="Banner başlığı"
              />
              {errors.title && (
                <p className={errorClass}>{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="altText" className={labelClass}>
                Alt Metin
              </label>
              <input
                id="altText"
                type="text"
                {...register('altText')}
                className={inputClass}
                placeholder="Görsel alt metni"
              />
            </div>

            <div>
              <label htmlFor="link" className={labelClass}>
                Link
              </label>
              <input
                id="link"
                type="text"
                {...register('link')}
                className={inputClass}
                placeholder="https://example.com"
              />
              {errors.link && (
                <p className={errorClass}>{errors.link.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="target" className={labelClass}>
                Link Hedefi
              </label>
              <select
                id="target"
                {...register('target')}
                className={inputClass}
              >
                <option value="_blank">Yeni Sekmede Aç</option>
                <option value="_self">Aynı Sekmede Aç</option>
              </select>
            </div>

            <div>
              <label htmlFor="type" className={labelClass}>
                Tip
              </label>
              <input
                id="type"
                type="text"
                {...register('type')}
                className={inputClass}
                placeholder="örn: hero, sidebar, popup"
              />
            </div>

            <div>
              <label htmlFor="orderIndex" className={labelClass}>
                Sıra
              </label>
              <input
                id="orderIndex"
                type="number"
                {...register('orderIndex', { valueAsNumber: true })}
                className={inputClass}
                placeholder="0"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="status"
                type="checkbox"
                {...register('status')}
                className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-violet-500 focus:ring-violet-500"
              />
              <label
                htmlFor="status"
                className={`text-sm ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}
              >
                Aktif
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href="/admin/banners"
            className={`flex-1 rounded-xl px-4 py-3 text-center text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Kaydediliyor...</span>
              </span>
            ) : (
              'Değişiklikleri Kaydet'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
