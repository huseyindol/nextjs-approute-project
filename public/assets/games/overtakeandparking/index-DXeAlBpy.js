import { P as o } from './phaser-CaWnzXme.js'
;(function () {
  const e = document.createElement('link').relList
  if (e && e.supports && e.supports('modulepreload')) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i)
  new MutationObserver(i => {
    for (const n of i)
      if (n.type === 'childList')
        for (const a of n.addedNodes)
          a.tagName === 'LINK' && a.rel === 'modulepreload' && s(a)
  }).observe(document, { childList: !0, subtree: !0 })
  function t(i) {
    const n = {}
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : i.crossOrigin === 'anonymous'
          ? (n.credentials = 'omit')
          : (n.credentials = 'same-origin'),
      n
    )
  }
  function s(i) {
    if (i.ep) return
    i.ep = !0
    const n = t(i)
    fetch(i.href, n)
  }
})()
const c = 480,
  h = 800,
  ee = 'makas:highscore'
function X(l, e) {
  return `game:${l}:highscore:${e}`
}
function pe(l, e) {
  if (!(l !== 'overtake' || e !== 'default'))
    try {
      const t = X(l, e)
      if (window.localStorage.getItem(t) !== null) return
      const s = window.localStorage.getItem(ee)
      if (s === null) return
      ;(window.localStorage.setItem(t, s), window.localStorage.removeItem(ee))
    } catch {}
}
const _ = {
    load(l, e = 'default') {
      pe(l, e)
      try {
        const t = window.localStorage.getItem(X(l, e))
        if (!t) return 0
        const s = parseInt(t, 10)
        return Number.isFinite(s) && s >= 0 ? s : 0
      } catch {
        return 0
      }
    },
    save(l, e, t = 'default') {
      try {
        const s = this.load(l, t)
        return e <= s
          ? !1
          : (window.localStorage.setItem(X(l, t), String(e)), !0)
      } catch {
        return !1
      }
    },
  },
  O = {
    EngineLoop: 'engine_loop',
    Backfire: 'backfire',
    GearShift: 'gear_shift',
    Crash: 'crash',
  },
  g = {
    Boot: 'overtake:Boot',
    Menu: 'overtake:Menu',
    Intro: 'overtake:Intro',
    Countdown: 'overtake:Countdown',
    Game: 'overtake:Game',
    Hud: 'overtake:Hud',
    GameOver: 'overtake:GameOver',
  },
  S = {
    CarRed: 'overtake:car_red',
    CarBlue: 'overtake:car_blue',
    CarYellow: 'overtake:car_yellow',
    TrafficGreen: 'overtake:traffic_green',
    TrafficWhite: 'overtake:traffic_white',
    TrafficOrange: 'overtake:traffic_orange',
    RoadStripe: 'overtake:road_stripe',
  },
  y = {
    GearChanged: 'gear:changed',
    SpeedChanged: 'speed:changed',
    ScoreChanged: 'score:changed',
    MultiplierChanged: 'multiplier:changed',
    Overtake: 'player:overtake',
    Makas: 'player:makas',
  },
  v = [
    {
      id: 'red',
      label: 'Kırmızı Şimşek',
      textureKey: S.CarRed,
      tint: 15022389,
      topSpeedBonus: 0,
      accelBonus: 10,
    },
    {
      id: 'blue',
      label: 'Mavi Yıldırım',
      textureKey: S.CarBlue,
      tint: 2001125,
      topSpeedBonus: 30,
      accelBonus: 0,
    },
    {
      id: 'yellow',
      label: 'Sarı Fırtına',
      textureKey: S.CarYellow,
      tint: 16635957,
      topSpeedBonus: 15,
      accelBonus: 5,
    },
  ],
  ge = [S.TrafficGreen, S.TrafficWhite, S.TrafficOrange],
  A = 56,
  K = 96
let ye = class extends o.Scene {
  constructor() {
    super(g.Boot)
  }
  preload() {
    ;(this.generateCarTexture(S.CarRed, 15022389),
      this.generateCarTexture(S.CarBlue, 2001125),
      this.generateCarTexture(S.CarYellow, 16635957),
      this.generateCarTexture(S.TrafficGreen, 4431943),
      this.generateCarTexture(S.TrafficWhite, 15527921),
      this.generateCarTexture(S.TrafficOrange, 16485376),
      this.generateRoadStripe())
  }
  create() {
    this.scene.start(g.Menu)
  }
  generateCarTexture(e, t) {
    if (this.textures.exists(e)) return
    const s = this.add.graphics()
    ;(s.fillStyle(1118481, 1),
      s.fillRoundedRect(0, 0, A, K, 8),
      s.fillStyle(t, 1),
      s.fillRoundedRect(4, 6, A - 8, K - 12, 6),
      s.fillStyle(855309, 1),
      s.fillRect(10, 18, A - 20, 18),
      s.fillRect(10, K - 36, A - 20, 18),
      s.fillStyle(16771899, 1),
      s.fillRect(6, 2, 8, 4),
      s.fillRect(A - 14, 2, 8, 4),
      s.generateTexture(e, A, K),
      s.destroy())
  }
  generateRoadStripe() {
    if (this.textures.exists(S.RoadStripe)) return
    const e = this.add.graphics()
    ;(e.fillStyle(16777215, 1),
      e.fillRect(0, 0, 6, 40),
      e.generateTexture(S.RoadStripe, 6, 40),
      e.destroy())
  }
}
class me extends o.Scene {
  constructor() {
    ;(super(g.Menu), (this.selectedIndex = 0), (this.cards = []))
  }
  create() {
    ;((this.cards = []),
      (this.selectedIndex = 0),
      this.add
        .text(c / 2, 80, 'MAKAS', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '56px',
          color: '#ffeb3b',
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
      this.add
        .text(c / 2, 140, 'Arabanı Seç', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '20px',
          color: '#bdbdbd',
        })
        .setOrigin(0.5))
    const e = _.load('overtake')
    ;(e > 0 &&
      this.add
        .text(c / 2, 170, `Rekor: ${e}`, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '16px',
          color: '#a5d6a7',
        })
        .setOrigin(0.5),
      v.forEach((t, s) => {
        this.cards.push(this.buildCard(t, s))
      }),
      this.add
        .text(c / 2, h - 60, '← →  seç    ENTER  başla', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '16px',
          color: '#9e9e9e',
        })
        .setOrigin(0.5),
      this.input.keyboard?.on('keydown-LEFT', () => this.move(-1)),
      this.input.keyboard?.on('keydown-RIGHT', () => this.move(1)),
      this.input.keyboard?.on('keydown-ENTER', () => this.confirm()),
      this.input.keyboard?.on('keydown-SPACE', () => this.confirm()),
      this.input.keyboard?.on('keydown-ESC', () => {
        this.scene.start('hub:HubScene')
      }),
      this.refresh())
  }
  buildCard(e, t) {
    const i = (c / (v.length + 1)) * (t + 1),
      n = h / 2,
      a = this.add.container(i, n),
      r = this.add.rectangle(0, 0, 110, 200, 2039583, 1)
    r.setStrokeStyle(2, 3355443)
    const u = this.add.image(0, -10, e.textureKey),
      f = this.add
        .text(0, 80, e.label, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '14px',
          color: '#eaeaea',
          align: 'center',
          wordWrap: { width: 100 },
        })
        .setOrigin(0.5)
    return (a.add([r, u, f]), a.setData('bg', r), a)
  }
  move(e) {
    ;((this.selectedIndex = (this.selectedIndex + e + v.length) % v.length),
      this.refresh())
  }
  refresh() {
    this.cards.forEach((e, t) => {
      const s = e.getData('bg'),
        i = t === this.selectedIndex
      ;(s.setStrokeStyle(i ? 4 : 2, i ? 16771899 : 3355443),
        e.setScale(i ? 1.08 : 1))
    })
  }
  confirm() {
    const e = v[this.selectedIndex]
    this.scene.start(g.Intro, { choiceId: e.id })
  }
}
const I = 4,
  Q = c / I,
  Se = Array.from({ length: I }, (l, e) => Q * e + Q / 2)
