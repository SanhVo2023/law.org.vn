import { STAR_PATH, IconScales, IconColumn, IconConstitution, IconGavel } from '@/components/icons/VietnamIcons'
import { WavingFlag } from './WavingFlag'

/** Point on a circle, 0° = top (12 o'clock). Centre fixed at (110,110). */
function pt(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180
  return [110 + r * Math.cos(a), 110 + r * Math.sin(a)]
}

const RAYS = Array.from({ length: 36 }, (_, i) => i * 10)
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5)

/**
 * The hero's iconic visual: a circular Vietnamese legal seal.
 * Rotating gold sunburst + a ticked ring + circular gold text, a flag-red inner
 * disc carrying the iconic gold five-pointed star (pulse + shimmer + glow), and
 * gold line-icons of the law (scales, column, Constitution, gavel) floating on an
 * orbit, with a small waving flag. All continuous motion lives in public.css and
 * is disabled under prefers-reduced-motion.
 */
export function HeroEmblem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px]">
      <svg viewBox="0 0 220 220" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="redDisc" cx="42%" cy="38%" r="70%">
            <stop offset="0" stopColor="#e6342b" />
            <stop offset="0.6" stopColor="#DA251D" />
            <stop offset="1" stopColor="#a4140d" />
          </radialGradient>
          <linearGradient id="shimmer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
          <path id="sealText" d="M110,110 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" fill="none" />
        </defs>

        {/* soft halo */}
        <circle cx="110" cy="110" r="98" fill="#d4a43c" opacity="0.06" />

        {/* rotating sunburst */}
        <g className="seal-rays" stroke="#d4a43c" strokeWidth="1.4" opacity="0.35">
          {RAYS.map((deg) => {
            const [x1, y1] = pt(62, deg)
            const [x2, y2] = pt(deg % 20 === 0 ? 80 : 73, deg)
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </g>

        {/* ticked outer ring */}
        <circle cx="110" cy="110" r="96" fill="none" stroke="#d4a43c" strokeWidth="1.5" />
        <circle cx="110" cy="110" r="84" fill="none" stroke="#d4a43c" strokeWidth="0.8" opacity="0.6" />
        <g stroke="#d4a43c" strokeWidth="1.2">
          {TICKS.map((deg) => {
            const [x1, y1] = pt(85, deg)
            const [x2, y2] = pt(deg % 15 === 0 ? 93 : 90, deg)
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} opacity={deg % 15 === 0 ? 0.9 : 0.45} />
          })}
        </g>

        {/* circular seal text */}
        <text
          fill="#d4a43c"
          fontSize="7.2"
          letterSpacing="1.5"
          style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 600 }}
        >
          <textPath href="#sealText" startOffset="0" textLength="488" lengthAdjust="spacing">
            ★ BỘ TRI THỨC PHÁP LUẬT VIỆT NAM ★ LAW.ORG.VN ★ PHÁP QUYỀN ★
          </textPath>
        </text>

        {/* dashed orbit */}
        <circle
          className="seal-orbit"
          cx="110"
          cy="110"
          r="103"
          fill="none"
          stroke="#d4a43c"
          strokeWidth="0.8"
          strokeDasharray="1 7"
          opacity="0.5"
        />

        {/* red disc + gold rim */}
        <circle cx="110" cy="110" r="58" fill="url(#redDisc)" />
        <circle cx="110" cy="110" r="58" fill="none" stroke="#FFCD00" strokeWidth="1.6" opacity="0.85" />
        <circle cx="110" cy="110" r="53" fill="none" stroke="#fff" strokeWidth="0.6" opacity="0.18" />

        {/* gold star: glow + body + shimmer sweep */}
        <g transform="translate(110,110) scale(0.94) translate(-50,-50)">
          <path className="seal-glow" d={STAR_PATH} fill="#FFCD00" filter="url(#softGlow)" />
          <path className="seal-star" d={STAR_PATH} fill="#FFCD00" />
          <clipPath id="starClip">
            <path d={STAR_PATH} />
          </clipPath>
          <g clipPath="url(#starClip)">
            <rect className="seal-shimmer" x="-10" y="-10" width="26" height="120" fill="url(#shimmer)" />
          </g>
        </g>
      </svg>

      {/* Floating law icons on the orbit */}
      <span className="float-a absolute left-[26%] top-[-5%] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold-500)]/45 bg-[var(--color-navy-800)]/85 p-2.5 text-[var(--color-gold-400)] shadow-lg backdrop-blur">
        <IconScales />
      </span>
      <span className="float-b absolute right-[-5%] top-[24%] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold-500)]/45 bg-[var(--color-navy-800)]/85 p-2.5 text-[var(--color-gold-400)] shadow-lg backdrop-blur">
        <IconColumn />
      </span>
      <span className="float-c absolute bottom-[-4%] right-[24%] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold-500)]/45 bg-[var(--color-navy-800)]/85 p-2.5 text-[var(--color-gold-400)] shadow-lg backdrop-blur">
        <IconConstitution />
      </span>
      <span className="float-d absolute left-[-5%] top-[26%] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold-500)]/45 bg-[var(--color-navy-800)]/85 p-2.5 text-[var(--color-gold-400)] shadow-lg backdrop-blur">
        <IconGavel />
      </span>

      {/* Waving flag, lower-left of the scene */}
      <WavingFlag className="absolute bottom-[2%] left-[-6%] w-16 sm:w-20" />
    </div>
  )
}
