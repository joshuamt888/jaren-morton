'use client'

import { motion } from 'framer-motion'
import { InstagramLogo, SpotifyLogo, YoutubeLogo, AppleLogo } from '@phosphor-icons/react'

const socials = [
  { label: 'Instagram', href: '#', Icon: InstagramLogo },
  { label: 'Spotify', href: '#', Icon: SpotifyLogo },
  { label: 'Apple Music', href: '#', Icon: AppleLogo },
  { label: 'YouTube', href: '#', Icon: YoutubeLogo },
]

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-12 lg:px-16 py-16 mt-16"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Name */}
        <p
          className="text-3xl tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-bebas)', color: '#f2f2f0' }}
        >
          JAREN
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-6">
          {socials.map(({ label, href, Icon }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={{ scale: 1.15, color: '#0d9488' }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ color: '#52525b' }}
            >
              <Icon size={20} weight="fill" />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs tracking-wider" style={{ color: '#3f3f46' }}>
          &copy; 2026 Jaren Morton
        </p>
      </div>
    </footer>
  )
}