function Z(l) {
  const e = Math.max(0, Math.min(I - 1, l))
  return Se[e]
}
const q = 40,
  U = 30
class J {
  constructor(e, t = 0) {
    ;((this.stripes = []),
      (this.scene = e),
      (this.scrollSpeed = t),
      (this.asphalt = e.add.rectangle(0, 0, c, h, 2829099).setOrigin(0, 0)),
      e.add.rectangle(0, 0, 4, h, 15658734, 0.9).setOrigin(0, 0),
      e.add.rectangle(c - 4, 0, 4, h, 15658734, 0.9).setOrigin(0, 0),
      this.spawnStripes())
  }
  spawnStripes() {
    const e = Math.ceil(h / (q + U)) + 2
    for (let t = 1; t < I; t++) {
      const s = t * Q
      for (let i = 0; i < e; i++) {
        const n = this.scene.add.image(s, i * (q + U), S.RoadStripe)
        ;(n.setOrigin(0.5, 0), this.stripes.push(n))
      }
    }
  }
  update(e) {
    const t = this.scrollSpeed * (e / 1e3),
      s = q + U
    for (const i of this.stripes)
      ((i.y += t), i.y > h && (i.y -= s * Math.ceil(h / s + 1)))
  }
  destroy() {
    ;(this.stripes.forEach(e => e.destroy()), this.asphalt.destroy())
  }
}
class xe extends o.Scene {
  constructor() {
    super(g.Intro)
  }
  create(e) {
    const t = v.find(i => i.id === e.choiceId) ?? v[0]
    this.road = new J(this)
    const s = this.add.image(c / 2, h + 80, t.textureKey)
    ;(this.tweens.add({
      targets: s,
      y: h - 160,
      duration: 1400,
      ease: 'Cubic.easeOut',
    }),
      this.tweens.add({
        targets: this.road,
        scrollSpeed: 480,
        duration: 1600,
        delay: 200,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          this.scene.start(g.Countdown, { choiceId: t.id })
        },
      }),
      this.add
        .text(c / 2, 60, 'HAZIRLAN', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '32px',
          color: '#ffeb3b',
          fontStyle: 'bold',
        })
        .setOrigin(0.5))
  }
  update(e, t) {
    this.road.update(t)
  }
}
class be extends o.Scene {
  constructor() {
    super(g.Countdown)
  }
  create(e) {
    const t = v.find(r => r.id === e.choiceId) ?? v[0]
    ;((this.road = new J(this, 480)),
      this.add.image(c / 2, h - 160, t.textureKey))
    const s = this.add
        .text(c / 2, h / 2, '3', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '160px',
          color: '#ffeb3b',
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
      i = ['3', '2', '1', 'BAŞLA!', null]
    let n = 0
    const a = () => {
      const r = i[n++]
      if (r === null) {
        this.scene.start(g.Game, { choiceId: t.id })
        return
      }
      ;(s.setText(r),
        s.setScale(1.4),
        this.tweens.add({
          targets: s,
          scale: 1,
          duration: 700,
          ease: 'Cubic.easeOut',
        }),
        this.time.delayedCall(900, a))
    }
    ;(s.setText(''), this.time.delayedCall(200, a))
  }
  update(e, t) {
    this.road.update(t)
  }
}
const ke = 180
class Ce {
  constructor(e, t) {
    ;((this.isChanging = !1),
      (this.laneIndex = Math.max(0, Math.floor(I / 2) - 1)),
      (this.targetX = Z(this.laneIndex)),
      (this.sprite = e.physics.add.sprite(this.targetX, h - 140, t.textureKey)),
      this.sprite.setCollideWorldBounds(!0),
      this.sprite.setImmovable(!0),
      this.sprite.body.setSize(
        this.sprite.width * 0.8,
        this.sprite.height * 0.85,
      ))
  }
  changeLane(e) {
    if (this.isChanging) return
    const t = this.laneIndex + e
    t < 0 ||
      t >= I ||
      ((this.laneIndex = t),
      (this.targetX = Z(this.laneIndex)),
      (this.isChanging = !0),
      this.sprite.scene.tweens.add({
        targets: this.sprite,
        x: this.targetX,
        duration: ke,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          this.isChanging = !1
        },
      }))
  }
  update(e) {}
  get currentLane() {
    return this.laneIndex
  }
}
const G = [
    { index: 1, label: '1', minSpeed: 0, maxSpeed: 80, accel: 60 },
    { index: 2, label: '2', minSpeed: 60, maxSpeed: 140, accel: 80 },
    { index: 3, label: '3', minSpeed: 120, maxSpeed: 220, accel: 100 },
    { index: 4, label: '4', minSpeed: 200, maxSpeed: 320, accel: 110 },
    { index: 5, label: '5', minSpeed: 300, maxSpeed: 460, accel: 120 },
  ],
  de = G[G.length - 1].maxSpeed,
  ve = 50,
  Te = 180
class Ee {
  constructor(e, t) {
    ;((this.gearIndex = 0),
      (this._speed = 0),
      (this.scene = e),
      (this.choice = t))
  }
  reset() {
    this.start(0, 0)
  }
  start(e, t) {
    this.gearIndex = o.Math.Clamp(t, 0, G.length - 1)
    const i = this.currentProfile.maxSpeed + this.choice.topSpeedBonus
    ;((this._speed = o.Math.Clamp(e, 0, i)), this.emitGear(), this.emitSpeed())
  }
  shiftUp() {
    this.gearIndex < G.length - 1 && (this.gearIndex++, this.emitGear())
  }
  shiftDown() {
    this.gearIndex > 0 && (this.gearIndex--, this.emitGear())
  }
  update(e, t, s) {
    const i = this.currentProfile,
      n = this.isTopGear ? 1 / 0 : i.maxSpeed + this.choice.topSpeedBonus,
      a = i.accel + this.choice.accelBonus
    ;(s
      ? (this._speed = Math.max(0, this._speed - Te * e))
      : t
        ? (this._speed = Math.min(n, this._speed + a * e))
        : (this._speed = Math.max(0, this._speed - ve * e)),
      this._speed < i.minSpeed * 0.6 &&
        this.gearIndex > 0 &&
        (this._speed = Math.max(0, this._speed - 20 * e)),
      this.emitSpeed())
  }
  get speed() {
    return this._speed
  }
  get currentProfile() {
    return G[this.gearIndex]
  }
  get currentGearIndex() {
    return this.gearIndex
  }
  get isTopGear() {
    return this.gearIndex === G.length - 1
  }
  get gearLabel() {
    return this.currentProfile.label
  }
  emitGear() {
    ;(this.scene.events.emit(y.GearChanged, this.gearLabel),
      this.scene.events.emit(y.MultiplierChanged, this.isTopGear ? 2 : 1))
  }
  emitSpeed() {
    this.scene.events.emit(y.SpeedChanged, this._speed)
  }
}
let Re = 1
class we {
  constructor(e, t, s, i, n, a) {
    ;((this.id = Re++),
      (this.lane = s),
      (this.worldSpeed = n),
      (this.sprite = e.physics.add.sprite(Z(s), a, i)),
      this.sprite.setData('ref', this),
      this.sprite.setImmovable(!0),
      this.sprite.body.setSize(
        this.sprite.width * 0.8,
        this.sprite.height * 0.85,
      ),
      t.add(this.sprite))
  }
  update(e, t) {
    const s = t - this.worldSpeed
    this.sprite.y += s * e
  }
  destroy() {
    this.sprite.destroy()
  }
}
const te = [1, 1.8],
  Oe = [0.35, 0.8],
  Me = [60, 180],
  Ie = [120, 280],
  se = 90,
  ie = -120,
  Ae = 180
