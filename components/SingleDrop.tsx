'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

function splitWords(text: string) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
      <span className="word-inner inline-block">{word}</span>
    </span>
  ))
}

export default function SingleDrop() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current?.querySelectorAll('.word-inner') ?? [],
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      '.single-meta',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left — text */}
        <div>
          <p className="single-meta text-xs tracking-[0.3em] uppercase mb-8" style={{ color: '#0d9488' }}>
            New Album
          </p>

          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tight text-white mb-6"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
          >
            {splitWords('DROPPING JUNE 13')}
          </h2>

          <div className="single-meta flex items-center gap-4 mb-12">
            <div className="h-px flex-1" style={{ background: 'rgba(82,82,91,0.4)' }} />
            <span className="text-xs tracking-widest" style={{ color: '#52525b' }}>
              JAREN
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(82,82,91,0.4)' }} />
          </div>

          <p className="single-meta text-base leading-relaxed max-w-md mb-10" style={{ color: '#71717a' }}>
            Raw emotion, dark atmosphere. A full project built from the inside out — Jaren's next chapter drops June 13.
          </p>

          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="single-meta inline-flex items-center gap-3 px-8 py-4 font-medium tracking-wide text-sm transition-colors"
            style={{
              background: '#0d9488',
              color: '#080808',
              borderRadius: '4px',
            }}
          >
            Stream Now
            <ArrowUpRight size={16} weight="bold" />
          </motion.a>
        </div>

        {/* Right — visual */}
        <div className="relative">
          {/* Album cover — box-shadow glow renders instantly, no blur-div flash */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-square w-full"
            style={{
              boxShadow: '0 0 40px 12px rgba(13,148,136,0.45), 0 0 80px 30px rgba(13,148,136,0.18)',
            }}
          >
            <Image
              src="/images/album-new.png"
              alt="Jaren — new album"
              fill
              className="object-cover object-center"
            />
            {/* Dark vignette */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(8,8,8,0.25)' }}
            />
            {/* Track info overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.92) 0%, transparent 100%)' }}
            >
              <p className="text-xs tracking-widest mb-1" style={{ color: '#0d9488' }}>DROPPING JUNE 13</p>
              <p className="text-sm font-medium" style={{ color: '#f2f2f0' }}>New Album — Jaren</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
