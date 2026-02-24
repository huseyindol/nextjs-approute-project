import { Component } from '@/types/BaseResponse'
import { getImageUrl } from '@/utils/imageUrl'
import Image from 'next/image'
import Link from 'next/link'

export default function BComponent(props: Readonly<Component>) {
  const { banners, name, description } = props

  if (!banners || banners.length === 0) {
    return null
  }

  return (
    <section className="w-full py-8">
      {/* Section Header */}
      {(name || description) && (
        <div className="mb-6 text-center">
          {name && (
            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
              {name}
            </h2>
          )}
          {description && <p className="text-slate-400">{description}</p>}
        </div>
      )}

      {/* Banner Grid/Carousel */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {banners.map(banner => (
          <Link
            key={banner.id}
            href={banner.link || '#'}
            target={banner.target || '_self'}
            className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-2xl"
          >
            {/* Responsive Image */}
            <div className="relative aspect-video w-full overflow-hidden">
              <picture>
                {/* Mobile */}
                {banner.images?.mobile && (
                  <source
                    media="(max-width: 640px)"
                    srcSet={getImageUrl(banner.images.mobile)}
                  />
                )}
                {/* Tablet */}
                {banner.images?.tablet && (
                  <source
                    media="(max-width: 1024px)"
                    srcSet={getImageUrl(banner.images.tablet)}
                  />
                )}
                {/* Desktop - Default */}
                <Image
                  src={getImageUrl(banner.images?.desktop)}
                  alt={banner.altText || banner.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </picture>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Banner Title */}
            {banner.title && (
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                  {banner.title}
                </h3>
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