class Ge {
  constructor(e, t) {
    ;((this.timer = 0),
      (this.elapsed = 0),
      (this.scene = e),
      (this.group = t),
      (this.nextSpawnIn = te[0]))
  }
  update(e, t) {
    if (((this.elapsed += e), (this.timer += e), this.timer < this.nextSpawnIn))
      return
    this.timer = 0
    const s = o.Math.Clamp(this.elapsed / se, 0, 1),
      [i, n] = this.lerpRange(te, Oe, s)
    ;((this.nextSpawnIn = o.Math.FloatBetween(i, n)), this.trySpawn(s))
  }
  get intensity() {
    return o.Math.Clamp(this.elapsed / se, 0, 1)
  }
  trySpawn(e) {
    const t = this.pickAvailableLane()
    if (t === null) return
    const s = o.Utils.Array.GetRandom([...ge]),
      [i, n] = this.lerpRange(Me, Ie, e),
      a = o.Math.FloatBetween(i, n)
    new we(this.scene, this.group, t, s, a, ie)
  }
  lerpRange(e, t, s) {
    return [o.Math.Linear(e[0], t[0], s), o.Math.Linear(e[1], t[1], s)]
  }
  pickAvailableLane() {
    const e = new Set(),
      t = new Map()
    this.group.children.iterate(i => {
      if (!i) return !0
      const n = i,
        a = n.getData('ref')
      if (!a) return !0
      n.y < 200 && e.add(a.lane)
      const r = t.get(a.lane)
      return ((r === void 0 || n.y < r) && t.set(a.lane, n.y), !0)
    })
    const s = []
    for (let i = 0; i < I; i++) {
      const n = t.get(i)
      ;(n === void 0 || n > ie + Ae) && s.push(i)
    }
    if (e.size >= I - 1) {
      const i = s.filter(n => !e.has(n))
      return i.length ? o.Utils.Array.GetRandom(i) : null
    }
    return s.length ? o.Utils.Array.GetRandom(s) : null
  }
}
class _e {
  constructor(e) {
    ;((this.ctx = e), (this.engine = this.start()))
  }
  setSpeed(e) {
    const t = 50 + e * 130,
      s = 360 + e * 1900,
      i = 0.05 + e * 0.09,
      n = 220 + e * 700,
      a = this.ctx.currentTime
    ;(this.engine.saws[0].frequency.setTargetAtTime(t, a, 0.1),
      this.engine.saws[1].frequency.setTargetAtTime(t, a, 0.1),
      this.engine.sub.frequency.setTargetAtTime(t * 0.5, a, 0.1),
      this.engine.filter.frequency.setTargetAtTime(s, a, 0.15),
      this.engine.masterGain.gain.setTargetAtTime(i, a, 0.15),
      this.engine.noiseFilter.frequency.setTargetAtTime(n, a, 0.15))
  }
  triggerBackfire() {
    const e = this.ctx,
      t = e.createBuffer(1, e.sampleRate * 0.22, e.sampleRate),
      s = t.getChannelData(0)
    for (let r = 0; r < s.length; r++) {
      const u = Math.exp(-r / (e.sampleRate * 0.06))
      s[r] = (Math.random() * 2 - 1) * u
    }
    const i = e.createBufferSource()
    i.buffer = t
    const n = e.createBiquadFilter()
    ;((n.type = 'lowpass'), (n.frequency.value = 480))
    const a = e.createGain()
    ;((a.gain.value = 0.4),
      i.connect(n).connect(a).connect(e.destination),
      i.start())
  }
  destroy() {
    for (const e of this.engine.oscillators) {
      try {
        e.stop()
      } catch {}
      e.disconnect()
    }
    try {
      this.engine.noise.stop()
    } catch {}
    ;(this.engine.noise.disconnect(),
      this.engine.masterGain.disconnect(),
      this.engine.filter.disconnect(),
      this.engine.noiseFilter.disconnect())
  }
  start() {
    const e = this.ctx,
      t = e.createBiquadFilter()
    ;((t.type = 'lowpass'), (t.frequency.value = 380), (t.Q.value = 0.8))
    const s = e.createWaveShaper()
    ;((s.curve = this.makeDistortionCurve(18)), (s.oversample = '2x'))
    const i = e.createGain()
    i.gain.value = 0
    const n = e.createOscillator()
    ;((n.type = 'sawtooth'), (n.frequency.value = 55), (n.detune.value = -7))
    const a = e.createOscillator()
    ;((a.type = 'sawtooth'), (a.frequency.value = 55), (a.detune.value = 7))
    const r = e.createOscillator()
    ;((r.type = 'triangle'), (r.frequency.value = 27))
    const u = e.createGain()
    ;((u.gain.value = 0.45), n.connect(u), a.connect(u))
    const f = e.createGain()
    ;((f.gain.value = 0.55), r.connect(f))
    const p = Math.floor(e.sampleRate * 2),
      w = e.createBuffer(1, p, e.sampleRate),
      B = w.getChannelData(0)
    for (let Y = 0; Y < p; Y++) B[Y] = Math.random() * 2 - 1
    const L = e.createBufferSource()
    ;((L.buffer = w), (L.loop = !0))
    const D = e.createBiquadFilter()
    ;((D.type = 'bandpass'), (D.frequency.value = 220), (D.Q.value = 1.6))
    const $ = e.createGain()
    ;(($.gain.value = 0.18),
      L.connect(D).connect($),
      u.connect(s),
      f.connect(s),
      $.connect(s),
      s.connect(t).connect(i).connect(e.destination))
    const H = e.createOscillator()
    H.frequency.value = 6.5
    const P = e.createGain()
    ;((P.gain.value = 1.2),
      H.connect(P),
      P.connect(n.frequency),
      P.connect(a.frequency),
      P.connect(r.frequency))
    const N = e.createOscillator()
    N.frequency.value = 3.5
    const W = e.createGain()
    return (
      (W.gain.value = 0.05),
      N.connect(W),
      W.connect(i.gain),
      n.start(),
      a.start(),
      r.start(),
      L.start(),
      H.start(),
      N.start(),
      {
        oscillators: [n, a, r, H, N],
        saws: [n, a],
        sub: r,
        noise: L,
        noiseFilter: D,
        masterGain: i,
        filter: t,
      }
    )
  }
  makeDistortionCurve(e) {
    const s = new ArrayBuffer(1024 * Float32Array.BYTES_PER_ELEMENT),
      i = new Float32Array(s),
      n = e,
      a = Math.PI / 180
    for (let r = 0; r < 1024; r++) {
      const u = (r * 2) / 1024 - 1
      i[r] = ((3 + n) * u * 20 * a) / (Math.PI + n * Math.abs(u))
    }
    return i
  }
}
class Be {
  constructor(e) {
    this.ctx = e
  }
  gearShift() {
    const e = this.ctx,
      t = e.createOscillator(),
      s = e.createGain()
    ;((t.type = 'square'),
      (t.frequency.value = 220),
      s.gain.setValueAtTime(1e-4, e.currentTime),
      s.gain.exponentialRampToValueAtTime(0.1, e.currentTime + 0.01),
      s.gain.exponentialRampToValueAtTime(1e-4, e.currentTime + 0.08),
      t.connect(s).connect(e.destination),
      t.start(),
      t.stop(e.currentTime + 0.1))
  }
  crash() {
    const e = this.ctx,
      t = e.createBuffer(1, e.sampleRate * 0.5, e.sampleRate),
      s = t.getChannelData(0)
    for (let a = 0; a < s.length; a++) {
      const r = Math.exp(-a / (e.sampleRate * 0.18))
      s[a] = (Math.random() * 2 - 1) * r
    }
    const i = e.createBufferSource()
    i.buffer = t
    const n = e.createGain()
    ;((n.gain.value = 0.5), i.connect(n).connect(e.destination), i.start())
  }
  destroy() {}
}
const ne = 0.6,
  Le = 1.8,
  ae = 0.3,
  De = 0.9
