'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

function splitWords(text: string) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
      <span className="word-inner inline-block">{word}</span>
    </span>
  ))
}

export default function AtmosphereSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Parallax on the background image
    gsap.fromTo(
      imgRef.current,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    // Text reveal
    gsap.fromTo(
      containerRef.current?.querySelectorAll('.word-inner') ?? [],
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.1,
        stagger: 0.05,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      '.atm-sub',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative py-48 md:py-64 overflow-hidden"
    >
      {/* Background — forest illustration with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={imgRef} className="absolute inset-[-20%] w-[140%] h-[140%]">
          <Image
            src="/images/forest-bg.png"
            alt=""
            fill
            className="object-cover opacity-20"
            aria-hidden
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.95) 100%)' }}
        />
      </div>

      {/* Teal center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(13,148,136,0.07)' }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto text-center">
        <p className="atm-sub text-xs tracking-[0.3em] uppercase mb-8" style={{ color: '#0d9488' }}>
          The Sound
        </p>

        <h2
          className="text-[clamp(2.5rem,7vw,6rem)] leading-none text-white mx-auto mb-8"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.06em', maxWidth: '16ch' }}
        >
          {splitWords('DARK. HONEST. UNFILTERED.')}
        </h2>

        <p
          className="atm-sub text-base md:text-lg leading-relaxed mx-auto max-w-xl"
          style={{ color: '#71717a' }}
        >
          Jaren crafts music that doesn't flinch. Every track is a window into something real — pain, growth, the quiet moments between.
        </p>
      </div>
    </section>
  )
}
