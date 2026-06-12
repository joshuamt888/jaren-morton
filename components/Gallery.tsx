'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  { src: '/images/photo-2.jpeg', alt: 'Jaren performing', aspect: 'aspect-[3/4]' },
  { src: '/images/photo-1.png', alt: 'Jaren press photo', aspect: 'aspect-[3/4]' },
  { src: '/images/hero.jpeg', alt: 'Jaren — hero', aspect: 'aspect-[4/3]' },
  { src: '/images/photo-4.png', alt: 'Jaren — dark room', aspect: 'aspect-[3/4]' },
  { src: '/images/photo-5.jpg', alt: 'Jaren performing live', aspect: 'aspect-[3/4]' },
]

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth - window.innerWidth

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    })

    // Fade in each image
    gsap.fromTo(
      '.gallery-img',
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="overflow-hidden">
      {/* Section label — appears before pin */}
      <div className="px-6 md:px-12 lg:px-16 py-16 flex items-center justify-between max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#0d9488' }}>
          Visual Identity
        </p>
        <div className="h-px flex-1 mx-8" style={{ background: 'rgba(82,82,91,0.25)' }} />
        <p className="text-xs tracking-widest" style={{ color: '#52525b' }}>
          {photos.length} FRAMES
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="flex items-center gap-6 pl-6 md:pl-12 lg:pl-16 w-max pb-16">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className={`gallery-img relative ${photo.aspect} flex-shrink-0 rounded-xl overflow-hidden`}
            style={{ width: i === 2 ? '420px' : '280px' }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.6) 0%, transparent 50%)' }}
            />
          </motion.div>
        ))}
        {/* End padding */}
        <div className="w-6 md:w-12 lg:w-16 flex-shrink-0" />
      </div>
    </section>
  )
}