class Pe {
  constructor(e) {
    ;((this.scene = e),
      (this.engineSound = e.sound.add(O.EngineLoop, {
        loop: !0,
        volume: ae,
        rate: ne,
      })),
      this.engineSound.play())
  }
  setSpeed(e) {
    const t = o.Math.Clamp(e, 0, 1)
    ;(this.engineSound.setRate(o.Math.Linear(ne, Le, t)),
      this.engineSound.setVolume(o.Math.Linear(ae, De, t)))
  }
  triggerBackfire() {
    this.scene.cache.audio.exists(O.Backfire) &&
      this.scene.sound.play(O.Backfire, { volume: 0.6 })
  }
  destroy() {
    ;(this.engineSound.stop(), this.engineSound.destroy())
  }
}
class Fe {
  constructor(e) {
    this.scene = e
  }
  gearShift() {
    this.scene.cache.audio.exists(O.GearShift) &&
      this.scene.sound.play(O.GearShift, { volume: 0.5 })
  }
  crash() {
    this.scene.cache.audio.exists(O.Crash) &&
      this.scene.sound.play(O.Crash, { volume: 0.7 })
  }
  destroy() {}
}
class ue {
  constructor(e, t = {}) {
    ;((this.ctx = null),
      (this.engine = null),
      (this.oneShots = null),
      (this.prevSpeed = 0),
      (this.resumed = !1),
      (this.scene = e),
      (this.maxSpeed = t.maxSpeed ?? 100),
      (this.mode = t.engine ?? 'auto'),
      e.events.once(o.Scenes.Events.SHUTDOWN, () => this.dispose()),
      e.input.once('pointerdown', () => this.resume()),
      e.input.keyboard?.once('keydown', () => this.resume()))
  }
  setSpeed(e) {
    if (this.engine) {
      const t = o.Math.Clamp(e / this.maxSpeed, 0, 1)
      ;(this.engine.setSpeed(t),
        this.prevSpeed - e > 30 && this.engine.triggerBackfire())
    }
    this.prevSpeed = e
  }
  playGearShift() {
    this.oneShots?.gearShift()
  }
  crash() {
    this.oneShots?.crash()
  }
  resume() {
    if (!this.resumed) {
      if (((this.resumed = !0), this.scene.cache.audio.exists(O.EngineLoop))) {
        ;(this.mode !== 'off' && (this.engine = new Pe(this.scene)),
          (this.oneShots = new Fe(this.scene)))
        return
      }
      try {
        ;((this.ctx = new AudioContext()),
          this.mode !== 'off' && (this.engine = new _e(this.ctx)),
          (this.oneShots = new Be(this.ctx)))
      } catch {
        this.ctx = null
      }
    }
  }
  dispose() {
    ;(this.engine?.destroy(),
      this.oneShots?.destroy(),
      this.ctx?.close().catch(() => {}),
      (this.engine = null),
      (this.oneShots = null),
      (this.ctx = null))
  }
}
let He = class extends o.Scene {
    constructor() {
      ;(super(g.Game), (this.score = 0), (this.overtakenIds = new Set()))
    }
    create(e) {
      const t = v.find(s => s.id === e.choiceId) ?? v[0]
      ;((this.road = new J(this, 0)),
        (this.gears = new Ee(this, t)),
        (this.sound$ = new ue(this, { maxSpeed: de })),
        (this.player = new Ce(this, t)),
        (this.traffic = this.physics.add.group()),
        (this.spawner = new Ge(this, this.traffic)),
        this.scene.launch(g.Hud),
        this.events.on(y.SpeedChanged, s => this.sound$.setSpeed(s)),
        this.events.on(y.GearChanged, () => this.sound$.playGearShift()),
        this.input.keyboard?.on('keydown-LEFT', () =>
          this.player.changeLane(-1),
        ),
        this.input.keyboard?.on('keydown-RIGHT', () =>
          this.player.changeLane(1),
        ),
        this.input.keyboard?.on('keydown-X', () => this.gears.shiftUp()),
        this.input.keyboard?.on('keydown-Z', () => this.gears.shiftDown()),
        this.physics.add.overlap(
          this.player.sprite,
          this.traffic,
          () => this.handleCrash(),
          void 0,
          this,
        ),
        (this.score = 0),
        this.overtakenIds.clear(),
        this.events.emit(y.ScoreChanged, this.score),
        this.gears.start(80, 1))
    }
    update(e, t) {
      const s = t / 1e3,
        i = this.input.keyboard?.checkDown(
          this.input.keyboard.addKey(o.Input.Keyboard.KeyCodes.UP),
          0,
        ),
        n = this.input.keyboard?.checkDown(
          this.input.keyboard.addKey(o.Input.Keyboard.KeyCodes.DOWN),
          0,
        )
      this.gears.update(s, !!i, !!n)
      const a = this.gears.speed
      ;((this.road.scrollSpeed = a),
        this.road.update(t),
        this.player.update(s),
        this.spawner.update(s, a))
      const r = []
      ;(this.traffic.children.iterate(u => {
        if (!u) return !0
        const f = u,
          p = f.getData('ref')
        return (
          p &&
            (p.update(s, a),
            !this.overtakenIds.has(p.id) &&
              f.y > this.player.sprite.y + 40 &&
              (this.overtakenIds.add(p.id), this.registerOvertake(p)),
            f.y > h + 120 && r.push(p)),
          !0
        )
      }),
        r.forEach(u => u.destroy()))
    }
    registerOvertake(e) {
      const t = this.isCloseSqueeze(e),
        s = t ? 3 : 1,
        i = this.gears.isTopGear ? 2 : 1
      ;((this.score += s * i),
        this.events.emit(y.ScoreChanged, this.score),
        this.events.emit(y.Overtake),
        t && (this.events.emit(y.Makas), this.showMakasPopup(i)))
    }
    isCloseSqueeze(e) {
      const t = this.player.currentLane,
        s = this.player.sprite.y
      let i = !1
      return (
        this.traffic.children.iterate(n => {
          if (!n || i) return !0
          const a = n,
            r = a.getData('ref')
          if (!r || r.id === e.id) return !0
          const u = Math.abs(r.lane - t),
            f = Math.abs(a.y - s)
          return (u <= 1 && f < 110 && (i = !0), !0)
        }),
        i
      )
    }
    showMakasPopup(e) {
      const t = e > 1 ? 'MAKAS! x2' : 'MAKAS!',
        s = this.add
          .text(this.player.sprite.x, this.player.sprite.y - 40, t, {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '22px',
            color: '#ffeb3b',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 4,
          })
          .setOrigin(0.5)
      this.tweens.add({
        targets: s,
        y: s.y - 60,
        alpha: 0,
        duration: 700,
        ease: 'Cubic.easeOut',
        onComplete: () => s.destroy(),
      })
    }
    handleCrash() {
      ;(this.sound$.crash(),
        this.scene.stop(g.Hud),
        this.scene.start(g.GameOver, { score: this.score }))
    }
    get gearSystem() {
      return this.gears
    }
    get sounds() {
      return this.sound$
    }
    get bounds() {
      return { width: c, height: h }
    }
  },
  Ne = class extends o.Scene {
    constructor() {
      super(g.Hud)
    }
    create() {
      const e = this.scene.get(g.Game)
      ;(this.add.rectangle(0, 0, c, 60, 0, 0.55).setOrigin(0, 0),
        (this.gearText = this.add
          .text(
            20,
            30,
            `VİTES
1`,
            {
              fontFamily: 'system-ui, sans-serif',
              fontSize: '16px',
              color: '#ffeb3b',
              align: 'center',
              fontStyle: 'bold',
            },
          )
          .setOrigin(0, 0.5)),
        (this.speedText = this.add
          .text(c / 2, 30, '0 km/s', {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            fontStyle: 'bold',
          })
          .setOrigin(0.5, 0.5)),
        (this.scoreText = this.add
          .text(c - 20, 30, '0', {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '20px',
            color: '#a5d6a7',
            fontStyle: 'bold',
          })
          .setOrigin(1, 0.5)),
        (this.turboBadge = this.add
          .text(c / 2, 70, 'TURBO  x2 PUAN', {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '14px',
            color: '#ff5252',
            fontStyle: 'bold',
            backgroundColor: '#1a1a1a',
            padding: { x: 10, y: 4 },
          })
          .setOrigin(0.5, 0.5)
          .setVisible(!1)),
        (this.speedBar = this.add.graphics()),
        this.drawSpeedBar(0),
        e.events.on(y.GearChanged, s => {
          this.gearText.setText(`VİTES
${s}`)
        }),
        e.events.on(y.SpeedChanged, s => {
          ;(this.speedText.setText(`${Math.round(s)} km/s`),
            this.drawSpeedBar(s))
        }),
        e.events.on(y.ScoreChanged, s => {
          this.scoreText.setText(`${s}`)
        }),
        e.events.on(y.MultiplierChanged, s => {
          this.setTurbo(s > 1)
        }),
        this.events.once(o.Scenes.Events.SHUTDOWN, () => {
          ;(e.events.off(y.GearChanged),
            e.events.off(y.SpeedChanged),
            e.events.off(y.ScoreChanged),
            e.events.off(y.MultiplierChanged))
        }))
    }
    setTurbo(e) {
      e !== this.turboBadge.visible &&
        (this.turboBadge.setVisible(e),
        e &&
          this.tweens.add({
            targets: this.turboBadge,
            scale: { from: 1.4, to: 1 },
            duration: 250,
            ease: 'Back.easeOut',
          }))
    }
    drawSpeedBar(e) {
      const s = h - 28,
        i = c - 40,
        n = 10,
        a = o.Math.Clamp(e / de, 0, 1)
      ;(this.speedBar.clear(),
        this.speedBar.fillStyle(2236962, 0.8),
        this.speedBar.fillRoundedRect(20, s, i, n, 4),
        this.speedBar.fillStyle(this.colorForRatio(a), 1),
        this.speedBar.fillRoundedRect(20, s, i * a, n, 4))
    }
    colorForRatio(e) {
      return e < 0.4 ? 5025616 : e < 0.75 ? 16635957 : 15022389
    }
  },
  Ke = class extends o.Scene {
    constructor() {
      super(g.GameOver)
    }
    create(e) {
      const t = _.save('overtake', e.score),
        s = _.load('overtake')
      if (
        (this.add.rectangle(0, 0, c, h, 0, 0.7).setOrigin(0, 0),
        this.add
          .text(c / 2, h / 2 - 120, 'ÇARPIŞMA!', {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '48px',
            color: '#e53935',
            fontStyle: 'bold',
          })
          .setOrigin(0.5),
        this.add
          .text(c / 2, h / 2 - 40, `Geçtiğin Araba: ${e.score}`, {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '26px',
            color: '#ffeb3b',
          })
          .setOrigin(0.5),
        t)
      ) {
        const i = this.add
          .text(c / 2, h / 2 + 10, 'YENİ REKOR!', {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '22px',
            color: '#a5d6a7',
            fontStyle: 'bold',
          })
          .setOrigin(0.5)
        this.tweens.add({
          targets: i,
          scale: { from: 0.6, to: 1 },
          duration: 350,
          ease: 'Back.easeOut',
        })
      } else
        this.add
          .text(c / 2, h / 2 + 10, `En Yüksek: ${s}`, {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '18px',
            color: '#9e9e9e',
          })
          .setOrigin(0.5)
      ;(this.add
        .text(c / 2, h / 2 + 100, 'ENTER  tekrar oyna    ESC  hub', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '16px',
          color: '#bdbdbd',
        })
        .setOrigin(0.5),
        this.input.keyboard?.once('keydown-ENTER', () => {
          this.scene.start(g.Menu)
        }),
        this.input.keyboard?.once('keydown-SPACE', () => {
          this.scene.start(g.Menu)
        }),
        this.input.keyboard?.once('keydown-ESC', () => {
          this.scene.start('hub:HubScene')
        }))
    }
  }
