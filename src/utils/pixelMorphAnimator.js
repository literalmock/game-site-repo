const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const drawImageContain = (ctx, image, width, height, scale = 1, yOffset = 0) => {
  const sourceRatio = image.width / image.height
  const targetRatio = width / height

  let drawWidth = width
  let drawHeight = height

  if (sourceRatio > targetRatio) {
    drawWidth = width
    drawHeight = drawWidth / sourceRatio
  } else {
    drawHeight = height
    drawWidth = drawHeight * sourceRatio
  }

  drawWidth *= scale
  drawHeight *= scale

  const x = (width - drawWidth) * 0.5
  const y = (height - drawHeight) * 0.5 + yOffset

  ctx.drawImage(image, x, y, drawWidth, drawHeight)
}

const makeCells = (width, height, size) => {
  const cells = []

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      const angle = Math.random() * Math.PI * 2
      const distance = 12 + Math.random() * 56
      const delay = Math.random() * 0.36
      const jitter = 0.75 + Math.random() * 0.5

      cells.push({
        x,
        y,
        size: Math.min(size, width - x, height - y),
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        delay,
        jitter,
        seed: Math.random(),
      })
    }
  }

  return cells
}

export class PixelMorphAnimator {
  constructor({
    canvas,
    imageUrls,
    durationMs = 1680,
    minIntervalMs = 1200,
    maxIntervalMs = 2000,
    cellSize = 7,
  }) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { alpha: true })
    this.imageUrls = imageUrls
    this.durationMs = durationMs
    this.minIntervalMs = minIntervalMs
    this.maxIntervalMs = maxIntervalMs
    this.cellSize = cellSize

    this.dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1))
    this.width = 1
    this.height = 1
    this.images = []
    this.cells = []
    this.currentIndex = 0
    this.nextIndex = 0

    this.isRunning = false
    this.isTransitioning = false
    this.startedAt = 0
    this.lastFrame = 0

    this.rafId = null
    this.timerId = null

    this.fromBuffer = document.createElement('canvas')
    this.toBuffer = document.createElement('canvas')
    this.fromCtx = this.fromBuffer.getContext('2d', { alpha: true })
    this.toCtx = this.toBuffer.getContext('2d', { alpha: true })

    this.resize = this.resize.bind(this)
    this.frame = this.frame.bind(this)
  }

  preloadImages() {
    const jobs = this.imageUrls.map((url) => new Promise((resolve, reject) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    }))

    return Promise.all(jobs)
  }

  scheduleNext() {
    if (!this.isRunning || this.images.length < 2) return

    const gap = this.minIntervalMs + Math.random() * (this.maxIntervalMs - this.minIntervalMs)

    this.timerId = window.setTimeout(() => {
      if (!this.isRunning || this.isTransitioning) return
      this.beginTransition()
    }, gap)
  }

  beginTransition() {
    this.nextIndex = (this.currentIndex + 1) % this.images.length
    this.paintToBuffer(this.fromCtx, this.images[this.currentIndex], performance.now(), 1)
    this.paintToBuffer(this.toCtx, this.images[this.nextIndex], performance.now(), 1)

    this.startedAt = performance.now()
    this.isTransitioning = true
  }

  paintToBuffer(ctx, image, time, scale = 1) {
    ctx.clearRect(0, 0, this.width, this.height)
    const idleOffsetY = 0
    drawImageContain(ctx, image, this.width, this.height, scale, idleOffsetY)
  }

  resize() {
    const bounds = this.canvas.getBoundingClientRect()
    const width = Math.max(1, Math.floor(bounds.width))
    const height = Math.max(1, Math.floor(bounds.height))

    if (width === this.width && height === this.height) return

    this.width = width
    this.height = height

    this.canvas.width = Math.floor(width * this.dpr)
    this.canvas.height = Math.floor(height * this.dpr)

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.ctx.imageSmoothingEnabled = true
    this.ctx.imageSmoothingQuality = 'high'

    this.fromBuffer.width = width
    this.fromBuffer.height = height
    this.toBuffer.width = width
    this.toBuffer.height = height
    this.fromCtx.imageSmoothingEnabled = true
    this.fromCtx.imageSmoothingQuality = 'high'
    this.toCtx.imageSmoothingEnabled = true
    this.toCtx.imageSmoothingQuality = 'high'

    this.cells = makeCells(width, height, this.cellSize)
  }

  renderIdle(now) {
    this.paintToBuffer(this.fromCtx, this.images[this.currentIndex], now, 1)
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(this.fromBuffer, 0, 0)
  }

  renderTransition(now) {
    const raw = clamp((now - this.startedAt) / this.durationMs, 0, 1)
    const eased = easeInOutCubic(raw)

    const outProgress = clamp(eased / 0.5, 0, 1)
    const inProgress = clamp((eased - 0.5) / 0.5, 0, 1)

    this.ctx.clearRect(0, 0, this.width, this.height)

    for (let i = 0; i < this.cells.length; i += 1) {
      const cell = this.cells[i]
      const outCell = clamp((outProgress - cell.delay) / (1 - cell.delay), 0, 1)
      const inCell = clamp((inProgress - cell.delay) / (1 - cell.delay), 0, 1)

      if (outCell < 1) {
        this.ctx.globalAlpha = (1 - outCell) * cell.jitter
        this.ctx.drawImage(
          this.fromBuffer,
          cell.x,
          cell.y,
          cell.size,
          cell.size,
          cell.x + cell.dx * outCell,
          cell.y + cell.dy * outCell,
          cell.size,
          cell.size,
        )
      }

      if (inCell > 0) {
        this.ctx.globalAlpha = inCell
        this.ctx.drawImage(
          this.toBuffer,
          cell.x,
          cell.y,
          cell.size,
          cell.size,
          cell.x + cell.dx * (1 - inCell),
          cell.y + cell.dy * (1 - inCell),
          cell.size,
          cell.size,
        )
      }

      if (cell.seed > 0.95 && outCell > 0.16 && outCell < 0.85) {
        this.ctx.globalAlpha = (1 - outCell) * 0.22
        this.ctx.strokeStyle = 'rgba(126, 230, 255, 0.95)'
        this.ctx.lineWidth = 1
        this.ctx.beginPath()
        this.ctx.moveTo(cell.x + cell.size * 0.5, cell.y + cell.size * 0.5)
        this.ctx.lineTo(
          cell.x + cell.size * 0.5 + cell.dx * outCell * 0.5,
          cell.y + cell.size * 0.5 + cell.dy * outCell * 0.5,
        )
        this.ctx.stroke()
      }
    }

    this.ctx.globalAlpha = 1

    if (raw >= 1) {
      this.currentIndex = this.nextIndex
      this.isTransitioning = false
      this.scheduleNext()
    }
  }

  frame(now) {
    if (!this.isRunning) return

    if (now - this.lastFrame < 1000 / 62) {
      this.rafId = window.requestAnimationFrame(this.frame)
      return
    }

    this.lastFrame = now
    this.resize()

    if (this.isTransitioning) {
      this.renderTransition(now)
    } else {
      this.renderIdle(now)
    }

    this.rafId = window.requestAnimationFrame(this.frame)
  }

  async start() {
    this.images = await this.preloadImages()
    if (!this.images.length) return

    this.isRunning = true
    this.resize()
    window.addEventListener('resize', this.resize)

    if (this.images.length > 1) {
      this.scheduleNext()
    }

    this.rafId = window.requestAnimationFrame(this.frame)
  }

  stop() {
    this.isRunning = false

    if (this.timerId) {
      window.clearTimeout(this.timerId)
      this.timerId = null
    }

    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId)
      this.rafId = null
    }

    window.removeEventListener('resize', this.resize)
  }
}
