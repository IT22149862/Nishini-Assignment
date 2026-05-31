import Hero     from '../components/Hero'
import About    from '../components/About'
import Services from '../components/Services'
import Booking  from '../components/Booking'
import Gallery  from '../components/Gallery'
import Reviews  from '../components/Reviews'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Booking />
      <Gallery />
      <Reviews />
    </main>
  )
}