const ze = {
    id: 'overtake',
    label: 'Makas',
    tagline: 'Şerit değiştir, trafiği geç',
    scenes: [ye, me, xe, be, He, Ne, Ke],
    entryKey: g.Boot,
    enabled: !0,
  },
  x = {
    Boot: 'parking:Boot',
    Game: 'parking:Game',
    Hud: 'parking:Hud',
    GameOver: 'parking:GameOver',
  },
  T = {
    PlayerCar: 'parking:player_car',
    ParkedCar: 'parking:parked_car',
    SlotMarker: 'parking:slot_marker',
    Asphalt: 'parking:asphalt',
  },
  k = {
    SpeedChanged: 'parking:speed:changed',
    QualityChanged: 'parking:quality:changed',
    CollisionsChanged: 'parking:collisions:changed',
    Parked: 'parking:parked',
  },
  F = c,
  R = h,
  $e = 70,
  We = 120,
  C = 50,
  M = 96,
  m = 130,
  b = R - 130,
  d = [60, 140, 220, 300, 380, 440],
  j = [
    {
      parkedCars: [
        { x: d[0], y: m, angle: 180 },
        { x: d[1], y: m, angle: 180 },
        { x: d[3], y: m, angle: 180 },
        { x: d[4], y: m, angle: 180 },
        { x: d[0], y: b, angle: 0 },
        { x: d[1], y: b, angle: 0 },
        { x: d[3], y: b, angle: 0 },
        { x: d[4], y: b, angle: 0 },
      ],
      targetSlot: { x: d[2], y: m, angle: 180 },
      playerStart: { x: F / 2, y: R / 2, angle: 90 },
    },
    {
      parkedCars: [
        { x: d[0], y: m, angle: 180 },
        { x: d[1], y: m, angle: 180 },
        { x: d[2], y: m, angle: 180 },
        { x: d[3], y: m, angle: 180 },
        { x: d[4], y: m, angle: 180 },
        { x: d[0], y: b, angle: 0 },
        { x: d[1], y: b, angle: 0 },
        { x: d[2], y: b, angle: 0 },
        { x: d[4], y: b, angle: 0 },
      ],
      targetSlot: { x: d[3], y: b, angle: 0 },
      playerStart: { x: d[0] + 15, y: R / 2, angle: 90 },
    },
    {
      parkedCars: [
        { x: d[1], y: m, angle: 180 },
        { x: d[2], y: m, angle: 180 },
        { x: d[3], y: m, angle: 180 },
        { x: d[4], y: m, angle: 180 },
        { x: d[0], y: b, angle: 0 },
        { x: d[1], y: b, angle: 0 },
        { x: d[3], y: b, angle: 0 },
        { x: d[4], y: b, angle: 0 },
      ],
      targetSlot: { x: d[0], y: m, angle: 180 },
      playerStart: { x: d[4] - 15, y: R / 2, angle: -90 },
    },
  ]
