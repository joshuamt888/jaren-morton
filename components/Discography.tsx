'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MusicNote, SpotifyLogo } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const releases = [
  {
    title: 'Growth Pattern',
    artist: 'Jaren and Kyreis',
    type: 'Album',
    year: '2024',
    cover: '/images/album-growth-pattern.jpg',
    soundcloud: 'https://soundcloud.com/kyreis-harrison',
    spotify: 'https://open.spotify.com/artist/0iHp1hWXVRxBKyeuv2aq8t?si=WfHtHkmPRaeBW8rkDXgXig',
  },
  {
    title: 'Intuition',
    artist: 'Jaren',
    type: 'Album',
    year: '2025',
    cover: '/images/album-new.png',
    spotify: 'https://open.spotify.com/album/5PnHGrnS0A6qVolOBbAYlP?si=FPkrOFPdR-yO9VmmHAkz9g',
    soundcloud: '#',
  },
]

export default function Discography() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.release-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#0d9488' }}>
            Discography
          </p>
          <h2
            className="text-[clamp(2rem,5vw,4rem)] leading-none text-white"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
          >
            THE MUSIC
          </h2>
        </div>
        <MusicNote size={48} style={{ color: 'rgba(13,148,136,0.2)' }} weight="fill" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {releases.map((release, i) => (
          <motion.div
            key={i}
            className="release-card group relative overflow-hidden rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center gap-6 p-6">
              {/* Cover art — square crop centered */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={release.cover}
                  alt={release.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs tracking-widest uppercase" style={{ color: '#0d9488' }}>
                    {release.type}
                  </span>
                  {'upcoming' in release && release.upcoming && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full tracking-wider"
                      style={{ background: 'rgba(13,148,136,0.15)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.3)' }}
                    >
                      UPCOMING
                    </span>
                  )}
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold text-white truncate mb-1"
                  style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
                >
                  {release.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: '#71717a' }}>
                  {release.artist} · {release.year}
                </p>

                {/* Streaming links */}
                {!('upcoming' in release && release.upcoming) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {'spotify' in release && release.spotify && (
                      <a
                        href={release.spotify as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-[11px] tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
                        style={{
                          background: 'rgba(29,185,84,0.1)',
                          border: '1px solid rgba(29,185,84,0.3)',
                          color: '#1DB954',
                        }}
                      >
                        <SpotifyLogo size={13} weight="fill" />
                        SPOTIFY
                      </a>
                    )}
                    <a
                      href={release.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[11px] tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
                      style={{
                        background: 'rgba(255,85,0,0.1)',
                        border: '1px solid rgba(255,85,0,0.3)',
                        color: '#ff5500',
                      }}
                    >
                      <svg width="13" height="9" viewBox="0 0 1333 583" fill="currentColor">
                        <path d="M0 447q0 54 38 92t92 38q54 0 91-38t37-92V136q0-54-37-91T130 8Q76 8 38 45T0 136v311zm333 54q0 54 38 92t92 38q54 0 91-38t37-92V82q0-54-37-91T463 -46q-54 0-92 37T333 82v419zm333-27q0 54 38 92t92 38q54 0 91-38t37-92V190q0-54-37-91T796 62q-54 0-92 37t-38 91v184zm334 0q0 54 37 92t92 38q54 0 92-38t38-92V244q0-54-38-91t-92-37q-55 0-92 37t-37 91v230zm275-184v184q0 54 38 92t92 38q55 0 92-38t37-92V290q0-54-37-91t-92-37q-54 0-92 37t-38 91z"/>
                      </svg>
                      SOUNDCLOUD
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom glow on hover */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(90deg, transparent, #0d9488, transparent)' }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
