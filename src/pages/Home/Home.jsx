import Hero from '../../components/home/Hero/Hero'
import CategorySection from '../../components/home/CategorySection/CategorySection'
import FeaturedSection from '../../components/home/FeaturedSection/FeaturedSection'

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <CategorySection />
      <FeaturedSection />
    </div>
  )
}