class Ye extends o.Scene {
  constructor() {
    super(x.Boot)
  }
  preload() {
    ;(this.generateCar(T.PlayerCar, 16635957),
      this.generateCar(T.ParkedCar, 5533306),
      this.generateAsphalt(),
      this.generateSlotMarker())
  }
  create() {
    this.scene.start(x.Game)
  }
  generateCar(e, t) {
    if (this.textures.exists(e)) return
    const s = this.add.graphics()
    ;(s.fillStyle(1118481, 1),
      s.fillRoundedRect(0, 0, C, M, 6),
      s.fillStyle(t, 1),
      s.fillRoundedRect(3, 5, C - 6, M - 10, 4),
      s.fillStyle(855309, 1),
      s.fillRect(8, 16, C - 16, 14),
      s.fillRect(8, M - 30, C - 16, 14),
      s.fillStyle(16774557, 1),
      s.fillRect(5, 2, 6, 4),
      s.fillRect(C - 11, 2, 6, 4),
      s.generateTexture(e, C, M),
      s.destroy())
  }
  generateAsphalt() {
    if (this.textures.exists(T.Asphalt)) return
    const e = this.add.graphics()
    ;(e.fillStyle(3158064, 1),
      e.fillRect(0, 0, 64, 64),
      e.fillStyle(3552822, 1),
      e.fillRect(2, 2, 30, 30),
      e.fillRect(34, 34, 28, 28),
      e.generateTexture(T.Asphalt, 64, 64),
      e.destroy())
  }
  generateSlotMarker() {
    if (this.textures.exists(T.SlotMarker)) return
    const e = this.add.graphics(),
      t = 70,
      s = 120
    ;(e.fillStyle(16771899, 0.18),
      e.fillRect(0, 0, t, s),
      e.lineStyle(4, 16771899, 1),
      e.strokeRect(2, 2, t - 4, s - 4),
      e.lineStyle(2, 16771899, 0.55))
    for (let i = -2; i < 10; i++)
      (e.beginPath(),
        e.moveTo(2, i * 14),
        e.lineTo(t - 2, i * 14 + 22),
        e.strokePath())
    ;(e.generateTexture(T.SlotMarker, t, s), e.destroy())
  }
}
const qe = 95,
  Ue = 70,
  Ve = 60,
  Xe = 220,
  Qe = 600,
  re = 130,
  Ze = 2.6
class Je {
  constructor(e, t) {
    ;((this.speed = 0),
      (this.sprite = e.physics.add.sprite(t.x, t.y, T.PlayerCar)),
      this.sprite.setRotation(o.Math.DegToRad(t.angle)))
    const s = this.sprite.body
    ;(s.setCircle(C / 2),
      s.setOffset(0, M / 2 - C / 2),
      s.setBounce(0.2, 0.2),
      s.setDamping(!0),
      s.setDrag(0.7, 0.7),
      s.setMaxVelocity(220),
      this.sprite.setCollideWorldBounds(!0))
  }
  forceStop() {
    ;((this.speed = 0), this.sprite.body.setVelocity(0, 0))
  }
  update(e, t, s, i, n) {
    if (
      (n
        ? (this.speed = this.bleedToZero(this.speed, Qe * e))
        : s > 0
          ? (this.speed = this.bleedToZero(this.speed, Xe * e))
          : t === 1
            ? (this.speed = Math.min(re, this.speed + qe * e))
            : t === -1
              ? (this.speed = Math.max(-70, this.speed - Ue * e))
              : (this.speed = this.bleedToZero(this.speed, Ve * e)),
      Math.abs(this.speed) > 1)
    ) {
      const f = this.speed / re
      this.sprite.rotation += i * Ze * f * e
    }
    const a = this.sprite.rotation,
      r = Math.sin(a) * this.speed,
      u = -Math.cos(a) * this.speed
    this.sprite.body.setVelocity(r, u)
  }
  get position() {
    return { x: this.sprite.x, y: this.sprite.y }
  }
  get angleDeg() {
    return o.Math.RadToDeg(this.sprite.rotation)
  }
  bleedToZero(e, t) {
    return e > 0 ? Math.max(0, e - t) : e < 0 ? Math.min(0, e + t) : 0
  }
}
class je {
  constructor(e, t, s) {
    this.sprite = e.physics.add.staticSprite(s.x, s.y, T.ParkedCar)
    const i = this.sprite.body
    ;(this.sprite.setRotation(0),
      i.setSize(C - 6, M - 6),
      i.setOffset(3, 3),
      i.updateFromGameObject(),
      this.sprite.setRotation(o.Math.DegToRad(s.angle)),
      t.add(this.sprite))
  }
}
class et {
  constructor(e, t) {
    ;((this.pos = t),
      (this.image = e.add.image(t.x, t.y, T.SlotMarker)),
      this.image.setRotation(o.Math.DegToRad(t.angle)),
      e.tweens.add({
        targets: this.image,
        alpha: { from: 0.7, to: 1 },
        duration: 700,
        yoyo: !0,
        repeat: -1,
        ease: 'Sine.easeInOut',
      }))
  }
  overlapRatio(e, t) {
    const s = -o.Math.DegToRad(this.pos.angle),
      i = e.x - this.pos.x,
      n = e.y - this.pos.y,
      a = i * Math.cos(s) - n * Math.sin(s),
      r = i * Math.sin(s) + n * Math.cos(s),
      u = Math.max(0, $e / 2 + C / 2 - Math.abs(a)),
      f = Math.max(0, We / 2 + M / 2 - Math.abs(r)),
      p = C * M
    return Math.min(1, (u * f) / p)
  }
  angleDeltaDeg(e) {
    let t = ((((e - this.pos.angle) % 360) + 540) % 360) - 180
    return Math.min(Math.abs(t), Math.abs(180 - Math.abs(t)))
  }
}
const tt = 5,
  st = 5,
  it = 1.5,
  nt = 350
