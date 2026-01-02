'use client'

import { useAdminTheme } from '@/app/(admin)/admin/_hooks'
import {
  getWidgetByIdService,
  updateWidgetService,
} from '@/app/(admin)/admin/_services/widgets.services'
import { UpdateWidgetInput, UpdateWidgetSchema } from '@/schemas/widget.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function EditWidgetPage() {
  const router = useRouter()
  const params = useParams()
  const widgetId = params.id as string
  const queryClient = useQueryClient()
  const { isDarkMode } = useAdminTheme()

  // Fetch widget data
  const {
    data: widgetData,
    isLoading: isWidgetLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['widget', widgetId],
    queryFn: () => getWidgetByIdService(widgetId),
    enabled: !!widgetId,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateWidgetInput>({
    resolver: zodResolver(UpdateWidgetSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'BANNER',
      content: '',
      orderIndex: 0,
      status: true,
      bannerIds: [],
      postIds: [],
    },
  })

  // Populate form when data is loaded
  useEffect(() => {
    if (widgetData?.data) {
      const widget = widgetData.data
      reset({
        name: widget.name,
        description: widget.description || '',
        type: (widget.type as string).toUpperCase() as 'BANNER' | 'POST',
        content: widget.content || '',
        orderIndex: widget.orderIndex,
        status: widget.status,
        bannerIds: [],
        postIds: [],
      })
    }
  }, [widgetData, reset])

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateWidgetInput) =>
      updateWidgetService(widgetId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets'] })
      queryClient.invalidateQueries({ queryKey: ['widget', widgetId] })
      router.push('/admin/widgets')
    },
    onError: error => {
      console.error('Update error:', error)
    },
  })

  const onSubmit = (data: UpdateWidgetInput) => {
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
  if (isWidgetLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
            Widget yükleniyor...
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
          Hata: {error?.message || 'Widget yüklenirken bir hata oluştu'}
        </div>
        <Link
          href="/admin/widgets"
          className={`inline-flex items-center gap-2 text-sm ${
            isDarkMode ? 'text-violet-400' : 'text-violet-600'
          }`}
        >
          ← Widgetlara Dön
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/admin/widgets"
          className={`transition-colors hover:text-violet-400 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}
        >
          Widgetlar
        </Link>
        <span className={isDarkMode ? 'text-slate-600' : 'text-gray-400'}>
          /
        </span>
        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
          Düzenle: {widgetData?.data?.name}
        </span>
      </div>

      {/* Page Header */}
      <div>
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Widget Düzenle
        </h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
          Widget bilgilerini güncelleyin
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
            'Widget güncellenirken bir hata oluştu'}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            Widget Bilgileri
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                İsim *
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={inputClass}
                placeholder="Widget ismi"
              />
              {errors.name && (
                <p className={errorClass}>{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>
                Açıklama
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={3}
                className={inputClass}
                placeholder="Widget açıklaması"
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className={labelClass}>
                Tip *
              </label>
              <select id="type" {...register('type')} className={inputClass}>
                <option value="BANNER">Banner</option>
                <option value="POST">Post</option>
              </select>
              {errors.type && (
                <p className={errorClass}>{errors.type.message}</p>
              )}
            </div>

            {/* Order Index */}
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

            {/* Content */}
            <div>
              <label htmlFor="content" className={labelClass}>
                İçerik
              </label>
              <textarea
                id="content"
                {...register('content')}
                rows={4}
                className={inputClass}
                placeholder="HTML veya JSON içerik"
              />
            </div>

            {/* Status */}
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
            href="/admin/widgets"
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
                Kaydediliyor...
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
