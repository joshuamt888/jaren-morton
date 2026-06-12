'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, SpotifyLogo, AppleLogo, YoutubeLogo } from '@phosphor-icons/react'

const streamingLinks = [
  { label: 'Spotify', href: '#', Icon: SpotifyLogo },
  { label: 'Apple Music', href: '#', Icon: AppleLogo },
  { label: 'YouTube', href: '#', Icon: YoutubeLogo },
]

function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date('2026-06-13T00:00:00')

    const tick = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-6 md:gap-8">
      {[
        { label: 'DAYS', val: pad(time.days) },
        { label: 'HRS', val: pad(time.hours) },
        { label: 'MIN', val: pad(time.minutes) },
        { label: 'SEC', val: pad(time.seconds) },
      ].map(({ label, val }, i) => (
        <div key={i} className="flex flex-col items-center">
          <span
            className="text-3xl md:text-5xl font-bold tabular-nums leading-none"
            style={{ fontFamily: 'var(--font-bebas)', color: '#0d9488' }}
          >
            {val}
          </span>
          <span className="text-[10px] tracking-widest mt-1" style={{ color: '#52525b' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: { delay: i * 0.06, duration: 0.9, ease: 'easeOut' as const },
    }),
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-end pb-12 md:pb-0 md:items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(180deg, #080808 0%, rgba(8,8,8,0.5) 30%, rgba(8,8,8,0.7) 60%, #080808 100%), linear-gradient(90deg, #080808 20%, transparent 60%)',
          }}
        />
        <Image
          src="/images/hero.jpeg"
          alt="Jaren"
          fill
          priority
          className="object-cover object-top md:object-center opacity-55"
        />
      </div>

      {/* Teal ambient glow */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] z-0 pointer-events-none"
        style={{ background: 'rgba(13,148,136,0.08)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-0">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11px] tracking-[0.3em] mb-5 uppercase"
            style={{ color: '#0d9488' }}
          >
            New Album — June 13, 2026
          </motion.p>

          {/* Massive artist name */}
          <div className="overflow-hidden mb-1" style={{ fontFamily: 'var(--font-bebas)' }}>
            <motion.h1
              className="text-[clamp(4.5rem,22vw,14rem)] leading-none tracking-wider text-white"
              custom={0}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              JAREN
            </motion.h1>
          </div>

          {/* Subline */}
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="text-[clamp(0.85rem,3.5vw,2.5rem)] tracking-[0.15em] uppercase font-light leading-tight"
              style={{ color: '#a1a1aa' }}
              custom={3}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              New Album Dropping
            </motion.h2>
          </div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-8"
          >
            <Countdown />
          </motion.div>

          {/* Streaming links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            {streamingLinks.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium tracking-wide transition-colors"
                style={{
                  borderColor: 'rgba(13,148,136,0.4)',
                  color: '#f2f2f0',
                  background: 'rgba(13,148,136,0.08)',
                }}
              >
                <Icon size={15} weight="fill" style={{ color: '#0d9488' }} />
                {label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — hidden on mobile to save space */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16 hidden md:flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="text-[10px] tracking-[0.3em] rotate-90 origin-center" style={{ color: '#52525b' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowRight size={14} style={{ color: '#0d9488' }} className="rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  )
}