class at {
  constructor(e, t, s) {
    ;((this.scene = e),
      (this.slot = t),
      (this.getCar = s),
      (this.collisions = 0),
      (this.lastQuality = 0),
      (this.lastCollisionAt = -1 / 0))
  }
  reset() {
    ;((this.collisions = 0),
      (this.lastQuality = 0),
      (this.lastCollisionAt = -1 / 0),
      this.scene.events.emit(k.CollisionsChanged, 0),
      this.scene.events.emit(k.QualityChanged, 0))
  }
  registerCollision() {
    const e = this.scene.time.now
    return e - this.lastCollisionAt < nt
      ? !1
      : ((this.lastCollisionAt = e),
        (this.collisions += 1),
        this.scene.events.emit(k.CollisionsChanged, this.collisions),
        !0)
  }
  update() {
    const e = this.computeQuality()
    Math.abs(e - this.lastQuality) >= 0.5 &&
      ((this.lastQuality = e), this.scene.events.emit(k.QualityChanged, e))
  }
  computeQuality() {
    const e = this.getCar(),
      t = this.slot.overlapRatio(e.position, e.angleDeg),
      s = this.slot.angleDeltaDeg(e.angleDeg),
      i = o.Math.Clamp(Math.abs(e.speed) * 0.5, 0, 40),
      n = Math.max(0, s - st) * it
    return Math.max(0, 100 * t - n - i)
  }
  finalize() {
    const e = this.computeQuality(),
      t = Math.max(0, Math.round(e - tt * this.collisions)),
      s = t >= 80 ? 3 : t >= 50 ? 2 : t >= 20 ? 1 : 0
    return {
      score: t,
      quality: Math.round(e),
      collisions: this.collisions,
      stars: s,
    }
  }
}
const rt = 0.3
class ot extends o.Scene {
  constructor() {
    ;(super(x.Game), (this.finished = !1), (this.levelIndex = 0))
  }
  init(e) {
    this.levelIndex = e.levelIndex ?? 0
  }
  create() {
    ;((this.finished = !1),
      this.add.tileSprite(0, 0, F, R, T.Asphalt).setOrigin(0, 0),
      this.drawLotMarkings(),
      this.physics.world.setBounds(0, 0, F, R),
      (this.parkedGroup = this.physics.add.staticGroup()))
    const e = j[this.levelIndex]
    ;((this.slot = new et(this, e.targetSlot)),
      e.parkedCars.forEach(t => new je(this, this.parkedGroup, t)),
      (this.player = new Je(this, e.playerStart)),
      (this.sound$ = new ue(this, { engine: 'off' })),
      (this.scorer = new at(this, this.slot, () => this.player)),
      this.physics.add.collider(
        this.player.sprite,
        this.parkedGroup,
        () => this.onCollision(),
        void 0,
        this,
      ),
      this.scene.launch(x.Hud, { levelIndex: this.levelIndex }),
      this.events.emit(k.SpeedChanged, 0),
      this.scorer.reset(),
      this.input.keyboard?.on('keydown-PERIOD', () => this.attemptPark()),
      this.input.keyboard?.on('keydown-ESC', () => {
        ;(this.scene.stop(x.Hud), this.scene.start('hub:HubScene'))
      }))
  }
  update(e, t) {
    if (this.finished) return
    const s = t / 1e3,
      i = this.input.keyboard
    if (!i) return
    const n = i.checkDown(i.addKey(o.Input.Keyboard.KeyCodes.UP), 0),
      a = i.checkDown(i.addKey(o.Input.Keyboard.KeyCodes.DOWN), 0),
      r = i.checkDown(i.addKey(o.Input.Keyboard.KeyCodes.LEFT), 0),
      u = i.checkDown(i.addKey(o.Input.Keyboard.KeyCodes.RIGHT), 0),
      f = i.checkDown(i.addKey(o.Input.Keyboard.KeyCodes.SPACE), 0)
    let p = 0
    n ? (p = 1) : a && (p = -1)
    const w = f ? 1 : 0,
      B = (u ? 1 : 0) - (r ? 1 : 0)
    ;(this.player.update(s, p, w, B, !1),
      this.events.emit(k.SpeedChanged, this.player.speed),
      this.scorer.update())
  }
  attemptPark() {
    if (this.finished) return
    if (
      this.slot.overlapRatio(this.player.position, this.player.angleDeg) < rt
    ) {
      this.flashHint('önce slota gir')
      return
    }
    ;((this.finished = !0),
      this.player.forceStop(),
      this.events.emit(k.Parked),
      this.time.delayedCall(450, () => {
        const t = this.scorer.finalize()
        ;(this.scene.stop(x.Hud),
          this.scene.start(x.GameOver, { ...t, levelIndex: this.levelIndex }))
      }))
  }
  onCollision() {
    this.finished ||
      (this.scorer.registerCollision() &&
        (this.cameras.main.shake(80, 0.005), this.sound$.crash()))
  }
  drawLotMarkings() {
    const e = this.add.graphics()
    ;(e.lineStyle(2, 16777215, 0.35),
      e.strokeRect(20, 70, F - 40, R - 140),
      e.lineBetween(20, R / 2, F - 20, R / 2))
  }
  flashHint(e) {
    const t = this.add
      .text(this.player.sprite.x, this.player.sprite.y - 50, e, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '16px',
        color: '#ffeb3b',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 3,
      })
      .setOrigin(0.5)
    this.tweens.add({
      targets: t,
      y: t.y - 30,
      alpha: 0,
      duration: 700,
      ease: 'Cubic.easeOut',
      onComplete: () => t.destroy(),
    })
  }
}
const oe = 20,
  V = h - 36,
  ce = c - 40,
  le = 14
class ct extends o.Scene {
  constructor() {
    ;(super(x.Hud), (this.levelIndex = 0))
  }
  init(e) {
    this.levelIndex = e.levelIndex ?? 0
  }
  create() {
    const e = this.scene.get(x.Game)
    ;(this.add.rectangle(0, 0, c, 50, 0, 0.55).setOrigin(0, 0),
      this.add
        .text(20, 25, `BÖLÜM ${this.levelIndex + 1} / ${j.length}`, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '16px',
          color: '#ffeb3b',
          fontStyle: 'bold',
        })
        .setOrigin(0, 0.5),
      (this.speedText = this.add
        .text(c / 2, 25, '0 km/s', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '20px',
          color: '#ffffff',
          fontStyle: 'bold',
        })
        .setOrigin(0.5)),
      (this.collisionsText = this.add
        .text(c - 20, 25, 'Çarpma: 0', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '14px',
          color: '#ef9a9a',
        })
        .setOrigin(1, 0.5)),
      (this.gauge = this.add.graphics()),
      this.drawGauge(0),
      (this.hint = this.add
        .text(c / 2, V - 18, 'Yön tuşları: Hareket   . (Nokta): Park et', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '12px',
          color: '#9e9e9e',
        })
        .setOrigin(0.5)),
      e.events.on(k.SpeedChanged, t => {
        this.speedText.setText(`${Math.round(Math.abs(t))} km/s`)
      }),
      e.events.on(k.QualityChanged, t => {
        ;(this.drawGauge(t), this.updateHint(t))
      }),
      e.events.on(k.CollisionsChanged, t => {
        this.collisionsText.setText(`Çarpma: ${t}`)
      }),
      this.events.once(o.Scenes.Events.SHUTDOWN, () => {
        ;(e.events.off(k.SpeedChanged),
          e.events.off(k.QualityChanged),
          e.events.off(k.CollisionsChanged))
      }))
  }
  drawGauge(e) {
    const t = o.Math.Clamp(e / 100, 0, 1)
    ;(this.gauge.clear(),
      this.gauge.fillStyle(2236962, 0.85),
      this.gauge.fillRoundedRect(oe, V, ce, le, 5),
      this.gauge.fillStyle(this.colorFor(t), 1),
      this.gauge.fillRoundedRect(oe, V, ce * t, le, 5))
  }
  colorFor(e) {
    return e >= 0.75 ? 5025616 : e >= 0.4 ? 16635957 : 15022389
  }
  updateHint(e) {
    e >= 75
      ? (this.hint.setText('. (Nokta) ile park et'),
        this.hint.setColor('#a5d6a7'))
      : (this.hint.setText(
          'Yön tuşları: Hareket   Boşluk (Space): Fren   . (Nokta): Park et',
        ),
        this.hint.setColor('#9e9e9e'))
  }
}
class lt extends o.Scene {
  constructor() {
    super(x.GameOver)
  }
  create(e) {
    const t = _.save(`parking:level_${e.levelIndex}`, e.score),
      s = _.load(`parking:level_${e.levelIndex}`)
    this.add.rectangle(0, 0, c, h, 0, 0.7).setOrigin(0, 0)
    const i = e.stars > 0,
      n = e.levelIndex >= j.length - 1,
      a = i && n,
      r = a ? 'TEBRİKLER! OYUN BİTTİ' : `BÖLÜM ${e.levelIndex + 1} SONUCU`,
      u = a ? '#4caf50' : '#ffeb3b'
    if (
      (this.add
        .text(c / 2, h / 2 - 160, r, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '32px',
          color: u,
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
      this.renderStars(e.stars),
      this.add
        .text(c / 2, h / 2 - 20, `Skor: ${e.score}`, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '30px',
          color: '#ffffff',
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
      this.add
        .text(
          c / 2,
          h / 2 + 20,
          `Kalite ${e.quality} • Çarpma ${e.collisions}`,
          {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '16px',
            color: '#bdbdbd',
          },
        )
        .setOrigin(0.5),
      t)
    ) {
      const p = this.add
        .text(c / 2, h / 2 + 60, 'YENİ REKOR!', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '20px',
          color: '#a5d6a7',
          fontStyle: 'bold',
        })
        .setOrigin(0.5)
      this.tweens.add({
        targets: p,
        scale: { from: 0.6, to: 1 },
        duration: 350,
        ease: 'Back.easeOut',
      })
    } else
      s > 0 &&
        this.add
          .text(c / 2, h / 2 + 60, `En Yüksek: ${s}`, {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '16px',
            color: '#9e9e9e',
          })
          .setOrigin(0.5)
    let f = ''
    ;(i && !n
      ? ((f = 'ENTER  sonraki bölüm    '),
        this.input.keyboard?.once('keydown-ENTER', () => {
          this.scene.start(x.Game, { levelIndex: e.levelIndex + 1 })
        }),
        this.input.keyboard?.once('keydown-SPACE', () => {
          this.scene.start(x.Game, { levelIndex: e.levelIndex + 1 })
        }))
      : i ||
        ((f = 'ENTER  tekrar dene    '),
        this.input.keyboard?.once('keydown-ENTER', () => {
          this.scene.start(x.Game, { levelIndex: e.levelIndex })
        }),
        this.input.keyboard?.once('keydown-SPACE', () => {
          this.scene.start(x.Game, { levelIndex: e.levelIndex })
        })),
      this.add
        .text(c / 2, h / 2 + 130, `${f}ESC  hub`, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '16px',
          color: '#bdbdbd',
        })
        .setOrigin(0.5),
      this.input.keyboard?.once('keydown-ESC', () => {
        this.scene.start('hub:HubScene')
      }))
  }
  renderStars(e) {
    const t = h / 2 - 90,
      s = [c / 2 - 50, c / 2, c / 2 + 50]
    for (let i = 0; i < 3; i++) {
      const n = i < e
      this.add
        .text(s[i], t, '★', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '44px',
          color: n ? '#ffeb3b' : '#3a3a3a',
        })
        .setOrigin(0.5)
    }
  }
}
const ht = {
    id: 'parking',
    label: 'Park Etme',
    tagline: 'Yön tuşları ile slota parket',
    scenes: [Ye, ot, ct, lt],
    entryKey: x.Boot,
    enabled: !0,
  },
  fe = [ht, ze],
  dt = 'hub:HubScene',
  E = 180,
  z = 280,
  he = 20
