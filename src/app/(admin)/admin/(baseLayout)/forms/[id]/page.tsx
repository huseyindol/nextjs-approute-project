'use client'

import { Icons } from '@/app/(admin)/admin/_components'
import { useAdminTheme } from '@/app/(admin)/admin/_hooks'
import {
  getFormByIdService,
  updateFormService,
} from '@/app/(admin)/admin/_services/forms.services'
import { UpdateFormInput, UpdateFormSchema } from '@/schemas/form.schema'
import type { Field, FieldType } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Metin' },
  { value: 'email', label: 'E-posta' },
  { value: 'number', label: 'Sayı' },
  { value: 'textarea', label: 'Uzun Metin' },
  { value: 'select', label: 'Seçim Kutusu' },
  { value: 'radio', label: 'Radyo Buton' },
  { value: 'checkbox', label: 'Onay Kutusu' },
  { value: 'date', label: 'Tarih' },
  { value: 'phone', label: 'Telefon' },
  { value: 'url', label: 'URL' },
]

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditFormPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isDarkMode } = useAdminTheme()

  const [fields, setFields] = useState<Field[]>([])
  const [showFieldModal, setShowFieldModal] = useState(false)
  const [editingField, setEditingField] = useState<Field | null>(null)

  // Fetch form data
  const { data: formData, isLoading } = useQuery({
    queryKey: ['form', id],
    queryFn: () => getFormByIdService(id),
    enabled: !!id,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateFormInput>({
    resolver: zodResolver(UpdateFormSchema),
  })

  // Initialize form with fetched data
  useEffect(() => {
    if (formData?.data) {
      const form = formData.data
      reset({
        title: form.title,
        version: form.version,
        active: form.active,
        schema: {
          config: form.schema.config,
          fields: form.schema.fields,
        },
      })
      setFields(form.schema.fields || [])
    }
  }, [formData, reset])

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateFormInput) => updateFormService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] })
      queryClient.invalidateQueries({ queryKey: ['form', id] })
      toast.success('Form başarıyla güncellendi')
      router.push('/admin/forms')
    },
    onError: error => {
      console.error('Update error:', error)
      toast.error('Form güncellenirken bir hata oluştu')
    },
  })

  const addField = () => {
    const newField: Field = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: '',
      required: false,
    }
    setEditingField(newField)
    setShowFieldModal(true)
  }

  const saveField = (field: Field) => {
    const existingIndex = fields.findIndex(f => f.id === field.id)
    if (existingIndex >= 0) {
      const updated = [...fields]
      updated[existingIndex] = field
      setFields(updated)
    } else {
      setFields([...fields, field])
    }
    setShowFieldModal(false)
    setEditingField(null)
  }

  const removeField = (fieldId: string) => {
    setFields(fields.filter(f => f.id !== fieldId))
  }

  const onSubmit = (data: UpdateFormInput) => {
    if (fields.length === 0) {
      toast.error('En az bir alan eklemelisiniz')
      return
    }
    const formData: UpdateFormInput = {
      ...data,
      schema: {
        ...data.schema,
        fields,
      },
    }
    updateMutation.mutate(formData)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  const inputClass = `w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
    isDarkMode
      ? 'border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-violet-500'
      : 'border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-violet-500'
  }`

  const labelClass = `block text-sm font-medium mb-2 ${
    isDarkMode ? 'text-slate-300' : 'text-gray-700'
  }`

  const cardClass = `rounded-2xl p-6 ${
    isDarkMode
      ? 'border border-slate-800/50 bg-slate-900/60'
      : 'border border-gray-200 bg-white'
  } backdrop-blur-sm`

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/admin/forms"
          className={`transition-colors hover:text-violet-400 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}
        >
          Formlar
        </Link>
        <span className={isDarkMode ? 'text-slate-600' : 'text-gray-400'}>
          /
        </span>
        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
          Form Düzenle
        </span>
      </div>

      {/* Page Header */}
      <div>
        <h1
          className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Form Düzenle
        </h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
          Form ayarlarını ve alanlarını düzenleyin
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className={cardClass}>
          <h2
            className={`mb-4 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Temel Bilgiler
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className={labelClass}>
                Form Başlığı *
              </label>
              <input
                id="title"
                type="text"
                {...register('title')}
                className={inputClass}
                placeholder="Form başlığı"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="layout" className={labelClass}>
                  Düzen
                </label>
                <select
                  id="layout"
                  {...register('schema.config.layout')}
                  className={inputClass}
                >
                  <option value="vertical">Dikey (Tek Sayfa)</option>
                  <option value="single">Tek Sayfa</option>
                </select>
              </div>

              <div className="flex items-end">
                <label
                  className={`flex cursor-pointer items-center gap-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}
                >
                  <input
                    type="checkbox"
                    {...register('active')}
                    className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-violet-500"
                  />
                  <span className="text-sm">Aktif</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="submitLabel" className={labelClass}>
                Gönder Butonu Metni
              </label>
              <input
                id="submitLabel"
                type="text"
                {...register('schema.config.submitLabel')}
                className={inputClass}
                placeholder="Gönder"
              />
            </div>
          </div>
        </div>

        {/* Fields Section */}
        <div className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h2
              className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Form Alanları
            </h2>
            <button
              type="button"
              onClick={addField}
              className="text-sm text-violet-400 hover:text-violet-300"
            >
              + Alan Ekle
            </button>
          </div>

          {fields.length === 0 ? (
            <div
              className={`py-8 text-center ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}
            >
              <p className="text-sm">Henüz alan eklenmedi</p>
              <button
                type="button"
                onClick={addField}
                className="mt-2 text-sm text-violet-400 hover:text-violet-300"
              >
                İlk alanı ekle
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {fields.map(field => (
                <div
                  key={field.id}
                  className={`flex items-center justify-between rounded-lg p-3 ${
                    isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        isDarkMode
                          ? 'bg-violet-500/20 text-violet-400'
                          : 'bg-violet-100 text-violet-600'
                      }`}
                    >
                      {FIELD_TYPES.find(t => t.value === field.type)?.label ||
                        field.type}
                    </span>
                    <span
                      className={isDarkMode ? 'text-white' : 'text-gray-900'}
                    >
                      {field.label || 'Başlıksız Alan'}
                    </span>
                    {field.required && (
                      <span className="text-xs text-rose-400">*</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingField(field)
                        setShowFieldModal(true)
                      }}
                      className={`rounded p-1 transition-colors ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}
                    >
                      <Icons.Edit />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeField(field.id)}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href="/admin/forms"
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
            className="bg-linear-to-r flex-1 rounded-xl from-violet-500 to-purple-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Kaydediliyor...</span>
              </span>
            ) : (
              'Formu Güncelle'
            )}
          </button>
        </div>
      </form>

      {/* Field Edit Modal */}
      {showFieldModal && editingField && (
        <FieldEditModal
          field={editingField}
          otherFields={fields.filter(f => f.id !== editingField.id)}
          onSave={saveField}
          onClose={() => {
            setShowFieldModal(false)
            setEditingField(null)
          }}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  )
}

// Field Edit Modal Component
interface FieldEditModalProps {
  field: Field
  otherFields: Field[]
  onSave: (field: Field) => void
  onClose: () => void
  isDarkMode: boolean
}

function FieldEditModal({
  field,
  otherFields,
  onSave,
  onClose,
  isDarkMode,
}: FieldEditModalProps) {
  const [editedField, setEditedField] = useState<Field>(field)

  const handleSave = () => {
    onSave(editedField)
  }

  const inputClass = `w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
    isDarkMode
      ? 'border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-violet-500'
      : 'border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-violet-500'
  }`

  const labelClass = `block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`w-full max-w-lg rounded-2xl p-6 ${isDarkMode ? 'border border-slate-700 bg-slate-900' : 'border border-gray-200 bg-white'}`}
      >
        <h3
          className={`mb-4 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Alan Düzenle
        </h3>

        <div className="max-h-96 space-y-4 overflow-y-auto">
          <div>
            <label className={labelClass}>Alan Tipi *</label>
            <select
              value={editedField.type}
              onChange={e =>
                setEditedField({
                  ...editedField,
                  type: e.target.value as FieldType,
                })
              }
              className={inputClass}
            >
              {FIELD_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Etiket *</label>
            <input
              type="text"
              value={editedField.label}
              onChange={e =>
                setEditedField({ ...editedField, label: e.target.value })
              }
              className={inputClass}
              placeholder="Alan etiketi"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={editedField.required}
              onChange={e =>
                setEditedField({ ...editedField, required: e.target.checked })
              }
              className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-violet-500"
            />
            <label
              className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}
            >
              Zorunlu Alan
            </label>
          </div>

          {/* Validation */}
          <div>
            <label className={labelClass}>Validasyon</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}
                >
                  Min
                </label>
                <input
                  type="number"
                  value={editedField.validation?.min ?? ''}
                  onChange={e => {
                    const val = e.target.value ? Number(e.target.value) : null
                    setEditedField({
                      ...editedField,
                      validation: {
                        ...editedField.validation,
                        min: val,
                      },
                    })
                  }}
                  className={inputClass}
                  placeholder="Min"
                />
              </div>
              <div>
                <label
                  className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}
                >
                  Max
                </label>
                <input
                  type="number"
                  value={editedField.validation?.max ?? ''}
                  onChange={e => {
                    const val = e.target.value ? Number(e.target.value) : null
                    setEditedField({
                      ...editedField,
                      validation: {
                        ...editedField.validation,
                        max: val,
                      },
                    })
                  }}
                  className={inputClass}
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}
              >
                Pattern (RegEx)
              </label>
              <input
                type="text"
                value={editedField.validation?.pattern ?? ''}
                onChange={e => {
                  const val = e.target.value || null
                  setEditedField({
                    ...editedField,
                    validation: {
                      ...editedField.validation,
                      pattern: val,
                    },
                  })
                }}
                className={inputClass}
                placeholder="^[a-zA-Z]+$"
              />
            </div>
          </div>

          {/* Condition section */}
          <div>
            <label className={labelClass}>Koşullu Görünürlük</label>
            <div className="space-y-2">
              <select
                value={editedField.condition?.field || ''}
                onChange={e => {
                  const fieldId = e.target.value
                  if (!fieldId) {
                    setEditedField({ ...editedField, condition: undefined })
                  } else {
                    setEditedField({
                      ...editedField,
                      condition: {
                        field: fieldId,
                        operator: editedField.condition?.operator || 'EQUALS',
                        value: editedField.condition?.value || '',
                      },
                    })
                  }
                }}
                className={inputClass}
              >
                <option value="">Koşul Yok</option>
                {otherFields.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.label || f.id}
                  </option>
                ))}
              </select>

              {editedField.condition && (
                <>
                  <select
                    value={editedField.condition.operator}
                    onChange={e =>
                      setEditedField({
                        ...editedField,
                        condition: {
                          ...editedField.condition!,
                          operator: e.target
                            .value as import('@/types/form').ConditionOperator,
                        },
                      })
                    }
                    className={inputClass}
                  >
                    <option value="EQUALS">Eşit</option>
                    <option value="NOT_EQUALS">Eşit Değil</option>
                    <option value="GT">Büyük</option>
                    <option value="LT">Küçük</option>
                  </select>
                  <input
                    type="text"
                    value={String(editedField.condition.value)}
                    onChange={e =>
                      setEditedField({
                        ...editedField,
                        condition: {
                          ...editedField.condition!,
                          value: e.target.value,
                        },
                      })
                    }
                    className={inputClass}
                    placeholder="Değer"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            İptal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-linear-to-r flex-1 rounded-xl from-violet-500 to-purple-600 px-4 py-3 text-sm font-medium text-white"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  )
}
