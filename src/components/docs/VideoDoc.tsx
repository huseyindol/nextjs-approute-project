'use client'

import React from 'react'
import {
  Stage,
  Sprite,
  useSprite,
  Easing,
  animate,
} from './animations/AnimationEngine'

// --- Helpers from original docs ---
const BG = '#0d0e12'
const SURFACE = '#15171e'
const BORDER = '#252736'
const TEXT = '#e6e8f0'
const MUTED = '#5a5e75'
const ACCENT = 'oklch(68% 0.20 255)'
const ACCENT2 = 'oklch(68% 0.20 185)'
const ACCENT3 = 'oklch(68% 0.20 320)'

function tv(
  t: number,
  s: number,
  e: number,
  from: number,
  to: number,
  ease = Easing.easeInOutCubic,
) {
  return animate({ from, to, start: s, end: e, ease })(t)
}

function withAlpha(color: string, a: number) {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${a})`
  }
  return color.replace(')', ` / ${a})`)
}

// --- Scene Components ---

function Scene({ children }: { children: React.ReactNode }) {
  const { localTime, duration } = useSprite()
  const d = 0.4
  const op = Math.min(
    Math.min(1, localTime / d),
    Math.min(1, (duration - localTime) / d),
  )
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: op,
        fontFamily: 'Inter, sans-serif',
        color: TEXT,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: BG }} />
      {children}
    </div>
  )
}

function EyeLabel({ text, color, appear }: any) {
  const { localTime } = useSprite()
  const a = appear || 0.3
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 62,
        transform: 'translateX(-50%)',
        opacity: tv(localTime, a, a + 0.5, 0, 1),
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 17,
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: color || ACCENT,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  )
}

function SlideTitle({ text, appear }: any) {
  const { localTime } = useSprite()
  const a = appear || 0.5
  const op = tv(localTime, a, a + 0.55, 0, 1)
  const ty = tv(localTime, a, a + 0.55, 22, 0, Easing.easeOutCubic)
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 100,
        transform: `translate(-50%, ${ty}px)`,
        opacity: op,
        fontSize: 72,
        fontWeight: 700,
        letterSpacing: -3,
        color: TEXT,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  )
}

// --- Individual Scenes ---

function SceneTitle() {
  const { localTime: lt } = useSprite()
  const glowOp = tv(lt, 0.1, 0.9, 0, 1)
  const glowSc = tv(lt, 0.1, 1.2, 0.2, 1.3, Easing.easeOutCubic)
  const titleOp = tv(lt, 0.4, 1.1, 0, 1)
  const titleY = tv(lt, 0.4, 1.1, 55, 0, Easing.easeOutCubic)
  const subOp = tv(lt, 1.4, 2.1, 0, 1)
  const eyeOp = tv(lt, 0.2, 0.7, 0, 1)
  const badges = [
    'Java 21',
    'Spring Boot 3.5',
    'PostgreSQL',
    'Redis',
    'Kubernetes',
  ]

  return (
    <Scene>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '44%',
          transform: `translate(-50%,-50%) scale(${glowSc})`,
          opacity: glowOp,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, oklch(45% 0.20 255 / 0.20) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '27%',
          transform: 'translateX(-50%)',
          opacity: eyeOp,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 18,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: ACCENT,
          whiteSpace: 'nowrap',
        }}
      >
        CMS Platformu · Spring Boot 3.5 · Java 21
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '44%',
          transform: `translate(-50%, calc(-50% + ${titleY}px))`,
          opacity: titleOp,
          fontSize: 220,
          fontWeight: 700,
          letterSpacing: -10,
          background:
            'linear-gradient(135deg, #ffffff 30%, oklch(78% 0.18 255))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 0.9,
        }}
      >
        Elly
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '66%',
          transform: 'translateX(-50%)',
          opacity: subOp,
          fontSize: 30,
          fontWeight: 300,
          color: MUTED,
          whiteSpace: 'nowrap',
          letterSpacing: -0.5,
        }}
      >
        Güçlü Çok Kiracılı İçerik Yönetim Sistemi
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '78%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 14,
        }}
      >
        {badges.map((b, i) => (
          <div
            key={b}
            style={{
              padding: '10px 22px',
              background: withAlpha(ACCENT, 0.12),
              border: `1px solid ${withAlpha(ACCENT, 0.35)}`,
              borderRadius: 10,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 17,
              color: TEXT,
              opacity: tv(lt, 2.1 + i * 0.22, 2.7 + i * 0.22, 0, 1),
              transform: `scale(${tv(lt, 2.1 + i * 0.22, 2.7 + i * 0.22, 0.65, 1, Easing.easeOutBack)})`,
              whiteSpace: 'nowrap',
            }}
          >
            {b}
          </div>
        ))}
      </div>
    </Scene>
  )
}

function SceneEntities() {
  const { localTime: lt } = useSprite()
  const pillars = [
    {
      label: 'İçerik',
      color: ACCENT,
      a: 0.7,
      items: [
        'Page',
        'Component',
        'Banner',
        'Widget',
        'Post',
        'Comment',
        'Rating',
      ],
    },
    {
      label: 'Auth',
      color: ACCENT2,
      a: 1.4,
      items: [
        'User',
        'Role',
        'Permission',
        'Login',
        'Register',
        'RefreshToken',
        'OAuth2',
      ],
    },
    {
      label: 'Form',
      color: ACCENT3,
      a: 2.1,
      items: [
        'FormDefinition',
        'FieldDefinition',
        'ConditionEvaluator',
        'FormSubmission',
      ],
    },
    {
      label: 'E-posta',
      color: ACCENT,
      a: 2.8,
      items: [
        'MailAccount',
        'EmailLog',
        'RabbitMQ queue',
        'Thymeleaf',
        'EmailRescueJob',
      ],
    },
  ]
  const GAP = 430,
    PX0 = 120

  return (
    <Scene>
      <EyeLabel text="Genel Bakış" />
      <SlideTitle text="Elly Nedir? — Dört Temel" />
      {pillars.map((p, pi) => {
        const x = PX0 + pi * GAP
        return (
          <div
            key={p.label}
            style={{
              position: 'absolute',
              left: x,
              top: 200,
              width: 380,
              opacity: tv(lt, p.a, p.a + 0.55, 0, 1),
              transform: `translateY(${tv(lt, p.a, p.a + 0.55, 30, 0, Easing.easeOutBack)}px)`,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                background: withAlpha(p.color, 0.14),
                border: `1px solid ${withAlpha(p.color, 0.45)}`,
                borderRadius: 14,
                padding: '14px 20px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 22,
                color: p.color,
                fontWeight: 600,
              }}
            >
              {p.label}
            </div>
            {p.items.map((item, ii) => {
              const ia = p.a + 0.3 + ii * 0.12
              return (
                <div
                  key={item}
                  style={{
                    opacity: tv(lt, ia, ia + 0.4, 0, 1),
                    transform: `translateX(${tv(lt, ia, ia + 0.4, 18, 0, Easing.easeOutCubic)}px)`,
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 9,
                    padding: '10px 18px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 18,
                    color: TEXT,
                  }}
                >
                  {item}
                </div>
              )
            })}
          </div>
        )
      })}
    </Scene>
  )
}

// --- Main Component ---

export default function VideoDoc() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      <Stage width={1920} height={1080} duration={60}>
        <Sprite start={0} end={5}>
          <SceneTitle />
        </Sprite>
        <Sprite start={5} end={13}>
          <SceneEntities />
        </Sprite>
        {/* Diğer sahneler buraya eklenebilir */}
        <Sprite start={13} end={60}>
          <Scene>
            <div className="flex h-full items-center justify-center text-xl italic text-muted-foreground">
              Sunum devam ediyor... (Tüm sahneler port edilebilir)
            </div>
          </Scene>
        </Sprite>
      </Stage>
    </div>
  )
}