class ut extends o.Scene {
  constructor() {
    ;(super(dt), (this.games = fe), (this.cards = []), (this.selected = 0))
  }
  create() {
    ;((this.cards = []),
      (this.selected = this.firstEnabledIndex()),
      this.add
        .text(c / 2, 80, 'MAKAS GARAGE', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '40px',
          color: '#ffeb3b',
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
      this.add
        .text(c / 2, 130, 'Bir oyun seç', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '18px',
          color: '#bdbdbd',
        })
        .setOrigin(0.5))
    const e = E * this.games.length + he * (this.games.length - 1),
      t = (c - e) / 2 + E / 2
    ;(this.games.forEach((s, i) => {
      const n = t + i * (E + he),
        a = h / 2 + 20
      this.cards.push(this.buildCard(s, i, n, a))
    }),
      this.add
        .text(c / 2, h - 50, '← →  seç    ENTER  başla', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '14px',
          color: '#9e9e9e',
        })
        .setOrigin(0.5),
      this.input.keyboard?.on('keydown-LEFT', () => this.move(-1)),
      this.input.keyboard?.on('keydown-RIGHT', () => this.move(1)),
      this.input.keyboard?.on('keydown-ENTER', () => this.confirm()),
      this.input.keyboard?.on('keydown-SPACE', () => this.confirm()),
      this.refresh())
  }
  buildCard(e, t, s, i) {
    const n = this.add.container(s, i),
      a = this.add.rectangle(0, 0, E, z, 2039583, 1)
    a.setStrokeStyle(2, 3355443)
    const r = this.add.rectangle(
      0,
      -70,
      E - 40,
      120,
      e.id === 'parking' ? 1668818 : 12986408,
      1,
    )
    r.setStrokeStyle(2, 0)
    const u = this.add
        .text(0, 30, e.label, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '26px',
          color: '#ffffff',
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
      f = this.add
        .text(0, 65, e.tagline, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '13px',
          color: '#bdbdbd',
          align: 'center',
          wordWrap: { width: E - 30 },
        })
        .setOrigin(0.5),
      p = _.load(e.id),
      w = this.add
        .text(0, 110, p > 0 ? `Rekor: ${p}` : '', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '12px',
          color: '#a5d6a7',
        })
        .setOrigin(0.5)
    if (e.enabled) n.add([a, r, u, f, w])
    else {
      const B = this.add
        .text(0, -70, 'YAKINDA', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '16px',
          color: '#ffffff',
          fontStyle: 'bold',
          stroke: '#000',
          strokeThickness: 3,
        })
        .setOrigin(0.5)
      ;(n.add([a, r, u, f, w, B]), a.setAlpha(0.55), r.setAlpha(0.4))
    }
    return (
      n.setSize(E, z),
      n.setInteractive(
        new o.Geom.Rectangle(-E / 2, -z / 2, E, z),
        o.Geom.Rectangle.Contains,
      ),
      n.on('pointerover', () => {
        ;((this.selected = t), this.refresh())
      }),
      n.on('pointerdown', () => {
        ;((this.selected = t), this.refresh(), this.confirm())
      }),
      { container: n, bg: a, iconBg: r, best: w }
    )
  }
  firstEnabledIndex() {
    const e = this.games.findIndex(t => t.enabled)
    return e >= 0 ? e : 0
  }
  move(e) {
    const t = this.games.length
    if (t === 0) return
    let s = this.selected
    for (let i = 0; i < t; i++)
      if (((s = (s + e + t) % t), this.games[s].enabled)) {
        this.selected = s
        break
      }
    this.refresh()
  }
  refresh() {
    this.cards.forEach((e, t) => {
      const s = t === this.selected,
        i = this.games[t].enabled
      ;(e.bg.setStrokeStyle(s ? 4 : 2, s ? 16771899 : 3355443),
        e.container.setScale(s && i ? 1.06 : 1))
    })
  }
  confirm() {
    const e = this.games[this.selected]
    e?.enabled && this.scene.start(e.entryKey)
  }
}
const ft = {
  type: o.AUTO,
  parent: 'game',
  width: c,
  height: h,
  backgroundColor: '#1a1a1a',
  pixelArt: !1,
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 0 }, debug: !1 },
  },
  scale: { mode: o.Scale.FIT, autoCenter: o.Scale.CENTER_BOTH },
  scene: [ut, ...fe.flatMap(l => l.scenes.slice())],
}
new o.Game(ft)
//# sourceMappingURL=index-DXeAlBpy.js.map
