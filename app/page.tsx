import Hero from '@/components/Hero'
import SingleDrop from '@/components/SingleDrop'
import AtmosphereSection from '@/components/AtmosphereSection'
import Discography from '@/components/Discography'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: '#080808', color: '#f2f2f0' }}>
      <Hero />
      <SingleDrop />
      <AtmosphereSection />
      <Discography />
      <Footer />
    </main>
  )
}
